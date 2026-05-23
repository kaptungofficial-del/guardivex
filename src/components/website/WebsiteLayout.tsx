import { useEffect, useState } from "react"
import { WebsiteNavbar } from "./WebsiteNavbar"
import { VideoWalkthroughDemo } from "./VideoWalkthroughDemo"
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
  Key, Buildings, Warning, Broadcast, Circle, Phone,
  LinkedinLogo, TwitterLogo, GithubLogo, YoutubeLogo, EnvelopeSimple
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
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-orb absolute -top-24 left-[8%] h-64 w-64 rounded-full bg-cyan-400/12" />
        <div className="glow-orb absolute -top-14 right-[10%] h-72 w-72 rounded-full bg-blue-500/12 [animation-delay:1.6s]" />
      </div>
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
                  markClassName="w-16 h-16"
                  titleClassName="text-xl font-extrabold tracking-[-0.02em]"
                  subtitleClassName="text-[10px] tracking-[0.14em] mt-1.5 text-muted-foreground/80 dark:text-slate-300"
                />
              </div>
              <p className="text-sm text-muted-foreground dark:text-slate-300 max-w-md leading-relaxed">
                Enterprise-grade security infrastructure platform delivering comprehensive device monitoring, intelligent threat detection, and rapid incident response across unlimited sites.
              </p>
              <div className="flex flex-col gap-3.5">
                <a 
                  href="tel:1-800-SENTINEL"
                  className="flex items-center gap-3 text-sm group hover:text-primary transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:scale-105 transition-all shrink-0">
                    <Phone size={17} weight="bold" className="text-primary" />
                  </div>
                  <span className="font-bold">1-800-SENTINEL</span>
                  <Badge variant="outline" className="text-[10px] px-2 py-0.5 h-5 border-success/40 text-success font-bold bg-success/5">24/7</Badge>
                </a>
                <a
                  href="mailto:sales@guardivex"
                  className="flex items-center gap-3 text-sm group hover:text-primary transition-colors break-all sm:break-normal"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:scale-105 transition-all shrink-0">
                    <EnvelopeSimple size={17} weight="bold" className="text-primary" />
                  </div>
                  <span className="font-semibold">sales@guardivex</span>
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-2">
                {[
                  { icon: LinkedinLogo, label: "LinkedIn", url: "#" },
                  { icon: TwitterLogo, label: "Twitter", url: "#" },
                  { icon: GithubLogo, label: "GitHub", url: "#" },
                  { icon: YoutubeLogo, label: "YouTube", url: "#" }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-primary/10 border border-border/40 hover:border-primary/40 transition-all duration-200 group hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon size={19} weight="fill" className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
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
                <span className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all cursor-pointer font-medium group flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  API Reference
                </span>
                <span className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all cursor-pointer font-medium group flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Community Forum
                </span>
                <span className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all cursor-pointer font-medium group flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  System Status
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-[13px] uppercase tracking-[0.15em] mb-4 sm:mb-5 text-foreground">Company</h4>
              <div className="flex flex-col gap-3 sm:gap-3.5">
                <span className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all cursor-pointer font-medium group flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  About Us
                </span>
                <span className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all cursor-pointer font-medium group flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Contact Sales
                </span>
                <span className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all cursor-pointer font-medium group flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Careers
                </span>
                <span className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all cursor-pointer font-medium group flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Partners
                </span>
                <span className="text-sm text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-white hover:translate-x-1 transition-all cursor-pointer font-medium group flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors shrink-0" />
                  Trust Center
                </span>
              </div>
            </div>
          </div>
          
          <div className="pt-8 sm:pt-10 border-t border-border/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-xs sm:text-sm text-muted-foreground dark:text-slate-300 text-center md:text-left order-2 md:order-1">
                &copy; 2024 Guardivex Technologies, Inc. All rights reserved.
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-xs text-muted-foreground dark:text-slate-300 font-medium order-1 md:order-2">
                <span className="hover:text-primary dark:hover:text-white transition-colors cursor-pointer hover:underline decoration-primary decoration-2 underline-offset-4">
                  Privacy Policy
                </span>
                <span className="hover:text-primary dark:hover:text-white transition-colors cursor-pointer hover:underline decoration-primary decoration-2 underline-offset-4">
                  Terms of Service
                </span>
                <span className="hover:text-primary dark:hover:text-white transition-colors cursor-pointer hover:underline decoration-primary decoration-2 underline-offset-4 hidden sm:inline">
                  Security
                </span>
                <span className="hover:text-primary dark:hover:text-white transition-colors cursor-pointer hover:underline decoration-primary decoration-2 underline-offset-4 hidden sm:inline">
                  Compliance
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
              <Badge variant="outline" className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 font-semibold border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all">
                SOC 2 Type II
              </Badge>
              <Badge variant="outline" className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 font-semibold border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all">
                ISO 27001
              </Badge>
              <Badge variant="outline" className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 font-semibold border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all">
                HIPAA Compliant
              </Badge>
              <Badge variant="outline" className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 font-semibold border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all">
                GDPR Ready
              </Badge>
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
  return (
    <div className="relative guardivex-home-typography">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9 lg:pt-10 pb-6 sm:pb-8 lg:pb-9 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(0,143,199,0.08),transparent_44%)] dark:bg-[radial-gradient(circle_at_18%_14%,rgba(34,211,238,0.22),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_8%,rgba(0,143,199,0.07),transparent_40%)] dark:bg-[radial-gradient(circle_at_86%_8%,rgba(8,145,178,0.2),transparent_40%)]" />
        <div className="absolute inset-0 dark:bg-[linear-gradient(180deg,rgba(2,8,18,0.6),rgba(4,10,24,0.82))]" />
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.14] bg-[linear-gradient(rgba(125,211,252,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.08)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-5 lg:gap-7 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-3.5 sm:px-4 py-1.5 rounded-full bg-primary/8 dark:bg-cyan-400/10 border border-primary/25 dark:border-cyan-300/25 text-primary dark:text-cyan-300 text-[11px] sm:text-xs font-semibold mb-3 sm:mb-4 tracking-[0.01em]">
            Unified SOC Command Center &middot; Security Platform
            </div>
            <h1 className="bg-transparent mx-auto lg:mx-0 max-w-[14ch] text-[clamp(2.05rem,5.2vw,3.6rem)] font-[700] font-heading tracking-[-0.03em] text-balance text-foreground dark:text-slate-100 mb-2.5 sm:mb-3 leading-[1.02]">
              Enterprise Security Platform
            </h1>
            <p className="text-[clamp(0.96rem,1.02vw,1.075rem)] text-muted-foreground dark:text-slate-300 mb-4 sm:mb-5 max-w-[54ch] mx-auto lg:mx-0 leading-[1.55] text-pretty">
              Install on your own server to monitor security devices, cameras, NVRs, access control, alarms, networks, and system health from one SOC Command Center.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-[46rem] mx-auto lg:mx-0 px-2 lg:px-0">
              <Button size="lg" variant="outline" className="w-full h-10 text-sm">Request Demo</Button>
              <Button size="lg" onClick={() => onNavigate("download")} className="w-full h-10 text-sm">Download Trial</Button>
              <Button size="lg" variant="outline" className="w-full h-10 text-sm">View Architecture</Button>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-4 sm:p-5 md:p-6 text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground dark:text-slate-300">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 status-pulse" />
                Live SOC Overview
              </div>
              <Badge variant="outline" className="border-primary/35 text-primary dark:text-cyan-200 bg-primary/8 dark:bg-cyan-500/10">Online</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="rounded-xl border border-border/75 bg-white/70 dark:border-cyan-300/20 dark:bg-slate-950/45 p-3">
                <p className="text-[11px] text-muted-foreground dark:text-slate-400">Critical Alerts</p>
                <p className="text-2xl font-heading font-bold text-foreground dark:text-cyan-100">8</p>
              </div>
              <div className="rounded-xl border border-border/75 bg-white/70 dark:border-cyan-300/20 dark:bg-slate-950/45 p-3">
                <p className="text-[11px] text-muted-foreground dark:text-slate-400">Devices Online</p>
                <p className="text-2xl font-heading font-bold text-foreground dark:text-cyan-100">1,247</p>
              </div>
            </div>
            <div className="rounded-xl border border-border/75 bg-white/66 dark:border-cyan-300/16 dark:bg-slate-950/40 p-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground/90 dark:text-slate-300">Building A - Lobby</span>
                <span className="text-primary dark:text-cyan-300">Motion detected</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground/90 dark:text-slate-300">Warehouse B - Switch Core</span>
                <span className="text-amber-300">Latency spike</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground/90 dark:text-slate-300">HQ South - Camera 12</span>
                <span className="text-emerald-300">Restored</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DashboardPreviewSection />

      <VideoWalkthroughDemo />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 md:py-10 border-t border-border/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="bg-card/70 dark:bg-slate-950/55 border-border dark:border-slate-700/60">
            <CardHeader className="p-4 sm:p-6">
              <Monitor size={32} className="text-primary mb-2 sm:mb-3" weight="duotone" />
              <CardTitle className="text-base sm:text-lg text-foreground dark:text-slate-100">Self-Hosted Control</CardTitle>
              <CardDescription className="text-sm text-muted-foreground dark:text-slate-300">
                Install on your own server infrastructure with complete data sovereignty and control
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-card/70 dark:bg-slate-950/55 border-border dark:border-slate-700/60">
            <CardHeader className="p-4 sm:p-6">
              <ShieldCheck size={32} className="text-primary mb-2 sm:mb-3" weight="duotone" />
              <CardTitle className="text-base sm:text-lg text-foreground dark:text-slate-100">SOC Command Center</CardTitle>
              <CardDescription className="text-sm text-muted-foreground dark:text-slate-300">
                Built-in security operations center for monitoring devices, alerts, and incidents
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-card/70 dark:bg-slate-950/55 border-border dark:border-slate-700/60">
            <CardHeader className="p-4 sm:p-6">
              <CloudArrowDown size={32} className="text-primary mb-2 sm:mb-3" weight="duotone" />
              <CardTitle className="text-base sm:text-lg text-foreground dark:text-slate-100">Optional Cloud Services</CardTitle>
              <CardDescription className="text-sm text-muted-foreground dark:text-slate-300">
                Connect to Guardivex Cloud for licensing, updates, support, and remote access
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <PlatformOverviewSection />
      <ArchitectureDiagramSection />
      <DeploymentOptionsSection />
      <DownloadFlowSection onNavigate={onNavigate} />
      <FeatureGridSection />
      <PricingSection onNavigate={onNavigate} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="bg-card/70 dark:bg-slate-950/65 border border-border dark:border-slate-700/60 rounded-lg p-6 sm:p-8 md:p-10 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground dark:text-slate-100 mb-2 sm:mb-3">Trusted by Enterprise Security Teams</h2>
          <p className="text-sm sm:text-base text-muted-foreground dark:text-slate-300 mb-6 sm:mb-8">
            Join organizations monitoring thousands of devices across multiple sites
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto">
            {["5,000+", "50,000+", "99.9%", "24/7"].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">{stat}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {["Organizations", "Devices", "Uptime", "Support"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function ProductPage() {
  const features = [
    { icon: Monitor, title: "Device Monitoring", desc: "Cameras, NVRs, access control, alarms, network devices, and sensors" },
    { icon: ShieldCheck, title: "Real-time Alerts", desc: "Instant notifications for security events and device failures" },
    { icon: Database, title: "Incident Management", desc: "Track and investigate security incidents with full audit trails" },
    { icon: CheckCircle, title: "Multi-Site Support", desc: "Manage security infrastructure across unlimited locations" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-heading font-bold mb-4">Product Features</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive security monitoring and management platform for enterprise deployments
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-heading font-bold mb-4">Enterprise Solutions</h1>
        <p className="text-xl text-muted-foreground">
          Scalable security infrastructure for organizations of any size
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { title: "Unlimited Sites", desc: "Monitor security infrastructure across all your locations" },
          { title: "Unlimited Devices", desc: "No restrictions on the number of monitored devices" },
          { title: "Priority Support", desc: "24/7 enterprise support with dedicated success manager" },
          { title: "Custom Integrations", desc: "API access and custom integration development" },
          { title: "High Availability", desc: "Redundancy and failover configurations supported" },
          { title: "Compliance Ready", desc: "SOC 2, ISO 27001, HIPAA, and GDPR compliance features" },
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
            Discuss your organization's security monitoring needs with our enterprise team
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-heading font-bold mb-4">Download Guardivex</h1>
        <p className="text-xl text-muted-foreground">
          Install on your own infrastructure for complete control
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
              <div>Released: January 15, 2024</div>
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
              <div>Released: January 15, 2024</div>
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
            <p>Connect your security devices and begin monitoring</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LicensingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-heading font-bold mb-4">Licensing Options</h1>
        <p className="text-xl text-muted-foreground">
          Flexible licensing models for organizations of all sizes
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
            features: ["Unlimited sites", "Unlimited devices", "24/7 support", "Custom integrations", "Dedicated success manager"]
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-heading font-bold mb-4">Documentation</h1>
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
          <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer">
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-heading font-bold mb-4">Support</h1>
        <p className="text-xl text-muted-foreground">
          Get help from our team and community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { title: "Knowledge Base", desc: "Search our comprehensive knowledge base for articles and guides", availability: "Available 24/7" },
          { title: "Community Forum", desc: "Connect with other Guardivex users and share experiences", availability: "Community-moderated" },
          { title: "Enterprise Support", desc: "24/7 priority support with guaranteed response times", availability: "Enterprise plans only" },
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
  const [activeEvent, setActiveEvent] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [clickedModule, setClickedModule] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const events = [
    { icon: Warning, label: "Motion detected", site: "Building A - Lobby", time: "Just now", severity: "high" },
    { icon: CheckCircle, label: "Device restored", site: "Building B - Camera 12", time: "2 min ago", severity: "success" },
    { icon: Bell, label: "Access granted", site: "Building C - Main Entry", time: "3 min ago", severity: "info" },
    { icon: Warning, label: "Network latency spike", site: "Building D - Switch Core", time: "5 min ago", severity: "warning" },
    { icon: ShieldCheck, label: "Incident resolved", site: "Building A - Incident #892", time: "8 min ago", severity: "success" },
  ]

  const statusCards = [
    { 
      icon: ShieldCheck, 
      label: "Security Score", 
      value: 87, 
      badge: "Good", 
      badgeClass: "bg-success/20 text-success border-success/30",
      gradient: "from-primary/10 to-primary/5",
      border: "border-primary/20",
      iconColor: "text-primary",
      hoverGradient: "hover:from-primary/20 hover:to-primary/10"
    },
    { 
      icon: Warning, 
      label: "Critical Alerts", 
      value: 8, 
      badge: "High", 
      badgeClass: "bg-destructive/20 text-destructive border-destructive/30",
      gradient: "from-destructive/10 to-destructive/5",
      border: "border-destructive/20",
      iconColor: "text-destructive",
      hoverGradient: "hover:from-destructive/20 hover:to-destructive/10"
    },
    { 
      icon: Broadcast, 
      label: "Devices Online", 
      value: "1,247", 
      badge: "Live", 
      badgeClass: "bg-success/20 text-success border-success/30",
      gradient: "from-success/10 to-success/5",
      border: "border-success/20",
      iconColor: "text-success",
      hoverGradient: "hover:from-success/20 hover:to-success/10"
    },
    { 
      icon: Buildings, 
      label: "Sites Monitored", 
      value: 23, 
      badge: "Active", 
      badgeClass: "bg-accent/20 text-accent border-accent/30",
      gradient: "from-accent/10 to-accent/5",
      border: "border-accent/20",
      iconColor: "text-accent",
      hoverGradient: "hover:from-accent/20 hover:to-accent/10"
    },
  ]

  const devices = [
    { icon: Camera, label: "Cameras", count: 584, status: 98, trend: "+2" },
    { icon: Lock, label: "Access Control", count: 142, status: 100, trend: "0" },
    { icon: Siren, label: "Alarm Panels", count: 89, status: 95, trend: "-1" },
    { icon: NetworkX, label: "Network", count: 432, status: 97, trend: "+5" },
  ]

  const siteHealth = [
    { name: "HQ North", devices: 234, status: "healthy", uptime: 99.9 },
    { name: "HQ South", devices: 198, status: "healthy", uptime: 99.8 },
    { name: "Warehouse A", devices: 156, status: "warning", uptime: 98.2 },
    { name: "Warehouse B", devices: 143, status: "healthy", uptime: 99.7 },
    { name: "Retail Store 1", devices: 89, status: "healthy", uptime: 99.9 },
    { name: "Retail Store 2", devices: 76, status: "critical", uptime: 92.3 },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 border-t border-border/60 bg-gradient-to-b from-background via-card/20 to-background dark:from-slate-950/85 dark:via-slate-950/65 dark:to-slate-950/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.08),transparent_54%)] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.15),transparent_52%)]" />
      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.14] bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:26px_26px]" />
      
      <div className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10">
          <Badge className="mb-3 sm:mb-4 bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 transition-colors text-xs sm:text-sm">
            <Circle size={8} weight="fill" className="animate-pulse" />
            <span className="ml-2">Live Demo Preview</span>
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground dark:text-slate-100 mb-2 sm:mb-3 px-2">Enterprise SOC Command Center</h2>
          <p className="text-sm sm:text-base text-muted-foreground dark:text-slate-300 px-2">
            Real-time monitoring and threat detection across your entire security infrastructure
          </p>
        </div>

        <div className="w-full">
          <div className="rounded-xl overflow-hidden border border-border/70 dark:border-slate-600/60 shadow-2xl bg-gradient-to-br from-card/95 via-background/95 to-card/95 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950/95 backdrop-blur-sm transition-all duration-300 hover:border-cyan-300/30 hover:shadow-cyan-500/10">
            <div className="bg-card/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-border/60 dark:border-slate-700/60 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive/60 hover:bg-destructive transition-colors cursor-pointer" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-warning/60 hover:bg-warning transition-colors cursor-pointer" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-success/60 hover:bg-success transition-colors cursor-pointer animate-pulse" />
              </div>
              <div className="flex-1 flex items-center justify-center gap-2">
                <Monitor size={14} className="text-muted-foreground dark:text-slate-300 hidden sm:block" weight="duotone" />
                <span className="text-[10px] sm:text-xs text-muted-foreground dark:text-slate-400 font-mono">Guardivex Security Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] sm:text-xs gap-1 border-success/30 text-success">
                  <Circle size={6} weight="fill" className="animate-pulse" />
                  <span className="hidden xs:inline">Online</span>
                </Badge>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                {statusCards.map((card, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-br ${card.gradient} ${card.hoverGradient} rounded-lg p-4 border ${card.border} transition-all duration-300 cursor-pointer min-h-[132px] ${
                      hoveredCard === i ? 'shadow-lg ring-2 ring-primary/30 -translate-y-0.5' : ''
                    }`}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setClickedModule(`status-${i}`)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <card.icon 
                        size={24} 
                        className={`${card.iconColor} transition-transform duration-300 ${hoveredCard === i ? 'scale-110' : ''}`} 
                        weight="duotone" 
                      />
                      <Badge className={`text-xs ${card.badgeClass}`}>
                        {card.badge}
                      </Badge>
                    </div>
                    <div className={`text-2xl font-bold font-heading mb-1 transition-all duration-300 ${hoveredCard === i ? 'text-primary' : ''}`}>
                      {card.value}
                    </div>
                    <div className="text-xs text-muted-foreground dark:text-slate-300">{card.label}</div>
                    {clickedModule === `status-${i}` && (
                      <div className="mt-2 text-xs text-primary font-medium animate-pulse">
                        Module active
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div 
                  className="lg:col-span-2 bg-card/55 dark:bg-slate-900/55 rounded-lg border border-border/60 dark:border-slate-700/60 p-4 hover:border-cyan-300/30 transition-all duration-300 cursor-pointer hover:shadow-lg"
                  onClick={() => setClickedModule('alerts')}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <Bell size={16} weight="duotone" className="text-primary" />
                      Live Alert Feed
                    </h3>
                    <Badge variant="outline" className="text-xs gap-1">
                      <Circle size={6} weight="fill" className="animate-pulse text-destructive" />
                      Real-time
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {events.slice(0, 4).map((event, i) => (
                      <div 
                        key={i} 
                        className={`flex items-start gap-3 p-3 bg-background/55 dark:bg-slate-950/55 rounded border transition-all duration-500 ${
                          i === activeEvent % 4 
                            ? 'border-primary/50 shadow-md scale-[1.02] bg-primary/5' 
                            : 'border-border/50 dark:border-slate-700/50 hover:border-border dark:hover:border-slate-500/70'
                        }`}
                      >
                        <event.icon 
                          size={20} 
                          className={`${
                            event.severity === "high" ? "text-destructive" : 
                            event.severity === "warning" ? "text-warning" :
                            event.severity === "success" ? "text-success" : "text-info"
                          } ${i === activeEvent % 4 ? 'animate-pulse' : ''}`}
                          weight="duotone" 
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{event.label}</div>
                          <div className="text-xs text-muted-foreground dark:text-slate-300 truncate">{event.site}</div>
                        </div>
                        <div className="text-xs text-muted-foreground dark:text-slate-300 whitespace-nowrap">{event.time}</div>
                      </div>
                    ))}
                  </div>
                  {clickedModule === 'alerts' && (
                    <div className="mt-3 p-2 bg-primary/10 border border-primary/30 rounded text-xs text-primary text-center font-medium">
                      Click to view full alert dashboard
                    </div>
                  )}
                </div>

                <div 
                  className="bg-card/55 dark:bg-slate-900/55 rounded-lg border border-border/60 dark:border-slate-700/60 p-4 hover:border-cyan-300/30 transition-all duration-300 cursor-pointer hover:shadow-lg"
                  onClick={() => setClickedModule('devices')}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <Gauge size={16} weight="duotone" className="text-primary" />
                      Device Health
                    </h3>
                    <Badge variant="outline" className="text-xs">12 Types</Badge>
                  </div>
                  <div className="space-y-3">
                    {devices.map((device, i) => (
                      <div 
                        key={i} 
                        className="p-2 bg-background/55 dark:bg-slate-950/55 rounded border border-border/50 dark:border-slate-700/50 hover:border-cyan-300/30 transition-all duration-300 hover:scale-[1.02] group"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <device.icon size={16} className="text-primary group-hover:scale-110 transition-transform" weight="duotone" />
                          <span className="text-xs font-medium flex-1">{device.label}</span>
                          <span className="text-xs text-muted-foreground dark:text-slate-300">{device.count}</span>
                          <span className={`text-xs font-mono ${
                            device.trend.startsWith('+') ? 'text-success' : 
                            device.trend.startsWith('-') ? 'text-destructive' : 'text-muted-foreground dark:text-slate-300'
                          }`}>
                            {device.trend}
                          </span>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              device.status >= 98 ? 'bg-success' : 
                              device.status >= 90 ? 'bg-warning' : 'bg-destructive'
                            } ${
                              device.status >= 98 ? 'w-full shadow-[0_0_8px_rgba(120,200,120,0.5)]' :
                              device.status >= 95 ? 'w-11/12' :
                              device.status >= 90 ? 'w-10/12' :
                              device.status >= 80 ? 'w-9/12' :
                              'w-8/12'
                            }`}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground dark:text-slate-300 mt-1 text-right">{device.status}%</div>
                      </div>
                    ))}
                  </div>
                  {clickedModule === 'devices' && (
                    <div className="mt-3 p-2 bg-primary/10 border border-primary/30 rounded text-xs text-primary text-center font-medium">
                      Click to view device registry
                    </div>
                  )}
                </div>
              </div>

              <div 
                className="bg-card/55 dark:bg-slate-900/55 rounded-lg border border-border/60 dark:border-slate-700/60 p-4 hover:border-cyan-300/30 transition-all duration-300 cursor-pointer hover:shadow-lg"
                onClick={() => setClickedModule('sites')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <Buildings size={16} weight="duotone" className="text-primary" />
                    Site Health Overview
                  </h3>
                  <Badge variant="outline" className="text-xs">23 Sites</Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                  {siteHealth.map((site, i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded border transition-all duration-300 hover:scale-105 ${
                        site.status === 'healthy' ? 'bg-success/5 border-success/20 hover:border-success/40' :
                        site.status === 'warning' ? 'bg-warning/5 border-warning/20 hover:border-warning/40' :
                        'bg-destructive/5 border-destructive/20 hover:border-destructive/40'
                      }`}
                    >
                      <div className="text-xs font-medium mb-1 truncate" title={site.name}>{site.name}</div>
                      <div className="text-xs text-muted-foreground dark:text-slate-300 mb-2">{site.devices} devices</div>
                      <div className={`w-full h-1 rounded-full mb-1 ${
                        site.status === 'healthy' ? 'bg-success' :
                        site.status === 'warning' ? 'bg-warning' :
                        'bg-destructive'
                      }`} />
                      <div className="text-xs text-muted-foreground dark:text-slate-300">{site.uptime}%</div>
                    </div>
                  ))}
                </div>
                {clickedModule === 'sites' && (
                  <div className="mt-3 p-2 bg-primary/10 border border-primary/30 rounded text-xs text-primary text-center font-medium">
                    Click to view site management
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground dark:text-slate-300 mb-4 font-medium">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-cyan-400/10 border border-primary/30 dark:border-cyan-300/30 text-primary dark:text-cyan-200">
                Interactive Demo - Hover over cards and click modules to explore
              </span>
            </p>
            <div className="flex flex-wrap gap-3 justify-center text-xs text-muted-foreground dark:text-slate-300">
              {[
                "Real-time monitoring",
                "Threat detection",
                "Multi-site support",
                "Custom integrations",
                "Advanced analytics",
                "24/7 uptime"
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/55 dark:bg-slate-900/55 border border-border/60 dark:border-slate-700/60 hover:border-cyan-300/35 hover:bg-cyan-500/8 transition-all duration-300 cursor-pointer"
                >
                  <CheckCircle size={14} className="text-success" weight="fill" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
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
        <h2 className="text-3xl font-heading font-bold mb-3">Platform Overview</h2>
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
        <h2 className="text-3xl font-heading font-bold mb-3">Deployment Options</h2>
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
        <h2 className="text-3xl font-heading font-bold mb-3">Get Started in Minutes</h2>
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
      features: ["Up to 3 sites", "Up to 50 devices", "Full features", "Email support", "Cloud services"],
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
      features: ["Unlimited sites", "Unlimited devices", "24/7 support", "Custom integrations", "Dedicated success manager"],
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

