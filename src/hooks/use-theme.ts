import { useEffect } from "react"
import { usePersistentKV } from "@/hooks/use-persistent-kv"

type Theme = "light" | "dark" | "system"

export function useTheme() {
  const [theme, setTheme] = usePersistentKV<Theme>("sentinelgrid-theme", "system")

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    const currentTheme = theme || "system"

    if (currentTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(currentTheme)
    }
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const handleChange = () => {
      if (theme === "system") {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        const systemTheme = mediaQuery.matches ? "dark" : "light"
        root.classList.add(systemTheme)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  return { theme, setTheme }
}
