import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  Check,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileCheck2,
  Headphones,
  LayoutDashboard,
  MailCheck,
  Menu,
  MessageSquareText,
  PhoneCall,
  Route,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  TimerReset,
  UsersRound,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route as RouterRoute,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

const navItems = [
  { label: "Services", to: "/services" },
  { label: "Use Cases", to: "/use-cases" },
  { label: "Pricing", to: "/pricing" },
  { label: "Process", to: "/process" },
  { label: "Contact", to: "/contact" },
];

const contactEmail = "federico@aidlyai.com";
const auditWebhookUrl = import.meta.env.VITE_AUDIT_WEBHOOK_URL || "";

const trustBullets = [
  { icon: ShieldCheck, text: "Secure & private — your data stays yours" },
  { icon: ClipboardList, text: "No new software to learn" },
  { icon: Headphones, text: "Real humans backing AI" },
  { icon: TimerReset, text: "Month-to-month, no lock-in" },
];

const services = [
  {
    icon: PhoneCall,
    slug: "ai-receptionist",
    title: "AI Receptionist",
    eyebrow: "Calls, chats and booking",
    text: "Answers calls and chats, books appointments, and captures details 24/7.",
    outcome: "Fewer missed calls, cleaner intake and faster response times.",
    features: ["Missed-call text-back", "Appointment booking", "After-hours intake", "Human escalation"],
  },
  {
    icon: MailCheck,
    slug: "lead-follow-up",
    title: "Lead Follow-up",
    eyebrow: "Qualification and nurture",
    text: "Qualifies, nurtures and follows up automatically so you never miss an opportunity.",
    outcome: "Every lead gets a timely, consistent next step.",
    features: ["Lead scoring", "Quote reminders", "CRM updates", "Win-back campaigns"],
  },
  {
    icon: Bot,
    slug: "admin-assistant",
    title: "Admin Assistant",
    eyebrow: "Everyday operations",
    text: "Handles FAQs, schedules, data entry, reminders and everyday admin tasks.",
    outcome: "Less manual admin work without changing how your team operates.",
    features: ["FAQ handling", "Task reminders", "Data cleanup", "Internal summaries"],
  },
  {
    icon: BarChart3,
    slug: "weekly-reports",
    title: "Weekly Reports",
    eyebrow: "Reporting and visibility",
    text: "Clear summaries of leads, jobs, replies and performance — delivered weekly.",
    outcome: "Know what happened this week and what needs attention next.",
    features: ["Lead summaries", "Response metrics", "Open issues", "Owner-ready email reports"],
  },
];

const processSteps = [
  {
    title: "Map",
    text: "We learn your business, tools and workflows, then design your AI system.",
    deliverables: ["Workflow map", "Data access plan", "Success metrics"],
  },
  {
    title: "Install",
    text: "We build and connect everything, test it thoroughly and train your team.",
    deliverables: ["Connected automations", "QA test plan", "Team handoff"],
  },
  {
    title: "Maintain",
    text: "We monitor, optimize and support your system so it keeps improving.",
    deliverables: ["Monthly tuning", "Issue monitoring", "Performance reports"],
  },
];

const useCases = [
  {
    name: "Home Services",
    icon: Wrench,
    headline: "Turn inquiries into booked jobs faster.",
    text: "Route new requests, summarize job details and follow up until a booking is confirmed.",
    examples: ["HVAC", "Plumbing", "Landscaping", "Cleaning"],
  },
  {
    name: "Clinics & Med Spas",
    icon: CalendarCheck,
    headline: "Keep intake, scheduling and follow-up moving.",
    text: "Answer common questions, prepare replies and remind staff when a human should step in.",
    examples: ["Appointment requests", "Review replies", "FAQ workflows", "Lead reactivation"],
  },
  {
    name: "Restaurants & Retail",
    icon: Building2,
    headline: "Handle reviews, messages and daily reports without extra admin.",
    text: "Summarize customer messages, prepare review replies and organize operational follow-up.",
    examples: ["Review management", "Catering leads", "Inventory reminders", "Weekly summaries"],
  },
];

