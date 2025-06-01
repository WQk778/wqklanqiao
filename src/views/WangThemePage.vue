<template>
  <div class="wqk-theme-page">
    <div class="wqk-theme-header">
      <h1>深色主题切换演示</h1>
      <WangThemeToggle />
    </div>

    <div class="wqk-theme-content">
      <div class="wqk-theme-section">
        <h2>当前主题状态</h2>
        <div class="wqk-theme-status">
          <div class="wqk-theme-status-item">
            <span class="wqk-theme-status-label">当前主题:</span>
            <span class="wqk-theme-status-value">{{ appStore.wqkTheme }}</span>
          </div>
          <div class="wqk-theme-status-item">
            <span class="wqk-theme-status-label">深色模式:</span>
            <span class="wqk-theme-status-value">{{ appStore.wqkIsDarkMode ? '启用' : '禁用' }}</span>
          </div>
          <div class="wqk-theme-status-item">
            <span class="wqk-theme-status-label">系统偏好:</span>
            <span class="wqk-theme-status-value">{{ appStore.wqkSystemPrefersDark ? '深色' : '浅色' }}</span>
          </div>
          <div class="wqk-theme-status-item">
            <span class="wqk-theme-status-label">存储的主题:</span>
            <span class="wqk-theme-status-value">{{ appStore.wqkStoredTheme || '未设置' }}</span>
          </div>
        </div>
      </div>

      <div class="wqk-theme-section">
        <h2>主题切换方式</h2>
        
        <div class="wqk-theme-demo-item">
          <h3>1. 基础切换器</h3>
          <p>使用 WangThemeToggle 组件，提供简洁的主题切换按钮。</p>
          <div class="wqk-theme-demo-component">
            <WangThemeToggle />
          </div>
        </div>

        <div class="wqk-theme-demo-item">
          <h3>2. 最小化切换器</h3>
          <p>仅显示图标的紧凑版主题切换按钮。</p>
          <div class="wqk-theme-demo-component">
            <WangThemeToggle minimal />
          </div>
        </div>

        <div class="wqk-theme-demo-item">
          <h3>3. 手动切换按钮</h3>
          <p>直接调用 appStore 中的方法切换主题。</p>
          <div class="wqk-theme-demo-component wqk-theme-buttons">
            <button 
              @click="appStore.wqkSetTheme('light')"
              class="wqk-theme-button"
              :class="{ 'wqk-theme-button-active': appStore.wqkTheme === 'light' }"
            >
              🌞 浅色模式
            </button>
            <button 
              @click="appStore.wqkSetTheme('dark')"
              class="wqk-theme-button"
              :class="{ 'wqk-theme-button-active': appStore.wqkTheme === 'dark' }"
            >
              🌙 深色模式
            </button>
            <button 
              @click="appStore.wqkSetTheme('system')"
              class="wqk-theme-button"
              :class="{ 'wqk-theme-button-active': appStore.wqkTheme === 'system' }"
            >
              💻 跟随系统
            </button>
          </div>
        </div>

        <div class="wqk-theme-demo-item">
          <h3>4. 快捷键切换</h3>
          <p>按下 <kbd>Ctrl</kbd> + <kbd>D</kbd> 快速切换深色/浅色模式。</p>
          <div class="wqk-theme-demo-component">
            <div class="wqk-theme-shortcut-info">
              <span>当前状态: 快捷键{{ appStore.wqkShortcutsEnabled ? '已启用' : '已禁用' }}</span>
              <button 
                @click="appStore.wqkToggleShortcuts()"
                class="wqk-theme-button"
              >
                {{ appStore.wqkShortcutsEnabled ? '禁用快捷键' : '启用快捷键' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="wqk-theme-section">
        <h2>主题效果预览</h2>
        <div class="wqk-theme-preview">
          <div class="wqk-theme-preview-card">
            <div class="wqk-theme-preview-header">
              <h3>卡片标题</h3>
              <button class="wqk-theme-preview-button">操作按钮</button>
            </div>
            <div class="wqk-theme-preview-content">
              <p>这是一段示例文本，用于展示在不同主题下的文本显示效果。深色模式下文本颜色会自动调整为更适合的亮度。</p>
              <div class="wqk-theme-preview-form">
                <input type="text" placeholder="输入框示例" class="wqk-theme-preview-input">
                <select class="wqk-theme-preview-select">
                  <option>选项 1</option>
                  <option>选项 2</option>
                  <option>选项 3</option>
                </select>
              </div>
            </div>
            <div class="wqk-theme-preview-footer">
              <button class="wqk-theme-preview-button wqk-theme-preview-button-primary">主要按钮</button>
              <button class="wqk-theme-preview-button wqk-theme-preview-button-secondary">次要按钮</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '../stores/wqkAppStore';
import WangThemeToggle from '../components/ui/WangThemeToggle.vue';

const appStore = useAppStore();
</script>

<style scoped>
.wqk-theme-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.wqk-theme-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #d2d2d7;
}

:root.dark .wqk-theme-header {
  border-bottom-color: #424245;
}

.wqk-theme-header h1 {
  font-size: 2.2222rem; /* 12rem/5.4 */
  font-weight: 600;
  margin: 0;
  color: #1d1d1f;
}

:root.dark .wqk-theme-header h1 {
  color: #f5f5f7;
}

.wqk-theme-content {
  display: grid;
  gap: 2rem;
}

.wqk-theme-section {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

:root.dark .wqk-theme-section {
  background-color: #1d1d1f;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.wqk-theme-section h2 {
  font-size: 1.4815rem; /* 8rem/5.4 */
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #1d1d1f;
}

:root.dark .wqk-theme-section h2 {
  color: #f5f5f7;
}

.wqk-theme-status {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.wqk-theme-status-item {
  background-color: #f5f5f7;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

:root.dark .wqk-theme-status-item {
  background-color: #2d2d2f;
}

.wqk-theme-status-label {
  font-size: 0.9259rem; /* 5rem/5.4 */
  color: #86868b;
}

:root.dark .wqk-theme-status-label {
  color: #a1a1a6;
}

.wqk-theme-status-value {
  font-size: 1.1111rem; /* 6rem/5.4 */
  font-weight: 500;
  color: #1d1d1f;
}

:root.dark .wqk-theme-status-value {
  color: #f5f5f7;
}

.wqk-theme-demo-item {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #d2d2d7;
}

:root.dark .wqk-theme-demo-item {
  border-bottom-color: #424245;
}

.wqk-theme-demo-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.wqk-theme-demo-item h3 {
  font-size: 1.2963rem; /* 7rem/5.4 */
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #1d1d1f;
}

:root.dark .wqk-theme-demo-item h3 {
  color: #f5f5f7;
}

.wqk-theme-demo-item p {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #515154;
  font-size: 1rem;
  line-height: 1.5;
}

:root.dark .wqk-theme-demo-item p {
  color: #a1a1a6;
}

.wqk-theme-demo-component {
  background-color: #f5f5f7;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

:root.dark .wqk-theme-demo-component {
  background-color: #2d2d2f;
}

.wqk-theme-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.wqk-theme-button {
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  border: 1px solid #d2d2d7;
  background-color: #ffffff;
  color: #1d1d1f;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

:root.dark .wqk-theme-button {
  background-color: #2d2d2f;
  border-color: #424245;
  color: #f5f5f7;
}

.wqk-theme-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

:root.dark .wqk-theme-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.wqk-theme-button-active {
  background-color: #0071e3;
  color: #ffffff;
  border-color: #0071e3;
}

:root.dark .wqk-theme-button-active {
  background-color: #0077ed;
  border-color: #0077ed;
}

.wqk-theme-shortcut-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
}

kbd {
  background-color: #f5f5f7;
  border: 1px solid #d2d2d7;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  color: #1d1d1f;
  display: inline-block;
  font-size: 0.9259rem; /* 5rem/5.4 */
  font-weight: 600;
  line-height: 1;
  padding: 0.3rem 0.5rem;
  margin: 0 0.2rem;
  vertical-align: middle;
}

:root.dark kbd {
  background-color: #2d2d2f;
  border-color: #424245;
  color: #f5f5f7;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
}

/* 主题预览卡片 */
.wqk-theme-preview {
  padding: 1rem;
  background-color: #f5f5f7;
  border-radius: 8px;
}

:root.dark .wqk-theme-preview {
  background-color: #2d2d2f;
}

.wqk-theme-preview-card {
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:root.dark .wqk-theme-preview-card {
  background-color: #1d1d1f;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.wqk-theme-preview-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d2d2d7;
}

:root.dark .wqk-theme-preview-header {
  border-bottom-color: #424245;
}

.wqk-theme-preview-header h3 {
  margin: 0;
  font-size: 1.2963rem; /* 7rem/5.4 */
  font-weight: 600;
  color: #1d1d1f;
}

:root.dark .wqk-theme-preview-header h3 {
  color: #f5f5f7;
}

.wqk-theme-preview-content {
  padding: 1.5rem;
}

.wqk-theme-preview-content p {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #515154;
  line-height: 1.6;
}

:root.dark .wqk-theme-preview-content p {
  color: #a1a1a6;
}

.wqk-theme-preview-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.wqk-theme-preview-input,
.wqk-theme-preview-select {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #d2d2d7;
  font-size: 1rem;
  flex: 1;
  background-color: #ffffff;
  color: #1d1d1f;
}

:root.dark .wqk-theme-preview-input,
:root.dark .wqk-theme-preview-select {
  background-color: #2d2d2f;
  border-color: #424245;
  color: #f5f5f7;
}

.wqk-theme-preview-input:focus,
.wqk-theme-preview-select:focus {
  outline: none;
  border-color: #0071e3;
  box-shadow: 0 0 0 2px rgba(0, 113, 227, 0.2);
}

.wqk-theme-preview-footer {
  padding: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 1px solid #d2d2d7;
}

:root.dark .wqk-theme-preview-footer {
  border-top-color: #424245;
}

.wqk-theme-preview-button {
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  border: 1px solid #d2d2d7;
  background-color: #ffffff;
  color: #1d1d1f;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

:root.dark .wqk-theme-preview-button {
  background-color: #2d2d2f;
  border-color: #424245;
  color: #f5f5f7;
}

.wqk-theme-preview-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

:root.dark .wqk-theme-preview-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.wqk-theme-preview-button-primary {
  background-color: #0071e3;
  color: #ffffff;
  border-color: #0071e3;
}

.wqk-theme-preview-button-primary:hover {
  background-color: #0077ed;
}

.wqk-theme-preview-button-secondary {
  background-color: #f5f5f7;
  color: #1d1d1f;
}

:root.dark .wqk-theme-preview-button-secondary {
  background-color: #424245;
  color: #f5f5f7;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .wqk-theme-page {
    padding: 1rem;
  }
  
  .wqk-theme-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .wqk-theme-status {
    grid-template-columns: 1fr;
  }
  
  .wqk-theme-buttons {
    flex-direction: column;
  }
  
  .wqk-theme-preview-form {
    flex-direction: column;
  }
}
</style>