import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { usePersistentKV } from "@/hooks/use-persistent-kv"
import { Fingerprint, DeviceMobile, Desktop, Trash, Plus, CheckCircle, Clock } from "@phosphor-icons/react"
import { toast } from "sonner"

interface BiometricDevice {
  id: string
  name: string
  type: "fingerprint" | "face_id" | "windows_hello"
  deviceType: "mobile" | "desktop" | "laptop"
  registeredAt: string
  lastUsed: string
  platform: string
  trusted: boolean
}

export function SettingsPage() {
  const [biometricDevices, setBiometricDevices] = usePersistentKV<BiometricDevice[]>("biometric-devices", [
    {
      id: "bio-001",
      name: "iPhone 15 Pro",
      type: "face_id",
      deviceType: "mobile",
      registeredAt: "2024-01-15T10:30:00Z",
      lastUsed: "2024-01-20T08:45:00Z",
      platform: "iOS 17.2",
      trusted: true
    },
    {
      id: "bio-002",
      name: "MacBook Pro",
      type: "fingerprint",
      deviceType: "laptop",
      registeredAt: "2024-01-10T14:20:00Z",
      lastUsed: "2024-01-20T16:30:00Z",
      platform: "macOS 14.2",
      trusted: true
    },
    {
      id: "bio-003",
      name: "Surface Laptop",
      type: "windows_hello",
      deviceType: "laptop",
      registeredAt: "2023-12-20T09:15:00Z",
      lastUsed: "2024-01-18T11:20:00Z",
      platform: "Windows 11",
      trusted: false
    }
  ])
  
  const [deviceToRemove, setDeviceToRemove] = useState<BiometricDevice | null>(null)
  const [showRemoveDialog, setShowRemoveDialog] = useState(false)

  const handleRemoveDevice = (device: BiometricDevice) => {
    setDeviceToRemove(device)
    setShowRemoveDialog(true)
  }

  const confirmRemoveDevice = () => {
    if (deviceToRemove) {
      setBiometricDevices((current) => (current || []).filter(d => d.id !== deviceToRemove.id))
      toast.success(`Removed ${deviceToRemove.name}`, {
        description: "Biometric credentials have been revoked for this device"
      })
      setDeviceToRemove(null)
      setShowRemoveDialog(false)
    }
  }

  const handleAddDevice = () => {
    toast.info("Device Registration", {
      description: "Open the mobile app or use your browser to register a new biometric device"
    })
  }

  const getBiometricIcon = (type: BiometricDevice["type"]) => {
    switch (type) {
      case "fingerprint":
        return <Fingerprint className="w-5 h-5" />
      case "face_id":
        return <DeviceMobile className="w-5 h-5" />
      case "windows_hello":
        return <Desktop className="w-5 h-5" />
    }
  }

  const getDeviceIcon = (deviceType: BiometricDevice["deviceType"]) => {
    switch (deviceType) {
      case "mobile":
        return <DeviceMobile className="w-10 h-10" />
      case "desktop":
      case "laptop":
        return <Desktop className="w-10 h-10" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your security platform preferences</p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Biometric Credentials</CardTitle>
                <CardDescription>Manage registered biometric devices for authentication</CardDescription>
              </div>
              <Button onClick={handleAddDevice} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Device
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {(biometricDevices || []).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Fingerprint className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">No Biometric Devices</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Register a device to enable fingerprint or face recognition login
                </p>
                <Button onClick={handleAddDevice} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Register First Device
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {(biometricDevices || []).map((device) => (
                  <div
                    key={device.id}
                    className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-secondary/20 transition-colors"
                  >
                    <div className="flex-shrink-0 text-muted-foreground mt-1">
                      {getDeviceIcon(device.deviceType)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-base">{device.name}</h4>
                          {device.trusted && (
                            <Badge variant="secondary" className="gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Trusted
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveDevice(device)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 -mr-2"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1.5">
                          {getBiometricIcon(device.type)}
                          <span className="capitalize">
                            {device.type === "face_id" ? "Face ID" : device.type === "windows_hello" ? "Windows Hello" : "Fingerprint"}
                          </span>
                        </div>
                        <span>•</span>
                        <span>{device.platform}</span>
                      </div>

                      <div className="flex items-start gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Registered: {formatDate(device.registeredAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Last used: {formatDate(device.lastUsed)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Security Operator" className="bg-secondary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="operator@guardivex" className="bg-secondary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="SOC Analyst" disabled className="bg-secondary" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Critical Alert Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive immediate notifications for critical security alerts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Incident Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when incidents are updated or resolved
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Device Status Changes</Label>
                <p className="text-sm text-muted-foreground">
                  Alerts when devices go offline or come back online
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Receive weekly security summary reports via email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" className="bg-secondary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" className="bg-secondary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" className="bg-secondary" />
            </div>
            <Button>Update Password</Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Display</CardTitle>
            <CardDescription>Customize your dashboard appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-refresh Dashboard</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically update metrics every 30 seconds
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compact Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Display more information in less space
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Biometric Device</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{deviceToRemove?.name}</strong>? 
              This device will no longer be able to authenticate using biometric credentials. 
              You can re-register it later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmRemoveDevice}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove Device
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}