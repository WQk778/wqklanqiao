import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import StorePage from '../views/StorePage.vue'
import IPhonePage from '../views/IPhonePage.vue'
import IPadPage from '../views/IPadPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 苹果官网首页
    {
      path: '/',
      name: 'apple-home',
      component: HomePage
    },
    // 苹果商店页面
    {
      path: '/store',
      name: 'apple-store',
      component: StorePage
    },
    // iPhone页面
    {
      path: '/iphone',
      name: 'apple-iphone',
      component: IPhonePage
    },
    // iPhone比较页面
    {
      path: '/iphone/compare',
      name: 'iphone-compare',
      component: () => import('../views/IPhoneComparePage.vue')
    },
    // iPhone详情页面 - 新增
    {
      path: '/iphone/:id',
      name: 'iphone-detail',
      component: () => import('../views/WangIPhoneDetailPage.vue')
    },
    // iPad页面
    {
      path: '/ipad',
      name: 'apple-ipad',
      component: IPadPage
    },
    // 主题演示页面
    {
      path: '/theme',
      name: 'theme-demo',
      component: () => import('../views/WangThemePage.vue')
    },
    // 404页面 - 必须放在最后
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage
    }
  ]
})

export default router