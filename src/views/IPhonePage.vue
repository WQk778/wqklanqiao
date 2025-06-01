<template>
  <div class="wqk-iphone-page">
    <!-- Hero Section -->
    <section class="wqk-hero">
      <div class="wqk-hero-content">
        <h1 class="wqk-hero-title">iPhone</h1>
        <p class="wqk-hero-subtitle">强大，美丽，持久。</p>
        <div class="wqk-hero-actions">
          <button class="wqk-btn wqk-btn-primary" @click="wqkScrollToProducts">
            选购 iPhone
          </button>
          <router-link to="/iphone/compare" class="wqk-btn wqk-btn-secondary">
            比较机型
          </router-link>
        </div>
      </div>
      <div class="wqk-hero-image">
        <img src="@/assets/image/iphone-hero.jpg" alt="iPhone" class="wqk-hero-img">
      </div>
    </section>

    <!-- iPhone Models -->
    <section class="wqk-models" ref="wqkProductsSection">
      <div class="wqk-container">
        <h2 class="wqk-section-title">选择你的 iPhone</h2>
        <div class="wqk-models-grid">
          <div 
            v-for="wqkModel in wqkIPhoneModels" 
            :key="wqkModel.wqkId"
            class="wqk-model-card"
            @click="wqkGoToDetail(wqkModel.wqkId)"
          >
            <div class="wqk-model-image">
              <img :src="wqkModel.wqkImage" :alt="wqkModel.wqkName" class="wqk-model-img">
            </div>
            <div class="wqk-model-info">
              <h3 class="wqk-model-name">{{ wqkModel.wqkName }}</h3>
              <p class="wqk-model-price">¥{{ wqkModel.wqkPrice.toLocaleString() }} 起</p>
              <div class="wqk-model-features">
                <div 
                  v-for="wqkFeature in wqkModel.wqkFeatures" 
                  :key="wqkFeature"
                  class="wqk-feature"
                >
                  {{ wqkFeature }}
                </div>
              </div>
              <div class="wqk-model-colors">
                <div class="wqk-colors-label">可选颜色：</div>
                <div class="wqk-colors">
                  <div 
                    v-for="wqkColor in wqkModel.wqkColors" 
                    :key="wqkColor.wqkName"
                    class="wqk-color"
                    :style="{ backgroundColor: wqkColor.wqkValue }"
                    :title="wqkColor.wqkName"
                  ></div>
                </div>
              </div>
              <button class="wqk-btn wqk-btn-outline">
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="wqk-features">
      <div class="wqk-container">
        <h2 class="wqk-section-title">iPhone 的强大功能</h2>
        <div class="wqk-features-grid">
          <div 
            v-for="wqkFeature in wqkIPhoneFeatures" 
            :key="wqkFeature.wqkId"
            class="wqk-feature-card"
          >
            <div class="wqk-feature-icon">
              <i :class="wqkFeature.wqkIcon"></i>
            </div>
            <h3 class="wqk-feature-title">{{ wqkFeature.wqkTitle }}</h3>
            <p class="wqk-feature-description">{{ wqkFeature.wqkDescription }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Accessories Section -->
    <section class="wqk-accessories">
      <div class="wqk-container">
        <h2 class="wqk-section-title">iPhone 配件</h2>
        <div class="wqk-accessories-grid">
          <div 
            v-for="wqkAccessory in wqkIPhoneAccessories" 
            :key="wqkAccessory.wqkId"
            class="wqk-accessory-card"
          >
            <div class="wqk-accessory-image">
              <img :src="wqkAccessory.wqkImage" :alt="wqkAccessory.wqkName" class="wqk-accessory-img">
            </div>
            <div class="wqk-accessory-info">
              <h3 class="wqk-accessory-name">{{ wqkAccessory.wqkName }}</h3>
              <p class="wqk-accessory-price">¥{{ wqkAccessory.wqkPrice.toLocaleString() }}</p>
              <button class="wqk-btn wqk-btn-small">
                选购
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface WqkColor {
  wqkName: string
  wqkValue: string
}

interface WqkIPhoneModel {
  wqkId: number
  wqkName: string
  wqkPrice: number
  wqkImage: string
  wqkFeatures: string[]
  wqkColors: WqkColor[]
}

interface WqkFeature {
  wqkId: number
  wqkTitle: string
  wqkDescription: string
  wqkIcon: string
}

interface WqkAccessory {
  wqkId: number
  wqkName: string
  wqkPrice: number
  wqkImage: string
}

const wqkRouter = useRouter()
const wqkProductsSection = ref<HTMLElement>()

// iPhone 机型数据
const wqkIPhoneModels = ref<WqkIPhoneModel[]>([
  {
    wqkId: 1,
    wqkName: 'iPhone 15 Pro Max',
    wqkPrice: 9999,
    wqkImage: '@/assets/image/iphone-15-pro-max.jpg',
    wqkFeatures: ['6.7 英寸显示屏', 'A17 Pro 芯片', '钛金属设计', '专业级摄像头系统'],
    wqkColors: [
      { wqkName: '原色钛金属', wqkValue: '#8E8E93' },
      { wqkName: '蓝色钛金属', wqkValue: '#1D1D1F' },
      { wqkName: '白色钛金属', wqkValue: '#F5F5DC' },
      { wqkName: '黑色钛金属', wqkValue: '#1C1C1E' }
    ]
  },
  {
    wqkId: 2,
    wqkName: 'iPhone 15 Pro',
    wqkPrice: 7999,
    wqkImage: '@/assets/image/iphone-15-pro.jpg',
    wqkFeatures: ['6.1 英寸显示屏', 'A17 Pro 芯片', '钛金属设计', '专业级摄像头系统'],
    wqkColors: [
      { wqkName: '原色钛金属', wqkValue: '#8E8E93' },
      { wqkName: '蓝色钛金属', wqkValue: '#1D1D1F' },
      { wqkName: '白色钛金属', wqkValue: '#F5F5DC' },
      { wqkName: '黑色钛金属', wqkValue: '#1C1C1E' }
    ]
  },
  {
    wqkId: 3,
    wqkName: 'iPhone 15',
    wqkPrice: 5999,
    wqkImage: '@/assets/image/iphone-15.jpg',
    wqkFeatures: ['6.1 英寸显示屏', 'A16 仿生芯片', '动态岛', '双摄像头系统'],
    wqkColors: [
      { wqkName: '粉色', wqkValue: '#F7C6C7' },
      { wqkName: '黄色', wqkValue: '#F9E71E' },
      { wqkName: '绿色', wqkValue: '#A7F3D0' },
      { wqkName: '蓝色', wqkValue: '#93C5FD' },
      { wqkName: '黑色', wqkValue: '#1C1C1E' }
    ]
  },
  {
    wqkId: 4,
    wqkName: 'iPhone 15 Plus',
    wqkPrice: 6999,
    wqkImage: '@/assets/image/iphone-15-plus.jpg',
    wqkFeatures: ['6.7 英寸显示屏', 'A16 仿生芯片', '动态岛', '双摄像头系统'],
    wqkColors: [
      { wqkName: '粉色', wqkValue: '#F7C6C7' },
      { wqkName: '黄色', wqkValue: '#F9E71E' },
      { wqkName: '绿色', wqkValue: '#A7F3D0' },
      { wqkName: '蓝色', wqkValue: '#93C5FD' },
      { wqkName: '黑色', wqkValue: '#1C1C1E' }
    ]
  }
])

// iPhone 功能特性
const wqkIPhoneFeatures = ref<WqkFeature[]>([
  {
    wqkId: 1,
    wqkTitle: 'A17 Pro 芯片',
    wqkDescription: '业界领先的性能，让一切都快如闪电。',
    wqkIcon: 'fas fa-microchip'
  },
  {
    wqkId: 2,
    wqkTitle: '专业级摄像头',
    wqkDescription: '拍摄令人惊叹的照片和视频，记录美好时刻。',
    wqkIcon: 'fas fa-camera'
  },
  {
    wqkId: 3,
    wqkTitle: '全天候电池续航',
    wqkDescription: '强劲的电池续航，让你整天保持连接。',
    wqkIcon: 'fas fa-battery-full'
  },
  {
    wqkId: 4,
    wqkTitle: '5G 连接',
    wqkDescription: '超快的 5G 速度，让你随时随地保持高速连接。',
    wqkIcon: 'fas fa-wifi'
  }
])

// iPhone 配件
const wqkIPhoneAccessories = ref<WqkAccessory[]>([
  {
    wqkId: 1,
    wqkName: 'MagSafe 充电器',
    wqkPrice: 329,
    wqkImage: '@/assets/image/magsafe-charger.jpg'
  },
  {
    wqkId: 2,
    wqkName: 'iPhone 硅胶保护壳',
    wqkPrice: 399,
    wqkImage: '@/assets/image/iphone-case.jpg'
  },
  {
    wqkId: 3,
    wqkName: 'Lightning 转 USB-C 连接线',
    wqkPrice: 199,
    wqkImage: '@/assets/image/lightning-cable.jpg'
  },
  {
    wqkId: 4,
    wqkName: 'AirPods Pro',
    wqkPrice: 1899,
    wqkImage: '@/assets/image/airpods-pro.jpg'
  }
])

// 方法
const wqkScrollToProducts = () => {
  wqkProductsSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const wqkGoToDetail = (wqkModelId: number) => {
  wqkRouter.push({ name: 'IPhoneDetail', params: { id: wqkModelId } })
}

onMounted(() => {
  // 页面加载完成后的初始化操作
})
</script>

<style scoped>
.wqk-iphone-page {
  min-height: 100vh;
}

/* Hero Section */
.wqk-hero {
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
}

.wqk-hero-content {
  flex: 1;
  max-width: 37.037rem;
  margin-right: 3.704rem;
}

.wqk-hero-title {
  font-size: 4.444rem;
  font-weight: 700;
  margin-bottom: 1.481rem;
  line-height: 1.1;
}

.wqk-hero-subtitle {
  font-size: 1.852rem;
  margin-bottom: 2.963rem;
  opacity: 0.9;
  line-height: 1.4;
}

.wqk-hero-actions {
  display: flex;
  gap: 1.481rem;
  flex-wrap: wrap;
}

.wqk-btn {
  padding: 0.926rem 2.222rem;
  border-radius: 1.481rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.111rem;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
  border: none;
  cursor: pointer;
}

.wqk-btn-primary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(0.556rem);
  border: 0.074rem solid rgba(255, 255, 255, 0.3);
}

.wqk-btn-primary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-0.185rem);
}

