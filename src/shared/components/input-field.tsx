import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/shared/constants/theme'

import UserSvg from '@public/assets/user.svg'
import PasswordSvg from '@public/assets/password.svg'
import EyeOpenedSvg from '@public/assets/eye-opened.svg'
import EyeClosedSvg from '@public/assets/eye-closed.svg'

// ---------------------------------------------------------------------------
// InputField
// ---------------------------------------------------------------------------

type InputFieldVariant = 'username' | 'password' | 'default'

type InputFieldProps = TextInputProps & {
  variant?: InputFieldVariant
  error?: string
  icon?: React.ReactNode
  suffix?: React.ReactNode
}

const ICON_SIZE = 20
const EYE_SIZE = 22

function VariantIcon({ variant }: { variant: InputFieldVariant }) {
  if (variant === 'username') return <UserSvg width={ICON_SIZE} height={ICON_SIZE} stroke={COLORS.secondary} />
  if (variant === 'password') return <PasswordSvg width={ICON_SIZE} height={ICON_SIZE} stroke={COLORS.secondary} />
  return null
}

export function InputField({
  variant = 'default',
  error,
  icon,
  suffix,
  onFocus,
  onBlur,
  ...inputProps
}: InputFieldProps) {
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = variant === 'password'

  const resolvedIcon = icon ?? <VariantIcon variant={variant} />
  const resolvedSuffix = isPassword ? (
    <TouchableOpacity
      onPress={() => setShowPassword((prev) => !prev)}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      {showPassword
        ? <EyeOpenedSvg width={EYE_SIZE} height={EYE_SIZE} stroke={COLORS.secondary} />
        : <EyeClosedSvg width={EYE_SIZE} height={EYE_SIZE} stroke={COLORS.secondary} />
      }
    </TouchableOpacity>
  ) : suffix

  const resolvedPlaceholder =
    inputProps.placeholder ??
    (variant === 'username' ? 'Username' : variant === 'password' ? 'Password' : undefined)

  return (
    <View>
      <View
        style={[
          inputFieldStyles.wrapper,
          focused && inputFieldStyles.wrapperFocused,
          !!error && inputFieldStyles.wrapperError,
        ]}
      >
        <View style={inputFieldStyles.iconWrapper}>{resolvedIcon}</View>
        <TextInput
          style={inputFieldStyles.input}
          placeholderTextColor={COLORS.secondary}
          autoCapitalize="none"
          placeholder={resolvedPlaceholder}
          {...(isPassword && { secureTextEntry: !showPassword })}
          {...(variant === 'username' && { autoCorrect: false })}
          {...inputProps}
          onFocus={(e) => {
            setFocused(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
          }}
        />
        {resolvedSuffix}
      </View>
      {!!error && <Text style={inputFieldStyles.error}>{error}</Text>}
    </View>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const inputFieldStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 56,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md + 4,
  },
  wrapperFocused: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.background,
  },
  wrapperError: {
    borderColor: COLORS.error,
  },
  iconWrapper: {
    marginRight: SPACING.sm + 4,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.lg,
    color: COLORS.primary,
    height: '100%',
    padding: 0,
  },
  error: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
    marginTop: -SPACING.sm,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.lg,
  },
})
