'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  User,
  Mail,
  Camera,
  Save,
  Globe,
  Sun,
  Moon,
  Monitor,
  Bell,
  BellRing,
  Megaphone,
  Clock,
  TrendingUp,
  Shield,
  ShieldCheck,
  Smartphone,
  Laptop,
  LogOut,
  Trash2,
  CreditCard,
  Calendar,
  AlertTriangle,
  Loader2,
  Eye,
  EyeOff,
  Lock,
  Fingerprint,
  ChevronRight,
  Check,
} from 'lucide-react'
import { useNavigation } from '@/store/navigation'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export function SettingsView() {
  const { setView } = useNavigation()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  // Profile state
  const [profileName, setProfileName] = React.useState('Alex Morgan')
  const [profileEmail, setProfileEmail] = React.useState('alex@trademind.ai')
  const [profileBio, setProfileBio] = React.useState(
    'Forex & Crypto trader with 3 years of experience. Passionate about technical analysis and risk management.'
  )
  const [savingProfile, setSavingProfile] = React.useState(false)

  // Preferences state
  const [language, setLanguage] = React.useState('en')
  const [emailNotif, setEmailNotif] = React.useState(true)
  const [pushNotif, setPushNotif] = React.useState(true)
  const [marketingNotif, setMarketingNotif] = React.useState(false)

  // Trading preferences
  const [timeframe, setTimeframe] = React.useState('H1')
  const [defaultPair, setDefaultPair] = React.useState('EUR/USD')
  const [riskPerTrade, setRiskPerTrade] = React.useState([2])
  const [signalNotif, setSignalNotif] = React.useState(true)

  // Security state
  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmSecurityPassword, setConfirmSecurityPassword] = React.useState('')
  const [showOldPassword, setShowOldPassword] = React.useState(false)
  const [showNewPassword, setShowNewPassword] = React.useState(false)
  const [showConfirmSecurityPassword, setShowConfirmSecurityPassword] = React.useState(false)
  const [twoFactor, setTwoFactor] = React.useState(false)
  const [changingPassword, setChangingPassword] = React.useState(false)

  const handleSaveProfile = () => {
    setSavingProfile(true)
    setTimeout(() => setSavingProfile(false), 1200)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setChangingPassword(true)
    setTimeout(() => {
      setChangingPassword(false)
      setOldPassword('')
      setNewPassword('')
      setConfirmSecurityPassword('')
    }, 1200)
  }

  const themeOptions = [
    { value: 'system', label: 'System', icon: Monitor },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ] as const

  const mockSessions = [
    {
      id: 1,
      device: 'MacBook Pro',
      icon: Laptop,
      location: 'New York, US',
      lastActive: 'Active now',
      current: true,
    },
    {
      id: 2,
      device: 'iPhone 15',
      icon: Smartphone,
      location: 'New York, US',
      lastActive: '2 hours ago',
      current: false,
    },
  ]

  return (
    <motion.div
      className="max-w-3xl mx-auto space-y-6 p-4 sm:p-6 lg:p-8"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account, preferences, and trading configuration.
        </p>
      </motion.div>

      {/* ─── Profile Section ─── */}
      <motion.div variants={sectionVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="size-5 text-emerald-600 dark:text-emerald-400" />
              Profile
            </CardTitle>
            <CardDescription>Update your personal information and avatar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="relative group">
                <Avatar className="size-20 border-2 border-emerald-500/30">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xl font-bold">
                    AM
                  </AvatarFallback>
                </Avatar>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-1 -right-1 h-7 rounded-full px-2 text-xs"
                  >
                    <Camera className="size-3" />
                    Change
                  </Button>
                </motion.div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{profileName}</p>
                <p className="text-muted-foreground text-sm truncate">{profileEmail}</p>
              </div>
            </motion.div>

            <Separator />

            {/* Name */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="profile-name">Full Name</Label>
              <Input
                id="profile-name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Your name"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="profile-email"
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="pl-9"
                  placeholder="your@email.com"
                />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="profile-bio">Bio</Label>
              <Textarea
                id="profile-bio"
                value={profileBio}
                onChange={(e) => setProfileBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="min-h-20 resize-none"
              />
            </motion.div>
          </CardContent>
          <CardFooter className="justify-end">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleSaveProfile}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={savingProfile}
              >
                {savingProfile ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* ─── Preferences Section ─── */}
      <motion.div variants={sectionVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="size-5 text-emerald-600 dark:text-emerald-400" />
              Preferences
            </CardTitle>
            <CardDescription>Customize your app experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Language */}
            <motion.div variants={itemVariants} className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label>Language</Label>
                <p className="text-xs text-muted-foreground">Choose your display language</p>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <Separator />

            {/* Theme */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="space-y-0.5">
                <Label>Theme</Label>
                <p className="text-xs text-muted-foreground">Select your preferred color scheme</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {mounted && themeOptions.map((opt) => {
                  const Icon = opt.icon
                  const isActive = theme === opt.value
                  return (
                    <motion.div key={opt.value} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <button
                        type="button"
                        onClick={() => setTheme(opt.value)}
                        className={cn(
                          'flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all w-full',
                          isActive
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                            : 'border-transparent bg-muted/50 hover:bg-muted text-muted-foreground'
                        )}
                      >
                        <Icon className="size-5" />
                        <span className="text-xs font-medium">{opt.label}</span>
                        {isActive && <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />}
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <Separator />

            {/* Notification Toggles */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="space-y-0.5">
                <Label className="flex items-center gap-2">
                  <Bell className="size-4" />
                  Notifications
                </Label>
                <p className="text-xs text-muted-foreground">Control how you receive notifications</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="size-4 text-muted-foreground" />
                    <span>Email Notifications</span>
                  </div>
                  <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <BellRing className="size-4 text-muted-foreground" />
                    <span>Push Notifications</span>
                  </div>
                  <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Megaphone className="size-4 text-muted-foreground" />
                    <span>Marketing Emails</span>
                  </div>
                  <Switch checked={marketingNotif} onCheckedChange={setMarketingNotif} />
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ─── Trading Preferences Section ─── */}
      <motion.div variants={sectionVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="size-5 text-emerald-600 dark:text-emerald-400" />
              Trading Preferences
            </CardTitle>
            <CardDescription>Configure your default trading parameters.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Default Timeframe */}
            <motion.div variants={itemVariants} className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label>Default Timeframe</Label>
                <p className="text-xs text-muted-foreground">Chart timeframe for analysis</p>
              </div>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M5">M5</SelectItem>
                  <SelectItem value="M15">M15</SelectItem>
                  <SelectItem value="H1">H1</SelectItem>
                  <SelectItem value="H4">H4</SelectItem>
                  <SelectItem value="D1">D1</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <Separator />

            {/* Default Pair */}
            <motion.div variants={itemVariants} className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label>Default Pair</Label>
                <p className="text-xs text-muted-foreground">Your go-to trading pair</p>
              </div>
              <Input
                value={defaultPair}
                onChange={(e) => setDefaultPair(e.target.value)}
                className="w-[160px] text-center font-mono"
                placeholder="EUR/USD"
              />
            </motion.div>

            <Separator />

            {/* Risk Per Trade */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Risk per Trade</Label>
                  <p className="text-xs text-muted-foreground">Maximum risk per position</p>
                </div>
                <Badge
                  variant="outline"
                  className="font-mono text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                >
                  {riskPerTrade[0]}%
                </Badge>
              </div>
              <Slider
                value={riskPerTrade}
                onValueChange={setRiskPerTrade}
                min={0.5}
                max={5}
                step={0.5}
                className="[&_[data-slot=slider-range]]:bg-emerald-500 [&_[data-slot=slider-thumb]]:border-emerald-500"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.5%</span>
                <span>5%</span>
              </div>
            </motion.div>

            <Separator />

            {/* Show Signals Notifications */}
            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Signal Notifications</Label>
                <p className="text-xs text-muted-foreground">Get notified of AI trading signals</p>
              </div>
              <Switch checked={signalNotif} onCheckedChange={setSignalNotif} />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ─── Subscription Section ─── */}
      <motion.div variants={sectionVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="size-5 text-emerald-600 dark:text-emerald-400" />
              Subscription
            </CardTitle>
            <CardDescription>Manage your plan and billing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Pro Plan</p>
                    <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">Active</Badge>
                  </div>
                  <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                    $29<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" onClick={() => setView('pricing')}>
                    Manage Subscription
                    <ChevronRight className="size-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="size-4" />
              <span>Next billing date: <span className="text-foreground font-medium">January 15, 2025</span></span>
            </motion.div>
          </CardContent>
          <CardFooter className="justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="destructive" size="sm">
                    Cancel Subscription
                  </Button>
                </motion.div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel your subscription?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will cancel your Pro Plan at the end of the billing period. You&apos;ll lose
                    access to premium features including AI mentor, advanced charts, and signals.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive hover:bg-destructive/90 text-white">
                    Yes, Cancel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </motion.div>

      {/* ─── Security Section ─── */}
      <motion.div variants={sectionVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="size-5 text-emerald-600 dark:text-emerald-400" />
              Security
            </CardTitle>
            <CardDescription>Protect your account with strong security measures.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Change Password */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="space-y-0.5">
                <Label>Change Password</Label>
                <p className="text-xs text-muted-foreground">Update your password regularly for security</p>
              </div>
              <form onSubmit={handleChangePassword} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="old-password" className="text-xs">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="old-password"
                      type={showOldPassword ? 'text' : 'password'}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="pl-9 pr-9"
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showOldPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="new-password" className="text-xs">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="new-password"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-9 pr-9"
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm-security-password" className="text-xs">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="confirm-security-password"
                      type={showConfirmSecurityPassword ? 'text' : 'password'}
                      value={confirmSecurityPassword}
                      onChange={(e) => setConfirmSecurityPassword(e.target.value)}
                      className="pl-9 pr-9"
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmSecurityPassword(!showConfirmSecurityPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmSecurityPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    disabled={changingPassword}
                  >
                    {changingPassword ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Password'
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            <Separator />

            {/* Two-Factor Authentication */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Fingerprint className="size-4" />
                    Two-Factor Authentication
                  </Label>
                  <p className="text-xs text-muted-foreground max-w-sm">
                    Add an extra layer of security by requiring a verification code in addition to your password.
                  </p>
                </div>
                <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
              </div>
              {twoFactor && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="rounded-lg border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 p-3 text-sm"
                >
                  <div className="flex gap-2">
                    <ShieldCheck className="size-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-amber-700 dark:text-amber-300">Setup Instructions</p>
                      <ol className="mt-1 space-y-1 text-xs text-muted-foreground list-decimal list-inside">
                        <li>Download an authenticator app (Google Authenticator, Authy)</li>
                        <li>Scan the QR code shown after saving this setting</li>
                        <li>Enter the 6-digit code to verify setup</li>
                      </ol>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <Separator />

            {/* Active Sessions */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="space-y-0.5">
                <Label>Active Sessions</Label>
                <p className="text-xs text-muted-foreground">Devices currently signed in to your account</p>
              </div>
              <div className="space-y-3">
                {mockSessions.map((session) => {
                  const SessionIcon = session.icon
                  return (
                    <motion.div
                      key={session.id}
                      variants={itemVariants}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                          <SessionIcon className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{session.device}</p>
                            {session.current && (
                              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                This device
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {session.location} &middot; {session.lastActive}
                          </p>
                        </div>
                      </div>
                      {!session.current && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                            <LogOut className="size-4" />
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ─── Danger Zone ─── */}
      <motion.div variants={sectionVariants}>
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-destructive">
              <AlertTriangle className="size-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible and destructive actions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <div>
                <p className="text-sm font-medium">Delete Account</p>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="destructive" size="sm" className="shrink-0">
                      <Trash2 className="size-4" />
                      Delete Account
                    </Button>
                  </motion.div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-destructive">
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account, all
                      trading history, journal entries, and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive hover:bg-destructive/90 text-white">
                      Yes, delete my account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bottom Spacer */}
      <div className="h-8" />
    </motion.div>
  )
}