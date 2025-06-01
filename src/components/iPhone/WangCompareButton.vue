<template>
  <div class="wqk-compare-button-container" v-show="wqkShowButton">
    <button class="wqk-compare-btn" @click="wqkHandleCompareClick">
      <span class="wqk-compare-text">比较各款 iPhone 机型</span>
      <div class="wqk-arrow-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 按钮显示状态
const wqkShowButton = ref(false);

// 处理点击事件
const wqkHandleCompareClick = () => {
  // 跳转到比较页面或执行其他操作
  router.push('/iphone/compare');
};

// 滚动监听函数
const wqkHandleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // 当滚动到页面底部附近时显示按钮
  const scrollPercentage = (scrollTop + windowHeight) / documentHeight;
  wqkShowButton.value = scrollPercentage > 0.8;
};

// 组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', wqkHandleScroll);
  // 初始检查
  wqkHandleScroll();
});

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', wqkHandleScroll);
});
</script>

<style scoped>
.wqk-compare-button-container {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  transition: all 0.3s ease;
}

.wqk-compare-btn {
  background-color: #f5f5f7;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.wqk-compare-btn:hover {
  background-color: #e8e8ed;
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
}

.wqk-compare-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: #1d1d1f;
  white-space: nowrap;
}

.wqk-arrow-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #0071e3;
  border-radius: 50%;
  color: #fff;
  transition: transform 0.3s ease;
}

.wqk-compare-btn:hover .wqk-arrow-icon {
  transform: translateX(2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .wqk-compare-button-container {
    bottom: 1.5rem;
  }
  
  .wqk-compare-btn {
    padding: 10px 20px;
  }
  
  .wqk-compare-text {
    font-size: 0.8rem;
  }
  
  .wqk-arrow-icon {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .wqk-compare-button-container {
    bottom: 1rem;
  }
  
  .wqk-compare-btn {
    padding: 8px 16px;
  }
  
  .wqk-compare-text {
    font-size: 0.75rem;
  }
}
</style>