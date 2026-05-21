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
    text: "Hi! You are connected to guardivex support. Tell us what you need and we will get you sorted quickly.",
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
      <div className="fixed right-4 bottom-4 z-[70] sm:right-6 sm:bottom-6">
        <Button
          onClick={() => onOpenChange(true)}
          className="h-12 px-4 rounded-full shadow-lg shadow-primary/25 gap-2"
          aria-label="Open live chat"
          title="Open live chat"
        >
          <ChatCircle size={20} weight="fill" />
          <span className="font-semibold">Live Chat</span>
          <Badge variant="secondary" className="ml-1 px-2 py-0 h-5 text-[10px]">
            Online
          </Badge>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed right-3 bottom-3 z-[70] w-[calc(100vw-1.5rem)] sm:w-[390px] sm:right-6 sm:bottom-6">
      <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Circle size={8} weight="fill" className="text-success" />
              <Circle size={8} weight="fill" className="text-success absolute animate-ping opacity-60" />
            </div>
            <div>
              <p className="text-sm font-semibold">guardivex Support</p>
              <p className="text-xs text-muted-foreground">Average response under 2 min</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            aria-label="Close live chat"
            title="Close live chat"
          >
            <X size={16} weight="bold" />
          </Button>
        </div>

        <div ref={scrollContainerRef} className="h-[320px] overflow-y-auto px-4 py-3 space-y-3 bg-background/50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`mt-1 text-[10px] ${
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
              <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground">
                Agent is typing...
              </div>
            </div>
          )}
        </div>

        <div className="px-3 py-2 border-t border-border bg-card/70">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="text-xs px-2 py-1 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors"
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
              className="h-10 flex-1 rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
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
