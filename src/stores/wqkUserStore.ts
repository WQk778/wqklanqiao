import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 用户信息接口
interface WqkUserInfo {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  address?: string
}

// 用户状态管理
export const useWqkUserStore = defineStore('wqkUser', () => {
  // 状态
  const wqkUserInfo = ref<WqkUserInfo | null>(null)
  const wqkIsLoggedIn = ref(false)
  const wqkToken = ref('')
  const wqkLoading = ref(false)

  // 计算属性
  const wqkUserName = computed(() => wqkUserInfo.value?.name || '未登录')
  const wqkUserAvatar = computed(() => wqkUserInfo.value?.avatar || '')
  const wqkIsAuthenticated = computed(() => wqkIsLoggedIn.value && !!wqkToken.value)

  // 方法
  const wqkLogin = async (email: string, password: string) => {
    wqkLoading.value = true
    try {
      // 这里应该调用实际的登录API
      // const response = await axios.post('/auth/login', { email, password })
      
      // 模拟登录成功
      wqkToken.value = 'mock-token-' + Date.now()
      wqkUserInfo.value = {
        id: '1',
        name: '王启坤',
        email: email,
        avatar: '/assets/image/avatar.jpg'
      }
      wqkIsLoggedIn.value = true
      
      return { success: true, message: '登录成功' }
    } catch (error) {
      console.error('登录失败:', error)
      return { success: false, message: '登录失败，请检查用户名和密码' }
    } finally {
      wqkLoading.value = false
    }
  }

  const wqkLogout = () => {
    wqkUserInfo.value = null
    wqkIsLoggedIn.value = false
    wqkToken.value = ''
  }

  const wqkUpdateUserInfo = (userInfo: Partial<WqkUserInfo>) => {
    if (wqkUserInfo.value) {
      wqkUserInfo.value = { ...wqkUserInfo.value, ...userInfo }
    }
  }

  const wqkSetToken = (token: string) => {
    wqkToken.value = token
  }

  return {
    // 状态
    wqkUserInfo,
    wqkIsLoggedIn,
    wqkToken,
    wqkLoading,
    // 计算属性
    wqkUserName,
    wqkUserAvatar,
    wqkIsAuthenticated,
    // 方法
    wqkLogin,
    wqkLogout,
    wqkUpdateUserInfo,
    wqkSetToken
  }
}, {
  persist: {
    key: 'wqk-user-store',
    storage: localStorage,
    paths: ['wqkUserInfo', 'wqkIsLoggedIn', 'wqkToken']
  }
})