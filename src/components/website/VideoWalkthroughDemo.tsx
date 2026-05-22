import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, 
  Warning, 
  Broadcast,
  Buildings,
  Camera,
  Lock,
  Siren,
  NetworkX,
  Bell,
  CheckCircle,
  Circle,
  Gauge,
  ChartLine,
  Play,
  Pause,
  ArrowCounterClockwise,
  Cube
} from "@phosphor-icons/react"

interface WalkthroughStep {
  title: string
  description: string
  duration: number
  highlight?: string
}

const walkthroughSteps: WalkthroughStep[] = [
  {
    title: "Security Overview",
    description: "Monitor your organization's security posture at a glance",
    duration: 3000,
    highlight: "metrics"
  },
  {
    title: "Live Alert Feed",
    description: "Real-time security events and device status updates",
    duration: 3500,
    highlight: "alerts"
  },
  {
    title: "Device Health",
    description: "Track health status across all device categories",
    duration: 3000,
    highlight: "devices"
  },
  {
    title: "Site Monitoring",
    description: "Multi-site health overview with uptime tracking",
    duration: 3000,
    highlight: "sites"
  },
  {
    title: "Performance Analytics",
    description: "Real-time system metrics and performance charts",
    duration: 3500,
    highlight: "analytics"
  }
]

