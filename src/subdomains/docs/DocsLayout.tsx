/**
 * DocsLayout — sidebar + top-bar shell for docs.guardivex.com
 *
 * Renders a two-column layout: collapsible sidebar (desktop) / drawer (mobile)
 * on the left and a scrollable content pane on the right.
 */

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { BrandLogo } from "@/components/BrandLogo"
import {
  ENTERPRISE_HEADER_SURFACE_CLASS,
  ENTERPRISE_SEARCH_SHELL_CLASS,
  HeaderStatusBadge,
} from "@/components/layout/HeaderPrimitives"
import { getSubdomainUrl } from "@/hooks/use-subdomain"
import {
  List,
  X,
  MagnifyingGlass,
  ArrowSquareOut,
  BookOpen,
  Download,
  Gear,
  Terminal,
  ShieldCheck,
  Cpu,
  VideoCamera,
  LockKey,
  BellRinging,
  ChartLineUp,
  Package,
  Certificate,
  Key,
  Code,
  Question,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Warning,
  Info,
  Rocket,
  HardDrives,
  CloudArrowUp,
  Desktop,
} from "@phosphor-icons/react"

// ─────────────────────────────────────────────────────────────────────────────
// Navigation tree
// ─────────────────────────────────────────────────────────────────────────────

interface DocItem {
  id: string
  label: string
  icon?: React.ElementType
  badge?: string
}

interface DocSection {
  id: string
  title: string
  icon: React.ElementType
  items: DocItem[]
}

