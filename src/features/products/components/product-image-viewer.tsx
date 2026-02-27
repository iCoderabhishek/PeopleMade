import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZES,
} from '@/shared/constants/theme'
import { ProductImageViewerProps } from '../types/products-types'

export function ProductImageViewer({
  image,
}: ProductImageViewerProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1.15,
    backgroundColor: COLORS.surface,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    left: SPACING.md,
    top: '45%',
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  backArrow: {
    fontSize: FONT_SIZES.xxl,
    color: COLORS.primary,
    marginTop: -2,
  },
})