export function VideoWalkthroughDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [activeAlert, setActiveAlert] = useState(0)
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null)
  const [pulsingDevice, setPulsingDevice] = useState(0)

  const step = walkthroughSteps[currentStep]

  useEffect(() => {
    if (!isPlaying) return

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= walkthroughSteps.length - 1) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
      setProgress(0)
    }, step.duration)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (step.duration / 50)
        if (prev >= 100) return 100
        return prev + increment
      })
    }, 50)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [currentStep, isPlaying, step.duration])

  useEffect(() => {
    const alertInterval = setInterval(() => {
      setActiveAlert((prev) => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(alertInterval)
  }, [])

  useEffect(() => {
    const deviceInterval = setInterval(() => {
      setPulsingDevice((prev) => (prev + 1) % 4)
    }, 1500)
    return () => clearInterval(deviceInterval)
  }, [])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setProgress(0)
    setIsPlaying(true)
  }

  const metrics = [
    { 
      icon: ShieldCheck, 
      label: "Security Score", 
      value: 87, 
      trend: "+3%",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/30"
    },
    { 
      icon: Warning, 
      label: "Critical Alerts", 
      value: 8, 
      trend: "-2",
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/30"
    },
    { 
      icon: Broadcast, 
      label: "Devices Online", 
      value: "1,247", 
      trend: "+12",
      color: "text-success",
      bg: "bg-success/10",
      border: "border-success/30"
    },
    { 
      icon: Buildings, 
      label: "Sites Active", 
      value: 23,
      trend: "100%",
      color: "text-accent",
      bg: "bg-accent/10",
      border: "border-accent/30"
    },
  ]

  const alerts = [
    { icon: Warning, text: "Motion detected - Building A Lobby", time: "Just now", severity: "high" },
    { icon: CheckCircle, text: "Device restored - Camera 12", time: "2m ago", severity: "success" },
    { icon: Bell, text: "Access granted - Main Entry", time: "3m ago", severity: "info" },
    { icon: Warning, text: "Network latency spike detected", time: "5m ago", severity: "warning" },
  ]

  const devices = [
    { icon: Camera, label: "Cameras", count: 584, health: 98, trend: "+2" },
    { icon: Lock, label: "Access Control", count: 142, health: 100, trend: "0" },
    { icon: Siren, label: "Alarm Panels", count: 89, health: 95, trend: "-1" },
    { icon: NetworkX, label: "Network", count: 432, health: 97, trend: "+5" },
  ]

  const sites = [
    { name: "HQ North", devices: 234, status: "healthy", uptime: 99.9 },
    { name: "HQ South", devices: 198, status: "healthy", uptime: 99.8 },
    { name: "Warehouse A", devices: 156, status: "warning", uptime: 98.2 },
    { name: "Warehouse B", devices: 143, status: "healthy", uptime: 99.7 },
  ]

  const isHighlighted = (section: string) => {
    return step.highlight === section
  }

  const deviceHealthWidthClass = (health: number) => {
    if (health >= 98) return "w-full"
    if (health >= 95) return "w-11/12"
    if (health >= 90) return "w-10/12"
    if (health >= 80) return "w-9/12"
    return "w-8/12"
  }

  const analyticsWidthClass = (value: string) => {
    if (value === "68%") return "w-8/12"
    if (value === "42%") return "w-5/12"
    if (value === "31%") return "w-4/12"
    return "w-6/12"
  }

  return (
    <section className="container mx-auto px-6 py-16 border-t border-border bg-gradient-to-b from-background via-card/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,200,240,0.03),transparent_70%)]" />
      
      <div className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            <Cube size={14} weight="duotone" className="animate-spin-slow" />
            <span className="ml-2">Automated Product Tour</span>
          </Badge>
          <h2 className="text-3xl font-heading font-bold mb-3">See Guardivex in Action</h2>
          <p className="text-base text-muted-foreground">
            Watch an automated walkthrough of the SOC Command Center's key features
          </p>
        </div>

        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={handlePlayPause}
                className="h-9 w-9 p-0"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRestart}
                className="h-9 w-9 p-0"
              >
                <ArrowCounterClockwise size={16} />
              </Button>
            </div>
            
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{step.title}</span>
                <span className="text-xs text-muted-foreground">Step {currentStep + 1} of {walkthroughSteps.length}</span>
              </div>
              <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                <progress
                  className="h-full w-full [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-primary [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:duration-100 [&::-moz-progress-bar]:bg-primary"
                  max={100}
                  value={progress}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{step.description}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl overflow-hidden border-2 border-border/50 shadow-2xl bg-gradient-to-br from-card via-background to-card backdrop-blur-sm">
            <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60 animate-pulse" />
              </div>
              <div className="flex-1 flex items-center justify-center gap-2">
                <span className="text-xs text-muted-foreground font-mono">Guardivex SOC Dashboard</span>
              </div>
              <Badge variant="outline" className="text-xs gap-1 border-success/30 text-success">
                <Circle size={8} weight="fill" className="animate-pulse" />
                Live Demo
              </Badge>
            </div>

            <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-background/50 via-card/30 to-background/50">
              <div 
                className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-500 ${
                  isHighlighted('metrics') ? 'scale-[1.02] ring-2 ring-primary/30 rounded-lg p-2 -m-2' : ''
                }`}
              >
                {metrics.map((metric, i) => (
                  <div
                    key={i}
                    className={`${metric.bg} rounded-lg p-4 border ${metric.border} transition-all duration-300 ${
                      hoveredMetric === i || (isHighlighted('metrics') && currentStep === 0) 
                        ? 'scale-105 shadow-lg' 
                        : ''
                    }`}
                    onMouseEnter={() => setHoveredMetric(i)}
                    onMouseLeave={() => setHoveredMetric(null)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <metric.icon 
                        size={24} 
                        className={`${metric.color} ${hoveredMetric === i ? 'animate-pulse' : ''}`}
                        weight="duotone" 
                      />
                      <Badge variant="outline" className="text-xs">
                        {metric.trend}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold font-heading mb-1">
                      {typeof metric.value === 'number' && hoveredMetric === i 
                        ? `${metric.value + Math.floor(Math.random() * 3)}`
                        : metric.value
                      }
                    </div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className={`md:col-span-2 bg-card/50 rounded-lg border border-border/50 p-4 transition-all duration-500 ${
                    isHighlighted('alerts') ? 'scale-[1.02] ring-2 ring-primary/30 shadow-lg' : ''
                  }`}
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
                    {alerts.map((alert, i) => (
                      <div 
                        key={i}
                        className={`flex items-start gap-3 p-3 bg-background/50 rounded border transition-all duration-500 ${
                          i === activeAlert && isHighlighted('alerts')
                            ? 'border-primary/50 shadow-md scale-[1.02] bg-primary/5'
                            : 'border-border/30'
                        }`}
                      >
                        <alert.icon 
                          size={20} 
                          className={`${
                            alert.severity === 'high' ? 'text-destructive' :
                            alert.severity === 'warning' ? 'text-warning' :
                            alert.severity === 'success' ? 'text-success' : 'text-info'
                          } ${i === activeAlert && isHighlighted('alerts') ? 'animate-pulse' : ''}`}
                          weight="duotone"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{alert.text}</div>
                          <div className="text-xs text-muted-foreground">{alert.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div 
                  className={`bg-card/50 rounded-lg border border-border/50 p-4 transition-all duration-500 ${
                    isHighlighted('devices') ? 'scale-[1.02] ring-2 ring-primary/30 shadow-lg' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <Gauge size={16} weight="duotone" className="text-primary" />
                      Device Health
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {devices.map((device, i) => (
                      <div 
                        key={i}
                        className={`p-2 bg-background/50 rounded border border-border/30 transition-all duration-300 ${
                          i === pulsingDevice && isHighlighted('devices') 
                            ? 'scale-105 border-primary/50 shadow-md' 
                            : ''
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <device.icon 
                            size={16} 
                            className={`text-primary ${
                              i === pulsingDevice && isHighlighted('devices') ? 'animate-pulse' : ''
                            }`}
                            weight="duotone" 
                          />
                          <span className="text-xs font-medium flex-1">{device.label}</span>
                          <span className="text-xs text-muted-foreground">{device.count}</span>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              device.health >= 98 ? 'bg-success' : 
                              device.health >= 90 ? 'bg-warning' : 'bg-destructive'
                            } ${deviceHealthWidthClass(device.health)} ${
                              device.health >= 98 ? 'shadow-[0_0_8px_rgba(120,200,120,0.5)]' : ''
                            }`}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 text-right">{device.health}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div 
                className={`bg-card/50 rounded-lg border border-border/50 p-4 transition-all duration-500 ${
                  isHighlighted('sites') ? 'scale-[1.02] ring-2 ring-primary/30 shadow-lg' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <Buildings size={16} weight="duotone" className="text-primary" />
                    Multi-Site Health
                  </h3>
                  <Badge variant="outline" className="text-xs">23 Sites</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {sites.map((site, i) => (
                    <div 
                      key={i}
                      className={`p-3 rounded border transition-all duration-500 ${
                        site.status === 'healthy' 
                          ? 'bg-success/5 border-success/20 hover:border-success/40' 
                          : 'bg-warning/5 border-warning/20 hover:border-warning/40'
                      } ${
                        isHighlighted('sites') 
                          ? 'scale-105 shadow-md' 
                          : ''
                      }`}
                    >
                      <div className="text-xs font-medium mb-1 truncate">{site.name}</div>
                      <div className="text-xs text-muted-foreground mb-2">{site.devices} devices</div>
                      <div className={`w-full h-1 rounded-full mb-1 ${
                        site.status === 'healthy' ? 'bg-success' : 'bg-warning'
                      }`} />
                      <div className="text-xs text-muted-foreground">{site.uptime}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div 
                className={`bg-card/50 rounded-lg border border-border/50 p-4 transition-all duration-500 ${
                  isHighlighted('analytics') ? 'scale-[1.02] ring-2 ring-primary/30 shadow-lg' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <ChartLine size={16} weight="duotone" className="text-primary" />
                    Performance Analytics
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "CPU Usage", value: "42%", color: "bg-success" },
                    { label: "Memory", value: "68%", color: "bg-warning" },
                    { label: "Network", value: "31%", color: "bg-success" },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="font-medium">{stat.value}</span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${stat.color} ${analyticsWidthClass(stat.value)} transition-all duration-1000 ${
                            isHighlighted('analytics') ? 'animate-pulse' : ''
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center space-y-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {walkthroughSteps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentStep(i)
                    setProgress(0)
                    setIsPlaying(false)
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    i === currentStep
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : i < currentStep
                      ? 'bg-success/20 text-success border border-success/30'
                      : 'bg-card border border-border hover:border-primary/30'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                Experience the full platform - Request a live demo
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

