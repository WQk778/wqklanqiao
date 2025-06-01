import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { WqkProduct } from '@/types/wqkProduct'
import { wqkProductApi } from '@/api/wqkProductApi'

export const wqkUseProductStore = defineStore('wqkProduct', () => {
  // 状态
  const wqkProducts = ref<WqkProduct[]>([])
  const wqkCurrentProduct = ref<WqkProduct | null>(null)
  const wqkIsLoading = ref(false)
  const wqkError = ref<string | null>(null)
  const wqkSearchQuery = ref('')
  const wqkSelectedCategory = ref<string>('')
  const wqkPriceRange = ref({ min: 0, max: 10000 })
  const wqkSortBy = ref<'price' | 'name' | 'rating'>('name')
  const wqkSortOrder = ref<'asc' | 'desc'>('asc')

  // 计算属性
  const wqkFilteredProducts = computed(() => {
    let wqkFiltered = wqkProducts.value

    // 按搜索查询过滤
    if (wqkSearchQuery.value) {
      wqkFiltered = wqkFiltered.filter(wqkProduct =>
        wqkProduct.wqkName.toLowerCase().includes(wqkSearchQuery.value.toLowerCase()) ||
        wqkProduct.wqkDescription.toLowerCase().includes(wqkSearchQuery.value.toLowerCase())
      )
    }

    // 按类别过滤
    if (wqkSelectedCategory.value) {
      wqkFiltered = wqkFiltered.filter(wqkProduct => wqkProduct.wqkCategory === wqkSelectedCategory.value)
    }

    // 按价格范围过滤
    wqkFiltered = wqkFiltered.filter(wqkProduct =>
      wqkProduct.wqkPrice >= wqkPriceRange.value.min && wqkProduct.wqkPrice <= wqkPriceRange.value.max
    )

    // 排序
    wqkFiltered.sort((a, b) => {
      let wqkComparison = 0
      switch (wqkSortBy.value) {
        case 'price':
          wqkComparison = a.wqkPrice - b.wqkPrice
          break
        case 'name':
          wqkComparison = a.wqkName.localeCompare(b.wqkName)
          break
        case 'rating':
          wqkComparison = a.wqkRating - b.wqkRating
          break
      }
      return wqkSortOrder.value === 'asc' ? wqkComparison : -wqkComparison
    })

    return wqkFiltered
  })

  const wqkCategories = computed(() => {
    const wqkCats = new Set(wqkProducts.value.map(wqkProduct => wqkProduct.wqkCategory))
    return Array.from(wqkCats)
  })

  const wqkProductCount = computed(() => wqkProducts.value.length)
  const wqkFilteredProductCount = computed(() => wqkFilteredProducts.value.length)

  // 方法
  const wqkFetchProducts = async () => {
    wqkIsLoading.value = true
    wqkError.value = null
    try {
      const wqkResponse = await wqkProductApi.wqkGetAll()
      wqkProducts.value = wqkResponse.data
    } catch (error) {
      wqkError.value = error instanceof Error ? error.message : '获取产品失败'
    } finally {
      wqkIsLoading.value = false
    }
  }

  const wqkFetchProductById = async (wqkId: number) => {
    // 先从本地查找
    const wqkLocalProduct = wqkProducts.value.find(wqkProduct => wqkProduct.wqkId === wqkId)
    if (wqkLocalProduct) {
      wqkCurrentProduct.value = wqkLocalProduct
      return wqkLocalProduct
    }

    // 如果本地没有，从API获取
    wqkIsLoading.value = true
    wqkError.value = null
    try {
      const wqkResponse = await wqkProductApi.wqkGetById(wqkId)
      wqkCurrentProduct.value = wqkResponse.data
      // 更新本地产品列表
      const wqkIndex = wqkProducts.value.findIndex(wqkProduct => wqkProduct.wqkId === wqkId)
      if (wqkIndex !== -1) {
        wqkProducts.value[wqkIndex] = wqkResponse.data
      } else {
        wqkProducts.value.push(wqkResponse.data)
      }
      return wqkResponse.data
    } catch (error) {
      wqkError.value = error instanceof Error ? error.message : '获取产品详情失败'
      return null
    } finally {
      wqkIsLoading.value = false
    }
  }

  const wqkSearchProducts = (wqkQuery: string) => {
    wqkSearchQuery.value = wqkQuery
  }

  const wqkGetProductById = (wqkId: number) => {
    return wqkProducts.value.find(wqkProduct => wqkProduct.wqkId === wqkId)
  }

  const wqkFilterByPrice = (wqkMin: number, wqkMax: number) => {
    wqkPriceRange.value = { min: wqkMin, max: wqkMax }
  }

  const wqkSortProducts = (wqkBy: 'price' | 'name' | 'rating', wqkOrder: 'asc' | 'desc' = 'asc') => {
    wqkSortBy.value = wqkBy
    wqkSortOrder.value = wqkOrder
  }

  const wqkClearError = () => {
    wqkError.value = null
  }

  const wqkSetCurrentProduct = (wqkProduct: WqkProduct | null) => {
    wqkCurrentProduct.value = wqkProduct
  }

  const wqkResetFilters = () => {
    wqkSearchQuery.value = ''
    wqkSelectedCategory.value = ''
    wqkPriceRange.value = { min: 0, max: 10000 }
    wqkSortBy.value = 'name'
    wqkSortOrder.value = 'asc'
  }

  return {
    // 状态
    wqkProducts,
    wqkCurrentProduct,
    wqkIsLoading,
    wqkError,
    wqkSearchQuery,
    wqkSelectedCategory,
    wqkPriceRange,
    wqkSortBy,
    wqkSortOrder,
    // 计算属性
    wqkFilteredProducts,
    wqkCategories,
    wqkProductCount,
    wqkFilteredProductCount,
    // 方法
    wqkFetchProducts,
    wqkFetchProductById,
    wqkSearchProducts,
    wqkGetProductById,
    wqkFilterByPrice,
    wqkSortProducts,
    wqkClearError,
    wqkSetCurrentProduct,
    wqkResetFilters
  }
}, {
  persist: {
    key: 'wqk-product-store',
    storage: localStorage,
    paths: ['wqkProducts', 'wqkCurrentProduct']
  }
})
