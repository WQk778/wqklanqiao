import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type WqkTheme = 'light' | 'dark' | 'auto'
export type WqkLanguage = 'zh-CN' | 'en-US'
export type WqkDeviceType = 'mobile' | 'tablet' | 'desktop'

export interface WqkNotification {
  wqkId: string
  wqkType: 'success' | 'error' | 'warning' | 'info'
  wqkTitle: string
  wqkMessage: string
  wqkDuration?: number
  wqkCreatedAt: Date
}

export const wqkUseAppStore = defineStore('wqkApp', () => {
  // 状态
  const wqkTheme = ref<WqkTheme>('auto')
  const wqkLanguage = ref<WqkLanguage>('zh-CN')
  const wqkDeviceType = ref<WqkDeviceType>('desktop')
  const wqkIsLoading = ref(false)
  const wqkSidebarCollapsed = ref(false)
  const wqkNotifications = ref<WqkNotification[]>([])
  const wqkOnlineStatus = ref(navigator.onLine)
  const wqkViewportWidth = ref(window.innerWidth)
  const wqkViewportHeight = ref(window.innerHeight)

  // 计算属性
  const wqkCurrentTheme = computed(() => {
    if (wqkTheme.value === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return wqkTheme.value
  })

  const wqkIsMobile = computed(() => wqkDeviceType.value === 'mobile')
  const wqkIsTablet = computed(() => wqkDeviceType.value === 'tablet')
  const wqkIsDesktop = computed(() => wqkDeviceType.value === 'desktop')
  const wqkIsSmallScreen = computed(() => wqkViewportWidth.value < 768)
  const wqkIsMediumScreen = computed(() => wqkViewportWidth.value >= 768 && wqkViewportWidth.value < 1024)
  const wqkIsLargeScreen = computed(() => wqkViewportWidth.value >= 1024)

  // 方法
  const wqkSetTheme = (wqkNewTheme: WqkTheme) => {
    wqkTheme.value = wqkNewTheme
    wqkApplyTheme()
  }

  const wqkToggleTheme = () => {
    if (wqkTheme.value === 'light') {
      wqkSetTheme('dark')
    } else if (wqkTheme.value === 'dark') {
      wqkSetTheme('light')
    } else {
      wqkSetTheme('light')
    }
  }

  const wqkApplyTheme = () => {
    const wqkRoot = document.documentElement
    wqkRoot.setAttribute('data-theme', wqkCurrentTheme.value)
    wqkRoot.classList.remove('light', 'dark')
    wqkRoot.classList.add(wqkCurrentTheme.value)
  }

  const wqkSetLanguage = (wqkNewLanguage: WqkLanguage) => {
    wqkLanguage.value = wqkNewLanguage
    document.documentElement.lang = wqkNewLanguage
  }

  const wqkDetectDeviceType = () => {
    const wqkWidth = wqkViewportWidth.value
    if (wqkWidth < 768) {
      wqkDeviceType.value = 'mobile'
    } else if (wqkWidth < 1024) {
      wqkDeviceType.value = 'tablet'
    } else {
      wqkDeviceType.value = 'desktop'
    }
  }

  const wqkSetLoading = (wqkLoading: boolean) => {
    wqkIsLoading.value = wqkLoading
  }

  const wqkShowLoading = () => {
    wqkSetLoading(true)
  }

  const wqkHideLoading = () => {
    wqkSetLoading(false)
  }

  const wqkToggleSidebar = () => {
    wqkSidebarCollapsed.value = !wqkSidebarCollapsed.value
  }

  const wqkCollapseSidebar = () => {
    wqkSidebarCollapsed.value = true
  }

  const wqkExpandSidebar = () => {
    wqkSidebarCollapsed.value = false
  }

  const wqkAddNotification = (wqkNotification: Omit<WqkNotification, 'wqkId' | 'wqkCreatedAt'>) => {
    const wqkNewNotification: WqkNotification = {
      ...wqkNotification,
      wqkId: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      wqkCreatedAt: new Date()
    }
    wqkNotifications.value.push(wqkNewNotification)

    // 自动移除通知
    if (wqkNotification.wqkDuration !== 0) {
      const wqkDuration = wqkNotification.wqkDuration || 5000
      setTimeout(() => {
        wqkRemoveNotification(wqkNewNotification.wqkId)
      }, wqkDuration)
    }

    return wqkNewNotification.wqkId
  }

  const wqkRemoveNotification = (wqkId: string) => {
    const wqkIndex = wqkNotifications.value.findIndex(wqkNotification => wqkNotification.wqkId === wqkId)
    if (wqkIndex > -1) {
      wqkNotifications.value.splice(wqkIndex, 1)
    }
  }

  const wqkClearNotifications = () => {
    wqkNotifications.value = []
  }

  const wqkShowSuccessNotification = (wqkTitle: string, wqkMessage: string, wqkDuration?: number) => {
    return wqkAddNotification({
      wqkType: 'success',
      wqkTitle,
      wqkMessage,
      wqkDuration
    })
  }

  const wqkShowErrorNotification = (wqkTitle: string, wqkMessage: string, wqkDuration?: number) => {
    return wqkAddNotification({
      wqkType: 'error',
      wqkTitle,
      wqkMessage,
      wqkDuration
    })
  }

  const wqkShowWarningNotification = (wqkTitle: string, wqkMessage: string, wqkDuration?: number) => {
    return wqkAddNotification({
      wqkType: 'warning',
      wqkTitle,
      wqkMessage,
      wqkDuration
    })
  }

  const wqkShowInfoNotification = (wqkTitle: string, wqkMessage: string, wqkDuration?: number) => {
    return wqkAddNotification({
      wqkType: 'info',
      wqkTitle,
      wqkMessage,
      wqkDuration
    })
  }

  const wqkUpdateViewportSize = () => {
    wqkViewportWidth.value = window.innerWidth
    wqkViewportHeight.value = window.innerHeight
    wqkDetectDeviceType()
  }

  const wqkUpdateOnlineStatus = () => {
    wqkOnlineStatus.value = navigator.onLine
  }

  // 初始化
  const wqkInitialize = () => {
    wqkApplyTheme()
    wqkDetectDeviceType()
    
    // 监听主题变化
    const wqkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    wqkMediaQuery.addEventListener('change', () => {
      if (wqkTheme.value === 'auto') {
        wqkApplyTheme()
      }
    })

    // 监听窗口大小变化
    window.addEventListener('resize', wqkUpdateViewportSize)

    // 监听网络状态变化
    window.addEventListener('online', wqkUpdateOnlineStatus)
    window.addEventListener('offline', wqkUpdateOnlineStatus)
  }

  return {
    // 状态
    wqkTheme,
    wqkLanguage,
    wqkDeviceType,
    wqkIsLoading,
    wqkSidebarCollapsed,
    wqkNotifications,
    wqkOnlineStatus,
    wqkViewportWidth,
    wqkViewportHeight,
    // 计算属性
    wqkCurrentTheme,
    wqkIsMobile,
    wqkIsTablet,
    wqkIsDesktop,
    wqkIsSmallScreen,
    wqkIsMediumScreen,
    wqkIsLargeScreen,
    // 方法
    wqkSetTheme,
    wqkToggleTheme,
    wqkApplyTheme,
    wqkSetLanguage,
    wqkDetectDeviceType,
    wqkSetLoading,
    wqkShowLoading,
    wqkHideLoading,
    wqkToggleSidebar,
    wqkCollapseSidebar,
    wqkExpandSidebar,
    wqkAddNotification,
    wqkRemoveNotification,
    wqkClearNotifications,
    wqkShowSuccessNotification,
    wqkShowErrorNotification,
    wqkShowWarningNotification,
    wqkShowInfoNotification,
    wqkUpdateViewportSize,
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