.wqk-btn-secondary {
  background: transparent;
  color: white;
  border: 0.148rem solid white;
}

.wqk-btn-secondary:hover {
  background: white;
  color: #1e3c72;
  transform: translateY(-0.185rem);
}

.wqk-btn-outline {
  background: transparent;
  color: #1e3c72;
  border: 0.148rem solid #1e3c72;
  padding: 0.741rem 1.852rem;
  font-size: 1rem;
}

.wqk-btn-outline:hover {
  background: #1e3c72;
  color: white;
}

.wqk-btn-small {
  padding: 0.556rem 1.481rem;
  font-size: 0.926rem;
  background: #1e3c72;
  color: white;
  border: none;
}

.wqk-btn-small:hover {
  background: #2a5298;
  transform: translateY(-0.185rem);
}

.wqk-hero-image {
  flex: 1;
  text-align: center;
}

.wqk-hero-img {
  max-width: 100%;
  height: auto;
  border-radius: 1.481rem;
  box-shadow: 0 1.481rem 3.704rem rgba(0, 0, 0, 0.2);
}

/* Container */
.wqk-container {
  max-width: 74.074rem;
  margin: 0 auto;
  padding: 0 1.481rem;
}

/* Section Styles */
.wqk-models,
.wqk-features,
.wqk-accessories {
  padding: 5.556rem 0;
  background: white;
}

