'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Star,
  Clock,
  BookOpen,
  Lock,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Shield,
  Zap,
  Trophy,
  X,
  Play,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'

// ─── Types ───────────────────────────────────────────────────────────────────

type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro'
type StepStatus = 'completed' | 'current' | 'locked'

interface Lesson {
  id: number
  title: string
  duration: string
  completed: boolean
}

interface Course {
  id: number
  title: string
  description: string
  level: CourseLevel
  duration: string
  lessonsCount: number
  progress: number | null // null = not enrolled
  rating: number
  icon: React.ReactNode
  gradient: string
  lessons: Lesson[]
}

// ─── Data ────────────────────────────────────────────────────────────────────

const courses: Course[] = [
  {
    id: 1,
    title: 'Technical Analysis Masterclass',
    description:
      'Master chart patterns, indicators, and technical tools used by professional traders worldwide.',
    level: 'Beginner',
    duration: '12h',
    lessonsCount: 24,
    progress: 75,
    rating: 4.8,
    icon: <BarChart3 className="size-8 text-white" />,
    gradient: 'from-emerald-500 to-emerald-700',
    lessons: Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      title: [
        'Introduction to Technical Analysis',
        'Understanding Candlestick Charts',
        'Support & Resistance Levels',
        'Trend Lines & Channels',
        'Moving Averages (SMA & EMA)',
        'RSI & Stochastic Oscillators',
        'MACD Indicator Deep Dive',
        'Bollinger Bands Strategy',
        'Fibonacci Retracement Basics',
        'Chart Patterns: Head & Shoulders',
        'Chart Patterns: Double Top/Bottom',
        'Triangle Patterns & Breakouts',
        'Volume Analysis',
        'Price Action vs Indicators',
        'Multi-Timeframe Analysis',
        'Trading with Confluence',
        'Building a Watchlist',
        'Scanning for Setups',
        'Backtesting Your Strategy',
        'Risk-Reward Ratios',
        'Entry & Exit Techniques',
        'Advanced Chart Patterns',
        'Putting It All Together',
        'Final Assessment & Review',
      ][i],
      duration: `${20 + Math.floor(Math.random() * 25)}min`,
      completed: i < 18,
    })),
  },
  {
    id: 2,
    title: 'Risk Management Fundamentals',
    description:
      'Learn the critical principles of risk management that separate profitable traders from the rest.',
    level: 'Beginner',
    duration: '8h',
    lessonsCount: 16,
    progress: 45,
    rating: 4.9,
    icon: <Shield className="size-8 text-white" />,
    gradient: 'from-emerald-500 to-teal-600',
    lessons: Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      title: [
        'Why Risk Management Matters',
        'Position Sizing Basics',
        'Understanding Leverage',
        'Stop Loss Strategies',
        'Take Profit Targets',
        'Risk-Reward Ratio Mastery',
        'Drawdown Management',
        'Portfolio Diversification',
        'Correlation Analysis',
        'Maximum Daily Loss Limits',
        'Trailing Stop Techniques',
        'Scaling In & Out',
        'Hedging Strategies',
        'Risk Per Trade Calculation',
        'Building a Risk Plan',
        'Psychology of Risk',
      ][i],
      duration: `${15 + Math.floor(Math.random() * 30)}min`,
      completed: i < 7,
    })),
  },
  {
    id: 3,
    title: 'Price Action Trading',
    description:
      'Decode market movements through pure price action — no indicators needed for consistent profits.',
    level: 'Intermediate',
    duration: '16h',
    lessonsCount: 32,
    progress: 90,
    rating: 4.7,
    icon: <TrendingUp className="size-8 text-white" />,
    gradient: 'from-amber-500 to-orange-600',
    lessons: Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      title: `Price Action Lesson ${i + 1}: ${
        [
          'Naked Chart Reading',
          'Supply & Demand Zones',
          'Order Blocks Identification',
          'Fair Value Gaps',
          'Liquidity Concepts',
          'Break of Structure (BOS)',
          'Change of Character (CHoCH)',
          'Market Structure Shifts',
        ][i % 8] || 'Advanced Application'
      }`,
      duration: `${20 + Math.floor(Math.random() * 20)}min`,
      completed: i < 29,
    })),
  },
  {
    id: 4,
    title: 'Smart Money Concepts',
    description:
      'Understand institutional order flow and smart money techniques to trade alongside the big players.',
    level: 'Advanced',
    duration: '14h',
    lessonsCount: 28,
    progress: null,
    rating: 4.6,
    icon: <Zap className="size-8 text-white" />,
    gradient: 'from-rose-500 to-pink-600',
    lessons: Array.from({ length: 28 }, (_, i) => ({
      id: i + 1,
      title: `SMC Lesson ${i + 1}`,
      duration: `${25 + Math.floor(Math.random() * 20)}min`,
      completed: false,
    })),
  },
  {
    id: 5,
    title: 'Forex Market Structure',
    description:
      'Navigate the forex market with confidence. Understand sessions, pairs, and global dynamics.',
    level: 'Beginner',
    duration: '10h',
    lessonsCount: 20,
    progress: 100,
    rating: 4.5,
    icon: <TrendingUp className="size-8 text-white" />,
    gradient: 'from-emerald-600 to-green-700',
    lessons: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Forex Fundamentals ${i + 1}`,
      duration: `${15 + Math.floor(Math.random() * 30)}min`,
      completed: true,
    })),
  },
  {
    id: 6,
    title: 'Candlestick Patterns Deep Dive',
    description:
      'From dojis to engulfing patterns — master every candlestick formation for precise entries.',
    level: 'Intermediate',
    duration: '9h',
    lessonsCount: 18,
    progress: null,
    rating: 4.8,
    icon: <BarChart3 className="size-8 text-white" />,
    gradient: 'from-amber-600 to-yellow-600',
    lessons: Array.from({ length: 18 }, (_, i) => ({
      id: i + 1,
      title: `Candlestick Pattern ${i + 1}`,
      duration: `${20 + Math.floor(Math.random() * 25)}min`,
      completed: false,
    })),
  },
  {
    id: 7,
    title: 'Trading Psychology',
    description:
      'Master your emotions, build discipline, and develop the mindset of a consistently profitable trader.',
    level: 'Beginner',
    duration: '6h',
    lessonsCount: 12,
    progress: 30,
    rating: 4.9,
    icon: <Trophy className="size-8 text-white" />,
    gradient: 'from-emerald-400 to-cyan-600',
    lessons: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: [
        'The Psychology of Trading',
        'Fear & Greed Cycle',
        'Developing Discipline',
        'Handling Losses Gracefully',
        'Building Confidence',
        'Avoiding Revenge Trading',
        'The Flow State in Trading',
        'Journaling for Growth',
        'Meditation & Focus',
        'Creating Trading Rituals',
        'Stress Management',
        'Building a Winning Mindset',
      ][i],
      duration: `${15 + Math.floor(Math.random() * 20)}min`,
      completed: i < 4,
    })),
  },
  {
    id: 8,
    title: 'Algorithmic Trading Intro',
    description:
      'Enter the world of algo trading. Learn to code, test, and deploy automated trading strategies.',
    level: 'Advanced',
    duration: '12h',
    lessonsCount: 24,
    progress: null,
    rating: 4.4,
    icon: <Zap className="size-8 text-white" />,
    gradient: 'from-rose-600 to-red-600',
    lessons: Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      title: `Algo Trading Module ${i + 1}`,
      duration: `${25 + Math.floor(Math.random() * 30)}min`,
      completed: false,
    })),
  },
]

const learningPathSteps: {
  label: string
  status: StepStatus
}[] = [
  { label: 'Trading Basics', status: 'completed' },
  { label: 'Technical Analysis', status: 'completed' },
  { label: 'Risk Management', status: 'current' },
  { label: 'Advanced Strategies', status: 'locked' },
  { label: 'Professional Trading', status: 'locked' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getLevelColor(level: CourseLevel) {
  switch (level) {
    case 'Beginner':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    case 'Intermediate':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    case 'Advanced':
      return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
    case 'Pro':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
  }
}

function getTopBarColor(level: CourseLevel) {
  switch (level) {
    case 'Beginner':
      return 'bg-emerald-500'
    case 'Intermediate':
      return 'bg-amber-500'
    case 'Advanced':
      return 'bg-rose-500'
    case 'Pro':
      return 'bg-purple-500'
  }
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${
            i < Math.floor(rating)
              ? 'fill-amber-400 text-amber-400'
              : i < rating
                ? 'fill-amber-400/50 text-amber-400'
                : 'text-muted-foreground/30'
          }`}
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{rating}</span>
    </div>
  )
}

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
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

