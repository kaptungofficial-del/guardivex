import { useState } from "react"
import { ShieldCheck, ArrowLeft, Envelope, Lock, Eye, EyeSlash, CheckCircle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { toast } from "sonner"

interface PasswordResetProps {
  onComplete: () => void
  onBackToLogin: () => void
}

export function PasswordReset({ onComplete, onBackToLogin }: PasswordResetProps) {
  const [step, setStep] = useState<"email" | "verify" | "newPassword" | "success">("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success("Password reset link sent to your email")
    setStep("verify")
    setIsLoading(false)
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()

    if (code.length !== 6) {
      toast.error("Please enter a valid 6-digit code")
      return
    }

    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success("Code verified successfully")
    setStep("newPassword")
    setIsLoading(false)
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    setStep("success")
    setIsLoading(false)
  }

  const handleBackToLogin = () => {
    if (step === "success") {
      onBackToLogin()
    } else {
      setStep("email")
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.55_0.18_195_/_0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.55_0.18_195_/_0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.55_0.18_195_/_0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.55_0.18_195_/_0.08),transparent_50%)]" />

      <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10">
        <button
          onClick={handleBackToLogin}
          className="flex items-center gap-2 px-3 py-2 sm:gap-2.5 sm:px-4 sm:py-2.5 rounded-lg bg-card/40 backdrop-blur-sm border border-border/50 text-xs sm:text-sm text-foreground/80 hover:text-foreground hover:bg-card/60 hover:border-border transition-all duration-200 group shadow-sm hover:shadow-md active:scale-95"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" weight="bold" />
          <span className="font-medium hidden xs:inline">Back to Login</span>
          <span className="font-medium xs:hidden">Back</span>
        </button>
      </div>

      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10">
        <ThemeSwitcher />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 pt-20 sm:pt-8">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          <div className="flex flex-col items-center gap-4 sm:gap-6 text-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl sm:rounded-3xl flex items-center justify-center border border-primary/30 shadow-2xl shadow-primary/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl sm:rounded-3xl" />
                <ShieldCheck size={44} className="sm:hidden text-primary relative z-10" weight="duotone" />
                <ShieldCheck size={52} className="hidden sm:block text-primary relative z-10" weight="duotone" />
              </div>
            </div>
          </div>

          <Card className="bg-card/60 backdrop-blur-xl border-border/60 shadow-2xl shadow-black/10">
            {step === "email" && (
              <>
                <CardHeader className="space-y-2 sm:space-y-3 pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl font-heading font-bold">Reset Password</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-muted-foreground">
                    Enter your email address and we'll send you a verification code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 sm:space-y-6">
                  <form onSubmit={handleRequestReset} className="space-y-4 sm:space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-foreground/90">Email Address</Label>
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

                    <Button 
                      type="submit" 
                      className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 active:scale-[0.98] transition-all duration-200 text-base mt-5 sm:mt-6 touch-manipulation"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2.5">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          <span className="hidden sm:inline">Sending...</span>
                          <span className="sm:hidden">Sending...</span>
                        </span>
                      ) : (
                        <>
                          <span className="hidden sm:inline">Send Reset Code</span>
                          <span className="sm:hidden">Send Code</span>
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </>
            )}

            {step === "verify" && (
              <>
                <CardHeader className="space-y-2 sm:space-y-3 pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl font-heading font-bold">Enter Verification Code</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-muted-foreground">
                    We've sent a 6-digit code to {email}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 sm:space-y-6">
                  <form onSubmit={handleVerifyCode} className="space-y-4 sm:space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="code" className="text-sm font-semibold text-foreground/90">Verification Code</Label>
                      <Input
                        id="code"
                        type="text"
                        placeholder="000000"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        required
                        maxLength={6}
                        disabled={isLoading}
                        className="h-11 sm:h-12 bg-background/80 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-center text-xl sm:text-2xl tracking-widest font-mono shadow-sm"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 active:scale-[0.98] transition-all duration-200 text-base touch-manipulation"
                      disabled={isLoading || code.length !== 6}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2.5">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Verifying...
                        </span>
                      ) : (
                        "Verify Code"
                      )}
                    </Button>

                    <button
                      type="button"
                      className="w-full text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors font-medium active:scale-95"
                      onClick={() => toast.success("New code sent to your email")}
                    >
                      Resend code
                    </button>
                  </form>
                </CardContent>
              </>
            )}

            {step === "newPassword" && (
              <>
                <CardHeader className="space-y-2 sm:space-y-3 pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl font-heading font-bold">Create New Password</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-muted-foreground">
                    Enter a strong password for your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 sm:space-y-6">
                  <form onSubmit={handleResetPassword} className="space-y-4 sm:space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-sm font-semibold text-foreground/90">New Password</Label>
                      <div className="relative group">
                        <Lock 
                          size={18} 
                          weight="duotone"
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none z-10"
                        />
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          disabled={isLoading}
                          className="pl-11 pr-11 h-11 sm:h-12 bg-background/80 border-input hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-1.5 rounded-md hover:bg-muted/50 active:scale-95 touch-manipulation"
                          tabIndex={-1}
                        >
                          {showNewPassword ? <EyeSlash size={18} weight="bold" /> : <Eye size={18} weight="bold" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground/90">Confirm Password</Label>
                      <div className="relative group">
                        <Lock 
                          size={18} 
                          weight="duotone"
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none z-10"
                        />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          disabled={isLoading}
                          className="pl-11 pr-11 h-11 sm:h-12 bg-background/80 border-input hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-1.5 rounded-md hover:bg-muted/50 active:scale-95 touch-manipulation"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? <EyeSlash size={18} weight="bold" /> : <Eye size={18} weight="bold" />}
                        </button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 active:scale-[0.98] transition-all duration-200 text-base mt-5 sm:mt-6 touch-manipulation"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2.5">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          <span className="hidden sm:inline">Resetting Password...</span>
                          <span className="sm:hidden">Resetting...</span>
                        </span>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </>
            )}

            {step === "success" && (
              <>
                <CardHeader className="space-y-2 sm:space-y-3 pb-4 sm:pb-6">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-success/20 rounded-full flex items-center justify-center">
                      <CheckCircle size={28} className="sm:hidden text-success" weight="fill" />
                      <CheckCircle size={32} className="hidden sm:block text-success" weight="fill" />
                    </div>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-heading font-bold text-center">Password Reset Successful</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-muted-foreground text-center">
                    Your password has been successfully reset
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={onComplete}
                    className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 active:scale-[0.98] transition-all duration-200 text-base touch-manipulation"
                  >
                    <span className="hidden sm:inline">Continue to Login</span>
                    <span className="sm:hidden">Continue</span>
                  </Button>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
