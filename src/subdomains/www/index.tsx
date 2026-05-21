/**
 * WwwApp — public marketing website (www.guardivex.com)
 *
 * Owns path-based routing within the www subdomain.
 * Clicking "Sign In" navigates to app.guardivex.com.
 */

import { useState, useEffect } from "react"
import { WebsiteLayout } from "@/components/website/WebsiteLayout"
import { getSubdomainUrl } from "@/hooks/use-subdomain"

export function WwwApp() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const navigate = (path: string) => {
    window.history.pushState({}, "", path)
    setCurrentPath(path)
  }

  const handleNavigateWebsite = (page: string) => {
    navigate(page === "home" ? "/" : `/${page}`)
  }

  /** Cross-subdomain: send the user to app.guardivex.com/login */
  const handleShowLogin = () => {
    window.location.href = getSubdomainUrl("app", "/login")
  }

  const websitePage = currentPath === "/" ? "home" : currentPath.slice(1)

  return (
    <WebsiteLayout
      currentPage={websitePage}
      onNavigate={handleNavigateWebsite}
      onLogin={handleShowLogin}
    />
  )
}
