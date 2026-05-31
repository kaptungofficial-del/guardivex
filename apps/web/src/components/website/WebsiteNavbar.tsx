import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { List, X, ChatCircle, CloudArrowDown, ArrowRight, CaretDown, LockKey, BellRinging, Gauge, CloudCheck, ChartLine, Pulse, Buildings, Users, ChartLineUp, Package, Certificate, Book, Code, FileText, GraduationCap, Question, Terminal, Headset, VideoConference, FileDoc, Ticket, ClockCounterClockwise, CreditCard, IdentificationBadge, Devices, Briefcase, Receipt, Database, ShieldCheck } from "@phosphor-icons/react"
import { useState, useRef, useEffect } from "react"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { BrandLogo } from "@/components/BrandLogo"
import {
  ENTERPRISE_COMMAND_STRIP_CLASS,
  ENTERPRISE_DROPDOWN_ICON_CLASS,
  ENTERPRISE_DROPDOWN_ITEM_CLASS,
  ENTERPRISE_HEADER_SURFACE_CLASS,
  ENTERPRISE_ICON_CONTROL_CLASS,
  ENTERPRISE_NAV_ITEM_ACTIVE_CLASS,
  ENTERPRISE_NAV_ITEM_CLASS,
  ENTERPRISE_NAV_ITEM_INACTIVE_CLASS,
  HeaderStatusBadge,
} from "@/components/layout/HeaderPrimitives"

interface WebsiteNavbarProps {
  currentPage: string
  onNavigate: (page: string) => void
  onLogin: () => void
  onOpenLiveChat: (prefill?: string) => void
}

