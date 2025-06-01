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
        <p>网络状态: <strong>{{ appStore.wqkIsOnline ? '在线' : '离线' }}</strong></p>
        <p>视口尺寸: <strong>{{ appStore.wqkViewportWidth }} x {{ appStore.wqkViewportHeight }}</strong></p>
        
        <div class="wqk-notification-actions">
          <button @click="showSuccessNotification" class="wqk-btn wqk-btn-success">
            显示成功通知
          </button>
          <button @click="showErrorNotification" class="wqk-btn wqk-btn-error">
            显示错误通知
          </button>
        </div>
        
        <div v-if="appStore.wqkNotifications.length > 0" class="wqk-notifications">
          <h4>当前通知:</h4>
          <div 
            v-for="(notification, index) in appStore.wqkNotifications" 
            :key="index"
            class="wqk-notification"
            :class="`wqk-notification-${notification.type}`"
          >
            <div class="wqk-notification-content">
              <span class="wqk-notification-icon">
                {{ notification.type === 'success' ? '✓' : '✗' }}
              </span>
              <span class="wqk-notification-message">{{ notification.message }}</span>
            </div>
            <button 
              @click="appStore.wqkRemoveNotification(index)"
              class="wqk-notification-close"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../stores/wqkUserStore';
import { useCartStore } from '../../stores/wqkCartStore';
import { useAppStore } from '../../stores/wqkAppStore';

// 获取 store 实例
const userStore = useUserStore();
const cartStore = useCartStore();
const appStore = useAppStore();

// 登录表单数据
const wqkEmail = ref('');
const wqkPassword = ref('');

// 登录处理
const handleLogin = async () => {
  if (!wqkEmail.value || !wqkPassword.value) {
    appStore.wqkAddNotification({
      type: 'error',
      message: '请输入邮箱和密码'
    });
    return;
  }
  
  try {
    await userStore.wqkLogin({
      email: wqkEmail.value,
      password: wqkPassword.value
    });
    
    // 登录成功通知
    appStore.wqkAddNotification({
      type: 'success',
      message: '登录成功！'
    });
    
    // 清空表单
    wqkEmail.value = '';
    wqkPassword.value = '';
  } catch (error) {
    appStore.wqkAddNotification({
      type: 'error',
      message: error.message || '登录失败，请重试'
    });
  }
};

// 退出登录处理
const handleLogout = () => {
  userStore.wqkLogout();
  appStore.wqkAddNotification({
    type: 'success',
    message: '已退出登录'
  });
};

// 添加示例商品到购物车
const addSampleProduct = () => {
  const products = [
    { id: 'iphone-16-pro', name: 'iPhone 16 Pro', price: 8999, color: '钛金色' },
    { id: 'iphone-16', name: 'iPhone 16', price: 6999, color: '蓝色' },
    { id: 'airpods-pro', name: 'AirPods Pro', price: 1999 },
    { id: 'apple-watch', name: 'Apple Watch Series 10', price: 3299, color: '银色' }
  ];
  
  // 随机选择一个商品
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  
  // 添加到购物车
  cartStore.wqkAddToCart({
    ...randomProduct,
    quantity: 1
  });
  
  // 显示通知
  appStore.wqkAddNotification({
    type: 'success',
    message: `已添加 ${randomProduct.name} 到购物车`
  });
};

// 显示成功通知
const showSuccessNotification = () => {
  appStore.wqkAddNotification({
    type: 'success',
    message: '操作成功完成！'
  });
};

// 显示错误通知
const showErrorNotification = () => {
  appStore.wqkAddNotification({
    type: 'error',
    message: '操作失败，请重试！'
  });
};
</script>

