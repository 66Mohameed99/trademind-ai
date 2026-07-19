'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ImagePlus,
  Upload,
  TrendingUp,
  Target,
  Shield,
  Brain,
  FileImage,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  BarChart3,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

// --- Types ---

interface AnalysisResults {
  trend: {
    direction: 'Uptrend' | 'Downtrend' | 'Ranging'
    description: string
  }
  keyLevels: {
    support: number[]
    resistance: number[]
  }
  smc: {
    bos: string
    choch: string
    orderBlocks: string
    liquidity: string
    fvg: string
  }
  risk: {
    level: 'Low' | 'Moderate' | 'High'
    sl: string
    tp: string
    rr: string
    positionSize: string
  }
  summary: string
}

// --- Mock Analysis Data ---

const mockAnalysis: AnalysisResults = {
  trend: {
    direction: 'Uptrend',
    description:
      'Higher highs and higher lows detected on H4 timeframe. The most recent BOS at 1.0890 confirms bullish continuation. Price is currently trading above the 50 EMA and 200 EMA, adding confluence to the bullish bias.',
  },
  keyLevels: {
    support: [1.0820, 1.0750, 1.0680],
    resistance: [1.0950, 1.1020, 1.1100],
  },
  smc: {
    bos: 'Bullish BOS at 1.0890',
    choch: 'No CHOCH detected',
    orderBlocks: 'Bullish OB at 1.0780-1.0800',
    liquidity: 'Buy-side liquidity pool at 1.1020',
    fvg: 'Bullish FVG at 1.0850-1.0870',
  },
  risk: {
    level: 'Moderate',
    sl: '1.0750',
    tp: '1.1020',
    rr: '1:1.8',
    positionSize: '2% of account',
  },
  summary:
    'The chart shows a clear uptrend on the H4 timeframe with a recent BOS confirming continuation. Price is currently in a minor pullback phase, which aligns with a retest of the newly formed demand zone at the 1.0800-1.0820 area.\n\nA Bullish Order Block has been identified at 1.0780-1.0800, which also aligns with the 50% Fibonacci retracement of the last impulse move. This confluence zone offers an attractive entry with a well-defined stop loss below the order block at 1.0750.\n\nThe primary target sits at the buy-side liquidity pool near 1.1020, which coincides with a previous structural high and the 1.272 Fibonacci extension. The risk-to-reward ratio of 1:1.8 meets minimum trade quality standards. Traders should wait for a confirmation candle (rejection wick or engulfing) at the demand zone before committing to a position.',
}

// --- SVG Candlestick Chart (mock) ---

