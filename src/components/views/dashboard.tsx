'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Plus,
  Bot,
  BookOpen,
  Target,
  Flame,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Save,
  TrendingDown,
  Activity,
  Clock,
  LineChart,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useNavigation } from '@/store/navigation'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const winRateSparkline = [
  { v: 62 },
  { v: 58 },
  { v: 65 },
  { v: 63 },
  { v: 60 },
  { v: 66 },
  { v: 64 },
  { v: 67 },
  { v: 65 },
  { v: 67.5 },
]

const courses = [
  { name: 'Technical Analysis Masterclass', progress: 75, icon: '📊' },
  { name: 'Risk Management Fundamentals', progress: 45, icon: '🛡️' },
  { name: 'Price Action Trading', progress: 90, icon: '🕯️' },
]

const signals = [
  { pair: 'EUR/USD', direction: 'Buy' as const, entry: '1.0845', sl: '1.0810', tp: '1.0920', timeframe: 'H4', status: 'Active' as const },
  { pair: 'GBP/JPY', direction: 'Sell' as const, entry: '191.35', sl: '191.80', tp: '190.50', timeframe: 'H1', status: 'Hit TP' as const },
  { pair: 'BTC/USD', direction: 'Buy' as const, entry: '67,250', sl: '66,800', tp: '69,000', timeframe: 'D1', status: 'Active' as const },
  { pair: 'XAU/USD', direction: 'Sell' as const, entry: '2,415.50', sl: '2,425.00', tp: '2,390.00', timeframe: 'H4', status: 'Hit SL' as const },
  { pair: 'USD/JPY', direction: 'Buy' as const, entry: '157.80', sl: '157.40', tp: '158.50', timeframe: 'M15', status: 'Expired' as const },
]

const watchlist = [
  { pair: 'EUR/USD', price: '1.0867', change: +0.32 },
  { pair: 'GBP/JPY', price: '191.24', change: -0.15 },
  { pair: 'BTC/USD', price: '68,420', change: +2.45 },
  { pair: 'XAU/USD', price: '2,418.30', change: +0.89 },
  { pair: 'USD/JPY', price: '157.92', change: -0.08 },
  { pair: 'AAPL', price: '198.54', change: +1.23 },
]

const events = [
  { name: 'NFP Report', time: 'Friday 8:30 AM' },
  { name: 'FOMC Meeting', time: 'Wednesday 2:00 PM' },
  { name: 'Live Session: Scalping', time: 'Thursday 7:00 PM' },
  { name: 'Quiz: Risk Management', time: 'Monday 9:00 AM' },
]

const pnlData = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1
  const base = 200 + i * 18
  const noise = Math.sin(i * 1.7) * 120 + Math.cos(i * 0.8) * 60
  const value = Math.round((base + noise) * 100) / 100
  return { day: `Day ${day}`, pnl: value }
})

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
}

