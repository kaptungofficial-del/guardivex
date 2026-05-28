import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { List, X, ChatCircle, CloudArrowDown, LinkedinLogo, TwitterLogo, GithubLogo, YoutubeLogo, ArrowRight, CaretDown, VideoCamera, LockKey, BellRinging, WifiHigh, Gauge, CloudCheck, ChartLine, Pulse, Buildings, Users, Globe, ChartLineUp, Package, Certificate, Book, Code, FileText, GraduationCap, Question, Terminal, Headset, VideoConference, FileDoc, Ticket, ClockCounterClockwise, CreditCard, IdentificationBadge, Devices, Briefcase, Receipt } from "@phosphor-icons/react"
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
      icon: VideoCamera,
      title: "Video Surveillance",
      description: "Cameras & NVRs",
      color: "text-primary"
    },
    {
      icon: LockKey,
      title: "Access Control",
      description: "Doors & Readers",
      color: "text-primary"
    },
    {
      icon: BellRinging,
      title: "Intrusion Detection",
      description: "Alarms & Sensors",
      color: "text-warning"
    },
    {
      icon: WifiHigh,
      title: "Network Monitoring",
      description: "Switches & Routers",
      color: "text-accent"
    },
    {
      icon: Gauge,
      title: "System Health",
      description: "Server & Performance",
      color: "text-success"
    },
    {
      icon: CloudCheck,
      title: "Cloud Services",
      description: "Remote Access & Sync",
      color: "text-primary"
    },
    {
      icon: ChartLine,
      title: "Analytics & Reports",
      description: "Insights & Trends",
      color: "text-accent"
    },
    {
      icon: Pulse,
      title: "Event Engine",
      description: "Real-time Alerts",
      color: "text-destructive"
    }
  ]
  
  const enterpriseSolutions = [
    {
      icon: Buildings,
      title: "Multi-Site Deployment",
      description: "Centralized management",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Role-based access",
      color: "text-primary"
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description: "Worldwide operations",
      color: "text-accent"
    },
    {
      icon: ChartLineUp,
      title: "Enterprise Analytics",
      description: "Advanced reporting",
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
      title: "Compliance & Security",
      description: "SOC 2, ISO certified",
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
      title: "24/7 Technical Support",
      description: "Phone & email assistance",
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
      description: "30-day full access trial",
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
      description: "Multi-site unlimited",
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
    "w-[min(720px,calc(100vw-48px))] max-w-[calc(100vw-48px)] max-h-[70vh] overflow-y-auto overflow-x-hidden rounded-md border border-border/65 bg-white/90 p-2.5 text-[#07111F] shadow-none backdrop-blur-xl dark:border-[rgba(0,194,255,0.08)] dark:bg-[rgba(3,10,24,0.90)] dark:text-[#E2E8F0] dark:shadow-none"

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
    { icon: LinkedinLogo, label: "LinkedIn", url: "#" },
    { icon: TwitterLogo, label: "Twitter", url: "#" },
    { icon: GithubLogo, label: "GitHub", url: "#" },
    { icon: YoutubeLogo, label: "YouTube", url: "#" }
  ]

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onLogin()
  }

  const handleNavigate = (page: string) => {
    onNavigate(page)
    setMobileMenuOpen(false)
  }

  const handleSalesEmailClick = () => {
    window.location.href = "mailto:sales@guardivex.com"
  }

  return (
    <>
      <div className={ENTERPRISE_COMMAND_STRIP_CLASS}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 xl:px-14 2xl:px-16">
          <div className="flex h-6 items-center justify-between sm:h-7">
            <div className="flex min-w-0 items-center gap-2.5 text-[10.5px] font-medium text-[var(--gvx-hero-muted)] sm:gap-3">
              <HeaderStatusBadge label="Live SOC Grid" className="hidden min-[380px]:inline-flex border-emerald-500/20 bg-emerald-500/8 text-emerald-600 dark:text-emerald-300" />
              <div className="hidden items-center gap-1.5 border-l border-[var(--gvx-hero-border)] pl-3 md:flex">
                <CloudCheck size={13} weight="duotone" className="text-[var(--gvx-hero-accent)]" />
                <span>12,582 Endpoints Protected</span>
              </div>
              <div className="hidden items-center gap-1.5 border-l border-[var(--gvx-hero-border)] pl-3 lg:flex">
                <Pulse size={13} weight="duotone" className="text-emerald-500 dark:text-emerald-300" />
                <span>99.99% Uptime</span>
              </div>
              <div className="hidden items-center gap-1.5 border-l border-[var(--gvx-hero-border)] pl-3 xl:flex">
                <Gauge size={13} weight="duotone" className="text-[var(--gvx-hero-accent)]" />
                <span>&lt; 2.3s Response Time</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={() => onOpenLiveChat("I need help with my deployment")}
                className="hidden h-6 items-center gap-1.5 rounded-md border border-transparent px-2 text-[11px] font-medium text-[var(--gvx-hero-muted)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--gvx-hero-card)] hover:text-[var(--gvx-hero-accent)] lg:flex group"
              >
                <ChatCircle size={12} weight="bold" className="group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">Live Chat</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
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
        <div className={`mx-auto px-5 sm:px-8 xl:px-14 2xl:px-16 ${ENTERPRISE_HEADER_SURFACE_CLASS}`}>
          <div ref={desktopNavRef} onMouseLeave={closeAllDesktopDropdowns} className="relative flex h-[64px] min-w-0 items-center justify-between gap-4 overflow-visible">
            <div className="flex min-w-0 items-center gap-5">
              <button 
                onClick={() => handleNavigate("home")} 
                aria-label="Go to home"
                title="Go to home"
                className="flex items-center gap-1 group py-0 min-w-0 shrink-0"
              >
                <BrandLogo
                  subtitle="SECURITY PLATFORM"
                  className="gap-2"
                  markClassName="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
                  imgClassName="pr-0.5"
                  textContainerClassName="gap-0"
                  titleClassName="bg-[linear-gradient(135deg,#008ff0_0%,#00d7e6_58%,#82a83d_100%)] bg-clip-text text-[20px] sm:text-[22px] lg:text-[24px] font-bold tracking-normal text-transparent transition-opacity group-hover:opacity-85"
                  subtitleClassName="hidden sm:block text-[9px] lg:text-[9.5px] text-[#4f6d74] tracking-[0.1em] leading-none mt-0.5 dark:text-[#9ac7d2]"
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

              <div className="flex shrink-0 items-center gap-1.5">
              <ThemeSwitcher />
              <Button 
                onClick={() => handleNavigate("download")}
                variant="outline"
                size="default"
                className="hidden h-8 items-center gap-1 rounded-md border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] px-2.5 text-[0.76rem] font-semibold text-[var(--gvx-hero-text)] shadow-[0_10px_24px_-24px_rgba(7,17,31,0.28)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-hero-surface-strong)] xl:flex group"
              >
                <CloudArrowDown size={17} weight="bold" className="group-hover:scale-110 transition-transform sm:w-[18px] sm:h-[18px]" />
                <span>Download Trial</span>
              </Button>
              <Button 
                onClick={handleLoginClick}
                size="default"
                className="h-8 rounded-md border border-[var(--gvx-hero-border-strong)] bg-[var(--gvx-hero-surface-strong)] bg-none px-3.5 text-[0.8rem] font-semibold text-[var(--gvx-hero-text)] shadow-[0_12px_26px_-24px_rgba(7,17,31,0.30)] transition-all duration-200 hover:-translate-y-px hover:border-[color:var(--gvx-hero-accent)] hover:text-[var(--gvx-hero-accent)] group"
              >
                <span>Sign In</span>
                <ArrowRight size={15} weight="bold" className="ml-1 sm:ml-1.5 group-hover:translate-x-1 transition-transform sm:w-[17px] sm:h-[17px]" />
              </Button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden ${ENTERPRISE_ICON_CONTROL_CLASS} h-8 w-8`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} weight="bold" className="sm:w-[22px] sm:h-[22px]" /> : <List size={20} weight="bold" className="sm:w-[22px] sm:h-[22px]" />}
              </button>
            </div>

            {activeDesktopDropdown && (
              <div className="hidden lg:block absolute left-1/2 top-full z-[100] w-[min(720px,calc(100vw-48px))] -translate-x-1/2 pt-2">
                <div className={desktopDropdownClass}>
                  <div className="mb-2.5">
                    <h3 className="mb-1 text-sm font-semibold text-[#07111F] dark:text-white">{activeDesktopDropdown.title}</h3>
                    <p className="text-xs text-[#64748B] dark:text-[#C7D6E8]">{activeDesktopDropdown.subtitle}</p>
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
                        className={`${ENTERPRISE_DROPDOWN_ITEM_CLASS} gap-1.5 rounded-lg p-1.5 hover:bg-secondary dark:hover:bg-[rgba(0,199,232,0.12)]`}
                      >
                        <div className={`${ENTERPRISE_DROPDOWN_ICON_CLASS} h-8 w-8 rounded-md`}>
                          <feature.icon size={16} weight="bold" className={feature.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-0.5 break-words text-[13px] font-medium text-[#07111F] dark:text-white">{feature.title}</div>
                          <div className="break-words text-[11px] leading-relaxed text-[#64748B] dark:text-[#C7D6E8]">{feature.description}</div>
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
                      className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] px-3 text-[12px] font-medium text-[var(--gvx-hero-text)] shadow-[0_12px_28px_-26px_rgba(7,17,31,0.32)] backdrop-blur-xl transition-all duration-150 hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-hero-surface-strong)]"
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
        <div className="lg:hidden fixed inset-0 top-[calc(1.5rem+3.25rem)] z-40 bg-[rgba(255,255,255,0.92)] backdrop-blur-2xl overflow-y-auto border-t border-[#D9E7F2] dark:bg-[rgba(7,17,31,0.96)] dark:border-[rgba(0,119,255,0.26)]">
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
                            ? "text-[#07111F] bg-cyan-50 border border-cyan-500/20 dark:text-[#F8FAFC] dark:bg-[rgba(0,199,232,0.10)]"
                            : "text-[#5B677A] hover:text-[#07111F] hover:bg-[#F6F9FC] active:bg-cyan-50 dark:text-muted-foreground dark:hover:text-[#F8FAFC] dark:hover:bg-[rgba(0,199,232,0.08)] dark:active:bg-[rgba(0,199,232,0.12)]"
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
                  <span>Download Trial</span>
                </Button>
                
                <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-[rgba(0,199,232,0.08)] active:bg-[rgba(0,199,232,0.12)] border border-[rgba(0,199,232,0.16)] hover:border-primary/30 transition-all duration-200 active:scale-95"
                      aria-label={social.label}
                    >
                      <social.icon size={17} weight="bold" className="sm:w-5 sm:h-5" />
                    </a>
                  ))}
                </div>
                
                <div className="text-center space-y-2.5 sm:space-y-3 pt-3 sm:pt-4">
                  <div className="text-xs sm:text-sm font-semibold text-foreground">Need assistance?</div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground space-y-1.5">
                    <div className="font-semibold">Call 1-800-SENTINEL (24/7)</div>
                    <div>sales@guardivex.com</div>
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
