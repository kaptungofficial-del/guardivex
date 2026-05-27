import type { ReactNode } from "react"
import { ArrowLeft, BellRinging, Buildings, ChartLineUp } from "@phosphor-icons/react"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { BrandMark } from "@/components/BrandLogo"
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
    <div className="min-h-dvh bg-[#F8FBFF] text-[#07111F] premium-shell relative overflow-hidden dark:bg-[#020817] dark:text-[#F8FAFC]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,119,204,0.055),transparent_32%),radial-gradient(circle_at_80%_12%,rgba(0,143,199,0.04),transparent_36%),linear-gradient(180deg,rgba(248,251,255,0.98),rgba(238,246,251,1))] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(0,119,255,0.18),transparent_34%),radial-gradient(circle_at_80%_12%,rgba(0,194,255,0.09),transparent_38%),linear-gradient(180deg,rgba(2,8,23,0.94),rgba(2,8,23,1))]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(0,119,204,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(0,143,199,0.08)_1px,transparent_1px)] bg-[size:34px_34px] dark:opacity-[0.16] dark:bg-[linear-gradient(rgba(0,194,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(0,194,255,0.08)_1px,transparent_1px)]" />

      <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-md border border-[#CFE0EF] bg-white/88 px-3 py-2 text-xs font-medium text-[#334155] shadow-[0_8px_22px_-20px_rgba(7,17,31,0.35)] backdrop-blur-sm transition-all duration-200 hover:border-[#008FC7]/35 hover:bg-white hover:text-[#07111F] active:scale-95 sm:gap-2.5 sm:px-3.5 sm:py-2 group dark:border-cyan-300/12 dark:bg-[#061426]/72 dark:text-slate-300 dark:hover:border-cyan-300/24 dark:hover:bg-[#071426]/82 dark:hover:text-white"
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
          <section className="hidden lg:flex flex-col justify-between rounded-xl border border-[#CFE0EF] bg-white/88 p-6 shadow-[0_18px_54px_-42px_rgba(7,17,31,0.36)] backdrop-blur-xl xl:p-7 dark:border-cyan-300/14 dark:bg-[#051225]/84 dark:shadow-[0_24px_70px_-50px_rgba(0,194,255,0.42)]">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <BrandMark className="w-14 h-14 shrink-0" />
                <div>
                  <h1 className="text-2xl font-heading font-semibold tracking-tight text-[#07111F] dark:text-[#F8FAFC]">Guardivex</h1>
                  <p className="text-xs font-medium text-[#64748B] dark:text-slate-400">Enterprise Security Platform</p>
                </div>
              </div>
              <div className="space-y-3">
                <HeaderStatusBadge label="Online" className="w-fit" />
                <h2 className="max-w-[580px] text-2xl font-heading font-semibold leading-[1.12] tracking-[-0.02em] text-[#07111F] xl:text-[2.15rem] dark:text-[#F8FAFC]">
                  {title}
                </h2>
                <p className="max-w-[520px] text-[0.86rem] leading-[1.58] text-[#334155] dark:text-slate-300">
                  {subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-md border border-[#CFE0EF] bg-[#F8FBFF] p-3 shadow-[0_8px_20px_-20px_rgba(7,17,31,0.32)] dark:border-cyan-300/10 dark:bg-[#071426]/74 dark:shadow-none">
                  <Buildings size={18} className="mb-2 text-[#008FC7] dark:text-cyan-400" weight="duotone" />
                  <p className="text-[10px] font-medium text-[#64748B] dark:text-slate-400">Sites Monitored</p>
                  <p className="font-mono text-lg font-semibold text-[#07111F] dark:text-white">10,000+</p>
                </div>
                <div className="rounded-md border border-[#CFE0EF] bg-[#F8FBFF] p-3 shadow-[0_8px_20px_-20px_rgba(7,17,31,0.32)] dark:border-cyan-300/10 dark:bg-[#071426]/74 dark:shadow-none">
                  <BellRinging size={18} className="mb-2 text-[#008FC7] dark:text-cyan-400" weight="duotone" />
                  <p className="text-[10px] font-medium text-[#64748B] dark:text-slate-400">Active Alerts</p>
                  <p className="font-mono text-lg font-semibold text-[#07111F] dark:text-white">Real-Time</p>
                </div>
                <div className="rounded-md border border-[#CFE0EF] bg-[#F8FBFF] p-3 shadow-[0_8px_20px_-20px_rgba(7,17,31,0.32)] dark:border-cyan-300/10 dark:bg-[#071426]/74 dark:shadow-none">
                  <ChartLineUp size={18} className="mb-2 text-[#008FC7] dark:text-cyan-400" weight="duotone" />
                  <p className="text-[10px] font-medium text-[#64748B] dark:text-slate-400">Platform Uptime</p>
                  <p className="font-mono text-lg font-semibold text-[#07111F] dark:text-white">99.99%</p>
                </div>
              </div>
            </div>
            <p className="mt-5 rounded-sm border border-[#CFE0EF] bg-[#F8FBFF] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#64748B] dark:border-cyan-300/10 dark:bg-[#071426]/62 dark:text-slate-400">SOC 2 Type II . ISO 27001 . GDPR-ready controls</p>
          </section>

          <div className="space-y-3 sm:space-y-4 lg:w-full lg:max-w-[500px] lg:justify-self-center">
            <div className="lg:hidden flex flex-col items-center gap-2.5 text-center">
              <BrandMark className="w-16 h-16 sm:w-20 sm:h-20" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-semibold tracking-tight">Guardivex</h1>
                <p className="text-xs text-muted-foreground">Enterprise Security Platform</p>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}