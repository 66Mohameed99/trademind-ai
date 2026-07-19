'use client'

import { useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  LayoutDashboard,
  Brain,
  LineChart,
  GraduationCap,
  BookOpen,
  Users,
  CreditCard,
  Shield,
  Settings,
  LogOut,
} from 'lucide-react'
import { useNavigation, type ViewId } from '@/store/navigation'
import { useIsMobile } from '@/hooks/use-mobile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface NavItem {
  id: ViewId
  label: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ai-mentor', label: 'AI Mentor', icon: Brain },
  { id: 'chart-analyzer', label: 'Chart Analyzer', icon: LineChart },
  { id: 'academy', label: 'Academy', icon: GraduationCap },
  { id: 'journal', label: 'Journal', icon: BookOpen },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'pricing', label: 'Pricing', icon: CreditCard },
  { id: 'admin', label: 'Admin', icon: Shield },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const viewLabels: Record<ViewId, string> = {
  landing: 'Landing',
  dashboard: 'Dashboard',
  'ai-mentor': 'AI Mentor',
  'chart-analyzer': 'Chart Analyzer',
  academy: 'Academy',
  journal: 'Journal',
  community: 'Community',
  pricing: 'Pricing',
  admin: 'Admin',
  settings: 'Settings',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
}

function SidebarNavContent({
  onItemClick,
}: {
  onItemClick?: (viewId: ViewId) => void
}) {
  const { currentView, setView, setAuthenticated } = useNavigation()

  const handleNavClick = (viewId: ViewId) => {
    setView(viewId)
    onItemClick?.(viewId)
  }

  const handleLogout = () => {
    setAuthenticated(false)
    setView('landing')
  }

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-2.5 px-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <TrendingUp className="size-4.5" />
        </div>
        <span className="gradient-text text-lg font-bold tracking-tight">
          TradeMind AI
        </span>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Navigation Items */}
      <ScrollArea className="flex-1 px-3 py-3">
        <motion.nav
          className="flex flex-col gap-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item) => {
            const isActive = currentView === item.id
            const Icon = item.icon

            return (
              <motion.button
                key={item.id}
                variants={itemVariants}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute inset-0 rounded-lg bg-primary/10 dark:bg-primary/15"
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <Icon
                  className={cn(
                    'size-4.5 shrink-0 relative z-10',
                    isActive && 'text-primary'
                  )}
                />
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-dot"
                    className="absolute right-3 size-1.5 rounded-full bg-primary"
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.nav>
      </ScrollArea>

      {/* User Section */}
      <Separator className="bg-sidebar-border" />
      <div className="shrink-0 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage src="" alt="Alex Trader" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              AT
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="truncate text-sm font-medium">Alex Trader</span>
            <div className="flex items-center gap-1.5">
              <Badge
                variant="secondary"
                className="h-4 rounded-full px-1.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 border-0"
              >
                Pro
              </Badge>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className={cn(
              'flex size-8 items-center justify-center rounded-md transition-colors',
              'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
            aria-label="Log out"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  const { isAuthenticated, sidebarOpen, setSidebarOpen } = useNavigation()
  const isMobile = useIsMobile()

  // Close mobile sheet when navigating
  const handleMobileItemClick = useMemo(
    () =>
      isMobile
        ? (_viewId: ViewId) => {
            setSidebarOpen(false)
          }
        : undefined,
    [isMobile, setSidebarOpen]
  )

  // Close sidebar on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen && isMobile) {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen, isMobile, setSidebarOpen])

  if (!isAuthenticated) return null

  // Mobile: Sheet
  if (isMobile) {
    return (
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          side="left"
          className="w-[260px] p-0 !duration-300"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <SidebarNavContent onItemClick={handleMobileItemClick} />
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop: Fixed sidebar
  return (
    <AnimatePresence>
      <motion.aside
        initial={{ x: -260, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-40 hidden w-[260px] border-r border-sidebar-border md:block"
      >
        <SidebarNavContent />
      </motion.aside>
    </AnimatePresence>
  )
}

export { viewLabels }
export type { NavItem }