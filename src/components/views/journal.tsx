'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Brain,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Activity,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  X,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts'

// ─── Types ───────────────────────────────────────────────────────────────────

type TradeResult = 'Win' | 'Loss' | 'Break Even'
type SortKey =
  | 'date'
  | 'pair'
  | 'direction'
  | 'entry'
  | 'exit'
  | 'pnl'
  | 'result'

interface Trade {
  id: number
  date: string
  pair: string
  direction: 'Buy' | 'Sell'
  entry: number
  exit: number
  stopLoss: number
  takeProfit: number
  pnl: number
  result: TradeResult
  notes: string
  mood: string
  confidence: number
}

interface PnlDataPoint {
  date: string
  pnl: number
  fill: string
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const trades: Trade[] = [
  {
    id: 1,
    date: '2025-01-14',
    pair: 'EUR/USD',
    direction: 'Buy',
    entry: 1.0842,
    exit: 1.0898,
    stopLoss: 1.0812,
    takeProfit: 1.0910,
    pnl: 560,
    result: 'Win',
    notes: 'Strong BOS confirmation on 15m, entered on retest of supply zone.',
    mood: 'Bullish',
    confidence: 8,
  },
  {
    id: 2,
    date: '2025-01-14',
    pair: 'GBP/JPY',
    direction: 'Sell',
    entry: 191.45,
    exit: 191.12,
    stopLoss: 191.80,
    takeProfit: 190.90,
    pnl: 413.5,
    result: 'Win',
    notes: 'Range high rejection, bearish engulfing at key resistance.',
    mood: 'Neutral',
    confidence: 7,
  },
  {
    id: 3,
    date: '2025-01-13',
    pair: 'USD/JPY',
    direction: 'Buy',
    entry: 157.22,
    exit: 156.88,
    stopLoss: 156.95,
    takeProfit: 157.80,
    pnl: -340,
    result: 'Loss',
    notes: 'Stopped out by spike below support. Premature entry.',
    mood: 'Bullish',
    confidence: 6,
  },
  {
    id: 4,
    date: '2025-01-13',
    pair: 'AUD/USD',
    direction: 'Sell',
    entry: 0.6285,
    exit: 0.6251,
    stopLoss: 0.6310,
    takeProfit: 0.6240,
    pnl: 340,
    result: 'Win',
    notes: 'Clean CHoCH on 1H, liquidity sweep of previous highs.',
    mood: 'Bearish',
    confidence: 9,
  },
  {
    id: 5,
    date: '2025-01-12',
    pair: 'EUR/GBP',
    direction: 'Buy',
    entry: 0.8522,
    exit: 0.8524,
    stopLoss: 0.8500,
    takeProfit: 0.8560,
    pnl: 0,
    result: 'Break Even',
    notes: 'Price stalled at resistance, moved SL to breakeven and got out.',
    mood: 'Neutral',
    confidence: 5,
  },
  {
    id: 6,
    date: '2025-01-12',
    pair: 'XAU/USD',
    direction: 'Sell',
    entry: 2658.50,
    exit: 2672.30,
    stopLoss: 2675.00,
    takeProfit: 2638.00,
    pnl: -1380,
    result: 'Loss',
    notes: 'Gold rallied on USD weakness. Should have waited for confirmation.',
    mood: 'Neutral',
    confidence: 4,
  },
  {
    id: 7,
    date: '2025-01-11',
    pair: 'NZD/USD',
    direction: 'Buy',
    entry: 0.5688,
    exit: 0.5732,
    stopLoss: 0.5662,
    takeProfit: 0.5750,
    pnl: 440,
    result: 'Win',
    notes: 'Demand zone bounce with RSI divergence. Perfect entry.',
    mood: 'Bullish',
    confidence: 8,
  },
  {
    id: 8,
    date: '2025-01-11',
    pair: 'USD/CAD',
    direction: 'Sell',
    entry: 1.3520,
    exit: 1.3478,
    stopLoss: 1.3555,
    takeProfit: 1.3460,
    pnl: 420,
    result: 'Win',
    notes: 'Oil inventory data boosted CAD. Sold the breakout retest.',
    mood: 'Bearish',
    confidence: 7,
  },
  {
    id: 9,
    date: '2025-01-10',
    pair: 'GBP/USD',
    direction: 'Buy',
    entry: 1.2530,
    exit: 1.2505,
    stopLoss: 1.2490,
    takeProfit: 1.2590,
    pnl: -250,
    result: 'Loss',
    notes: 'UK CPI data missed expectations. Exit was too slow.',
    mood: 'Bullish',
    confidence: 6,
  },
  {
    id: 10,
    date: '2025-01-10',
    pair: 'EUR/JPY',
    direction: 'Buy',
    entry: 170.35,
    exit: 171.20,
    stopLoss: 170.00,
    takeProfit: 171.50,
    pnl: 637.5,
    result: 'Win',
    notes: 'Yen weakness across the board. Rode the trend to TP.',
    mood: 'Bullish',
    confidence: 9,
  },
]

const pnlChartData: PnlDataPoint[] = [
  { date: 'Jan 1', pnl: 320, fill: '#10b981' },
  { date: 'Jan 2', pnl: -180, fill: '#ef4444' },
  { date: 'Jan 3', pnl: 540, fill: '#10b981' },
  { date: 'Jan 4', pnl: 120, fill: '#10b981' },
  { date: 'Jan 5', pnl: -90, fill: '#ef4444' },
  { date: 'Jan 6', pnl: 780, fill: '#10b981' },
  { date: 'Jan 7', pnl: -420, fill: '#ef4444' },
  { date: 'Jan 8', pnl: 350, fill: '#10b981' },
  { date: 'Jan 9', pnl: -150, fill: '#ef4444' },
  { date: 'Jan 10', pnl: 387, fill: '#10b981' },
  { date: 'Jan 11', pnl: 860, fill: '#10b981' },
  { date: 'Jan 12', pnl: 0, fill: '#94a3b8' },
  { date: 'Jan 13', pnl: -0, fill: '#ef4444' },
  { date: 'Jan 14', pnl: 973, fill: '#10b981' },
]

const chartConfig = {
  pnl: {
    label: 'P&L ($)',
    color: '#10b981',
  },
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) {
      displayRef.current = value
      return
    }