function MockCandlestickChart() {
  // Generate mock candle data
  const candles = [
    { o: 40, c: 55, h: 60, l: 35, green: true },
    { o: 55, c: 48, h: 60, l: 42, green: false },
    { o: 48, c: 65, h: 70, l: 45, green: true },
    { o: 65, c: 58, h: 68, l: 52, green: false },
    { o: 58, c: 72, h: 78, l: 55, green: true },
    { o: 72, c: 68, h: 76, l: 62, green: false },
    { o: 68, c: 82, h: 88, l: 65, green: true },
    { o: 82, c: 75, h: 85, l: 70, green: false },
    { o: 75, c: 90, h: 95, l: 72, green: true },
    { o: 90, c: 85, h: 94, l: 80, green: false },
    { o: 85, c: 100, h: 105, l: 82, green: true },
    { o: 100, c: 95, h: 108, l: 92, green: false },
    { o: 95, c: 110, h: 115, l: 92, green: true },
    { o: 110, c: 102, h: 115, l: 98, green: false },
    { o: 102, c: 118, h: 122, l: 98, green: true },
    { o: 118, c: 108, h: 120, l: 105, green: false },
    { o: 108, c: 125, h: 130, l: 105, green: true },
    { o: 125, c: 120, h: 128, l: 115, green: false },
    { o: 120, c: 135, h: 140, l: 118, green: true },
    { o: 135, c: 128, h: 138, l: 124, green: false },
  ]

  const svgW = 600
  const svgH = 300
  const padding = { top: 20, right: 20, bottom: 30, left: 10 }
  const chartW = svgW - padding.left - padding.right
  const chartH = svgH - padding.top - padding.bottom
  const candleWidth = chartW / candles.length
  const bodyWidth = candleWidth * 0.6

  const allPrices = candles.flatMap((c) => [c.h, c.l])
  const minP = Math.min(...allPrices)
  const maxP = Math.max(...allPrices)
  const range = maxP - minP || 1

  const yScale = (p: number) =>
    padding.top + chartH - ((p - minP) / range) * chartH
  const xScale = (i: number) => padding.left + i * candleWidth + candleWidth / 2

  // Horizontal grid lines
  const gridLines = 5
  const gridValues = Array.from({ length: gridLines }, (_, i) =>
    minP + (range * i) / (gridLines - 1)
  )

  // Price axis labels (mock Forex prices)
  const priceLabels = ['1.0680', '1.0750', '1.0820', '1.0890', '1.0950']

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background */}
      <rect width={svgW} height={svgH} fill="#0f172a" rx="8" />

      {/* Grid lines */}
      {gridValues.map((val, i) => {
        const y = yScale(val)
        return (
          <g key={i}>
            <line
              x1={padding.left}
              y1={y}
              x2={svgW - padding.right}
              y2={y}
              stroke="#1e293b"
              strokeWidth="1"
            />
            <text
              x={svgW - padding.right + 4}
              y={y + 4}
              fill="#475569"
              fontSize="9"
              fontFamily="monospace"
            >
              {priceLabels[i] || ''}
            </text>
          </g>
        )
      })}

      {/* Vertical grid lines (time) */}
      {candles.map((_, i) => {
        if (i % 5 !== 0) return null
        const x = xScale(i)
        return (
          <line
            key={`vg-${i}`}
            x1={x}
            y1={padding.top}
            x2={x}
            y2={svgH - padding.bottom}
            stroke="#1e293b"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        )
      })}

      {/* Support / Resistance zones */}
      <rect
        x={padding.left}
        y={yScale(72) - 8}
        width={chartW}
        height={16}
        fill="rgba(16, 185, 129, 0.08)"
        rx="2"
      />
      <rect
        x={padding.left}
        y={yScale(118) - 8}
        width={chartW}
        height={16}
        fill="rgba(244, 63, 94, 0.08)"
        rx="2"
      />

      {/* Candles */}
      {candles.map((c, i) => {
        const x = xScale(i)
        const color = c.green ? '#10b981' : '#ef4444'
        const bodyTop = yScale(Math.max(c.o, c.c))
        const bodyBottom = yScale(Math.min(c.o, c.c))
        const bodyHeight = Math.max(bodyBottom - bodyTop, 1)

        return (
          <g key={i}>
            {/* Wick */}
            <line
              x1={x}
              y1={yScale(c.h)}
              x2={x}
              y2={yScale(c.l)}
              stroke={color}
              strokeWidth="1.5"
            />
            {/* Body */}
            <rect
              x={x - bodyWidth / 2}
              y={bodyTop}
              width={bodyWidth}
              height={bodyHeight}
              fill={color}
              rx="1"
            />
          </g>
        )
      })}

      {/* BOS marker */}
      <line
        x1={xScale(10)}
        y1={yScale(95)}
        x2={xScale(10)}
        y2={padding.top}
        stroke="#10b981"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.7"
      />
      <rect
        x={xScale(10) - 22}
        y={padding.top + 2}
        width="44"
        height="16"
        fill="#10b981"
        rx="3"
      />
      <text
        x={xScale(10)}
        y={padding.top + 13}
        fill="white"
        fontSize="8"
        fontWeight="bold"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        BOS
      </text>

      {/* FVG zone */}
      <rect
        x={xScale(11) - candleWidth}
        y={yScale(110)}
        width={candleWidth * 2}
        height={yScale(95) - yScale(110)}
        fill="rgba(16, 185, 129, 0.12)"
        stroke="#10b981"
        strokeWidth="0.5"
        strokeDasharray="4 2"
        rx="2"
      />
      <text
        x={xScale(11.5)}
        y={yScale(103)}
        fill="#10b981"
        fontSize="8"
        textAnchor="middle"
        fontFamily="sans-serif"
        opacity="0.8"
      >
        FVG
      </text>

      {/* OB zone */}
      <rect
        x={xScale(6)}
        y={yScale(82)}
        width={candleWidth * 3}
        height={yScale(68) - yScale(82)}
        fill="rgba(16, 185, 129, 0.1)"
        rx="2"
      />
      <text
        x={xScale(7.5)}
        y={yScale(75)}
        fill="#10b981"
        fontSize="7"
        textAnchor="middle"
        fontFamily="sans-serif"
        opacity="0.7"
      >
        OB
      </text>
    </svg>
  )
}

