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
      color: "text-blue-400"
    },
    {
      icon: LockKey,
      title: "Access Control",
      description: "Doors & Readers",
      color: "text-purple-400"
    },
    {
      icon: BellRinging,
      title: "Intrusion Detection",
      description: "Alarms & Sensors",
      color: "text-orange-400"
    },
    {
      icon: WifiHigh,
      title: "Network Monitoring",
      description: "Switches & Routers",
      color: "text-cyan-400"
    },
    {
      icon: Gauge,
      title: "System Health",
      description: "Server & Performance",
      color: "text-green-400"
    },
    {
      icon: CloudCheck,
      title: "Cloud Services",
      description: "Remote Access & Sync",
      color: "text-indigo-400"
    },
    {
      icon: ChartLine,
      title: "Analytics & Reports",
      description: "Insights & Trends",
      color: "text-pink-400"
    },
    {
      icon: Pulse,
      title: "Event Engine",
      description: "Real-time Alerts",
      color: "text-red-400"
    }
  ]
  
  const enterpriseSolutions = [
    {
      icon: Buildings,
      title: "Multi-Site Deployment",
      description: "Centralized management",
      color: "text-blue-400"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Role-based access",
      color: "text-purple-400"
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description: "Worldwide operations",
      color: "text-cyan-400"
    },
    {
      icon: ChartLineUp,
      title: "Enterprise Analytics",
      description: "Advanced reporting",
      color: "text-green-400"
    },
    {
      icon: Package,
      title: "Custom Integration",
      description: "API & SDK access",
      color: "text-orange-400"
    },
    {
      icon: Certificate,
      title: "Compliance & Security",
      description: "SOC 2, ISO certified",
      color: "text-indigo-400"
    }
  ]
  
  const documentationSections = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Installation & setup",
      color: "text-blue-400"
    },
    {
      icon: Code,
      title: "API Reference",
      description: "Integration docs",
      color: "text-purple-400"
    },
    {
      icon: FileText,
      title: "User Guides",
      description: "Feature walkthroughs",
      color: "text-cyan-400"
    },
    {
      icon: GraduationCap,
      title: "Training Resources",
      description: "Video tutorials",
      color: "text-green-400"
    },
    {
      icon: Question,
      title: "FAQs",
      description: "Common questions",
      color: "text-orange-400"
    },
    {
      icon: Terminal,
      title: "Command Line",
      description: "CLI documentation",
      color: "text-indigo-400"
    }
  ]
  
  const supportOptions = [
    {
      icon: Headset,
      title: "24/7 Technical Support",
      description: "Phone & email assistance",
      color: "text-blue-400"
    },
    {
      icon: ChatCircle,
      title: "Live Chat",
      description: "Instant messaging support",
      color: "text-purple-400"
    },
    {
      icon: VideoConference,
      title: "Remote Assistance",
      description: "Screen sharing sessions",
      color: "text-cyan-400"
    },
    {
      icon: Ticket,
      title: "Support Tickets",
      description: "Track your requests",
      color: "text-green-400"
    },
    {
      icon: FileDoc,
      title: "Knowledge Base",
      description: "Self-service articles",
      color: "text-orange-400"
    },
    {
      icon: ClockCounterClockwise,
      title: "Service Status",
      description: "System uptime & incidents",
      color: "text-indigo-400"
    }
  ]
  
  const licensingOptions = [
    {
      icon: CreditCard,
      title: "Trial License",
      description: "30-day full access trial",
      color: "text-blue-400"
    },
    {
      icon: IdentificationBadge,
      title: "Professional",
      description: "Single site deployment",
      color: "text-purple-400"
    },
    {
      icon: Buildings,
      title: "Enterprise",
      description: "Multi-site unlimited",
      color: "text-cyan-400"
    },
    {
      icon: Briefcase,
      title: "MSP/Partner",
      description: "Managed service provider",
      color: "text-green-400"
    },
    {
      icon: Devices,
      title: "Device Licensing",
      description: "Per-device pricing tiers",
      color: "text-orange-400"
    },
    {
      icon: Receipt,
      title: "Volume Discounts",
      description: "Enterprise pricing",
      color: "text-indigo-400"
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
    }, 150)
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
    }, 150)
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
    }, 150)
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
    }, 150)
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
    }, 150)
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
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 sm:h-10 md:h-11">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-md border border-success/25 bg-success/5">
                <div className="relative flex items-center">
                  <Circle size={6} weight="fill" className="text-success drop-shadow-[0_0_4px_rgba(120,200,120,0.6)] sm:w-[7px] sm:h-[7px]" />
                  <div className="absolute inset-0">
                    <Circle size={6} weight="fill" className="text-success animate-ping opacity-60 sm:w-[7px] sm:h-[7px]" />
                  </div>
                </div>
                <span className="text-success hidden min-[380px]:inline tracking-wide">All Systems Operational</span>
                <span className="text-success min-[380px]:hidden tracking-wide">Live</span>
              </div>
              <Badge variant="outline" className="hidden lg:inline-flex h-6 text-[10px] uppercase tracking-[0.1em] border-border/70 text-muted-foreground bg-background/60">
                Enterprise Edition
              </Badge>
              <div className="hidden md:flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-border/60" />
                <a 
                  href="mailto:sales@guardivex"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-[11px] font-semibold group"
                >
                  <EnvelopeSimple size={14} weight="bold" className="group-hover:scale-110 transition-transform" />
                  <span className="hidden lg:inline">sales@guardivex</span>
                </a>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-3 md:gap-5">
              <a
                href="tel:1-800-SENTINEL"
                className="hidden xl:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[11px] font-bold group"
              >
                <Phone size={14} weight="bold" className="group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">1-800-SENTINEL</span>
                <Badge variant="outline" className="text-[9px] px-2 py-0.5 h-4 ml-1 border-success/50 text-success font-bold tracking-wider bg-success/5">24/7</Badge>
              </a>
              <button
                onClick={() => onOpenLiveChat("I need help with my deployment")}
                className={`${ENTERPRISE_CONTROL_CLASS} hidden lg:flex text-[11px] font-bold hover:text-primary hover:border-primary/40 hover:bg-primary/8 group`}
              >
                <ChatCircle size={14} weight="bold" className="group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">Live Chat</span>
              </button>
              <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-3 ml-2 sm:ml-3 border-l border-border/30">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-200 group"
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

      <nav className="border-b border-border/40 bg-background/95 backdrop-blur-2xl sticky top-0 z-50 shadow-lg shadow-black/5">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-[4.75rem]">
            <div className="flex items-center gap-3 sm:gap-8 md:gap-12">
              <button 
                onClick={() => handleNavigate("home")} 
                aria-label="Go to home"
                title="Go to home"
                className="flex items-center gap-2 sm:gap-2.5 md:gap-3 group py-2"
              >
                <BrandLogo
                  subtitle="Security Platform"
                  className="gap-1 sm:gap-1.5 md:gap-2"
                  markClassName="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-105"
                  textContainerClassName="gap-0.5 sm:gap-1"
                  titleClassName="text-base sm:text-xl md:text-[22px] text-foreground group-hover:text-primary transition-colors"
                  subtitleClassName="text-[8px] sm:text-[10px] md:text-[11px] tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em] leading-none mt-0"
                />
              </button>
              
              <div className="hidden lg:flex items-center gap-1">
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
                  
                  return (
                    <div key={item.id} className="relative">
                      {item.hasDropdown ? (
                        <div
                          onMouseEnter={handleEnter}
                          onMouseLeave={handleLeave}
                        >
                          <button
                            onClick={() => handleNavigate(item.id)}
                            className={`relative px-4 py-2 text-[13px] font-semibold rounded-md transition-all duration-200 flex items-center gap-1.5 border ${
                              currentPage === item.id
                                ? "text-foreground border-primary/30 bg-primary/8"
                                : "text-muted-foreground border-transparent hover:text-foreground hover:border-border/70 hover:bg-secondary/40"
                            }`}
                          >
                            <span className="relative z-10">{item.label}</span>
                            <CaretDown size={12} weight="bold" className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-[720px] bg-card/98 backdrop-blur-2xl border border-border/60 rounded-xl shadow-2xl shadow-black/20 p-6 z-50">
                              <div className="mb-4">
                                <h3 className="text-sm font-bold text-foreground mb-1">{dropdownTitle}</h3>
                                <p className="text-xs text-muted-foreground">{dropdownSubtitle}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
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
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/40 transition-all duration-200 text-left group"
                                  >
                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${feature.color.split('-')[1]}-500/10 to-${feature.color.split('-')[1]}-600/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                                      <feature.icon size={20} weight="bold" className={feature.color} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-sm font-semibold text-foreground mb-0.5">{feature.title}</div>
                                      <div className="text-xs text-muted-foreground">{feature.description}</div>
                                    </div>
                                  </button>
                                ))}
                              </div>
                              <div className="mt-4 pt-4 border-t border-border/40">
                                <button
                                  onClick={() => {
                                    handleNavigate(item.id)
                                    if (item.id === "product") setProductDropdownOpen(false)
                                    if (item.id === "enterprise") setEnterpriseDropdownOpen(false)
                                    if (item.id === "documentation") setDocsDropdownOpen(false)
                                    if (item.id === "support") setSupportDropdownOpen(false)
                                    if (item.id === "licensing") setLicensingDropdownOpen(false)
                                  }}
                                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary/8 hover:bg-primary/12 rounded-lg text-sm font-semibold text-primary transition-all duration-200 group"
                                >
                                  <span>View All {dropdownTitle}</span>
                                  <ArrowRight size={14} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleNavigate(item.id)}
                          className={`relative px-4 py-2 text-[13px] font-semibold rounded-md transition-all duration-200 ${
                            currentPage === item.id
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span className="relative z-10">{item.label}</span>
                          {currentPage === item.id && (
                            <div className="absolute inset-0 bg-primary/8 rounded-md" />
                          )}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <ThemeSwitcher />
              <Button 
                onClick={() => handleNavigate("download")}
                variant="outline"
                size="default"
                className="hidden md:flex items-center gap-2 h-10 sm:h-11 px-4 sm:px-6 border-border hover:border-primary/50 hover:bg-primary/8 font-bold text-sm group transition-all duration-200 rounded-lg"
              >
                <CloudArrowDown size={17} weight="bold" className="group-hover:scale-110 transition-transform sm:w-[18px] sm:h-[18px]" />
                <span className="hidden lg:inline">Download</span>
              </Button>
              <Button 
                onClick={handleLoginClick}
                size="default"
                className="h-10 px-4 sm:h-11 sm:px-7 bg-gradient-to-r from-primary via-primary to-primary/95 text-primary-foreground hover:from-primary/95 hover:via-primary/95 hover:to-primary/90 font-bold text-xs sm:text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-200 group rounded-lg border border-primary/20"
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
        <div className="lg:hidden fixed inset-0 top-[calc(2.25rem+3.5rem)] sm:top-[calc(2.5rem+4rem)] md:top-[calc(2.75rem+5rem)] z-40 bg-background/98 backdrop-blur-2xl overflow-y-auto">
          <div className="h-full">
            <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-4 sm:py-6 md:py-8">
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
                        className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-left text-sm sm:text-base font-semibold rounded-lg transition-all flex items-center justify-between active:scale-98 ${
                          currentPage === item.id
                            ? "text-foreground bg-primary/8 border border-primary/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/40 active:bg-accent/50"
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
                              className="w-full flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-accent/40 active:bg-accent/50 active:scale-98 transition-all duration-200 text-left"
                            >
                              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-card flex items-center justify-center flex-shrink-0 border border-border/40`}>
                                <feature.icon size={17} weight="bold" className={`${feature.color} sm:w-[18px] sm:h-[18px]`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs sm:text-sm font-semibold text-foreground mb-0.5">{feature.title}</div>
                                <div className="text-[11px] sm:text-xs text-muted-foreground leading-snug">{feature.description}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/40 space-y-4 sm:space-y-6">
                <Button 
                  onClick={() => handleNavigate("download")}
                  variant="outline"
                  className="w-full h-11 sm:h-12 justify-center gap-2 text-sm sm:text-base border-border/60 hover:border-primary/40 hover:bg-primary/5 font-semibold active:scale-98 transition-all"
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
                      className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 active:bg-primary/10 border border-border/40 hover:border-primary/30 transition-all duration-200 active:scale-95"
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
                    <div>sales@guardivex</div>
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
