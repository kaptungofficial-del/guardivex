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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold mb-2">Enterprise Single Sign-On</h3>
        <p className="text-sm text-muted-foreground mb-4">Use your organization identity provider to access the Guardivex command center.</p>
        <div className="grid grid-cols-1 gap-3">
          {ssoProviders.map((provider) => {
            const Icon = provider.icon
            const isActiveSAML = provider.id === "saml" && showSAMLInput

            return (
              <div key={provider.id}>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start gap-3 bg-background/60 hover:bg-background border-border/70 hover:border-primary/50 transition-all shadow-sm"
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
                      <Icon size={20} weight="bold" className={provider.color} />
                      <span className="font-medium">Continue with {provider.name}</span>
                    </>
                  )}
                </Button>

                {isActiveSAML && (
                  <div className="mt-3 p-4 bg-secondary/30 rounded-lg border border-border/50 space-y-3 animate-in slide-in-from-top-2 shadow-sm">
                    <div className="space-y-2">
                      <Label htmlFor="saml-domain" className="text-sm font-medium">
                        Organization Domain
                      </Label>
                      <Input
                        id="saml-domain"
                        type="text"
                        placeholder="company.com"
                        value={samlDomain}
                        onChange={(e) => setSamlDomain(e.target.value)}
                        className="h-10 bg-background border-input focus:border-primary"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter your organization's domain to connect to your SAML identity provider
                      </p>
                    </div>
                    <Button
                      onClick={() => handleSSOLogin("saml")}
                      className="w-full h-10 bg-primary hover:bg-primary/90"
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

      <div className="pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground text-center">
          SSO authentication is configured by your organization administrator
        </p>
      </div>
    </div>
  )
}