const DOC_SECTIONS: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Rocket,
    items: [
      { id: "overview", label: "Overview" },
      { id: "requirements", label: "System Requirements" },
      { id: "installation", label: "Installation" },
      { id: "quick-start", label: "Quick Start Guide", badge: "New" },
    ],
  },
  {
    id: "platform",
    title: "Platform Guide",
    icon: Desktop,
    items: [
      { id: "devices", label: "Devices & Sensors" },
      { id: "cameras", label: "Cameras & NVRs" },
      { id: "access-control", label: "Access Control" },
      { id: "alerts", label: "Alerts & Events" },
      { id: "incidents", label: "Incident Management" },
      { id: "sites", label: "Multi-Site Management" },
    ],
  },
  {
    id: "soc",
    title: "SOC Command Center",
    icon: ShieldCheck,
    items: [
      { id: "dashboard", label: "Dashboard Overview" },
      { id: "live-monitoring", label: "Live Monitoring" },
      { id: "reports", label: "Reports & Analytics" },
    ],
  },
  {
    id: "api",
    title: "API Reference",
    icon: Code,
    items: [
      { id: "api-auth", label: "Authentication" },
      { id: "api-endpoints", label: "Endpoints" },
      { id: "api-rate-limits", label: "Rate Limits" },
      { id: "api-webhooks", label: "Webhooks" },
    ],
  },
  {
    id: "deployment",
    title: "Deployment",
    icon: HardDrives,
    items: [
      { id: "deploy-prereqs", label: "Prerequisites" },
      { id: "deploy-docker", label: "Docker / Compose" },
      { id: "deploy-bare-metal", label: "Bare Metal" },
      { id: "deploy-cloud", label: "Cloud / VM", badge: "Beta" },
      { id: "deploy-config", label: "Configuration Reference" },
    ],
  },
  {
    id: "licensing",
    title: "Licensing",
    icon: Certificate,
    items: [
      { id: "license-overview", label: "License Types" },
      { id: "license-activate", label: "Activation" },
      { id: "license-manage", label: "Management" },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Page content registry
// ─────────────────────────────────────────────────────────────────────────────

function ContentOverview() {
  return (
    <div className="max-w-3xl">
      <Badge variant="outline" className="mb-4 text-primary border-primary/30">Platform Docs v3.1</Badge>
      <h1 className="text-4xl font-heading font-bold mb-4">guardivex Documentation</h1>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        guardivex is an enterprise security infrastructure platform for monitoring devices,
        cameras, NVRs, access control, alarms, and network health from a centralised SOC
        Command Center. Install on your own server for complete data sovereignty.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {[
          { icon: Rocket, title: "Quick Start", desc: "Up and running in 15 minutes", id: "quick-start" },
          { icon: Code, title: "API Reference", desc: "Integrate with your systems", id: "api-auth" },
          { icon: HardDrives, title: "Deployment", desc: "Docker, bare metal, and cloud", id: "deploy-docker" },
          { icon: ShieldCheck, title: "SOC Dashboard", desc: "Command center walkthrough", id: "dashboard" },
        ].map((card) => (
          <button
            key={card.id}
            className="flex items-start gap-3 p-4 border border-border rounded-lg text-left hover:border-primary/40 hover:bg-primary/4 transition-colors group"
          >
            <card.icon size={22} weight="duotone" className="text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <div className="font-semibold text-sm">{card.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{card.desc}</div>
            </div>
          </button>
        ))}
      </div>
      <Callout type="info" title="This is a hosted documentation portal.">
        The content below is included as a representative example. Connect your real docs
        pipeline (e.g. MDX, Contentlayer, or a CMS) to replace these placeholders.
      </Callout>
    </div>
  )
}

function ContentRequirements() {
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="System Requirements" section="Getting Started" />
      <Section title="Server (On-Premise)">
        <RequirementTable rows={[
          ["OS", "Ubuntu 22.04 LTS, Debian 12, RHEL 9, Windows Server 2022"],
          ["CPU", "4 vCPU minimum · 8 vCPU recommended"],
          ["RAM", "8 GB minimum · 16 GB recommended"],
          ["Disk", "100 GB SSD (OS + DB) · 1 TB for device footage index"],
          ["Network", "100 Mbps LAN · Static IP or resolvable hostname"],
          ["Ports", "443 (HTTPS), 1883 (MQTT), 5432 (PostgreSQL internal)"],
        ]} />
      </Section>
      <Section title="Client Browser">
        <RequirementTable rows={[
          ["Chrome", "≥ 120"],
          ["Firefox", "≥ 121"],
          ["Safari", "≥ 17"],
          ["Edge", "≥ 120"],
        ]} />
      </Section>
      <Callout type="warning" title="Minimum specs produce degraded performance.">
        Deployments with more than 500 monitored devices should scale to the recommended specs
        before going live.
      </Callout>
    </div>
  )
}

function ContentInstallation() {
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Installation" section="Getting Started" />
      <p className="text-muted-foreground">
        guardivex can be installed via the interactive installer script, Docker Compose, or a
        manual bare-metal setup. The installer script is the fastest path.
      </p>
      <Section title="1. Download the installer">
        <CodeBlock language="bash">{`curl -fsSL https://install.guardivex.com/setup.sh | sudo bash`}</CodeBlock>
      </Section>
      <Section title="2. Follow the interactive prompts">
        <ul className="space-y-2 text-sm text-muted-foreground list-none">
          {[
            "Choose installation directory (default: /opt/guardivex)",
            "Set a postgres password and admin credentials",
            "Optionally enable guardivex Cloud relay",
            "Confirm license key (skip for 30-day trial)",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle size={16} weight="fill" className="text-success shrink-0 mt-0.5" />
              {step}
            </li>
          ))}
        </ul>
      </Section>
      <Section title="3. Verify the service">
        <CodeBlock language="bash">{`sudo systemctl status guardivex
# Open https://<your-server-ip>`}</CodeBlock>
      </Section>
      <Callout type="info" title="Firewall note.">
        Open ports 443, 1883, and 8883 inbound before running the installer.
      </Callout>
    </div>
  )
}

function ContentQuickStart() {
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Quick Start Guide" section="Getting Started" badge="New" />
      <Callout type="info" title="Estimated time: 15 minutes.">
        This guide gets a single-site deployment with 10 test devices running from scratch.
      </Callout>
      <Section title="Step 1 — Install guardivex">
        <CodeBlock language="bash">{`curl -fsSL https://install.guardivex.com/setup.sh | sudo bash`}</CodeBlock>
      </Section>
      <Section title="Step 2 — Create your first site">
        <p className="text-sm text-muted-foreground">
          Navigate to <strong>Sites → Add Site</strong>, enter a name and address, then save. A
          site represents a physical location and acts as the top-level container for devices.
        </p>
      </Section>
      <Section title="Step 3 — Add devices">
        <p className="text-sm text-muted-foreground">
          Go to <strong>Devices → Add Device</strong>. Select the device type (camera, NVR, access
          reader, alarm panel, or network switch), enter the IP address, and assign it to a site.
          guardivex will poll the device for health every 30 seconds.
        </p>
      </Section>
      <Section title="Step 4 — Configure alert rules">
        <p className="text-sm text-muted-foreground">
          Open <strong>Alerts → Rules</strong> and enable the default ruleset. You can fine-tune
          severity thresholds and notification channels (email, webhook, SMS) per rule.
        </p>
      </Section>
      <Section title="Step 5 — Open the SOC dashboard">
        <p className="text-sm text-muted-foreground">
          Navigate to the <strong>SOC Command Center</strong>. You should see your site, all
          online devices, and live health metrics within a few seconds of setup.
        </p>
      </Section>
    </div>
  )
}

