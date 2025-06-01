<template>
  <div class="wqk-theme-toggle">
    <!-- 主题切换按钮 -->
    <button 
      @click="wqkToggleTheme" 
      class="wqk-theme-btn"
      :class="{ 'wqk-dark': appStore.wqkIsDarkMode }"
      :title="appStore.wqkIsDarkMode ? '切换到浅色模式' : '切换到深色模式'"
    >
      <div class="wqk-theme-icon">
        <svg 
          v-if="!appStore.wqkIsDarkMode" 
          class="wqk-moon-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <svg 
          v-else 
          class="wqk-sun-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </div>
      <span class="wqk-theme-text">
        {{ appStore.wqkIsDarkMode ? '浅色' : '深色' }}
      </span>
    </button>

    <!-- 主题状态指示器 -->
    <div class="wqk-theme-indicator" v-if="wqkShowIndicator">
      <div class="wqk-indicator-dot" :class="{ 'wqk-dark': appStore.wqkIsDarkMode }"></div>
      <span class="wqk-indicator-text">
        当前: {{ appStore.wqkTheme === 'dark' ? '深色模式' : '浅色模式' }}
      </span>
    </div>

    <!-- 主题切换动画效果 -->
    <transition name="wqk-theme-transition">
      <div v-if="wqkIsTransitioning" class="wqk-theme-overlay">
        <div class="wqk-transition-content">
          <div class="wqk-transition-icon">
            <svg class="wqk-loading-icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
          <p>正在切换主题...</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useStores } from '@/stores'

// 定义组件属性
interface WqkThemeToggleProps {
  wqkShowIndicator?: boolean
  wqkShowTransition?: boolean
  wqkSize?: 'small' | 'medium' | 'large'
  wqkVariant?: 'default' | 'minimal' | 'floating'
}

const props = withDefaults(defineProps<WqkThemeToggleProps>(), {
  wqkShowIndicator: false,
  wqkShowTransition: true,
  wqkSize: 'medium',
  wqkVariant: 'default'
})

// 定义组件事件
interface WqkThemeToggleEmits {
  wqkThemeChanged: [theme: string]
  wqkToggleStart: []
  wqkToggleEnd: []
}

const emit = defineEmits<WqkThemeToggleEmits>()

// 获取应用状态管理
const { appStore } = useStores()

// 组件状态
const wqkIsTransitioning = ref(false)

// 主题切换处理
const wqkToggleTheme = async () => {
  if (wqkIsTransitioning.value) return
  
  emit('wqkToggleStart')
  
  if (props.wqkShowTransition) {
    wqkIsTransitioning.value = true
    
    // 模拟切换动画延迟
    await new Promise(resolve => setTimeout(resolve, 300))
  }
  
  // 执行主题切换
  appStore.wqkToggleTheme()
  
  // 发送主题变更事件
  emit('wqkThemeChanged', appStore.wqkTheme)
  
  if (props.wqkShowTransition) {
    // 等待切换完成
    await new Promise(resolve => setTimeout(resolve, 200))
    wqkIsTransitioning.value = false
  }
  
  emit('wqkToggleEnd')
}

// 监听主题变化，应用到document
watch(
  () => appStore.wqkTheme,
  (newTheme) => {
    // 更新document的class
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
    
    // 更新CSS变量
    const root = document.documentElement
    if (newTheme === 'dark') {
      root.style.setProperty('--wqk-bg-primary', '#000000')
      root.style.setProperty('--wqk-bg-secondary', '#1c1c1e')
      root.style.setProperty('--wqk-text-primary', '#ffffff')
      root.style.setProperty('--wqk-text-secondary', '#8e8e93')
      root.style.setProperty('--wqk-border-color', '#38383a')
      root.style.setProperty('--wqk-accent-color', '#0a84ff')
    } else {
      root.style.setProperty('--wqk-bg-primary', '#ffffff')
      root.style.setProperty('--wqk-bg-secondary', '#f2f2f7')
      root.style.setProperty('--wqk-text-primary', '#000000')
      root.style.setProperty('--wqk-text-secondary', '#8e8e93')
      root.style.setProperty('--wqk-border-color', '#d1d1d6')
      root.style.setProperty('--wqk-accent-color', '#007aff')
    }
  },
  { immediate: true }
)

// 组件挂载时初始化主题
onMounted(() => {
  // 确保主题状态正确应用
  const currentTheme = appStore.wqkTheme
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.add('light')
  }
})
</script>