const verticalPages = [
  {
    slug: "ai-receptionist-for-hvac",
    industry: "HVAC companies",
    icon: Wrench,
    headline: "AI receptionist for HVAC companies that don’t want to miss after-hours leads.",
    subheadline:
      "AidlyAI captures calls, chats and website inquiries after hours, classifies urgency and routes the right jobs to your team before competitors respond.",
    primaryService: "AI Receptionist",
    audience: "HVAC owners, dispatchers and service managers",
    painPoints: ["Missed calls after 5 PM", "Slow quote follow-up", "Emergency requests buried in voicemail"],
    workflows: ["Missed-call text-back", "Emergency intake", "Job detail summaries", "Booking handoff"],
    metrics: ["24/7 intake coverage", "14-day launch", "Month-to-month support"],
  },
  {
    slug: "ai-lead-follow-up-for-plumbers",
    industry: "Plumbing companies",
    icon: TimerReset,
    headline: "Capture urgent plumbing leads faster with AI-powered intake and follow-up.",
    subheadline:
      "When a plumbing lead is urgent, speed wins. AidlyAI responds, qualifies the request and keeps follow-up moving until the customer gets a clear next step.",
    primaryService: "Lead Follow-up",
    audience: "Plumbing shops, dispatchers and local service teams",
    painPoints: ["Urgent leads shopping around", "No-show quote requests", "Manual follow-up across phone and email"],
    workflows: ["Lead qualification", "Urgency routing", "Quote reminders", "CRM notes"],
    metrics: ["Faster first response", "$500/mo support", "No new software to learn"],
  },
  {
    slug: "ai-front-desk-for-med-spas",
    industry: "Med spas",
    icon: CalendarCheck,
    headline: "Turn treatment inquiries into booked appointments with an AI front desk.",
    subheadline:
      "AidlyAI helps your team answer common questions, collect intake details and move high-intent treatment inquiries toward a booked consultation.",
    primaryService: "AI Front Desk",
    audience: "Med spa owners, clinic managers and front desk teams",
    painPoints: ["Treatment questions piling up", "Missed booking windows", "Staff interrupted by repetitive admin"],
    workflows: ["Treatment inquiry intake", "Appointment request routing", "FAQ responses", "Review response drafts"],
    metrics: ["Human escalation", "Secure workflows", "Weekly visibility"],
  },
  {
    slug: "ai-review-manager-for-local-business",
    industry: "Local businesses",
    icon: Star,
    headline: "Get more reviews and respond faster with AI-powered review management.",
    subheadline:
      "AidlyAI helps local businesses request reviews, draft on-brand replies and keep reputation tasks from slipping through busy weeks.",
    primaryService: "Review Management",
    audience: "Local operators, managers and owner-led teams",
    painPoints: ["Happy customers not asked for reviews", "Slow replies to public feedback", "No weekly view of reputation trends"],
    workflows: ["Review request sequences", "Reply drafts", "Escalation for sensitive reviews", "Weekly review report"],
    metrics: ["More consistent review asks", "Brand-safe drafts", "Owner-ready summaries"],
  },
  {
    slug: "ai-admin-assistant-for-small-business",
    industry: "Small businesses",
    icon: BriefcaseBusiness,
    headline: "Reduce repetitive admin work without hiring another full-time employee.",
    subheadline:
      "AidlyAI handles routine admin workflows, summaries, reminders and reporting so your team spends less time copying, chasing and checking.",
    primaryService: "Admin Assistant",
    audience: "Small business owners and lean operations teams",
    painPoints: ["Admin work scattered across tools", "Reports built manually", "Important follow-ups relying on memory"],
    workflows: ["Task reminders", "Data entry support", "Internal summaries", "Weekly owner reports"],
    metrics: ["Fixed setup", "Monthly optimization", "Built around your tools"],
  },
];

const logos = [
  "ACME Services",
  "Brighter Cleaning",
  "Summit Contracting",
  "Pioneer Home Services",
  "North Star HVAC",
  "True North Landscaping",
];

const faqs = [
  {
    question: "Do we need to replace our current software?",
    answer: "No. AidlyAI is designed around your current email, CRM, calendar, phone and support tools wherever possible.",
  },
  {
    question: "Is this a chatbot subscription?",
    answer: "No. We install practical workflows and maintain them monthly, with humans available for support and optimization.",
  },
  {
    question: "Can we cancel?",
    answer: "Yes. Support is month-to-month after setup. You keep your business data and documented workflows.",
  },
];

function Logo({ compact = false }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="AidlyAI home">
      <div className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg border border-electric-400/35 bg-navy-850 shadow-glow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.45),transparent_38%)]" />
        <div className="relative flex items-center">
          <span className="h-5 w-5 rounded-full border-2 border-electric-300" />
          <span className="-ml-1 h-5 w-5 rounded-full border-2 border-cyan-200/90" />
        </div>
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="text-base font-semibold text-white">AidlyAI</p>
          <p className="text-xs text-slate-400">AidlyAI.com</p>
        </div>
      )}
    </Link>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/82 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-white ${
                  isActive ? "text-electric-300" : "text-slate-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden lg:block">
          <PrimaryLink to="/book-audit">Book an AI workflow audit</PrimaryLink>
        </div>
        <button
          className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-slate-200 transition hover:border-electric-400/60 hover:text-white lg:hidden"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-navy-950 px-5 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition hover:bg-white/5 hover:text-white ${
                    isActive ? "bg-electric-500/10 text-electric-300" : "text-slate-300"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <PrimaryLink to="/book-audit" className="mt-2 justify-center">
              Book an AI workflow audit
            </PrimaryLink>
          </div>
        </div>
      )}
    </header>
  );
}

function PrimaryLink({ to, children, className = "" }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 rounded-md bg-electric-500 px-5 py-3 text-sm font-semibold text-navy-950 shadow-glow transition hover:-translate-y-0.5 hover:bg-electric-300 ${className}`}
    >
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

function SecondaryLink({ to, children, className = "" }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-electric-400/60 hover:bg-electric-500/10 ${className}`}
    >
      {children}
      <ChevronRight size={16} />
    </Link>
  );
}

function PageShell({ children, dark = true }) {
  return (
    <section className={`relative overflow-hidden ${dark ? "ops-grid bg-navy-950" : "bg-slate-50"}`}>
      {dark && <div className="ops-waves pointer-events-none absolute inset-0 opacity-70" />}
      {children}
    </section>
  );
}

