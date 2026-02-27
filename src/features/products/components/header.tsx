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

export function Header({ onMenuPress }: HeaderProps) {
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

      <View >
        <Text style={styles.logoText}>People Made</Text>
      </View>

      <TouchableOpacity>
        <Text>     { }    </Text>
      </TouchableOpacity>
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
  logoBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs + 2,
    borderRadius: BORDER_RADIUS.md,
  },
  logoText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.overlay,
    fontFamily: FONTS.hero,
    letterSpacing: 0.8,
    textTransform: 'capitalize'
  },
  cartButton: {
    padding: SPACING.sm,
  },
  cartText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '500',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
})
