import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/features/products/types/products-types'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((i) => i.product.id === action.payload.id)
      if (index >= 0) {
        state.items.splice(index, 1)
      } else {
        state.items.push({ product: action.payload, quantity: 1 })
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.product.id === action.payload)
      if (item) {
        item.quantity += 1
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((i) => i.product.id === action.payload)
      if (index >= 0) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1
        } else {
          state.items.splice(index, 1)
        }
      }
    },
    removeCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.product.id !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    },
    restoreCart: (state, action: PayloadAction<any[]>) => {
      if (!Array.isArray(action.payload)) {
        state.items = []
        return
      }
      // Migrate old Product[] format to CartItem[]
      state.items = action.payload.map((item) => {
        if (item && item.product && typeof item.quantity === 'number') {
          return item as CartItem
        }
        // Old format: plain Product object
        return { product: item, quantity: 1 } as CartItem
      })
    },
  },
})

export const {
  toggleCart,
  incrementQuantity,
  decrementQuantity,
  removeCart,
  clearCart,
  restoreCart,
} = cartSlice.actions
export default cartSlice.reducer
