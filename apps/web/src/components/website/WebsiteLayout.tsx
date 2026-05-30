import { useState } from "react"
import { WebsiteNavbar } from "./WebsiteNavbar"
import { LiveChatWidget } from "./LiveChatWidget"
import { BrandLogo } from "@/components/BrandLogo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ShieldCheck, Monitor, Database, CloudArrowDown, CheckCircle, ArrowRight, 
  Gauge, ListChecks, Bell, Plug, Certificate, HardDrives,
  Camera, Lock, Siren, NetworkX, Thermometer, ChartLine,
  DesktopTower, Package, CloudCheck, Lightning, WindowsLogo, LinuxLogo,
  Key, Buildings, Warning, Broadcast, Circle, Users, Headset,
  EnvelopeSimple
} from "@phosphor-icons/react"

interface WebsiteLayoutProps {
  currentPage: string
  onNavigate: (page: string) => void
  onLogin: () => void
}

type ResearchCapability = {
  label: string
  detail: string
  icon: typeof Database
}

export function WebsiteLayout({ currentPage, onNavigate, onLogin }: WebsiteLayoutProps) {
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false)
  const [liveChatPrefill, setLiveChatPrefill] = useState<string | undefined>()

  const handleOpenLiveChat = (prefill?: string) => {
    if (prefill) {
      setLiveChatPrefill(prefill)
    }
    setIsLiveChatOpen(true)
  }

  return (
    <div className="min-h-screen bg-background premium-shell overflow-hidden">
      <WebsiteNavbar
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogin={onLogin}
        onOpenLiveChat={handleOpenLiveChat}
      />
      <main className="relative z-10">
        {currentPage === "home" && <HomePage onNavigate={onNavigate} />}
        {currentPage === "product" && <ProductPage />}
        {currentPage === "enterprise" && <EnterprisePage />}
        {currentPage === "download" && <DownloadPage />}
        {currentPage === "licensing" && <LicensingPage />}
        {currentPage === "documentation" && <DocumentationPage />}
        {currentPage === "support" && <SupportPage />}
      </main>
      <footer className="relative border-t border-border/40 bg-gradient-to-b from-card/20 via-card/40 to-card/60 mt-16 md:mt-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,200,240,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,200,240,0.02),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 md:gap-14 mb-10 sm:mb-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3.5">
                <BrandLogo
                  subtitle="SECURITY PLATFORM"
                  markClassName="w-20 h-20"
                  titleClassName="text-2xl font-extrabold tracking-normal"
                  subtitleClassName="text-[10px] tracking-[0.14em] mt-1.5"
                />
              </div>
              <p className="text-sm text-muted-foreground dark:text-slate-300 max-w-md leading-relaxed">
                Governed cyber research platform for telemetry correlation, evidence handling, and human-reviewed response planning.
              </p>
              <div className="flex flex-col gap-3.5">
                <a 
                  href="mailto:research@guardivex.com"
                  className="flex items-center gap-3 text-sm group hover:text-primary transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:scale-105 transition-all shrink-0">
                    <EnvelopeSimple size={17} weight="bold" className="text-primary" />
                  </div>
                  <span className="font-semibold">research@guardivex.com</span>
                </a>
                <a
                  href="mailto:security@guardivex.com"
                  className="flex items-center gap-3 text-sm group hover:text-primary transition-colors break-all sm:break-normal"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:scale-105 transition-all shrink-0">
                    <ShieldCheck size={17} weight="bold" className="text-primary" />
                  </div>
                  <span className="font-semibold">security@guardivex.com</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-[13px] uppercase tracking-[0.15em] mb-4 sm:mb-5 text-foreground">Product</h4>
              <div className="flex flex-col gap-3 sm:gap-3.5">
                <button 
                  onClick={() => onNavigate("product")}
                  className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Features
                </button>
                <button 
                  onClick={() => onNavigate("enterprise")}
                  className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Enterprise Solutions
                </button>
                <button 
                  onClick={() => onNavigate("download")}
                  className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Download
                </button>
                <button 
                  onClick={() => onNavigate("licensing")}
                  className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Pricing & Licensing
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-[13px] uppercase tracking-[0.15em] mb-4 sm:mb-5 text-foreground">Resources</h4>
              <div className="flex flex-col gap-3 sm:gap-3.5">
                <button 
                  onClick={() => onNavigate("documentation")}
                  className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Documentation
                </button>
                <button 
                  onClick={() => onNavigate("support")}
                  className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Support Center
                </button>
                <button onClick={() => onNavigate("documentation")} className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  API Reference
                </button>
                <button onClick={() => onNavigate("support")} className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Contact Support
                </button>
                <button onClick={() => onNavigate("support")} className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  System Status
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-[13px] uppercase tracking-[0.15em] mb-4 sm:mb-5 text-foreground">Company</h4>
              <div className="flex flex-col gap-3 sm:gap-3.5">
                <button onClick={() => onNavigate("support")} className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  About Guardivex
                </button>
                <a href="mailto:research@guardivex.com" className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all font-medium group flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Contact Sales
                </a>
                <button onClick={() => onNavigate("documentation")} className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Documentation
                </button>
                <a href="mailto:security@guardivex.com" className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all font-medium group flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Security Contact
                </a>
                <button onClick={() => onNavigate("documentation")} className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Trust Center
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 sm:pt-10 border-t border-border/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-xs sm:text-sm text-muted-foreground dark:text-slate-300 text-center md:text-left order-2 md:order-1">
                &copy; 2026 Guardivex. All rights reserved.
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-xs text-muted-foreground dark:text-slate-300 font-medium order-1 md:order-2">
                <button onClick={() => onNavigate("documentation")} className="hover:text-primary dark:hover:text-white transition-colors hover:underline decoration-primary decoration-2 underline-offset-4">
                  Privacy Policy
                </button>
                <button onClick={() => onNavigate("documentation")} className="hover:text-primary dark:hover:text-white transition-colors hover:underline decoration-primary decoration-2 underline-offset-4">
                  Terms of Service
                </button>
                <button onClick={() => onNavigate("documentation")} className="hover:text-primary dark:hover:text-white transition-colors hover:underline decoration-primary decoration-2 underline-offset-4 hidden sm:inline">
                  Security
                </button>
                <button onClick={() => onNavigate("documentation")} className="hover:text-primary dark:hover:text-white transition-colors hover:underline decoration-primary decoration-2 underline-offset-4 hidden sm:inline">
                  Governance
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
              {[
                "Human approval gates",
                "Tenant-scoped evidence",
                "Recommendation-only AI",
                "Audit-ready workflows",
              ].map((label) => (
                <Badge key={label} variant="outline" className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 font-semibold border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all">
                  {label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <LiveChatWidget
        isOpen={isLiveChatOpen}
        onOpenChange={setIsLiveChatOpen}
        prefillMessage={liveChatPrefill}
        onPrefillConsumed={() => setLiveChatPrefill(undefined)}
      />
    </div>
  )
}

function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const heroCapabilities: ResearchCapability[] = [
    { label: "Threat intelligence desk", detail: "Map IOCs, tactics, identities, devices, and evidence into one research case.", icon: Database },
    { label: "Research-safe AI", detail: "Generate recommendations and response plans without direct control of physical systems.", icon: Lock },
    { label: "Case-grade evidence", detail: "Preserve analyst notes, approvals, timelines, and audit trails for every finding.", icon: Certificate },
  ]

  const heroAssurances = ["No direct hardware control", "Tenant-scoped research", "Human approval gates"]
  const heroProofPoints = [
    ["AI direct actions", "0"],
    ["Human review", "Required"],
    ["Evidence scope", "Tenant isolated"],
  ]

  return (
    <div className="relative guardivex-home-typography overflow-x-clip bg-[var(--gvx-hero-bg)] text-[var(--gvx-hero-text)]">
      <section className="relative isolate overflow-hidden border-b border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-bg)] text-[var(--gvx-hero-text)]">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,var(--gvx-hero-bg)_0%,var(--gvx-hero-bg-soft)_52%,var(--gvx-hero-bg)_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.035] bg-[linear-gradient(var(--gvx-hero-accent)_1px,transparent_1px),linear-gradient(90deg,var(--gvx-hero-accent)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute left-[8%] top-12 -z-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--gvx-hero-glow),transparent_68%)]" />
        <div className="absolute right-[8%] top-24 -z-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--gvx-logo-olive-soft),transparent_72%)]" />

        <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-4 py-10 sm:px-8 sm:py-14 md:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.68fr)] lg:items-center lg:px-10 lg:py-16 xl:px-12">
          <div className="min-w-0 text-center lg:text-left">
            <div className="inline-flex max-w-full items-center gap-2 rounded-md border border-[var(--gvx-hero-border)] bg-[var(--gvx-menu-bg)] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--gvx-hero-muted)] shadow-[0_14px_34px_-30px_rgba(0,143,240,0.30)] sm:text-[9.5px]">
              <ShieldCheck size={13} weight="fill" className="text-[var(--gvx-hero-accent)]" />
              Governed cyber research platform
            </div>

            <h1 className="mx-auto mt-5 max-w-[760px] font-heading text-[2.35rem] font-extrabold leading-[1.06] tracking-normal text-[var(--gvx-hero-text)] [text-wrap:balance] sm:text-[3.25rem] sm:leading-[1.03] lg:mx-0 lg:text-[4.05rem]">
              Cyber research operations without unsafe automation.
            </h1>

            <p className="mx-auto mt-5 max-w-[650px] text-[0.98rem] leading-[1.72] text-[var(--gvx-hero-muted)] sm:text-[1.04rem] lg:mx-0">
              Guardivex gives security teams a controlled workspace for telemetry, IOCs, incident research, evidence handling, and AI-assisted recommendations that never execute physical actions.
            </p>

            <div className="mx-auto mt-5 flex max-w-[620px] flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-[var(--gvx-hero-muted)] lg:mx-0 lg:justify-start">
              {heroAssurances.map((label) => (
                <span key={label} className="rounded-md border border-[var(--gvx-hero-border)] bg-[var(--gvx-menu-bg)] px-2.5 py-1 shadow-[0_10px_24px_-24px_rgba(0,143,240,0.26)]">
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 min-[440px]:flex-row lg:justify-start">
              <Button size="lg" onClick={() => onNavigate("download")} className="h-11 w-full max-w-[330px] rounded-md border border-[color:var(--gvx-hero-accent)] bg-[linear-gradient(135deg,var(--gvx-hero-accent-2),var(--gvx-hero-accent))] px-4 text-[0.84rem] font-semibold text-white shadow-[0_20px_48px_-30px_rgba(0,143,240,0.70)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95 focus-visible:ring-[var(--gvx-hero-accent)] min-[440px]:w-auto">
                <CloudArrowDown size={16} className="mr-2" weight="bold" />
                Deploy Research Server
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate("product")} className="h-11 w-full max-w-[330px] rounded-md border-[var(--gvx-menu-border)] bg-[var(--gvx-menu-bg)] px-4 text-[0.84rem] font-semibold text-[var(--gvx-hero-text)] shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-menu-hover)] min-[440px]:w-auto">
                <Monitor size={16} className="mr-2" weight="bold" />
                View Console
              </Button>
            </div>

            <div className="mx-auto mt-7 grid max-w-[680px] grid-cols-1 overflow-hidden rounded-lg border border-[var(--gvx-hero-border)] bg-[var(--gvx-menu-bg)] text-left shadow-[0_20px_54px_-46px_rgba(7,17,31,0.34)] min-[520px]:grid-cols-3 lg:mx-0">
              {heroProofPoints.map(([label, value]) => (
                <div key={label} className="border-b border-[var(--gvx-hero-border)] px-4 py-3 last:border-b-0 min-[520px]:border-b-0 min-[520px]:border-r min-[520px]:last:border-r-0">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--gvx-hero-subtle)]">{label}</div>
                  <div className="mt-1 font-heading text-sm font-bold text-[var(--gvx-hero-text)]">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[430px] lg:mx-0 lg:justify-self-end xl:max-w-[460px]">
            <div className="overflow-hidden rounded-xl border border-[var(--gvx-menu-border)] bg-[var(--gvx-menu-bg)] shadow-[0_30px_86px_-60px_rgba(0,143,240,0.50)]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--gvx-hero-border)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--gvx-hero-subtle)]">
                <span>AI operating boundary</span>
                <span className="shrink-0 rounded-full border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-accent-soft)] px-2 py-0.5 text-[var(--gvx-hero-accent)]">0 direct actions</span>
              </div>
              <div className="p-2.5">
                <img
                  src="/ai-boundary.svg"
                  alt="AI boundary: recommendation-only decision path with human approval gates"
                  className="block h-auto w-full rounded-lg"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <DashboardPreviewSection />

      <ThreatResearchLabSection />
      <CyberResearchSystemSection capabilities={heroCapabilities} />
      <InvestigationWorkflowSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="rounded-lg border border-[var(--gvx-menu-border)] bg-[linear-gradient(135deg,var(--gvx-menu-bg),var(--gvx-hero-bg-soft))] p-6 text-center shadow-[0_24px_64px_-52px_rgba(7,17,31,0.42)] sm:p-8 md:p-10 dark:bg-slate-950/65">
          <div className="mx-auto mb-3 inline-flex rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
            Research-ready deployment
          </div>
          <h2 className="mx-auto max-w-3xl text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground dark:text-slate-100 mb-2 sm:mb-3 leading-tight">Launch a governed cyber research workspace</h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground dark:text-slate-300 mb-6 sm:mb-8">
            Start with the self-hosted console, connect telemetry sources, and keep every recommendation behind policy, approvals, and audit evidence.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => onNavigate("download")} className="h-11 w-full max-w-[320px] rounded-md px-5 font-semibold sm:w-auto">
              <CloudArrowDown size={16} className="mr-2" weight="bold" />
              Start Deployment
            </Button>
            <Button variant="outline" onClick={() => onNavigate("documentation")} className="h-11 w-full max-w-[320px] rounded-md px-5 font-semibold sm:w-auto">
              Read Architecture
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function ThreatResearchLabSection() {
  const signalRows = [
    { label: "Identity anomaly", source: "Okta + endpoint", severity: "High", time: "02:14" },
    { label: "PowerShell chain", source: "EDR telemetry", severity: "Critical", time: "02:18" },
    { label: "Suspicious ASN", source: "Threat intel", severity: "Medium", time: "02:21" },
  ]

  const researchNodes = ["Initial access", "Credential use", "Script execution", "Lateral signal", "Evidence package"]
  const intelligenceCards = [
    { label: "MITRE mapping", value: "T1059 / T1078", detail: "Tactics linked to investigation timeline" },
    { label: "Evidence quality", value: "Review-ready", detail: "Analyst notes, source links, and custody trail" },
    { label: "AI boundary", value: "0 actions", detail: "Recommendations only; no hardware control" },
  ]

  return (
    <section className="border-t border-border/60 bg-[linear-gradient(180deg,var(--gvx-hero-bg-soft),var(--gvx-hero-bg))] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 dark:bg-[#020817]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)] lg:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Threat research lab</div>
            <h2 className="mt-2 max-w-2xl text-2xl font-heading font-bold leading-tight text-foreground sm:text-3xl">
              Turn scattered signals into an explainable investigation graph.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground dark:text-slate-300 lg:justify-self-end">
            Analysts can move from suspicious activity to mapped tactics, evidence quality, and safe response recommendations without leaving the research surface.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.12fr)_minmax(300px,0.88fr)]">
          <div className="overflow-hidden rounded-lg border border-[var(--gvx-menu-border)] bg-[var(--gvx-menu-bg)] shadow-[0_26px_70px_-52px_rgba(7,17,31,0.48)]">
            <div className="flex flex-col gap-2 border-b border-[var(--gvx-menu-border)] px-4 py-3 min-[520px]:flex-row min-[520px]:items-center min-[520px]:justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Broadcast size={17} weight="duotone" className="text-primary" />
                Live research stream
              </div>
              <Badge variant="outline" className="w-fit rounded-sm border-primary/30 text-primary">Case GVX-24-118</Badge>
            </div>

            <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div className="divide-y divide-[var(--gvx-menu-border)]">
                {signalRows.map((row) => (
                  <div key={row.label} className="grid gap-2 px-4 py-3 min-[560px]:grid-cols-[88px_minmax(0,1fr)_120px_88px] min-[560px]:items-center">
                    <div className="font-mono text-xs font-semibold text-muted-foreground">{row.time}</div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-foreground">{row.label}</div>
                      <div className="text-xs text-muted-foreground">{row.source}</div>
                    </div>
                    <Badge variant={row.severity === "Critical" ? "destructive" : "outline"} className="w-fit rounded-sm text-[10px] uppercase">
                      {row.severity}
                    </Badge>
                    <div className="text-xs font-semibold text-primary">Correlated</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--gvx-menu-border)] bg-[var(--gvx-hero-bg-soft)] p-4 dark:bg-[var(--gvx-hero-bg)] lg:border-l lg:border-t-0">
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Evidence graph</div>
                <div className="grid gap-2">
                  {researchNodes.map((node, index) => (
                    <div key={node} className="flex items-center gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 font-mono text-[10px] font-bold text-primary">
                        {index + 1}
                      </div>
                      <div className="min-w-0 truncate text-xs font-semibold text-foreground">{node}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {intelligenceCards.map((item) => (
              <div key={item.label} className="rounded-lg border border-[var(--gvx-menu-border)] bg-[var(--gvx-menu-bg)] p-4 shadow-[0_18px_42px_-40px_rgba(7,17,31,0.38)]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.label}</div>
                <div className="mt-1 font-heading text-xl font-bold text-foreground">{item.value}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CyberResearchSystemSection({ capabilities }: { capabilities: ResearchCapability[] }) {
  const researchLayers = [
    { label: "Telemetry intake", value: "Endpoint, identity, cloud", icon: HardDrives },
    { label: "Signal enrichment", value: "IOCs, MITRE, timelines", icon: NetworkX },
    { label: "Evidence custody", value: "Notes, approvals, audit", icon: Certificate },
    { label: "Safe AI analysis", value: "Recommend, never execute", icon: Lock },
  ]

  return (
    <section className="border-t border-border/60 bg-background px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,1.08fr)] lg:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Cyber research system</div>
            <h2 className="mt-2 max-w-2xl text-2xl font-heading font-bold leading-tight text-foreground sm:text-3xl">
              A research console built for threat teams, not a generic dashboard.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground dark:text-slate-300 lg:justify-self-end">
            Guardivex organizes raw signals into cases, connects technical context, and keeps every high-risk response behind deterministic review.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {capabilities.map((item) => (
              <Card key={item.label} className="border-border bg-card transition-colors hover:border-primary/35">
                <CardHeader className="p-4 sm:p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-primary/10">
                    <item.icon size={19} className="text-primary" weight="duotone" />
                  </div>
                  <CardTitle className="text-base text-foreground">{item.label}</CardTitle>
                  <CardDescription className="text-sm leading-6 text-muted-foreground">{item.detail}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="rounded-lg border border-[var(--gvx-menu-border)] bg-[var(--gvx-menu-bg)] p-4 shadow-[0_22px_54px_-46px_rgba(7,17,31,0.42)]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Research stack</div>
                <div className="mt-1 font-heading text-lg font-bold text-foreground">Operational layers</div>
              </div>
              <Gauge size={22} weight="duotone" className="text-primary" />
            </div>
            <div className="grid gap-2">
              {researchLayers.map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-md border border-[var(--gvx-menu-border)] bg-[var(--gvx-hero-bg-soft)] px-3 py-2.5 dark:bg-[var(--gvx-hero-bg)]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10">
                    <item.icon size={16} weight="duotone" className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground">{item.label}</div>
                    <div className="truncate text-xs text-muted-foreground">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InvestigationWorkflowSection() {
  const workflowSteps = [
    { step: "01", title: "Collect", detail: "Normalize telemetry, alerts, IOCs, identities, and device context." },
    { step: "02", title: "Correlate", detail: "Map evidence to campaigns, tactics, affected assets, and timelines." },
    { step: "03", title: "Recommend", detail: "Generate AI-assisted findings without direct hardware execution." },
    { step: "04", title: "Approve", detail: "Route response plans through policy, RBAC, and audit logging." },
  ]

  const safeguards = ["No autonomous unlocks", "No alarm disabling", "No switch-port changes", "Every command reviewed"]

  return (
    <section className="border-t border-border/60 bg-[var(--gvx-hero-bg-soft)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 dark:bg-[#020817]">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
        <div>
          <Badge className="mb-4 rounded-sm border-[var(--gvx-menu-border)] bg-[var(--gvx-menu-bg)] text-[var(--gvx-hero-muted)]">
            Research workflow
          </Badge>
          <h2 className="text-2xl font-heading font-bold leading-tight text-foreground sm:text-3xl">
            From signal to defensible decision.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground dark:text-slate-300">
            The main workflow is designed for analysts who need speed, evidence quality, and controlled response boundaries.
          </p>
          <div className="mt-5 grid gap-2">
            {safeguards.map((label) => (
              <div key={label} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <CheckCircle size={15} weight="fill" className="text-success" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {workflowSteps.map((item) => (
            <div key={item.step} className="rounded-lg border border-[var(--gvx-menu-border)] bg-[var(--gvx-menu-bg)] p-4 shadow-[0_18px_42px_-38px_rgba(7,17,31,0.34)]">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="font-mono text-xs font-bold text-primary">{item.step}</span>
                <ArrowRight size={15} className="text-muted-foreground" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductPage() {
  const features = [
    { icon: Database, title: "Evidence Workspace", desc: "Unify telemetry, IOCs, identities, notes, and incident context in one case view" },
    { icon: ShieldCheck, title: "Governed AI", desc: "Generate summaries and recommendations without granting AI direct control of systems" },
    { icon: ChartLine, title: "Threat Correlation", desc: "Connect signals across endpoint, cloud, identity, network, and physical telemetry" },
    { icon: CheckCircle, title: "Review Workflows", desc: "Route high-risk recommendations through policy, approvals, and audit trails" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-heading font-semibold leading-tight mb-3">Cyber Research Capabilities</h1>
        <p className="text-xl text-muted-foreground">
          Investigation tooling for teams that need credible findings, controlled workflows, and evidence that stands up to review.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {features.map((feature, i) => (
          <Card key={i}>
            <CardHeader>
              <feature.icon size={32} className="text-primary mb-4" />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle>System Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Minimum</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>&bull; 4 CPU cores</li>
                <li>&bull; 8 GB RAM</li>
                <li>&bull; 100 GB storage</li>
                <li>&bull; Windows Server 2019+ or Linux</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Recommended</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>&bull; 8+ CPU cores</li>
                <li>&bull; 16+ GB RAM</li>
                <li>&bull; 500+ GB SSD storage</li>
                <li>&bull; Dedicated server hardware</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function EnterprisePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-heading font-semibold leading-tight mb-3">Enterprise Research Architecture</h1>
        <p className="text-xl text-muted-foreground">
          Tenant-aware cyber research workflows for SOC, IT, compliance, and investigation teams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { title: "Tenant Isolation", desc: "Separate organizations, permissions, and evidence trails by tenant" },
          { title: "Evidence Governance", desc: "Preserve findings, approvals, and audit history for review" },
          { title: "Human Review Gates", desc: "Keep unsafe actions behind policy and operator approval" },
          { title: "Custom Integrations", desc: "Connect SIEM, EDR, identity, cloud, and physical security data sources" },
          { title: "High Availability", desc: "Support resilient deployments for production research operations" },
          { title: "Control Boundaries", desc: "Use AI for recommendations while enforcement remains server-side and policy-driven" },
        ].map((item, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle>Contact Enterprise Sales</CardTitle>
          <CardDescription>
            Discuss your organization's research, governance, and deployment requirements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Request Demo
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function DownloadPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-heading font-semibold leading-tight mb-3">Research Server Deployment</h1>
        <p className="text-xl text-muted-foreground">
          Install Guardivex in your environment and keep investigation data under your control.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Windows Server</CardTitle>
            <CardDescription>Windows Server 2019 or later</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4 text-sm text-muted-foreground">
              <div>Version: 3.2.1</div>
              <div>Size: 450 MB</div>
              <div>Channel: Stable</div>
            </div>
            <Button className="w-full">
              <CloudArrowDown className="mr-2" size={20} />
              Download for Windows
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Linux Server</CardTitle>
            <CardDescription>Ubuntu 20.04+, RHEL 8+, Debian 11+</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4 text-sm text-muted-foreground">
              <div>Version: 3.2.1</div>
              <div>Size: 380 MB</div>
              <div>Channel: Stable</div>
            </div>
            <Button className="w-full">
              <CloudArrowDown className="mr-2" size={20} />
              Download for Linux
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-12 max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Installation Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <div className="font-semibold text-foreground mb-2">1. Download the installer</div>
            <p>Choose the appropriate version for your server operating system</p>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-2">2. Run the installation wizard</div>
            <p>Follow the on-screen instructions to configure your installation</p>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-2">3. Activate your license</div>
            <p>Enter your license key or connect to Guardivex Cloud for activation</p>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-2">4. Configure integrations</div>
            <p>Connect telemetry sources and begin building research cases</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LicensingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-heading font-semibold leading-tight mb-3">Licensing and Entitlements</h1>
        <p className="text-xl text-muted-foreground">
          Plans for self-hosted research teams, enterprises, and managed security providers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        {[
          {
            tier: "Starter",
            price: "$2,999/year",
            features: ["Up to 3 sites", "Up to 100 devices", "Email support", "Cloud updates", "Community access"]
          },
          {
            tier: "Professional",
            price: "$9,999/year",
            features: ["Up to 10 sites", "Up to 500 devices", "Priority support", "Cloud services", "API access"]
          },
          {
            tier: "Enterprise",
            price: "Contact Sales",
            features: ["Multi-site programs", "Custom device scope", "Priority support", "Custom integrations", "Success planning"]
          },
        ].map((plan, i) => (
          <Card key={i} className={i === 1 ? "border-primary shadow-lg" : ""}>
            <CardHeader>
              <CardTitle>{plan.tier}</CardTitle>
              <CardDescription className="text-2xl font-bold text-foreground">{plan.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-success shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-6" variant={i === 1 ? "default" : "outline"}>
                {i === 2 ? "Contact Sales" : "Get Started"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Licensing FAQs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <div className="font-semibold mb-1">How does device licensing work?</div>
            <p className="text-muted-foreground">Licenses are based on the number of monitored devices, not user accounts. You can have unlimited users.</p>
          </div>
          <div>
            <div className="font-semibold mb-1">Can I upgrade my license tier?</div>
            <p className="text-muted-foreground">Yes, you can upgrade at any time. The price difference will be prorated for the remaining license period.</p>
          </div>
          <div>
            <div className="font-semibold mb-1">What happens if my license expires?</div>
            <p className="text-muted-foreground">The platform continues monitoring but cloud services, updates, and support access will be suspended until renewal.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DocumentationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-heading font-semibold leading-tight mb-3">Technical Documentation</h1>
        <p className="text-xl text-muted-foreground">
          Complete guides and API reference for Guardivex
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {[
          { title: "Getting Started", desc: "Installation and initial configuration guide" },
          { title: "User Guide", desc: "Complete platform feature documentation" },
          { title: "Administrator Manual", desc: "System administration and maintenance" },
          { title: "Integration Guide", desc: "Connect security devices and systems" },
          { title: "API Reference", desc: "REST API documentation and examples" },
          { title: "Troubleshooting", desc: "Common issues and solutions" },
        ].map((doc, i) => (
          <Card key={i} className="transition-colors hover:border-primary/50">
            <CardHeader>
              <CardTitle className="text-lg">{doc.title}</CardTitle>
              <CardDescription>{doc.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SupportPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-heading font-semibold leading-tight mb-3">Support Operations Center</h1>
        <p className="text-xl text-muted-foreground">
          Get help from our team and community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { title: "Knowledge Base", desc: "Search our comprehensive knowledge base for articles and guides", availability: "Available 24/7" },
          { title: "Community Forum", desc: "Connect with other Guardivex users and share experiences", availability: "Community-moderated" },
          { title: "Enterprise Support", desc: "Priority support with defined escalation paths", availability: "Enterprise plans only" },
        ].map((channel, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{channel.title}</CardTitle>
              <CardDescription>{channel.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">{channel.availability}</div>
              <Button className="w-full" variant={i === 2 ? "default" : "outline"}>
                {i === 0 ? "Browse Articles" : i === 1 ? "Join Forum" : "Contact Support"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-12 max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Support Response Times</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="font-semibold">Starter</span>
              <span className="text-muted-foreground">48 hours</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="font-semibold">Professional</span>
              <span className="text-muted-foreground">8 hours</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-semibold">Enterprise</span>
              <span className="text-muted-foreground">1 hour (24/7)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DashboardPreviewSection() {
  const researchRows = [
    { label: "Credential abuse campaign", source: "Identity + endpoint", status: "Triage" },
    { label: "Suspicious script chain", source: "EDR telemetry", status: "Research" },
    { label: "Emerging IOC cluster", source: "Threat intel", status: "Enriched" },
  ]

  const consoleStats = [
    ["Signals", "50k+"],
    ["Mapped", "MITRE"],
    ["AI actions", "0"],
  ]

  return (
    <section className="border-t border-border/60 bg-[var(--gvx-hero-bg-soft)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 dark:bg-[#020817]">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-7">
        <div>
          <Badge className="mb-4 rounded-sm border-[var(--gvx-menu-border)] bg-[var(--gvx-menu-bg)] text-[var(--gvx-hero-muted)]">
            Research Console
          </Badge>
          <h2 className="max-w-xl text-2xl font-heading font-bold leading-tight text-foreground sm:text-3xl">
            One quiet workspace for investigation, evidence, and review.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground dark:text-slate-300">
            Move from raw signals to defensible findings with analyst notes, correlated telemetry, and review-ready evidence trails.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-[var(--gvx-menu-border)] bg-[var(--gvx-menu-bg)] shadow-[0_22px_54px_-44px_rgba(7,17,31,0.42)]">
          <div className="flex flex-col gap-2 border-b border-[var(--gvx-menu-border)] px-3 py-3 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between sm:px-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Database size={17} weight="duotone" className="text-primary" />
              Research queue
            </div>
            <Badge variant="outline" className="rounded-sm border-emerald-500/30 text-emerald-600 dark:text-emerald-300">
              Human review
            </Badge>
          </div>

          <div className="grid grid-cols-1 border-b border-[var(--gvx-menu-border)] min-[420px]:grid-cols-3">
            {consoleStats.map(([label, value]) => (
              <div key={label} className="border-b border-[var(--gvx-menu-border)] px-3 py-3 last:border-b-0 min-[420px]:border-b-0 min-[420px]:border-r min-[420px]:last:border-r-0 sm:px-4">
                <div className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{label}</div>
                <div className="mt-1 font-heading text-lg font-semibold text-foreground">{value}</div>
              </div>
            ))}
          </div>

          <div className="divide-y divide-[var(--gvx-menu-border)]">
            {researchRows.map((row) => (
              <div key={row.label} className="grid gap-2 px-3 py-3 sm:grid-cols-[minmax(0,1fr)_140px_96px] sm:items-center sm:px-4">
                <div className="text-sm font-semibold text-foreground">{row.label}</div>
                <div className="text-xs text-muted-foreground">{row.source}</div>
                <div className="text-xs font-semibold text-primary">{row.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PlatformOverviewSection() {
  const platformFeatures = [
    { icon: Gauge, title: "SOC Command Center", desc: "Real-time security operations dashboard with comprehensive monitoring" },
    { icon: ListChecks, title: "Device Registry", desc: "Complete inventory management for all security devices and sensors" },
    { icon: ChartLine, title: "Event Engine", desc: "Process and analyze security events from all connected systems" },
    { icon: Bell, title: "Alert Engine", desc: "Intelligent threat detection with priority-based notification routing" },
    { icon: Plug, title: "Integration Framework", desc: "Connect cameras, NVRs, access control, alarms, and network devices" },
    { icon: Certificate, title: "License Manager", desc: "Track licensing, activation status, and cloud services connectivity" },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-heading font-semibold leading-tight mb-3">Operations Architecture Overview</h2>
        <p className="text-base text-muted-foreground dark:text-slate-300">
          Comprehensive security infrastructure monitoring with enterprise-grade features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platformFeatures.map((feature, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <feature.icon size={32} className="text-primary mb-3" weight="duotone" />
              <CardTitle className="text-base">{feature.title}</CardTitle>
              <CardDescription className="text-sm">{feature.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}

function ArchitectureDiagramSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-heading font-bold mb-3">Enterprise Architecture</h2>
        <p className="text-base text-muted-foreground dark:text-slate-300">
          Flexible deployment model with optional cloud connectivity
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Card className="bg-card/50">
          <CardContent className="p-4 sm:p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8 overflow-hidden">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 border border-primary/20">
                  <Buildings size={32} className="text-primary sm:hidden" weight="duotone" />
                  <Buildings size={40} className="text-primary hidden sm:block" weight="duotone" />
                </div>
                <h3 className="font-heading font-semibold text-base sm:text-lg mb-2">Client Infrastructure</h3>
                <p className="text-sm text-muted-foreground dark:text-slate-300">Cameras, NVRs, Access Control, Alarms, Network Devices</p>
              </div>

              <div className="hidden md:flex items-center gap-2" aria-hidden="true">
                <ArrowRight size={32} className="text-muted-foreground dark:text-slate-300" />
              </div>

              <div className="flex-1 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-accent/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 border border-accent/20">
                  <HardDrives size={32} className="text-accent sm:hidden" weight="duotone" />
                  <HardDrives size={40} className="text-accent hidden sm:block" weight="duotone" />
                </div>
                <h3 className="font-heading font-semibold text-base sm:text-lg mb-2">Guardivex Platform</h3>
                <p className="text-sm text-muted-foreground dark:text-slate-300">Self-hosted security platform on your infrastructure</p>
              </div>

              <div className="hidden md:flex items-center gap-2" aria-hidden="true">
                <ArrowRight size={32} className="text-muted-foreground dark:text-slate-300" />
              </div>

              <div className="flex-1 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-success/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 border border-success/20">
                  <CloudCheck size={32} className="text-success sm:hidden" weight="duotone" />
                  <CloudCheck size={40} className="text-success hidden sm:block" weight="duotone" />
                </div>
                <h3 className="font-heading font-semibold text-base sm:text-lg mb-2">Guardivex Cloud</h3>
                <p className="text-sm text-muted-foreground dark:text-slate-300">Optional licensing, updates, support & remote access</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function DeploymentOptionsSection() {
  const deploymentOptions = [
    { icon: WindowsLogo, title: "Windows Server", desc: "Windows Server 2019 or later", version: "3.2.1", size: "450 MB" },
    { icon: LinuxLogo, title: "Linux Server", desc: "Ubuntu, RHEL, Debian, CentOS", version: "3.2.1", size: "380 MB" },
    { icon: Package, title: "Docker Compose", desc: "Containerized deployment", version: "3.2.1", size: "420 MB" },
    { icon: DesktopTower, title: "VMware / Hyper-V", desc: "Virtual appliance (OVA/VHDX)", version: "3.2.1", size: "2.1 GB" },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-heading font-semibold leading-tight mb-3">Deployment Topologies</h2>
        <p className="text-base text-muted-foreground">
          Install on your preferred platform with full deployment flexibility
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deploymentOptions.map((option, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <option.icon size={40} className="text-primary mb-4" weight="duotone" />
              <CardTitle className="text-lg">{option.title}</CardTitle>
              <CardDescription className="mb-4">{option.desc}</CardDescription>
              <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t border-border">
                <div>Version: {option.version}</div>
                <div>Size: {option.size}</div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}

function DownloadFlowSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  const steps = [
    { icon: Key, title: "Request Trial License", desc: "Sign up for 30-day trial" },
    { icon: Buildings, title: "Create Organization", desc: "Configure your organization profile" },
    { icon: CloudArrowDown, title: "Download Installer", desc: "Select your platform" },
    { icon: HardDrives, title: "Install Server", desc: "Run installation wizard" },
    { icon: Lightning, title: "Activate License", desc: "Enter license key or connect cloud" },
    { icon: Gauge, title: "Open SOC Command Center", desc: "Start monitoring" },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border bg-card/20">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-heading font-semibold leading-tight mb-3">Deployment Runbook</h2>
        <p className="text-base text-muted-foreground">
          Simple installation process from download to monitoring
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <Card className="h-full hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 border border-primary/20">
                    <step.icon size={24} className="text-primary" weight="duotone" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-muted-foreground mb-1">Step {i + 1}</div>
                    <CardTitle className="text-base mb-2">{step.title}</CardTitle>
                    <CardDescription className="text-sm">{step.desc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg" onClick={() => onNavigate("download")} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Start Free Trial
          <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>
    </section>
  )
}

function FeatureGridSection() {
  const features = [
    { icon: Camera, title: "Cameras / NVRs", desc: "IP cameras and network video recorders", color: "text-primary" },
    { icon: Lock, title: "Access Control", desc: "Door controllers and badge readers", color: "text-success" },
    { icon: Siren, title: "Alarms", desc: "Intrusion detection and alarm panels", color: "text-destructive" },
    { icon: NetworkX, title: "Network Devices", desc: "Switches, routers, and firewalls", color: "text-info" },
    { icon: Thermometer, title: "Sensors", desc: "Environmental and IoT sensors", color: "text-warning" },
    { icon: Monitor, title: "System Health", desc: "Server and database monitoring", color: "text-accent" },
    { icon: Database, title: "Website Activity", desc: "Public portal traffic and usage", color: "text-primary" },
    { icon: ChartLine, title: "API Activity", desc: "Integration and API request logs", color: "text-success" },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-heading font-bold mb-3">Monitor Everything</h2>
        <p className="text-base text-muted-foreground">
          Comprehensive visibility across your entire security infrastructure
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <Card key={i} className="text-center hover:border-primary/50 transition-colors">
            <CardHeader>
              <feature.icon size={40} className={`${feature.color} mx-auto mb-4`} weight="duotone" />
              <CardTitle className="text-base mb-2">{feature.title}</CardTitle>
              <CardDescription className="text-xs">{feature.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}

function PricingSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  const plans = [
    {
      tier: "Trial",
      price: "Free",
      duration: "30 days",
      features: ["Evaluation access", "Sample device scope", "Core workflows", "Email support", "Cloud services"],
      highlight: false
    },
    {
      tier: "Professional",
      price: "$9,999",
      duration: "per year",
      features: ["Up to 10 sites", "Up to 500 devices", "Priority support", "Cloud services", "API access"],
      highlight: true
    },
    {
      tier: "Enterprise",
      price: "Contact Sales",
      duration: "",
      features: ["Multi-site programs", "Custom device scope", "Priority support", "Custom integrations", "Success planning"],
      highlight: false
    },
    {
      tier: "MSP",
      price: "Custom",
      duration: "",
      features: ["Multi-tenant", "White-label options", "Reseller pricing", "Partner portal", "Professional services"],
      highlight: false
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border bg-card/20">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-heading font-bold mb-3">Flexible Licensing</h2>
        <p className="text-base text-muted-foreground">
          Choose the plan that fits your organization's needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
        {plans.map((plan, i) => (
          <Card key={i} className={plan.highlight ? "border-primary shadow-lg scale-105" : ""}>
            <CardHeader>
              <CardTitle className="text-xl">{plan.tier}</CardTitle>
              <div className="mt-4">
                <div className="text-3xl font-bold font-heading">{plan.price}</div>
                {plan.duration && <div className="text-sm text-muted-foreground mt-1">{plan.duration}</div>}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={16} className="text-success shrink-0 mt-0.5" weight="fill" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full" 
                variant={plan.highlight ? "default" : "outline"}
                onClick={() => onNavigate(i === 0 ? "download" : "licensing")}
              >
                {i === 0 ? "Start Trial" : i === 2 ? "Contact Sales" : "Get Started"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg" onClick={() => onNavigate("licensing")}>
          Compare All Plans
          <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>
    </section>
  )
}

