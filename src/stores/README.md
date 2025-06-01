# Pinia 状态管理

本项目使用 Pinia 作为状态管理库，所有的 Store 都位于 `src/stores` 目录下。

## 目录结构

```
src/stores/
├── index.ts          # Store 入口文件
├── counter.ts        # 示例计数器 Store
├── wqkUserStore.ts   # 用户状态管理
├── wqkCartStore.ts   # 购物车状态管理
├── wqkProductStore.ts # 产品状态管理
├── wqkAppStore.ts    # 应用全局状态管理
└── README.md         # 本文件
```

## Store 模块说明

### wqkUserStore
用户状态管理，包括：
- 用户信息（用户名、邮箱、头像等）
- 登录状态
- 用户权限
- 登录/登出功能
- 用户信息更新

### wqkCartStore
购物车状态管理，包括：
- 购物车商品列表
- 商品数量管理
- 价格计算
- 添加/删除商品
- 清空购物车
- 结算功能

### wqkProductStore
产品状态管理，包括：
- 产品列表
- 产品详情
- 产品搜索
- 产品分类
- 产品过滤和排序
- 产品收藏

### wqkAppStore
应用全局状态管理，包括：
- 主题设置（明亮/暗黑模式）
- 语言设置
- 设备类型检测
- 加载状态
- 侧边栏状态
- 通知系统
- 网络状态
- 视口尺寸

## 使用方式

```typescript
// 在组件中使用
import { wqkUseUserStore } from '@/stores/wqkUserStore'
import { wqkUseCartStore } from '@/stores/wqkCartStore'
import { wqkUseProductStore } from '@/stores/wqkProductStore'
import { wqkUseAppStore } from '@/stores/wqkAppStore'

export default {
  setup() {
    const wqkUserStore = wqkUseUserStore()
    const wqkCartStore = wqkUseCartStore()
    const wqkProductStore = wqkUseProductStore()
    const wqkAppStore = wqkUseAppStore()

    return {
      wqkUserStore,
      wqkCartStore,
      wqkProductStore,
      wqkAppStore
    }
  }
}
```

## 持久化

所有 Store 都配置了持久化存储，会自动将重要状态保存到 localStorage 中，页面刷新后状态会自动恢复。

## 命名规范

- 所有 Store 文件以 `wqk` 开头
- 所有状态变量和方法以 `wqk` 开头
- Store 名称使用驼峰命名法
- 方法名使用动词开头，如 `wqkAddToCart`、`wqkRemoveFromCart`
