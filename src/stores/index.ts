// stores/index.ts - 统一导出所有store
export { useCounterStore } from './counter'
export { useWqkUserStore } from './wqkUserStore'
export { useWqkCartStore } from './wqkCartStore'
export { useWqkProductStore } from './wqkProductStore'
export { useWqkAppStore } from './wqkAppStore'

// 重新导出类型定义（从各个store文件中提取）
// 注意：这些类型需要在各自的store文件中导出才能使用

// 便捷的组合函数
import { useWqkUserStore } from './wqkUserStore'
import { useWqkCartStore } from './wqkCartStore'
import { useWqkProductStore } from './wqkProductStore'
import { useWqkAppStore } from './wqkAppStore'

/**
 * 获取所有store的组合函数
 * 方便在组件中一次性获取多个store
 */
export const useStores = () => {
  const userStore = useWqkUserStore()
  const cartStore = useWqkCartStore()
  const productStore = useWqkProductStore()
  const appStore = useWqkAppStore()
  
  return {
    userStore,
    cartStore,
    productStore,
    appStore
  }
}

/**
 * 重置所有store的函数
 * 用于用户登出或应用重置时
 */
export const resetAllStores = () => {
  const { userStore, cartStore, productStore, appStore } = useStores()
  
  // 重置各个store
  userStore.$reset()
  cartStore.$reset()
  productStore.$reset()
  // appStore通常不需要重置，因为包含应用级别的设置
}