import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 购物车商品接口
interface WqkCartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  color?: string
  storage?: string
  category: 'iphone' | 'ipad' | 'mac' | 'watch' | 'airpods' | 'accessories'
}

// 购物车状态管理
export const useWqkCartStore = defineStore('wqkCart', () => {
  // 状态
  const wqkCartItems = ref<WqkCartItem[]>([])
  const wqkLoading = ref(false)

  // 计算属性
  const wqkCartCount = computed(() => {
    return wqkCartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const wqkCartTotal = computed(() => {
    return wqkCartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const wqkCartTotalFormatted = computed(() => {
    return `RMB ${wqkCartTotal.value.toLocaleString()}`
  })

  const wqkIsCartEmpty = computed(() => wqkCartItems.value.length === 0)

  // 方法
  const wqkAddToCart = (product: Omit<WqkCartItem, 'quantity'>) => {
    const existingItem = wqkCartItems.value.find(item => 
      item.id === product.id && 
      item.color === product.color && 
      item.storage === product.storage
    )

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      wqkCartItems.value.push({ ...product, quantity: 1 })
    }
  }

  const wqkRemoveFromCart = (itemId: string, color?: string, storage?: string) => {
    const index = wqkCartItems.value.findIndex(item => 
      item.id === itemId && 
      item.color === color && 
      item.storage === storage
    )
    
    if (index > -1) {
      wqkCartItems.value.splice(index, 1)
    }
  }

  const wqkUpdateQuantity = (itemId: string, quantity: number, color?: string, storage?: string) => {
    const item = wqkCartItems.value.find(item => 
      item.id === itemId && 
      item.color === color && 
      item.storage === storage
    )
    
    if (item) {
      if (quantity <= 0) {
        wqkRemoveFromCart(itemId, color, storage)
      } else {
        item.quantity = quantity
      }
    }
  }

  const wqkClearCart = () => {
    wqkCartItems.value = []
  }

  const wqkGetCartItemsByCategory = (category: WqkCartItem['category']) => {
    return wqkCartItems.value.filter(item => item.category === category)
  }

  // 结算相关
  const wqkCheckout = async () => {
    wqkLoading.value = true
    try {
      // 这里应该调用实际的结算API
      // const response = await axios.post('/checkout', { items: wqkCartItems.value })
      
      // 模拟结算成功
      await new Promise(resolve => setTimeout(resolve, 2000))
      wqkClearCart()
      
      return { success: true, message: '订单提交成功' }
    } catch (error) {
      console.error('结算失败:', error)
      return { success: false, message: '结算失败，请稍后重试' }
    } finally {
      wqkLoading.value = false
    }
  }

  return {
    // 状态
    wqkCartItems,
    wqkLoading,
    // 计算属性
    wqkCartCount,
    wqkCartTotal,
    wqkCartTotalFormatted,
    wqkIsCartEmpty,
    // 方法
    wqkAddToCart,
    wqkRemoveFromCart,
    wqkUpdateQuantity,
    wqkClearCart,
    wqkGetCartItemsByCategory,
    wqkCheckout
  }
}, {
  persist: {
    key: 'wqk-cart-store',
    storage: localStorage,
    paths: ['wqkCartItems']
  }
})