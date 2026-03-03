<template>
  <div class="error-page">
    <div class="error-content">
      <h1 class="error-code">404</h1>
      <p class="error-description">抱歉，您访问的页面不存在</p>
      <p class="error-hint">请检查 URL 是否正确，或返回首页</p>
      <div class="error-actions">
        <a-button type="primary" @click="goHome">返回首页</a-button>
        <a-button @click="goBack">返回上一页</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
}

.error-content {
  text-align: center;
  padding: 48px;
}

.error-code {
  font-size: 120px;
  font-weight: 700;
  color: #1890ff;
  margin-bottom: 24px;
  line-height: 1;
}

.error-description {
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
}

.error-hint {
  font-size: 14px;
  color: #999;
  margin-bottom: 32px;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}
</style>
