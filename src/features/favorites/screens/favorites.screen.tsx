import React, { useState, useCallback, useRef } from 'react'
import {
  View,
  Text,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ProductCard } from '@/features/products/components/product-card'
import { ProductDetailsSheet } from '@/features/products/screens/product-details.screen'
import { useToast } from '@/shared/components/toast'
import { useAppSelector, useAppDispatch } from '@/shared/hooks/use-redux'
import { toggleFavorite } from '@/redux/slices/favorites.slice'
import { useTabBarVisibility } from '@/shared/contexts/tab-bar-visibility'
import { Product } from '@/features/products/types/products-types'
import { favoritesStyles as styles } from './favorites.styles'

export function FavoritesScreen() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const dispatch = useAppDispatch()
  const { showToast } = useToast()
  const favoriteItems = useAppSelector((state) => state.favorites.items)

  const { hide, show } = useTabBarVisibility()
  const lastOffsetRef = useRef(0)
  const isTabHiddenRef = useRef(false)

  const handleProductPress = useCallback((product: Product) => {
    setSelectedProduct(product)
  }, [])

  const handleCloseDetails = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  const handleFavoritePress = useCallback(
    (product: Product) => {
      dispatch(toggleFavorite(product))
      showToast('Removed from Favorites', {
        type: 'error',
        actionLabel: 'Undo',
        onAction: () => dispatch(toggleFavorite(product)),
      })
    },
    [dispatch, showToast],
  )

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = e.nativeEvent.contentOffset.y
      const isDown = offset > lastOffsetRef.current

      if (isDown && offset > 60 && !isTabHiddenRef.current) {
        isTabHiddenRef.current = true
        hide()
      } else if (!isDown && isTabHiddenRef.current) {
        isTabHiddenRef.current = false
        show()
      }

      lastOffsetRef.current = Math.max(0, offset)
    },
    [hide, show],
  )

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPress={handleProductPress}
        isFavorite
        onFavoritePress={handleFavoritePress}
      />
    ),
    [handleProductPress, handleFavoritePress],
  )

  const keyExtractor = useCallback(
    (item: Product) => item.id.toString(),
    [],
  )

  if (favoriteItems.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>Favorites</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyHeart}>{'\u2661'}</Text>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyMessage}>
            Tap the heart icon on any product to save it here for later.
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={favoriteItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Favorites</Text>
            <Text style={styles.subtitle}>
              {favoriteItems.length} item{favoriteItems.length !== 1 ? 's' : ''} saved
            </Text>
          </View>
        }
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      <ProductDetailsSheet
        product={selectedProduct}
        visible={!!selectedProduct}
        onClose={handleCloseDetails}
      />
    </SafeAreaView>
  )
}
