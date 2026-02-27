import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS, SPACING, FONT_SIZES } from '@/shared/constants/theme'
import { Button } from './button'

type ErrorStateProps = {
  message?: string
  onRetry: () => void
}

export function ErrorState({
  message = 'Something went wrong',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>!</Text>
      <Text style={styles.message}>{message}</Text>
      <Button label="Retry" variant="outline" onPress={onRetry} style={styles.button} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
  },
  icon: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.error,
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COLORS.error,
    textAlign: 'center',
    lineHeight: 52,
    marginBottom: SPACING.md,
  },
  message: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  button: {
    paddingHorizontal: SPACING.xl,
    minWidth: 140,
  },
})
