import http from "node:http";
import process from "node:process";
import { URL } from "node:url";
import nodemailer from "nodemailer";
import "dotenv/config";

const PORT = Number(process.env.AUDIT_API_PORT || 3011);
const MAX_BODY_BYTES = 64 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = Number(process.env.AUDIT_RATE_LIMIT || 12);
const requestsByIp = new Map();

const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "AUDIT_TO_EMAIL"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE || "true") === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function json(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = requestsByIp.get(ip) || [];
  const recent = bucket.filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  requestsByIp.set(ip, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > MAX_BODY_BYTES) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function clean(value) {
  return String(value || "").trim();
}

function validate(data) {
  const errors = [];
  if (!clean(data.name)) errors.push("name is required");
  if (!clean(data.company)) errors.push("company is required");
  if (!/^\S+@\S+\.\S+$/.test(clean(data.email))) errors.push("valid email is required");
  if (!clean(data.businessType)) errors.push("business type is required");
  if (!clean(data.priority)) errors.push("priority is required");
  if (!clean(data.timeline)) errors.push("timeline is required");
  if (data.consent !== true) errors.push("consent is required");
  return errors;
}

function buildEmail(data, req) {
  const submittedAt = clean(data.submittedAt) || new Date().toISOString();
  const subject = `New AidlyAI audit request: ${clean(data.company) || "Unknown company"}`;
  const text = [
    "New AidlyAI workflow audit request",
    "",
    `Name: ${clean(data.name)}`,
    `Email: ${clean(data.email)}`,
    `Phone: ${clean(data.phone)}`,
    `Company: ${clean(data.company)}`,
    `Business type: ${clean(data.businessType)}`,
    `Team size: ${clean(data.teamSize)}`,
    `First workflow to improve: ${clean(data.priority)}`,
    `Timeline: ${clean(data.timeline)}`,
    "",
    "Message:",
    clean(data.message) || "not provided",
    "",
    `Page URL: ${clean(data.pageUrl)}`,
    `Submitted at: ${submittedAt}`,
    `Client IP: ${getClientIp(req)}`,
  ].join("\n");

  return { subject, text };
}

async function handleAuditRequest(req, res) {
  if (missingEnv.length > 0) {
    console.error(`Missing required env: ${missingEnv.join(", ")}`);
    json(res, 500, { ok: false, error: "Email service is not configured" });
    return;
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    json(res, 429, { ok: false, error: "Too many requests" });
    return;
  }

  const rawBody = await readBody(req);
  const data = JSON.parse(rawBody || "{}");

  // Honeypot. Real visitors never fill this hidden field.
  if (clean(data.website)) {
    json(res, 200, { ok: true });
    return;
  }

  const errors = validate(data);
  if (errors.length > 0) {
    json(res, 400, { ok: false, errors });
    return;
  }

  const { subject, text } = buildEmail(data, req);
  await transporter.sendMail({
    from: process.env.SMTP_FROM || `AidlyAI Website <${process.env.SMTP_USER}>`,
    to: process.env.AUDIT_TO_EMAIL,
    replyTo: clean(data.email),
    subject,
    text,
  });

  json(res, 200, { ok: true });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" && url.pathname === "/health") {
    json(res, 200, { ok: true });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/audit-request") {
    try {
      await handleAuditRequest(req, res);
    } catch (error) {
      console.error(error);
      json(res, 500, { ok: false, error: "Could not send audit request" });
    }
    return;
  }

  json(res, 404, { ok: false, error: "Not found" });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`AidlyAI audit API listening on http://127.0.0.1:${PORT}`);
});
