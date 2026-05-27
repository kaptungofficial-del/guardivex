import { useState } from "react"
import { Envelope, Lock, Eye, EyeSlash, CheckCircle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthShell } from "@/components/auth/AuthShell"
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
    <AuthShell
      backLabel="Back to Login"
      onBack={handleBackToLogin}
      title="Recover access without weakening security posture."
      subtitle="Reset credentials through a controlled verification flow designed for enterprise teams operating under continuous monitoring and audit requirements."
    >
      <Card className="bg-card/65 backdrop-blur-xl border-border/65 shadow-2xl shadow-black/15">
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
    </AuthShell>
  )
}
