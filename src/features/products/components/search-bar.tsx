import React from 'react'
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from 'react-native'
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
} from '@/shared/constants/theme'
import SearchIcon from '@public/assets/search.svg'
import { SearchBarProps } from '../types/products-types'


export function SearchBar({
  value,
  onChangeText,
  placeholder = 'What are you looking for?',
  onSearchPress,
}: SearchBarProps) {
  const hasText = value.trim().length > 0

  const handleButtonPress = () => {
    if (hasText) {
      onChangeText('')
    } else {
      onSearchPress?.()
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.secondary}
      />

      {hasText ? (
        <TouchableOpacity onPress={handleButtonPress} activeOpacity={0.6} style={styles.clearButton}>
          <Text style={styles.clearIcon}>✕</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: COLORS.overlay }]}
          onPress={handleButtonPress}
          activeOpacity={0.8}
        >
          <SearchIcon width={20} height={20} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.full,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    paddingLeft: SPACING.lg,
    paddingRight: SPACING.sm,
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    paddingVertical: 0,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    gap: 4,
  },
  filterText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.primary,
  },
  chevron: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
  },
  searchButton: {
    width: 42,
    height: 42,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
  },
  clearButton: {
    paddingHorizontal: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  clearIcon: {
    fontSize: FONT_SIZES.md,
    color: COLORS.secondary,
    fontWeight: '700',
    lineHeight: 20,
  },
})