function PageHero({ eyebrow, title, text, children }) {
  return (
    <PageShell>
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-electric-300">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-normal text-white md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">{text}</p>
          {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </div>
      </div>
    </PageShell>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection preview />
      <UseCasesSection preview />
      <VerticalLandingLinks />
      <ProcessSection preview />
      <PricingStrip />
      <TrustLogos />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden ops-grid">
      <div className="ops-waves pointer-events-none absolute inset-0 opacity-90" />
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-electric-500/20 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric-400/25 bg-electric-500/10 px-4 py-2 text-sm font-medium text-electric-300">
            <Sparkles size={16} />
            AI help for small businesses
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-normal text-white sm:text-6xl lg:text-6xl 2xl:text-7xl">
            Your AI helper for small businesses that need help{" "}
            <span className="text-electric-400">every day</span> — not another tool to manage.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            We install and maintain practical AI workflows for customer service, lead follow-up,
            admin, reviews and reporting. Fixed setup. Monthly support. Built around your existing
            tools.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryLink to="/book-audit" className="justify-center px-6 py-4">
              Book an AI workflow audit
            </PrimaryLink>
            <SecondaryLink to="/use-cases" className="justify-center px-6 py-4">
              See use cases
            </SecondaryLink>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {trustBullets.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-400/12 text-emerald-300">
                  <Icon size={15} />
                </span>
                {text}
              </div>
            ))}
          </div>
        </div>
        <DashboardMockup />
      </div>
    </section>
  );
}

