import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS, SPACING, FONT_SIZES, FONTS } from '@/shared/constants/theme'

export function HeroSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Creative tools for{'\n'}endless imagination
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl + 8,
    backgroundColor: COLORS.surfaceAlt,
  },
  title: {
    fontSize: FONT_SIZES.hero,
    fontFamily: FONTS.serif,
    color: COLORS.primary,
    lineHeight: 44,
    textAlign: 'center',
  },
})
