import { describe, it, expect } from 'vitest'
import { useAppStore } from '@/stores/app'

describe('app store', () => {
  it('initial state', () => {
    const appStore = useAppStore()

    expect(appStore.loading).toBe(false)
    expect(appStore.loadingText).toBe('')
    expect(appStore.collapsed).toBe(false)
    expect(appStore.theme).toBe('light')
    expect(appStore.error.visible).toBe(false)
  })

  it('setLoading', () => {
    const appStore = useAppStore()

    appStore.setLoading(true, '加载中...')

    expect(appStore.loading).toBe(true)
    expect(appStore.loadingText).toBe('加载中...')
  })

  it('setError and clearError', () => {
    const appStore = useAppStore()

    appStore.setError('测试错误', 'error')

    expect(appStore.error.visible).toBe(true)
    expect(appStore.error.message).toBe('测试错误')
    expect(appStore.error.type).toBe('error')

    appStore.clearError()

    expect(appStore.error.visible).toBe(false)
    expect(appStore.error.message).toBe('')
  })

  it('toggleCollapsed', () => {
    const appStore = useAppStore()

    expect(appStore.collapsed).toBe(false)

    appStore.toggleCollapsed()

    expect(appStore.collapsed).toBe(true)

    appStore.toggleCollapsed()

    expect(appStore.collapsed).toBe(false)
  })

  it('toggleTheme', () => {
    const appStore = useAppStore()

    expect(appStore.theme).toBe('light')
    expect(appStore.isDark).toBe(false)

    appStore.toggleTheme()

    expect(appStore.theme).toBe('dark')
    expect(appStore.isDark).toBe(true)
  })
})
