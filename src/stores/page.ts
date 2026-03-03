import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', {
  state: () => ({
    views: 0
  }),
  
  actions: {
    incrementViews() {
      this.views++
    },
    
    resetViews() {
      this.views = 0
    }
  }
})