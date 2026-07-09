'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  Users,
  CreditCard,
  DollarSign,
  GraduationCap,
  Plus,
  Search,
  MoreHorizontal,
  Edit3,
  Ban,
  Trash2,
  Pencil,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Signal,
  LayoutDashboard,
  BookOpen,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

// ── Mock Data ────────────────────────────────────────────────────────────────

const userGrowthData = [
  { month: 'Jul', users: 1820 },
  { month: 'Aug', users: 2010 },
  { month: 'Sep', users: 2230 },
  { month: 'Oct', users: 2410 },
  { month: 'Nov', users: 2630 },
  { month: 'Dec', users: 2847 },
]

const chartConfig: ChartConfig = {
  users: {
    label: 'Users',
    color: '#059669',
  },
}

interface MockUser {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  roleBadge: string
  plan: string
  joined: string
  status: 'active' | 'suspended'
}

const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    email: 'sarah@example.com',
    avatar: 'SM',
    role: 'Instructor',
    roleBadge:
      'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
    plan: 'Elite',
    joined: '2024-01-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Alex Chen',
    email: 'alex@example.com',
    avatar: 'AC',
    role: 'Premium',
    roleBadge:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    plan: 'Pro',
    joined: '2024-02-20',
    status: 'active',
  },
  {
    id: '3',
    name: 'James Wilson',
    email: 'james@example.com',
    avatar: 'JW',
    role: 'Student',
    roleBadge:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    plan: 'Free',
    joined: '2024-03-10',
    status: 'active',
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma@example.com',
    avatar: 'ED',
    role: 'Student',
    roleBadge:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    plan: 'Pro',
    joined: '2024-04-05',
    status: 'active',
  },
  {
    id: '5',
    name: 'Marcus Lee',
    email: 'marcus@example.com',
    avatar: 'ML',
    role: 'Trader',
    roleBadge:
      'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400',
    plan: 'Elite',
    joined: '2024-05-12',
    status: 'active',
  },
  {
    id: '6',
    name: 'Lisa Park',
    email: 'lisa@example.com',
    avatar: 'LP',
    role: 'Student',
    roleBadge:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    plan: 'Free',
    joined: '2024-06-18',
    status: 'suspended',
  },
  {
    id: '7',
    name: 'David Kim',
    email: 'david@example.com',
    avatar: 'DK',
    role: 'Premium',
    roleBadge:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    plan: 'Pro',
    joined: '2024-07-22',
    status: 'active',
  },
  {
    id: '8',
    name: 'Mike Ross',
    email: 'mike@example.com',
    avatar: 'MR',
    role: 'Student',
    roleBadge:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    plan: 'Free',
    joined: '2024-08-01',
    status: 'active',
  },
]

interface Course {
  id: string
  title: string
  students: number
  rating: number
  status: 'Published' | 'Draft'
  category: string
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Price Action Mastery',
    students: 847,
    rating: 4.9,
    status: 'Published',
    category: 'Technical Analysis',
  },
  {
    id: '2',
    title: 'Smart Money Concepts',
    students: 623,
    rating: 4.8,
    status: 'Published',
    category: 'Advanced',
  },
  {
    id: '3',
    title: 'Trading Psychology 101',
    students: 1205,
    rating: 4.7,
    status: 'Published',
    category: 'Psychology',
  },
  {
    id: '4',
    title: 'Advanced Risk Management',
    students: 0,
    rating: 0,
    status: 'Draft',
    category: 'Risk Management',
  },
]

interface TradingSignal {
  id: string
  pair: string
  direction: 'Long' | 'Short'
  status: 'Active' | 'Expired' | 'Hit TP' | 'Hit SL'
  created: string
}

const mockSignals: TradingSignal[] = [
  { id: '1', pair: 'EUR/USD', direction: 'Long', status: 'Active', created: '2024-12-18' },
  { id: '2', pair: 'GBP/JPY', direction: 'Short', status: 'Hit TP', created: '2024-12-17' },
  { id: '3', pair: 'XAU/USD', direction: 'Long', status: 'Active', created: '2024-12-18' },
  { id: '4', pair: 'USD/CAD', direction: 'Short', status: 'Hit SL', created: '2024-12-16' },
  { id: '5', pair: 'AUD/USD', direction: 'Long', status: 'Expired', created: '2024-12-15' },
  { id: '6', pair: 'EUR/GBP', direction: 'Short', status: 'Active', created: '2024-12-18' },
]

