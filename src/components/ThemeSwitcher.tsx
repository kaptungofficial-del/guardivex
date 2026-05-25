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
      className="inline-flex h-6.5 items-center gap-1 rounded-sm border border-[#D9E7F2]/72 bg-[rgba(255,255,255,0.68)] px-1.5 text-[#64748B] shadow-none backdrop-blur-xl transition-colors dark:border-[rgba(0,194,255,0.08)] dark:bg-[rgba(3,10,24,0.60)] dark:text-[#94A3B8]"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun size={10} weight="bold" className={isDark ? "opacity-32" : "text-warning opacity-80"} aria-hidden="true" />
      <Switch
        checked={isDark}
        onCheckedChange={handleThemeChange}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="h-3.5 w-6.5 border border-border/40 data-[state=checked]:bg-primary/80 data-[state=unchecked]:bg-[#EAF7FF] dark:border-[rgba(0,194,255,0.12)] dark:data-[state=unchecked]:bg-[#0B1220]"
      />
      <Moon size={10} weight="fill" className={isDark ? "text-primary opacity-80" : "opacity-32"} aria-hidden="true" />
    </div>
  )
}
