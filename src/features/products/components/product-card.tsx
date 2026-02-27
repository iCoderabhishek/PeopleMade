import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
} from '@/shared/constants/theme'
import { ProductCardProps } from '../types/products-types'


export function ProductCard({
  product,
  onPress,
  isFavorite = false,
  onFavoritePress,
}: ProductCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(product)}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => onFavoritePress?.(product)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text
              style={[
                styles.favoriteIcon,
                isFavorite && styles.favoriteIconActive,
              ]}
            >
              {isFavorite ? '\u2665' : '\u2661'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <Text style={styles.category} numberOfLines={1}>
            {product.category}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.price}>$ {product.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    paddingHorizontal: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  card: {
    borderWidth: 0.8,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: COLORS.white,
    position: 'relative',
    paddingHorizontal: SPACING.sm + 2,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm + 2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 0.182,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  favoriteIcon: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.secondary,
  },
  favoriteIconActive: {
    color: COLORS.error,
  },
  info: {
    paddingHorizontal: SPACING.sm + 2,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm + 2,
  },
  category: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.secondary,
    textTransform: 'capitalize',
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    lineHeight: 18,
  },
  price: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
})
