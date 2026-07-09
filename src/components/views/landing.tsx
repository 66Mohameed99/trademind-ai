'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  LineChart,
  BookOpen,
  GraduationCap,
  Zap,
  Users,
  Play,
  ArrowRight,
  TrendingUp,
  Target,
  BarChart3,
  MessageSquare,
  Star,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Shield,
  Clock,
  Globe,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { useNavigation } from '@/store/navigation'

// ─── Animation Variants ────────────────────────────────────────────────
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: '-40px' },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, ease: [0.25, 0.4, 0.25, 1] },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
}

// ─── Data ──────────────────────────────────────────────────────────────
const features = [
  {
    icon: Brain,
    title: 'AI Mentor',
    description:
      'Get personalized guidance from your AI trading mentor. Ask questions, get strategy feedback, and receive tailored learning recommendations 24/7.',
  },
  {
    icon: LineChart,
    title: 'Chart Analysis',
    description:
      'Upload any chart and get instant AI-powered technical analysis with pattern recognition, support/resistance levels, and actionable insights.',
  },
  {
    icon: BookOpen,
    title: 'Trading Journal',
    description:
      'Track every trade, analyze patterns, identify your strengths and weaknesses, and systematically improve your trading edge.',
  },
  {
    icon: GraduationCap,
    title: 'Academy Courses',
    description:
      'Structured learning paths from beginner to advanced. Master technical analysis, risk management, and trading psychology at your own pace.',
  },
  {
    icon: Zap,
    title: 'Real-time Signals',
    description:
      'Educational signals with full analysis breakdowns. Understand the reasoning behind every signal and learn to identify setups yourself.',
  },
  {
    icon: Users,
    title: 'Community',
    description:
      'Connect, share ideas, and learn from fellow traders. Join discussion rooms, participate in challenges, and grow together.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Learn',
    heading: 'Build Your Foundation',
    description:
      'Complete structured courses covering technical analysis, fundamental analysis, risk management, and trading psychology. Go from complete beginner to confident trader.',
    icon: GraduationCap,
  },
  {
    number: '02',
    title: 'Practice',
    heading: 'Apply AI-Powered Tools',
    description:
      'Use our AI chart analyzer, get real-time educational signals, and practice pattern recognition. Your AI mentor provides instant feedback on every analysis.',
    icon: LineChart,
  },
  {
    number: '03',
    title: 'Master',
    heading: 'Build Your Edge',
    description:
      'Track your progress with the trading journal, refine strategies based on data, and engage with the community. Develop a consistent, profitable trading system.',
    icon: Target,
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Swing Trader · 2 years experience',
    initials: 'SC',
    quote:
      'TradeMind AI completely changed my approach to the markets. The AI mentor helped me identify patterns I was consistently missing. My win rate went from 42% to 68% in just four months. The journal feature alone is worth the subscription.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Day Trader · 5 years experience',
    initials: 'MJ',
    quote:
      "Even with five years of experience, the AI chart analysis revealed blind spots in my strategy. The community is incredibly supportive, and the structured courses filled gaps in my knowledge I didn't know existed. Absolutely essential tool.",
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Forex Trader · Beginner',
    initials: 'ER',
    quote:
      "As a complete beginner, I was overwhelmed by the amount of information out there. TradeMind AI gave me a clear, structured path forward. The AI mentor is like having a patient teacher available 24/7. I made my first profitable trade within 6 weeks.",
    rating: 5,
  },
]

