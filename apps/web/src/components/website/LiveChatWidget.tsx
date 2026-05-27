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
      <div className="fixed bottom-6 right-6 z-30 hidden xl:block">
        <Button
          onClick={() => onOpenChange(true)}
          className="h-6 px-2 rounded-sm gap-1 border border-border/60 bg-white/84 bg-none text-[#07111F] shadow-none hover:border-primary/14 hover:bg-secondary/68 dark:border-[rgba(0,194,255,0.07)] dark:bg-[rgba(3,10,24,0.68)] dark:text-[#E2E8F0] dark:shadow-none dark:hover:border-primary/12 dark:hover:bg-[rgba(11,18,32,0.76)]"
          aria-label="Open live chat"
          title="Open live chat"
        >
          <ChatCircle size={12} weight="fill" className="opacity-70" />
          <span className="font-semibold text-[9.5px]">Live Chat</span>
          <Badge variant="secondary" className="ml-0.5 hidden xl:inline-flex px-1 py-0 h-3.5 text-[8px] border border-success/18 bg-success/8 text-success/90">
            Online
          </Badge>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-30 w-[min(19rem,calc(100vw-2rem))] sm:w-[244px]">
      <div className="rounded-md border border-border/75 bg-white/95 shadow-none overflow-hidden dark:border-[rgba(0,194,255,0.09)] dark:bg-[rgba(3,10,24,0.92)] dark:shadow-none">
        <div className="px-2.5 py-1.5 border-b border-border/70 bg-white/90 backdrop-blur-sm flex items-center justify-between dark:border-[rgba(0,194,255,0.08)] dark:bg-[rgba(11,18,32,0.72)]">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Circle size={7} weight="fill" className="text-success/90" />
              <Circle size={7} weight="fill" className="text-success absolute animate-ping opacity-30" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#07111F] dark:text-[#E2E8F0]">Guardivex Support</p>
              <p className="text-[10px] text-[#64748B] dark:text-muted-foreground">Average response under 2 min</p>
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

        <div ref={scrollContainerRef} className="h-[170px] overflow-y-auto px-2.5 py-2 space-y-2 bg-white dark:bg-[rgba(3,10,24,0.66)]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-md px-2 py-1.5 text-[12px] ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary border border-border text-[#07111F] dark:bg-[rgba(11,18,32,0.82)] dark:border-[rgba(0,194,255,0.08)] dark:text-[#E2E8F0]"
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
              <div className="bg-secondary border border-border rounded-md px-2 py-1.5 text-[11px] text-[#64748B] dark:bg-[rgba(11,18,32,0.82)] dark:border-[rgba(0,194,255,0.08)] dark:text-muted-foreground">
                Agent is typing...
              </div>
            </div>
          )}
        </div>

        <div className="px-2.5 py-1.5 border-t border-[#D8E3EE]/80 bg-white/88 dark:border-[rgba(0,194,255,0.08)] dark:bg-[rgba(11,18,32,0.72)]">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="text-[10px] px-1.5 py-0.5 rounded-sm border border-border/75 text-[#07111F] hover:text-[#07111F] hover:border-primary/16 hover:bg-secondary transition-colors dark:border-[rgba(0,194,255,0.08)] dark:text-[#E2E8F0] dark:hover:text-[#F8FAFC] dark:hover:border-primary/14 dark:hover:bg-[rgba(0,194,255,0.04)]"
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
              className="h-8 flex-1 rounded-sm border border-border bg-white px-2 text-[12px] text-[#07111F] placeholder:text-[#64748B] outline-none focus:ring-2 focus:ring-primary/20 dark:border-[rgba(0,194,255,0.08)] dark:bg-[rgba(3,10,24,0.68)] dark:text-[#E2E8F0] dark:placeholder:text-muted-foreground"
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
