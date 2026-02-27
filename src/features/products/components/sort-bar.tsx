import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, SPACING, FONT_SIZES } from '@/shared/constants/theme'
import { SortBarProps } from '../types/products-types'

export function SortBar({ onSortPress }: SortBarProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sortButton} onPress={onSortPress}>
        <View style={styles.sortIcon}>
          <View style={[styles.sortLine, styles.sortLineLong]} />
          <View style={[styles.sortLine, styles.sortLineMedium]} />
          <View style={[styles.sortLine, styles.sortLineShort]} />
        </View>
        <Text style={styles.sortText}>Sort By</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  sortIcon: {
    gap: 3,
  },
  sortLine: {
    height: 1.5,
    backgroundColor: COLORS.primary,
    borderRadius: 1,
  },
  sortLineLong: {
    width: 16,
  },
  sortLineMedium: {
    width: 12,
  },
  sortLineShort: {
    width: 8,
  },
  sortText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
  },
})