.wqk-section-title {
  font-size: 2.963rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3.704rem;
  color: #333;
}

/* Models Grid */
.wqk-models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18.519rem, 1fr));
  gap: 2.222rem;
}

.wqk-model-card {
  background: white;
  border-radius: 1.481rem;
  overflow: hidden;
  box-shadow: 0 0.741rem 1.852rem rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.wqk-model-card:hover {
  transform: translateY(-0.370rem);
  box-shadow: 0 1.481rem 2.963rem rgba(0, 0, 0, 0.15);
}

.wqk-model-image {
  height: 16.667rem;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wqk-model-img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.wqk-model-card:hover .wqk-model-img {
  transform: scale(1.05);
}

.wqk-model-info {
  padding: 1.481rem;
}

.wqk-model-name {
  font-size: 1.481rem;
  font-weight: 600;
  margin-bottom: 0.741rem;
  color: #333;
}

.wqk-model-price {
  font-size: 1.296rem;
  font-weight: 700;
  color: #1e3c72;
  margin-bottom: 1.111rem;
}

.wqk-model-features {
  margin-bottom: 1.481rem;
}

.wqk-feature {
  font-size: 0.926rem;
  color: #666;
  margin-bottom: 0.370rem;
  padding-left: 1.111rem;
  position: relative;
}

.wqk-feature::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #1e3c72;
  font-weight: bold;
}

.wqk-model-colors {
  margin-bottom: 1.481rem;
}

.wqk-colors-label {
  font-size: 0.926rem;
  color: #666;
  margin-bottom: 0.556rem;
}

.wqk-colors {
  display: flex;
  gap: 0.556rem;
}

.wqk-color {
  width: 1.481rem;
  height: 1.481rem;
  border-radius: 50%;
  border: 0.148rem solid #e0e0e0;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.wqk-color:hover {
  transform: scale(1.1);
}

/* Features Grid */
.wqk-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16.667rem, 1fr));
  gap: 2.222rem;
}

