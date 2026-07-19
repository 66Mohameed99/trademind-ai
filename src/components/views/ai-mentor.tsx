'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Send,
  Brain,
  User,
  MessageSquare,
  PanelLeftClose,
  PanelLeft,
  Sparkles,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

// --- Mock Data ---

interface Conversation {
  id: string
  title: string
  preview: string
  time: string
  active?: boolean
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Understanding BOS and CHOCH',
    preview: 'A Break of Structure occurs when price breaks through...',
    time: '2 min ago',
    active: true,
  },
  {
    id: '2',
    title: 'Risk Management Strategies',
    preview: 'The 1-2% rule is fundamental to protecting your capital...',
    time: '1 hour ago',
  },
  {
    id: '3',
    title: 'How to Identify Order Blocks',
    preview: 'Order blocks are the last opposing candle before a move...',
    time: '3 hours ago',
  },
  {
    id: '4',
    title: 'Psychology of Trading',
    preview: 'Fear and greed are the two dominant emotions in trading...',
    time: 'Yesterday',
  },
  {
    id: '5',
    title: 'Scalping vs Day Trading',
    preview: 'Scalping focuses on quick trades within minutes, while...',
    time: '2 days ago',
  },
]

type MessageRole = 'user' | 'ai'

interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: string
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'Can you explain what a Break of Structure (BOS) is?',
    timestamp: '10:32 AM',
  },
  {
    id: '2',
    role: 'ai',
    content:
      'A Break of Structure (BOS) occurs when price breaks through a significant swing point in the direction of the trend. It confirms that the current trend is continuing. For example, in an uptrend, price breaks above the most recent swing high, creating a new higher high — that\'s a bullish BOS.',
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    role: 'user',
    content: 'How is it different from a Change of Character (CHOCH)?',
    timestamp: '10:34 AM',
  },
  {
    id: '4',
    role: 'ai',
    content:
      'Great question! While both involve price breaking structure, they serve different purposes:\n\n• **BOS (Break of Structure)** — Confirms trend **continuation**. Price breaks a swing point in the same direction as the existing trend.\n\n• **CHOCH (Change of Character)** — Signals a potential trend **reversal**. Price breaks a swing point against the current trend.\n\nThink of BOS as the market saying "we\'re still going this way" and CHOCH as "something might be changing."',
    timestamp: '10:34 AM',
  },
  {
    id: '5',
    role: 'user',
    content: 'How do I identify a BOS on a live chart?',
    timestamp: '10:36 AM',
  },
  {
    id: '6',
    role: 'ai',
    content:
      'Here\'s a step-by-step approach to identifying a BOS on a live chart:\n\n1. **Identify the current trend direction** — Look at the sequence of swing highs and swing lows on your preferred timeframe.\n\n2. **Mark the last significant swing point** — In an uptrend, mark the last swing high. In a downtrend, mark the last swing low.\n\n3. **Wait for the break** — A candle body closing beyond that swing point confirms the BOS.\n\n4. **Check volume** — A BOS accompanied by higher volume has a higher probability of being genuine.\n\n5. **Look for retests** — Price often comes back to retest the broken level before continuing — these offer great entry opportunities.',
    timestamp: '10:37 AM',
  },
  {
    id: '7',
    role: 'user',
    content: 'Should I combine BOS with other Smart Money Concepts?',
    timestamp: '10:40 AM',
  },
  {
    id: '8',
    role: 'ai',
    content:
      'Absolutely! BOS is most powerful when combined with other Smart Money Concepts (SMC). Here\'s how they work together:\n\n• **Order Blocks** — Enter on a BOS and place your stop loss behind the originating order block for optimal risk management.\n\n• **Fair Value Gaps (FVG)** — When price breaks structure and leaves a FVG, price often retraces to fill it before continuing — use the FVG zone as your entry.\n\n• **Liquidity Sweeps** — Sometimes price will sweep liquidity before a BOS occurs, creating a more reliable entry signal.\n\n• **Premium/Discount Zones** — Only take BOS entries when price is in a discount zone (for buys) or premium zone (for sells).\n\nThe key is confluence — the more SMC concepts align at a level, the higher probability the trade has.',
    timestamp: '10:41 AM',
  },
]

const quickSuggestions = [
  'Explain FVG',
  'Review my last trade',
  'Create a study plan',
  'Market analysis tips',
]

// --- Animation Variants ---

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

const conversationItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.25 },
  }),
}

const chipVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.04, backgroundColor: 'rgba(16, 185, 129, 0.15)' },
}

// --- Component ---

