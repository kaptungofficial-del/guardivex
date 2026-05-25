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
      className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#D9E7F2] bg-[rgba(255,255,255,0.82)] px-2 text-[#64748B] shadow-none backdrop-blur-xl transition-colors dark:border-[rgba(0,119,255,0.26)] dark:bg-[rgba(11,22,40,0.72)] dark:text-[#94A3B8]"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun size={13} weight="bold" className={isDark ? "opacity-45" : "text-warning opacity-100"} aria-hidden="true" />
      <Switch
        checked={isDark}
        onCheckedChange={handleThemeChange}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="h-4.5 w-8 border border-border/50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#EAF7FF] dark:border-[rgba(0,119,255,0.28)] dark:data-[state=unchecked]:bg-[#102235]"
      />
      <Moon size={13} weight="fill" className={isDark ? "text-primary opacity-100" : "opacity-45"} aria-hidden="true" />
    </div>
  )
}
