import type { ReactNode } from "react"
import { ArrowLeft, BellRinging, Buildings, ChartLineUp } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { BrandMark } from "@/components/BrandLogo"

interface AuthShellProps {
  backLabel: string
  onBack: () => void
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthShell({ backLabel, onBack, title, subtitle, children }: AuthShellProps) {
  return (
    <div className="min-h-dvh bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.62_0.13_220_/_0.12),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,oklch(0.68_0.08_170_/_0.12),transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.55_0.08_240_/_0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.55_0.08_240_/_0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 sm:gap-2.5 sm:px-4 sm:py-2.5 rounded-lg bg-card/55 backdrop-blur-sm border border-border/60 text-xs sm:text-sm text-foreground/80 hover:text-foreground hover:bg-card/70 hover:border-border transition-all duration-200 group shadow-sm hover:shadow-md active:scale-95"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" weight="bold" />
          <span className="font-medium">{backLabel}</span>
        </button>
      </div>

      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10">
        <ThemeSwitcher />
      </div>

      <div className="relative min-h-dvh flex items-center justify-center p-4 sm:p-5 lg:p-6">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(520px,560px)] gap-5 lg:gap-8 items-stretch">
          <section className="hidden lg:flex flex-col justify-between rounded-3xl border border-border/60 bg-card/40 backdrop-blur-xl p-8 xl:p-10 shadow-2xl shadow-black/10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <BrandMark className="w-14 h-14 shrink-0" />
                <div>
                  <h1 className="text-3xl font-heading font-bold tracking-tight">guardivex</h1>
                  <p className="text-sm text-muted-foreground">Enterprise Security Platform</p>
                </div>
              </div>
              <div className="space-y-3">
                <Badge variant="outline" className="border-success/40 text-success bg-success/10 w-fit">SOC Operations Online</Badge>
                <h2 className="text-3xl xl:text-4xl font-heading font-bold leading-tight">
                  {title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                  {subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-border/60 bg-background/45 p-4">
                  <Buildings size={20} className="text-primary mb-2" weight="duotone" />
                  <p className="text-xs text-muted-foreground">Sites Monitored</p>
                  <p className="text-xl font-bold">10,000+</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-background/45 p-4">
                  <BellRinging size={20} className="text-primary mb-2" weight="duotone" />
                  <p className="text-xs text-muted-foreground">Active Alerts</p>
                  <p className="text-xl font-bold">Real-Time</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-background/45 p-4">
                  <ChartLineUp size={20} className="text-primary mb-2" weight="duotone" />
                  <p className="text-xs text-muted-foreground">Platform Uptime</p>
                  <p className="text-xl font-bold">99.99%</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">SOC 2 Type II . ISO 27001 . GDPR-ready controls</p>
          </section>

          <div className="space-y-4 sm:space-y-5 lg:w-[560px] lg:justify-self-end">
            <div className="lg:hidden flex flex-col items-center gap-2.5 text-center">
              <BrandMark className="w-20 h-20 sm:w-24 sm:h-24" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight">guardivex</h1>
                <p className="text-sm text-muted-foreground">Enterprise Security Platform</p>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}