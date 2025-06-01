<template>
  <div class="wqk-store-example">
    <div class="wqk-header">
      <h2>Pinia Store 使用示例</h2>
      <div class="wqk-theme-toggle">
        <button @click="appStore.wqkToggleTheme()" class="wqk-btn">
          {{ appStore.wqkIsDarkMode ? '🌞' : '🌙' }} 
          {{ appStore.wqkIsDarkMode ? '浅色模式' : '深色模式' }}
        </button>
      </div>
    </div>

    <!-- 用户状态示例 -->
    <div class="wqk-section">
      <h3>用户状态管理</h3>
      <div v-if="userStore.wqkIsLoggedIn" class="wqk-user-info">
        <p>欢迎，{{ userStore.wqkUserName }}！</p>
        <button @click="handleLogout" class="wqk-btn wqk-btn-secondary">
          退出登录
        </button>
      </div>
      <div v-else class="wqk-login-form">
        <input 
          v-model="wqkEmail" 
          type="email" 
          placeholder="邮箱"
          class="wqk-input"
        >
        <input 
          v-model="wqkPassword" 
          type="password" 
          placeholder="密码"
          class="wqk-input"
        >
        <button 
          @click="handleLogin" 
          :disabled="userStore.wqkLoading"
          class="wqk-btn wqk-btn-primary"
        >
          {{ userStore.wqkLoading ? '登录中...' : '登录' }}
        </button>
      </div>
    </div>

    <!-- 购物车状态示例 -->
    <div class="wqk-section">
      <h3>购物车状态管理</h3>
      <div class="wqk-cart-info">
        <p>购物车商品数量: <strong>{{ cartStore.wqkCartCount }}</strong></p>
        <p>购物车总价: <strong>{{ cartStore.wqkCartTotalFormatted }}</strong></p>
        
        <div class="wqk-cart-actions">
          <button @click="addSampleProduct" class="wqk-btn wqk-btn-primary">
            添加示例商品
          </button>
          <button 
            @click="cartStore.wqkClearCart" 
            :disabled="cartStore.wqkIsCartEmpty"
            class="wqk-btn wqk-btn-secondary"
          >
            清空购物车
          </button>
        </div>
        
        <div v-if="!cartStore.wqkIsCartEmpty" class="wqk-cart-items">
          <h4>购物车商品:</h4>
          <div 
            v-for="item in cartStore.wqkCartItems" 
            :key="`${item.id}-${item.color}`"
            class="wqk-cart-item"
          >
            <span>{{ item.name }}</span>
            <span v-if="item.color">({{ item.color }})</span>
            <span>x{{ item.quantity }}</span>
            <span>RMB {{ item.price * item.quantity }}</span>
            <button 
              @click="cartStore.wqkRemoveFromCart(item.id, item.color)"
              class="wqk-btn-remove"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 应用状态示例 -->
    <div class="wqk-section">
      <h3>应用状态管理</h3>
      <div class="wqk-app-info">
        <p>当前主题: <strong>{{ appStore.wqkTheme }}</strong></p>
        <p>设备类型: <strong>{{ appStore.wqkDeviceType }}</strong></p>
        <p>网络状态: <strong>{{ appStore.wqkOnlineStatus ? '在线' : '离线' }}</strong></p>
        <p>视口尺寸: <strong>{{ appStore.wqkViewportWidth }} x {{ appStore.wqkViewportHeight }}</strong></p>
        
        <div class="wqk-notification-actions">
          <button @click="showSuccessNotification" class="wqk-btn wqk-btn-success">
            显示成功通知
          </button>
          <button @click="showErrorNotification" class="wqk-btn wqk-btn-error">
            显示错误通知
          </button>
          <button @click="appStore.wqkClearAllNotifications" class="wqk-btn wqk-btn-secondary">
            清除所有通知
          </button>
        </div>
      </div>
    </div>

    <!-- 通知显示区域 -->
    <div v-if="appStore.wqkNotifications.length > 0" class="wqk-notifications">
      <h3>通知消息 ({{ appStore.wqkUnreadNotificationsCount }})</h3>
      <div 
        v-for="notification in appStore.wqkNotifications" 
        :key="notification.id"
        :class="['wqk-notification', `wqk-notification-${notification.type}`]"
      >
        <div class="wqk-notification-content">
          <h4>{{ notification.title }}</h4>
          <p>{{ notification.message }}</p>
          <small>{{ formatTime(notification.timestamp) }}</small>
        </div>
        <button 
          @click="appStore.wqkRemoveNotification(notification.id)"
          class="wqk-notification-close"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWqkUserStore } from '@/stores/wqkUserStore'