// --- Card Animation Variants ---

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const cardItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

// --- Component ---

export default function ChartAnalyzerView() {
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAnalysis, setHasAnalysis] = useState(false)
  const [hasUploaded, setHasUploaded] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResults | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setHasUploaded(true)
  }, [])

  const handleBrowse = useCallback(() => {
    setHasUploaded(true)
  }, [])

  const handleAnalyze = useCallback(() => {
    setIsAnalyzing(true)
    setHasAnalysis(false)
    setAnalysis(null)
    setTimeout(() => {
      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
      setHasAnalysis(true)
    }, 2000)
  }, [])

  const resetAll = useCallback(() => {
    setHasUploaded(false)
    setHasAnalysis(false)
    setIsAnalyzing(false)
    setAnalysis(null)
  }, [])

  const riskBadgeColor: Record<string, string> = {
    Low: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800',
    Moderate: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800',
    High: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800',
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6 space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold tracking-tight">Chart Analyzer</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Upload a chart screenshot and let AI identify patterns, levels, and trade setups
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Upload + Analysis */}
          <div className="space-y-6">
            {/* Upload Zone */}
            {!hasUploaded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <motion.div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      animate={isDragging ? { scale: 1.01 } : { scale: 1 }}
                      className={cn(
                        'flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed px-6 py-16 transition-colors cursor-pointer',
                        isDragging
                          ? 'border-emerald-500 bg-emerald-50/50'
                          : 'border-muted-foreground/25 hover:border-emerald-400/50 hover:bg-muted/30'
                      )}
                      onClick={handleBrowse}
                    >
                      <motion.div
                        animate={isDragging ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="flex size-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/50"
                      >
                        <ImagePlus className="size-8 text-emerald-600" />
                      </motion.div>
                      <div className="text-center">
                        <p className="text-sm font-medium">
                          {isDragging ? 'Drop your chart here' : 'Drop your chart screenshot here'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          or
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleBrowse()
                          }}
                        >
                          <Upload className="size-3.5 mr-1.5" />
                          Browse Files
                        </Button>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Supported: PNG, JPG, WEBP • Max 10MB
                      </p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative flex items-center justify-center rounded-t-xl bg-slate-900 p-4">
                      <MockCandlestickChart />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm"
                          onClick={resetAll}
                        >
                          <FileImage className="size-4" />
                        </Button>
                      </div>
                      <Badge className="absolute top-3 left-3 bg-emerald-500/90 text-white text-[10px]">
                        EUR/USD • H4
                      </Badge>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileImage className="size-4 text-emerald-600" />
                        <div>
                          <p className="text-sm font-medium">chart_h4_eurusd.png</p>
                          <p className="text-xs text-muted-foreground">Uploaded just now</p>
                        </div>
                      </div>
                      {!hasAnalysis && (
                        <Button
                          onClick={handleAnalyze}
                          disabled={isAnalyzing}
                          className="bg-emerald-600 text-white hover:bg-emerald-700"
                          size="sm"
                        >
                          {isAnalyzing ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              >
                                <Zap className="size-3.5" />
                              </motion.div>
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Brain className="size-3.5 mr-1.5" />
                              Analyze Chart
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Loading Skeleton */}
            <AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-6 space-y-3">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Analysis Results */}
            <AnimatePresence>
              {hasAnalysis && analysis && (
                <motion.div
                  variants={cardContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {/* Trend Detection */}
                  <motion.div variants={cardItemVariants}>
                    <Card className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <TrendingUp className="size-4 text-emerald-600" />
                          Trend Detection
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800">
                            <ArrowUpRight className="size-3 mr-1" />
                            {analysis.trend.direction}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {analysis.trend.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Key Levels */}
                  <motion.div variants={cardItemVariants}>
                    <Card className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Target className="size-4 text-emerald-600" />
                          Key Levels
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">
                          {/* Support */}
                          <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                              Support
                            </p>
                            {analysis.keyLevels.support.map((level, i) => (
                              <motion.div
                                key={level}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.08 }}
                                className="flex items-center gap-2 text-sm"
                              >
                                <ArrowUpRight className="size-3.5 text-emerald-500" />
                                <span className="font-mono text-foreground">{level.toFixed(4)}</span>
                                <span className="text-[10px] text-muted-foreground ml-auto">S{i + 1}</span>
                              </motion.div>
                            ))}
                          </div>
                          {/* Resistance */}
                          <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-rose-600">
                              Resistance
                            </p>
                            {analysis.keyLevels.resistance.map((level, i) => (
                              <motion.div
                                key={level}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.08 }}
                                className="flex items-center gap-2 text-sm"
                              >
                                <ArrowDownRight className="size-3.5 text-rose-500" />
                                <span className="font-mono text-foreground">{level.toFixed(4)}</span>
                                <span className="text-[10px] text-muted-foreground ml-auto">R{i + 1}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Smart Money Concepts */}
                  <motion.div variants={cardItemVariants}>
                    <Card className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Activity className="size-4 text-emerald-600" />
                          Smart Money Concepts
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-3">
                        {/* BOS */}
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-medium min-w-[90px]">BOS</span>
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800 text-[11px]">
                            {analysis.smc.bos}
                          </Badge>
                        </div>
                        <Separator />
                        {/* CHOCH */}
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-medium min-w-[90px]">CHOCH</span>
                          <span className="text-xs text-muted-foreground">{analysis.smc.choch}</span>
                        </div>
                        <Separator />
                        {/* Order Blocks */}
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-medium min-w-[90px]">Order Blocks</span>
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800 text-[11px]">
                            {analysis.smc.orderBlocks}
                          </Badge>
                        </div>
                        <Separator />
                        {/* Liquidity */}
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-medium min-w-[90px]">Liquidity</span>
                          <span className="text-xs text-muted-foreground text-right">{analysis.smc.liquidity}</span>
                        </div>
                        <Separator />
                        {/* FVG */}
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-medium min-w-[90px]">FVG</span>
                          <span className="text-xs text-muted-foreground text-right">{analysis.smc.fvg}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Risk Assessment */}
                  <motion.div variants={cardItemVariants}>
                    <Card className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Shield className="size-4 text-emerald-600" />
                          Risk Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-sm font-medium">Risk Level:</span>
                          <Badge className={cn('border', riskBadgeColor[analysis.risk.level])}>
                            {analysis.risk.level}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                              Stop Loss
                            </p>
                            <p className="text-sm font-mono font-semibold text-rose-600">
                              {analysis.risk.sl}
                            </p>
                          </div>
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                              Take Profit
                            </p>
                            <p className="text-sm font-mono font-semibold text-emerald-600">
                              {analysis.risk.tp}
                            </p>
                          </div>
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                              Risk / Reward
                            </p>
                            <p className="text-sm font-semibold">{analysis.risk.rr}</p>
                          </div>
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                              Position Size
                            </p>
                            <p className="text-sm font-semibold">{analysis.risk.positionSize}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* AI Summary */}
                  <motion.div variants={cardItemVariants}>
                    <Card className="overflow-hidden border-emerald-200/50 dark:border-emerald-800/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Brain className="size-4 text-emerald-600" />
                          AI Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {analysis.summary.split('\n\n').map((para, i) => (
                            <p
                              key={i}
                              className="text-sm text-muted-foreground leading-relaxed"
                            >
                              {para}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Chart Preview */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="overflow-hidden sticky top-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <BarChart3 className="size-4 text-emerald-600" />
                      Chart Preview
                    </CardTitle>
                    {hasAnalysis && (
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800">
                        <Zap className="size-3 mr-1" />
                        Analyzed
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0 p-4">
                  <div className="rounded-xl overflow-hidden bg-slate-900 ring-1 ring-slate-800">
                    <MockCandlestickChart />
                  </div>
                  {/* Chart info footer */}
                  <div className="flex items-center justify-between mt-3 px-1">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-emerald-500" />
                        <span className="text-[11px] text-muted-foreground">Bullish</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-rose-500" />
                        <span className="text-[11px] text-muted-foreground">Bearish</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-sm bg-emerald-500/20 border border-emerald-500/40" />
                        <span className="text-[11px] text-muted-foreground">Zone</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      EUR/USD • H4
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick stats (shown after analysis) */}
            <AnimatePresence>
              {hasAnalysis && analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-2 gap-3"
                >
                  <Card className="py-4">
                    <CardContent className="flex flex-col items-center gap-1 p-4">
                      <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Pattern Score</span>
                      <span className="text-2xl font-bold text-emerald-600">87%</span>
                    </CardContent>
                  </Card>
                  <Card className="py-4">
                    <CardContent className="flex flex-col items-center gap-1 p-4">
                      <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Confluences</span>
                      <span className="text-2xl font-bold text-emerald-600">5</span>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}