<style scoped>
.wqk-theme-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.wqk-theme-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--wqk-border-color, #d1d1d6);
  border-radius: 1rem;
  background: var(--wqk-bg-secondary, #f2f2f7);
  color: var(--wqk-text-primary, #000000);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 5rem;
  justify-content: center;
}

.wqk-theme-btn:hover {
  background: var(--wqk-accent-color, #007aff);
  color: white;
  border-color: var(--wqk-accent-color, #007aff);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
}

.wqk-theme-btn.wqk-dark {
  background: var(--wqk-bg-secondary, #1c1c1e);
  border-color: var(--wqk-border-color, #38383a);
  color: var(--wqk-text-primary, #ffffff);
}

.wqk-theme-btn.wqk-dark:hover {
  background: var(--wqk-accent-color, #0a84ff);
  border-color: var(--wqk-accent-color, #0a84ff);
  box-shadow: 0 4px 12px rgba(10, 132, 255, 0.3);
}

.wqk-theme-icon {
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wqk-moon-icon,
.wqk-sun-icon {
  width: 100%;
  height: 100%;
  stroke-width: 2;
  transition: transform 0.3s ease;
}

.wqk-theme-btn:hover .wqk-moon-icon,
.wqk-theme-btn:hover .wqk-sun-icon {
  transform: rotate(15deg) scale(1.1);
}

.wqk-theme-text {
  font-size: 0.875rem;
  font-weight: 500;
}

.wqk-theme-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: var(--wqk-bg-secondary, #f2f2f7);
  border: 1px solid var(--wqk-border-color, #d1d1d6);
  border-radius: 0.75rem;
  font-size: 0.75rem;
  color: var(--wqk-text-secondary, #8e8e93);
}

.wqk-indicator-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #34c759;
  transition: background-color 0.3s ease;
}

.wqk-indicator-dot.wqk-dark {
  background: #ff9f0a;
}

.wqk-indicator-text {
  font-weight: 500;
}

.wqk-theme-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.wqk-transition-content {
  background: var(--wqk-bg-primary, #ffffff);
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--wqk-border-color, #d1d1d6);
}

.wqk-transition-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1rem;
  color: var(--wqk-accent-color, #007aff);
}

.wqk-loading-icon {
  width: 100%;
  height: 100%;
}

.wqk-transition-content p {
  margin: 0;
  color: var(--wqk-text-primary, #000000);
  font-size: 0.875rem;
  font-weight: 500;
}

/* 主题切换动画 */
.wqk-theme-transition-enter-active,
.wqk-theme-transition-leave-active {
  transition: all 0.3s ease;
}

.wqk-theme-transition-enter-from,
.wqk-theme-transition-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* 尺寸变体 */
.wqk-theme-toggle[data-size="small"] .wqk-theme-btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  min-width: 4rem;
}

.wqk-theme-toggle[data-size="small"] .wqk-theme-icon {
  width: 1rem;
  height: 1rem;
}

.wqk-theme-toggle[data-size="large"] .wqk-theme-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  min-width: 6rem;
}

.wqk-theme-toggle[data-size="large"] .wqk-theme-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* 样式变体 */
.wqk-theme-toggle[data-variant="minimal"] .wqk-theme-btn {
  border: none;
  background: transparent;
  padding: 0.5rem;
  min-width: auto;
}

.wqk-theme-toggle[data-variant="minimal"] .wqk-theme-text {
  display: none;
}

.wqk-theme-toggle[data-variant="floating"] .wqk-theme-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  padding: 0;
  min-width: auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.wqk-theme-toggle[data-variant="floating"] .wqk-theme-text {
  display: none;
}

.wqk-theme-toggle[data-variant="floating"] .wqk-theme-btn:hover {
  transform: translateY(-2px) scale(1.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .wqk-theme-toggle {
    gap: 0.5rem;
  }
  
  .wqk-theme-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    min-width: 4rem;
  }
  
  .wqk-theme-icon {
    width: 1rem;
    height: 1rem;
  }
  
  .wqk-theme-indicator {
    font-size: 0.625rem;
    padding: 0.25rem 0.5rem;
  }
}

/* 深色模式全局样式 */
:global(.dark) {
  color-scheme: dark;
}

:global(.light) {
  color-scheme: light;
}

/* CSS变量定义 */
:root {
  --wqk-bg-primary: #ffffff;
  --wqk-bg-secondary: #f2f2f7;
  --wqk-text-primary: #000000;
  --wqk-text-secondary: #8e8e93;
  --wqk-border-color: #d1d1d6;
  --wqk-accent-color: #007aff;
}

:root.dark {
  --wqk-bg-primary: #000000;
  --wqk-bg-secondary: #1c1c1e;
  --wqk-text-primary: #ffffff;
  --wqk-text-secondary: #8e8e93;
  --wqk-border-color: #38383a;
  --wqk-accent-color: #0a84ff;
}
</style>