function ContentApiAuth() {
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Authentication" section="API Reference" />
      <p className="text-muted-foreground">
        The guardivex REST API uses short-lived JWT access tokens (15 min) paired with
        rotating refresh tokens (7 days). All API traffic must use HTTPS.
      </p>
      <Section title="Obtain a token">
        <CodeBlock language="bash">{`POST https://api.guardivex.com/v1/auth/token
Content-Type: application/json

{
  "client_id":     "your-client-id",
  "client_secret": "your-client-secret",
  "grant_type":    "client_credentials"
}`}</CodeBlock>
      </Section>
      <Section title="Response">
        <CodeBlock language="json">{`{
  "access_token":  "eyJ...",
  "token_type":    "Bearer",
  "expires_in":    900,
  "refresh_token": "rt_..."
}`}</CodeBlock>
      </Section>
      <Section title="Using the token">
        <CodeBlock language="bash">{`GET https://api.guardivex.com/v1/devices
Authorization: Bearer eyJ...`}</CodeBlock>
      </Section>
      <Callout type="warning" title="Never embed secrets in client-side code.">
        Store client credentials server-side only. Use the API from a backend service or a
        Cloudflare Worker, never directly from the browser.
      </Callout>
    </div>
  )
}

function ContentApiEndpoints() {
  const endpoints = [
    { method: "GET", path: "/v1/devices", desc: "List all monitored devices" },
    { method: "GET", path: "/v1/devices/:id", desc: "Single device detail" },
    { method: "POST", path: "/v1/devices", desc: "Register a new device" },
    { method: "GET", path: "/v1/sites", desc: "List all sites" },
    { method: "POST", path: "/v1/sites", desc: "Create a site" },
    { method: "GET", path: "/v1/alerts", desc: "List alerts (paginated)" },
    { method: "PATCH", path: "/v1/alerts/:id/acknowledge", desc: "Acknowledge an alert" },
    { method: "GET", path: "/v1/incidents", desc: "List incidents" },
    { method: "POST", path: "/v1/incidents", desc: "Open a new incident" },
    { method: "PATCH", path: "/v1/incidents/:id", desc: "Update incident status" },
    { method: "GET", path: "/v1/health", desc: "System health summary" },
    { method: "GET", path: "/v1/license", desc: "Current license information" },
  ]
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Endpoints" section="API Reference" />
      <p className="text-muted-foreground">
        Base URL: <code className="text-xs bg-muted px-1.5 py-0.5 rounded">https://api.guardivex.com</code>
      </p>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground w-24">Method</th>
              <th className="text-left px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Path</th>
              <th className="text-left px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground hidden sm:table-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((ep, i) => (
              <tr key={i} className="border-t border-border hover:bg-muted/20 transition-colors">
                <td className="px-4 py-2.5">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${ep.method === "GET" ? "bg-blue-500/10 text-blue-400" : ep.method === "POST" ? "bg-green-500/10 text-green-400" : "bg-orange-500/10 text-orange-400"}`}>
                    {ep.method}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">{ep.path}</td>
                <td className="px-4 py-2.5 text-muted-foreground hidden sm:table-cell">{ep.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ContentDeployDocker() {
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Docker / Compose" section="Deployment" />
      <p className="text-muted-foreground">
        The official Docker Compose stack includes guardivex core, PostgreSQL, Redis, and an
        Nginx TLS terminator. Bring your own certificate or use the built-in ACME (Let's Encrypt)
        integration.
      </p>
      <Section title="Clone and configure">
        <CodeBlock language="bash">{`git clone https://github.com/guardivex/deploy.git
cd deploy
cp .env.example .env
# Edit .env — set GUARDIVEX_DOMAIN, POSTGRES_PASSWORD, ADMIN_EMAIL`}</CodeBlock>
      </Section>
      <Section title="Start the stack">
        <CodeBlock language="bash">{`docker compose pull
docker compose up -d
# Tail logs
docker compose logs -f guardivex`}</CodeBlock>
      </Section>
      <Section title="Environment variables">
        <RequirementTable rows={[
          ["GUARDIVEX_DOMAIN", "Your server FQDN, e.g. soc.acme.com"],
          ["POSTGRES_PASSWORD", "Strong random password for the DB"],
          ["ADMIN_EMAIL", "Initial admin user e-mail"],
          ["ACME_EMAIL", "Let's Encrypt registration address"],
          ["LICENSE_KEY", "Optional — leave blank for trial mode"],
        ]} />
      </Section>
    </div>
  )
}

