import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChatCircle, PaperPlaneTilt, X, Circle } from "@phosphor-icons/react"

type ChatSender = "agent" | "user"

interface ChatMessage {
  id: string
  sender: ChatSender
  text: string
  timestamp: string
}

interface LiveChatWidgetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  prefillMessage?: string
  onPrefillConsumed?: () => void
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    sender: "agent",
    text: "Hi! You are connected to Guardivex support. Tell us what you need and we will get you sorted quickly.",
    timestamp: "now",
  },
]

const QUICK_REPLIES = [
  "I need help with licensing",
  "I have a deployment issue",
  "I need SOC onboarding support",
]

function makeTimestamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function LiveChatWidget({
  isOpen,
  onOpenChange,
  prefillMessage,
  onPrefillConsumed,
}: LiveChatWidgetProps) {
  const [draft, setDraft] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const replyTimeoutRef = useRef<number | null>(null)

  const canSend = useMemo(() => draft.trim().length > 0, [draft])

  useEffect(() => {
    if (!prefillMessage) return
    setDraft(prefillMessage)
    onOpenChange(true)
    onPrefillConsumed?.()
  }, [prefillMessage, onOpenChange, onPrefillConsumed])

  useEffect(() => {
    if (!scrollContainerRef.current) return
    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
  }, [messages, isTyping])

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) {
        window.clearTimeout(replyTimeoutRef.current)
      }
    }
  }, [])

  const enqueueAgentReply = (sourceText: string) => {
    setIsTyping(true)
    replyTimeoutRef.current = window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-agent`,
          sender: "agent",
          text: `Thanks for the details. I can help with: ${sourceText.slice(0, 80)}${sourceText.length > 80 ? "..." : ""}. Please share your tenant name and environment (cloud or on-prem).`,
          timestamp: makeTimestamp(),
        },
      ])
      setIsTyping(false)
    }, 900)
  }

  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        sender: "user",
        text: trimmed,
        timestamp: makeTimestamp(),
      },
    ])

    setDraft("")
    enqueueAgentReply(trimmed)
  }

  if (!isOpen) {
    return (
      <div className="fixed right-1 bottom-1 z-[70] sm:right-5 sm:bottom-6">
        <Button
          onClick={() => onOpenChange(true)}
          className="h-9 px-3 rounded-full gap-1.5 border border-[rgba(0,199,232,0.22)] bg-[linear-gradient(135deg,rgba(11,22,40,0.94),rgba(7,17,31,0.88))] text-[#F8FAFC] shadow-[0_14px_28px_-18px_rgba(2,6,18,0.72)] hover:border-primary/40 hover:bg-[linear-gradient(135deg,rgba(11,22,40,0.98),rgba(7,17,31,0.94))]"
          aria-label="Open live chat"
          title="Open live chat"
        >
          <ChatCircle size={16} weight="fill" />
          <span className="font-semibold text-xs">Live Chat</span>
          <Badge variant="secondary" className="ml-0.5 px-1.5 py-0 h-4 text-[9px] border border-success/25 bg-success/10 text-success">
            Online
          </Badge>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed right-1 bottom-1 z-[70] w-[calc(100vw-1rem)] sm:w-[292px] sm:right-5 sm:bottom-6">
      <div className="rounded-xl border border-[rgba(0,199,232,0.20)] bg-[linear-gradient(180deg,rgba(11,22,40,0.96),rgba(7,17,31,0.94))] shadow-[0_22px_44px_-26px_rgba(2,6,18,0.9)] overflow-hidden">
        <div className="px-3.5 py-2.5 border-b border-[rgba(0,199,232,0.14)] bg-[rgba(11,22,40,0.82)] backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Circle size={8} weight="fill" className="text-success" />
              <Circle size={8} weight="fill" className="text-success absolute animate-ping opacity-60" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#F8FAFC]">Guardivex Support</p>
              <p className="text-[11px] text-muted-foreground">Average response under 2 min</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            aria-label="Close live chat"
            title="Close live chat"
            className="text-muted-foreground hover:text-[#F8FAFC]"
          >
            <X size={16} weight="bold" />
          </Button>
        </div>

        <div ref={scrollContainerRef} className="h-[232px] overflow-y-auto px-3.5 py-2.5 space-y-2.5 bg-[rgba(7,17,31,0.70)]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-2.5 py-1.5 text-[13px] ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-[rgba(11,22,40,0.92)] border border-[rgba(0,199,232,0.16)] text-[#F8FAFC]"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`mt-1 text-[9px] ${
                    message.sender === "user" ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[rgba(11,22,40,0.92)] border border-[rgba(0,199,232,0.16)] rounded-lg px-2.5 py-1.5 text-[11px] text-muted-foreground">
                Agent is typing...
              </div>
            </div>
          )}
        </div>

        <div className="px-2.5 py-2 border-t border-[rgba(0,199,232,0.14)] bg-[rgba(11,22,40,0.84)]">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="text-[11px] px-2 py-0.5 rounded-full border border-[rgba(0,199,232,0.18)] text-[#E2E8F0] hover:text-[#F8FAFC] hover:border-primary/40 hover:bg-[rgba(0,199,232,0.08)] transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(draft)
            }}
            className="flex items-center gap-2"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your message"
              className="h-9 flex-1 rounded-md border border-[rgba(0,199,232,0.18)] bg-[rgba(7,17,31,0.74)] px-2.5 text-[13px] text-[#F8FAFC] placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
            />
            <Button type="submit" size="icon" disabled={!canSend} aria-label="Send message" title="Send message">
              <PaperPlaneTilt size={16} weight="fill" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
