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
import type { LoginCredentials } from "@/lib/api"

interface LoginPageProps {
  onLogin: (credentials: LoginCredentials) => Promise<void> | void
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

    try {
      if (require2FA) {
        setShow2FA(true)
        toast.success("Login successful! Please complete 2FA verification")
        return
      }

      await onLogin({ email, password })
    } catch (error) {
      toast.error("Unable to sign in", {
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handle2FAVerified = () => {
    void onLogin({ email, password })
  }

  const handleSSOSuccess = () => {
    toast.info("SSO is ready for backend provider configuration")
  }

  const handleBiometricVerified = () => {
    toast.info("Biometric login requires backend WebAuthn verification")
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
        onSkip={() => setShowBiometric(false)}
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
      <Card className="rounded-xl border-[#CFE0EF] bg-white/92 shadow-[0_18px_54px_-42px_rgba(7,17,31,0.36)] backdrop-blur-xl dark:border-cyan-300/14 dark:bg-[#051225]/84 dark:shadow-[0_24px_70px_-50px_rgba(0,194,255,0.42)]">
            <CardHeader className="space-y-1.5 pb-3 sm:pb-4">
              <CardTitle className="text-lg font-heading font-semibold tracking-[-0.01em] text-[#07111F] sm:text-xl dark:text-[#F8FAFC]">Sign In</CardTitle>
              <CardDescription className="text-xs text-[#64748B] sm:text-sm dark:text-slate-400">
                Access your security operations center
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-5">
              <Tabs defaultValue="credentials" className="w-full">
                <TabsList className={`grid w-full ${biometricSupported ? 'grid-cols-3' : 'grid-cols-2'} mb-4 h-auto rounded-lg border border-[#CFE0EF] bg-[#F8FBFF] p-1 dark:border-cyan-300/12 dark:bg-[#071426]/72`}>
                  <TabsTrigger value="credentials" className="gap-1.5 rounded-md py-1.5 text-xs font-semibold text-[#64748B] data-[state=active]:bg-white data-[state=active]:text-[#07111F] data-[state=active]:shadow-[0_8px_20px_-18px_rgba(7,17,31,0.32)] sm:py-2 dark:text-slate-400 dark:data-[state=active]:bg-[#061426] dark:data-[state=active]:text-white">
                    <Lock size={14} weight="bold" className="sm:mr-1" />
                    <span>Password</span>
                  </TabsTrigger>
                  {biometricSupported && (
                    <TabsTrigger value="biometric" className="gap-1.5 rounded-md py-1.5 text-xs font-semibold text-[#64748B] data-[state=active]:bg-white data-[state=active]:text-[#07111F] data-[state=active]:shadow-[0_8px_20px_-18px_rgba(7,17,31,0.32)] sm:py-2 dark:text-slate-400 dark:data-[state=active]:bg-[#061426] dark:data-[state=active]:text-white">
                      <Fingerprint size={14} weight="bold" className="sm:mr-1" />
                      <span>Biometric</span>
                    </TabsTrigger>
                  )}
                  <TabsTrigger value="sso" className="gap-1.5 rounded-md py-1.5 text-xs font-semibold text-[#64748B] data-[state=active]:bg-white data-[state=active]:text-[#07111F] data-[state=active]:shadow-[0_8px_20px_-18px_rgba(7,17,31,0.32)] sm:py-2 dark:text-slate-400 dark:data-[state=active]:bg-[#061426] dark:data-[state=active]:text-white">
                    <CheckCircle size={14} weight="bold" className="sm:mr-1" />
                    <span>SSO</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="credentials" className="mt-0">
                  <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-semibold text-[#334155] dark:text-slate-200">
                        Email Address
                      </Label>
                      <div className="relative group">
                        <Envelope 
                          size={16} 
                          weight="duotone"
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] transition-colors pointer-events-none z-10 group-focus-within:text-[#008FC7] dark:text-slate-500 dark:group-focus-within:text-cyan-300"
                        />
                        <Input
                          id="email"
                          type="email"
                          placeholder="operator@guardivex"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className="h-10 border-[#CFE0EF] bg-[#F8FBFF] pl-10 text-sm text-[#07111F] shadow-none transition-all hover:border-[#008FC7]/35 focus:border-[#008FC7] focus:ring-2 focus:ring-[#008FC7]/15 sm:h-10 dark:border-cyan-300/12 dark:bg-[#071426]/72 dark:text-[#F8FAFC] dark:hover:border-cyan-300/24 dark:focus:border-cyan-300 dark:focus:ring-cyan-300/15"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-xs font-semibold text-[#334155] dark:text-slate-200">
                          Password
                        </Label>
                        {onShowPasswordReset && (
                          <button
                            type="button"
                            onClick={onShowPasswordReset}
                            className="text-xs font-semibold text-[#008FC7] transition-colors hover:text-[#0077CC] hover:underline active:scale-95 dark:text-cyan-300 dark:hover:text-cyan-200"
                            tabIndex={-1}
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative group">
                        <Lock 
                          size={16} 
                          weight="duotone"
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] transition-colors pointer-events-none z-10 group-focus-within:text-[#008FC7] dark:text-slate-500 dark:group-focus-within:text-cyan-300"
                        />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="************"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={isLoading}
                          className="h-10 border-[#CFE0EF] bg-[#F8FBFF] pl-10 pr-10 text-sm text-[#07111F] shadow-none transition-all hover:border-[#008FC7]/35 focus:border-[#008FC7] focus:ring-2 focus:ring-[#008FC7]/15 sm:h-10 dark:border-cyan-300/12 dark:bg-[#071426]/72 dark:text-[#F8FAFC] dark:hover:border-cyan-300/24 dark:focus:border-cyan-300 dark:focus:ring-cyan-300/15"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#64748B] transition-colors hover:bg-[#EEF6FB] hover:text-[#07111F] active:scale-95 touch-manipulation z-10 dark:text-slate-500 dark:hover:bg-[#071426] dark:hover:text-white"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeSlash size={16} weight="bold" /> : <Eye size={16} weight="bold" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 pt-0.5">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberDevice}
                        onChange={(e) => setRememberDevice(e.target.checked)}
                        className="h-3.5 w-3.5 cursor-pointer rounded border-[#CFE0EF] accent-[#0077CC] transition-all focus:ring-2 focus:ring-[#008FC7]/20 touch-manipulation dark:border-cyan-300/16"
                      />
                      <label htmlFor="remember" className="cursor-pointer select-none text-xs text-[#64748B] transition-colors hover:text-[#334155] dark:text-slate-400 dark:hover:text-slate-200">
                        Remember this device for 30 days
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      className="mt-4 h-10 w-full rounded-md border border-[#0077CC]/30 bg-gradient-to-r from-[#0077CC] to-[#00A7A8] text-sm font-semibold text-white shadow-[0_12px_26px_-22px_rgba(0,119,204,0.78)] transition-all duration-200 hover:from-[#006AB8] hover:to-[#009896] active:scale-[0.98] sm:h-10 touch-manipulation dark:from-[#0077ff] dark:to-[#00d6c4] dark:hover:from-[#006eea] dark:hover:to-[#00c5b5] dark:shadow-[0_14px_34px_-26px_rgba(0,194,255,0.72)]"
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
                          <ShieldCheck size={17} weight="bold" className="mr-2" />
                          <span className="hidden sm:inline">Sign In to Command Center</span>
                          <span className="sm:hidden">Sign In</span>
                        </>
                      )}
                    </Button>

                    {onShowRegister && (
                      <div className="border-t border-[#CFE0EF] pt-3 text-center dark:border-cyan-300/10">
                        <p className="text-xs text-[#64748B] dark:text-slate-400">
                          Don't have an account? <button type="button" onClick={onShowRegister} className="font-semibold text-[#008FC7] transition-colors hover:text-[#0077CC] hover:underline active:scale-95 dark:text-cyan-300 dark:hover:text-cyan-200">Create Account</button>
                        </p>
                      </div>
                    )}
                  </form>
                </TabsContent>

                <TabsContent value="biometric" className="mt-0">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="biometric-email" className="text-xs font-semibold text-[#334155] dark:text-slate-200">
                        Email Address
                      </Label>
                      <div className="relative group">
                        <Envelope 
                          size={16} 
                          weight="duotone"
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] transition-colors pointer-events-none z-10 group-focus-within:text-[#008FC7] dark:text-slate-500 dark:group-focus-within:text-cyan-300"
                        />
                        <Input
                          id="biometric-email"
                          type="email"
                          placeholder="operator@guardivex"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-10 border-[#CFE0EF] bg-[#F8FBFF] pl-10 text-sm text-[#07111F] shadow-none transition-all hover:border-[#008FC7]/35 focus:border-[#008FC7] focus:ring-2 focus:ring-[#008FC7]/15 sm:h-10 dark:border-cyan-300/12 dark:bg-[#071426]/72 dark:text-[#F8FAFC] dark:hover:border-cyan-300/24 dark:focus:border-cyan-300 dark:focus:ring-cyan-300/15"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 rounded-md border border-[#CFE0EF] bg-[#F8FBFF] p-3.5 shadow-[0_8px_20px_-20px_rgba(7,17,31,0.3)] backdrop-blur-sm dark:border-cyan-300/12 dark:bg-[#071426]/72 dark:shadow-none">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-[#CFE0EF] bg-white shadow-[0_8px_20px_-20px_rgba(7,17,31,0.3)] dark:border-cyan-300/12 dark:bg-[#061426] dark:shadow-none">
                          <Fingerprint size={22} className="text-[#008FC7] dark:text-cyan-300" weight="duotone" />
                        </div>
                        <div className="space-y-1 flex-1 pt-0.5">
                          <p className="text-sm font-semibold text-[#07111F] dark:text-white">Quick & Secure Authentication</p>
                          <p className="text-xs leading-relaxed text-[#64748B] dark:text-slate-400">
                            Use your fingerprint, Face ID, or Windows Hello for instant secure access
                          </p>
                        </div>
                      </div>
                      <div className="border-t border-[#CFE0EF] pt-2 dark:border-cyan-300/10">
                        <p className="text-xs leading-relaxed text-[#64748B] dark:text-slate-400">
                          <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-300">
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
                      className="h-10 w-full rounded-md border border-[#0077CC]/30 bg-gradient-to-r from-[#0077CC] to-[#00A7A8] text-sm font-semibold text-white shadow-[0_12px_26px_-22px_rgba(0,119,204,0.78)] transition-all duration-200 hover:from-[#006AB8] hover:to-[#009896] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation dark:from-[#0077ff] dark:to-[#00d6c4] dark:hover:from-[#006eea] dark:hover:to-[#00c5b5] dark:shadow-[0_14px_34px_-26px_rgba(0,194,255,0.72)]"
                    >
                      <Fingerprint size={17} weight="bold" className="mr-2" />
                      Continue with Biometric
                    </Button>

                    {biometricCredentials && biometricCredentials.some((credential) => credential.email === email) && email && (
                      <div className="flex items-center justify-center gap-2 text-xs text-emerald-600 dark:text-emerald-300">
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

              <div className="border-t border-[#CFE0EF] pt-3 dark:border-cyan-300/10">
                <div className="flex items-center justify-center gap-2 rounded-md border border-[#CFE0EF] bg-[#F8FBFF] px-3 py-2 dark:border-cyan-300/10 dark:bg-[#071426]/62">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-success"></span>
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-300 sm:text-xs">Demo Mode Active</span>
                  </span>
                  <span className="text-[10px] text-[#64748B] sm:text-xs dark:text-slate-400">Use any credentials</span>
                </div>
              </div>
            </CardContent>
          </Card>

            <div className="space-y-1.5 text-center sm:space-y-2">
              <p className="flex items-center justify-center gap-1.5 text-[10px] font-medium text-[#64748B] sm:gap-2 sm:text-xs dark:text-slate-400">
                <Lock size={12} weight="bold" className="text-[#008FC7] dark:text-cyan-300" />
                <span className="hidden sm:inline">Protected by enterprise-grade encryption</span>
                <span className="sm:hidden">Enterprise-grade encryption</span>
              </p>
              <div className="flex items-center justify-center gap-3 text-[10px] text-[#64748B]/80 sm:gap-4 sm:text-xs dark:text-slate-500">
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
