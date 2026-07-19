'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  X,
  Sparkles,
  Zap,
  Crown,
  BookOpen,
  Bot,
  BarChart3,
  NotebookPen,
  Users,
  HeadphonesIcon,
  UserCheck,
  Tag,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useNavigation } from '@/store/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// ── Data ─────────────────────────────────────────────────────────────────────

interface PlanFeature {
  text: string
  icon: React.ReactNode
}

interface Plan {
  name: string
  icon: React.ReactNode
  monthlyPrice: number
  yearlyPrice: number
  description: string
  badge?: string
  badgeClass?: string
  buttonLabel: string
  buttonVariant: 'default' | 'outline'
  buttonClass?: string
  cardClass?: string
  features: PlanFeature[]
}

const plans: Plan[] = [
  {
    name: 'Free',
    icon: <BookOpen className="size-5" />,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Get started with the basics of trading education.',
    badge: 'Current Plan',
    badgeClass:
      'bg-secondary text-secondary-foreground border-secondary',
    buttonLabel: 'Current Plan',
    buttonVariant: 'outline',
    features: [
      { text: '5 basic courses', icon: <BookOpen className="size-4" /> },
      {
        text: 'Community access (read-only)',
        icon: <Users className="size-4" />,
      },
      { text: 'Basic journal', icon: <NotebookPen className="size-4" /> },
      {
        text: '3 AI mentor messages/day',
        icon: <Bot className="size-4" />,
      },
    ],
  },
  {
    name: 'Pro',
    icon: <Zap className="size-5" />,
    monthlyPrice: 29,
    yearlyPrice: 279,
    description: 'Everything you need to become a consistent trader.',
    badge: 'Most Popular',
    badgeClass:
      'bg-emerald-600 text-white border-emerald-600',
    buttonLabel: 'Upgrade to Pro',
    buttonVariant: 'default',
    buttonClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    cardClass:
      'border-emerald-300 dark:border-emerald-700 shadow-lg shadow-emerald-500/10',
    features: [
      { text: 'All courses (50+)', icon: <BookOpen className="size-4" /> },
      {
        text: 'Full community access',
        icon: <Users className="size-4" />,
      },
      {
        text: 'Advanced journal + AI feedback',
        icon: <NotebookPen className="size-4" />,
      },
      {
        text: 'Unlimited AI mentor',
        icon: <Bot className="size-4" />,
      },
      {
        text: 'AI Chart Analyzer (20/day)',
        icon: <BarChart3 className="size-4" />,
      },
      {
        text: 'Priority support',
        icon: <HeadphonesIcon className="size-4" />,
      },
    ],
  },
  {
    name: 'Elite',
    icon: <Crown className="size-5" />,
    monthlyPrice: 79,
    yearlyPrice: 759,
    description: 'For serious traders who want personalized guidance.',
    buttonLabel: 'Go Elite',
    buttonVariant: 'outline',
    buttonClass:
      'border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/50',
    features: [
      {
        text: 'Everything in Pro',
        icon: <Sparkles className="size-4" />,
      },
      {
        text: '1-on-1 mentoring sessions',
        icon: <UserCheck className="size-4" />,
      },
      {
        text: 'Unlimited chart analysis',
        icon: <BarChart3 className="size-4" />,
      },
      {
        text: 'Custom learning paths',
        icon: <Sparkles className="size-4" />,
      },
      {
        text: 'Early access to new features',
        icon: <Zap className="size-4" />,
      },
      {
        text: 'Private community group',
        icon: <Users className="size-4" />,
      },
    ],
  },
]

const comparisonRows = [
  {
    feature: 'Courses',
    icon: <BookOpen className="size-4 text-muted-foreground" />,
    free: '5 basic',
    pro: 'All (50+)',
    elite: 'All (50+)',
  },
  {
    feature: 'AI Mentor',
    icon: <Bot className="size-4 text-muted-foreground" />,
    free: '3/day',
    pro: 'Unlimited',
    elite: 'Unlimited',
  },
  {
    feature: 'Chart Analyzer',
    icon: <BarChart3 className="size-4 text-muted-foreground" />,
    free: false,
    pro: '20/day',
    elite: 'Unlimited',
  },
  {
    feature: 'Journal',
    icon: <NotebookPen className="size-4 text-muted-foreground" />,
    free: 'Basic',
    pro: 'Advanced + AI',
    elite: 'Advanced + AI',
  },
  {
    feature: 'Community',
    icon: <Users className="size-4 text-muted-foreground" />,
    free: 'Read-only',
    pro: 'Full access',
    elite: 'Private group',
  },
  {
    feature: 'Support',
    icon: <HeadphonesIcon className="size-4 text-muted-foreground" />,
    free: 'Community',
    pro: 'Priority',
    elite: 'Dedicated',
  },
  {
    feature: '1-on-1 Mentoring',
    icon: <UserCheck className="size-4 text-muted-foreground" />,
    free: false,
    pro: false,
    elite: true,
  },
]

