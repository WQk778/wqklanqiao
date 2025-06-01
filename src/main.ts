// main.ts

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { provide } from 'vue'
import 'animate.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/wqkTheme.css'

const app = createApp(App)

const pinia=createPinia()
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.use(axios)
pinia.use(piniaPluginPersistedstate)
// 提供provide一个只读的变量
app.provide('name', 'wangqikun')
app.provide('$axios', axios)
// base url为http://localhost:3000/
axios.defaults.baseURL = 'http://localhost:3000/'

// 添加响应拦截器处理数据加载失败
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 如果是网络错误或服务器错误，跳转到404页面
    if (error.code === 'ECONNREFUSED' || 
        error.code === 'ERR_NETWORK' ||
        error.response?.status >= 500 ||
        !error.response) {
      console.error('数据加载失败:', error.message)
      // 跳转到404页面
      router.push({ name: 'not-found' })
    }
    return Promise.reject(error)
  }
)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app')