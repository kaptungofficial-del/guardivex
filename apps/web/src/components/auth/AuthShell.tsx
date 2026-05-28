import type { ReactNode } from "react"
import { ArrowLeft, BellRinging, Buildings, ChartLineUp } from "@phosphor-icons/react"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { BrandLogo } from "@/components/BrandLogo"
import { HeaderStatusBadge } from "@/components/layout/HeaderPrimitives"

interface AuthShellProps {
  backLabel: string
  onBack: () => void
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthShell({ backLabel, onBack, title, subtitle, children }: AuthShellProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground premium-shell relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,var(--gvx-hero-glow),transparent_32%),radial-gradient(circle_at_80%_12%,rgba(130,168,61,0.055),transparent_36%),linear-gradient(180deg,var(--gvx-hero-bg),var(--gvx-hero-bg-soft))]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(var(--gvx-hero-accent-soft)_1px,transparent_1px),linear-gradient(90deg,var(--gvx-hero-accent-soft)_1px,transparent_1px)] bg-[size:34px_34px] dark:opacity-[0.16]" />

      <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10">
        <button
          onClick={onBack}
          className="brand-panel-surface flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium text-[var(--gvx-hero-muted)] shadow-[0_8px_22px_-20px_rgba(7,17,31,0.35)] backdrop-blur-sm transition-all duration-200 hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-hero-surface-strong)] hover:text-[var(--gvx-hero-text)] active:scale-95 sm:gap-2.5 sm:px-3.5 sm:py-2 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" weight="bold" />
          <span className="font-medium">{backLabel}</span>
        </button>
      </div>

      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10">
        <ThemeSwitcher />
      </div>

      <div className="relative min-h-dvh flex items-center justify-center p-4 sm:p-5 lg:p-6">
        <div className="w-full max-w-[1320px] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(420px,500px)] gap-5 lg:gap-8 items-stretch">
          <section className="hidden lg:flex flex-col justify-between rounded-xl border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-surface)] p-6 shadow-[var(--gvx-hero-shadow)] backdrop-blur-xl xl:p-7">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <BrandLogo subtitle="Enterprise Security Platform" markClassName="w-14 h-14" titleClassName="text-2xl font-semibold" subtitleClassName="text-xs tracking-normal normal-case" />
              </div>
              <div className="space-y-3">
                <HeaderStatusBadge label="Online" className="w-fit" />
                <h2 className="max-w-[580px] text-2xl font-heading font-semibold leading-[1.12] tracking-normal text-foreground xl:text-[2.15rem]">
                  {title}
                </h2>
                <p className="brand-muted-text max-w-[520px] text-[0.86rem] leading-[1.58]">
                  {subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="brand-panel-surface rounded-md border p-3 shadow-[0_8px_20px_-20px_rgba(7,17,31,0.32)]">
                  <Buildings size={18} className="brand-accent-text mb-2" weight="duotone" />
                  <p className="brand-muted-text text-[10px] font-medium">Sites Monitored</p>
                  <p className="font-mono text-lg font-semibold text-foreground">10,000+</p>
                </div>
                <div className="brand-panel-surface rounded-md border p-3 shadow-[0_8px_20px_-20px_rgba(7,17,31,0.32)]">
                  <BellRinging size={18} className="brand-accent-text mb-2" weight="duotone" />
                  <p className="brand-muted-text text-[10px] font-medium">Active Alerts</p>
                  <p className="font-mono text-lg font-semibold text-foreground">Real-Time</p>
                </div>
                <div className="brand-panel-surface rounded-md border p-3 shadow-[0_8px_20px_-20px_rgba(7,17,31,0.32)]">
                  <ChartLineUp size={18} className="brand-accent-text mb-2" weight="duotone" />
                  <p className="brand-muted-text text-[10px] font-medium">Platform Uptime</p>
                  <p className="font-mono text-lg font-semibold text-foreground">99.99%</p>
                </div>
              </div>
            </div>
            <p className="brand-panel-surface brand-muted-text mt-5 rounded-sm border px-3 py-2 text-[10px] font-medium uppercase tracking-[0.12em]">SOC 2 Type II . ISO 27001 . GDPR-ready controls</p>
          </section>

          <div className="space-y-3 sm:space-y-4 lg:w-full lg:max-w-[500px] lg:justify-self-center">
            <div className="lg:hidden flex flex-col items-center gap-2.5 text-center">
              <BrandLogo subtitle="Enterprise Security Platform" markClassName="w-16 h-16 sm:w-20 sm:h-20" titleClassName="text-2xl sm:text-3xl font-semibold" subtitleClassName="text-xs tracking-normal normal-case" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}