import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
  FONTS,
} from '@/shared/constants/theme'
import { HeaderProps } from '../types/products-types'

export function Header({ onMenuPress, cartCount = 0, onCartPress }: HeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onMenuPress}
        style={styles.menuButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={styles.menuLine} />
        <View style={[styles.menuLine, styles.menuLineMiddle]} />
        <View style={styles.menuLine} />
      </TouchableOpacity>

      <View>
        <Text style={styles.logoText}>People Made</Text>
      </View>

      {cartCount > 0 ? (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={onCartPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.cartIcon}>{'\uD83D\uDED2'}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {cartCount > 99 ? '99+' : cartCount}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.cartPlaceholder} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 4,
  },
  menuButton: {
    padding: SPACING.sm,
    justifyContent: 'center',
    gap: 5,
  },
  menuLine: {
    width: 22,
    height: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 1,
  },
  menuLineMiddle: {
    width: 16,
  },
  logoText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.overlay,
    fontFamily: FONTS.hero,
    letterSpacing: 0.8,
    textTransform: 'capitalize',
  },
  cartButton: {
    padding: SPACING.sm,
    position: 'relative',
  },
  cartIcon: {
    fontSize: FONT_SIZES.xl,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 0,
    backgroundColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.full,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
    color: COLORS.primary,
  },
  cartPlaceholder: {
    width: 36,
    height: 36,
  },
})