const cardHoverProps = {
  whileHover: { y: -2, boxShadow: '0 8px 30px rgba(16, 185, 129, 0.08)' },
  transition: { type: 'spring', stiffness: 400, damping: 25 },
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function DirectionBadge({ direction }: { direction: 'Buy' | 'Sell' }) {
  const isBuy = direction === 'Buy'
  return (
    <Badge
      className={
        isBuy
          ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/25 hover:bg-emerald-500/25 dark:text-emerald-400 dark:border-emerald-500/30'
          : 'bg-rose-500/15 text-rose-600 border-rose-500/25 hover:bg-rose-500/25 dark:text-rose-400 dark:border-rose-500/30'
      }
    >
      {isBuy ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
      {direction}
    </Badge>
  )
}

function StatusBadge({ status }: { status: 'Active' | 'Hit TP' | 'Hit SL' | 'Expired' }) {
  const styles: Record<string, string> = {
    Active: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/25 dark:text-emerald-400',
    'Hit TP': 'bg-emerald-500/15 text-emerald-600 border-emerald-500/25 dark:text-emerald-400',
    'Hit SL': 'bg-rose-500/15 text-rose-600 border-rose-500/25 dark:text-rose-400',
    Expired: 'bg-muted text-muted-foreground border-muted-foreground/25',
  }
  return (
    <Badge variant="outline" className={styles[status]}>
      {status === 'Active' && <span className="mr-1 size-1.5 rounded-full bg-emerald-500 animate-pulse" />}
      {status}
    </Badge>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function DashboardView() {
  const { setView } = useNavigation()
  const [journalText, setJournalText] = useState('')
  const [mood, setMood] = useState<'bullish' | 'bearish' | null>(null)
  const [journalSaved, setJournalSaved] = useState(false)

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handleSaveJournal = () => {
    if (journalText.trim()) {
      setJournalSaved(true)
      setTimeout(() => setJournalSaved(false), 2000)
    }
  }

  return (
    <motion.div
      className="min-h-screen w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        {/* ── Welcome Banner ──────────────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 via-emerald-900/20 to-background dark:from-emerald-950/60 dark:via-emerald-900/30">
            <CardContent className="py-6 sm:py-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1.5">
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Welcome back,{' '}
                    <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                      Alex
                    </span>
                  </h1>
                  <p className="text-sm text-muted-foreground sm:text-base">{today}</p>
                  <p className="text-xs text-muted-foreground/70">
                    Your portfolio is up <span className="text-emerald-500 font-semibold">+4.2%</span> this month. Keep it up!
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Button
                    onClick={() => setView('chart-analyzer')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20"
                  >
                    <BarChart3 className="size-4" />
                    <span className="hidden sm:inline">Analyze Chart</span>
                    <span className="sm:hidden">Analyze</span>
                  </Button>
                  <Button
                    onClick={() => setView('academy')}
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-500 dark:text-emerald-400"
                  >
                    <Plus className="size-4" />
                    New Trade
                  </Button>
                  <Button
                    onClick={() => setView('ai-mentor')}
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-500 dark:text-emerald-400"
                  >
                    <Bot className="size-4" />
                    <span className="hidden sm:inline">AI Mentor</span>
                    <span className="sm:hidden">Mentor</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Stats Row ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[
            {
              label: 'Total Courses',
              value: '12',
              icon: BookOpen,
              sub: '8 completed',
              subIcon: '📚',
              color: 'text-emerald-500',
              bg: 'bg-emerald-500/10',
            },
            {
              label: 'Win Rate',
              value: '67.5%',
              icon: Target,
              sub: 'winning trades',
              sparkline: true,
              color: 'text-emerald-500',
              bg: 'bg-emerald-500/10',
            },
            {
              label: 'Total Trades',
              value: '156',
              icon: Activity,
              sub: '+12 this week',
              badge: '+12 this week',
              color: 'text-blue-500',
              bg: 'bg-blue-500/10',
            },
            {
              label: 'Streak',
              value: '7 Days',
              icon: Flame,
              sub: 'Keep going!',
              color: 'text-orange-500',
              bg: 'bg-orange-500/10',
            },
          ].map((stat, i) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <motion.div
                {...cardHoverProps}
                className="rounded-xl border bg-card p-4 sm:p-5 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className={`rounded-lg p-2 ${stat.bg}`}>
                    <stat.icon className={`size-4 sm:size-5 ${stat.color}`} />
                  </div>
                  {stat.badge && (
                    <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-500/25 text-[10px] dark:text-emerald-400">
                      {stat.badge}
                    </Badge>
                  )}
                </div>
                <div className="mt-3 space-y-0.5">
                  <p className="text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold tracking-tight sm:text-2xl">{stat.value}</p>
                    {stat.sparkline && (
                      <div className="h-6 w-16 sm:w-20">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart data={winRateSparkline}>
                            <Line
                              type="monotone"
                              dataKey="v"
                              stroke="#10b981"
                              strokeWidth={2}
                              dot={false}
                            />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ── Two-Column Layout ──────────────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column (2/3) */}
          <div className="space-y-6 lg:col-span-2">
            {/* Learning Progress */}
            <motion.div variants={itemVariants}>
              <Card className="hover:border-emerald-500/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <LineChart className="size-5 text-emerald-500" />
                    Learning Progress
                  </CardTitle>
                  <CardDescription>Continue where you left off</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courses.map((course) => (
                    <motion.div
                      key={course.name}
                      className="group rounded-lg border p-4 transition-all hover:border-emerald-500/25 hover:bg-emerald-500/[0.02]"
                      whileHover={{ scale: 1.005 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xl shrink-0">{course.icon}</span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{course.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {course.progress}% complete
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 sm:w-48">
                          <div className="flex-1">
                            <Progress
                              value={course.progress}
                              className="h-2 bg-emerald-500/10 [&>[data-slot=progress-indicator]]:bg-emerald-500"
                            />
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="shrink-0 border-emerald-500/25 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-500 dark:text-emerald-400"
                            onClick={() => setView('academy')}
                          >
                            Continue
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Signals */}
            <motion.div variants={itemVariants}>
              <Card className="hover:border-emerald-500/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Activity className="size-5 text-emerald-500" />
                    Recent Signals
                  </CardTitle>
                  <CardDescription>Latest AI-generated trading signals</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <ScrollArea className="max-h-96">
                    {/* Desktop Table */}
                    <div className="hidden md:block">
                      <div className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr_0.7fr_0.5fr_0.8fr] gap-2 px-6 py-2.5 text-xs font-medium text-muted-foreground border-b">
                        <span>Pair</span>
                        <span>Direction</span>
                        <span>Entry</span>
                        <span>SL</span>
                        <span>TP</span>
                        <span>TF</span>
                        <span>Status</span>
                      </div>
                      {signals.map((signal, idx) => (
                        <motion.div
                          key={signal.pair + idx}
                          className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr_0.7fr_0.5fr_0.8fr] gap-2 items-center px-6 py-3 text-sm border-b last:border-b-0 hover:bg-emerald-500/[0.02] transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <span className="font-semibold">{signal.pair}</span>
                          <DirectionBadge direction={signal.direction} />
                          <span className="font-mono text-xs">{signal.entry}</span>
                          <span className="font-mono text-xs text-rose-500">{signal.sl}</span>
                          <span className="font-mono text-xs text-emerald-500">{signal.tp}</span>
                          <Badge variant="secondary" className="text-[10px] justify-center">
                            {signal.timeframe}
                          </Badge>
                          <StatusBadge status={signal.status} />
                        </motion.div>
                      ))}
                    </div>

                    {/* Mobile Cards */}
                    <div className="flex flex-col gap-2 p-4 md:hidden">
                      {signals.map((signal, idx) => (
                        <motion.div
                          key={signal.pair + idx}
                          className="rounded-lg border p-3 space-y-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{signal.pair}</span>
                            <StatusBadge status={signal.status} />
                          </div>
                          <div className="flex items-center gap-2">
                            <DirectionBadge direction={signal.direction} />
                            <Badge variant="secondary" className="text-[10px]">
                              {signal.timeframe}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                            <div>
                              <span className="block text-[10px] uppercase tracking-wider">Entry</span>
                              <span className="font-mono text-foreground">{signal.entry}</span>
                            </div>
                            <div>
                              <span className="block text-[10px] uppercase tracking-wider text-rose-500">SL</span>
                              <span className="font-mono text-foreground">{signal.sl}</span>
                            </div>
                            <div>
                              <span className="block text-[10px] uppercase tracking-wider text-emerald-500">TP</span>
                              <span className="font-mono text-foreground">{signal.tp}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">
            {/* Watchlist */}
            <motion.div variants={itemVariants}>
              <Card className="hover:border-emerald-500/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="size-5 text-emerald-500" />
                    Watchlist
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <ScrollArea className="max-h-80">
                    <div className="flex flex-col">
                      {watchlist.map((item, idx) => {
                        const isPositive = item.change >= 0
                        return (
                          <motion.div
                            key={item.pair}
                            className="flex items-center justify-between px-6 py-2.5 border-b last:border-b-0 hover:bg-emerald-500/[0.02] transition-colors cursor-pointer"
                            whileHover={{ x: 2 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          >
                            <div>
                              <p className="text-sm font-semibold">{item.pair}</p>
                              <p className="text-xs font-mono text-muted-foreground">{item.price}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {isPositive ? (
                                <TrendingUp className="size-3.5 text-emerald-500" />
                              ) : (
                                <TrendingDown className="size-3.5 text-rose-500" />
                              )}
                              <span
                                className={`text-sm font-semibold ${
                                  isPositive ? 'text-emerald-500' : 'text-rose-500'
                                }`}
                              >
                                {isPositive ? '+' : ''}
                                {item.change}%
                              </span>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div variants={itemVariants}>
              <Card className="hover:border-emerald-500/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CalendarDays className="size-5 text-emerald-500" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0 px-0">
                  {events.map((event, idx) => (
                    <motion.div
                      key={event.name}
                      className="flex items-start gap-3 px-6 py-3 border-b last:border-b-0 hover:bg-emerald-500/[0.02] transition-colors"
                      whileHover={{ x: 2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <div className="mt-0.5 rounded-md bg-emerald-500/10 p-1.5">
                        <CalendarDays className="size-3.5 text-emerald-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{event.name}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3" />
                          {event.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Journal Entry */}
            <motion.div variants={itemVariants}>
              <Card className="hover:border-emerald-500/20 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Journal</CardTitle>
                  <CardDescription>How are you feeling about the market?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    placeholder="How are you feeling about today's market?"
                    className="min-h-20 resize-none bg-muted/30 border-muted-foreground/10 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20"
                    value={journalText}
                    onChange={(e) => setJournalText(e.target.value)}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={mood === 'bullish' ? 'default' : 'outline'}
                        className={
                          mood === 'bullish'
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
                            : 'border-emerald-500/25 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-500 dark:text-emerald-400'
                        }
                        onClick={() => setMood(mood === 'bullish' ? null : 'bullish')}
                      >
                        <TrendingUp className="size-3.5" />
                        Bullish
                      </Button>
                      <Button
                        size="sm"
                        variant={mood === 'bearish' ? 'default' : 'outline'}
                        className={
                          mood === 'bearish'
                            ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-600'
                            : 'border-rose-500/25 text-rose-600 hover:bg-rose-500/10 hover:text-rose-500 dark:text-rose-400'
                        }
                        onClick={() => setMood(mood === 'bearish' ? null : 'bearish')}
                      >
                        <TrendingDown className="size-3.5" />
                        Bearish
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={handleSaveJournal}
                    >
                      {journalSaved ? (
                        <>
                          <span className="size-2 rounded-full bg-white" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Save className="size-3.5" />
                          Save
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* ── Performance Chart (Full Width) ─────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <Card className="hover:border-emerald-500/20 transition-colors">
            <CardHeader>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="size-5 text-emerald-500" />
                    Performance — P&L
                  </CardTitle>
                  <CardDescription>Profit & loss over the last 30 days</CardDescription>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-emerald-500" />
                    <span className="text-muted-foreground">P&L</span>
                  </div>
                  <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-500/25 dark:text-emerald-400">
                    <ArrowUpRight className="size-3" />
                    +$2,340
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pnlData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="50%" stopColor="#10b981" stopOpacity={0.1} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={false}
                      axisLine={false}
                      interval={4}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v: number) => `$${v}`}
                      width={60}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                      formatter={(value: number) => [`$${value.toFixed(2)}`, 'P&L']}
                    />
                    <Area
                      type="monotone"
                      dataKey="pnl"
                      stroke="#10b981"
                      strokeWidth={2.5}
                      fill="url(#pnlGradient)"
                      dot={false}
                      activeDot={{
                        r: 5,
                        fill: '#10b981',
                        stroke: 'hsl(var(--background))',
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}