    const duration = 1200
    const start = performance.now()

    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(eased * value)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [value])

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  prefix,
  suffix,
  decimals,
  icon: Icon,
  colorClass,
  subValue,
}: {
  label: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  icon: React.ComponentType<{ className?: string }>
  colorClass?: string
  subValue?: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="rounded-xl border bg-card p-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div
          className={`rounded-lg p-2 ${colorClass || 'bg-emerald-100 dark:bg-emerald-900/30'}`}
        >
          <Icon
            className={`size-4 ${colorClass?.includes('rose') || colorClass?.includes('red') ? 'text-rose-600 dark:text-rose-400' : colorClass?.includes('amber') ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}
          />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold tabular-nums">
          <AnimatedCounter
            value={value}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
          />
        </p>
        {subValue && <div className="mt-1">{subValue}</div>}
      </div>
    </motion.div>
  )
}

// ─── AI Feedback Panel ───────────────────────────────────────────────────────

function AIFeedbackPanel() {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-3.5">
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="size-5" />
            <h3 className="font-semibold">AI Trade Analysis</h3>
          </div>
          <p className="mt-0.5 text-xs text-emerald-100">
            Latest trade: EUR/USD Buy — Win +$560
          </p>
        </div>
        <div className="p-5 space-y-4">
          {/* Entry Analysis */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <CheckCircle2 className="size-4 text-emerald-500" />
              Entry Timing
            </div>
            <p className="text-sm text-muted-foreground pl-6">
              Your entry was well-timed with the BOS confirmation on the 15m
              chart. The retest of the supply zone provided excellent
              confluence. Consider waiting for the candle close next time for
              even higher probability setups.
            </p>
          </div>

          <Separator />

          {/* Suggestions */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Lightbulb className="size-4 text-amber-500" />
              Suggestions for Improvement
            </div>
            <ul className="space-y-1 pl-6">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <ArrowUpRight className="mt-0.5 size-3 shrink-0 text-emerald-500" />
                Your R:R ratio of 1:2.3 is excellent — keep this discipline.
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <ArrowUpRight className="mt-0.5 size-3 shrink-0 text-emerald-500" />
                Consider scaling out 50% at the first TP for better risk
                management.
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="mt-0.5 size-3 shrink-0 text-amber-500" />
                You&apos;ve been overtrading on Fridays — consider reducing
                position size on low-liquidity sessions.
              </li>
            </ul>
          </div>

          <Separator />

          {/* Psychology */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Brain className="size-4 text-purple-500" />
              Psychology Insights
            </div>
            <p className="text-sm text-muted-foreground pl-6">
              Your bullish mood before this trade correlated with a
              well-planned entry. However, note that 3 of your 4 losses this
              week also started with a &quot;Bullish&quot; mood — be mindful
              of confirmation bias when feeling overly confident.
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950"
            onClick={() => {
              if (expanded) { setExpanded(false); return }
              setLoading(true)
              setTimeout(() => {
                setLoading(false)
                setExpanded(true)
                toast.success('AI Analysis Complete', { description: 'Full trade analysis has been generated.' })
              }, 1500)
            }}
            disabled={loading}
          >
            {loading ? (
              <><Loader2 className="mr-2 size-4 animate-spin" />Analyzing...</>
            ) : expanded ? (
              <><ChevronUp className="mr-2 size-4" />Show Less</>
            ) : (
              <><Sparkles className="mr-2 size-4" />Get Full Analysis</>
            )}
          </Button>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 space-y-3 text-sm text-muted-foreground"
            >
              <Separator />
              <div className="space-y-2 pt-2">
                <p className="font-medium text-foreground">Risk-Reward Analysis</p>
                <p>Your average R:R of 1:2.3 is in the top 15% of traders on the platform. Your position sizing has been consistent, averaging 1.2% risk per trade.</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Pattern Recognition</p>
                <p>You perform best on H4 timeframe with order block entries (78% win rate). Your M15 scalping trades show lower consistency (52% win rate) — consider focusing on higher timeframes.</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Weekly Goal Progress</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs"><span>Target P&amp;L</span><span className="text-emerald-600 font-medium">$3,950 / $5,000</span></div>
                  <Progress value={79} className="h-1.5 [&>[data-slot=progress-indicator]]:bg-emerald-500" />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── New Trade Dialog ────────────────────────────────────────────────────────

function NewTradeDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [direction, setDirection] = useState<'Buy' | 'Sell'>('Buy')
  const [mood, setMood] = useState('Neutral')
  const [confidence, setConfidence] = useState([5])

  const handleClose = useCallback(
    (val: boolean) => {
      if (!val) {
        setDirection('Buy')
        setMood('Neutral')
        setConfidence([5])
      }
      onOpenChange(val)
    },
    [onOpenChange]
  )

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl">Log New Trade</DialogTitle>
            <DialogDescription>
              Record your trade details for analysis and AI feedback.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {/* Pair */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Currency Pair</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a pair" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'EUR/USD',
                    'GBP/USD',
                    'USD/JPY',
                    'GBP/JPY',
                    'AUD/USD',
                    'NZD/USD',
                    'USD/CAD',
                    'EUR/GBP',
                    'EUR/JPY',
                    'XAU/USD',
                  ].map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Direction */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Direction</Label>
              <RadioGroup
                value={direction}
                onValueChange={(v) => setDirection(v as 'Buy' | 'Sell')}
                className="flex gap-4"
              >
                <div className="flex items-center gap-2 rounded-lg border px-4 py-3 flex-1 cursor-pointer transition-colors has-[[data-state=checked]]:border-emerald-500 has-[[data-state=checked]]:bg-emerald-50 dark:has-[[data-state=checked]]:bg-emerald-950/30">
                  <RadioGroupItem value="Buy" id="dir-buy" />
                  <Label
                    htmlFor="dir-buy"
                    className="flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <ArrowUpRight className="size-4 text-emerald-500" />
                    Buy
                  </Label>
                </div>
                <div className="flex items-center gap-2 rounded-lg border px-4 py-3 flex-1 cursor-pointer transition-colors has-[[data-state=checked]]:border-rose-500 has-[[data-state=checked]]:bg-rose-50 dark:has-[[data-state=checked]]:bg-rose-950/30">
                  <RadioGroupItem value="Sell" id="dir-sell" />
                  <Label
                    htmlFor="dir-sell"
                    className="flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <ArrowDownRight className="size-4 text-rose-500" />
                    Sell
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Price Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Entry Price</Label>
                <Input type="number" step="0.0001" placeholder="0.0000" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Exit Price</Label>
                <Input type="number" step="0.0001" placeholder="0.0000" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Stop Loss</Label>
                <Input type="number" step="0.0001" placeholder="0.0000" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Take Profit</Label>
                <Input type="number" step="0.0001" placeholder="0.0000" />
              </div>
            </div>

            {/* Lot Size */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Lot Size</Label>
              <Input type="number" step="0.01" placeholder="0.10" />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Trade Notes</Label>
              <Textarea
                placeholder="Describe your analysis, reasoning, and any observations..."
                rows={3}
              />
            </div>

            <Separator />

            {/* Psychology Section */}
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold mb-4">
                <Brain className="size-4 text-purple-500" />
                Psychology
              </h4>

              {/* Mood */}
              <div className="space-y-2 mb-4">
                <Label className="text-sm font-medium">Market Mood</Label>
                <RadioGroup
                  value={mood}
                  onValueChange={setMood}
                  className="grid grid-cols-3 gap-3"
                >
                  <div className="flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors has-[[data-state=checked]]:border-emerald-500 has-[[data-state=checked]]:bg-emerald-50 dark:has-[[data-state=checked]]:bg-emerald-950/30">
                    <RadioGroupItem value="Bullish" id="mood-bull" />
                    <Label
                      htmlFor="mood-bull"
                      className="cursor-pointer text-sm flex-1"
                    >
                      🐂 Bullish
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors has-[[data-state=checked]]:border-slate-500 has-[[data-state=checked]]:bg-slate-50 dark:has-[[data-state=checked]]:bg-slate-900/30">
                    <RadioGroupItem value="Neutral" id="mood-neut" />
                    <Label
                      htmlFor="mood-neut"
                      className="cursor-pointer text-sm flex-1"
                    >
                      😐 Neutral
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors has-[[data-state=checked]]:border-rose-500 has-[[data-state=checked]]:bg-rose-50 dark:has-[[data-state=checked]]:bg-rose-950/30">
                    <RadioGroupItem value="Bearish" id="mood-bear" />
                    <Label
                      htmlFor="mood-bear"
                      className="cursor-pointer text-sm flex-1"
                    >
                      🐻 Bearish
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Confidence */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Confidence Level</Label>
                  <span className="text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                    {confidence[0]}/10
                  </span>
                </div>
                <Slider
                  value={confidence}
                  onValueChange={setConfidence}
                  min={1}
                  max={10}
                  step={1}
                  className="[&_[data-slot=slider-range]]:bg-emerald-500 [&_[data-slot=slider-thumb]]:border-emerald-500"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6 gap-3">
            <Button
              variant="outline"
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => { handleClose(false); toast.success('Trade logged!', { description: 'Your trade has been saved to the journal.' }) }}>
              <Plus className="mr-2 size-4" />
              Save Trade
            </Button>
            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white" onClick={() => { handleClose(false); setTimeout(() => toast.success('AI Feedback Ready', { description: 'Your trade analysis is available in the AI panel.' }), 1000) }}>
              <Sparkles className="mr-2 size-4" />
              Save & Get AI Feedback
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Sort Header ─────────────────────────────────────────────────────────────

function SortableHeader({
  label,
  sortKey,
  currentSort,
  sortDir,
  onSort,
}: {
  label: string
  sortKey: SortKey
  currentSort: SortKey
  sortDir: 'asc' | 'desc'
  onSort: (key: SortKey) => void
}) {
  const isActive = currentSort === sortKey
  return (
    <TableHead
      className="cursor-pointer select-none hover:text-foreground transition-colors"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-1">
        {label}
        {isActive ? (
          sortDir === 'asc' ? (
            <ChevronUp className="size-3.5 text-emerald-500" />
          ) : (
            <ChevronDown className="size-3.5 text-emerald-500" />
          )
        ) : (
          <ChevronDown className="size-3.5 opacity-30" />
        )}
      </div>
    </TableHead>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function JournalView() {
  const [filter, setFilter] = useState('all')
  const [newTradeOpen, setNewTradeOpen] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const handleSort = useCallback(
    (key: SortKey) => {
      if (sortKey === key) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
      } else {
        setSortKey(key)
        setSortDir('desc')
      }
    },
    [sortKey]
  )

  const filteredTrades = useMemo(() => {
    let result = [...trades]
    if (filter !== 'all') {
      result = result.filter((t) => t.result.toLowerCase().replace(' ', '-') === filter)
    }
    result.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'date':
          cmp = a.date.localeCompare(b.date)
          break
        case 'pair':
          cmp = a.pair.localeCompare(b.pair)
          break
        case 'direction':
          cmp = a.direction.localeCompare(b.direction)
          break
        case 'entry':
          cmp = a.entry - b.entry
          break
        case 'exit':
          cmp = a.exit - b.exit
          break
        case 'pnl':
          cmp = a.pnl - b.pnl
          break
        case 'result':
          cmp = a.result.localeCompare(b.result)
          break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return result
  }, [filter, sortKey, sortDir])

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ── Header ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Trading Journal
            </h1>
            <p className="text-sm text-muted-foreground">
              Track, analyze, and improve your trading performance
            </p>
          </div>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => setNewTradeOpen(true)}
          >
            <Plus className="mr-2 size-4" />
            New Trade
          </Button>
        </motion.div>

        {/* ── Filter Tabs ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6"
        >
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="bg-muted/60">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="win">Win</TabsTrigger>
              <TabsTrigger value="loss">Loss</TabsTrigger>
              <TabsTrigger value="break-even">Break Even</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* ── Stats Summary ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5"
        >
          <StatCard
            label="Total Trades"
            value={156}
            icon={Activity}
          />
          <StatCard
            label="Win Rate"
            value={67.5}
            suffix="%"
            decimals={1}
            icon={Target}
            subValue={
              <Progress
                value={67.5}
                className="mt-2 h-1.5 [&>[data-slot=progress-indicator]]:bg-emerald-500"
              />
            }
          />
          <StatCard
            label="Avg Win"
            value={245}
            prefix="+$"
            icon={TrendingUp}
          />
          <StatCard
            label="Avg Loss"
            value={128}
            prefix="-$"
            icon={TrendingDown}
            colorClass="bg-rose-100 dark:bg-rose-900/30"
          />
          <StatCard
            label="Profit Factor"
            value={1.92}
            decimals={2}
            icon={DollarSign}
          />
        </motion.div>

        {/* ── P&L Chart ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <Card className="py-4">
            <div className="px-6 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold">
                    Daily P&L
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Last 14 days performance
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 dark:bg-emerald-950/30">
                  <TrendingUp className="size-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    +$3,950
                  </span>
                </div>
              </div>
            </div>
            <div className="px-2">
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <BarChart data={pnlChartData} barSize={28}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => (
                          <span
                            className={
                              Number(value) >= 0
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-rose-600 dark:text-rose-400'
                            }
                          >
                            {Number(value) >= 0 ? '+' : ''}$
                            {Number(value).toLocaleString()}
                          </span>
                        )}
                      />
                    }
                  />
                  <Bar dataKey="pnl" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </Card>
        </motion.div>

        {/* ── Trade History + AI Feedback ───────────────────────── */}
        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          {/* Trade History Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex-1 min-w-0"
          >
            <Card className="py-4">
              <div className="px-6 pb-2">
                <h2 className="text-base font-semibold">
                  Trade History
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({filteredTrades.length} trades)
                  </span>
                </h2>
              </div>
              <ScrollArea className="max-h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <SortableHeader
                        label="Date"
                        sortKey="date"
                        currentSort={sortKey}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                      <SortableHeader
                        label="Pair"
                        sortKey="pair"
                        currentSort={sortKey}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                      <SortableHeader
                        label="Dir"
                        sortKey="direction"
                        currentSort={sortKey}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                      <SortableHeader
                        label="Entry"
                        sortKey="entry"
                        currentSort={sortKey}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                      <SortableHeader
                        label="Exit"
                        sortKey="exit"
                        currentSort={sortKey}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                      <SortableHeader
                        label="P&L"
                        sortKey="pnl"
                        currentSort={sortKey}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                      <SortableHeader
                        label="Result"
                        sortKey="result"
                        currentSort={sortKey}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                      <TableHead className="hidden lg:table-cell">
                        Notes
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredTrades.map((trade) => (
                        <motion.tr
                          key={trade.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border-b transition-colors hover:bg-muted/50"
                        >
                          <TableCell className="text-sm">
                            {trade.date}
                          </TableCell>
                          <TableCell className="text-sm font-medium">
                            {trade.pair}
                          </TableCell>
                          <TableCell>
                            {trade.direction === 'Buy' ? (
                              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0 gap-0.5">
                                <ArrowUpRight className="size-3" />
                                Buy
                              </Badge>
                            ) : (
                              <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-0 gap-0.5">
                                <ArrowDownRight className="size-3" />
                                Sell
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-sm font-mono tabular-nums">
                            {trade.entry.toFixed(
                              trade.pair === 'XAU/USD' ? 2 : 4
                            )}
                          </TableCell>
                          <TableCell className="text-sm font-mono tabular-nums">
                            {trade.exit.toFixed(
                              trade.pair === 'XAU/USD' ? 2 : 4
                            )}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`text-sm font-semibold tabular-nums ${
                                trade.pnl > 0
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : trade.pnl < 0
                                    ? 'text-rose-600 dark:text-rose-400'
                                    : 'text-muted-foreground'
                              }`}
                            >
                              {trade.pnl > 0 ? '+' : ''}
                              ${Math.abs(trade.pnl).toLocaleString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            {trade.result === 'Win' ? (
                              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">
                                Win
                              </Badge>
                            ) : trade.result === 'Loss' ? (
                              <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-0">
                                Loss
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="gap-0.5"
                              >
                                <Minus className="size-3" />
                                Even
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell max-w-[200px]">
                            <span className="line-clamp-1 text-xs text-muted-foreground">
                              {trade.notes}
                            </span>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </ScrollArea>
            </Card>
          </motion.div>

          {/* AI Feedback Panel */}
          <div className="w-full lg:w-[340px] shrink-0">
            <AIFeedbackPanel />
          </div>
        </div>
      </main>

      {/* New Trade Dialog */}
      <NewTradeDialog open={newTradeOpen} onOpenChange={setNewTradeOpen} />
    </div>
  )
}