function ContentGeneric({ title, section }: { title: string; section: string }) {
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title={title} section={section} />
      <p className="text-muted-foreground">
        Documentation for this section is in progress. Check back soon or{" "}
        <a href="mailto:docs@guardivex.com" className="text-primary underline underline-offset-4">
          contribute to the docs
        </a>.
      </p>
      <Callout type="info" title="Help wanted.">
        This page is a placeholder. Submit a pull request at github.com/guardivex/docs to fill it
        in.
      </Callout>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Content router
// ─────────────────────────────────────────────────────────────────────────────

const CONTENT_MAP: Record<string, () => React.ReactElement> = {
  overview: ContentOverview,
  requirements: ContentRequirements,
  installation: ContentInstallation,
  "quick-start": ContentQuickStart,
  "api-auth": ContentApiAuth,
  "api-endpoints": ContentApiEndpoints,
  "deploy-docker": ContentDeployDocker,
}

function resolveContent(id: string): React.ReactElement {
  const Component = CONTENT_MAP[id]
  if (Component) return <Component />

  // Look up title + section from the nav tree for the generic fallback
  for (const section of DOC_SECTIONS) {
    const item = section.items.find((i) => i.id === id)
    if (item) {
      return <ContentGeneric title={item.label} section={section.title} />
    }
  }
  return <ContentOverview />
}

// ─────────────────────────────────────────────────────────────────────────────
// Small shared UI primitives
// ─────────────────────────────────────────────────────────────────────────────

function PageHeader({
  title,
  section,
  badge,
}: {
  title: string
  section: string
  badge?: string
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">{section}</p>
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-heading font-bold">{title}</h1>
        {badge && (
          <Badge className="text-xs">{badge}</Badge>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </div>
  )
}

function RequirementTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([key, value], i) => (
            <tr key={i} className={`border-t border-border first:border-t-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
              <td className="px-4 py-2.5 font-semibold text-foreground w-40 shrink-0">{key}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CodeBlock({ children, language }: { children: string; language?: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-border">
      {language && (
        <div className="px-4 py-1.5 bg-muted/60 border-b border-border text-xs font-mono text-muted-foreground">
          {language}
        </div>
      )}
      <pre className="p-4 bg-muted/30 overflow-x-auto text-xs leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  )
}

function Callout({
  type,
  title,
  children,
}: {
  type: "info" | "warning" | "success"
  title: string
  children: React.ReactNode
}) {
  const styles = {
    info: { border: "border-blue-500/30 bg-blue-500/5", text: "text-blue-400", Icon: Info },
    warning: { border: "border-orange-500/30 bg-orange-500/5", text: "text-orange-400", Icon: Warning },
    success: { border: "border-green-500/30 bg-green-500/5", text: "text-green-400", Icon: CheckCircle },
  }
  const { border, text, Icon } = styles[type]
  return (
    <div className={`border rounded-lg p-4 flex gap-3 ${border}`}>
      <Icon size={18} weight="fill" className={`${text} shrink-0 mt-0.5`} />
      <div className="text-sm">
        <span className={`font-semibold ${text}`}>{title}</span>{" "}
        <span className="text-muted-foreground">{children}</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar
// ─────────────────────────────────────────────────────────────────────────────

function Sidebar({
  activeId,
  onSelect,
}: {
  activeId: string
  onSelect: (id: string) => void
}) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    () => new Set(DOC_SECTIONS.map((s) => s.id)),
  )

  const toggle = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      next.has(sectionId) ? next.delete(sectionId) : next.add(sectionId)
      return next
    })
  }

  return (
    <nav className="w-full space-y-1">
      {DOC_SECTIONS.map((section) => {
        const isExpanded = expandedSections.has(section.id)
        return (
          <div key={section.id}>
            <button
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/30"
            >
              <div className="flex items-center gap-2">
                <section.icon size={14} weight="bold" />
                {section.title}
              </div>
              <ArrowRight
                size={11}
                weight="bold"
                className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
              />
            </button>
            {isExpanded && (
              <div className="ml-3 mt-0.5 space-y-0.5 border-l border-border pl-3">
                {section.items.map((item) => {
                  const isActive = item.id === activeId
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelect(item.id)}
                      className={`w-full text-left flex items-center justify-between px-2 py-1.5 text-sm rounded-md transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Top bar
// ─────────────────────────────────────────────────────────────────────────────

function TopBar({
  mobileOpen,
  onMobileToggle,
}: {
  mobileOpen: boolean
  onMobileToggle: () => void
}) {
  return (
    <header className={`sticky top-0 z-50 ${ENTERPRISE_HEADER_SURFACE_CLASS}`}>
      <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileToggle}
            className="lg:hidden p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/40 transition-colors"
            aria-label="Toggle sidebar"
            title="Toggle sidebar"
          >
            {mobileOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
          <a href={getSubdomainUrl("www", "/")} className="flex items-center gap-2 group">
            <BrandLogo
              subtitle="Docs"
              markClassName="w-8 h-8"
              titleClassName="text-sm font-bold"
              subtitleClassName="text-[10px] tracking-widest"
            />
          </a>
          <Badge variant="outline" className="hidden sm:flex text-xs text-muted-foreground border-border">
            v3.1
          </Badge>
          <HeaderStatusBadge label="Docs Online" className="hidden md:inline-flex" />
        </div>

        <div className="flex items-center gap-2">
          <div className={ENTERPRISE_SEARCH_SHELL_CLASS}>
            <MagnifyingGlass size={14} weight="bold" />
            <span className="text-xs">Search docs…</span>
            <kbd className="ml-2 text-[10px] font-mono bg-background border border-border rounded px-1">
              ⌘K
            </kbd>
          </div>
          <ThemeSwitcher />
          <Button
            size="sm"
            variant="outline"
            className="hidden sm:flex gap-1.5 text-xs h-9 border-border/70 hover:border-primary/40 hover:bg-primary/8"
            onClick={() => { window.location.href = getSubdomainUrl("app", "/login") }}
          >
            Sign In
            <ArrowRight size={12} weight="bold" />
          </Button>
        </div>
      </div>
    </header>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main layout export
// ─────────────────────────────────────────────────────────────────────────────

export function DocsLayout() {
  const [activeId, setActiveId] = useState("overview")
  const [mobileOpen, setMobileOpen] = useState(false)

  const allItems = DOC_SECTIONS.flatMap((s) => s.items)
  const currentIndex = allItems.findIndex((i) => i.id === activeId)
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null

  const handleSelect = (id: string) => {
    setActiveId(id)
    setMobileOpen(false)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar mobileOpen={mobileOpen} onMobileToggle={() => setMobileOpen((v) => !v)} />

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-14 z-40 bg-background/98 backdrop-blur-xl overflow-y-auto">
          <div className="p-4">
            <Sidebar activeId={activeId} onSelect={handleSelect} />
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-6 px-4 border-r border-border">
          <Sidebar activeId={activeId} onSelect={handleSelect} />
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 py-8 px-4 sm:px-8 lg:px-10">
          {resolveContent(activeId)}

          {/* Prev / Next navigation */}
          <div className="mt-12 pt-6 border-t border-border flex items-center justify-between gap-4">
            {prevItem ? (
              <button
                onClick={() => handleSelect(prevItem.id)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft size={15} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
                <span>{prevItem.label}</span>
              </button>
            ) : <div />}
            {nextItem && (
              <button
                onClick={() => handleSelect(nextItem.id)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group ml-auto"
              >
                <span>{nextItem.label}</span>
                <ArrowRight size={15} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>

          <footer className="mt-8 pb-8 text-xs text-muted-foreground">
            © 2026 guardivex Technologies, Inc. — docs.guardivex.com
          </footer>
        </main>
      </div>
    </div>
  )
}
