import { defineStore } from 'pinia'
import { currentUser } from '@/data/mockData'
import { supabase } from '@/lib/supabase'

const ERROR_MESSAGES = {
  'Invalid login credentials': 'E-mail ou senha incorretos.',
  'Email not confirmed': 'Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.',
  'User already registered': 'Já existe uma conta com este e-mail.',
  'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
}

function translateAuthError(message) {
  return ERROR_MESSAGES[message] || message
}

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    session: null,
    user: { ...currentUser },
  }),
  actions: {
    async init() {
      const { data } = await supabase.auth.getSession()
      this.setSession(data.session)

      supabase.auth.onAuthStateChange((_event, session) => {
        this.setSession(session)
      })
    },

    setSession(session) {
      this.session = session
      this.isAuthenticated = !!session
      if (session?.user) {
        this.user = {
          ...this.user,
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || this.user.name,
        }
      }
    },

    async login(email, password) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return { error: error ? translateAuthError(error.message) : null }
    },

    async signUp({ name, email, password }) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      return { error: error ? translateAuthError(error.message) : null }
    },

    async loginWithOAuth(provider) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })
      return { error: error ? translateAuthError(error.message) : null }
    },

    async logout() {
      await supabase.auth.signOut()
      this.setSession(null)
    },

    updateProfile(payload) {
      this.user = { ...this.user, ...payload }
    },
  },
})
