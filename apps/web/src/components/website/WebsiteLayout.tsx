import { useState } from "react"
import { WebsiteNavbar } from "./WebsiteNavbar"
import { LiveChatWidget } from "./LiveChatWidget"
import { BrandLogo } from "@/components/BrandLogo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ShieldCheck, Monitor, Database, CloudArrowDown, CheckCircle, ArrowRight, 
  Certificate, Lock, ChartLine,
  EnvelopeSimple
} from "@phosphor-icons/react"

interface WebsiteLayoutProps {
  currentPage: string
  onNavigate: (page: string) => void
  onLogin: () => void
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
                  className="text-sm text-muted-foreground hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Features
                </button>
                <button 
                  onClick={() => onNavigate("enterprise")}
                  className="text-sm text-muted-foreground hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Enterprise Solutions
                </button>
                <button 
                  onClick={() => onNavigate("download")}
                  className="text-sm text-muted-foreground hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Download
                </button>
                <button 
                  onClick={() => onNavigate("licensing")}
                  className="text-sm text-muted-foreground hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
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
                  className="text-sm text-muted-foreground hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Documentation
                </button>
                <button 
                  onClick={() => onNavigate("support")}
                  className="text-sm text-muted-foreground hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] hover:translate-x-1 transition-all text-left font-medium group flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Support Center
                </button>
                <button onClick={() => onNavigate("documentation")} className="text-sm text-muted-foreground hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  API Reference
                </button>
                <button onClick={() => onNavigate("support")} className="text-sm text-muted-foreground hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Contact Support
                </button>
                <button onClick={() => onNavigate("support")} className="text-sm text-muted-foreground hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  System Status
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-[13px] uppercase tracking-[0.15em] mb-4 sm:mb-5 text-foreground">Company</h4>
              <div className="flex flex-col gap-3 sm:gap-3.5">
                <button onClick={() => onNavigate("support")} className="text-sm text-muted-foreground hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  About Guardivex
                </button>
                <a href="mailto:research@guardivex.com" className="text-sm text-muted-foreground hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] hover:translate-x-1 transition-all font-medium group flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Contact Sales
                </a>
                <button onClick={() => onNavigate("documentation")} className="text-sm text-muted-foreground hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Documentation
                </button>
                <a href="mailto:security@guardivex.com" className="text-sm text-muted-foreground hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] hover:translate-x-1 transition-all font-medium group flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Security Contact
                </a>
                <button onClick={() => onNavigate("documentation")} className="text-sm text-muted-foreground hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] hover:translate-x-1 transition-all font-medium group flex items-center gap-2 text-left">
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
                <button onClick={() => onNavigate("documentation")} className="hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] transition-colors hover:underline decoration-primary decoration-2 underline-offset-4">
                  Privacy Policy
                </button>
                <button onClick={() => onNavigate("documentation")} className="hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] transition-colors hover:underline decoration-primary decoration-2 underline-offset-4">
                  Terms of Service
                </button>
                <button onClick={() => onNavigate("documentation")} className="hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] transition-colors hover:underline decoration-primary decoration-2 underline-offset-4 hidden sm:inline">
                  Security
                </button>
                <button onClick={() => onNavigate("documentation")} className="hover:text-primary dark:hover:text-[var(--gvx-hero-accent-2)] transition-colors hover:underline decoration-primary decoration-2 underline-offset-4 hidden sm:inline">
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
  const operatingMetrics = [
    ["AI direct actions", "0"],
    ["Review gate", "Required"],
    ["Tenant scope", "Isolated"],
  ]

  const capabilityPillars = [
    { icon: Database, title: "Evidence Workspace", detail: "Bring telemetry, IOCs, identities, notes, and approvals into one defensible case record." },
    { icon: Lock, title: "Governed AI", detail: "Use AI for summaries and recommendations while execution remains policy-controlled and human-reviewed." },
    { icon: Certificate, title: "Audit-Ready Decisions", detail: "Preserve approvals, timelines, evidence custody, and tenant-scoped activity history." },
  ]

  const operatingModel = [
    { step: "01", title: "Collect", detail: "Normalize alerts, telemetry, identities, devices, and threat intelligence." },
    { step: "02", title: "Correlate", detail: "Map signals to cases, tactics, affected assets, and evidence quality." },
    { step: "03", title: "Recommend", detail: "Generate response plans without granting AI direct hardware authority." },
    { step: "04", title: "Approve", detail: "Route high-risk actions through RBAC, policy, audit, and operator review." },
  ]