import { useWqkCartStore } from '@/stores/wqkCartStore'
import { useWqkAppStore } from '@/stores/wqkAppStore'

// 使用stores
const userStore = useWqkUserStore()
const cartStore = useWqkCartStore()
const appStore = useWqkAppStore()

// 表单数据
const wqkEmail = ref('')
const wqkPassword = ref('')

// 登录处理
const handleLogin = async () => {
  if (!wqkEmail.value || !wqkPassword.value) {
    appStore.wqkAddNotification({
      type: 'warning',
      title: '登录失败',
      message: '请填写邮箱和密码'
    })
    return
  }
  
  try {
    await userStore.wqkLogin({
      email: wqkEmail.value,
      password: wqkPassword.value
    })
    
    appStore.wqkAddNotification({
      type: 'success',
      title: '登录成功',
      message: `欢迎回来，${userStore.wqkUserName}！`
    })
    
    // 清空表单
    wqkEmail.value = ''
    wqkPassword.value = ''
  } catch (error) {
    appStore.wqkAddNotification({
      type: 'error',
      title: '登录失败',
      message: error.message || '登录过程中发生错误'
    })
  }
}

// 登出处理
const handleLogout = () => {
  userStore.wqkLogout()
  appStore.wqkAddNotification({
    type: 'info',
    title: '已退出登录',
    message: '您已成功退出登录'
  })
}

// 添加示例商品
const addSampleProduct = () => {
  const sampleProducts = [
    { id: 'iphone-15', name: 'iPhone 15', price: 5999, color: '粉色' },
    { id: 'ipad-air', name: 'iPad Air', price: 4599, color: '深空灰色' },
    { id: 'macbook-pro', name: 'MacBook Pro', price: 14999, color: '银色' },
    { id: 'airpods-pro', name: 'AirPods Pro', price: 1899, color: '白色' }
  ]
  
  const randomProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)]
  cartStore.wqkAddToCart(randomProduct)
  
  appStore.wqkAddNotification({
    type: 'success',
    title: '商品已添加',
    message: `${randomProduct.name} (${randomProduct.color}) 已添加到购物车`
  })
}

// 显示成功通知
const showSuccessNotification = () => {
  appStore.wqkAddNotification({
    type: 'success',
    title: '操作成功',
    message: '这是一个成功通知示例'
  })
}

// 显示错误通知
const showErrorNotification = () => {
  appStore.wqkAddNotification({
    type: 'error',
    title: '操作失败',
    message: '这是一个错误通知示例',
    duration: 0 // 不自动消失
  })
}

// 格式化时间
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN')
}
</script>

<style scoped>
.wqk-store-example {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.wqk-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e7;
}

.wqk-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f5f5f7;
  border-radius: 12px;
}

.wqk-section h3 {
  margin-bottom: 1rem;
  color: #1d1d1f;
}

/* 表单样式 */
.wqk-login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
}

.wqk-input {
  padding: 0.75rem 1rem;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.wqk-input:focus {
  outline: none;
  border-color: #007aff;
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
}

/* 按钮样式 */
.wqk-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: #007aff;
  color: white;
}

.wqk-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
}

.wqk-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.wqk-btn-primary {
  background: #007aff;
}

.wqk-btn-secondary {
  background: #8e8e93;
}

.wqk-btn-success {
  background: #34c759;
}

.wqk-btn-error {
  background: #ff3b30;
}

/* 购物车样式 */
.wqk-cart-actions {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.wqk-cart-items {
  margin-top: 1rem;
}

.wqk-cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.wqk-btn-remove {
  padding: 0.25rem 0.5rem;
  background: #ff3b30;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
}

/* 通知样式 */
.wqk-notifications {
  margin-top: 2rem;
}

.wqk-notification {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  border-left: 4px solid;
}

.wqk-notification-success {
  background: #d1f2eb;
  border-left-color: #34c759;
}

.wqk-notification-error {
  background: #fadbd8;
  border-left-color: #ff3b30;
}

.wqk-notification-warning {
  background: #fcf3cf;
  border-left-color: #ff9500;
}

.wqk-notification-info {
  background: #d6eaf8;
  border-left-color: #007aff;
}

.wqk-notification-content h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.wqk-notification-content p {
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
}

.wqk-notification-content small {
  color: #8e8e93;
  font-size: 0.75rem;
}

.wqk-notification-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #8e8e93;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wqk-notification-close:hover {
  color: #1d1d1f;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .wqk-store-example {
    padding: 1rem;
  }
  
  .wqk-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .wqk-cart-actions {
    flex-direction: column;
  }
  
  .wqk-cart-item {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>