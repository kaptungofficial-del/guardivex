import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { List, X, Phone, ChatCircle, CloudArrowDown, Circle, LinkedinLogo, TwitterLogo, GithubLogo, YoutubeLogo, EnvelopeSimple, ArrowRight, CaretDown, VideoCamera, LockKey, BellRinging, WifiHigh, Gauge, CloudCheck, ChartLine, Pulse, Buildings, Users, Globe, ChartLineUp, Package, Certificate, Book, Code, FileText, GraduationCap, Question, Terminal, Headset, VideoConference, FileDoc, Ticket, ClockCounterClockwise, CreditCard, IdentificationBadge, Devices, Briefcase, Receipt } from "@phosphor-icons/react"
import { useState, useRef, useEffect } from "react"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { BrandLogo } from "@/components/BrandLogo"
import {
  ENTERPRISE_COMMAND_STRIP_CLASS,
  ENTERPRISE_DROPDOWN_ACTION_CLASS,
  ENTERPRISE_DROPDOWN_ICON_CLASS,
  ENTERPRISE_DROPDOWN_ITEM_CLASS,
  ENTERPRISE_CONTROL_CLASS,
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
  const dropdownTimeoutRef = useRef<number | null>(null)
  const enterpriseTimeoutRef = useRef<number | null>(null)
  const docsTimeoutRef = useRef<number | null>(null)
  const supportTimeoutRef = useRef<number | null>(null)
  const licensingTimeoutRef = useRef<number | null>(null)
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
    { id: "licensing", label: "Licensing", highlight: false, hasDropdown: true },
    { id: "documentation", label: "Documentation", highlight: false, hasDropdown: true },
    { id: "support", label: "Support", highlight: false, hasDropdown: true }
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
              title: "Licensing Plans",
              subtitle: "Choose the right plan for your organization",
              data: licensingOptions,
              navId: "licensing",
            }
          : activeDesktopDropdownId === "documentation"
            ? {
                title: "Documentation",
                subtitle: "Guides and resources to get you started",
                data: documentationSections,
                navId: "documentation",
              }
            : activeDesktopDropdownId === "support"
              ? {
                  title: "Support Options",
                  subtitle: "Get help when you need it",
                  data: supportOptions,
                  navId: "support",
                }
              : null

  const desktopDropdownClass =
    "w-[min(720px,calc(100vw-48px))] max-w-[calc(100vw-48px)] max-h-[70vh] overflow-y-auto overflow-x-hidden rounded-xl border border-border bg-white p-2.5 text-[#07111F] shadow-sm dark:border-[rgba(0,119,255,0.26)] dark:bg-[#07111F] dark:text-white dark:shadow-black/35"

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

  return (
    <>
      <div className={ENTERPRISE_COMMAND_STRIP_CLASS}>
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-5">
          <div className="flex items-center justify-between h-7 sm:h-8">
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 min-w-0">
              <HeaderStatusBadge label="Operational" className="hidden min-[380px]:inline-flex" />
              <Badge variant="outline" className="hidden lg:inline-flex h-5.5 text-[9px] uppercase tracking-[0.12em] border-border text-[#07111F] bg-white/90 dark:border-[rgba(0,119,255,0.26)] dark:text-[#F8FAFC] dark:bg-[rgba(11,22,40,0.74)]">
                Enterprise Edition
              </Badge>
              <div className="hidden md:flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-border/60" />
                <a 
                  href="mailto:sales@guardivex.com"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-[10px] font-semibold group"
                >
                  <EnvelopeSimple size={13} weight="bold" className="group-hover:scale-110 transition-transform" />
                  <span className="hidden lg:inline">sales@guardivex.com</span>
                </a>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
              <a
                href="tel:1-800-SENTINEL"
                className="hidden xl:flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-[10px] font-semibold group dark:hover:text-[#F8FAFC]"
              >
                <Phone size={13} weight="bold" className="group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">1-800-SENTINEL</span>
                <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 ml-1 border-accent/50 text-accent font-bold tracking-wider bg-accent/10">24/7</Badge>
              </a>
              <button
                onClick={() => onOpenLiveChat("I need help with my deployment")}
                className={`${ENTERPRISE_CONTROL_CLASS} hidden lg:flex h-8 text-[10px] font-semibold hover:text-foreground hover:border-primary/40 hover:bg-background/95 dark:hover:text-[#F8FAFC] dark:hover:bg-[rgba(0,199,232,0.10)] group`}
              >
                <ChatCircle size={13} weight="bold" className="group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">Live Chat</span>
              </button>
              <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-2.5 ml-2 sm:ml-2.5 border-l border-border/30">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-6 h-6 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-[rgba(0,199,232,0.10)] border border-transparent hover:border-primary/20 transition-all duration-200 group"
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

      <nav className="sticky top-0.5 z-50 px-4 sm:px-4 lg:px-4">
        <div className={`max-w-7xl mx-auto px-4 sm:px-4 lg:px-5 rounded-lg backdrop-blur-md ${ENTERPRISE_HEADER_SURFACE_CLASS}`}>
          <div ref={desktopNavRef} onMouseLeave={closeAllDesktopDropdowns} className="relative flex items-center justify-between h-12 sm:h-14 gap-1.5 sm:gap-2 min-w-0 overflow-visible">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0">
              <button 
                onClick={() => handleNavigate("home")} 
                aria-label="Go to home"
                title="Go to home"
                className="flex items-center gap-1.5 group py-0 min-w-0 shrink-0"
              >
                <BrandLogo
                  subtitle="SECURITY PLATFORM"
                  className="gap-0.5"
                  markClassName="h-7 w-7 sm:h-8 sm:w-8 lg:h-8 lg:w-8"
                  imgClassName="pr-0.5"
                  textContainerClassName="gap-0"
                  titleClassName="text-[12px] sm:text-[14px] lg:text-[15px] text-[#07111F] group-hover:text-primary transition-colors font-extrabold tracking-[-0.03em] dark:text-[#F8FAFC]"
                  subtitleClassName="hidden sm:block text-[7.5px] lg:text-[8px] text-[#5B677A] tracking-[0.18em] leading-none mt-0.5 dark:text-[#94A3B8]"
                />
              </button>
              
              <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 min-w-0">
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

            <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0">
              <ThemeSwitcher />
              <Button 
                onClick={() => handleNavigate("download")}
                variant="outline"
                size="default"
                className="hidden xl:flex items-center gap-2 h-10 px-3.5 font-semibold text-sm group transition-all duration-150 rounded-md"
              >
                <CloudArrowDown size={17} weight="bold" className="group-hover:scale-110 transition-transform sm:w-[18px] sm:h-[18px]" />
                <span>Download Trial</span>
              </Button>
              <Button 
                onClick={handleLoginClick}
                size="default"
                variant="secondary"
                className="h-9 px-3 sm:px-4 font-semibold text-[11px] sm:text-sm transition-all duration-150 group rounded-md"
              >
                <span>Sign In</span>
                <ArrowRight size={15} weight="bold" className="ml-1 sm:ml-1.5 group-hover:translate-x-1 transition-transform sm:w-[17px] sm:h-[17px]" />
              </Button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden ${ENTERPRISE_ICON_CONTROL_CLASS} h-9 w-9`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} weight="bold" className="sm:w-[22px] sm:h-[22px]" /> : <List size={20} weight="bold" className="sm:w-[22px] sm:h-[22px]" />}
              </button>
            </div>

            {activeDesktopDropdown && (
              <div className="hidden lg:block absolute left-1/2 top-full z-[100] w-[min(720px,calc(100vw-48px))] -translate-x-1/2 pt-2">
                <div className={desktopDropdownClass}>
                  <div className="mb-2.5">
                    <h3 className="mb-1 text-sm font-bold text-[#07111F] dark:text-white">{activeDesktopDropdown.title}</h3>
                    <p className="text-xs text-[#5B677A] dark:text-[#C7D6E8]">{activeDesktopDropdown.subtitle}</p>
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
                          <div className="mb-0.5 break-words text-[13px] font-semibold text-[#07111F] dark:text-white">{feature.title}</div>
                          <div className="break-words text-[11px] leading-relaxed text-[#64748B] dark:text-[#C7D6E8]">{feature.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2.5 border-t border-border pt-2.5 dark:border-[rgba(0,119,255,0.26)]">
                    <button
                      onClick={() => {
                        handleNavigate(activeDesktopDropdownId || "home")
                        closeAllDesktopDropdowns()
                      }}
                      className="flex h-7 w-full items-center justify-center gap-2 rounded-lg border border-border bg-white px-3 text-[12px] font-medium text-[#07111F] shadow-sm transition-all duration-150 hover:border-primary/30 hover:bg-secondary dark:border-[rgba(0,119,255,0.26)] dark:bg-[#07111F] dark:text-[#F8FAFC] dark:hover:bg-[rgba(0,199,232,0.12)]"
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
        <div className="lg:hidden fixed inset-0 top-[calc(1.75rem+3rem)] z-40 bg-[rgba(255,255,255,0.96)] backdrop-blur-2xl overflow-y-auto border-t border-border dark:bg-[rgba(7,17,31,0.96)] dark:border-[rgba(0,119,255,0.26)]">
          <div className="h-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-6 md:py-8">
              <div className="flex flex-col gap-1.5 sm:gap-2">
                {navItems.map((item) => {
                  const isDropdownOpen = item.id === "product" ? productDropdownOpen : 
                                        item.id === "enterprise" ? enterpriseDropdownOpen :
                                        item.id === "documentation" ? docsDropdownOpen :
                                        item.id === "support" ? supportDropdownOpen :
                                        item.id === "licensing" ? licensingDropdownOpen : false
                  
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => {
                          handleNavigate(item.id)
                        }}
                        className={`w-full px-4 sm:px-6 py-3 text-left text-sm sm:text-base tracking-[0.01em] font-medium rounded-lg transition-all flex items-center justify-between active:scale-98 ${
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
                  className="w-full h-10 sm:h-12 justify-center gap-2 text-sm sm:text-base font-semibold active:scale-98 transition-all rounded-md"
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
