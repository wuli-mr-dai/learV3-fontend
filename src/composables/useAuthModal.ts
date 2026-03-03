import { ref, watch, onMounted, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function useAuthModal() {
  const route = useRoute()
  const authStore = useAuthStore()
  const showAuthModal = ref(false)

  const isAuthenticated = () => authStore.isAuthenticated

  const checkAndShowModal = () => {
    if (route.meta.requiresAuth && !isAuthenticated()) {
      showAuthModal.value = true
    }
  }

  watch(
    () => route.path,
    () => {
      checkAndShowModal()
    }
  )

  onMounted(() => {
    authStore.checkAuth()
    checkAndShowModal()
  })

  const handleAuthSuccess = () => {
    console.log('登录成功')
  }

  return {
    showAuthModal,
    handleAuthSuccess,
    isAuthenticated
  }
}
