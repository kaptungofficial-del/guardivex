import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { List, X, Phone, ChatCircle, CloudArrowDown, Circle, LinkedinLogo, TwitterLogo, GithubLogo, YoutubeLogo, EnvelopeSimple, ArrowRight, CaretDown, VideoCamera, LockKey, BellRinging, WifiHigh, Gauge, CloudCheck, ChartLine, Pulse, Buildings, Users, Globe, ChartLineUp, Package, Certificate, Book, Code, FileText, GraduationCap, Question, Terminal, Headset, VideoConference, FileDoc, Ticket, ClockCounterClockwise, CreditCard, IdentificationBadge, Devices, Briefcase, Receipt } from "@phosphor-icons/react"
import { useState, useRef, useEffect } from "react"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { BrandLogo } from "@/components/BrandLogo"
import {
  ENTERPRISE_COMMAND_STRIP_CLASS,
  ENTERPRISE_CONTROL_CLASS,
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
  
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setProductDropdownOpen(true)
  }
  
  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductDropdownOpen(false)
    }, 220)
  }
  
  const handleEnterpriseMouseEnter = () => {
    if (enterpriseTimeoutRef.current) {
      clearTimeout(enterpriseTimeoutRef.current)
    }
    setEnterpriseDropdownOpen(true)
  }
  
  const handleEnterpriseMouseLeave = () => {
    enterpriseTimeoutRef.current = setTimeout(() => {
      setEnterpriseDropdownOpen(false)
    }, 220)
  }
  
  const handleDocsMouseEnter = () => {
    if (docsTimeoutRef.current) {
      clearTimeout(docsTimeoutRef.current)
    }
    setDocsDropdownOpen(true)
  }
  
  const handleDocsMouseLeave = () => {
    docsTimeoutRef.current = setTimeout(() => {
      setDocsDropdownOpen(false)
    }, 220)
  }
  
  const handleSupportMouseEnter = () => {
    if (supportTimeoutRef.current) {
      clearTimeout(supportTimeoutRef.current)
    }
    setSupportDropdownOpen(true)
  }
  
  const handleSupportMouseLeave = () => {
    supportTimeoutRef.current = setTimeout(() => {
      setSupportDropdownOpen(false)
    }, 220)
  }
  
  const handleLicensingMouseEnter = () => {
    if (licensingTimeoutRef.current) {
      clearTimeout(licensingTimeoutRef.current)
    }
    setLicensingDropdownOpen(true)
  }
  
  const handleLicensingMouseLeave = () => {
    licensingTimeoutRef.current = setTimeout(() => {
      setLicensingDropdownOpen(false)
    }, 220)
  }
  
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
      if (enterpriseTimeoutRef.current) {
        clearTimeout(enterpriseTimeoutRef.current)
      }
      if (docsTimeoutRef.current) {
        clearTimeout(docsTimeoutRef.current)
      }
      if (supportTimeoutRef.current) {
        clearTimeout(supportTimeoutRef.current)
      }
      if (licensingTimeoutRef.current) {
        clearTimeout(licensingTimeoutRef.current)
      }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8 sm:h-9 md:h-10">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-md border border-success/25 bg-success/8">
                <div className="relative flex items-center">
                  <Circle size={6} weight="fill" className="text-success drop-shadow-[0_0_4px_rgba(120,200,120,0.6)] sm:w-[7px] sm:h-[7px]" />
                  <div className="absolute inset-0">
                    <Circle size={6} weight="fill" className="text-success animate-ping opacity-60 sm:w-[7px] sm:h-[7px]" />
                  </div>
                </div>
                <span className="text-success hidden min-[380px]:inline tracking-wide">All Systems Operational</span>
                <span className="text-success min-[380px]:hidden tracking-wide">Live</span>
              </div>
              <Badge variant="outline" className="hidden lg:inline-flex h-6 text-[10px] uppercase tracking-[0.1em] border-[#D8E3EE] text-[#07111F] bg-[rgba(255,255,255,0.80)] dark:border-cyan-500/20 dark:text-[#F8FAFC] dark:bg-[rgba(11,22,40,0.74)]">
                Enterprise Edition
              </Badge>
              <div className="hidden md:flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-border/60" />
                <a 
                  href="mailto:sales@guardivex.com"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-[11px] font-semibold group"
                >
                  <EnvelopeSimple size={14} weight="bold" className="group-hover:scale-110 transition-transform" />
                  <span className="hidden lg:inline">sales@guardivex.com</span>
                </a>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-4">
              <a
                href="tel:1-800-SENTINEL"
                className="hidden xl:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[11px] font-bold group dark:hover:text-[#F8FAFC]"
              >
                <Phone size={14} weight="bold" className="group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">1-800-SENTINEL</span>
                <Badge variant="outline" className="text-[9px] px-2 py-0.5 h-4 ml-1 border-accent/50 text-accent font-bold tracking-wider bg-accent/10">24/7</Badge>
              </a>
              <button
                onClick={() => onOpenLiveChat("I need help with my deployment")}
                className={`${ENTERPRISE_CONTROL_CLASS} hidden lg:flex text-[11px] font-bold hover:text-foreground hover:border-primary/40 hover:bg-background/95 dark:hover:text-[#F8FAFC] dark:hover:bg-[rgba(0,199,232,0.10)] group`}
              >
                <ChatCircle size={14} weight="bold" className="group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">Live Chat</span>
              </button>
              <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-2.5 ml-2 sm:ml-2.5 border-l border-border/30">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-[rgba(0,199,232,0.10)] border border-transparent hover:border-primary/20 transition-all duration-200 group"
                    aria-label={social.label}
                  >
                    <social.icon size={13} weight="fill" className="group-hover:scale-110 transition-transform sm:w-[14px] sm:h-[14px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="sticky top-1 z-50 px-2 sm:px-3 lg:px-4">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 rounded-lg border border-[#D8E3EE] bg-[rgba(255,255,255,0.85)] text-[#07111F] backdrop-blur-md shadow-[0_14px_26px_-22px_rgba(15,23,42,0.22)] dark:border-cyan-500/20 dark:bg-[rgba(7,17,31,0.90)] dark:text-[#F8FAFC] dark:shadow-[0_14px_26px_-22px_rgba(2,6,18,0.76)]">
          <div className="flex items-center justify-between h-[2.8rem] sm:h-[3rem] lg:h-[3.1rem] gap-2.5 sm:gap-3">
            <div className="flex items-center gap-2 lg:gap-6 min-w-0">
              <button 
                onClick={() => handleNavigate("home")} 
                aria-label="Go to home"
                title="Go to home"
                className="flex items-center gap-1.5 group py-1 min-w-0"
              >
                <BrandLogo
                  subtitle="SECURITY PLATFORM"
                  className="gap-0.5"
                  markClassName="h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                  imgClassName="pr-0.5"
                  textContainerClassName="gap-0"
                  titleClassName="text-[17px] sm:text-[20px] lg:text-[21px] text-[#07111F] group-hover:text-primary transition-colors font-extrabold tracking-[-0.025em] dark:text-[#F8FAFC]"
                  subtitleClassName="hidden sm:block text-[8.5px] lg:text-[9px] text-[#5B677A] tracking-[0.14em] leading-none mt-0.5 dark:text-[#94A3B8]"
                />
              </button>
              
              <div className="hidden lg:flex items-center gap-2 xl:gap-2.5">
                {navItems.map((item) => {
                  const isDropdownOpen = item.id === "product" ? productDropdownOpen : 
                                        item.id === "enterprise" ? enterpriseDropdownOpen :
                                        item.id === "documentation" ? docsDropdownOpen :
                                        item.id === "support" ? supportDropdownOpen :
                                        item.id === "licensing" ? licensingDropdownOpen : false
                  const dropdownData = item.id === "product" ? productFeatures :
                                      item.id === "enterprise" ? enterpriseSolutions :
                                      item.id === "documentation" ? documentationSections :
                                      item.id === "support" ? supportOptions :
                                      item.id === "licensing" ? licensingOptions : []
                  const dropdownTitle = item.id === "product" ? "Product Features" :
                                       item.id === "enterprise" ? "Enterprise Solutions" :
                                       item.id === "documentation" ? "Documentation" :
                                       item.id === "support" ? "Support Options" :
                                       item.id === "licensing" ? "Licensing Plans" : ""
                  const dropdownSubtitle = item.id === "product" ? "Comprehensive security infrastructure monitoring" :
                                          item.id === "enterprise" ? "Solutions for large-scale deployments" :
                                          item.id === "documentation" ? "Guides and resources to get you started" :
                                          item.id === "support" ? "Get help when you need it" :
                                          item.id === "licensing" ? "Choose the right plan for your organization" : ""
                  const handleEnter = item.id === "product" ? handleMouseEnter :
                                     item.id === "enterprise" ? handleEnterpriseMouseEnter :
                                     item.id === "documentation" ? handleDocsMouseEnter :
                                     item.id === "support" ? handleSupportMouseEnter :
                                     item.id === "licensing" ? handleLicensingMouseEnter : undefined
                  const handleLeave = item.id === "product" ? handleMouseLeave :
                                     item.id === "enterprise" ? handleEnterpriseMouseLeave :
                                     item.id === "documentation" ? handleDocsMouseLeave :
                                     item.id === "support" ? handleSupportMouseLeave :
                                     item.id === "licensing" ? handleLicensingMouseLeave : undefined
                  const isRightAlignedDropdown = item.id === "support" || item.id === "documentation" || item.id === "licensing"
                  const dropdownPositionClass = isRightAlignedDropdown
                    ? "right-0 left-auto origin-top-right"
                    : "left-1/2 -translate-x-1/2 origin-top"
                  
                  return (
                    <div key={item.id} className="relative">
                      {item.hasDropdown ? (
                        <div
                          onMouseEnter={handleEnter}
                          onMouseLeave={handleLeave}
                        >
                          <button
                            onClick={() => handleNavigate(item.id)}
                            className={`relative px-3 xl:px-3.5 py-1.5 text-[12px] xl:text-[13px] tracking-[0.01em] font-medium rounded-sm transition-all duration-150 flex items-center gap-1.5 border whitespace-nowrap ${
                              currentPage === item.id
                                ? "text-[#07111F] border-primary/30 bg-cyan-50 dark:text-[#F8FAFC] dark:bg-[rgba(0,199,232,0.10)]"
                                : "text-[#5B677A] border-transparent hover:text-[#07111F] hover:border-[#D8E3EE] hover:bg-[#F6F9FC] dark:text-muted-foreground dark:hover:text-[#F8FAFC] dark:hover:border-[rgba(0,199,232,0.18)] dark:hover:bg-[rgba(0,199,232,0.08)]"
                            }`}
                          >
                            <span className="relative z-10">{item.label}</span>
                            <CaretDown size={12} weight="bold" className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {isDropdownOpen && (
                            <div className={`absolute top-full ${dropdownPositionClass} z-50 pt-2`}>
                              <div className="w-[min(680px,calc(100vw-2rem))] max-w-[680px] glass-panel bg-[rgba(255,255,255,0.92)] border-[#D8E3EE] rounded-lg shadow-[0_16px_28px_-24px_rgba(2,6,18,0.72)] p-4 overflow-hidden dark:bg-[linear-gradient(180deg,rgba(11,22,40,0.96),rgba(7,17,31,0.92))] dark:border-cyan-500/20">
                                <div className="mb-3">
                                  <h3 className="text-sm font-bold text-[#07111F] mb-1 dark:text-foreground">{dropdownTitle}</h3>
                                  <p className="text-xs text-[#5B677A] dark:text-muted-foreground">{dropdownSubtitle}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                  {dropdownData.map((feature) => (
                                    <button
                                      key={feature.title}
                                      onClick={() => {
                                        if (item.id === "support" && feature.title === "Live Chat") {
                                          onOpenLiveChat("I need help with support")
                                          setSupportDropdownOpen(false)
                                          return
                                        }
                                        handleNavigate(item.id)
                                        if (item.id === "product") setProductDropdownOpen(false)
                                        if (item.id === "enterprise") setEnterpriseDropdownOpen(false)
                                        if (item.id === "documentation") setDocsDropdownOpen(false)
                                        if (item.id === "support") setSupportDropdownOpen(false)
                                        if (item.id === "licensing") setLicensingDropdownOpen(false)
                                      }}
                                      className="flex items-start gap-3 p-2.5 rounded-md hover:bg-cyan-50 transition-all duration-150 text-left group dark:hover:bg-[rgba(0,199,232,0.08)]"
                                    >
                                      <div className="w-10 h-10 rounded-md bg-[linear-gradient(135deg,rgba(0,199,232,0.10),rgba(0,143,199,0.05))] border border-[#D8E3EE] flex items-center justify-center flex-shrink-0 dark:bg-[linear-gradient(135deg,rgba(0,199,232,0.14),rgba(0,143,199,0.08))] dark:border-cyan-500/15">
                                        <feature.icon size={20} weight="bold" className={feature.color} />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold text-[#07111F] mb-0.5 break-words dark:text-foreground">{feature.title}</div>
                                        <div className="text-xs text-[#5B677A] leading-relaxed break-words dark:text-muted-foreground">{feature.description}</div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                                <div className="mt-3 pt-3 border-t border-[#D8E3EE] dark:border-border/40">
                                  <button
                                    onClick={() => {
                                      handleNavigate(item.id)
                                      if (item.id === "product") setProductDropdownOpen(false)
                                      if (item.id === "enterprise") setEnterpriseDropdownOpen(false)
                                      if (item.id === "documentation") setDocsDropdownOpen(false)
                                      if (item.id === "support") setSupportDropdownOpen(false)
                                      if (item.id === "licensing") setLicensingDropdownOpen(false)
                                    }}
                                    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-cyan-50 hover:bg-cyan-100 rounded-md text-sm font-semibold text-[#07111F] transition-all duration-150 group dark:bg-[linear-gradient(135deg,rgba(0,199,232,0.18),rgba(0,143,199,0.10))] dark:hover:bg-[linear-gradient(135deg,rgba(0,199,232,0.22),rgba(0,143,199,0.14))] dark:text-[#F8FAFC]"
                                  >
                                    <span>View All {dropdownTitle}</span>
                                    <ArrowRight size={14} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleNavigate(item.id)}
                          className={`relative px-3 xl:px-3.5 py-1.5 text-[12px] xl:text-[13px] tracking-[0.01em] font-medium rounded-sm transition-all duration-150 whitespace-nowrap ${
                            currentPage === item.id
                                ? "text-[#07111F] dark:text-[#F8FAFC]"
                                : "text-[#5B677A] hover:text-[#07111F] dark:text-muted-foreground dark:hover:text-[#F8FAFC]"
                          }`}
                        >
                          <span className="relative z-10">{item.label}</span>
                          {currentPage === item.id && (
                            <div className="absolute inset-0 bg-cyan-50 rounded-md dark:bg-primary/8" />
                          )}
                        </button>
                      )}
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
                className="hidden xl:flex items-center gap-2 h-9 px-3.5 font-bold text-sm group transition-all duration-150 rounded-md"
              >
                <CloudArrowDown size={17} weight="bold" className="group-hover:scale-110 transition-transform sm:w-[18px] sm:h-[18px]" />
                <span>Download Trial</span>
              </Button>
              <Button 
                onClick={handleLoginClick}
                size="default"
                variant="secondary"
                className="h-9 px-3 sm:px-3.5 font-bold text-xs sm:text-sm transition-all duration-150 group rounded-md"
              >
                <span>Sign In</span>
                <ArrowRight size={15} weight="bold" className="ml-1 sm:ml-1.5 group-hover:translate-x-1 transition-transform sm:w-[17px] sm:h-[17px]" />
              </Button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 text-foreground hover:bg-accent/60 rounded-md transition-colors active:scale-95"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} weight="bold" className="sm:w-[22px] sm:h-[22px]" /> : <List size={20} weight="bold" className="sm:w-[22px] sm:h-[22px]" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[calc(2.25rem+3.5rem)] sm:top-[calc(2.5rem+4rem)] md:top-[calc(2.75rem+5rem)] z-40 bg-[rgba(255,255,255,0.96)] backdrop-blur-2xl overflow-y-auto border-t border-[#D8E3EE] dark:bg-[rgba(7,17,31,0.96)] dark:border-cyan-500/16">
          <div className="h-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
              <div className="flex flex-col gap-1.5 sm:gap-2">
                {navItems.map((item) => {
                  const isDropdownOpen = item.id === "product" ? productDropdownOpen : 
                                        item.id === "enterprise" ? enterpriseDropdownOpen :
                                        item.id === "documentation" ? docsDropdownOpen :
                                        item.id === "support" ? supportDropdownOpen :
                                        item.id === "licensing" ? licensingDropdownOpen : false
                  const dropdownData = item.id === "product" ? productFeatures :
                                      item.id === "enterprise" ? enterpriseSolutions :
                                      item.id === "documentation" ? documentationSections :
                                      item.id === "support" ? supportOptions :
                                      item.id === "licensing" ? licensingOptions : []
                  
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => {
                          if (item.hasDropdown) {
                            if (item.id === "product") setProductDropdownOpen(!productDropdownOpen)
                            if (item.id === "enterprise") setEnterpriseDropdownOpen(!enterpriseDropdownOpen)
                            if (item.id === "documentation") setDocsDropdownOpen(!docsDropdownOpen)
                            if (item.id === "support") setSupportDropdownOpen(!supportDropdownOpen)
                            if (item.id === "licensing") setLicensingDropdownOpen(!licensingDropdownOpen)
                          } else {
                            handleNavigate(item.id)
                          }
                        }}
                        className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-left text-sm sm:text-base tracking-[0.01em] font-medium rounded-lg transition-all flex items-center justify-between active:scale-98 ${
                          currentPage === item.id
                            ? "text-[#07111F] bg-cyan-50 border border-cyan-500/20 dark:text-[#F8FAFC] dark:bg-[rgba(0,199,232,0.10)]"
                            : "text-[#5B677A] hover:text-[#07111F] hover:bg-[#F6F9FC] active:bg-cyan-50 dark:text-muted-foreground dark:hover:text-[#F8FAFC] dark:hover:bg-[rgba(0,199,232,0.08)] dark:active:bg-[rgba(0,199,232,0.12)]"
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.hasDropdown && (
                          <CaretDown size={13} weight="bold" className={`transition-transform duration-200 sm:w-[14px] sm:h-[14px] ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        )}
                      </button>
                      
                      {item.hasDropdown && isDropdownOpen && (
                        <div className="mt-1.5 sm:mt-2 ml-3 sm:ml-4 space-y-1.5 sm:space-y-2">
                          {dropdownData.map((feature) => (
                            <button
                              key={feature.title}
                              onClick={() => {
                                if (item.id === "support" && feature.title === "Live Chat") {
                                  onOpenLiveChat("I need help with support")
                                  setSupportDropdownOpen(false)
                                  setMobileMenuOpen(false)
                                  return
                                }
                                handleNavigate(item.id)
                                if (item.id === "product") setProductDropdownOpen(false)
                                if (item.id === "enterprise") setEnterpriseDropdownOpen(false)
                                if (item.id === "documentation") setDocsDropdownOpen(false)
                                if (item.id === "support") setSupportDropdownOpen(false)
                                if (item.id === "licensing") setLicensingDropdownOpen(false)
                              }}
                              className="w-full flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-[#F6F9FC] active:bg-cyan-50 active:scale-98 transition-all duration-200 text-left dark:hover:bg-[rgba(0,199,232,0.08)] dark:active:bg-[rgba(0,199,232,0.12)]"
                            >
                              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[linear-gradient(135deg,rgba(0,199,232,0.10),rgba(0,143,199,0.05))] border border-[#D8E3EE] flex items-center justify-center flex-shrink-0 dark:bg-[linear-gradient(135deg,rgba(0,199,232,0.14),rgba(0,143,199,0.08))] dark:border-cyan-500/15">
                                <feature.icon size={17} weight="bold" className={`${feature.color} sm:w-[18px] sm:h-[18px]`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs sm:text-sm font-semibold text-[#07111F] mb-0.5 dark:text-foreground">{feature.title}</div>
                                <div className="text-[11px] sm:text-xs text-[#5B677A] leading-snug dark:text-muted-foreground">{feature.description}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#D8E3EE] space-y-4 sm:space-y-6 dark:border-border/40">
                <Button 
                  onClick={() => handleNavigate("download")}
                  variant="outline"
                  className="w-full h-11 sm:h-12 justify-center gap-2 text-sm sm:text-base font-semibold active:scale-98 transition-all rounded-md"
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
                      className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-[rgba(0,199,232,0.08)] active:bg-[rgba(0,199,232,0.12)] border border-[rgba(0,199,232,0.16)] hover:border-primary/30 transition-all duration-200 active:scale-95"
                      aria-label={social.label}
                    >
                      <social.icon size={18} weight="bold" className="sm:w-5 sm:h-5" />
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
