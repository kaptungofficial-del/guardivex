import { useEffect } from "react"
import { usePersistentKV } from "@/hooks/use-persistent-kv"

type Theme = "light" | "dark" | "system"

export function useTheme() {
  const [theme, setTheme] = usePersistentKV<Theme>("sentinelgrid-theme", "dark")

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    // Keep dark as default and treat legacy/system preference as dark.
    const currentTheme = !theme || theme === "system" ? "dark" : theme
    root.classList.add(currentTheme)
  }, [theme])

  return { theme, setTheme }
}