function DashboardMockup() {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: UsersRound, label: "Leads" },
    { icon: MessageSquareText, label: "Conversations" },
    { icon: Check, label: "Tasks" },
    { icon: BarChart3, label: "Reports" },
    { icon: Zap, label: "Integrations" },
    { icon: Settings, label: "Settings" },
  ];

  const statCards = [
    { value: "12", label: "new leads classified", meta: "↑ 18% vs yesterday" },
    { value: "4", label: "urgent jobs escalated", meta: "View details →" },
    { value: "28", label: "customer replies drafted", meta: "↑ 22% vs yesterday" },
    { value: "Weekly report ready", label: "Click to open →", meta: "" },
  ];

  const activity = [
    "New lead from Website — 9:41 AM",
    "Customer reply drafted for AC Repair Inquiry — 9:35 AM",
    "Job escalated: HVAC Installation — 9:20 AM",
    "Weekly report generated — 8:00 AM",
  ];

  return (
    <div className="relative z-10 lg:pl-4">
      <div className="glass-card overflow-hidden rounded-lg shadow-panel">
        <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">Live AidlyAI Helper</p>
            <p className="text-xs text-slate-400">Customer workflows, leads and support</p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
            All systems operational
          </div>
        </div>
        <div className="grid min-h-[520px] grid-cols-1 md:grid-cols-[164px_1fr]">
          <aside className="hidden border-r border-white/10 bg-black/18 p-3 md:block">
            <div className="space-y-1">
              {sidebarItems.map(({ icon: Icon, label }, index) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-sm ${
                    index === 0
                      ? "bg-electric-500/14 text-electric-300"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </div>
              ))}
            </div>
          </aside>
          <main className="p-4 sm:p-5">
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              {statCards.map((card) => (
                <div
                  key={card.value}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-4 transition hover:border-electric-400/35 hover:bg-white/[0.07]"
                >
                  <p
                    className={`font-semibold text-white ${
                      card.value.length > 4 ? "text-lg" : "text-4xl"
                    }`}
                  >
                    {card.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">{card.label}</p>
                  {card.meta && (
                    <p className="mt-3 text-xs font-semibold text-electric-300">{card.meta}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-white/10 bg-navy-950/55 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-semibold text-white">Recent activity</p>
                <Link
                  to="/process"
                  className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-electric-400/50 hover:text-white"
                >
                  Open report
                </Link>
              </div>
              <div className="space-y-3">
                {activity.map((item, index) => (
                  <div key={item} className="flex gap-3 rounded-md bg-white/[0.035] p-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-electric-400" />
                    <div>
                      <p className="text-sm text-slate-200">{item}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Routed through workflow #{index + 18}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function ServicesSection({ preview = false }) {
  return (
    <section className="relative border-t border-white/10 bg-slate-50 py-20 text-slate-950">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-electric-500">
              Services
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-normal text-slate-950 md:text-5xl">
              Practical AI workflows installed into your everyday operations.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600">
            Built for teams that need reliable automation, clear reporting and responsive support
            without adding another platform to manage.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
        {preview && (
          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-electric-300 hover:text-electric-500"
            >
              View all service details
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceCard({ icon: Icon, title, text, slug }) {
  return (
    <article className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-electric-300 hover:shadow-xl hover:shadow-sky-900/10">
      <div className="grid h-12 w-12 place-items-center rounded-lg bg-navy-900 text-electric-300 transition group-hover:bg-electric-500 group-hover:text-navy-950">
        <Icon size={24} />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 min-h-[84px] text-base leading-7 text-slate-600">{text}</p>
      <Link
        to={`/services/${slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-electric-500 transition hover:text-navy-900"
      >
        Learn more
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="A complete AI help layer for the work your team repeats every day."
        text="Pick one workflow or combine several. AidlyAI maps, installs and maintains the operating system around your customer conversations, leads, admin work and reporting."
      >
        <PrimaryLink to="/book-audit">Book an audit</PrimaryLink>
        <SecondaryLink to="/pricing">See pricing</SecondaryLink>
      </PageHero>
      <ServicesSection />
      <ComparisonSection />
      <FinalCta />
    </>
  );
}

function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return <Navigate to="/not-found" replace />;
  }

  const Icon = service.icon;

  return (
    <>
      <PageHero eyebrow={service.eyebrow} title={service.title} text={service.outcome}>
        <PrimaryLink to="/book-audit">Build this workflow</PrimaryLink>
        <SecondaryLink to="/services">Back to services</SecondaryLink>
      </PageHero>
      <section className="bg-slate-50 py-20 text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="rounded-lg bg-navy-950 p-8 text-white shadow-panel">
            <Icon className="text-electric-300" size={42} />
            <h2 className="mt-6 text-3xl font-semibold">{service.title} system</h2>
            <p className="mt-4 leading-7 text-slate-300">{service.text}</p>
            <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold text-electric-300">Typical launch</p>
              <p className="mt-2 text-4xl font-semibold">14 days</p>
              <p className="mt-2 text-sm text-slate-400">Discovery, build, QA and team handoff.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.features.map((feature) => (
              <div key={feature} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <Check className="text-electric-500" size={22} />
                <h3 className="mt-4 text-lg font-semibold">{feature}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Configured around your tools, reviewed by our team and improved monthly.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

function ComparisonSection() {
  return (
    <section className="bg-white py-20 text-slate-950">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ["Installed for you", "We design the workflow, connect tools, test edge cases and document the handoff."],
            ["Maintained monthly", "We monitor performance, make improvements and keep your team supported."],
            ["Built around ownership", "Your data, access and accounts remain yours. We help operate the layer around them."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-7">
              <FileCheck2 className="text-electric-500" size={28} />
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection({ preview = false }) {
  const [active, setActive] = useState(useCases[0].name);
  const selected = useCases.find((item) => item.name === active) ?? useCases[0];
  const Icon = selected.icon;

  return (
    <section className="bg-navy-950 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-electric-300">
              Use Cases
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-normal text-white md:text-5xl">
              Built for small teams with real operational pressure.
            </h2>
          </div>
          {preview && <SecondaryLink to="/use-cases">Explore use cases</SecondaryLink>}
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-3">
            {useCases.map((useCase) => (
              <button
                key={useCase.name}
                type="button"
                className={`rounded-lg border p-5 text-left transition ${
                  active === useCase.name
                    ? "border-electric-400 bg-electric-500/12"
                    : "border-white/10 bg-white/[0.04] hover:border-electric-400/50"
                }`}
                onClick={() => setActive(useCase.name)}
              >
                <p className="font-semibold text-white">{useCase.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{useCase.headline}</p>
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-7 shadow-panel">
            <Icon className="text-electric-300" size={38} />
            <h3 className="mt-5 text-3xl font-semibold text-white">{selected.headline}</h3>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">{selected.text}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {selected.examples.map((example) => (
                <div key={example} className="rounded-md border border-white/10 bg-navy-950/60 p-4 text-sm font-semibold text-slate-200">
                  {example}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Use cases"
        title="AI workflows for service, sales and admin bottlenecks."
        text="AidlyAI is best when the problem is repetitive, time-sensitive and spread across tools. These are the patterns we see most often."
      >
        <PrimaryLink to="/book-audit">Audit my workflows</PrimaryLink>
      </PageHero>
      <UseCasesSection />
      <VerticalLandingLinks dark={false} />
      <RoiCalculator />
      <FinalCta />
    </>
  );
}

function VerticalLandingLinks({ dark = true }) {
  return (
    <section className={`${dark ? "bg-navy-950" : "bg-slate-50"} py-20`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p
              className={`text-sm font-semibold uppercase tracking-[0.18em] ${
                dark ? "text-electric-300" : "text-electric-500"
              }`}
            >
              Vertical pages
            </p>
            <h2
              className={`mt-3 max-w-2xl text-4xl font-semibold tracking-normal md:text-5xl ${
                dark ? "text-white" : "text-slate-950"
              }`}
            >
              Landing pages that speak to the business they are built for.
            </h2>
          </div>
          <p className={`max-w-xl leading-7 ${dark ? "text-slate-300" : "text-slate-600"}`}>
            Each vertical page uses the same AidlyAI offer, but frames the pain, workflow and
            outcome around a specific buyer.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verticalPages.map((page) => {
            const Icon = page.icon;

            return (
              <Link
                key={page.slug}
                to={`/${page.slug}`}
                className={`group rounded-lg border p-6 transition hover:-translate-y-1 ${
                  dark
                    ? "border-white/10 bg-white/[0.045] hover:border-electric-400/45"
                    : "border-slate-200 bg-white shadow-sm hover:border-electric-300 hover:shadow-xl hover:shadow-sky-900/10"
                }`}
              >
                <Icon className={dark ? "text-electric-300" : "text-electric-500"} size={28} />
                <p className={`mt-5 text-sm font-semibold ${dark ? "text-electric-300" : "text-electric-500"}`}>
                  {page.industry}
                </p>
                <h3 className={`mt-2 text-xl font-semibold ${dark ? "text-white" : "text-slate-950"}`}>
                  {page.primaryService}
                </h3>
                <p className={`mt-3 text-sm leading-6 ${dark ? "text-slate-300" : "text-slate-600"}`}>
                  {page.headline}
                </p>
                <span className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${dark ? "text-electric-300" : "text-electric-500"}`}>
                  Open vertical page
                  <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VerticalLandingPage({ landingSlug }) {
  const { slug } = useParams();
  const page = verticalPages.find((item) => item.slug === (landingSlug ?? slug));

  if (!page) {
    return <Navigate to="/not-found" replace />;
  }

  const Icon = page.icon;

  return (
    <>
      <PageShell>
        <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric-400/25 bg-electric-500/10 px-4 py-2 text-sm font-medium text-electric-300">
              <Icon size={16} />
              Built for {page.industry}
            </div>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-normal text-white sm:text-6xl">
              {page.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{page.subheadline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink to="/book-audit" className="justify-center px-6 py-4">
                Book a workflow audit
              </PrimaryLink>
              <SecondaryLink to="/pricing" className="justify-center px-6 py-4">
                See pricing
              </SecondaryLink>
            </div>
            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {page.metrics.map((metric) => (
                <div key={metric} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <Check className="text-emerald-300" size={18} />
                  <p className="mt-3 text-sm font-semibold text-slate-200">{metric}</p>
                </div>
              ))}
            </div>
          </div>
          <VerticalOpsPanel page={page} />
        </div>
      </PageShell>
      <section className="bg-slate-50 py-20 text-slate-950">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-electric-500">
                Why this matters
              </p>
              <h2 className="mt-3 text-4xl font-semibold">
                Generic automation misses the details of {page.industry.toLowerCase()}.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                AidlyAI starts with your buyer’s real moment of urgency, then installs workflows
                around intake, follow-up, escalation and reporting.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {page.painPoints.map((point) => (
                <div key={point} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <Clock3 className="text-electric-500" size={24} />
                  <h3 className="mt-4 text-lg font-semibold">{point}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {page.workflows.map((workflow) => (
              <div key={workflow} className="rounded-lg bg-navy-950 p-6 text-white shadow-panel">
                <Route className="text-electric-300" size={24} />
                <h3 className="mt-4 text-lg font-semibold">{workflow}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Configured around your current tools and maintained by AidlyAI after launch.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-20 text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-electric-500">
              Get the vertical audit
            </p>
            <h2 className="mt-3 text-4xl font-semibold">Show us your current workflow.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              We will identify the fastest first AI system for {page.audience.toLowerCase()} and
              map what can launch in the first 14 days.
            </p>
          </div>
          <div className="rounded-lg bg-navy-950 p-1">
            <AuditForm />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

function VerticalOpsPanel({ page }) {
  return (
    <div className="glass-card rounded-lg p-5 shadow-panel">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-lg font-semibold text-white">{page.primaryService} workflow</p>
          <p className="text-sm text-slate-400">{page.industry} intake and follow-up</p>
        </div>
        <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          Live plan
        </span>
      </div>
      <div className="mt-5 space-y-3">
        {page.workflows.map((workflow, index) => (
          <div key={workflow} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-start gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-electric-500/15 text-sm font-semibold text-electric-300">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold text-white">{workflow}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Triggered, logged and routed with human escalation when needed.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-electric-300/20 bg-electric-500/10 p-4">
        <p className="text-sm font-semibold text-electric-300">Recommended first launch</p>
        <p className="mt-1 text-white">{page.primaryService} for {page.industry.toLowerCase()}</p>
      </div>
    </div>
  );
}

function RoiCalculator() {
  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState(45);
  const monthlyValue = Math.round(hours * 4.33 * rate);
  const annualValue = monthlyValue * 12;

  return (
    <section className="bg-slate-50 py-20 text-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-electric-500">
            ROI estimate
          </p>
          <h2 className="mt-3 text-4xl font-semibold">What repeated admin time is costing you.</h2>
          <p className="mt-4 leading-7 text-slate-600">
            This quick calculator is not a promise of savings. It helps frame whether an AI help
            system is worth a deeper workflow audit.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
          <label className="block text-sm font-semibold text-slate-700" htmlFor="hours">
            Repetitive hours per week
          </label>
          <input
            id="hours"
            type="range"
            min="1"
            max="40"
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
            className="mt-3 w-full"
          />
          <p className="mt-2 text-sm text-slate-500">{hours} hours/week</p>
          <label className="mt-6 block text-sm font-semibold text-slate-700" htmlFor="rate">
            Fully loaded hourly cost
          </label>
          <input
            id="rate"
            type="range"
            min="20"
            max="150"
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
            className="mt-3 w-full"
          />
          <p className="mt-2 text-sm text-slate-500">${rate}/hour</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-950 p-5 text-white">
              <p className="text-sm text-slate-400">Monthly time value</p>
              <p className="mt-2 text-3xl font-semibold">${monthlyValue.toLocaleString()}</p>
            </div>
            <div className="rounded-lg bg-electric-500 p-5 text-navy-950">
              <p className="text-sm font-semibold">Annualized value</p>
              <p className="mt-2 text-3xl font-semibold">${annualValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ preview = false }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-400/70 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-electric-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-electric-300">
            Process
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-normal text-white md:text-5xl">
            Our process. Simple and hands-off.
          </h2>
        </div>
        <div className="relative mt-12 grid gap-5 lg:grid-cols-3">
          <div className="absolute left-[16.5%] right-[16.5%] top-12 hidden h-px bg-gradient-to-r from-electric-400/20 via-electric-400/70 to-electric-400/20 lg:block" />
          {processSteps.map((step, index) => (
            <article key={step.title} className="relative rounded-lg border border-white/10 bg-white/[0.045] p-7 backdrop-blur transition hover:-translate-y-1 hover:border-electric-400/45 hover:bg-white/[0.07]">
              <div className="relative z-10 mb-7 grid h-14 w-14 place-items-center rounded-full border border-electric-300/40 bg-navy-900 text-xl font-semibold text-electric-300 shadow-glow">
                {index + 1}
              </div>
              <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-300">{step.text}</p>
              {!preview && (
                <ul className="mt-5 space-y-2">
                  {step.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check size={15} className="text-electric-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
        {preview && (
          <div className="mt-10 text-center">
            <SecondaryLink to="/process">See the full process</SecondaryLink>
          </div>
        )}
      </div>
    </section>
  );
}

function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="A controlled rollout that feels calm from the customer side."
        text="We treat each AI workflow like an operational system: scoped, tested, monitored and improved after launch."
      >
        <PrimaryLink to="/book-audit">Start with an audit</PrimaryLink>
      </PageHero>
      <ProcessSection />
      <section className="bg-slate-50 py-20 text-slate-950">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-4">
            {["Access review", "Workflow QA", "Human escalation", "Monthly optimization"].map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <ShieldCheck className="text-electric-500" size={26} />
                <h3 className="mt-4 text-lg font-semibold">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Included in every launch so the system behaves reliably in real operations.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PricingStrip() {
  const items = [
    { value: "$1,500", label: "setup", text: "One-time onboarding and build." },
    { value: "$500", label: "/mo support", text: "Ongoing support, updates and optimization." },
    { value: "14-day", label: "launch", text: "Most businesses live within 14 days." },
  ];

  return (
    <section className="bg-slate-50 px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#020712,#082a3f_52%,#06321f)] text-white shadow-panel">
        <div className="grid divide-y divide-white/12 md:grid-cols-3 md:divide-x md:divide-y-0">
          {items.map((item) => (
            <div key={item.label} className="p-8">
              <p className="text-4xl font-semibold tracking-normal">{item.value}</p>
              <p className="mt-2 text-lg font-semibold text-electric-300">{item.label}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing for an installed and maintained AI help system."
        text="A fixed setup covers discovery, build, QA and launch. Monthly support keeps workflows monitored, updated and useful."
      >
        <PrimaryLink to="/book-audit">Book an audit</PrimaryLink>
        <SecondaryLink to="/contact">Ask a question</SecondaryLink>
      </PageHero>
      <PricingStrip />
      <section className="bg-slate-50 pb-20 text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold">What is included</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                "Workflow mapping",
                "Tool connection plan",
                "Automation build",
                "QA test pass",
                "Team training",
                "Monthly support",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md bg-slate-50 p-4">
                  <Check className="text-electric-500" size={18} />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-navy-950 p-8 text-white shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-electric-300">
              Best first step
            </p>
            <h3 className="mt-4 text-3xl font-semibold">AI workflow audit</h3>
            <p className="mt-4 leading-7 text-slate-300">
              We review your current intake, follow-up and admin flow, then recommend the highest
              value first launch.
            </p>
            <PrimaryLink to="/book-audit" className="mt-8">Book the audit</PrimaryLink>
          </div>
        </div>
      </section>
      <FaqSection />
    </>
  );
}

function FaqSection() {
  return (
    <section className="bg-white py-20 text-slate-950">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold">Questions small business owners ask first.</h2>
        <div className="mt-8 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-slate-50">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-6">
              <summary className="cursor-pointer list-none text-lg font-semibold">
                {faq.question}
              </summary>
              <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustLogos() {
  return (
    <section className="bg-slate-50 px-5 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Trusted by small businesses
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo}
              className="flex min-h-24 items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-center text-sm font-semibold text-slate-500 shadow-sm"
            >
              <Building2 className="shrink-0 text-slate-400" size={20} />
              <span>{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-[linear-gradient(135deg,#020712,#06385b_58%,#064e3b)] px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-electric-300">
            Ready when your workflows are
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold text-white">
            Start with the one AI system your business needs most.
          </h2>
        </div>
        <PrimaryLink to="/book-audit" className="justify-center">Book an AI workflow audit</PrimaryLink>
      </div>
    </section>
  );
}

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  businessType: "",
  teamSize: "",
  priority: "",
  timeline: "",
  message: "",
  website: "",
  consent: false,
};

function validateAuditForm(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.company.trim()) errors.company = "Company is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid business email.";
  }
  if (!values.businessType) errors.businessType = "Select a business type.";
  if (!values.priority) errors.priority = "Select the workflow you want to improve first.";
  if (!values.timeline) errors.timeline = "Select a timeline.";
  if (!values.consent) errors.consent = "Consent is required to submit this request.";

  return errors;
}

function storeAuditRequest(payload) {
  const existing = JSON.parse(localStorage.getItem("aidly-audit-requests") || "[]");
  localStorage.setItem("aidly-audit-requests", JSON.stringify([payload, ...existing]));
}

async function deliverAuditRequest(payload) {
  if (!auditWebhookUrl) {
    return "local";
  }

  await fetch(auditWebhookUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  return "email";
}

function AuditForm({ compact = false }) {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmitError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateAuditForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(null);
      return;
    }

    if (values.website.trim()) {
      setSubmitted("email");
      setValues(initialForm);
      return;
    }

    const payload = {
      ...values,
      pageUrl: window.location.href,
      submittedAt: new Date().toISOString(),
    };

    setIsSubmitting(true);
    setSubmitError("");

    try {
      storeAuditRequest(payload);
      const deliveryMode = await deliverAuditRequest(payload);
      setSubmitted(deliveryMode);
      setValues(initialForm);
    } catch (error) {
      setSubmitted(null);
      setSubmitError("We could not send the audit request. Please email us directly and we will help right away.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="rounded-lg border border-white/10 bg-white/[0.05] p-6 shadow-panel"
      onSubmit={handleSubmit}
      noValidate
      data-testid="audit-form"
    >
      <input
        type="text"
        name="website"
        value={values.website}
        onChange={updateField}
        className="hidden"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" value={values.name} error={errors.name} onChange={updateField} />
        <Field label="Business email" name="email" type="email" value={values.email} error={errors.email} onChange={updateField} />
        <Field label="Phone" name="phone" value={values.phone} error={errors.phone} onChange={updateField} />
        <Field label="Company" name="company" value={values.company} error={errors.company} onChange={updateField} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <SelectField label="Business type" name="businessType" value={values.businessType} error={errors.businessType} onChange={updateField} options={["Home services", "Clinic or med spa", "Restaurant or retail", "Professional services", "Other"]} />
        <SelectField label="Team size" name="teamSize" value={values.teamSize} error={errors.teamSize} onChange={updateField} options={["1-5", "6-15", "16-50", "50+"]} />
        <SelectField label="First workflow to improve" name="priority" value={values.priority} error={errors.priority} onChange={updateField} options={["Customer service", "Lead follow-up", "Admin work", "Reports", "Not sure yet"]} />
        <SelectField label="Timeline" name="timeline" value={values.timeline} error={errors.timeline} onChange={updateField} options={["ASAP", "This month", "Next 60 days", "Just researching"]} />
      </div>
      {!compact && (
        <div className="mt-4">
          <label className="block text-sm font-semibold text-slate-200" htmlFor="message">
            What should we know?
          </label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={updateField}
            rows="4"
            className="mt-2 w-full rounded-md border border-white/10 bg-navy-950 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-electric-400"
            placeholder="Tell us about missed calls, slow follow-up, manual reporting or any workflow that keeps slipping."
          />
        </div>
      )}
      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-slate-300">
        <input
          className="mt-1"
          type="checkbox"
          name="consent"
          checked={values.consent}
          onChange={updateField}
        />
        I agree to be contacted by AidlyAI about this workflow audit.
      </label>
      {errors.consent && <p className="mt-2 text-sm text-red-300">{errors.consent}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-electric-500 px-5 py-3 text-sm font-semibold text-navy-950 shadow-glow transition hover:bg-electric-300 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? "Sending request..." : "Submit audit request"}
        <ArrowRight size={16} />
      </button>
      <div aria-live="polite" className="mt-4 space-y-3">
        {submitted && (
          <p className="rounded-md border border-emerald-300/25 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-200">
            {submitted === "email"
              ? "Request received. Your audit request was sent to AidlyAI and we will reply within one business day."
              : "Request received. The request was saved locally, but email delivery still needs to be configured."}{" "}
            You can also email us directly at{" "}
            <a className="underline decoration-emerald-200/60 underline-offset-4" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>.
          </p>
        )}
        {submitError && (
          <p className="rounded-md border border-red-300/25 bg-red-300/10 px-4 py-3 text-sm font-semibold text-red-200">
            {submitError}{" "}
            <a className="underline decoration-red-200/60 underline-offset-4" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </p>
        )}
      </div>
    </form>
  );
}

function Field({ label, name, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-200" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-md border border-white/10 bg-navy-950 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-electric-400"
      />
      {error && <p className="mt-1 text-sm text-red-300">{error}</p>}
    </div>
  );
}

function SelectField({ label, name, value, onChange, error, options }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-200" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-md border border-white/10 bg-navy-950 px-3 py-3 text-sm text-white outline-none transition focus:border-electric-400"
      >
        <option value="">Select one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-300">{error}</p>}
    </div>
  );
}

function ContactPage({ booking = false }) {
  return (
    <PageShell>
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-electric-300">
            {booking ? "Book an audit" : "Contact"}
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-normal text-white md:text-6xl">
            {booking ? "Tell us where operations are getting stuck." : "Talk to AidlyAI."}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Share the workflow you want fixed first. We will review it like an operator, not just
            another software demo.
          </p>
          <div className="mt-8 grid gap-4">
            {[
              [
                "Email",
                <a
                  className="text-electric-200 underline decoration-electric-300/40 underline-offset-4 transition hover:text-white"
                  href={`mailto:${contactEmail}`}
                >
                  {contactEmail}
                </a>,
              ],
              ["Response", "Within one business day"],
              ["Best fit", "Small businesses in the United States"],
              ["Launch target", "Most first systems live within 14 days"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-semibold text-electric-300">{label}</p>
                <p className="mt-1 text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <AuditForm />
      </div>
    </PageShell>
  );
}

function LegalPage({ type }) {
  const isPrivacy = type === "privacy";
  return (
    <PageShell>
      <div className="relative mx-auto max-w-4xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-electric-300">
          Legal
        </p>
        <h1 className="mt-4 text-5xl font-semibold text-white">
          {isPrivacy ? "Privacy Policy" : "Terms of Service"}
        </h1>
        <div className="mt-8 space-y-6 rounded-lg border border-white/10 bg-white/[0.05] p-7 leading-7 text-slate-300">
          <p>
            This page is a professional placeholder for AidlyAI, LLC. It explains the operating
            principles the site presents while final legal language is prepared by counsel.
          </p>
          <p>
            {isPrivacy
              ? "AidlyAI treats customer business data as confidential operational information and only requests access needed to scope, install and support agreed workflows."
              : "Services are scoped through a workflow audit, setup agreement and monthly support relationship. Customers retain ownership of their accounts, data and business processes."}
          </p>
          <p>
            For formal legal requests, email{" "}
            <a className="text-electric-200 underline decoration-electric-300/40 underline-offset-4" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>{" "}
            and include the topic in your message.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

function NotFoundPage() {
  return (
    <PageHero
      eyebrow="404"
      title="This page is not part of the AidlyAI site."
      text="The link may have changed. Head back to the main site and choose a working destination."
    >
      <PrimaryLink to="/">Go home</PrimaryLink>
      <SecondaryLink to="/contact">Contact us</SecondaryLink>
    </PageHero>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1fr_1.2fr_1fr] lg:px-8">
        <div>
          <Logo />
        </div>
        <div>
          <p className="max-w-lg text-lg leading-8 text-slate-300">
            Your AI helper for leads, follow-ups and daily business work.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link className="text-slate-400 transition hover:text-white" to="/services">Services</Link>
            <Link className="text-slate-400 transition hover:text-white" to="/ai-receptionist-for-hvac">HVAC AI Receptionist</Link>
            <Link className="text-slate-400 transition hover:text-white" to="/ai-front-desk-for-med-spas">Med Spa Front Desk</Link>
            <Link className="text-slate-400 transition hover:text-white" to="/pricing">Pricing</Link>
            <Link className="text-slate-400 transition hover:text-white" to="/privacy">Privacy</Link>
            <Link className="text-slate-400 transition hover:text-white" to="/terms">Terms</Link>
          </div>
        </div>
        <div className="md:text-right">
          <p className="text-base font-semibold text-white">Your business. Your data. Your AI helper.</p>
          <p className="mt-3 text-sm text-slate-400">AidlyAI.com</p>
          <a
            className="mt-2 inline-flex text-sm font-semibold text-electric-300 transition hover:text-white"
            href={`mailto:${contactEmail}`}
          >
            {contactEmail}
          </a>
          <p className="mt-4 text-sm text-slate-500">
            © 2025 AidlyAI, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function AppRoutes() {
  const routeElements = useMemo(
    () => (
      <Routes>
        <RouterRoute path="/" element={<HomePage />} />
        <RouterRoute
          path="/ai-receptionist-for-hvac"
          element={<VerticalLandingPage landingSlug="ai-receptionist-for-hvac" />}
        />
        <RouterRoute
          path="/ai-lead-follow-up-for-plumbers"
          element={<VerticalLandingPage landingSlug="ai-lead-follow-up-for-plumbers" />}
        />
        <RouterRoute
          path="/ai-front-desk-for-med-spas"
          element={<VerticalLandingPage landingSlug="ai-front-desk-for-med-spas" />}
        />
        <RouterRoute
          path="/ai-review-manager-for-local-business"
          element={<VerticalLandingPage landingSlug="ai-review-manager-for-local-business" />}
        />
        <RouterRoute
          path="/ai-admin-assistant-for-small-business"
          element={<VerticalLandingPage landingSlug="ai-admin-assistant-for-small-business" />}
        />
        <RouterRoute path="/services" element={<ServicesPage />} />
        <RouterRoute path="/services/:slug" element={<ServiceDetailPage />} />
        <RouterRoute path="/use-cases" element={<UseCasesPage />} />
        <RouterRoute path="/pricing" element={<PricingPage />} />
        <RouterRoute path="/process" element={<ProcessPage />} />
        <RouterRoute path="/contact" element={<ContactPage />} />
        <RouterRoute path="/book-audit" element={<ContactPage booking />} />
        <RouterRoute path="/privacy" element={<LegalPage type="privacy" />} />
        <RouterRoute path="/terms" element={<LegalPage type="terms" />} />
        <RouterRoute path="/not-found" element={<NotFoundPage />} />
        <RouterRoute path="*" element={<NotFoundPage />} />
      </Routes>
    ),
    []
  );

  return (
    <div className="min-h-screen overflow-hidden text-white">
      <ScrollToTop />
      <Header />
      <main>{routeElements}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export { AppRoutes, AuditForm, validateAuditForm };
export default App;
