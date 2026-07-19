'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Loader2,
  Chrome,
  Apple,
} from 'lucide-react'
import { useNavigation } from '@/store/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function getPasswordStrength(password: string): {
  label: string
  color: string
  width: string
} {
  if (!password) return { label: '', color: '', width: '0%' }
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: '33%' }
  if (score <= 3) return { label: 'Medium', color: 'bg-amber-500', width: '66%' }
  return { label: 'Strong', color: 'bg-emerald-500', width: '100%' }
}

export function AuthDialog() {
  const { authDialogOpen, authDialogTab, closeAuthDialog, setAuthenticated, setView } =
    useNavigation()

  // Login state
  const [loginEmail, setLoginEmail] = React.useState('')
  const [loginPassword, setLoginPassword] = React.useState('')
  const [showLoginPassword, setShowLoginPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)
  const [loginLoading, setLoginLoading] = React.useState(false)

  // Signup state
  const [signupName, setSignupName] = React.useState('')
  const [signupEmail, setSignupEmail] = React.useState('')
  const [signupPassword, setSignupPassword] = React.useState('')
  const [signupConfirmPassword, setSignupConfirmPassword] = React.useState('')
  const [showSignupPassword, setShowSignupPassword] = React.useState(false)
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = React.useState(false)
  const [agreeTerms, setAgreeTerms] = React.useState(false)
  const [signupLoading, setSignupLoading] = React.useState(false)

  const passwordStrength = React.useMemo(() => getPasswordStrength(signupPassword), [signupPassword])

  const doLogin = React.useCallback(() => {
    setLoginLoading(true)
    setTimeout(() => {
      setLoginLoading(false)
      setAuthenticated(true)
      closeAuthDialog()
      setView('dashboard')
    }, 1000)
  }, [setAuthenticated, closeAuthDialog, setView])

  const doSignup = React.useCallback(() => {
    setSignupLoading(true)
    setTimeout(() => {
      setSignupLoading(false)
      setAuthenticated(true)
      closeAuthDialog()
      setView('dashboard')
    }, 1000)
  }, [setAuthenticated, closeAuthDialog, setView])

  const handleLogin = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      doLogin()
    },
    [doLogin]
  )

  const handleSignup = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      doSignup()
    },
    [doSignup]
  )

  // Reset form fields when dialog opens/closes
  React.useEffect(() => {
    if (!authDialogOpen) {
      setLoginEmail('')
      setLoginPassword('')
      setSignupName('')
      setSignupEmail('')
      setSignupPassword('')
      setSignupConfirmPassword('')
      setRememberMe(false)
      setAgreeTerms(false)
      setShowLoginPassword(false)
      setShowSignupPassword(false)
      setShowSignupConfirmPassword(false)
    }
  }, [authDialogOpen])

  return (
    <Dialog open={authDialogOpen} onOpenChange={(open) => !open && closeAuthDialog()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={authDialogTab}
            initial={{ opacity: 0, x: authDialogTab === 'login' ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: authDialogTab === 'login' ? 16 : -16 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="p-6"
          >
            <Tabs
              value={authDialogTab}
              onValueChange={(v) => useNavigation.getState().openAuthDialog(v as 'login' | 'signup')}
            >
              <TabsList className="grid w-full grid-cols-2 h-10 mb-6">
                <TabsTrigger value="login" className="text-sm font-medium">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-sm font-medium">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* ─── Login Tab ─── */}
              <TabsContent value="login" forceMount={true} className={cn(authDialogTab !== 'login' && 'hidden')}>
                <form onSubmit={handleLogin}>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                  >
                    <motion.div variants={staggerItem}>
                      <DialogHeader className="mb-4">
                        <DialogTitle className="text-xl font-bold text-center">
                          Welcome Back
                        </DialogTitle>
                        <DialogDescription className="text-center">
                          Sign in to continue your trading journey
                        </DialogDescription>
                      </DialogHeader>
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="trader@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-9"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type={showLoginPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-9 pr-9"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                          aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                        >
                          {showLoginPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </motion.div>

                    <motion.div variants={staggerItem} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(v) => setRememberMe(v === true)}
                        />
                        <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                          Remember me
                        </Label>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium transition-colors"
                      >
                        Forgot password?
                      </button>
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <Button
                        type="submit"
                        className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                        disabled={loginLoading}
                      >
                        {loginLoading ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          'Sign In'
                        )}
                      </Button>
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <div className="relative my-4">
                        <Separator />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
                          or continue with
                        </span>
                      </div>
                    </motion.div>

                    <motion.div variants={staggerItem} className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-10 font-medium"
                        onClick={doLogin}
                        disabled={loginLoading}
                      >
                        <Chrome className="size-4" />
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-10 font-medium"
                        onClick={doLogin}
                        disabled={loginLoading}
                      >
                        <Apple className="size-4" />
                        Apple
                      </Button>
                    </motion.div>

                    <motion.div variants={staggerItem} className="text-center pt-2">
                      <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <button
                          type="button"
                          onClick={() => useNavigation.getState().openAuthDialog('signup')}
                          className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-semibold transition-colors"
                        >
                          Sign Up
                        </button>
                      </p>
                    </motion.div>
                  </motion.div>
                </form>
              </TabsContent>

              {/* ─── Sign Up Tab ─── */}
              <TabsContent value="signup" forceMount={true} className={cn(authDialogTab !== 'signup' && 'hidden')}>
                <form onSubmit={handleSignup}>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                  >
                    <motion.div variants={staggerItem}>
                      <DialogHeader className="mb-4">
                        <DialogTitle className="text-xl font-bold text-center">
                          Create Account
                        </DialogTitle>
                        <DialogDescription className="text-center">
                          Start your trading education today
                        </DialogDescription>
                      </DialogHeader>
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Trader"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          className="pl-9"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="trader@example.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="pl-9"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showSignupPassword ? 'text' : 'password'}
                          placeholder="Create a strong password"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="pl-9 pr-9"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                          aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                        >
                          {showSignupPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                      {signupPassword && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-1.5"
                        >
                          <div className="flex gap-1 h-1.5 rounded-full overflow-hidden bg-muted">
                            <motion.div
                              className={cn('h-full rounded-full', passwordStrength.color)}
                              initial={{ width: 0 }}
                              animate={{ width: passwordStrength.width }}
                              transition={{ duration: 0.3, ease: 'easeOut' }}
                            />
                          </div>
                          <p className={cn(
                            'text-xs font-medium',
                            passwordStrength.label === 'Strong' && 'text-emerald-600 dark:text-emerald-400',
                            passwordStrength.label === 'Medium' && 'text-amber-600 dark:text-amber-400',
                            passwordStrength.label === 'Weak' && 'text-red-600 dark:text-red-400',
                          )}>
                            {passwordStrength.label}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                      <Label htmlFor="signup-confirm">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          id="signup-confirm"
                          type={showSignupConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          className={cn(
                            'pl-9 pr-9',
                            signupConfirmPassword && signupPassword !== signupConfirmPassword && 'border-red-500 focus-visible:border-red-500'
                          )}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                          aria-label={showSignupConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showSignupConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                      {signupConfirmPassword && signupPassword !== signupConfirmPassword && (
                        <p className="text-xs text-red-500">Passwords do not match</p>
                      )}
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="agree-terms"
                          checked={agreeTerms}
                          onCheckedChange={(v) => setAgreeTerms(v === true)}
                          className="mt-0.5"
                        />
                        <Label htmlFor="agree-terms" className="text-sm font-normal leading-snug cursor-pointer">
                          I agree to the{' '}
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium cursor-pointer hover:underline">
                            Terms of Service
                          </span>
                        </Label>
                      </div>
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <Button
                        type="submit"
                        className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                        disabled={signupLoading || !agreeTerms}
                      >
                        {signupLoading ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          'Create Account'
                        )}
                      </Button>
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <div className="relative my-4">
                        <Separator />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
                          or continue with
                        </span>
                      </div>
                    </motion.div>

                    <motion.div variants={staggerItem} className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-10 font-medium"
                        onClick={doSignup}
                        disabled={signupLoading}
                      >
                        <Chrome className="size-4" />
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-10 font-medium"
                        onClick={doSignup}
                        disabled={signupLoading}
                      >
                        <Apple className="size-4" />
                        Apple
                      </Button>
                    </motion.div>

                    <motion.div variants={staggerItem} className="text-center pt-2">
                      <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={() => useNavigation.getState().openAuthDialog('login')}
                          className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-semibold transition-colors"
                        >
                          Sign In
                        </button>
                      </p>
                    </motion.div>
                  </motion.div>
                </form>
              </TabsContent>
            </Tabs>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}