  return (
    <div className="relative guardivex-home-typography overflow-x-hidden bg-[var(--gvx-hero-bg)] pb-24 text-[var(--gvx-hero-text)] sm:pb-0">
      <section className="relative isolate overflow-hidden border-b border-[var(--gvx-hero-border)] bg-[linear-gradient(180deg,#F8FAFC_0%,rgba(0,212,255,0.08)_100%)] px-4 py-7 dark:bg-[linear-gradient(180deg,#021526_0%,#071D33_100%)] sm:px-6 sm:py-16 lg:px-8">
        <div className="gvx-grid-drift absolute inset-0 -z-10 bg-[linear-gradient(rgba(0,140,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,140,255,0.08)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20 dark:bg-[linear-gradient(rgba(0,212,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.13)_1px,transparent_1px)] dark:opacity-15 sm:bg-[size:80px_80px] sm:opacity-45 dark:sm:opacity-20" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 lg:grid-cols-[minmax(0,0.86fr)_minmax(340px,0.74fr)] lg:items-center lg:gap-12">
          <div className="min-w-0 max-w-3xl">
            <Badge variant="outline" className="gvx-animate-in mb-5 rounded-sm border-[var(--gvx-hero-border-strong)] bg-[var(--gvx-hero-accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--gvx-hero-accent)]">
              Governed security operations
            </Badge>
            <h1 className="gvx-animate-in gvx-delay-1 max-w-full font-heading text-[clamp(2.12rem,10.5vw,3rem)] font-extrabold leading-[0.98] text-[var(--gvx-hero-text)] [text-wrap:balance] sm:text-[3.35rem] sm:leading-[1.03] lg:text-[4.05rem]">
              Enterprise security work, without autonomous physical action.
            </h1>
            <p className="gvx-animate-in gvx-delay-2 mt-4 max-w-full text-base leading-[1.7] text-[var(--gvx-hero-muted)] sm:mt-5 sm:max-w-2xl sm:text-lg">
              Guardivex unifies alerts, evidence, and AI recommendations in one governed workspace. Operators approve every high-risk action.
            </p>

            <div className="gvx-animate-in gvx-delay-3 mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
              <Button size="lg" onClick={() => onNavigate("download")} className="gvx-hover-lift h-12 w-full rounded-md border border-[var(--gvx-hero-border-strong)] bg-[linear-gradient(90deg,#00D4FF,#008CFF)] px-5 text-sm font-semibold text-[var(--guardivex-text)] shadow-[0_18px_42px_-30px_rgba(0,212,255,0.72)] hover:brightness-95 sm:h-11 sm:w-auto">
                <CloudArrowDown size={16} className="mr-2" weight="bold" />
                Deploy Research Server
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate("product")} className="gvx-hover-lift h-12 w-full rounded-md border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] px-5 text-sm font-semibold text-[var(--gvx-hero-text)] hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-hero-accent-soft)] sm:h-11 sm:w-auto">
                <Monitor size={16} className="mr-2" weight="bold" />
                View Product
              </Button>
            </div>

