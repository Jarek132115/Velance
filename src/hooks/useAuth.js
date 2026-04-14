import { useEffect } from 'react'
import useUserStore from '../store/userStore'

export const useAuth = () => {
  const store = useUserStore()

  useEffect(() => {
    store.initAuth()
  }, [])

  return {
    user: store.user,
    session: store.session,
    profile: store.profile,
    isLoading: store.isLoading,
    error: store.error,
    isAuthenticated: !!store.user,
    signIn: store.signIn,
    signUp: store.signUp,
    signOut: store.signOut,
    clearError: store.clearError,
  }
}
