import { useState } from "react"
import { GoogleLogo, GithubLogo, Key, WindowsLogo } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface SSOLoginProps {
  onSuccess: () => void
}

const ssoProviders = [
  {
    id: "microsoft",
    name: "Microsoft",
    icon: WindowsLogo,
    color: "text-[#00A4EF]",
    type: "oauth"
  },
  {
    id: "google",
    name: "Google Workspace",
    icon: GoogleLogo,
    color: "text-[#4285F4]",
    type: "oauth"
  },
  {
    id: "github",
    name: "GitHub Enterprise",
    icon: GithubLogo,
    color: "text-foreground",
    type: "oauth"
  },
  {
    id: "saml",
    name: "SAML SSO",
    icon: Key,
    color: "text-primary",
    type: "saml"
  }
]

export function SSOLogin({ onSuccess }: SSOLoginProps) {
  const [samlDomain, setSamlDomain] = useState("")
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [showSAMLInput, setShowSAMLInput] = useState(false)

  const handleSSOLogin = async (providerId: string) => {
    setIsLoading(providerId)

    if (providerId === "saml") {
      if (!showSAMLInput) {
        setShowSAMLInput(true)
        setIsLoading(null)
        return
      }
      
      if (!samlDomain) {
        toast.error("Please enter your organization domain")
        setIsLoading(null)
        return
      }
    }

    await new Promise(resolve => setTimeout(resolve, 2000))

    const provider = ssoProviders.find(p => p.id === providerId)
    toast.success(`Authenticated via ${provider?.name}`)
    
    setTimeout(() => {
      onSuccess()
    }, 500)
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-1.5 text-base font-heading font-semibold text-foreground">Enterprise Single Sign-On</h3>
        <p className="brand-muted-text mb-3 text-xs leading-relaxed">Use your organization identity provider to access the Guardivex command center.</p>
        <div className="grid grid-cols-1 gap-2.5">
          {ssoProviders.map((provider) => {
            const Icon = provider.icon
            const isActiveSAML = provider.id === "saml" && showSAMLInput

            return (
              <div key={provider.id}>
                <Button
                  variant="outline"
                  className="brand-panel-surface h-10 w-full justify-start gap-2.5 rounded-md border text-sm text-foreground shadow-none transition-all hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-hero-surface-strong)]"
                  onClick={() => handleSSOLogin(provider.id)}
                  disabled={isLoading !== null && isLoading !== provider.id}
                >
                  {isLoading === provider.id ? (
                    <>
                      <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
                      <span>Connecting to {provider.name}...</span>
                    </>
                  ) : (
                    <>
                      <Icon size={17} weight="bold" className={provider.color} />
                      <span className="font-medium">Continue with {provider.name}</span>
                    </>
                  )}
                </Button>

                {isActiveSAML && (
                  <div className="brand-panel-surface mt-2.5 space-y-3 rounded-md border p-3 animate-in slide-in-from-top-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="saml-domain" className="text-xs font-semibold text-foreground">
                        Organization Domain
                      </Label>
                      <Input
                        id="saml-domain"
                        type="text"
                        placeholder="company.com"
                        value={samlDomain}
                        onChange={(e) => setSamlDomain(e.target.value)}
                        className="h-10 border-[var(--gvx-hero-border)] bg-background text-sm text-foreground focus:border-[var(--gvx-hero-accent)] focus:ring-[var(--gvx-hero-accent-soft)]"
                      />
                      <p className="brand-muted-text text-xs">
                        Enter your organization's domain to connect to your SAML identity provider
                      </p>
                    </div>
                    <Button
                      onClick={() => handleSSOLogin("saml")}
                      className="h-10 w-full rounded-md border border-[var(--gvx-hero-border-strong)] bg-[linear-gradient(135deg,var(--gvx-hero-accent),var(--gvx-hero-accent-2))] text-sm font-semibold text-white shadow-[0_12px_26px_-22px_rgba(0,143,240,0.78)] hover:brightness-95"
                      disabled={!samlDomain || isLoading === "saml"}
                    >
                      {isLoading === "saml" ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Authenticating...
                        </span>
                      ) : (
                        "Continue with SAML"
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="border-t border-[var(--gvx-hero-border)] pt-3">
        <p className="brand-muted-text text-center text-xs">
          SSO authentication is configured by your organization administrator
        </p>
      </div>
    </div>
  )
}
