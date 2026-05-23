import { useState, useEffect } from "react"
import { ShieldCheck, Eye, EyeSlash, Lock, Envelope, Fingerprint, CheckCircle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TwoFactorAuth } from "@/components/auth/TwoFactorAuth"
import { SSOLogin } from "@/components/auth/SSOLogin"
import { BiometricAuth } from "@/components/auth/BiometricAuth"
import { AuthShell } from "@/components/auth/AuthShell"
import { toast } from "sonner"
import { usePersistentKV } from "@/hooks/use-persistent-kv"

interface LoginPageProps {
  onLogin: () => void
  onBackToWebsite: () => void
  onShowRegister?: () => void
  onShowPasswordReset?: () => void
}

interface StoredBiometricCredential {
  email: string
}

export function LoginPage({ onLogin, onBackToWebsite, onShowRegister, onShowPasswordReset }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [show2FA, setShow2FA] = useState(false)
  const [showBiometric, setShowBiometric] = useState(false)
  const [require2FA] = useState(false)
  const [biometricSupported, setBiometricSupported] = useState(false)
  const [biometricCredentials] = usePersistentKV<StoredBiometricCredential[]>("biometric-credentials", [])
  const [rememberDevice, setRememberDevice] = useState(false)
  
  useEffect(() => {
    checkBiometricSupport()
  }, [])

  const checkBiometricSupport = async () => {
    if (window.PublicKeyCredential) {
      try {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        setBiometricSupported(available)
      } catch {
        setBiometricSupported(false)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    if (require2FA) {
      setShow2FA(true)
      setIsLoading(false)
      toast.success("Login successful! Please complete 2FA verification")
    } else {
      onLogin()
    }
  }

  const handle2FAVerified = () => {
    onLogin()
  }

  const handleSSOSuccess = () => {
    onLogin()
  }

  const handleBiometricVerified = () => {
    onLogin()
  }

  const handleShowBiometric = () => {
    if (email) {
      setShowBiometric(true)
    } else {
      toast.error("Please enter your email address first")
    }
  }

  if (showBiometric) {
    return (
      <BiometricAuth
        email={email}
        onVerified={handleBiometricVerified}
        onBack={() => setShowBiometric(false)}
        onSkip={onLogin}
      />
    )
  }

  if (show2FA) {
    return (
      <TwoFactorAuth
        email={email}
        method="email"
        onVerified={handle2FAVerified}
        onBack={() => setShow2FA(false)}
      />
    )
  }

  return (
    <AuthShell
      backLabel="Back to Website"
      onBack={onBackToWebsite}
      title="Command and secure every site from one control plane."
      subtitle="Unified visibility across cameras, access control, alarms, networks, and incident response with enterprise-grade access controls."
    >
      <Card className="bg-card/65 backdrop-blur-xl border-border/65 shadow-2xl shadow-black/15">
            <CardHeader className="space-y-2 sm:space-y-2.5 pb-4 sm:pb-5">
              <CardTitle className="text-xl sm:text-2xl font-heading font-bold">Sign In</CardTitle>
              <CardDescription className="text-sm sm:text-base text-muted-foreground">
                Access your security operations center
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 sm:space-y-6">
              <Tabs defaultValue="credentials" className="w-full">
                <TabsList className={`grid w-full ${biometricSupported ? 'grid-cols-3' : 'grid-cols-2'} mb-5 sm:mb-6 p-1 h-auto bg-muted/50`}>
                  <TabsTrigger value="credentials" className="data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5 sm:py-2.5 text-sm gap-2">
                    <Lock size={16} weight="bold" className="sm:mr-2" />
                    <span>Password</span>
                  </TabsTrigger>
                  {biometricSupported && (
                    <TabsTrigger value="biometric" className="data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5 sm:py-2.5 text-sm gap-2">
                      <Fingerprint size={16} weight="bold" className="sm:mr-2" />
                      <span>Biometric</span>
                    </TabsTrigger>
                  )}
                  <TabsTrigger value="sso" className="data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5 sm:py-2.5 text-sm gap-2">
                    <CheckCircle size={16} weight="bold" className="sm:mr-2" />
                    <span>SSO</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="credentials" className="mt-0">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-foreground/90">
                        Email Address
                      </Label>
                      <div className="relative group">
                        <Envelope 
                          size={18} 
                          weight="duotone"
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none z-10"
                        />
                        <Input
                          id="email"
                          type="email"
                          placeholder="operator@guardivex"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className="pl-11 h-11 sm:h-12 bg-background/80 border-input hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-sm font-semibold text-foreground/90">
                          Password
                        </Label>
                        {onShowPasswordReset && (
                          <button
                            type="button"
                            onClick={onShowPasswordReset}
                            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors hover:underline active:scale-95"
                            tabIndex={-1}
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative group">
                        <Lock 
                          size={18} 
                          weight="duotone"
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none z-10"
                        />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="************"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={isLoading}
                          className="pl-11 pr-11 h-11 sm:h-12 bg-background/80 border-input hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-1.5 rounded-md hover:bg-muted/50 active:scale-95 touch-manipulation"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeSlash size={18} weight="bold" /> : <Eye size={18} weight="bold" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberDevice}
                        onChange={(e) => setRememberDevice(e.target.checked)}
                        className="w-4 h-4 rounded border-input accent-primary cursor-pointer focus:ring-2 focus:ring-primary/20 transition-all touch-manipulation"
                      />
                      <label htmlFor="remember" className="text-xs sm:text-sm text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors">
                        Remember this device for 30 days
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 active:scale-[0.98] transition-all duration-200 text-base mt-5 sm:mt-6 touch-manipulation"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2.5">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          <span className="hidden sm:inline">Authenticating...</span>
                          <span className="sm:hidden">Loading...</span>
                        </span>
                      ) : (
                        <>
                          <ShieldCheck size={20} weight="bold" className="mr-2" />
                          <span className="hidden sm:inline">Sign In to Command Center</span>
                          <span className="sm:hidden">Sign In</span>
                        </>
                      )}
                    </Button>

                    {onShowRegister && (
                      <div className="pt-4 sm:pt-5 text-center border-t border-border/50">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Don't have an account? <button type="button" onClick={onShowRegister} className="text-primary hover:text-primary/80 transition-colors font-semibold hover:underline active:scale-95">Create Account</button>
                        </p>
                      </div>
                    )}
                  </form>
                </TabsContent>

                <TabsContent value="biometric" className="mt-0">
                  <div className="space-y-5 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="biometric-email" className="text-sm font-semibold text-foreground/90">
                        Email Address
                      </Label>
                      <div className="relative group">
                        <Envelope 
                          size={18} 
                          weight="duotone"
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none z-10"
                        />
                        <Input
                          id="biometric-email"
                          type="email"
                          placeholder="operator@guardivex"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-11 h-11 sm:h-12 bg-background/80 border-input hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/20 backdrop-blur-sm space-y-3 sm:space-y-4">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/10">
                          <Fingerprint size={24} className="sm:hidden text-primary" weight="duotone" />
                          <Fingerprint size={28} className="hidden sm:block text-primary" weight="duotone" />
                        </div>
                        <div className="space-y-1 sm:space-y-1.5 flex-1 pt-0.5 sm:pt-1">
                          <p className="font-semibold text-xs sm:text-sm text-foreground">Quick & Secure Authentication</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Use your fingerprint, Face ID, or Windows Hello for instant secure access
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-primary/10">
                        <p className="text-xs text-muted-foreground/80 leading-relaxed">
                          <span className="inline-flex items-center gap-1.5 text-success">
                            <CheckCircle size={14} weight="fill" />
                            <span className="font-medium">Private & Secure</span>
                          </span>
                          <span className="mx-1.5">.</span>
                          <span className="hidden sm:inline">Your biometric data never leaves your device</span>
                          <span className="sm:hidden">Data stays on device</span>
                        </p>
                      </div>
                    </div>

                    <Button 
                      onClick={handleShowBiometric}
                      disabled={!email}
                      className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 active:scale-[0.98] transition-all duration-200 text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    >
                      <Fingerprint size={20} weight="bold" className="mr-2.5" />
                      Continue with Biometric
                    </Button>

                    {biometricCredentials && biometricCredentials.some((credential) => credential.email === email) && email && (
                      <div className="flex items-center justify-center gap-2 text-xs text-success">
                        <CheckCircle size={16} weight="fill" />
                        <span className="font-medium hidden sm:inline">Biometric credential registered for this account</span>
                        <span className="font-medium sm:hidden">Credential registered</span>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="sso" className="mt-0">
                  <SSOLogin onSuccess={handleSSOSuccess} />
                </TabsContent>
              </Tabs>

              <div className="pt-4 sm:pt-5 border-t border-border/50">
                <div className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-muted/30 rounded-lg border border-border/40">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-success"></span>
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold text-success">Demo Mode Active</span>
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">Use any credentials</span>
                </div>
              </div>
            </CardContent>
          </Card>

            <div className="text-center space-y-1.5 sm:space-y-2.5">
              <p className="text-[10px] sm:text-xs text-muted-foreground font-medium flex items-center justify-center gap-1.5 sm:gap-2">
                <Lock size={12} weight="bold" className="text-primary" />
                <span className="hidden sm:inline">Protected by enterprise-grade encryption</span>
                <span className="sm:hidden">Enterprise-grade encryption</span>
              </p>
              <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground/70">
                <span className="font-mono">v3.2.1</span>
                <span aria-hidden="true">|</span>
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
                  Server Online
                </span>
              </div>
            </div>
    </AuthShell>
  )
}
