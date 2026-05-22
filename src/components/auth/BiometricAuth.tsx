import { useState, useEffect } from "react"
import { Fingerprint, FingerprintSimple, FaceMask, CheckCircle, Warning, ArrowLeft } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"
import { usePersistentKV } from "@/hooks/use-persistent-kv"
import { AuthShell } from "@/components/auth/AuthShell"

interface BiometricAuthProps {
  email: string
  onVerified: () => void
  onBack: () => void
  onSkip?: () => void
}

type BiometricType = "fingerprint" | "face" | "none"

interface BiometricCredential {
  id: string
  email: string
  type: BiometricType
  createdAt: string
  lastUsed: string
  deviceName: string
}

function getErrorName(error: unknown) {
  return error instanceof Error ? error.name : ""
}

export function BiometricAuth({ email, onVerified, onBack, onSkip }: BiometricAuthProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [availableBiometrics, setAvailableBiometrics] = useState<BiometricType[]>([])
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [registeredCredentials, setRegisteredCredentials] = usePersistentKV<BiometricCredential[]>("biometric-credentials", [])
  const [isRegistering, setIsRegistering] = useState(false)

  useEffect(() => {
    checkBiometricSupport()
  }, [])

  const checkBiometricSupport = async () => {
    if (!window.PublicKeyCredential) {
      setIsSupported(false)
      setError("Biometric authentication is not supported on this device or browser")
      return
    }

    try {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
      setIsSupported(available)

      if (available) {
        const types: BiometricType[] = []
        
        if (navigator.userAgent.includes("Mac") || navigator.userAgent.includes("iPhone") || navigator.userAgent.includes("iPad")) {
          types.push("face")
        }
        
        types.push("fingerprint")
        
        setAvailableBiometrics(types)
      } else {
        setError("No biometric authenticators found on this device")
      }
    } catch (err) {
      console.error("Biometric check failed:", err)
      setIsSupported(false)
      setError("Unable to detect biometric capabilities")
    }
  }

  const getUserCredential = () => {
    return registeredCredentials?.find(cred => cred.email === email)
  }

  const registerBiometric = async (type: BiometricType) => {
    setIsRegistering(true)
    setError(null)

    try {
      const challenge = new Uint8Array(32)
      crypto.getRandomValues(challenge)

      const publicKeyOptions: PublicKeyCredentialCreationOptions = {
        challenge,
        rp: {
          name: "Guardivex Security Platform",
          id: window.location.hostname,
        },
        user: {
          id: new Uint8Array(16),
          name: email,
          displayName: email,
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" },
          { alg: -257, type: "public-key" },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
          requireResidentKey: false,
        },
        timeout: 60000,
        attestation: "none",
      }

      const credential = await navigator.credentials.create({
        publicKey: publicKeyOptions,
      }) as PublicKeyCredential

      if (credential) {
        const newCredential: BiometricCredential = {
          id: credential.id,
          email,
          type,
          createdAt: new Date().toISOString(),
          lastUsed: new Date().toISOString(),
          deviceName: getDeviceName(),
        }

        setRegisteredCredentials((prev) => {
          const filtered = (prev || []).filter(c => c.email !== email)
          return [...filtered, newCredential]
        })

        toast.success(`${type === "face" ? "Face ID" : "Fingerprint"} registered successfully`)
        
        await new Promise(resolve => setTimeout(resolve, 800))
        onVerified()
      }
    } catch (err) {
      console.error("Biometric registration failed:", err)
      const errorName = getErrorName(err)
      
      if (errorName === "NotAllowedError") {
        setError("Biometric registration was cancelled")
      } else if (errorName === "InvalidStateError") {
        setError("A biometric credential is already registered for this device")
      } else {
        setError("Failed to register biometric authentication. Please try again.")
      }
      
      toast.error("Registration failed")
    } finally {
      setIsRegistering(false)
    }
  }

  const authenticateBiometric = async () => {
    setIsAuthenticating(true)
    setError(null)

    const userCred = getUserCredential()
    if (!userCred) {
      setError("No biometric credential found. Please register first.")
      setIsAuthenticating(false)
      return
    }

    try {
      const challenge = new Uint8Array(32)
      crypto.getRandomValues(challenge)

      const publicKeyOptions: PublicKeyCredentialRequestOptions = {
        challenge,
        rpId: window.location.hostname,
        allowCredentials: [{
          id: base64ToArrayBuffer(userCred.id),
          type: "public-key",
          transports: ["internal"],
        }],
        userVerification: "required",
        timeout: 60000,
      }

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyOptions,
      })

      if (assertion) {
        setRegisteredCredentials((prev) =>
          (prev || []).map(cred =>
            cred.email === email
              ? { ...cred, lastUsed: new Date().toISOString() }
              : cred
          )
        )

        toast.success("Biometric authentication successful")
        await new Promise(resolve => setTimeout(resolve, 500))
        onVerified()
      }
    } catch (err) {
      console.error("Biometric authentication failed:", err)
      const errorName = getErrorName(err)
      
      if (errorName === "NotAllowedError") {
        setError("Authentication was cancelled")
      } else if (errorName === "InvalidStateError") {
        setError("Please register your biometric credential first")
      } else {
        setError("Biometric authentication failed. Please try again.")
      }
      
      toast.error("Authentication failed")
    } finally {
      setIsAuthenticating(false)
    }
  }

  const getDeviceName = () => {
    const ua = navigator.userAgent
    if (ua.includes("iPhone")) return "iPhone"
    if (ua.includes("iPad")) return "iPad"
    if (ua.includes("Mac")) return "Mac"
    if (ua.includes("Windows")) return "Windows PC"
    if (ua.includes("Android")) return "Android Device"
    if (ua.includes("Linux")) return "Linux Device"
    return "Unknown Device"
  }

  const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    try {
      const binaryString = atob(base64)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      return bytes.buffer
    } catch {
      return new Uint8Array(0).buffer
    }
  }

  const userCredential = getUserCredential()
  const hasRegistered = !!userCredential

  if (!isSupported) {
    return (
      <AuthShell
        backLabel="Back to Login"
        onBack={onBack}
        title="Use device-bound authentication where available."
        subtitle="Biometric sign-in reduces credential friction while keeping verification tied to the operator device."
      >
        <Card className="w-full max-w-md mx-auto bg-card/65 backdrop-blur-xl border-border/65 shadow-2xl shadow-black/15">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                <Warning size={24} className="text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl font-heading">Biometric Not Available</CardTitle>
                <CardDescription>Your device doesn't support biometric authentication</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <p className="text-sm text-muted-foreground">
              Biometric authentication requires a device with fingerprint sensor or Face ID capability. You can continue with traditional authentication methods.
            </p>

            <div className="flex gap-3 pt-2">
              <Button onClick={onBack} variant="outline" className="flex-1">
                <ArrowLeft size={16} className="mr-2" />
                Go Back
              </Button>
              {onSkip && (
                <Button onClick={onSkip} className="flex-1">
                  Continue Without
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      backLabel="Back to Login"
      onBack={onBack}
      title="Authenticate with hardware-backed local identity."
      subtitle="Use Face ID or fingerprint verification to accelerate sign-in while keeping biometric material on the operator device."
    >
      <Card className="w-full max-w-md mx-auto bg-card/65 backdrop-blur-xl border-border/65 shadow-2xl shadow-black/15">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg animate-pulse" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-primary/30 to-accent/20 rounded-xl flex items-center justify-center border border-primary/40">
                <Fingerprint size={24} weight="bold" className="text-primary" />
              </div>
            </div>
            <div>
              <CardTitle className="text-xl font-heading">
                {hasRegistered ? "Biometric Sign In" : "Set Up Biometric Auth"}
              </CardTitle>
              <CardDescription>
                {hasRegistered ? "Use your biometric to sign in" : "Add fingerprint or Face ID for quick access"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {hasRegistered ? (
          <>
            <div className="p-6 bg-muted/30 rounded-lg border border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {userCredential.type === "face" ? (
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FaceMask size={20} className="text-primary" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FingerprintSimple size={20} className="text-primary" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      {userCredential.type === "face" ? "Face ID" : "Fingerprint"}
                    </p>
                    <p className="text-xs text-muted-foreground">{userCredential.deviceName}</p>
                  </div>
                </div>
                <CheckCircle size={20} className="text-success" weight="fill" />
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Registered: {new Date(userCredential.createdAt).toLocaleDateString()}</p>
                <p>Last used: {new Date(userCredential.lastUsed).toLocaleDateString()}</p>
              </div>
            </div>

            <Button 
              onClick={authenticateBiometric}
              disabled={isAuthenticating}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
            >
              {isAuthenticating ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Fingerprint size={20} weight="bold" />
                  Authenticate with {userCredential.type === "face" ? "Face ID" : "Fingerprint"}
                </span>
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Set up biometric authentication for faster and more secure sign-in. Your biometric data never leaves your device.
              </p>
              
              <div className="grid gap-3">
                {availableBiometrics.includes("face") && (
                  <button
                    onClick={() => registerBiometric("face")}
                    disabled={isRegistering}
                    className="p-4 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center transition-colors">
                        <FaceMask size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-0.5">Face ID</p>
                        <p className="text-xs text-muted-foreground">
                          Use facial recognition to sign in
                        </p>
                      </div>
                    </div>
                  </button>
                )}
                
                {availableBiometrics.includes("fingerprint") && (
                  <button
                    onClick={() => registerBiometric("fingerprint")}
                    disabled={isRegistering}
                    className="p-4 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center transition-colors">
                        <FingerprintSimple size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-0.5">Fingerprint</p>
                        <p className="text-xs text-muted-foreground">
                          Use fingerprint sensor to sign in
                        </p>
                      </div>
                    </div>
                  </button>
                )}
              </div>

              {isRegistering && (
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-center text-muted-foreground">
                    Follow the prompts on your device to register your biometric...
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        <div className="flex gap-3 pt-2">
          <Button onClick={onBack} variant="outline" className="flex-1" disabled={isAuthenticating || isRegistering}>
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          {onSkip && !hasRegistered && (
            <Button onClick={onSkip} variant="secondary" className="flex-1" disabled={isAuthenticating || isRegistering}>
              Skip for Now
            </Button>
          )}
        </div>

        <div className="pt-4 border-t border-border/50">
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
            <p>Your biometric data is stored securely on your device and never transmitted to our servers.</p>
          </div>
        </div>
        </CardContent>
      </Card>
    </AuthShell>
  )
}

