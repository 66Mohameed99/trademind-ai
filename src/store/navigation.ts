import { create } from 'zustand'

export type ViewId =
  | 'landing'
  | 'dashboard'
  | 'ai-mentor'
  | 'chart-analyzer'
  | 'academy'
  | 'journal'
  | 'community'
  | 'pricing'
  | 'admin'
  | 'settings'

interface NavigationState {
  currentView: ViewId
  isAuthenticated: boolean
  sidebarOpen: boolean
  authDialogOpen: boolean
  authDialogTab: 'login' | 'signup'
  setView: (view: ViewId) => void
  setAuthenticated: (value: boolean) => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  openAuthDialog: (tab?: 'login' | 'signup') => void
  closeAuthDialog: () => void
}

export const useNavigation = create<NavigationState>((set) => ({
  currentView: 'landing',
  isAuthenticated: false,
  sidebarOpen: false,
  authDialogOpen: false,
  authDialogTab: 'login',
  setView: (view) => set({ currentView: view }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  openAuthDialog: (tab = 'login') => set({ authDialogOpen: true, authDialogTab: tab }),
  closeAuthDialog: () => set({ authDialogOpen: false }),
}))