# wqklanqiao

Vue3 + TypeScript + Vite 项目 - 仿苹果官网设计的响应式网站

这是一个基于 Vue 3 和 Vite 构建的现代化前端项目，采用苹果官网的设计风格。

## 推荐的 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (并禁用 Vetur)。

## 项目特性

- ✨ Vue 3 组合式 API
- 🚀 Vite 构建工具
- 📱 响应式设计
- 🎨 仿苹果官网UI设计
- 🛒 购物车功能
- 📊 状态管理 (Pinia)
- 🎯 TypeScript 支持
- 📋 表单组件

## 项目安装

```sh
npm install
```

### 开发环境运行

```sh
npm run dev
```

### 生产环境构建

```sh
npm run build
```

## 项目结构

```
src/
├── components/     # 组件目录
│   ├── iPad/      # iPad相关组件
│   ├── iPhone/    # iPhone相关组件
│   ├── icons/     # 图标组件
│   ├── layout/    # 布局组件
│   ├── products/  # 产品组件
│   ├── store/     # 商店组件
│   └── ui/        # UI组件
├── views/         # 页面组件
├── stores/        # Pinia状态管理
├── router/        # 路由配置
├── composables/   # 组合式函数
└── assets/        # 静态资源
```

## 表单功能

项目包含完整的表单设计和功能：

- 用户登录表单 (邮箱/密码)
- 主题展示页面的表单元素
- 响应式表单布局
- 表单验证和状态管理

## 技术栈

- **前端框架**: Vue 3
- **构建工具**: Vite
- **语言**: TypeScript
- **状态管理**: Pinia
- **路由**: Vue Router
- **UI组件**: Element Plus
- **HTTP客户端**: Axios
- **动画**: Animate.css
- **图表**: ECharts