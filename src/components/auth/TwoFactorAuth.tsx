import { useState, useEffect } from "react"
import { ShieldCheck, ArrowLeft, CheckCircle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { toast } from "sonner"

interface TwoFactorAuthProps {
  email: string
  onVerified: () => void
  onBack: () => void
  method: "email" | "authenticator"
}

export function TwoFactorAuth({ email, onVerified, onBack, method }: TwoFactorAuthProps) {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    if (method === "email") {
      toast.success("Verification code sent to your email")
    }
  }, [method])

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleVerify = async () => {
    if (code.length !== 6) {
      toast.error("Please enter a complete 6-digit code")
      return
    }

    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success("Two-factor authentication successful", {
      icon: <CheckCircle size={20} weight="fill" className="text-success" />
    })

    setTimeout(() => {
      onVerified()
    }, 500)
  }

  const handleResend = async () => {
    if (resendCooldown > 0) return

    setResendCooldown(30)
    toast.success("New verification code sent")
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:gap-3 group"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        <span>Back to login</span>
      </button>

      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse" />
          <div className="relative w-20 h-20 bg-gradient-to-br from-primary/30 to-accent/20 rounded-2xl flex items-center justify-center border border-primary/40 shadow-lg shadow-primary/20">
            <ShieldCheck size={44} weight="bold" className="text-primary" />
          </div>
        </div>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-2xl font-heading">Two-Factor Authentication</CardTitle>
          <CardDescription className="text-base">
            {method === "email" 
              ? `We've sent a 6-digit code to ${email}`
              : "Enter the code from your authenticator app"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(value) => setCode(value)}
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-14 text-xl border-input focus:border-primary" />
                  <InputOTPSlot index={1} className="w-12 h-14 text-xl border-input focus:border-primary" />
                  <InputOTPSlot index={2} className="w-12 h-14 text-xl border-input focus:border-primary" />
                  <InputOTPSlot index={3} className="w-12 h-14 text-xl border-input focus:border-primary" />
                  <InputOTPSlot index={4} className="w-12 h-14 text-xl border-input focus:border-primary" />
                  <InputOTPSlot index={5} className="w-12 h-14 text-xl border-input focus:border-primary" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {method === "email" && (
              <div className="text-center">
                <button
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                  className="text-sm text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendCooldown > 0 
                    ? `Resend code in ${resendCooldown}s` 
                    : "Resend code"
                  }
                </button>
              </div>
            )}
          </div>

          <Button 
            onClick={handleVerify}
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
            disabled={isLoading || code.length !== 6}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              "Verify & Continue"
            )}
          </Button>

          <div className="pt-4 border-t border-border/50">
            <p className="text-center text-xs text-muted-foreground">
              Having trouble? <button className="text-primary hover:text-primary/80 transition-colors">Contact support</button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
