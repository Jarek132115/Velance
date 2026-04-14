import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../lib/supabase'

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      profile: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      setSession: (session) => set({ session, user: session?.user ?? null }),
      setProfile: (profile) => set({ profile }),

      // Initialize auth from existing session
      initAuth: async () => {
        set({ isLoading: true })
        try {
          const { data: { session } } = await supabase.auth.getSession()
          set({ session, user: session?.user ?? null })

          // Listen for auth changes
          supabase.auth.onAuthStateChange((_event, session) => {
            set({ session, user: session?.user ?? null })
          })
        } catch (error) {
          set({ error: error.message })
        } finally {
          set({ isLoading: false })
        }
      },

      signIn: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password })
          if (error) throw error
          set({ session: data.session, user: data.user })
          return { success: true }
        } catch (error) {
          set({ error: error.message })
          return { success: false, error: error.message }
        } finally {
          set({ isLoading: false })
        }
      },

      signUp: async (email, password, metadata = {}) => {
        set({ isLoading: true, error: null })
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: metadata },
          })
          if (error) throw error
          return { success: true, data }
        } catch (error) {
          set({ error: error.message })
          return { success: false, error: error.message }
        } finally {
          set({ isLoading: false })
        }
      },

      signOut: async () => {
        set({ isLoading: true })
        try {
          await supabase.auth.signOut()
          set({ user: null, session: null, profile: null })
        } catch (error) {
          set({ error: error.message })
        } finally {
          set({ isLoading: false })
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'velance-user',
      partialize: (state) => ({ user: state.user, profile: state.profile }),
    }
  )
)

export default useUserStore
