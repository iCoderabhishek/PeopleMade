import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONTS,
  BORDER_RADIUS,
} from '@/shared/constants/theme'
import { ProductInfoProps } from '../types/products-types'

function StarRating({ rating }: { rating: { rate: number; count: number } }) {
  const maxStars = 5
  const filled = Math.round(rating.rate)

  return (
    <View style={styles.ratingRow}>
      {Array.from({ length: maxStars }, (_, i) => (
        <Text
          key={i}
          style={[
            styles.star,
            { color: i < filled ? COLORS.accent : COLORS.border },
          ]}
        >
          {'\u2605'}
        </Text>
      ))}
      <Text style={styles.ratingValue}>
        ({rating.rate.toFixed(1)}) {rating.count} reviews
      </Text>
    </View>
  )
}

export function ProductInfo({
  title,
  price,
  category,
  description,
  rating,
}: ProductInfoProps) {
  return (
    <View style={styles.container}>
      {category && (
        <View style={styles.categoryChip}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      )}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>$ {price.toFixed(2)}</Text>

      {rating && <StarRating rating={rating} />}

      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm + 4,
    paddingVertical: SPACING.xs + 1,
    borderRadius: BORDER_RADIUS.full,
    marginBottom: SPACING.sm,
  },
  categoryText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.secondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontFamily: FONTS.serif,
    color: COLORS.primary,
    lineHeight: 36,
    marginBottom: SPACING.sm,
  },
  price: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: SPACING.md,
  },
  star: {
    fontSize: FONT_SIZES.lg,
  },
  ratingValue: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.secondary,
    marginLeft: SPACING.xs,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.secondary,
    lineHeight: 22,
  },
})
