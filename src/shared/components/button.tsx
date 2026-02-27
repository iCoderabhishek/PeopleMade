import React from 'react'
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { COLORS, FONT_SIZES, BORDER_RADIUS } from '@/shared/constants/theme'

type ButtonVariant = 'primary' | 'secondary' | 'outline'

type ButtonProps = TouchableOpacityProps & {
  label: string
  variant?: ButtonVariant
  loading?: boolean
}

export function Button({
  label,
  variant = 'primary',
  loading: isLoading,
  style,
  disabled,
  ...rest
}: ButtonProps) {
  const variantStyle = variantStyles[variant]
  const isDisabled = disabled || isLoading

  return (
    <TouchableOpacity
      style={[
        buttonStyles.base,
        variantStyle.container,
        isDisabled && buttonStyles.disabled,
        style,
      ]}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={variantStyle.loaderColor} />
      ) : (
        <Text style={[buttonStyles.label, variantStyle.label]}>{label}</Text>
      )}
    </TouchableOpacity>
  )
}

const buttonStyles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
})

const variantStyles = {
  primary: {
    container: { backgroundColor: COLORS.accent } as const,
    label: { color: COLORS.primary } as const,
    loaderColor: COLORS.primary,
  },
  secondary: {
    container: { backgroundColor: COLORS.primary } as const,
    label: { color: COLORS.white } as const,
    loaderColor: COLORS.white,
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: COLORS.primary,
    } as const,
    label: { color: COLORS.primary } as const,
    loaderColor: COLORS.primary,
  },
}
