import { useState } from "react"
import { WebsiteNavbar } from "./WebsiteNavbar"
import { LiveChatWidget } from "./LiveChatWidget"
import { BrandLogo } from "@/components/BrandLogo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ShieldCheck, Monitor, Database, CloudArrowDown, CheckCircle, ArrowRight, 
  Gauge, Certificate, HardDrives,
  Lock, NetworkX, ChartLine,
  Broadcast,
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
      <footer className="relative mt-16 overflow-hidden border-t border-[var(--gvx-hero-border)] bg-[linear-gradient(180deg,var(--gvx-hero-bg),var(--gvx-hero-bg-soft))] md:mt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,212,255,0.06),transparent_48%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_82%,rgba(0,140,255,0.05),transparent_50%)]" />
        
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
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
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
                  className="text-sm text-muted-foreground hover:text-primary dark:hover:text-cyan-300 hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Features
                </button>
                <button 
                  onClick={() => onNavigate("enterprise")}
                  className="text-sm text-muted-foreground hover:text-primary dark:hover:text-cyan-300 hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Enterprise Solutions
                </button>
                <button 
                  onClick={() => onNavigate("download")}
                  className="text-sm text-muted-foreground hover:text-primary dark:hover:text-cyan-300 hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Download
                </button>
                <button 
                  onClick={() => onNavigate("licensing")}
                  className="text-sm text-muted-foreground hover:text-primary dark:hover:text-cyan-300 hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
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
                  className="text-sm text-muted-foreground hover:text-primary dark:hover:text-cyan-300 hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Documentation
                </button>
                <button 
                  onClick={() => onNavigate("support")}
                  className="text-sm text-muted-foreground hover:text-primary dark:hover:text-cyan-300 hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Support Center
                </button>
                <button onClick={() => onNavigate("documentation")} className="text-sm text-muted-foreground hover:text-primary dark:hover:text-cyan-300 hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  API Reference
                </button>
                <button onClick={() => onNavigate("support")} className="text-sm text-muted-foreground hover:text-primary dark:hover:text-cyan-300 hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Contact Support
                </button>
                <button onClick={() => onNavigate("support")} className="text-sm text-muted-foreground hover:text-primary dark:hover:text-cyan-300 hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  System Status
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-[13px] uppercase tracking-[0.15em] mb-4 sm:mb-5 text-foreground">Company</h4>
              <div className="flex flex-col gap-3 sm:gap-3.5">
                <button onClick={() => onNavigate("support")} className="text-sm text-muted-foreground hover:text-primary dark:hover:text-cyan-300 hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  About Guardivex
                </button>
                <a href="mailto:research@guardivex.com" className="text-sm text-muted-foreground hover:text-primary dark:hover:text-cyan-300 hover:translate-x-1 transition-all font-medium group flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Contact Sales
                </a>
                <button onClick={() => onNavigate("documentation")} className="text-sm text-muted-foreground hover:text-primary dark:hover:text-cyan-300 hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Documentation
                </button>
                <a href="mailto:security@guardivex.com" className="text-sm text-muted-foreground hover:text-primary dark:hover:text-cyan-300 hover:translate-x-1 transition-all font-medium group flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Security Contact
                </a>
                <button onClick={() => onNavigate("documentation")} className="text-sm text-muted-foreground hover:text-primary dark:hover:text-cyan-300 hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Trust Center
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 sm:pt-10 border-t border-border/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-xs sm:text-sm text-muted-foreground text-center md:text-left order-2 md:order-1">
                &copy; 2026 Guardivex. All rights reserved.
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-xs text-muted-foreground font-medium order-1 md:order-2">
                <button onClick={() => onNavigate("documentation")} className="hover:text-primary dark:hover:text-cyan-300 transition-colors hover:underline decoration-primary decoration-2 underline-offset-4">
                  Privacy Policy
                </button>
                <button onClick={() => onNavigate("documentation")} className="hover:text-primary dark:hover:text-cyan-300 transition-colors hover:underline decoration-primary decoration-2 underline-offset-4">
                  Terms of Service
                </button>
                <button onClick={() => onNavigate("documentation")} className="hover:text-primary dark:hover:text-cyan-300 transition-colors hover:underline decoration-primary decoration-2 underline-offset-4 hidden sm:inline">
                  Security
                </button>
                <button onClick={() => onNavigate("documentation")} className="hover:text-primary dark:hover:text-cyan-300 transition-colors hover:underline decoration-primary decoration-2 underline-offset-4 hidden sm:inline">
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
  const heroQueueRows = [
    { label: "Credential abuse campaign", source: "Identity + endpoint", status: "Triage" },
    { label: "Suspicious script chain", source: "EDR telemetry", status: "Research" },
    { label: "Emerging IOC cluster", source: "Threat intel", status: "Enriched" },
  ]
  const heroBoundarySteps = ["Recommend", "Review", "Approve", "Audit"]

  return (
    <div className="relative guardivex-home-typography overflow-x-clip bg-[var(--gvx-hero-bg)] text-[var(--gvx-hero-text)]">
      <section className="relative isolate overflow-hidden border-b border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-bg)] text-[var(--gvx-hero-text)]">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#F8FAFC_0%,#EAF6FF_100%)] dark:bg-[linear-gradient(180deg,#021526_0%,#071D33_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_44%_18%,rgba(0,212,255,0.13),transparent_42%),linear-gradient(rgba(0,140,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(0,140,255,0.10)_1px,transparent_1px)] bg-[size:100%_100%,72px_72px,72px_72px] opacity-[0.55] dark:bg-[radial-gradient(ellipse_at_44%_18%,rgba(0,212,255,0.16),transparent_42%),linear-gradient(rgba(0,212,255,0.20)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.20)_1px,transparent_1px)] dark:opacity-[0.22]" />

        <div className="mx-auto grid w-full max-w-[1220px] gap-8 px-4 py-10 sm:px-8 sm:py-14 md:gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(420px,1.12fr)] lg:items-center lg:px-10 lg:py-16 xl:px-12 xl:py-[4.5rem]">
          <div className="min-w-0 text-center lg:text-left">
            <div className="inline-flex max-w-full items-center gap-2 rounded-md border border-cyan-500/20 bg-cyan-500/8 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--gvx-hero-muted)] shadow-[0_14px_34px_-30px_rgba(0,212,255,0.30)] sm:text-[9.5px]">
              <ShieldCheck size={13} weight="fill" className="text-[var(--gvx-hero-accent)]" />
              Governed cyber research platform
            </div>

            <h1 className="mx-auto mt-5 max-w-[760px] font-heading text-[2.45rem] font-extrabold leading-[1.03] tracking-normal text-[var(--gvx-hero-text)] [text-wrap:balance] sm:text-[3.35rem] lg:mx-0 lg:text-[4.15rem]">
              Guardivex Security <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Platform</span>
            </h1>

            <p className="mx-auto mt-5 max-w-[650px] text-[0.98rem] leading-[1.72] text-[var(--gvx-hero-muted)] sm:text-[1.04rem] lg:mx-0">
              Guardivex gives security teams a controlled workspace for telemetry, IOCs, incident research, evidence handling, and AI-assisted recommendations that never execute physical actions.
            </p>

            <div className="mx-auto mt-5 flex max-w-[620px] flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-[var(--gvx-hero-muted)] lg:mx-0 lg:justify-start">
              {heroAssurances.map((label) => (
                <span key={label} className="rounded-md border border-cyan-500/20 bg-cyan-500/8 px-2.5 py-1 shadow-[0_10px_24px_-24px_rgba(0,212,255,0.26)]">
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 min-[440px]:flex-row lg:justify-start">
              <Button size="lg" onClick={() => onNavigate("download")} className="h-11 w-full max-w-[330px] rounded-md border border-cyan-500/35 bg-[linear-gradient(90deg,#00D4FF,#008CFF)] px-4 text-[0.84rem] font-semibold text-white shadow-[0_20px_48px_-30px_rgba(0,212,255,0.70)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95 focus-visible:ring-[var(--guardivex-cyan)] min-[440px]:w-auto">
                <CloudArrowDown size={16} className="mr-2" weight="bold" />
                Deploy Research Server
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate("product")} className="h-11 w-full max-w-[330px] rounded-md border-cyan-500/20 bg-[var(--gvx-hero-card)] px-4 text-[0.84rem] font-semibold text-[var(--gvx-hero-text)] shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/35 hover:bg-cyan-500/8 min-[440px]:w-auto">
                <Monitor size={16} className="mr-2" weight="bold" />
                View Console
              </Button>
            </div>

            <div className="mx-auto mt-6 flex max-w-[620px] items-center justify-center gap-2 text-xs font-semibold text-[var(--gvx-hero-muted)] lg:mx-0 lg:justify-start">
              <CheckCircle size={15} weight="fill" className="shrink-0 text-[var(--gvx-hero-accent)]" />
              <span>Every high-risk response remains behind review, policy, and audit.</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[620px] lg:mx-0 lg:justify-self-end">
            <div className="absolute -inset-3 -z-10 rounded-[1rem] bg-[radial-gradient(ellipse_at_50%_18%,rgba(0,212,255,0.18),transparent_62%)] blur-2xl dark:bg-[radial-gradient(ellipse_at_50%_18%,rgba(0,212,255,0.16),transparent_62%)]" />
            <div className="overflow-hidden rounded-xl border border-cyan-500/20 bg-[var(--gvx-hero-card)] shadow-[0_32px_92px_-62px_rgba(0,212,255,0.36)] dark:shadow-[0_32px_92px_-62px_rgba(0,212,255,0.58)]">
              <div className="h-1.5 bg-[linear-gradient(90deg,#00D4FF,#008CFF)]" />
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--gvx-hero-muted)]">
                <span className="flex items-center gap-2 text-[var(--gvx-hero-text)]">
                  <Monitor size={15} weight="duotone" className="text-[var(--gvx-hero-accent)]" />
                  Research command surface
                </span>
                <span className="shrink-0 rounded-full border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-accent-soft)] px-2 py-0.5 text-[var(--gvx-hero-accent)]">Recommendation-only AI</span>
              </div>

              <div className="grid lg:grid-cols-[minmax(0,1fr)_210px]">
                <div className="min-w-0">
                  <div className="grid grid-cols-3 border-b border-[var(--gvx-hero-border)]">
                    {heroProofPoints.map(([label, value]) => (
                      <div key={label} className="border-r border-[var(--gvx-hero-border)] px-3 py-3 last:border-r-0">
                        <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--gvx-hero-muted)]">{label}</div>
                        <div className="mt-1 font-heading text-sm font-bold text-[var(--gvx-hero-text)]">{value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="divide-y divide-[var(--gvx-hero-border)]">
                    {heroQueueRows.map((row) => (
                      <div key={row.label} className="grid gap-2 px-4 py-3 min-[520px]:grid-cols-[minmax(0,1fr)_132px_86px] min-[520px]:items-center">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-[var(--gvx-hero-text)]">{row.label}</div>
                          <div className="text-xs text-[var(--gvx-hero-muted)]">{row.source}</div>
                        </div>
                        <div className="text-xs font-medium text-[var(--gvx-hero-muted)]">Human review</div>
                        <div className="text-xs font-semibold text-[var(--gvx-hero-accent)]">{row.status}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-bg-soft)] p-4 lg:border-l lg:border-t-0">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--gvx-hero-muted)]">AI boundary</div>
                      <div className="mt-1 text-sm font-bold text-[var(--gvx-hero-text)]">Safe response path</div>
                    </div>
                    <Lock size={18} weight="duotone" className="text-[var(--gvx-hero-accent)]" />
                  </div>
                  <div className="mb-3 overflow-hidden rounded-lg border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] p-1.5">
                    <img
                      src="/ai-boundary.svg"
                      alt="AI boundary: recommendation-only decision path with human approval gates"
                      className="block aspect-[17/13] w-full rounded-md object-contain"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div className="grid gap-2">
                    {heroBoundarySteps.map((step, index) => (
                      <div key={step} className="flex items-center gap-2 text-xs font-semibold text-[var(--gvx-hero-text)]">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-cyan-500/20 bg-cyan-500/10 font-mono text-[9px] text-[var(--gvx-hero-accent)]">{index + 1}</span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ThreatResearchLabSection />
      <CyberResearchSystemSection capabilities={heroCapabilities} />
      <InvestigationWorkflowSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="rounded-lg border border-[var(--gvx-menu-border)] bg-[linear-gradient(135deg,var(--gvx-menu-bg),var(--gvx-hero-bg-soft))] p-6 text-center shadow-[0_24px_64px_-52px_rgba(0,212,255,0.22)] sm:p-8 md:p-10">
          <div className="mx-auto mb-3 inline-flex rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
            Research-ready deployment
          </div>
          <h2 className="mx-auto max-w-3xl text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground mb-2 sm:mb-3 leading-tight">Launch a governed cyber research workspace</h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
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
    <section className="border-t border-[var(--gvx-hero-border)] bg-[linear-gradient(180deg,var(--gvx-hero-bg-soft),var(--gvx-hero-bg))] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)] lg:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Threat research lab</div>
            <h2 className="mt-2 max-w-2xl text-2xl font-heading font-bold leading-tight text-foreground sm:text-3xl">
              Turn scattered signals into an explainable investigation graph.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground lg:justify-self-end">
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

              <div className="border-t border-[var(--gvx-menu-border)] bg-[var(--gvx-hero-bg-soft)] p-4 lg:border-l lg:border-t-0">
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
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground lg:justify-self-end">
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
                <div key={item.label} className="flex items-center gap-3 rounded-md border border-[var(--gvx-menu-border)] bg-[var(--gvx-hero-bg-soft)] px-3 py-2.5">
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
    <section className="border-t border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-bg-soft)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
        <div>
          <Badge className="mb-4 rounded-sm border-[var(--gvx-menu-border)] bg-[var(--gvx-menu-bg)] text-[var(--gvx-hero-muted)]">
            Research workflow
          </Badge>
          <h2 className="text-2xl font-heading font-bold leading-tight text-foreground sm:text-3xl">
            From signal to defensible decision.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The main workflow is designed for analysts who need speed, evidence quality, and controlled response boundaries.
          </p>
          <div className="mt-5 grid gap-2">
            {safeguards.map((label) => (
              <div key={label} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <CheckCircle size={15} weight="fill" className="text-cyan-500" />
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
                    <CheckCircle size={16} className="text-cyan-500 shrink-0" />
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

