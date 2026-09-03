import { create } from 'zustand';

/**
 * Global State Management with Zustand
 * Manages: User, Videos, Monetization, UI State
 */

export const useAppStore = create((set) => ({
  // User State
  user: {
    id: 'user123',
    username: 'CreatorPro',
    email: 'creator@render.com',
    subscribers: 2500,
    isMonetized: true,
    playButton: 'Diamond'
  },
  setUser: (user) => set({ user }),

  // Videos State
  videos: [],
  addVideo: (video) => set((state) => ({
    videos: [...state.videos, video]
  })),
  setVideos: (videos) => set({ videos }),

  // Monetization State
  earnings: {
    totalEarnings: 12500,
    monthlyEarnings: 2150,
    creatorPayout: 1935,
    platformFee: 215
  },
  setEarnings: (earnings) => set({ earnings }),

  // UI State
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  
  notification: null,
  showNotification: (message, type = 'success') => 
    set({ notification: { message, type, id: Date.now() } }),
  clearNotification: () => set({ notification: null }),

  // Auth State
  isAuthenticated: false,
  login: (credentials) => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false, user: null }),

  // Theme State
  theme: 'dark',
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'dark' ? 'light' : 'dark'
  }))
}));