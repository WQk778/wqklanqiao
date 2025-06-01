// stores/wqkAppStore.ts - 应用全局状态管理
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 主题类型
type WqkTheme = 'light' | 'dark' | 'auto'

// 语言类型
type WqkLanguage = 'zh-CN' | 'en-US'

// 设备类型
type WqkDeviceType = 'mobile' | 'tablet' | 'desktop'

// 通知类型
interface WqkNotification {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  duration?: number
  timestamp: number
}

// 应用全局状态管理
export const useWqkAppStore = defineStore('wqkApp', () => {
  // 状态
  const wqkTheme = ref<WqkTheme>('light')
  const wqkLanguage = ref<WqkLanguage>('zh-CN')
  const wqkDeviceType = ref<WqkDeviceType>('desktop')
  const wqkIsLoading = ref(false)
  const wqkLoadingText = ref('加载中...')
  const wqkSidebarCollapsed = ref(false)
  const wqkNotifications = ref<WqkNotification[]>([])
  const wqkOnlineStatus = ref(navigator.onLine)
  const wqkViewportWidth = ref(window.innerWidth)
  const wqkViewportHeight = ref(window.innerHeight)

  // 计算属性
  const wqkIsDarkMode = computed(() => {
    if (wqkTheme.value === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return wqkTheme.value === 'dark'
  })

  const wqkIsMobile = computed(() => wqkDeviceType.value === 'mobile')
  const wqkIsTablet = computed(() => wqkDeviceType.value === 'tablet')
  const wqkIsDesktop = computed(() => wqkDeviceType.value === 'desktop')

  const wqkUnreadNotificationsCount = computed(() => {
    return wqkNotifications.value.length
  })

  // 动作方法
  const wqkToggleTheme = () => {
    wqkTheme.value = wqkTheme.value === 'light' ? 'dark' : 'light'
    wqkApplyTheme()
  }

  const wqkSetTheme = (theme: WqkTheme) => {
    wqkTheme.value = theme
    wqkApplyTheme()
  }

  const wqkApplyTheme = () => {
    const isDark = wqkIsDarkMode.value
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }

  const wqkSetLanguage = (language: WqkLanguage) => {
    wqkLanguage.value = language
    document.documentElement.setAttribute('lang', language)
  }

  const wqkUpdateDeviceType = () => {
    const width = window.innerWidth
    if (width < 768) {
      wqkDeviceType.value = 'mobile'
    } else if (width < 1024) {
      wqkDeviceType.value = 'tablet'
    } else {
      wqkDeviceType.value = 'desktop'
    }
  }

  const wqkShowLoading = (text = '加载中...') => {
    wqkIsLoading.value = true
    wqkLoadingText.value = text
  }

  const wqkHideLoading = () => {
    wqkIsLoading.value = false
  }

  const wqkToggleSidebar = () => {
    wqkSidebarCollapsed.value = !wqkSidebarCollapsed.value
  }

  const wqkAddNotification = (notification: Omit<WqkNotification, 'id' | 'timestamp'>) => {
    const newNotification: WqkNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now()
    }
    wqkNotifications.value.push(newNotification)

    // 自动移除通知
    if (notification.duration !== 0) {
      setTimeout(() => {
        wqkRemoveNotification(newNotification.id)
      }, notification.duration || 5000)
    }
  }

  const wqkRemoveNotification = (id: string) => {
    const index = wqkNotifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      wqkNotifications.value.splice(index, 1)
    }
  }

  const wqkClearAllNotifications = () => {
    wqkNotifications.value = []
  }

  const wqkUpdateViewport = () => {
    wqkViewportWidth.value = window.innerWidth
    wqkViewportHeight.value = window.innerHeight
    wqkUpdateDeviceType()
  }

  const wqkUpdateOnlineStatus = () => {
    wqkOnlineStatus.value = navigator.onLine
  }

  // 初始化方法
  const wqkInitialize = () => {
    // 应用主题
    wqkApplyTheme()
    
    // 设置语言
    document.documentElement.setAttribute('lang', wqkLanguage.value)
    
    // 更新设备类型
    wqkUpdateDeviceType()
    
    // 监听窗口大小变化
    window.addEventListener('resize', wqkUpdateViewport)
    
    // 监听在线状态变化
    window.addEventListener('online', wqkUpdateOnlineStatus)
    window.addEventListener('offline', wqkUpdateOnlineStatus)
    
    // 监听主题变化（系统主题）
    if (wqkTheme.value === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', wqkApplyTheme)
    }
  }

  return {
    // 状态
    wqkTheme,
    wqkLanguage,
    wqkDeviceType,
    wqkIsLoading,
    wqkLoadingText,
    wqkSidebarCollapsed,
    wqkNotifications,
    wqkOnlineStatus,
    wqkViewportWidth,
    wqkViewportHeight,
    
    // 计算属性
    wqkIsDarkMode,
    wqkIsMobile,
    wqkIsTablet,
    wqkIsDesktop,
    wqkUnreadNotificationsCount,
    
    // 方法
    wqkToggleTheme,
    wqkSetTheme,
    wqkApplyTheme,
    wqkSetLanguage,
    wqkUpdateDeviceType,
    wqkShowLoading,
    wqkHideLoading,
    wqkToggleSidebar,
    wqkAddNotification,
    wqkRemoveNotification,
    wqkClearAllNotifications,
    wqkUpdateViewport,
    wqkUpdateOnlineStatus,
    wqkInitialize
  }
}, {
  persist: {
    key: 'wqk-app-store',
    storage: localStorage,
    paths: ['wqkTheme', 'wqkLanguage', 'wqkSidebarCollapsed']
  }
})