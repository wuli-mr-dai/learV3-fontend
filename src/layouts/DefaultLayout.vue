<template>
  <a-layout>
    <a-layout-header>
      <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
        <a-menu v-model:selectedKeys="current" mode="horizontal" theme="dark" :style="{ lineHeight: '64px', flex: 1 }">
          <a-menu-item key="home">
            <router-link to="/">首页</router-link>
          </a-menu-item>
          <a-menu-item key="about">
            <router-link to="/about">关于</router-link>
          </a-menu-item>
          <a-menu-item key="test">
            <router-link to="/test">测试</router-link>
          </a-menu-item>
        </a-menu>

        <div v-if="isAuthenticated()" :style="{ color: 'white', display: 'flex', alignItems: 'center', gap: '16px' }">
          <span>欢迎，{{ user?.username }}</span>
          <a-button type="link" :style="{ color: 'white' }" @click="handleLogout">
            退出登录
          </a-button>
        </div>

        <div v-else :style="{ color: 'white' }">
          <a-button type="primary" size="small" @click="showAuthModal = true">
            登录/注册
          </a-button>
        </div>
      </div>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <router-view />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Vue 3 + TypeScript + Ant Design ©2026
    </a-layout-footer>

    <AuthModal v-model:visible="showAuthModal" @success="handleAuthSuccess" v-if="showAuthModal" />
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAuthModal } from '@/composables'
import AuthModal from '@/components/AuthModal.vue'

const route = useRoute()
const authStore = useAuthStore()

const current = ref<string[]>([route.name as string])
const user = computed(() => authStore.user)

const { showAuthModal, handleAuthSuccess, isAuthenticated } = useAuthModal()

const handleLogout = () => {
  authStore.logout()
}
</script>