export default function AIMentorView() {
  const [conversations, setConversations] = useState(mockConversations)
  const [activeConversationId, setActiveConversationId] = useState('1')
  const [messages, setMessages] = useState(mockMessages)
  const [inputValue, setInputValue] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const scrollEndRef = useRef<HTMLDivElement>(null)

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  )

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return
    const now = new Date()
    const timestamp = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      content: inputValue.trim(),
      timestamp,
    }
    setMessages((prev) => [...prev, userMsg])
    setInputValue('')

    // Simulated AI reply
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: 'ai',
        content:
          "That's a great question! Let me think about this in the context of Smart Money Concepts and price action analysis. Based on current market conditions, I'd recommend focusing on the higher timeframe structure first, then drilling down for entries.",
        timestamp,
      }
      setMessages((prev) => [...prev, aiMsg])
    }, 1200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleNewChat = () => {
    const newId = String(Date.now())
    const newConv: Conversation = {
      id: newId,
      title: 'New Conversation',
      preview: 'Start a new discussion...',
      time: 'Just now',
    }
    setConversations((prev) => [newConv, ...prev])
    setActiveConversationId(newId)
    setMessages([])
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-full min-h-0">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Left Panel - Conversations */}
      <motion.aside
        className={cn(
          'flex w-[280px] shrink-0 flex-col border-r bg-card',
          'fixed inset-y-0 left-0 z-50 md:relative md:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-sm font-semibold text-foreground">Conversations</h2>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <PanelLeftClose className="size-4" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="px-3 pb-3">
          <Button
            onClick={handleNewChat}
            className="w-full justify-start gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Plus className="size-4" />
            New Chat
          </Button>
        </div>

        <Separator />

        {/* Conversation List */}
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-0.5 p-2">
            {conversations.map((conv, i) => (
              <motion.button
                key={conv.id}
                custom={i}
                variants={conversationItemVariants}
                initial="hidden"
                animate="visible"
                onClick={() => {
                  setActiveConversationId(conv.id)
                  setSidebarOpen(false)
                }}
                className={cn(
                  'flex flex-col items-start gap-1 rounded-lg px-3 py-2.5 text-left transition-colors w-full',
                  conv.id === activeConversationId
                    ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <span className="text-sm font-medium leading-tight line-clamp-1">
                  {conv.title}
                </span>
                <span className="text-xs leading-tight line-clamp-1 opacity-70">
                  {conv.preview}
                </span>
                <span className="flex items-center gap-1 text-[11px] opacity-50 mt-0.5">
                  <Clock className="size-3" />
                  {conv.time}
                </span>
              </motion.button>
            ))}
          </div>
        </ScrollArea>
      </motion.aside>

      {/* Right Panel - Chat Area */}
      <div className="flex flex-1 flex-col min-h-0">
        {/* Chat Header */}
        <header className="flex items-center gap-3 border-b px-4 py-3 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <PanelLeft className="size-4" />
          </Button>
          <Avatar className="size-9 border border-emerald-200">
            <AvatarFallback className="bg-emerald-100 text-emerald-700">
              <Brain className="size-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">AI Mentor</span>
            <div className="flex items-center gap-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
          <div className="ml-auto">
            <Badge
              variant="outline"
              className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
            >
              <Sparkles className="size-3 mr-1" />
              GPT-4 Powered
            </Badge>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="mx-auto max-w-3xl px-4 py-6 space-y-1">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-100 mb-4">
                  <Brain className="size-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">
                  Ask your AI Mentor anything
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  I can help you understand trading concepts, analyze strategies, and build your skills.
                </p>
              </motion.div>
            )}
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={cn(
                    'flex gap-3 py-3',
                    msg.role === 'user' && 'flex-row-reverse'
                  )}
                >
                  {/* Avatar */}
                  <Avatar className="size-8 shrink-0 mt-0.5">
                    <AvatarFallback
                      className={cn(
                        msg.role === 'ai'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {msg.role === 'ai' ? (
                        <Brain className="size-4" />
                      ) : (
                        <User className="size-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  {/* Message bubble */}
                  <div
                    className={cn(
                      'flex max-w-[80%] flex-col gap-1',
                      msg.role === 'user' && 'items-end'
                    )}
                  >
                    <div
                      className={cn(
                        'rounded-xl px-4 py-3 text-sm leading-relaxed',
                        msg.role === 'ai'
                          ? 'rounded-tl-sm border-l-[3px] border-l-emerald-500 bg-muted/50'
                          : 'rounded-tr-sm bg-emerald-600 text-white'
                      )}
                    >
                      <div className="whitespace-pre-wrap">
                        {msg.content.split('\n').map((line, i) => {
                          // Basic markdown bold
                          const parts = line.split(/(\*\*[^*]+\*\*)/g)
                          return (
                            <span key={i}>
                              {i > 0 && <br />}
                              {parts.map((part, j) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return (
                                    <strong key={j}>
                                      {part.slice(2, -2)}
                                    </strong>
                                  )
                                }
                                return <span key={j}>{part}</span>
                              })}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground px-1">
                      {msg.role === 'ai' && (
                        <MessageSquare className="size-3" />
                      )}
                      {msg.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={scrollEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="shrink-0 border-t bg-card px-4 pb-4 pt-3">
          {/* Quick Suggestions */}
          <div className="mb-3 flex flex-wrap gap-2">
            {quickSuggestions.map((chip) => (
              <motion.button
                key={chip}
                variants={chipVariants}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                onClick={() => setInputValue(chip)}
                className="rounded-full border border-emerald-200 bg-emerald-50/50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:border-emerald-300 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 dark:hover:border-emerald-700"
              >
                {chip}
              </motion.button>
            ))}
          </div>

          {/* Input Row */}
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your AI mentor anything about trading..."
              className="flex-1 border-emerald-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="bg-emerald-600 text-white hover:bg-emerald-700 shrink-0"
              size="icon"
            >
              <Send className="size-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}