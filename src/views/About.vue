<template>
  <div>
    <a-typography-title :level="2">关于页面</a-typography-title>
    <a-card>
      <template #title>
        <span>项目信息</span>
      </template>
      <a-descriptions title="技术栈详情" bordered>
        <a-descriptions-item label="框架">Vue 3</a-descriptions-item>
        <a-descriptions-item label="语言">TypeScript</a-descriptions-item>
        <a-descriptions-item label="UI 框架">Ant Design Vue</a-descriptions-item>
        <a-descriptions-item label="路由">Vue Router 4</a-descriptions-item>
        <a-descriptions-item label="状态管理">Pinia</a-descriptions-item>
        <a-descriptions-item label="构建工具">Vite</a-descriptions-item>
        <a-descriptions-item label="组件自动导入" :span="2">
          unplugin-vue-components
        </a-descriptions-item>
        <a-descriptions-item label="特性" :span="3">
          按需引入、热重载、TypeScript 支持、现代化开发体验
        </a-descriptions-item>
      </a-descriptions>

      <a-divider />

      <a-space direction="vertical" :size="16">
        <a-statistic title="页面访问次数" :value="pageViews" />
        <a-button type="primary" @click="resetViews">
          重置访问次数
        </a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePageStore } from '@/stores/page'

const pageStore = usePageStore()
const pageViews = computed(() => pageStore.views)

const resetViews = () => {
  pageStore.resetViews()
}
</script>