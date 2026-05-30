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
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <Button
          variant="outline"
          onClick={() => onOpenChange(true)}
          className="h-10 rounded-full border border-border/70 bg-white px-3 text-[#07111F] shadow-[0_18px_42px_-28px_rgba(7,17,31,0.55)] hover:border-primary/25 hover:bg-secondary/80 dark:border-[rgba(0,212,255,0.16)] dark:bg-[rgba(7,29,51,0.92)] dark:text-[#E2E8F0] dark:hover:border-primary/24 dark:hover:bg-[rgba(7,29,51,0.96)] sm:h-11 sm:px-3.5"
          aria-label="Open live chat"
          title="Open live chat"
        >
          <ChatCircle size={17} weight="fill" className="opacity-80 sm:h-[18px] sm:w-[18px]" />
          <span className="hidden font-semibold text-[12px] min-[390px]:inline">Live Chat</span>
          <Badge variant="secondary" className="ml-0.5 hidden px-1.5 py-0 h-4 text-[9px] border border-success/20 bg-success/10 text-success/90 sm:inline-flex">
            Online
          </Badge>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[min(20rem,calc(100vw-2rem))] sm:bottom-6 sm:right-6 sm:w-[320px]">
      <div className="overflow-hidden rounded-lg border border-border/75 bg-white/95 shadow-[0_24px_70px_-44px_rgba(7,17,31,0.55)] dark:border-[rgba(0,212,255,0.12)] dark:bg-[rgba(7,29,51,0.94)]">
        <div className="px-2.5 py-1.5 border-b border-border/70 bg-white/90 backdrop-blur-sm flex items-center justify-between dark:border-[rgba(0,212,255,0.08)] dark:bg-[rgba(7,29,51,0.72)]">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Circle size={7} weight="fill" className="text-success/90" />
              <Circle size={7} weight="fill" className="text-success absolute animate-ping opacity-30" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#07111F] dark:text-[#E2E8F0]">Guardivex Support</p>
              <p className="text-[10px] text-[#64748B] dark:text-muted-foreground">Support team</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            aria-label="Close live chat"
            title="Close live chat"
            className="text-[#64748B] hover:text-[#07111F] dark:text-muted-foreground dark:hover:text-[#F8FAFC]"
          >
            <X size={16} weight="bold" />
          </Button>
        </div>

        <div ref={scrollContainerRef} className="h-[150px] overflow-y-auto px-2.5 py-2 space-y-2 bg-white dark:bg-[rgba(3,10,24,0.66)] sm:h-[170px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-md px-2 py-1.5 text-[12px] ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary border border-border text-[#07111F] dark:bg-[rgba(7,29,51,0.82)] dark:border-[rgba(0,212,255,0.08)] dark:text-[#E2E8F0]"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`mt-1 text-[9px] ${
                    message.sender === "user" ? "text-primary-foreground/80" : "text-[#64748B] dark:text-muted-foreground"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-secondary border border-border rounded-md px-2 py-1.5 text-[11px] text-[#64748B] dark:bg-[rgba(7,29,51,0.82)] dark:border-[rgba(0,212,255,0.08)] dark:text-muted-foreground">
                Agent is typing...
              </div>
            </div>
          )}
        </div>

        <div className="px-2.5 py-1.5 border-t border-[#D8E3EE]/80 bg-white/88 dark:border-[rgba(0,212,255,0.08)] dark:bg-[rgba(7,29,51,0.72)]">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="text-[10px] px-1.5 py-0.5 rounded-sm border border-border/75 text-[#07111F] hover:text-[#07111F] hover:border-primary/16 hover:bg-secondary transition-colors dark:border-[rgba(0,212,255,0.08)] dark:text-[#E2E8F0] dark:hover:text-[#F8FAFC] dark:hover:border-primary/14 dark:hover:bg-[rgba(0,212,255,0.08)]"
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
              className="h-8 flex-1 rounded-sm border border-border bg-white px-2 text-[12px] text-[#07111F] placeholder:text-[#64748B] outline-none focus:ring-2 focus:ring-primary/20 dark:border-[rgba(0,212,255,0.08)] dark:bg-[rgba(7,29,51,0.68)] dark:text-[#E2E8F0] dark:placeholder:text-muted-foreground"
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
