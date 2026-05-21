import { useState } from "react"
import { ShieldCheck, ArrowLeft, Eye, EyeSlash, Lock, Envelope, User, Buildings } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { AuthShell } from "@/components/auth/AuthShell"
import { toast } from "sonner"

interface RegisterPageProps {
  onRegister: () => void
  onBackToLogin: () => void
}

export function RegisterPage({ onRegister, onBackToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    if (!agreedToTerms) {
      toast.error("Please agree to the terms and conditions")
      return
    }

    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 2000))

    toast.success("Registration successful! Please verify your email.")
    
    setTimeout(() => {
      onRegister()
    }, 500)
  }

  const passwordStrength = () => {
    const password = formData.password
    if (password.length === 0) return { strength: 0, label: "" }
    if (password.length < 8) return { strength: 25, label: "Weak", color: "bg-destructive" }
    if (password.length < 12) return { strength: 50, label: "Fair", color: "bg-warning" }
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)) {
      return { strength: 100, label: "Strong", color: "bg-success" }
    }
    return { strength: 75, label: "Good", color: "bg-info" }
  }

  const strength = passwordStrength()

  return (
    <AuthShell
      backLabel="Back to Login"
      onBack={onBackToLogin}
      title="Provision a secure operator workspace."
      subtitle="Create a guardivex account for your team and onboard your organization into the SOC command center with enterprise-grade access controls."
    >
      <Card className="bg-card/65 backdrop-blur-xl border-border/65 shadow-2xl shadow-black/15">
            <CardHeader className="space-y-2 sm:space-y-3 pb-4 sm:pb-6">
              <CardTitle className="text-xl sm:text-2xl font-heading font-bold text-center">Register</CardTitle>
              <CardDescription className="text-center text-xs sm:text-sm">
                Fill in your details to create a new account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 sm:space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-semibold text-foreground/90">First Name</Label>
                    <div className="relative group">
                      <User 
                        size={18} 
                        weight="duotone"
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none z-10"
                      />
                      <Input
                        id="firstName"
                        type="text"
                        className="pl-11 h-11 sm:h-12 bg-background/80 border-input hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base shadow-sm"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-semibold text-foreground/90">Last Name</Label>
                    <div className="relative group">
                      <User 
                        size={18} 
                        weight="duotone"
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none z-10"
                      />
                      <Input
                        id="lastName"
                        type="text"
                        className="pl-11 h-11 sm:h-12 bg-background/80 border-input hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base shadow-sm"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

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
                      className="pl-11 h-11 sm:h-12 bg-background/80 border-input hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base shadow-sm"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-sm font-semibold text-foreground/90">Organization</Label>
                  <div className="relative group">
                    <Buildings 
                      size={18} 
                      weight="duotone"
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none z-10"
                    />
                    <Input
                      id="organization"
                      type="text"
                      className="pl-11 h-11 sm:h-12 bg-background/80 border-input hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base shadow-sm"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-foreground/90">Password</Label>
                  <div className="relative group">
                    <Lock 
                      size={18} 
                      weight="duotone"
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none z-10"
                    />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-11 pr-11 h-11 sm:h-12 bg-background/80 border-input hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base shadow-sm"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      disabled={isLoading}
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
                  {formData.password && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Password strength</span>
                        <span className={`font-medium ${strength.color?.replace('bg-', 'text-') || ''}`}>{strength.label}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${strength.color || 'bg-muted'} transition-all duration-300`}
                          style={{ width: `${strength.strength}%` }}
                        />
                      </div>
                    </div>
                  )}
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
                      className="pl-11 pr-11 h-11 sm:h-12 bg-background/80 border-input hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base shadow-sm"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                      disabled={isLoading}
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

                <div className="flex items-start gap-2.5 pt-2">
                  <Checkbox 
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                    className="mt-0.5 w-4 h-4 rounded border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary touch-manipulation"
                  />
                  <label htmlFor="terms" className="text-xs sm:text-sm text-muted-foreground leading-relaxed cursor-pointer select-none hover:text-foreground transition-colors">
                    I agree to the <button type="button" className="text-primary hover:text-primary/80 transition-colors font-medium active:scale-95">Terms of Service</button> and <button type="button" className="text-primary hover:text-primary/80 transition-colors font-medium active:scale-95">Privacy Policy</button>
                  </label>
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 active:scale-[0.98] transition-all duration-200 text-base mt-5 sm:mt-6 touch-manipulation"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2.5">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span className="hidden sm:inline">Creating Account...</span>
                      <span className="sm:hidden">Creating...</span>
                    </span>
                  ) : (
                    <>
                      <ShieldCheck size={20} weight="bold" className="mr-2" />
                      <span className="hidden sm:inline">Create Account</span>
                      <span className="sm:hidden">Register</span>
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-border/50 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Already have an account? <button type="button" onClick={onBackToLogin} className="text-primary hover:text-primary/80 transition-colors font-semibold hover:underline active:scale-95">Sign in</button>
                </p>
              </div>
            </CardContent>
      </Card>
    </AuthShell>
  )
}

