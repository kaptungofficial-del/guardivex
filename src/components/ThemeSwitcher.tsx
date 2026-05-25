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
      className="inline-flex h-7 items-center gap-1 rounded-sm border border-[#D9E7F2]/80 bg-[rgba(255,255,255,0.72)] px-1.5 text-[#64748B] shadow-none backdrop-blur-xl transition-colors dark:border-[rgba(0,194,255,0.12)] dark:bg-[rgba(3,10,24,0.68)] dark:text-[#94A3B8]"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun size={11} weight="bold" className={isDark ? "opacity-35" : "text-warning opacity-90"} aria-hidden="true" />
      <Switch
        checked={isDark}
        onCheckedChange={handleThemeChange}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="h-4 w-7 border border-border/45 data-[state=checked]:bg-primary/85 data-[state=unchecked]:bg-[#EAF7FF] dark:border-[rgba(0,194,255,0.16)] dark:data-[state=unchecked]:bg-[#0B1220]"
      />
      <Moon size={11} weight="fill" className={isDark ? "text-primary opacity-90" : "opacity-35"} aria-hidden="true" />
    </div>
  )
}
