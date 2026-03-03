import React, { useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { BottomSheet } from '@/shared/components/bottom-sheet'
import { useToast } from '@/shared/components/toast'
import { useAppSelector, useAppDispatch } from '@/shared/hooks/use-redux'
import { toggleFavorite } from '@/redux/slices/favorites.slice'
import {
  toggleCart,
  incrementQuantity,
  decrementQuantity,
} from '@/redux/slices/cart.slice'
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
  FONTS,
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

  const cartItem = useAppSelector((state) =>
    product ? state.cart.items.find((i) => i.product.id === product.id) : undefined,
  )
  const isCart = !!cartItem
  const quantity = cartItem?.quantity ?? 0

  const handleToggleFavorite = useCallback(() => {
    if (product) {
      const wasAlreadyFavorite = isFavorite
      dispatch(toggleFavorite(product))
      if (!wasAlreadyFavorite) {
        showToast('Added to Favorites', { type: 'success' })
      }
    }
  }, [dispatch, product, isFavorite, showToast])

  const handleToggleCart = useCallback(() => {
    if (product) {
      const wasAlreadyCart = isCart
      dispatch(toggleCart(product))
      if (!wasAlreadyCart) {
        showToast('Added to Cart', { type: 'success' })
      }
    }
  }, [dispatch, product, isCart, showToast])

  const handleIncrement = useCallback(() => {
    if (product) {
      dispatch(incrementQuantity(product.id))
    }
  }, [dispatch, product])

  const handleDecrement = useCallback(() => {
    if (product) {
      dispatch(decrementQuantity(product.id))
    }
  }, [dispatch, product])

  if (!product) return null

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={styles.listContent}>
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

          {/* add to cart */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleToggleCart}
            activeOpacity={0.7}
          >
            <Text style={styles.cartIconText}>
              {'\uD83D\uDED2'}
            </Text>
            {isCart && <View style={styles.activeIndicator} />}
          </TouchableOpacity>

          {/* add to favorite */}
          <TouchableOpacity
            style={styles.iconButton}
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

        {/* Quantity counter — visible when item is in cart */}
        {isCart && (
          <View style={styles.quantityRow}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecrement}
                activeOpacity={0.7}
              >
                <Text style={styles.quantityButtonText}>{'\u2212'}</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncrement}
                activeOpacity={0.7}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.actionButton,
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

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.cartButton,
              isCart && styles.cartButtonActive,
            ]}
            onPress={handleToggleCart}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.cartButtonText,
                isCart && styles.cartButtonTextActive,
              ]}
            >
              {isCart ? 'Remove from Cart' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 160,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoContent: {
    flex: 1,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    marginRight: SPACING.md,
  },
  cartIconText: {
    fontSize: FONT_SIZES.lg,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },
  heartIcon: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.secondary,
  },
  heartIconActive: {
    color: COLORS.error,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
  },
  quantityLabel: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.white,
    lineHeight: FONT_SIZES.xl + 2,
  },
  quantityValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.primary,
    minWidth: 28,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
  },
  favoriteButton: {
    backgroundColor: COLORS.primary,
  },
  favoriteButtonActive: {
    backgroundColor: COLORS.surface,
  },
  favoriteButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.white,
  },
  favoriteButtonTextActive: {
    color: COLORS.error,
  },
  cartButton: {
    backgroundColor: COLORS.accent,
  },
  cartButtonActive: {
    backgroundColor: COLORS.surface,
  },
  cartButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.primary,
  },
  cartButtonTextActive: {
    color: COLORS.error,
  },
})
