/**
 * App — subdomain router
 *
 * Detects the current subdomain from window.location.hostname (or the
 * ?subdomain= dev override) and mounts the matching sub-application.
 *
 *   www   → WwwApp        (www.guardivex.com)
 *   app   → AppSubdomain  (app.guardivex.com)
 *   docs  → DocsApp       (docs.guardivex.com)
 *
 * useTheme() and <Toaster /> are initialised here once so every
 * sub-application inherits them without duplication.
 */

import { lazy, Suspense } from "react"
import { Toaster } from "sonner"
import { useTheme } from "@/hooks/use-theme"
import { useSubdomain } from "@/hooks/use-subdomain"

const WwwApp = lazy(() => import("@/subdomains/www").then((module) => ({ default: module.WwwApp })))
const AppSubdomain = lazy(() => import("@/subdomains/app").then((module) => ({ default: module.AppSubdomain })))
const DocsApp = lazy(() => import("@/subdomains/docs").then((module) => ({ default: module.DocsApp })))

function AppLoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

function App() {
  useTheme()
  const subdomain = useSubdomain()

  return (
    <>
      <Suspense fallback={<AppLoadingFallback />}>
        {subdomain === "app"  && <AppSubdomain />}
        {subdomain === "docs" && <DocsApp />}
        {subdomain === "www"  && <WwwApp />}
      </Suspense>
      <Toaster position="top-right" />
    </>
  )
}

export default App
