import { ShieldCheck, Buildings, Bell, ChartLineUp, ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface PublicWebsiteProps {
  onLogin: () => void
}

export function PublicWebsite({ onLogin }: PublicWebsiteProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
              <ShieldCheck size={24} weight="bold" className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">guardivex</h1>
              <p className="text-xs text-muted-foreground">Enterprise Security Platform</p>
            </div>
          </div>
          <Button onClick={onLogin} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Login
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Enterprise Security Infrastructure
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Monitor every device.
            <br />
            <span className="text-primary">Secure every site.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real-time security operations platform for distributed infrastructure. 
            Unified monitoring, threat detection, and incident response across unlimited sites and devices.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button onClick={onLogin} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              Access Platform
              <ArrowRight size={20} weight="bold" />
            </Button>
            <Button variant="outline" size="lg" className="border-border hover:bg-card">
              View Demo
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 bg-card border-border hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <ShieldCheck size={24} weight="bold" className="text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">24/7 Monitoring</h3>
            <p className="text-sm text-muted-foreground">
              Continuous surveillance of all security infrastructure
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4 mx-auto">
              <Buildings size={24} weight="bold" className="text-success" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Multi-Site</h3>
            <p className="text-sm text-muted-foreground">
              Manage security across unlimited physical locations
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4 mx-auto">
              <Bell size={24} weight="bold" className="text-warning" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Smart Alerts</h3>
            <p className="text-sm text-muted-foreground">
              Intelligent threat detection with priority routing
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center mb-4 mx-auto">
              <ChartLineUp size={24} weight="bold" className="text-info" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Real-Time</h3>
            <p className="text-sm text-muted-foreground">
              Live device status and instant incident response
            </p>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Trusted by Security Teams Worldwide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Sites</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2.5M+</div>
              <div className="text-muted-foreground">Monitored Devices</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 guardivex. Enterprise Security Infrastructure Platform.</p>
        </div>
      </footer>
    </div>
  )
}
