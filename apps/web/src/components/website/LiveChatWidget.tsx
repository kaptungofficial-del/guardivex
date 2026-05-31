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
      <div className="gvx-chat-float fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <Button
          variant="outline"
          onClick={() => onOpenChange(true)}
          className="h-10 rounded-full border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] px-3 text-[var(--gvx-hero-text)] shadow-[0_18px_42px_-28px_rgba(7,29,51,0.55)] hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-hero-accent-soft)] sm:h-11 sm:px-3.5"
          aria-label="Open live chat"
          title="Open live chat"
        >
          <ChatCircle size={17} weight="fill" className="opacity-80 sm:h-[18px] sm:w-[18px]" />
          <span className="hidden font-semibold text-[12px] min-[390px]:inline">Live Chat</span>
          <Badge variant="secondary" className="ml-0.5 hidden h-4 border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-accent-soft)] px-1.5 py-0 text-[9px] text-[var(--gvx-hero-accent-2)] sm:inline-flex">
            Online
          </Badge>
        </Button>
      </div>
    )
  }

  return (
    <div className="gvx-chat-panel fixed bottom-4 right-4 z-50 w-[min(20rem,calc(100vw-2rem))] sm:bottom-6 sm:right-6 sm:w-[320px]">
      <div className="overflow-hidden rounded-lg border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] shadow-[0_24px_70px_-44px_rgba(7,29,51,0.55)]">
        <div className="flex items-center justify-between border-b border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-surface)] px-2.5 py-1.5 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Circle size={7} weight="fill" className="text-success/90" />
              <Circle size={7} weight="fill" className="text-success absolute animate-ping opacity-30" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[var(--gvx-hero-text)]">Guardivex Support</p>
              <p className="text-[10px] text-[var(--gvx-hero-muted)]">Support team</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            aria-label="Close live chat"
            title="Close live chat"
            className="text-[var(--gvx-hero-muted)] hover:text-[var(--gvx-hero-text)]"
          >
            <X size={16} weight="bold" />
          </Button>
        </div>

        <div ref={scrollContainerRef} className="h-[150px] space-y-2 overflow-y-auto bg-[var(--gvx-hero-bg)] px-2.5 py-2 sm:h-[170px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-md px-2 py-1.5 text-[12px] ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-accent-soft)] text-[var(--gvx-hero-text)]"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`mt-1 text-[9px] ${
                    message.sender === "user" ? "text-primary-foreground/80" : "text-[var(--gvx-hero-muted)]"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-md border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-accent-soft)] px-2 py-1.5 text-[11px] text-[var(--gvx-hero-muted)]">
                Agent is typing...
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-surface)] px-2.5 py-1.5">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="rounded-sm border border-[var(--gvx-hero-border)] px-1.5 py-0.5 text-[10px] text-[var(--gvx-hero-text)] transition-colors hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-hero-accent-soft)] hover:text-[var(--gvx-hero-text)]"
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
              className="h-8 flex-1 rounded-sm border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] px-2 text-[12px] text-[var(--gvx-hero-text)] outline-none placeholder:text-[var(--gvx-hero-muted)] focus:ring-2 focus:ring-primary/20"
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