            <div className="gvx-stagger-metrics mt-6 grid max-w-full grid-cols-1 gap-2 sm:mt-8 sm:max-w-2xl sm:grid-cols-3 sm:gap-3">
              {operatingMetrics.map(([label, value]) => (
                <div key={label} className="gvx-animate-in gvx-hover-lift min-w-0 rounded-md border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--gvx-hero-muted)] sm:tracking-[0.12em]">{label}</div>
                  <div className="mt-1 font-heading text-base font-bold text-[var(--gvx-hero-text)]">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="gvx-animate-in gvx-delay-4 flex min-w-0 justify-center lg:justify-end">
            <div className="gvx-phone-frame relative w-full max-w-[340px] lg:max-w-[360px]">
              <div className="relative overflow-hidden rounded-[2.15rem] border border-[rgba(0,212,255,0.18)] bg-[#021526] p-2 shadow-[0_28px_80px_-56px_rgba(0,140,255,0.78)]">
                <div className="absolute left-1/2 top-2 z-20 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-[#021526]" />
                <div className="gvx-phone-reflection pointer-events-none absolute inset-2 z-30 rounded-[1.7rem]" />
                <div className="relative overflow-hidden rounded-[1.7rem] border border-[rgba(0,212,255,0.14)] bg-[linear-gradient(180deg,#071D33_0%,#021526_100%)] p-4 text-[#F8FAFC]">
                  <div className="flex items-center justify-between pt-3 text-[10px] font-semibold text-[#94A3B8]">
                    <span>09:41</span>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-5 rounded-full border border-[rgba(0,212,255,0.35)]" />
                      <span className="h-2.5 w-1.5 rounded-[2px] bg-[#00D4FF]" />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(0,212,255,0.18)] bg-[rgba(0,212,255,0.08)]">
                        <ShieldCheck size={18} weight="duotone" className="text-[#00D4FF]" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold">Guardivex SOC</div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8]">Tenant: Northwind HQ</div>
                      </div>
                    </div>
                    <span className="gvx-status-chip rounded-full border border-[rgba(0,212,255,0.22)] bg-[rgba(0,212,255,0.10)] px-2 py-1 text-[10px] font-bold text-[#00D4FF]">Live</span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-[rgba(0,212,255,0.14)] bg-[rgba(7,29,51,0.74)] p-3">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.11em] text-[#94A3B8]">Live alerts</div>
                      <div className="mt-1 text-2xl font-bold text-[#F8FAFC]">18</div>
                    </div>
                    <div className="rounded-xl border border-[rgba(0,212,255,0.14)] bg-[rgba(7,29,51,0.74)] p-3">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.11em] text-[#94A3B8]">Devices online</div>
                      <div className="mt-1 text-2xl font-bold text-[#00D4FF]">247</div>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2.5">
                    <div className="rounded-xl border border-[#F59E0B]/35 bg-[#F59E0B]/10 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F59E0B]">Approval required</div>
                        <span className="rounded-full border border-[#F59E0B]/30 px-2 py-0.5 text-[9px] font-bold text-[#F59E0B]">No direct actions</span>
                      </div>
                      <div className="mt-2 text-sm font-semibold">AI recommends isolating one endpoint after operator review.</div>
                      <p className="mt-1 text-[11px] leading-5 text-[#94A3B8]">Policy blocks door, alarm, and switch-port control from AI execution.</p>
                    </div>

                    {[
                      { title: "Identity anomaly", detail: "Okta + EDR", status: "Critical", className: "border-[#EF4444] text-[#EF4444]" },
                      { title: "Camera offline", detail: "Lobby east", status: "Warning", className: "border-[#F59E0B] text-[#F59E0B]" },
                      { title: "Door controller", detail: "Physical access", status: "Online", className: "border-[#00D4FF] text-[#00D4FF]" },
                    ].map((item) => (
                      <div key={item.title} className="gvx-row-hover flex items-center justify-between gap-3 rounded-xl border border-[rgba(0,212,255,0.12)] bg-[rgba(7,29,51,0.58)] p-3">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold">{item.title}</div>
                          <div className="text-[11px] text-[#94A3B8]">{item.detail}</div>
                        </div>
                        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold ${item.className}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 rounded-xl border border-[rgba(0,212,255,0.14)] bg-[rgba(0,140,255,0.10)] p-3">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.11em] text-[#00D4FF]">
                      <Lock size={13} weight="bold" />
                      Tenant scope enforced
                    </div>
                    <p className="mt-1 text-[11px] leading-5 text-[#94A3B8]">Telemetry links cyber evidence to physical access events without granting autonomous control.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-bg)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Core platform</div>
            <h2 className="mt-2 text-2xl font-heading font-bold leading-tight text-foreground sm:text-3xl">A clean operating layer for security teams.</h2>
          </div>
          <div className="mt-7 grid min-w-0 gap-4 md:grid-cols-3">
            {capabilityPillars.map((item) => (
              <Card key={item.title} className="gvx-animate-in gvx-hover-lift min-w-0 border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] shadow-none">
                <CardHeader className="p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-accent-soft)]">
                    <item.icon size={19} weight="duotone" className="text-primary" />
                  </div>
                  <CardTitle className="text-base text-foreground">{item.title}</CardTitle>
                  <CardDescription className="text-sm leading-6 text-muted-foreground">{item.detail}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--gvx-hero-bg-soft)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Operating model</div>
            <h2 className="mt-2 text-2xl font-heading font-bold leading-tight text-foreground sm:text-3xl">From signal to approved decision.</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">The homepage now mirrors the product promise: fewer theatrics, clearer governance, and a decision path security leaders can understand quickly.</p>
          </div>
          <div className="grid min-w-0 gap-3 md:grid-cols-2">
            {operatingModel.map((item) => (
              <div key={item.step} className="gvx-animate-in gvx-hover-lift min-w-0 rounded-lg border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] p-5">
                <div className="mb-4 font-mono text-xs font-bold text-primary">{item.step}</div>
                <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="gvx-animate-in mx-auto flex max-w-7xl flex-col gap-5 rounded-lg border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] p-5 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 max-w-2xl">
            <h2 className="text-2xl font-heading font-bold text-foreground">Deploy a governed research workspace.</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Start with the self-hosted console, connect telemetry sources, and keep every recommendation behind policy, approval, and audit evidence.</p>
          </div>
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row lg:shrink-0">
            <Button onClick={() => onNavigate("download")} className="h-12 w-full rounded-md px-5 font-semibold sm:h-11 sm:w-auto">
              <CloudArrowDown size={16} className="mr-2" weight="bold" />
              Start Deployment
            </Button>
            <Button variant="outline" onClick={() => onNavigate("documentation")} className="h-12 w-full rounded-md px-5 font-semibold sm:h-11 sm:w-auto">
              Read Architecture
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
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
                    <CheckCircle size={16} className="text-[var(--gvx-hero-accent-2)] shrink-0" />
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

