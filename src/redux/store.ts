import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import productsReducer from './slices/products.slice'
import favoritesReducer from './slices/favorites.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    favorites: favoritesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