export function WebsiteNavbar({ currentPage, onNavigate, onLogin, onOpenLiveChat }: WebsiteNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productDropdownOpen, setProductDropdownOpen] = useState(false)
  const [enterpriseDropdownOpen, setEnterpriseDropdownOpen] = useState(false)
  const [docsDropdownOpen, setDocsDropdownOpen] = useState(false)
  const [supportDropdownOpen, setSupportDropdownOpen] = useState(false)
  const [licensingDropdownOpen, setLicensingDropdownOpen] = useState(false)
  const desktopNavRef = useRef<HTMLDivElement | null>(null)
  
  const productFeatures = [
    {
      icon: Database,
      title: "Evidence Workspace",
      description: "Telemetry, IOCs, notes",
      color: "text-primary"
    },
    {
      icon: LockKey,
      title: "Governed AI",
      description: "Recommendation only",
      color: "text-primary"
    },
    {
      icon: ChartLine,
      title: "Threat Correlation",
      description: "Signals to findings",
      color: "text-warning"
    },
    {
      icon: ShieldCheck,
      title: "Review Workflows",
      description: "Policy approvals",
      color: "text-accent"
    },
    {
      icon: Gauge,
      title: "Research Queue",
      description: "Cases and triage",
      color: "text-success"
    },
    {
      icon: CloudCheck,
      title: "Controlled Deployment",
      description: "Self-hosted first",
      color: "text-primary"
    },
    {
      icon: BellRinging,
      title: "Evidence Alerts",
      description: "Review-ready context",
      color: "text-accent"
    },
    {
      icon: Pulse,
      title: "Audit Trail",
      description: "Defensible history",
      color: "text-destructive"
    }
  ]
  
  const enterpriseSolutions = [
    {
      icon: Buildings,
      title: "Tenant Isolation",
      description: "Scoped evidence",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Team Review",
      description: "Roles and approvals",
      color: "text-primary"
    },
    {
      icon: ShieldCheck,
      title: "Control Boundaries",
      description: "No unsafe AI actions",
      color: "text-accent"
    },
    {
      icon: ChartLineUp,
      title: "Research Analytics",
      description: "Findings and trends",
      color: "text-success"
    },
    {
      icon: Package,
      title: "Custom Integration",
      description: "API & SDK access",
      color: "text-warning"
    },
    {
      icon: Certificate,
      title: "Audit Evidence",
      description: "Review-ready trails",
      color: "text-primary"
    }
  ]
  
  const documentationSections = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Installation & setup",
      color: "text-primary"
    },
    {
      icon: Code,
      title: "API Reference",
      description: "Integration docs",
      color: "text-primary"
    },
    {
      icon: FileText,
      title: "User Guides",
      description: "Feature walkthroughs",
      color: "text-accent"
    },
    {
      icon: GraduationCap,
      title: "Training Resources",
      description: "Video tutorials",
      color: "text-success"
    },
    {
      icon: Question,
      title: "FAQs",
      description: "Common questions",
      color: "text-warning"
    },
    {
      icon: Terminal,
      title: "Command Line",
      description: "CLI documentation",
      color: "text-primary"
    }
  ]
  
  const supportOptions = [
    {
      icon: Headset,
      title: "Technical Support",
      description: "Email and chat assistance",
      color: "text-primary"
    },
    {
      icon: ChatCircle,
      title: "Live Chat",
      description: "Instant messaging support",
      color: "text-primary"
    },
    {
      icon: VideoConference,
      title: "Remote Assistance",
      description: "Screen sharing sessions",
      color: "text-accent"
    },
    {
      icon: Ticket,
      title: "Support Tickets",
      description: "Track your requests",
      color: "text-success"
    },
    {
      icon: FileDoc,
      title: "Knowledge Base",
      description: "Self-service articles",
      color: "text-warning"
    },
    {
      icon: ClockCounterClockwise,
      title: "Service Status",
      description: "System uptime & incidents",
      color: "text-primary"
    }
  ]
  
  const licensingOptions = [
    {
      icon: CreditCard,
      title: "Trial License",
      description: "Evaluation access",
      color: "text-primary"
    },
    {
      icon: IdentificationBadge,
      title: "Professional",
      description: "Single site deployment",
      color: "text-primary"
    },
    {
      icon: Buildings,
      title: "Enterprise",
      description: "Multi-site programs",
      color: "text-accent"
    },
    {
      icon: Briefcase,
      title: "MSP/Partner",
      description: "Managed service provider",
      color: "text-success"
    },
    {
      icon: Devices,
      title: "Device Licensing",
      description: "Per-device pricing tiers",
      color: "text-warning"
    },
    {
      icon: Receipt,
      title: "Volume Discounts",
      description: "Enterprise pricing",
      color: "text-primary"
    }
  ]
  
  const navItems = [
    { id: "product", label: "Product", highlight: false, hasDropdown: true },
    { id: "enterprise", label: "Enterprise", highlight: false, hasDropdown: true },
    { id: "support", label: "Solutions", highlight: false, hasDropdown: true },
    { id: "documentation", label: "Resources", highlight: false, hasDropdown: true },
    { id: "licensing", label: "Pricing", highlight: false, hasDropdown: true }
  ]
  const closeAllDesktopDropdowns = () => {
    setProductDropdownOpen(false)
    setEnterpriseDropdownOpen(false)
    setDocsDropdownOpen(false)
    setSupportDropdownOpen(false)
    setLicensingDropdownOpen(false)
  }

  const openDesktopDropdown = (dropdownId: string) => {
    closeAllDesktopDropdowns()

    if (dropdownId === "product") {
      setProductDropdownOpen(true)
    } else if (dropdownId === "enterprise") {
      setEnterpriseDropdownOpen(true)
    } else if (dropdownId === "documentation") {
      setDocsDropdownOpen(true)
    } else if (dropdownId === "support") {
      setSupportDropdownOpen(true)
    } else if (dropdownId === "licensing") {
      setLicensingDropdownOpen(true)
    }
  }

  const activeDesktopDropdownId = productDropdownOpen
    ? "product"
    : enterpriseDropdownOpen
      ? "enterprise"
      : licensingDropdownOpen
        ? "licensing"
        : docsDropdownOpen
          ? "documentation"
          : supportDropdownOpen
            ? "support"
            : null

  const activeDesktopDropdown =
    activeDesktopDropdownId === "product"
      ? {
          title: "Product Features",
          subtitle: "Comprehensive security infrastructure monitoring",
          data: productFeatures,
          navId: "product",
        }
      : activeDesktopDropdownId === "enterprise"
        ? {
            title: "Enterprise Solutions",
            subtitle: "Solutions for large-scale deployments",
            data: enterpriseSolutions,
            navId: "enterprise",
          }
          : activeDesktopDropdownId === "licensing"
          ? {
              title: "Pricing",
              subtitle: "Choose the right plan for your organization",
              data: licensingOptions,
              navId: "licensing",
            }
          : activeDesktopDropdownId === "documentation"
            ? {
                title: "Resources",
                subtitle: "Guides and resources to get you started",
                data: documentationSections,
                navId: "documentation",
              }
            : activeDesktopDropdownId === "support"
              ? {
                  title: "Solutions",
                  subtitle: "Operational support and service workflows",
                  data: supportOptions,
                  navId: "support",
                }
              : null

  const desktopDropdownClass =
    "w-[min(720px,calc(100vw-48px))] max-w-[calc(100vw-48px)] max-h-[70vh] overflow-y-auto overflow-x-hidden rounded-md border border-[var(--gvx-menu-border)] bg-[var(--gvx-menu-bg)] p-2.5 text-[var(--gvx-hero-text)] shadow-[0_24px_70px_-48px_rgba(7,17,31,0.42)] dark:shadow-[0_24px_70px_-48px_rgba(0,0,0,0.72)]"

  useEffect(() => {
    const handleDocumentMouseDown = (event: MouseEvent) => {
      if (!desktopNavRef.current) {
        return
      }

      if (!desktopNavRef.current.contains(event.target as Node)) {
        closeAllDesktopDropdowns()
      }
    }

    document.addEventListener("mousedown", handleDocumentMouseDown)

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown)
    }
  }, [])

  const socialLinks = [
    { icon: Database, label: "Research", url: "mailto:research@guardivex.com" },
    { icon: ShieldCheck, label: "Security", url: "mailto:security@guardivex.com" }
  ]

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onLogin()
  }

  const handleNavigate = (page: string) => {
    onNavigate(page)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <div className={ENTERPRISE_COMMAND_STRIP_CLASS}>
        <div className="max-w-[1440px] mx-auto px-3 min-[390px]:px-4 sm:px-8 xl:px-14 2xl:px-16">
          <div className="flex h-6 items-center justify-between sm:h-7">
            <div className="flex min-w-0 items-center gap-2.5 text-[10.5px] font-medium text-[var(--gvx-hero-muted)] sm:gap-3">
              <HeaderStatusBadge label="Research Lab" className="inline-flex" />
              <div className="hidden items-center gap-1.5 border-l border-[var(--gvx-hero-border)] pl-3 md:flex">
                <CloudCheck size={13} weight="duotone" className="text-[var(--gvx-hero-accent)]" />
                <span>Governed AI Recommendations</span>
              </div>
              <div className="hidden items-center gap-1.5 border-l border-[var(--gvx-hero-border)] pl-3 lg:flex">
                <Pulse size={13} weight="duotone" className="text-[var(--gvx-hero-accent-2)]" />
                <span>Human Approval Gates</span>
              </div>
              <div className="hidden items-center gap-1.5 border-l border-[var(--gvx-hero-border)] pl-3 xl:flex">
                <Gauge size={13} weight="duotone" className="text-[var(--gvx-hero-accent)]" />
                <span>Tenant-Scoped Evidence</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={() => onOpenLiveChat("I need help with a research deployment")}
                className="hidden h-6 items-center gap-1.5 rounded-md border border-transparent px-2 text-[11px] font-medium text-[var(--gvx-hero-muted)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--gvx-hero-card)] hover:text-[var(--gvx-hero-accent)] lg:flex group"
              >
                <ChatCircle size={12} weight="bold" className="group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">Live Chat</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gvx-hero-accent-2)]" />
              </button>
              <div className="ml-2 hidden items-center gap-1.5 border-l border-[var(--gvx-hero-border)] pl-2 sm:flex">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-6 w-6 items-center justify-center rounded-md border border-transparent text-[var(--gvx-hero-muted)] transition-all duration-200 hover:border-[var(--gvx-hero-border)] hover:bg-[var(--gvx-hero-card)] hover:text-[var(--gvx-hero-accent)] group"
                    aria-label={social.label}
                  >
                    <social.icon size={13} weight="fill" className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-50 px-0">
        <div className={`mx-auto px-3 min-[390px]:px-4 sm:px-8 xl:px-14 2xl:px-16 ${ENTERPRISE_HEADER_SURFACE_CLASS}`}>
          <div ref={desktopNavRef} onMouseLeave={closeAllDesktopDropdowns} className="relative flex h-[56px] min-w-0 items-center justify-between gap-2 overflow-visible sm:h-[64px] sm:gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3 lg:gap-5">
              <button 
                onClick={() => handleNavigate("home")} 
                aria-label="Go to home"
                title="Go to home"
                className="group flex min-w-0 flex-1 items-center gap-1 py-0 lg:flex-none"
              >
                <BrandLogo
                  subtitle="SECURITY PLATFORM"
                  className="min-w-0 gap-1.5 sm:gap-2"
                  markClassName="h-9 w-9 min-[390px]:h-10 min-[390px]:w-10 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
                  imgClassName="pr-0.5"
                  textContainerClassName="min-w-0 max-w-[86px] gap-0 min-[390px]:max-w-[108px] sm:max-w-none"
                  titleClassName="truncate text-[15px] min-[390px]:text-[17px] sm:text-[22px] lg:text-[24px] font-bold tracking-normal transition-opacity group-hover:opacity-85"
                  subtitleClassName="hidden sm:block text-[9px] lg:text-[9.5px] tracking-[0.1em] leading-none mt-0.5"
                />
              </button>
              
              <div className="hidden min-w-0 items-center gap-1 lg:flex">
                {navItems.map((item) => {
                  const isDropdownOpen = item.id === "product" ? productDropdownOpen : 
                                        item.id === "enterprise" ? enterpriseDropdownOpen :
                                        item.id === "documentation" ? docsDropdownOpen :
                                        item.id === "support" ? supportDropdownOpen :
                                        item.id === "licensing" ? licensingDropdownOpen : false

                  return (
                    <div key={item.id} className="static">
                      <button
                        onMouseEnter={() => {
                          if (item.hasDropdown) {
                            openDesktopDropdown(item.id)
                          }
                        }}
                        onClick={() => handleNavigate(item.id)}
                        className={`${ENTERPRISE_NAV_ITEM_CLASS} ${currentPage === item.id ? ENTERPRISE_NAV_ITEM_ACTIVE_CLASS : ENTERPRISE_NAV_ITEM_INACTIVE_CLASS}`}
                      >
                        <span className="relative z-10">{item.label}</span>
                        {item.hasDropdown && (
                          <CaretDown size={11} weight="bold" className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

              <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
              <ThemeSwitcher />
              <Button 
                onClick={() => handleNavigate("download")}
                variant="outline"
                size="default"
                className="hidden h-8 items-center gap-1 rounded-md border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] px-2.5 text-[0.76rem] font-semibold text-[var(--gvx-hero-text)] shadow-[0_10px_24px_-24px_rgba(7,17,31,0.28)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-hero-surface-strong)] xl:flex group"
              >
                <CloudArrowDown size={17} weight="bold" className="group-hover:scale-110 transition-transform sm:w-[18px] sm:h-[18px]" />
                <span>Deploy</span>
              </Button>
              <Button 
                onClick={handleLoginClick}
                size="default"
                aria-label="Sign in"
                title="Sign in"
                className="h-7 w-7 rounded-md border border-[var(--gvx-hero-border-strong)] bg-[var(--gvx-hero-surface-strong)] bg-none px-0 text-[0.75rem] font-semibold text-[var(--gvx-hero-text)] shadow-[0_12px_26px_-24px_rgba(7,17,31,0.30)] transition-all duration-200 hover:-translate-y-px hover:border-[color:var(--gvx-hero-accent)] hover:text-[var(--gvx-hero-accent)] min-[430px]:h-8 min-[430px]:w-auto min-[430px]:px-3.5 group"
              >
                <span className="hidden min-[430px]:inline">Sign In</span>
                <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5 min-[430px]:ml-1 sm:ml-1.5 sm:w-[17px] sm:h-[17px]" />
              </Button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden ${ENTERPRISE_ICON_CONTROL_CLASS} h-7 w-7 min-[430px]:h-8 min-[430px]:w-8`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} weight="bold" className="sm:w-[22px] sm:h-[22px]" /> : <List size={20} weight="bold" className="sm:w-[22px] sm:h-[22px]" />}
              </button>
            </div>

            {activeDesktopDropdown && (
              <div className="hidden lg:block absolute left-1/2 top-full z-[100] w-[min(720px,calc(100vw-48px))] -translate-x-1/2 pt-2">
                <div className={desktopDropdownClass}>
                  <div className="mb-2.5">
                    <h3 className="mb-1 text-sm font-semibold text-[var(--gvx-hero-text)]">{activeDesktopDropdown.title}</h3>
                    <p className="text-xs text-[var(--gvx-hero-muted)]">{activeDesktopDropdown.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2">
                    {activeDesktopDropdown.data.map((feature) => (
                      <button
                        key={feature.title}
                        onClick={() => {
                          if (activeDesktopDropdownId === "support" && feature.title === "Live Chat") {
                            onOpenLiveChat("I need help with support")
                            closeAllDesktopDropdowns()
                            return
                          }

                          handleNavigate(activeDesktopDropdownId || "home")
                          closeAllDesktopDropdowns()
                        }}
                        className={`${ENTERPRISE_DROPDOWN_ITEM_CLASS} gap-1.5 rounded-lg p-1.5 hover:bg-[var(--gvx-menu-hover)]`}
                      >
                        <div className={`${ENTERPRISE_DROPDOWN_ICON_CLASS} h-8 w-8 rounded-md`}>
                          <feature.icon size={16} weight="bold" className={feature.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-0.5 break-words text-[13px] font-medium text-[var(--gvx-hero-text)]">{feature.title}</div>
                          <div className="break-words text-[11px] leading-relaxed text-[var(--gvx-hero-muted)]">{feature.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2.5 border-t border-[var(--gvx-hero-border)] pt-2.5">
                    <button
                      onClick={() => {
                        handleNavigate(activeDesktopDropdownId || "home")
                        closeAllDesktopDropdowns()
                      }}
                      className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-[var(--gvx-menu-border)] bg-[var(--gvx-menu-hover)] px-3 text-[12px] font-medium text-[var(--gvx-hero-text)] shadow-[0_12px_28px_-26px_rgba(7,17,31,0.32)] transition-all duration-150 hover:border-[var(--gvx-hero-border-strong)] hover:text-[var(--gvx-hero-accent)]"
                    >
                      <span>View All {activeDesktopDropdown.title}</span>
                      <ArrowRight size={13} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[82px] z-40 overflow-y-auto overflow-x-hidden border-t border-[var(--gvx-menu-border)] bg-[var(--gvx-menu-bg)] lg:hidden sm:top-[92px]">
          <div className="h-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-6 md:py-8">
              <div className="flex flex-col gap-1.5 sm:gap-2">
                {navItems.map((item) => {
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => {
                          handleNavigate(item.id)
                        }}
                        className={`w-full px-4 sm:px-6 py-3.5 sm:py-4 text-left text-[1rem] sm:text-[1.06rem] tracking-[0.01em] font-medium rounded-lg transition-all flex items-center justify-between active:scale-98 ${
                          currentPage === item.id
                            ? "text-[var(--gvx-hero-text)] bg-[var(--gvx-menu-hover)] border border-[var(--gvx-menu-border)]"
                            : "text-[var(--gvx-hero-muted)] hover:text-[var(--gvx-hero-text)] hover:bg-[var(--gvx-menu-hover)] active:bg-[var(--gvx-menu-hover)]"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowRight size={13} weight="bold" className="sm:w-[14px] sm:h-[14px]" />
                      </button>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-5 sm:mt-8 pt-5 sm:pt-8 border-t border-border space-y-4 sm:space-y-6 dark:border-border/40">
                <Button 
                  onClick={() => handleNavigate("download")}
                  variant="outline"
                  className="w-full h-9 sm:h-10 justify-center gap-2 text-[1rem] sm:text-[1.025rem] font-semibold active:scale-98 transition-all rounded-md"
                >
                  <CloudArrowDown size={18} weight="bold" className="sm:w-5 sm:h-5" />
                  <span>Deploy Research Server</span>
                </Button>
                
                <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg border border-[var(--gvx-hero-border)] text-[var(--gvx-hero-muted)] transition-all duration-200 hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-hero-accent-soft)] hover:text-[var(--gvx-hero-accent)] active:scale-95 active:bg-[var(--gvx-hero-accent-soft)]"
                      aria-label={social.label}
                    >
                      <social.icon size={17} weight="bold" className="sm:w-5 sm:h-5" />
                    </a>
                  ))}
                </div>
                
                <div className="text-center space-y-2.5 sm:space-y-3 pt-3 sm:pt-4">
                  <div className="text-xs sm:text-sm font-semibold text-foreground">Need assistance?</div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground space-y-1.5">
                    <div className="font-semibold">research@guardivex.com</div>
                    <div>security@guardivex.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
