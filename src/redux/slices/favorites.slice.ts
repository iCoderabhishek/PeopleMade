import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/features/products/types/products-types'

interface FavoritesState {
  items: Product[]
}

const initialState: FavoritesState = {
  items: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id)
      if (index >= 0) {
        state.items.splice(index, 1)
      } else {
        state.items.push(action.payload)
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((p) => p.id !== action.payload)
    },
    clearFavorites: (state) => {
      state.items = []
    },
    restoreFavorites: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload || []
    },
  },
})

export const { toggleFavorite, removeFavorite, clearFavorites, restoreFavorites } =
  favoritesSlice.actions
export default favoritesSlice.reducer
