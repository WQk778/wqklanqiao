<template>
  <div class="wqk-home-page">
    <!-- Hero Section -->
    <section class="wqk-hero">
      <div class="wqk-hero-content">
        <h1 class="wqk-hero-title">欢迎来到 Apple Store</h1>
        <p class="wqk-hero-subtitle">探索最新的 iPhone、iPad 和更多精彩产品</p>
        <div class="wqk-hero-actions">
          <router-link to="/iphone" class="wqk-btn wqk-btn-primary">
            探索 iPhone
          </router-link>
          <router-link to="/ipad" class="wqk-btn wqk-btn-secondary">
            探索 iPad
          </router-link>
        </div>
      </div>
      <div class="wqk-hero-image">
        <img src="@/assets/image/iphone-hero.jpg" alt="iPhone" class="wqk-hero-img">
      </div>
    </section>

    <!-- Featured Products -->
    <section class="wqk-featured">
      <div class="wqk-container">
        <h2 class="wqk-section-title">精选产品</h2>
        <div class="wqk-product-grid">
          <div 
            v-for="wqkProduct in wqkFeaturedProducts" 
            :key="wqkProduct.wqkId"
            class="wqk-product-card"
            @click="wqkGoToProduct(wqkProduct.wqkId)"
          >
            <div class="wqk-product-image">
              <img :src="wqkProduct.wqkImage" :alt="wqkProduct.wqkName" class="wqk-product-img">
            </div>
            <div class="wqk-product-info">
              <h3 class="wqk-product-name">{{ wqkProduct.wqkName }}</h3>
              <p class="wqk-product-price">¥{{ wqkProduct.wqkPrice.toLocaleString() }}</p>
              <p class="wqkProduct.wqkDescription">{{ wqkProduct.wqkDescription }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="wqk-categories">
      <div class="wqk-container">
        <h2 class="wqk-section-title">产品分类</h2>
        <div class="wqk-category-grid">
          <div 
            v-for="wqkCategory in wqkCategories" 
            :key="wqkCategory.wqkId"
            class="wqk-category-card"
            @click="wqkGoToCategory(wqkCategory.wqkSlug)"
          >
            <div class="wqk-category-image">
              <img :src="wqkCategory.wqkImage" :alt="wqkCategory.wqkName" class="wqk-category-img">
            </div>
            <div class="wqk-category-info">
              <h3 class="wqk-category-name">{{ wqkCategory.wqkName }}</h3>
              <p class="wqk-category-description">{{ wqkCategory.wqkDescription }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- News Section -->
    <section class="wqk-news">
      <div class="wqk-container">
        <h2 class="wqk-section-title">最新资讯</h2>
        <div class="wqk-news-grid">
          <article 
            v-for="wqkNews in wqkLatestNews" 
            :key="wqkNews.wqkId"
            class="wqk-news-card"
          >
            <div class="wqk-news-image">
              <img :src="wqkNews.wqkImage" :alt="wqkNews.wqkTitle" class="wqk-news-img">
            </div>
            <div class="wqk-news-content">
              <h3 class="wqk-news-title">{{ wqkNews.wqkTitle }}</h3>
              <p class="wqk-news-excerpt">{{ wqkNews.wqkExcerpt }}</p>
              <div class="wqk-news-meta">
                <span class="wqk-news-date">{{ wqkFormatDate(wqkNews.wqkDate) }}</span>
                <span class="wqk-news-category">{{ wqkNews.wqkCategory }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { wqkUseProductStore } from '@/stores/wqkProductStore'
import { wqkUseAppStore } from '@/stores/wqkAppStore'

interface WqkProduct {
  wqkId: number
  wqkName: string
  wqkPrice: number
  wqkImage: string
  wqkDescription: string
  wqkCategory: string
  wqkRating: number
}

interface WqkCategory {
  wqkId: number
  wqkName: string
  wqkSlug: string
  wqkImage: string
  wqkDescription: string
}

interface WqkNews {
  wqkId: number
  wqkTitle: string
  wqkExcerpt: string
  wqkImage: string
  wqkDate: string
  wqkCategory: string
}

const wqkRouter = useRouter()
const wqkProductStore = wqkUseProductStore()
const wqkAppStore = wqkUseAppStore()

// 模拟数据
const wqkFeaturedProducts = ref<WqkProduct[]>([
  {
    wqkId: 1,
    wqkName: 'iPhone 15 Pro',
    wqkPrice: 7999,
    wqkImage: '@/assets/image/iphone-15-pro.jpg',
    wqkDescription: '钛金属设计，A17 Pro 芯片',
    wqkCategory: 'iPhone',
    wqkRating: 4.8
  },
  {
    wqkId: 2,
    wqkName: 'iPad Pro',
    wqkPrice: 6799,
    wqkImage: '@/assets/image/ipad-pro.jpg',
    wqkDescription: 'M2 芯片，12.9 英寸显示屏',
    wqkCategory: 'iPad',
    wqkRating: 4.7
  },
  {
    wqkId: 3,
    wqkName: 'MacBook Air',
    wqkPrice: 8999,
    wqkImage: '@/assets/image/macbook-air.jpg',
    wqkDescription: 'M2 芯片，轻薄便携',
    wqkCategory: 'Mac',
    wqkRating: 4.9
  },
  {
    wqkId: 4,
    wqkName: 'Apple Watch Series 9',
    wqkPrice: 2999,
    wqkImage: '@/assets/image/apple-watch.jpg',
    wqkDescription: 'S9 芯片，健康监测',
    wqkCategory: 'Watch',
    wqkRating: 4.6
  }
])

const wqkCategories = ref<WqkCategory[]>([
  {
    wqkId: 1,
    wqkName: 'iPhone',
    wqkSlug: 'iphone',
    wqkImage: '@/assets/image/category-iphone.jpg',
    wqkDescription: '探索最新的 iPhone 系列'
  },
  {
    wqkId: 2,
    wqkName: 'iPad',
    wqkSlug: 'ipad',
    wqkImage: '@/assets/image/category-ipad.jpg',
    wqkDescription: '强大的 iPad 产品线'
  },
  {
    wqkId: 3,
    wqkName: 'Mac',
    wqkSlug: 'mac',
    wqkImage: '@/assets/image/category-mac.jpg',
    wqkDescription: '专业的 Mac 电脑'
  },
  {
    wqkId: 4,
    wqkName: 'Apple Watch',
    wqkSlug: 'watch',
    wqkImage: '@/assets/image/category-watch.jpg',
    wqkDescription: '智能手表新体验'
  }
])

const wqkLatestNews = ref<WqkNews[]>([
  {
    wqkId: 1,
    wqkTitle: 'iPhone 15 系列正式发布',
    wqkExcerpt: '全新的钛金属设计，搭载 A17 Pro 芯片，带来前所未有的性能体验。',
    wqkImage: '@/assets/image/news-iphone15.jpg',
    wqkDate: '2024-01-15',
    wqkCategory: 'iPhone'
  },
  {
    wqkId: 2,
    wqkTitle: 'iPad Pro 迎来重大更新',
    wqkExcerpt: 'M2 芯片的加入让 iPad Pro 的性能再次飞跃，专业创作更加得心应手。',
    wqkImage: '@/assets/image/news-ipad.jpg',
    wqkDate: '2024-01-10',
    wqkCategory: 'iPad'
  },
  {
    wqkId: 3,
    wqkTitle: 'Apple Watch 健康功能升级',
    wqkExcerpt: '新增更多健康监测功能，让你的健康管理更加全面和精准。',
    wqkImage: '@/assets/image/news-watch.jpg',
    wqkDate: '2024-01-05',
    wqkCategory: 'Apple Watch'
  }
])

// 方法
const wqkGoToProduct = (wqkProductId: number) => {
  wqkRouter.push({ name: 'ProductDetail', params: { id: wqkProductId } })
}

const wqkGoToCategory = (wqkCategorySlug: string) => {
  wqkRouter.push({ name: 'Category', params: { category: wqkCategorySlug } })
}

const wqkFormatDate = (wqkDateString: string) => {
  const wqkDate = new Date(wqkDateString)
  return wqkDate.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  wqkAppStore.wqkInitialize()
})
</script>

<style scoped>
.wqk-home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Hero Section */
.wqk-hero {
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.wqk-hero-content {
  flex: 1;
  max-width: 37.037rem;
  margin-right: 3.704rem;
}

.wqk-hero-title {
  font-size: 3.704rem;
  font-weight: 700;
  margin-bottom: 1.481rem;
  line-height: 1.2;
}

.wqk-hero-subtitle {
  font-size: 1.481rem;
  margin-bottom: 2.963rem;
  opacity: 0.9;
  line-height: 1.5;
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
  color: #667eea;
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
.wqk-featured,
.wqk-categories,
.wqk-news {
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

/* Product Grid */
.wqk-product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18.519rem, 1fr));
  gap: 2.222rem;
}

.wqk-product-card {
  background: white;
  border-radius: 1.481rem;
  overflow: hidden;
  box-shadow: 0 0.741rem 1.852rem rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.wqk-product-card:hover {
  transform: translateY(-0.370rem);
  box-shadow: 0 1.481rem 2.963rem rgba(0, 0, 0, 0.15);
}

.wqk-product-image {
  height: 13.889rem;
  overflow: hidden;
}

.wqk-product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.wqk-product-card:hover .wqk-product-img {
  transform: scale(1.05);
}

.wqk-product-info {
  padding: 1.481rem;
}

.wqk-product-name {
  font-size: 1.296rem;
  font-weight: 600;
  margin-bottom: 0.741rem;
  color: #333;
}

.wqk-product-price {
  font-size: 1.481rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.741rem;
}

.wqk-product-description {
  font-size: 0.926rem;
  color: #666;
  line-height: 1.5;
}

/* Category Grid */
.wqk-category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16.667rem, 1fr));
  gap: 1.852rem;
}

