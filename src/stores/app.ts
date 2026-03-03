import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 全局 loading 状态
  const loading = ref(false)
  const loadingText = ref('')

  // 全局错误状态
  const error = ref<{ visible: boolean; message: string; type: 'error' | 'warning' | 'info' }>({
    visible: false,
    message: '',
    type: 'error'
  })

  // 侧边栏折叠状态
  const collapsed = ref(false)

  // 当前主题
  const theme = ref<'light' | 'dark'>('light')

  // 设置全局 Loading
  const setLoading = (value: boolean, text = '') => {
    loading.value = value
    loadingText.value = text
  }

  // 设置错误信息
  const setError = (message: string, type: 'error' | 'warning' | 'info' = 'error') => {
    error.value = {
      visible: true,
      message,
      type
    }
  }

  // 清除错误
  const clearError = () => {
    error.value = {
      visible: false,
      message: '',
      type: 'error'
    }
  }

  // 切换侧边栏
  const toggleCollapsed = () => {
    collapsed.value = !collapsed.value
  }

  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  // 计算属性
  const isDark = computed(() => theme.value === 'dark')

  return {
    // state
    loading,
    loadingText,
    error,
    collapsed,
    theme,
    // actions
    setLoading,
    setError,
    clearError,
    toggleCollapsed,
    toggleTheme,
    // computed
    isDark
  }
})
