import {ref,reactive}from 'vue'
import { DefineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }
  
    return { count, doubleCount, increment }
  })