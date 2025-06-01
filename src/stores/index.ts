// 统一导出所有store模块
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
 * 初始化所有store
 * 在应用启动时调用
 */
export const initializeStores = () => {
  const appStore = useWqkAppStore()
  
  // 初始化应用store
  appStore.wqkInitialize()
  
  // 可以在这里添加其他store的初始化逻辑
  console.log('Stores initialized successfully')
}