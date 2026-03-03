<template>
  <div>
    <a-typography-title :level="2">首页</a-typography-title>
    <a-card>
      <template #title>
        <span>欢迎使用 Vue 3 + TypeScript + Ant Design</span>
      </template>
      <template #extra>
        <a-button type="primary" @click="increment">
          计数器: {{ count }}
        </a-button>
      </template>
      <p>这是一个基于 Vue 3、TypeScript 和 Ant Design Vue 构建的现代化前端应用。</p>
      <a-space direction="vertical" :size="16">
        <a-alert
          message="技术栈信息"
          description="Vue 3 + TypeScript + Ant Design Vue + Vue Router + Pinia"
          type="info"
          show-icon
        />
        <a-list :data-source="features">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta :description="item.description">
                <template #title>
                  <a-checkbox :checked="item.completed" />
                  {{ item.title }}
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
const count = computed(() => counterStore.count)

const increment = () => {
  counterStore.increment()
}

const features = [
  {
    title: 'Vue 3 Composition API',
    description: '使用最新的 Composition API 进行开发',
    completed: true
  },
  {
    title: 'TypeScript 支持',
    description: '完整的 TypeScript 类型支持',
    completed: true
  },
  {
    title: 'Ant Design Vue',
    description: '按需引入的 Ant Design 组件库',
    completed: true
  },
  {
    title: 'Vue Router',
    description: '现代化的路由管理',
    completed: true
  },
  {
    title: 'Pinia 状态管理',
    description: '轻量级的状态管理解决方案',
    completed: true
  }
]
</script>