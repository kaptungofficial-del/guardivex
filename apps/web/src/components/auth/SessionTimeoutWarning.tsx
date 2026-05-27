import { useEffect, useState, useCallback } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, ShieldWarning } from "@phosphor-icons/react"

interface SessionTimeoutWarningProps {
  onLogout: () => void
  onExtendSession: () => void
  sessionDurationMs?: number
  warningThresholdMs?: number
}

export function SessionTimeoutWarning({
  onLogout,
  onExtendSession,
  sessionDurationMs = 30 * 60 * 1000,
  warningThresholdMs = 5 * 60 * 1000
}: SessionTimeoutWarningProps) {
  const [showWarning, setShowWarning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(warningThresholdMs)
  const [lastActivity, setLastActivity] = useState(Date.now())

  const resetActivity = useCallback(() => {
    setLastActivity(Date.now())
    setShowWarning(false)
  }, [])

  const handleExtendSession = useCallback(() => {
    resetActivity()
    onExtendSession()
  }, [resetActivity, onExtendSession])

  useEffect(() => {
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click']
    
    const handleActivity = () => {
      if (!showWarning) {
        resetActivity()
      }
    }

    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity)
    })

    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity)
      })
    }
  }, [resetActivity, showWarning])

  useEffect(() => {
    const checkInterval = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivity
      const timeUntilTimeout = sessionDurationMs - timeSinceActivity

      if (timeUntilTimeout <= 0) {
        clearInterval(checkInterval)
        onLogout()
      } else if (timeUntilTimeout <= warningThresholdMs) {
        setShowWarning(true)
        setTimeRemaining(timeUntilTimeout)
      }
    }, 1000)

    return () => clearInterval(checkInterval)
  }, [lastActivity, sessionDurationMs, warningThresholdMs, onLogout])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressValue = (timeRemaining / warningThresholdMs) * 100

  return (
    <Dialog open={showWarning} onOpenChange={setShowWarning}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-warning/20">
              <ShieldWarning className="w-6 h-6 text-warning" weight="fill" />
            </div>
            <DialogTitle className="text-xl">Session Timeout Warning</DialogTitle>
          </div>
          <DialogDescription className="text-base pt-2">
            Your session will expire due to inactivity. You will be automatically logged out in:
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-8 h-8 text-primary" weight="bold" />
            <div className="text-5xl font-mono font-bold text-primary">
              {formatTime(timeRemaining)}
            </div>
          </div>

          <div className="space-y-2">
            <Progress 
              value={progressValue} 
              className="h-2"
            />
            <p className="text-xs text-center text-muted-foreground">
              Session will expire when the timer reaches 0:00
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-3 sm:gap-3">
          <Button
            variant="outline"
            onClick={onLogout}
            className="flex-1"
          >
            Logout Now
          </Button>
          <Button
            onClick={handleExtendSession}
            className="flex-1"
          >
            Stay Logged In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
