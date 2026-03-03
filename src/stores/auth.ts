import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from '@/api'
import { storage } from '@/utils'
import type { User, LoginForm, RegisterForm } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const token = ref<string | null>(null)

  const login = async (data: LoginForm) => {
    const response = await authApi.login(data)
    user.value = response.user
    isAuthenticated.value = true
    token.value = response.token
    storage.set('user', response.user)
    storage.set('token', response.token)
  }

  const register = async (data: RegisterForm) => {
    const response = await authApi.register(data)
    user.value = response.user
    isAuthenticated.value = true
    token.value = response.token
    storage.set('user', response.user)
    storage.set('token', response.token)
  }

  const logout = async () => {
    await authApi.logout()
    user.value = null
    isAuthenticated.value = false
    token.value = null
    storage.remove('user')
    storage.remove('token')
  }

  const checkAuth = () => {
    const savedUser = storage.get<User>('user')
    const savedToken = storage.get<string>('token')

    if (savedUser && savedToken) {
      user.value = savedUser
      isAuthenticated.value = true
      token.value = savedToken
    }
  }

  return {
    user,
    isAuthenticated,
    token,
    login,
    register,
    logout,
    checkAuth
  }
})