import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/features/products/types/products-types'
import { fetchProducts } from '@/features/products/services/products.service'
import {
  filterBySearch,
  filterByCategory,
} from '@/features/products/utils/product-filters'

interface ProductsState {
  items: Product[]
  filteredItems: Product[]
  loading: boolean
  error: string | null
  searchQuery: string
  selectedCategory: string
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: 'all',
}

function applyFilters(state: ProductsState) {
  state.filteredItems = filterByCategory(
    filterBySearch(state.items, state.searchQuery),
    state.selectedCategory,
  )
}

export const fetchProductsAsync = createAsyncThunk(
  'products/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProducts()
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load products')
    }
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      applyFilters(state)
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
      applyFilters(state)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
        applyFilters(state)
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setSearchQuery, setSelectedCategory } = productsSlice.actions
export default productsSlice.reducer