<style scoped>
.wqk-store-example {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f7;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

:root.dark .wqk-store-example {
  background-color: #1d1d1f;
  color: #f5f5f7;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.wqk-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #d2d2d7;
}

:root.dark .wqk-header {
  border-bottom-color: #424245;
}

.wqk-header h2 {
  font-size: 1.8519rem; /* 10rem/5.4 */
  font-weight: 600;
  margin: 0;
  color: #1d1d1f;
}

:root.dark .wqk-header h2 {
  color: #f5f5f7;
}

.wqk-section {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

:root.dark .wqk-section {
  background-color: #2d2d2f;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.wqk-section h3 {
  font-size: 1.2963rem; /* 7rem/5.4 */
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #1d1d1f;
}

:root.dark .wqk-section h3 {
  color: #f5f5f7;
}

.wqk-section h4 {
  font-size: 1.1111rem; /* 6rem/5.4 */
  font-weight: 500;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #1d1d1f;
}

:root.dark .wqk-section h4 {
  color: #f5f5f7;
}

/* 登录表单样式 */
.wqk-login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.wqk-input {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #d2d2d7;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #ffffff;
  color: #1d1d1f;
}

:root.dark .wqk-input {
  background-color: #1d1d1f;
  border-color: #424245;
  color: #f5f5f7;
}

.wqk-input:focus {
  outline: none;
  border-color: #0071e3;
  box-shadow: 0 0 0 2px rgba(0, 113, 227, 0.2);
}

.wqk-user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f2f2f7;
  border-radius: 8px;
}

:root.dark .wqk-user-info {
  background-color: #323235;
}

/* 按钮样式 */
.wqk-btn {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.wqk-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.wqk-btn-primary {
  background-color: #0071e3;
  color: #ffffff;
}

.wqk-btn-primary:hover:not(:disabled) {
  background-color: #0077ed;
  transform: translateY(-2px);
}

.wqk-btn-secondary {
  background-color: #f5f5f7;
  color: #1d1d1f;
  border: 1px solid #d2d2d7;
}

:root.dark .wqk-btn-secondary {
  background-color: #323235;
  color: #f5f5f7;
  border-color: #424245;
}

.wqk-btn-secondary:hover:not(:disabled) {
  background-color: #e5e5ea;
  transform: translateY(-2px);
}

:root.dark .wqk-btn-secondary:hover:not(:disabled) {
  background-color: #3a3a3c;
}

.wqk-btn-success {
  background-color: #34c759;
  color: #ffffff;
}

.wqk-btn-success:hover:not(:disabled) {
  background-color: #30d158;
  transform: translateY(-2px);
}

.wqk-btn-error {
  background-color: #ff3b30;
  color: #ffffff;
}

.wqk-btn-error:hover:not(:disabled) {
  background-color: #ff453a;
  transform: translateY(-2px);
}

.wqk-btn-remove {
  background-color: transparent;
  color: #ff3b30;
  border: none;
  font-size: 0.9259rem; /* 5rem/5.4 */
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.wqk-btn-remove:hover {
  background-color: rgba(255, 59, 48, 0.1);
}

:root.dark .wqk-btn-remove {
  color: #ff453a;
}

:root.dark .wqk-btn-remove:hover {
  background-color: rgba(255, 69, 58, 0.2);
}

/* 购物车样式 */
.wqk-cart-actions {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
}

.wqk-cart-items {
  margin-top: 1.5rem;
}

.wqk-cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  background-color: #f2f2f7;
  border-radius: 6px;
}

:root.dark .wqk-cart-item {
  background-color: #323235;
}

/* 通知样式 */
.wqk-notification-actions {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
}

.wqk-notifications {
  margin-top: 1.5rem;
}

.wqk-notification {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.8rem;
  border-radius: 8px;
  animation: wqkSlideIn 0.3s ease;
}

.wqk-notification-success {
  background-color: rgba(52, 199, 89, 0.15);
  border-left: 4px solid #34c759;
}

.wqk-notification-error {
  background-color: rgba(255, 59, 48, 0.15);
  border-left: 4px solid #ff3b30;
}

.wqk-notification-content {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.wqk-notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-weight: bold;
}

.wqk-notification-success .wqk-notification-icon {
  background-color: #34c759;
  color: white;
}

.wqk-notification-error .wqk-notification-icon {
  background-color: #ff3b30;
  color: white;
}

.wqk-notification-close {
  background: transparent;
  border: none;
  font-size: 1.2963rem; /* 7rem/5.4 */
  cursor: pointer;
  color: #86868b;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.wqk-notification-close:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #1d1d1f;
}

:root.dark .wqk-notification-close {
  color: #a1a1a6;
}

:root.dark .wqk-notification-close:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #f5f5f7;
}

/* 动画 */
@keyframes wqkSlideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .wqk-store-example {
    padding: 1.5rem;
  }
  
  .wqk-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .wqk-cart-actions,
  .wqk-notification-actions {
    flex-direction: column;
  }
  
  .wqk-cart-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .wqk-cart-item button {
    align-self: flex-end;
  }
}
</style>