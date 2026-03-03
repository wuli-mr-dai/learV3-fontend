import { describe, it, expect } from 'vitest'
import { useAuthStore } from '@/stores/auth'
import { createPinia, setActivePinia } from 'pinia'

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initial state', () => {
    const authStore = useAuthStore()

    expect(authStore.user).toBe(null)
    expect(authStore.isAuthenticated).toBe(false)
    expect(authStore.token).toBe(null)
  })

  it('checkAuth restores state from storage', () => {
    // 设置 localStorage
    localStorage.setItem('learv3_user', JSON.stringify({ id: 1, username: 'test', email: 'test@test.com' }))
    localStorage.setItem('learv3_token', 'test-token')

    const authStore = useAuthStore()
    authStore.checkAuth()

    expect(authStore.isAuthenticated).toBe(true)
    expect(authStore.token).toBe('test-token')
    expect(authStore.user?.username).toBe('test')

    // 清理
    localStorage.removeItem('learv3_user')
    localStorage.removeItem('learv3_token')
  })

  it('logout clears state', () => {
    localStorage.setItem('learv3_user', JSON.stringify({ id: 1, username: 'test', email: 'test@test.com' }))
    localStorage.setItem('learv3_token', 'test-token')

    const authStore = useAuthStore()
    authStore.checkAuth()
    authStore.logout()

    expect(authStore.user).toBe(null)
    expect(authStore.isAuthenticated).toBe(false)
    expect(authStore.token).toBe(null)
  })
})