const footerLinks = {
  Product: ['Features', 'Pricing', 'AI Mentor', 'Chart Analyzer', 'Academy', 'Trading Journal'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Partners', 'Contact'],
  Resources: ['Documentation', 'Help Center', 'Community', 'API', 'Status', 'Changelog'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies', 'Licenses', 'GDPR'],
}

// ─── Sub-Components ────────────────────────────────────────────────────

function FloatingStatCard({
  value,
  label,
  icon: Icon,
  className,
  delay = 0,
}: {
  value: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.8 + delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3 + delay * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 0.3,
        }}
      >
        <Card className="border-emerald-200/50 bg-white/80 backdrop-blur-sm dark:border-emerald-800/40 dark:bg-emerald-950/60 py-4 px-5 shadow-lg">
          <CardContent className="flex items-center gap-3 p-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
              <Icon className="size-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const Icon = feature.icon
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group"
    >
      <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm transition-shadow duration-300 hover:glow-emerald hover:border-emerald-300/50 dark:hover:border-emerald-700/50 py-0 gap-0 overflow-hidden">
        <CardContent className="flex flex-col gap-4 p-6">
          <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-900/50 dark:text-emerald-400 dark:group-hover:bg-emerald-600 dark:group-hover:text-white">
            <Icon className="size-6" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-foreground">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </div>
          <div className="mt-auto flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Learn more <ChevronRight className="size-4" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0]
  index: number
  isLast: boolean
}) {
  const Icon = step.icon
  return (
    <motion.div variants={staggerItem} className="relative flex flex-col items-center text-center">
      {/* Connector line (desktop) */}
      {!isLast && (
        <div className="absolute left-1/2 top-10 hidden h-[calc(100%-2.5rem)] w-px -translate-x-1/2 bg-gradient-to-b from-emerald-400 to-emerald-200 md:block dark:from-emerald-500 dark:to-emerald-800" />
      )}
      {/* Number badge */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative z-10 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-500/25 dark:shadow-emerald-500/15"
      >
        <Icon className="size-8" />
        <span className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-amber-900 shadow-sm">
          {step.number}
        </span>
      </motion.div>
      <div className="mt-6 flex flex-col gap-2">
        <Badge variant="secondary" className="w-fit mx-auto text-emerald-700 dark:text-emerald-300">
          {step.title}
        </Badge>
        <h3 className="mt-1 text-xl font-bold text-foreground">{step.heading}</h3>
        <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0]
}) {
  return (
    <motion.div variants={staggerItem} whileHover={{ scale: 1.01, y: -2 }}>
      <Card className="h-full border-border/50 bg-card/50 py-0 gap-0">
        <CardContent className="flex flex-col gap-4 p-6">
          {/* Stars */}
          <div className="flex gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="size-4 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          {/* Quote */}
          <blockquote className="text-sm leading-relaxed text-foreground/90">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <Separator />
          {/* Author */}
          <div className="flex items-center gap-3">
            <Avatar className="size-10 border border-emerald-200 dark:border-emerald-800">
              <AvatarFallback className="bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                {testimonial.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                {testimonial.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {testimonial.role}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Community', href: '#community' },
]

export default function LandingView() {
  const { openAuthDialog, setView } = useNavigation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (href: string) => {
    if (href === '#pricing') {
      setView('pricing')
      return
    }
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* ═══════════════════════════════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b bg-background/80 shadow-sm backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm shadow-emerald-600/25">
              <TrendingUp className="size-4" />
            </div>
            <span className="text-lg font-bold text-foreground">
              TradeMind <span className="gradient-text">AI</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openAuthDialog('login')}
            >
              Log In
            </Button>
            <Button
              size="sm"
              className="bg-emerald-600 text-white shadow-sm shadow-emerald-600/25 hover:bg-emerald-700"
              onClick={() => openAuthDialog('signup')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-1 pt-8">
                <div className="mb-4 flex items-center gap-2.5 px-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                    <TrendingUp className="size-4" />
                  </div>
                  <span className="text-lg font-bold">
                    TradeMind <span className="gradient-text">AI</span>
                  </span>
                </div>
                <Separator className="mb-3" />
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    onClick={() => scrollToSection(link.href)}
                    className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <Separator className="my-3" />
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => { openAuthDialog('login'); setMobileOpen(false) }}
                >
                  Log In
                </Button>
                <Button
                  className="bg-emerald-600 text-white shadow-sm shadow-emerald-600/25 hover:bg-emerald-700"
                  onClick={() => { openAuthDialog('signup'); setMobileOpen(false) }}
                >
                  Get Started
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>

      {/* Spacer so hero isn't behind navbar */}
      <div className="h-16" />

      <main className="flex-1">
        {/* ═══════════════════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════════════════ */}
        <section className="animated-grid relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
          {/* Radial gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.18),transparent)]" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge
                variant="outline"
                className="mb-6 gap-1.5 border-emerald-300/50 bg-emerald-50 px-4 py-1.5 text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-950/50 dark:text-emerald-300"
              >
                <Sparkles className="size-3.5" />
                AI-Powered Trading Education
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Master the Markets with{' '}
              <span className="gradient-text">AI-Powered Education</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            >
              Learn trading strategies, analyze charts with AI, track your
              progress, and join a community of successful traders.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <Button
                size="lg"
                onClick={() => openAuthDialog('signup')}
                className="h-12 w-full gap-2 rounded-xl bg-emerald-600 px-8 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-emerald-600/30 sm:w-auto dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                Get Started Free
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 w-full gap-2 rounded-xl border-emerald-300/50 px-8 text-base font-semibold text-emerald-700 transition-all hover:bg-emerald-50 hover:text-emerald-800 sm:w-auto dark:border-emerald-700/50 dark:text-emerald-300 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-200"
              >
                <Play className="size-4" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <Shield className="size-3.5 text-emerald-500" />
                Bank-grade security
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-emerald-500" />
                14-day free trial
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="size-3.5 text-emerald-500" />
                Used in 120+ countries
              </span>
            </motion.div>
          </div>

          {/* Floating stat cards */}
          <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
            <FloatingStatCard
              value="10K+"
              label="Students"
              icon={Users}
              className="absolute left-[8%] top-[18%]"
              delay={0}
            />
            <FloatingStatCard
              value="500+"
              label="Lessons"
              icon={GraduationCap}
              className="absolute right-[6%] top-[15%]"
              delay={0.15}
            />
            <FloatingStatCard
              value="85%"
              label="Success Rate"
              icon={TrendingUp}
              className="absolute left-[6%] bottom-[22%]"
              delay={0.3}
            />
            <FloatingStatCard
              value="24/7"
              label="AI Mentor"
              icon={Brain}
              className="absolute right-[8%] bottom-[18%]"
              delay={0.45}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FEATURES SECTION
        ═══════════════════════════════════════════════════════════════ */}
        <section id="features" className="relative px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {/* Section header */}
            <motion.div {...fadeInUp} className="mx-auto max-w-2xl text-center">
              <Badge
                variant="outline"
                className="mb-4 border-emerald-300/50 bg-emerald-50 text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-950/50 dark:text-emerald-300"
              >
                Features
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything You Need to Become a{' '}
                <span className="gradient-text">Profitable Trader</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                A complete ecosystem of AI-powered tools designed to accelerate your
                trading education and maximize your potential.
              </p>
            </motion.div>

            {/* Feature cards grid */}
            <motion.div
              {...staggerContainer}
              className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, i) => (
                <FeatureCard key={feature.title} feature={feature} index={i} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HOW IT WORKS SECTION
        ═══════════════════════════════════════════════════════════════ */}
        <section id="how-it-works" className="relative bg-muted/30 px-4 py-24 sm:px-6 lg:px-8">
          {/* Subtle top/bottom separators */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent dark:via-emerald-700/30" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent dark:via-emerald-700/30" />

          <div className="mx-auto max-w-5xl">
            <motion.div {...fadeInUp} className="mx-auto max-w-2xl text-center">
              <Badge
                variant="outline"
                className="mb-4 border-emerald-300/50 bg-emerald-50 text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-950/50 dark:text-emerald-300"
              >
                How It Works
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Three Steps to <span className="gradient-text">Trading Mastery</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our proven methodology takes you from complete beginner to
                confident, consistently profitable trader.
              </p>
            </motion.div>

            <motion.div
              {...staggerContainer}
              className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8"
            >
              {steps.map((step, i) => (
                <StepCard key={step.number} step={step} index={i} isLast={i === steps.length - 1} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SOCIAL PROOF BAR
        ═══════════════════════════════════════════════════════════════ */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <motion.div {...scaleIn} className="mx-auto max-w-4xl">
            <div className="flex flex-col items-center gap-6 rounded-2xl border border-emerald-200/50 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 px-6 py-10 shadow-sm dark:from-emerald-950/30 dark:via-emerald-950/20 dark:to-emerald-950/30 dark:border-emerald-800/30 sm:flex-row sm:justify-around sm:px-10">
              {[
                { value: '10,000+', label: 'Active Students' },
                { value: '500+', label: 'Video Lessons' },
                { value: '85%', label: 'Success Rate' },
                { value: '4.9/5', label: 'Average Rating' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1">
                  <span className="text-2xl font-bold text-foreground sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            TESTIMONIALS SECTION
        ═══════════════════════════════════════════════════════════════ */}
        <section id="testimonials" className="bg-muted/30 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeInUp} className="mx-auto max-w-2xl text-center">
              <Badge
                variant="outline"
                className="mb-4 border-emerald-300/50 bg-emerald-50 text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-950/50 dark:text-emerald-300"
              >
                Testimonials
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Loved by <span className="gradient-text">Traders Worldwide</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Join thousands of traders who have transformed their skills with
                TradeMind AI.
              </p>
            </motion.div>

            <motion.div
              {...staggerContainer}
              className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} testimonial={t} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            CTA SECTION
        ═══════════════════════════════════════════════════════════════ */}
        <section id="community" className="relative px-4 py-24 sm:px-6 lg:px-8">
          <motion.div {...scaleIn} className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 px-6 py-16 text-center shadow-2xl shadow-emerald-600/20 sm:px-12 sm:py-20 dark:from-emerald-700 dark:via-emerald-800 dark:to-emerald-950 dark:shadow-emerald-900/30">
              {/* Decorative circles */}
              <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-white/5" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-white/5" />

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="mx-auto mb-6 size-10 text-emerald-200" />
                </motion.div>

                <motion.h2
                  {...fadeInUp}
                  className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
                >
                  Ready to Start Your
                  <br />
                  Trading Journey?
                </motion.h2>
                <motion.p
                  {...fadeInUp}
                  className="mx-auto mt-4 max-w-xl text-base text-emerald-100/80 sm:text-lg"
                >
                  Join 10,000+ students who are already building their edge with
                  AI-powered trading education. Start free, no credit card required.
                </motion.p>

                <motion.div
                  {...fadeInUp}
                  className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
                >
                  <Button
                    size="lg"
                    onClick={() => openAuthDialog('signup')}
                    className="h-12 w-full gap-2 rounded-xl bg-white px-8 text-base font-semibold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50 sm:w-auto"
                  >
                    Start Free
                    <ArrowRight className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setView('pricing')}
                    className="h-12 w-full gap-2 rounded-xl border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto"
                  >
                    <BarChart3 className="size-4" />
                    View Pricing
                  </Button>
                </motion.div>

                {/* Feature highlights */}
                <motion.div
                  {...fadeInUp}
                  className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-emerald-100/70"
                >
                  {['Free 14-day trial', 'No credit card needed', 'Cancel anytime'].map((text) => (
                    <span key={text} className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-4 text-emerald-300" />
                      {text}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer className="border-t bg-muted/20 px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm shadow-emerald-600/25">
                  <TrendingUp className="size-5" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  TradeMind <span className="gradient-text">AI</span>
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                AI-powered trading education platform helping traders at every level
                build confidence, consistency, and profitability.
              </p>
              {/* Social icons */}
              <div className="mt-6 flex gap-3">
                {[
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Github, label: 'GitHub' },
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Youtube, label: 'YouTube' },
                ].map(({ icon: SocialIcon, label }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:border-emerald-300/50 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:border-emerald-700/50 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400"
                  >
                    <SocialIcon className="size-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-foreground">{category}</h4>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <button className="text-sm text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="my-8 opacity-50" />

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
            <p>&copy; {new Date().getFullYear()} TradeMind AI. All rights reserved.</p>
            <div className="flex gap-4">
              <button className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                Privacy Policy
              </button>
              <button className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                Terms of Service
              </button>
              <button className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}