interface BlogPost {
  id: string
  title: string
  status: 'Published' | 'Draft' | 'Scheduled'
  date: string
}

const mockPosts: BlogPost[] = [
  { id: '1', title: 'How to Build a Winning Trading Routine', status: 'Published', date: '2024-12-17' },
  { id: '2', title: 'Understanding Market Structure Like a Pro', status: 'Published', date: '2024-12-15' },
  { id: '3', title: 'Top 5 Mistakes New Traders Make', status: 'Scheduled', date: '2024-12-20' },
  { id: '4', title: 'The Complete Guide to Order Blocks', status: 'Draft', date: '2024-12-18' },
  { id: '5', title: 'NFP Trading Strategy Deep Dive', status: 'Published', date: '2024-12-12' },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function getAvatarColor(name: string): string {
  const colors = [
    'bg-emerald-600',
    'bg-teal-600',
    'bg-green-600',
    'bg-cyan-600',
    'bg-emerald-700',
    'bg-teal-700',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

function getSignalStatusBadge(status: TradingSignal['status']) {
  const map: Record<
    TradingSignal['status'],
    { className: string; dotClass: string }
  > = {
    Active: {
      className:
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
      dotClass: 'bg-emerald-500',
    },
    Expired: {
      className: 'bg-muted text-muted-foreground',
      dotClass: 'bg-muted-foreground',
    },
    'Hit TP': {
      className:
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
      dotClass: 'bg-emerald-500',
    },
    'Hit SL': {
      className: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400',
      dotClass: 'bg-rose-500',
    },
  }
  const { className, dotClass } = map[status]
  return (
    <Badge variant="secondary" className={`${className} gap-1.5`}>
      <span className={`size-1.5 rounded-full ${dotClass}`} />
      {status}
    </Badge>
  )
}

function getDirectionBadge(direction: 'Long' | 'Short') {
  return (
    <Badge
      variant="outline"
      className={
        direction === 'Long'
          ? 'text-emerald-600 border-emerald-200 dark:text-emerald-400 dark:border-emerald-800'
          : 'text-rose-600 border-rose-200 dark:text-rose-400 dark:border-rose-800'
      }
    >
      <ArrowUpRight
        className={`size-3 ${direction === 'Short' ? 'rotate-90' : ''}`}
      />
      {direction}
    </Badge>
  )
}

function getPostStatusBadge(status: BlogPost['status']) {
  const map: Record<
    BlogPost['status'],
    { className: string }
  > = {
    Published: {
      className:
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    },
    Draft: {
      className: 'bg-muted text-muted-foreground',
    },
    Scheduled: {
      className:
        'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    },
  }
  return (
    <Badge variant="secondary" className={map[status].className}>
      {status}
    </Badge>
  )
}

// ── Overview Tab ──────────────────────────────────────────────────────────────

function OverviewTab() {
  const stats = [
    {
      label: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      up: true,
      icon: <Users className="size-4 text-muted-foreground" />,
    },
    {
      label: 'Active Subscriptions',
      value: '1,234',
      change: '+8.2%',
      up: true,
      icon: <CreditCard className="size-4 text-muted-foreground" />,
    },
    {
      label: 'Revenue',
      value: '$45,678',
      change: '+23.1%',
      up: true,
      icon: <DollarSign className="size-4 text-muted-foreground" />,
    },
    {
      label: 'Course Completion Rate',
      value: '72%',
      change: '-2.4%',
      up: false,
      icon: <GraduationCap className="size-4 text-muted-foreground" />,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                  <div className="size-8 rounded-lg bg-muted flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span
                    className={`text-xs font-medium flex items-center gap-0.5 ${
                      stat.up
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {stat.up ? (
                      <ArrowUpRight className="size-3" />
                    ) : (
                      <ArrowDownRight className="size-3" />
                    )}
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* User Growth Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">User Growth</CardTitle>
            <CardDescription>
              Total registered users over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <AreaChart
                data={userGrowthData}
                margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="fillUsers"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-users)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-users)"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  className="stroke-border"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                  tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
                />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-users)"
                  fill="url(#fillUsers)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// ── Users Tab ────────────────────────────────────────────────────────────────

function UsersTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole =
      roleFilter === 'all' || user.role.toLowerCase() === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="trader">Trader</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="instructor">Instructor</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">User</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden sm:table-cell">Plan</TableHead>
                <TableHead className="hidden lg:table-cell">Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-4 w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="hover:bg-muted/50 border-b transition-colors"
                >
                  <TableCell className="pl-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback
                          className={`${getAvatarColor(user.name)} text-white text-xs font-semibold`}
                        >
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm whitespace-nowrap">
                        {user.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] ${user.roleBadge}`}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {user.plan}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {user.joined}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        user.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit3 className="size-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Ban className="size-4 mr-2" />
                          Suspend
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <Trash2 className="size-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Courses Tab ──────────────────────────────────────────────────────────────

function CoursesTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-muted-foreground">
          {mockCourses.length} courses
        </h3>
        <Button
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
        >
          <Plus className="size-4" />
          Create New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <CardTitle className="text-sm leading-snug">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {course.category}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`shrink-0 ${
                      course.status === 'Published'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Users className="size-3.5" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  {course.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-amber-500">&#9733;</span>
                      <span>{course.rating}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full gap-1.5">
                  <Pencil className="size-3.5" />
                  Edit Course
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Signals Tab ──────────────────────────────────────────────────────────────

function SignalsTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-muted-foreground">
          Recent trading signals
        </h3>
        <Button
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
        >
          <Plus className="size-4" />
          Create Signal
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Pair</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Created</TableHead>
                <TableHead className="pr-4 w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSignals.map((signal, index) => (
                <motion.tr
                  key={signal.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="hover:bg-muted/50 border-b transition-colors"
                >
                  <TableCell className="pl-4 py-3 font-medium text-sm">
                    {signal.pair}
                  </TableCell>
                  <TableCell>{getDirectionBadge(signal.direction)}</TableCell>
                  <TableCell>{getSignalStatusBadge(signal.status)}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {signal.created}
                  </TableCell>
                  <TableCell className="pr-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit3 className="size-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          <Trash2 className="size-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Content Tab ──────────────────────────────────────────────────────────────

function ContentTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-muted-foreground">
          Blog posts & content
        </h3>
        <Button
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
        >
          <Plus className="size-4" />
          Create Post
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="pr-4 w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPosts.map((post, index) => (
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="hover:bg-muted/50 border-b transition-colors"
                >
                  <TableCell className="pl-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-muted-foreground shrink-0" />
                      <span className="font-medium text-sm">
                        {post.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getPostStatusBadge(post.status)}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {post.date}
                  </TableCell>
                  <TableCell className="pr-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit3 className="size-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          <Trash2 className="size-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function AdminView() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your platform, users, courses, and content.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview" className="gap-1.5 text-xs sm:text-sm">
                <LayoutDashboard className="size-3.5" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-1.5 text-xs sm:text-sm">
                <Users className="size-3.5" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="courses" className="gap-1.5 text-xs sm:text-sm">
                <BookOpen className="size-3.5" />
                <span className="hidden sm:inline">Courses</span>
              </TabsTrigger>
              <TabsTrigger value="signals" className="gap-1.5 text-xs sm:text-sm">
                <Signal className="size-3.5" />
                <span className="hidden sm:inline">Signals</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="gap-1.5 text-xs sm:text-sm">
                <FileText className="size-3.5" />
                <span className="hidden sm:inline">Content</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <OverviewTab />
            </TabsContent>
            <TabsContent value="users">
              <UsersTab />
            </TabsContent>
            <TabsContent value="courses">
              <CoursesTab />
            </TabsContent>
            <TabsContent value="signals">
              <SignalsTab />
            </TabsContent>
            <TabsContent value="content">
              <ContentTab />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}