.wqk-feature-card {
  text-align: center;
  padding: 2.222rem 1.481rem;
  background: #f8f9fa;
  border-radius: 1.481rem;
  transition: all 0.3s ease;
}

.wqk-feature-card:hover {
  transform: translateY(-0.370rem);
  box-shadow: 0 1.481rem 2.963rem rgba(0, 0, 0, 0.1);
}

.wqk-feature-icon {
  font-size: 2.963rem;
  color: #1e3c72;
  margin-bottom: 1.481rem;
}

.wqk-feature-title {
  font-size: 1.296rem;
  font-weight: 600;
  margin-bottom: 0.741rem;
  color: #333;
}

.wqk-feature-description {
  font-size: 0.926rem;
  color: #666;
  line-height: 1.5;
}

/* Accessories Grid */
.wqk-accessories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14.815rem, 1fr));
  gap: 1.852rem;
}

.wqk-accessory-card {
  background: white;
  border-radius: 1.481rem;
  overflow: hidden;
  box-shadow: 0 0.741rem 1.852rem rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.wqk-accessory-card:hover {
  transform: translateY(-0.370rem);
  box-shadow: 0 1.481rem 2.963rem rgba(0, 0, 0, 0.15);
}

.wqk-accessory-image {
  height: 11.111rem;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wqk-accessory-img {
  max-width: 70%;
  max-height: 70%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.wqk-accessory-card:hover .wqk-accessory-img {
  transform: scale(1.05);
}

.wqk-accessory-info {
  padding: 1.111rem;
  text-align: center;
}

.wqk-accessory-name {
  font-size: 1.111rem;
  font-weight: 600;
  margin-bottom: 0.556rem;
  color: #333;
}

.wqk-accessory-price {
  font-size: 1.111rem;
  font-weight: 700;
  color: #1e3c72;
  margin-bottom: 0.926rem;
}

/* Responsive Design */
@media (max-width: 48rem) {
  .wqk-hero {
    flex-direction: column;
    text-align: center;
    padding: 1.481rem;
  }

  .wqk-hero-content {
    margin-right: 0;
    margin-bottom: 2.222rem;
  }

  .wqk-hero-title {
    font-size: 3.333rem;
  }

  .wqk-hero-subtitle {
    font-size: 1.481rem;
  }

  .wqk-hero-actions {
    justify-content: center;
  }

  .wqk-section-title {
    font-size: 2.222rem;
  }

  .wqk-models-grid,
  .wqk-features-grid,
  .wqk-accessories-grid {
    grid-template-columns: 1fr;
  }

  .wqk-models,
  .wqk-features,
  .wqk-accessories {
    padding: 3.704rem 0;
  }
}

@media (max-width: 30rem) {
  .wqk-hero-title {
    font-size: 2.963rem;
  }

  .wqk-hero-subtitle {
    font-size: 1.296rem;
  }

  .wqk-btn {
    padding: 0.741rem 1.481rem;
    font-size: 1rem;
  }

  .wqk-section-title {
    font-size: 1.852rem;
  }
}
</style>
