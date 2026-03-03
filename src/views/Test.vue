<template>
  <div>
    测试
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const data = ref(null)

// 计算属性
const computedValue = computed(() => {
  return data.value
})

// 生命周期
onMounted(() => {
  console.log('组件挂载完成')
})

// 方法
const handleClick = () => {
  console.log('点击事件')
}
</script>

<style scoped>
</style>