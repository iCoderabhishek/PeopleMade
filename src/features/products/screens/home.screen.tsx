import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { FlatList, ActivityIndicator, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '../components/header'
import { HeroSection } from '../components/hero-section'
import { SearchBar } from '../components/search-bar'
import { CategoryTabs } from '../components/category-tabs'
import { ProductCard } from '../components/product-card'
import { SignoutModal } from '../components/signout-modal'
import { ProductDetailsSheet } from './product-details.screen'
import { ErrorState } from '@/shared/components/error-state'
import { useToast } from '@/shared/components/toast'
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value'
import { useAppSelector, useAppDispatch } from '@/shared/hooks/use-redux'
import { toggleFavorite } from '@/redux/slices/favorites.slice'
import {
  fetchProductsAsync,
  setSearchQuery,
  setSelectedCategory,
} from '@/redux/slices/products.slice'
import { logout } from '@/redux/slices/auth.slice'
import { getUniqueCategories } from '../utils/product-filters'
import { Product } from '../types/products-types'
import { COLORS, SPACING } from '@/shared/constants/theme'
import { homeStyles } from './home.styles'

export function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchText, setSearchText] = useState('')
  const debouncedSearch = useDebouncedValue(searchText)
  const [refreshing, setRefreshing] = useState(false)

  const dispatch = useAppDispatch()
  const { showToast } = useToast()
  const { items, filteredItems, loading, error, selectedCategory } =
    useAppSelector((state) => state.products)

  const favoriteItems = useAppSelector((state) => state.favorites.items)
  const cartItems = useAppSelector((state) => state.cart.items)
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const favoriteIds = useMemo(
    () => new Set(favoriteItems.map((p) => p.id)),
    [favoriteItems],
  )

  useEffect(() => {
    fetchRef.current = dispatch(fetchProductsAsync())
  }, [dispatch])

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch))
  }, [debouncedSearch, dispatch])

  const categories = useMemo(() => getUniqueCategories(items), [items])

  const handleCategoryChange = useCallback(
    (category: string) => {
      dispatch(setSelectedCategory(category))
    },
    [dispatch],
  )

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await dispatch(fetchProductsAsync())
    setRefreshing(false)
  }, [dispatch])

  const toggleMenu = useCallback(() => {
    setMenuVisible((prev) => !prev)
  }, [])

  const handleSignout = useCallback(() => {
    setMenuVisible(false)
    dispatch(logout())
    showToast('Signed out successfully', { type: 'success' })
  }, [dispatch, showToast])

  const handleProductPress = useCallback((product: Product) => {
    setSelectedProduct(product)
  }, [])

  const handleCloseDetails = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  const handleCartPress = useCallback(() => {
    if (cartItems.length > 0) {
      setSelectedProduct(cartItems[cartItems.length - 1].product)
    }
  }, [cartItems])

  const handleFavoritePress = useCallback(
    (product: Product) => {
      dispatch(toggleFavorite(product))
    },
    [dispatch],
  )

  const fetchRef = useRef<any>(null)

  const handleRetry = useCallback(() => {
    // Abort any previous pending request before retrying
    if (fetchRef.current) {
      fetchRef.current.abort()
    }
    fetchRef.current = dispatch(fetchProductsAsync())
  }, [dispatch])

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPress={handleProductPress}
        isFavorite={favoriteIds.has(item.id)}
        onFavoritePress={handleFavoritePress}
      />
    ),
    [handleProductPress, handleFavoritePress, favoriteIds],
  )

  const keyExtractor = useCallback(
    (item: Product) => item.id.toString(),
    [],
  )

  const listHeader = (
    <>
      <Header onMenuPress={toggleMenu} cartCount={cartCount} onCartPress={handleCartPress} />
      <HeroSection />
      <SearchBar value={searchText} onChangeText={setSearchText} />
      {items.length > 0 && (
        <CategoryTabs
          categories={categories}
          activeCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}
    </>
  )

  if (loading && items.length === 0) {
    return (
      <SafeAreaView style={homeStyles.container} edges={['top']}>
        {listHeader}
        <View style={homeStyles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.accent} />
        </View>
      </SafeAreaView>
    )
  }

  if (error && items.length === 0) {
    return (
      <SafeAreaView style={homeStyles.container} edges={['top']}>
        {listHeader}
        <ErrorState message={error} onRetry={handleRetry} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={homeStyles.container} edges={['top']}>
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        ListHeaderComponent={listHeader}
        columnWrapperStyle={homeStyles.columnWrapper}
        contentContainerStyle={homeStyles.listContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      <SignoutModal
        visible={menuVisible}
        onClose={toggleMenu}
        onSignout={handleSignout}
      />

      <ProductDetailsSheet
        product={selectedProduct}
        visible={!!selectedProduct}
        onClose={handleCloseDetails}
      />
    </SafeAreaView>
  )
}