.wqk-category-card {
  background: white;
  border-radius: 1.481rem;
  overflow: hidden;
  box-shadow: 0 0.741rem 1.852rem rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.wqk-category-card:hover {
  transform: translateY(-0.370rem);
  box-shadow: 0 1.481rem 2.963rem rgba(0, 0, 0, 0.15);
}

.wqk-category-image {
  height: 11.111rem;
  overflow: hidden;
}

.wqk-category-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.wqk-category-card:hover .wqk-category-img {
  transform: scale(1.05);
}

.wqk-category-info {
  padding: 1.481rem;
}

.wqk-category-name {
  font-size: 1.296rem;
  font-weight: 600;
  margin-bottom: 0.741rem;
  color: #333;
}

.wqk-category-description {
  font-size: 0.926rem;
  color: #666;
  line-height: 1.5;
}

/* News Grid */
.wqk-news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20.370rem, 1fr));
  gap: 2.222rem;
}

.wqk-news-card {
  background: white;
  border-radius: 1.481rem;
  overflow: hidden;
  box-shadow: 0 0.741rem 1.852rem rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.wqk-news-card:hover {
  transform: translateY(-0.370rem);
  box-shadow: 0 1.481rem 2.963rem rgba(0, 0, 0, 0.15);
}

.wqk-news-image {
  height: 11.111rem;
  overflow: hidden;
}

.wqk-news-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.wqk-news-card:hover .wqk-news-img {
  transform: scale(1.05);
}

.wqk-news-content {
  padding: 1.481rem;
}

.wqk-news-title {
  font-size: 1.296rem;
  font-weight: 600;
  margin-bottom: 0.741rem;
  color: #333;
  line-height: 1.4;
}

.wqk-news-excerpt {
  font-size: 0.926rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.111rem;
}

.wqk-news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.815rem;
  color: #999;
}

.wqk-news-date {
  font-weight: 500;
}

.wqk-news-category {
  background: #f0f0f0;
  padding: 0.185rem 0.741rem;
  border-radius: 1.481rem;
  font-weight: 500;
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
    font-size: 2.963rem;
  }

  .wqk-hero-subtitle {
    font-size: 1.296rem;
  }

  .wqk-hero-actions {
    justify-content: center;
  }

  .wqk-section-title {
    font-size: 2.222rem;
  }

  .wqk-product-grid,
  .wqk-category-grid,
  .wqk-news-grid {
    grid-template-columns: 1fr;
  }

  .wqk-featured,
  .wqk-categories,
  .wqk-news {
    padding: 3.704rem 0;
  }
}

@media (max-width: 30rem) {
  .wqk-hero-title {
    font-size: 2.222rem;
  }

  .wqk-hero-subtitle {
    font-size: 1.111rem;
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
