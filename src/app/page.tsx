'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useNavigation, type ViewId } from '@/store/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { AuthDialog } from '@/components/auth/auth-dialog'
import LandingView from '@/components/views/landing'
import DashboardView from '@/components/views/dashboard'
import AIMentorView from '@/components/views/ai-mentor'
import ChartAnalyzerView from '@/components/views/chart-analyzer'
import AcademyView from '@/components/views/academy'
import JournalView from '@/components/views/journal'
import CommunityView from '@/components/views/community'
import PricingView from '@/components/views/pricing'
import AdminView from '@/components/views/admin'
import { SettingsView } from '@/components/views/settings'

const viewComponents: Record<ViewId, React.ComponentType> = {
  landing: LandingView,
  dashboard: DashboardView,
  'ai-mentor': AIMentorView,
  'chart-analyzer': ChartAnalyzerView,
  academy: AcademyView,
  journal: JournalView,
  community: CommunityView,
  pricing: PricingView,
  admin: AdminView,
  settings: SettingsView,
}

export default function Home() {
  const { currentView, isAuthenticated } = useNavigation()
  const ViewComponent = viewComponents[currentView]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {isAuthenticated && (
        <>
          <Sidebar />
          <div className="md:pl-[260px] flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4 md:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <ViewComponent />
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </>
      )}
      {!isAuthenticated && (
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <ViewComponent />
            </motion.div>
          </AnimatePresence>
        </main>
      )}
      <AuthDialog />
    </div>
  )
}