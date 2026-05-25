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
        <h3 className="mb-1.5 text-base font-heading font-semibold text-[#07111F] dark:text-[#F8FAFC]">Enterprise Single Sign-On</h3>
        <p className="mb-3 text-xs leading-relaxed text-[#64748B] dark:text-slate-400">Use your organization identity provider to access the Guardivex command center.</p>
        <div className="grid grid-cols-1 gap-2.5">
          {ssoProviders.map((provider) => {
            const Icon = provider.icon
            const isActiveSAML = provider.id === "saml" && showSAMLInput

            return (
              <div key={provider.id}>
                <Button
                  variant="outline"
                  className="h-10 w-full justify-start gap-2.5 rounded-md border-[#CFE0EF] bg-[#F8FBFF] text-sm text-[#07111F] shadow-none transition-all hover:border-[#008FC7]/40 hover:bg-white dark:border-cyan-300/12 dark:bg-[#071426]/72 dark:text-[#F8FAFC] dark:hover:border-cyan-300/24 dark:hover:bg-[#061426]"
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
                  <div className="mt-2.5 space-y-3 rounded-md border border-[#CFE0EF] bg-[#F8FBFF] p-3 animate-in slide-in-from-top-2 dark:border-cyan-300/12 dark:bg-[#071426]/72">
                    <div className="space-y-1.5">
                      <Label htmlFor="saml-domain" className="text-xs font-semibold text-[#334155] dark:text-slate-200">
                        Organization Domain
                      </Label>
                      <Input
                        id="saml-domain"
                        type="text"
                        placeholder="company.com"
                        value={samlDomain}
                        onChange={(e) => setSamlDomain(e.target.value)}
                        className="h-10 border-[#CFE0EF] bg-white text-sm text-[#07111F] focus:border-[#008FC7] focus:ring-[#008FC7]/15 dark:border-cyan-300/12 dark:bg-[#061426] dark:text-[#F8FAFC] dark:focus:border-cyan-300"
                      />
                      <p className="text-xs text-[#64748B] dark:text-slate-400">
                        Enter your organization's domain to connect to your SAML identity provider
                      </p>
                    </div>
                    <Button
                      onClick={() => handleSSOLogin("saml")}
                      className="h-10 w-full rounded-md border border-[#0077CC]/30 bg-gradient-to-r from-[#0077CC] to-[#00A7A8] text-sm font-semibold text-white shadow-[0_12px_26px_-22px_rgba(0,119,204,0.78)] hover:from-[#006AB8] hover:to-[#009896] dark:from-[#0077ff] dark:to-[#00d6c4] dark:hover:from-[#006eea] dark:hover:to-[#00c5b5]"
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

      <div className="border-t border-[#CFE0EF] pt-3 dark:border-cyan-300/10">
        <p className="text-center text-xs text-[#64748B] dark:text-slate-400">
          SSO authentication is configured by your organization administrator
        </p>
      </div>
    </div>
  )
}
