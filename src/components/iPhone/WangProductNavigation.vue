<template>
  <div class="wqk-product-navigation">
    <div class="wqk-nav-container">
      <div 
        v-for="(product, index) in wqkProducts" 
        :key="index" 
        class="wqk-nav-item"
        @click="wqkHandleProductClick(product)"
      >
        <div class="wqk-nav-icon">
          <img :src="wqkGetImg(product.image)" :alt="product.name" />
        </div>
        <span class="wqk-nav-label">{{ product.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 图片处理函数
const wqkGetImg = (imgName) => {
  return new URL(`../../assets/image/${imgName}`, import.meta.url).href;
};

// 产品数据
const wqkProducts = ref([
  { name: 'iPhone 16 Pro', image: 'iphone-16-pro.svg' },
  { name: 'iPhone 16', image: 'iphone-16.svg' },
  { name: 'iPhone 16e', image: 'iphone_16e.svg' },
  { name: 'iPhone 15', image: 'iphone_15.svg' },
  { name: '机型比较', image: 'iphone_compare.svg' },
  { name: 'AirPods', image: 'airpods_light.svg' },
  { name: 'AirTag', image: 'airtag_light.svg' },
  { name: '配件', image: 'accessories_light.svg' },
  { name: 'iOS 18', image: 'iphone_ios_light.svg' },
  { name: '选购iPhone', image: 'shop_iphone_light.svg' }
]);

// 产品点击处理
const wqkHandleProductClick = (product) => {
  console.log('点击产品:', product.name);
  // 这里可以添加路由跳转或其他逻辑
};
</script>

<style scoped>
.wqk-product-navigation {
  width: 100%;
  background-color: #f5f5f7;
  padding: 1rem 0;
  border-bottom: 1px solid #d2d2d7;
}

.wqk-nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.wqk-nav-container::-webkit-scrollbar {
  display: none;
}

.wqk-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
  padding: 0.5rem;
  border-radius: 8px;
}

.wqk-nav-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

.wqk-nav-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wqk-nav-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.wqk-nav-label {
  font-size: 0.8148rem; /* 14px / 5.4 */
  color: #1d1d1f;
  text-align: center;
  white-space: nowrap;
}

/* 深色模式适配 */
:root.dark .wqk-product-navigation {
  background-color: #1d1d1f;
  border-bottom: 1px solid #424245;
}

:root.dark .wqk-nav-label {
  color: #f5f5f7;
}

:root.dark .wqk-nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .wqk-nav-container {
    gap: 1rem;
    justify-content: flex-start;
  }
  
  .wqk-nav-item {
    min-width: 70px;
  }
  
  .wqk-nav-icon {
    width: 40px;
    height: 40px;
  }
  
  .wqk-nav-label {
    font-size: 0.7407rem; /* 12px / 5.4 */
  }
}

@media (max-width: 480px) {
  .wqk-nav-container {
    gap: 0.5rem;
  }
  
  .wqk-nav-item {
    min-width: 60px;
    padding: 0.3rem;
  }
  
  .wqk-nav-icon {
    width: 32px;
    height: 32px;
  }
}
</style>