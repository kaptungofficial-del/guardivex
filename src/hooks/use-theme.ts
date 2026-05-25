import { useEffect } from "react"
import { usePersistentKV } from "@/hooks/use-persistent-kv"

type Theme = "light" | "dark"

export function useTheme() {
  const [theme, setTheme] = usePersistentKV<Theme>("sentinelgrid-theme", "dark")

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    const currentTheme = theme === "light" ? "light" : "dark"
    root.classList.add(currentTheme)
    root.style.colorScheme = currentTheme
  }, [theme])

  return { theme, setTheme }
}