const cardHover = {
  y: -6,
  boxShadow:
    '0 20px 40px -12px rgba(16, 185, 129, 0.15)',
  transition: { type: 'spring', stiffness: 400, damping: 20 },
}

// ─── Course Detail Modal ─────────────────────────────────────────────────────

function CourseDetailModal({
  course,
  open,
  onOpenChange,
  onCourseUpdate,
}: {
  course: Course | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onCourseUpdate: (course: Course) => void
}) {
  if (!course) return null

  const completedCount = course.lessons.filter((l) => l.completed).length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-0">
        {/* Gradient Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative bg-gradient-to-r ${course.gradient} px-6 py-8 text-white`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                {course.icon}
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-white">
                  {course.title}
                </DialogTitle>
                <DialogDescription className="mt-1 text-white/80">
                  {course.description}
                </DialogDescription>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Badge className={`${getLevelColor(course.level)} border-0`}>
              {course.level}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-white/80">
              <Clock className="size-3.5" /> {course.duration}
            </span>
            <span className="flex items-center gap-1 text-sm text-white/80">
              <BookOpen className="size-3.5" /> {course.lessonsCount} lessons
            </span>
            <Stars rating={course.rating} />
          </div>
          {course.progress !== null && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>
                  {completedCount} of {course.lessonsCount} lessons completed
                </span>
                <span className="font-semibold text-white">{course.progress}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-white"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Lessons */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3">
            <h3 className="text-sm font-semibold text-foreground">Course Content</h3>
            <span className="text-xs text-muted-foreground">
              {completedCount}/{course.lessonsCount} completed
            </span>
          </div>
          <Separator />
          <ScrollArea className="h-[320px]">
            <div className="px-6 py-2">
              {course.lessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
                >
                  <Checkbox
                    checked={lesson.completed}
                    onCheckedChange={() => {
                      // toggle this lesson
                      const updatedLessons = course.lessons.map((l) =>
                        l.id === lesson.id ? { ...l, completed: !l.completed } : l
                      )
                      const completedCount = updatedLessons.filter(l => l.completed).length
                      const newProgress = Math.round((completedCount / updatedLessons.length) * 100)
                      const updatedCourse = { ...course, lessons: updatedLessons, progress: newProgress }
                      onCourseUpdate(updatedCourse)
                    }}
                    className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                  />
                  <span
                    className={`flex-1 text-sm ${
                      lesson.completed
                        ? 'text-muted-foreground line-through'
                        : 'text-foreground'
                    }`}
                  >
                    {lesson.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {lesson.duration}
                  </span>
                  {lesson.completed ? (
                    <CheckCircle2 className="size-4 text-emerald-500" />
                  ) : (
                    <Play className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  )}
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4">
          <div className="flex gap-3">
            {course.progress === 100 ? (
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => { onOpenChange(false); toast.success('Great job!', { description: `${course.title} is completed!` }) }}>
                <CheckCircle2 className="mr-2 size-4" />
                Course Completed
              </Button>
            ) : course.progress !== null ? (
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => { const updated = { ...course, progress: 0 }; onCourseUpdate(updated); onOpenChange(false); toast.success('Continuing course!', { description: `Resuming ${course.title}` }) }}>
                <Play className="mr-2 size-4" />
                Continue Learning
              </Button>
            ) : (
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => { const updated = { ...course, progress: 0 }; onCourseUpdate(updated); onOpenChange(false); toast.success('Enrolled successfully!', { description: `You've enrolled in ${course.title}` }) }}>
                <Play className="mr-2 size-4" />
                Start Course
              </Button>
            )}
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AcademyView() {
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [courseList, setCourseList] = useState(courses)

  const filteredCourses = useMemo(() => {
    return courseList.filter((c) => {
      const matchesSearch =
        search === '' ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
      const matchesLevel =
        levelFilter === 'all' || c.level.toLowerCase() === levelFilter
      return matchesSearch && matchesLevel
    })
  }, [courseList, search, levelFilter])

  const handleCourseUpdate = (updatedCourse: Course) => {
    setCourseList(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c))
    setSelectedCourse(updatedCourse)
  }

  const openCourseDetail = (course: Course) => {
    setSelectedCourse(course)
    setModalOpen(true)
  }

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
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Trading Academy
              </h1>
              <p className="text-sm text-muted-foreground">
                Master the markets with structured learning paths
              </p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0 px-3 py-1 text-sm">
              500+ Lessons
            </Badge>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Filter Tabs ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6"
        >
          <Tabs value={levelFilter} onValueChange={setLevelFilter}>
            <TabsList className="bg-muted/60">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="pro">Pro</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* ── Learning Path ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8"
        >
          <h2 className="mb-4 text-lg font-semibold">Your Learning Path</h2>
          <div className="relative overflow-x-auto pb-2">
            <div className="flex min-w-[600px] items-center gap-0">
              {learningPathSteps.map((step, index) => {
                const isLast = index === learningPathSteps.length - 1
                return (
                  <div key={step.label} className="flex items-center">
                    {/* Step Node */}
                    <div className="flex flex-col items-center gap-2">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`relative flex size-14 items-center justify-center rounded-full border-2 ${
                          step.status === 'completed'
                            ? 'border-emerald-500 bg-emerald-500'
                            : step.status === 'current'
                              ? 'border-emerald-500 bg-background'
                              : 'border-muted-foreground/25 bg-muted/50'
                        }`}
                      >
                        {step.status === 'completed' ? (
                          <CheckCircle2 className="size-6 text-white" />
                        ) : step.status === 'current' ? (
                          <>
                            <motion.div
                              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              className="absolute inset-0 rounded-full bg-emerald-500/20"
                            />
                            <span className="text-lg font-bold text-emerald-500">
                              {index + 1}
                            </span>
                          </>
                        ) : (
                          <Lock className="size-5 text-muted-foreground/50" />
                        )}
                      </motion.div>
                      <span
                        className={`text-xs font-medium whitespace-nowrap ${
                          step.status === 'locked'
                            ? 'text-muted-foreground/50'
                            : step.status === 'current'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-foreground'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {/* Connector Line */}
                    {!isLast && (
                      <div className="mx-1 h-0.5 flex-1 min-w-[60px]">
                        <div
                          className={`h-full rounded-full ${
                            step.status === 'completed'
                              ? 'bg-emerald-500'
                              : 'bg-muted-foreground/15'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Course Grid ───────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-10"
        >
          <h2 className="mb-4 text-lg font-semibold">
            {filteredCourses.length} Courses
          </h2>
          {filteredCourses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <Search className="size-12 text-muted-foreground/30" />
              <p className="mt-4 text-lg font-medium text-muted-foreground">
                No courses found
              </p>
              <p className="text-sm text-muted-foreground/70">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    layout
                    whileHover={cardHover}
                    whileTap={{ scale: 0.98 }}
                    className="group cursor-pointer overflow-hidden rounded-xl border bg-card shadow-sm transition-colors"
                    onClick={() => openCourseDetail(course)}
                  >
                    {/* Top Bar */}
                    <div
                      className={`h-1.5 w-full ${getTopBarColor(course.level)}`}
                    />

                    {/* Image Placeholder */}
                    <div
                      className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${course.gradient}`}
                    >
                      <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm transition-transform group-hover:scale-110">
                        {course.icon}
                      </div>
                      <Badge
                        className={`absolute right-3 top-3 border-0 ${getLevelColor(course.level)}`}
                      >
                        {course.level}
                      </Badge>
                      {course.progress === 100 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
                        >
                          <CheckCircle2 className="size-3" /> Completed
                        </motion.div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold leading-tight text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {course.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                        {course.description}
                      </p>

                      {/* Meta */}
                      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="size-3" />
                          {course.lessonsCount} lessons
                        </span>
                        <Stars rating={course.rating} />
                      </div>

                      {/* Progress or Enroll */}
                      <div className="mt-4">
                        {course.progress !== null ? (
                          <div>
                            <div className="mb-1.5 flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                Progress
                              </span>
                              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                {course.progress}%
                              </span>
                            </div>
                            <Progress
                              value={course.progress}
                              className="h-2 [&>[data-slot=progress-indicator]]:bg-emerald-500"
                            />
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                            onClick={(e) => {
                              e.stopPropagation()
                              openCourseDetail(course)
                            }}
                          >
                            Enroll Now
                            <ChevronRight className="ml-1 size-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </main>

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onCourseUpdate={handleCourseUpdate}
      />
    </div>
  )
}