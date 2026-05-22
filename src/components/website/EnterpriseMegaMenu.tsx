import { 
  ShieldCheck, 
  Monitor, 
  Network, 
  Bell, 
  Buildings,
  Users,
  Cloud,
  Cpu,
  Lock,
  ChartLine,
  Headset,
  ArrowRight,
  Check
} from "@phosphor-icons/react"

interface EnterpriseMegaMenuProps {
  onNavigate: (page: string) => void
  onClose: () => void
}

const menuSections = [
  {
    title: "Solutions",
    items: [
      {
        icon: ShieldCheck,
        label: "SOC Command Center",
        description: "Unified security operations dashboard",
        badge: "Core"
      },
      {
        icon: Monitor,
        label: "Device Management",
        description: "Monitor cameras, NVRs, sensors, and alarms",
        badge: null
      },
      {
        icon: Network,
        label: "Network Infrastructure",
        description: "Network device monitoring and alerting",
        badge: null
      },
      {
        icon: Bell,
        label: "Alert & Incident Engine",
        description: "Real-time threat detection and response",
        badge: "AI"
      }
    ]
  },
  {
    title: "Platform",
    items: [
      {
        icon: Buildings,
        label: "Multi-Site Management",
        description: "Centralized control across all locations",
        badge: null
      },
      {
        icon: Cpu,
        label: "Integration Framework",
        description: "Connect third-party systems and APIs",
        badge: null
      },
      {
        icon: Cloud,
        label: "Cloud Services",
        description: "Remote access, updates, and backup",
        badge: "Optional"
      },
      {
        icon: Lock,
        label: "Access Control",
        description: "Role-based security and permissions",
        badge: null
      }
    ]
  },
  {
    title: "Industries",
    items: [
      {
        icon: Buildings,
        label: "Enterprise Facilities",
        description: "Corporate campuses and office buildings",
        badge: null
      },
      {
        icon: Monitor,
        label: "Critical Infrastructure",
        description: "Data centers, utilities, and transportation",
        badge: null
      },
      {
        icon: Users,
        label: "Managed Service Providers",
        description: "Multi-tenant management for MSPs",
        badge: null
      },
      {
        icon: ChartLine,
        label: "Financial Services",
        description: "Banks, trading floors, and secure facilities",
        badge: null
      }
    ]
  }
]

const featuredContent = {
  title: "Enterprise Deployment Guide",
  description: "Learn how to deploy Guardivex across your organization with on-premises or hybrid cloud architecture.",
  features: [
    "On-premises installation",
    "High availability clustering",
    "Multi-site synchronization",
    "Compliance reporting"
  ],
  cta: "View Architecture"
}

export function EnterpriseMegaMenu({ onNavigate, onClose }: EnterpriseMegaMenuProps) {
  const handleNavigate = (page: string) => {
    onNavigate(page)
    onClose()
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-0 bg-card/98 backdrop-blur-xl border-b border-border shadow-2xl">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-9 grid grid-cols-3 gap-8">
            {menuSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavigate("enterprise")}
                      className="group w-full text-left p-3 rounded-lg hover:bg-accent/50 transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                          <item.icon size={18} weight="duotone" className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-3 border-l border-border pl-8">
            <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/20 rounded-xl p-6 h-full">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Headset size={20} weight="duotone" className="text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1">
                    {featuredContent.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {featuredContent.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                {featuredContent.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check size={10} weight="bold" className="text-primary" />
                    </div>
                    <span className="text-foreground/90">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleNavigate("enterprise")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold text-sm group"
              >
                {featuredContent.cta}
                <ArrowRight size={16} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="mt-4 pt-4 border-t border-border/50">
                <button
                  onClick={() => handleNavigate("support")}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                >
                  <Headset size={14} />
                  Talk to Enterprise Sales
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

