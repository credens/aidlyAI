import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, beforeEach } from "vitest";
import { AppRoutes, validateAuditForm } from "./App.jsx";

function renderRoute(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppRoutes />
    </MemoryRouter>
  );
}

describe("AidlyAI site", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the professional home page with primary navigation", () => {
    renderRoute();

    expect(
      screen.getByRole("heading", {
        name: /Your AI helper for small businesses that need help every day/i,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByText("Book an AI workflow audit").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Services/i })[0]).toHaveAttribute("href", "/services");
    expect(screen.getAllByRole("link", { name: /Pricing/i })[0]).toHaveAttribute("href", "/pricing");
  });

  it("keeps visible page links concrete and non-empty", () => {
    const { container } = renderRoute();
    const links = [...container.querySelectorAll("a")];

    expect(links.length).toBeGreaterThan(10);
    for (const link of links) {
      const href = link.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).not.toBe("#");
      expect(href).not.toMatch(/^javascript:/i);
    }
  });

  it("renders every public route without broken visible links", () => {
    const publicRoutes = [
      "/",
      "/ai-receptionist-for-hvac",
      "/ai-lead-follow-up-for-plumbers",
      "/ai-front-desk-for-med-spas",
      "/ai-review-manager-for-local-business",
      "/ai-admin-assistant-for-small-business",
      "/services",
      "/services/ai-receptionist",
      "/services/lead-follow-up",
      "/services/admin-assistant",
      "/services/weekly-reports",
      "/use-cases",
      "/pricing",
      "/process",
      "/contact",
      "/book-audit",
      "/privacy",
      "/terms",
    ];

    for (const path of publicRoutes) {
      const { container, unmount } = renderRoute([path]);
      expect(screen.queryByText(/This page is not part of the AidlyAI site/i)).not.toBeInTheDocument();
      expect(container.querySelector("h1, h2")).toBeInTheDocument();

      for (const link of container.querySelectorAll("a")) {
        const href = link.getAttribute("href");
        expect(href, `${path} contains a bad link`).toBeTruthy();
        expect(href).not.toBe("#");
        expect(href).not.toMatch(/^javascript:/i);
      }

      unmount();
      cleanup();
    }
  });

  it("renders each vertical landing page with buyer-specific copy", () => {
    const verticalRoutes = [
      ["/ai-receptionist-for-hvac", /AI receptionist for HVAC companies/i],
      ["/ai-lead-follow-up-for-plumbers", /urgent plumbing leads/i],
      ["/ai-front-desk-for-med-spas", /treatment inquiries into booked appointments/i],
      ["/ai-review-manager-for-local-business", /AI-powered review management/i],
      ["/ai-admin-assistant-for-small-business", /Reduce repetitive admin work/i],
    ];

    for (const [path, headline] of verticalRoutes) {
      const { unmount } = renderRoute([path]);
      expect(screen.getByRole("heading", { name: headline })).toBeInTheDocument();
      expect(screen.getByText(/Recommended first launch/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Book a workflow audit|Book an AI workflow audit/i).length).toBeGreaterThan(0);
      unmount();
      cleanup();
    }
  });

  it("opens service microsites from the services page", async () => {
    const user = userEvent.setup();
    renderRoute(["/services"]);

    await user.click(screen.getAllByRole("link", { name: /Learn more/i })[0]);
    expect(screen.getByRole("heading", { name: "AI Receptionist" })).toBeInTheDocument();
    expect(screen.getByText(/Typical launch/i)).toBeInTheDocument();
  });

  it("validates and submits the audit form", async () => {
    const user = userEvent.setup();
    renderRoute(["/book-audit"]);
    const form = screen.getByTestId("audit-form");

    await user.click(within(form).getByRole("button", { name: /Submit audit request/i }));
    expect(await screen.findByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();

    await user.type(screen.getByLabelText(/Full name/i), "Sam Owner");
    await user.type(screen.getByLabelText(/Business email/i), "sam@example.com");
    await user.type(screen.getByLabelText(/Company/i), "Summit Contracting");
    await user.selectOptions(screen.getByLabelText(/Business type/i), "Home services");
    await user.selectOptions(screen.getByLabelText(/First workflow to improve/i), "Lead follow-up");
    await user.selectOptions(screen.getByLabelText(/Timeline/i), "This month");
    await user.click(screen.getByLabelText(/I agree to be contacted/i));
    await user.click(within(form).getByRole("button", { name: /Submit audit request/i }));

    expect(await screen.findByText(/Request received/i)).toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem("aidly-audit-requests"));
    expect(stored[0].company).toBe("Summit Contracting");
  });

  it("returns precise validation errors", () => {
    expect(
      validateAuditForm({
        name: "Sam",
        email: "not-an-email",
        phone: "",
        company: "Summit",
        businessType: "Home services",
        teamSize: "1-5",
        priority: "Lead follow-up",
        timeline: "This month",
        message: "",
        consent: true,
      }).email
    ).toBe("Enter a valid business email.");
  });
});