const faqs = [
  {
    question: 'Can I cancel my subscription at any time?',
    answer:
      'Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period. No questions asked, no hidden fees.',
  },
  {
    question: 'What is your refund policy?',
    answer:
      'We offer a 14-day money-back guarantee on all paid plans. If you\'re not satisfied with TradeMind AI, contact our support team within 14 days of your purchase for a full refund.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely through Stripe.',
  },
  {
    question: 'Do you offer team or institutional plans?',
    answer:
      'Yes! We offer custom team plans for trading groups, prop firms, and educational institutions. Contact us at teams@trademind.ai for custom pricing and features tailored to your organization.',
  },
  {
    question: 'Is there a free trial for Pro or Elite?',
    answer:
      'While we don\'t offer a traditional free trial, our Free plan gives you access to 5 courses, basic community features, and 3 AI mentor messages per day so you can experience the platform before committing.',
  },
  {
    question: 'Can I switch between plans?',
    answer:
      'Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated difference. When downgrading, the remaining balance will be credited to your account.',
  },
]

// ── Sub-components ───────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
      <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
    </div>
  )
}

function XIcon() {
  return (
    <div className="size-5 rounded-full bg-muted flex items-center justify-center shrink-0">
      <X className="size-3 text-muted-foreground" />
    </div>
  )
}

function ComparisonCell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? <CheckIcon /> : <XIcon />
  }
  return <span className="text-sm">{value}</span>
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function PricingView() {
  const { setView } = useNavigation()
  const [isAnnual, setIsAnnual] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setCouponApplied(true)
    }
  }

  const getPrice = (plan: Plan) => {
    if (plan.monthlyPrice === 0) return { amount: 0, period: 'forever' }
    if (isAnnual) {
      const monthly = Math.round((plan.yearlyPrice / 12) * 100) / 100
      return { amount: monthly, period: '/month', yearly: plan.yearlyPrice }
    }
    return { amount: plan.monthlyPrice, period: '/month' }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Choose Your Plan
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Invest in your trading education. Choose the plan that fits your
            journey.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span
            className={`text-sm font-medium ${
              !isAnnual
                ? 'text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-emerald-600"
          />
          <span
            className={`text-sm font-medium ${
              isAnnual
                ? 'text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            Annual
          </span>
          {isAnnual && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-0 text-xs">
                Save 20%
              </Badge>
            </motion.div>
          )}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, index) => {
            const pricing = getPrice(plan)

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + index * 0.1,
                  ease: 'easeOut',
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Card
                  className={`relative h-full ${
                    plan.cardClass || ''
                  } ${plan.name === 'Pro' ? 'md:-mt-4 md:mb-[-16px]' : ''}`}
                >
                  {plan.name === 'Pro' && (
                    <div className="absolute -top-px left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`size-9 rounded-lg flex items-center justify-center ${
                            plan.name === 'Pro'
                              ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                              : plan.name === 'Elite'
                              ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {plan.icon}
                        </div>
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                      </div>
                      {plan.badge && (
                        <Badge className={plan.badgeClass}>
                          {plan.badge}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="mt-2">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">${pricing.amount}</span>
                        <span className="text-muted-foreground text-sm">
                          {pricing.period}
                        </span>
                      </div>
                      {pricing.yearly && (
                        <p className="text-xs text-muted-foreground mt-1">
                          ${pricing.yearly} billed annually
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                            <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <span className="text-sm">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2">
                    <Button
                      variant={plan.buttonVariant}
                      className={`w-full ${plan.buttonClass || ''}`}
                      disabled={plan.name === 'Free'}
                      onClick={() => {
                        if (plan.name === 'Pro' || plan.name === 'Elite') setView('settings')
                      }}
                    >
                      {plan.name === 'Pro' && <Zap className="size-4" />}
                      {plan.name === 'Elite' && <Crown className="size-4" />}
                      {plan.buttonLabel}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8">
            Feature Comparison
          </h2>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6 py-3">Feature</TableHead>
                    <TableHead className="text-center py-3">Free</TableHead>
                    <TableHead className="text-center py-3 bg-emerald-50/50 dark:bg-emerald-950/20">
                      <div className="flex items-center justify-center gap-1.5">
                        <Zap className="size-3.5 text-emerald-600" />
                        Pro
                      </div>
                    </TableHead>
                    <TableHead className="text-center py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <Crown className="size-3.5 text-amber-500" />
                        Elite
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonRows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="pl-6 py-3 font-medium">
                        <div className="flex items-center gap-2">
                          {row.icon}
                          {row.feature}
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-3">
                        <ComparisonCell value={row.free} />
                      </TableCell>
                      <TableCell className="text-center py-3 bg-emerald-50/30 dark:bg-emerald-950/10">
                        <ComparisonCell value={row.pro} />
                      </TableCell>
                      <TableCell className="text-center py-3">
                        <ComparisonCell value={row.elite} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Card>
            <CardContent className="p-2">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="px-4 text-sm hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Coupon Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="max-w-md mx-auto"
        >
          <Card className="border-dashed">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <Tag className="size-8 mx-auto text-emerald-600 mb-2" />
                <h3 className="font-semibold text-sm">
                  Have a coupon code?
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your promo code to get a discount on any plan
                </p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  className="flex-1"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value)
                    setCouponApplied(false)
                  }}
                />
                <Button
                  variant="outline"
                  onClick={handleApplyCoupon}
                  className="shrink-0"
                >
                  Apply
                </Button>
              </div>
              {couponApplied && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 text-center"
                >
                  Coupon applied successfully! Discount will be reflected at
                  checkout.
                </motion.p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}