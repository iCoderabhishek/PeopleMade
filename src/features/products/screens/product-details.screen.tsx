import React, { useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native'

import { BottomSheet } from '@/shared/components/bottom-sheet'
import { useToast } from '@/shared/components/toast'
import { useAppSelector, useAppDispatch } from '@/shared/hooks/use-redux'
import { toggleFavorite } from '@/redux/slices/favorites.slice'
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
} from '@/shared/constants/theme'
import { ProductDetailsSheetProps } from '../types/products-types'
import { ProductImageViewer } from '../components/product-image-viewer'
import { ProductInfo } from '../components/product-info'

export function ProductDetailsSheet({
  product,
  visible,
  onClose,
}: ProductDetailsSheetProps) {
  const dispatch = useAppDispatch()
  const { showToast } = useToast()
  const isFavorite = useAppSelector((state) =>
    product ? state.favorites.items.some((p) => p.id === product.id) : false,
  )

  const handleToggleFavorite = useCallback(() => {
    if (product) {
      const wasAlreadyFavorite = isFavorite
      dispatch(toggleFavorite(product))
      if (!wasAlreadyFavorite) {
        showToast('Added to Favorites', { type: 'success' })
      }
    }
  }, [dispatch, product, isFavorite, showToast])

  if (!product) return null

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <FlatList
        data={[product]}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listContent}
        renderItem={() => (
          <>
            <ProductImageViewer image={product.image} />

            <View style={styles.infoRow}>
              <View style={styles.infoContent}>
                <ProductInfo
                  title={product.title}
                  price={product.price}
                  category={product.category}
                  description={product.description}
                  rating={product.rating}
                />
              </View>
              <TouchableOpacity
                style={styles.heartButton}
                onPress={handleToggleFavorite}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.heartIcon,
                    isFavorite && styles.heartIconActive,
                  ]}
                >
                  {isFavorite ? '\u2665' : '\u2661'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.favoriteButton,
                isFavorite && styles.favoriteButtonActive,
              ]}
              onPress={handleToggleFavorite}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.favoriteButtonText,
                  isFavorite && styles.favoriteButtonTextActive,
                ]}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      />
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: SPACING.xl + 44,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoContent: {
    flex: 1,
  },
  heartButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    marginRight: SPACING.md,
  },
  heartIcon: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.secondary,
  },
  heartIconActive: {
    color: COLORS.error,
  },
  favoriteButton: {
    marginHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',

  },
  favoriteButtonActive: {
    backgroundColor: COLORS.surface,
  },
  favoriteButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.white,
  },
  favoriteButtonTextActive: {
    color: COLORS.error,
  },
})
