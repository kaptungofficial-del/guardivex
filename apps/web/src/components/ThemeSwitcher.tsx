import { Moon, Sun } from "@phosphor-icons/react"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/hooks/use-theme"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const isDark = theme !== "light"

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <div
      className="inline-flex h-7 items-center gap-0.5 rounded-md border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] px-1 text-[var(--gvx-hero-muted)] shadow-[0_10px_24px_-22px_rgba(7,17,31,0.34)] backdrop-blur-xl transition-all duration-200 hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-hero-surface-strong)] min-[430px]:h-8 min-[430px]:gap-1 min-[430px]:px-1.5"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun size={10} weight="bold" className={isDark ? "opacity-35" : "text-warning opacity-85"} aria-hidden="true" />
      <Switch
        checked={isDark}
        onCheckedChange={handleThemeChange}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="h-3.5 w-[1.5rem] border border-[var(--gvx-hero-border)] data-[state=checked]:bg-[var(--gvx-hero-accent)] data-[state=unchecked]:bg-[var(--gvx-hero-bg-soft)] min-[430px]:w-[1.625rem]"
      />
      <Moon size={10} weight="fill" className={isDark ? "text-[var(--gvx-hero-accent)] opacity-85" : "opacity-35"} aria-hidden="true" />
    </div>
  )
}
