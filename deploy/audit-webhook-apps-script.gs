const RECIPIENT_EMAIL = "federico@aidlyai.com";

function doPost(event) {
  try {
    const data = JSON.parse(event.postData.contents || "{}");

    // Honeypot: the real form leaves this blank.
    if (data.website) {
      return jsonResponse_({ ok: true, ignored: true });
    }

    const subject = `New AidlyAI audit request: ${data.company || "Unknown company"}`;
    const body = [
      "New AidlyAI workflow audit request",
      "",
      `Name: ${data.name || ""}`,
      `Email: ${data.email || ""}`,
      `Phone: ${data.phone || ""}`,
      `Company: ${data.company || ""}`,
      `Business type: ${data.businessType || ""}`,
      `Team size: ${data.teamSize || ""}`,
      `First workflow to improve: ${data.priority || ""}`,
      `Timeline: ${data.timeline || ""}`,
      "",
      "Message:",
      data.message || "",
      "",
      `Page URL: ${data.pageUrl || ""}`,
      `Submitted at: ${data.submittedAt || new Date().toISOString()}`
    ].join("\n");

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject,
      body,
      replyTo: data.email || RECIPIENT_EMAIL,
      name: "AidlyAI Website"
    });

    return jsonResponse_({ ok: true });
  } catch (error) {
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: "AidlyAI audit webhook error",
      body: String(error && error.stack ? error.stack : error)
    });

    return jsonResponse_({ ok: false, error: String(error) });
  }
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
