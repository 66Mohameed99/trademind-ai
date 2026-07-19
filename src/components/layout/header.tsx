'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  CreditCard,
  LogOut,
  Command,
} from 'lucide-react'
import { useNavigation } from '@/store/navigation'
import { useIsMobile } from '@/hooks/use-mobile'
import { viewLabels } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 28 },
  },
}

export function Header() {
  const { isAuthenticated, currentView, setView, toggleSidebar, setAuthenticated } =
    useNavigation()
  const { theme, setTheme } = useTheme()
  const isMobile = useIsMobile()
  const [searchFocused, setSearchFocused] = useState(false)

  const handleLogout = useCallback(() => {
    setAuthenticated(false)
    setView('landing')
  }, [setAuthenticated, setView])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  if (!isAuthenticated) return null

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'sticky top-0 z-50 flex h-16 shrink-0 items-center gap-3 border-b border-border px-4 md:px-6',
        'bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60'
      )}
    >
      {/* Left: Hamburger (mobile) + Breadcrumb */}
      <div className="flex items-center gap-3">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle navigation menu"
          >
            <Menu className="size-5" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <h1 className="text-base font-semibold tracking-tight">
            {viewLabels[currentView]}
          </h1>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right: Search, Notifications, Theme, Avatar */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className={cn(
              'h-9 w-48 rounded-md pl-8 pr-10 transition-all lg:w-64',
              searchFocused && 'w-64 lg:w-80 ring-2 ring-ring/20'
            )}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden lg:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <Command className="size-2.5" />
            <span>K</span>
          </kbd>
        </div>

        {/* Mobile search button */}
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          aria-label="Search"
        >
          <Search className="size-4.5" />
        </Button>

        <Separator orientation="vertical" className="mx-1 hidden h-6 md:block" />

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="size-4.5" />
          <Badge className="absolute -top-0.5 -right-0.5 flex size-4.5 items-center justify-center rounded-full bg-rose-500 p-0 text-[10px] font-bold text-white border-0">
            3
          </Badge>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="size-4.5 text-amber-400" />
          ) : (
            <Moon className="size-4.5" />
          )}
        </Button>

        <Separator orientation="vertical" className="mx-1 hidden h-6 md:block" />

        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 gap-2 rounded-full pl-1.5 pr-3 hover:bg-accent"
            >
              <Avatar className="size-7">
                <AvatarImage src="" alt="Alex Trader" />
                <AvatarFallback className="bg-primary/10 text-primary text-[11px] font-semibold">
                  AT
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block">
                Alex Trader
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-none">Alex Trader</p>
                <p className="text-xs text-muted-foreground leading-none">
                  alex@trademind.ai
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setView('settings')}>
                <User className="mr-2 size-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView('settings')}>
                <Settings className="mr-2 size-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView('pricing')}>
                <CreditCard className="mr-2 size-4" />
                Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  )
}