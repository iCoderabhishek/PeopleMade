import { Platform } from 'react-native'

export const COLORS = {
  primary: '#1A1A1A',
  secondary: '#6B6B6B',
  accent: '#EEC040',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  surfaceAlt: '#FAF8F5',
  border: '#E8E8E8',
  white: '#FFFFFF',
  black: '#000000',
  chrome: '#343131',
  overlay: 'rgba(0, 0, 0, 0.5)',
  error: '#E53935',
} as const

export const FONTS = {
  regular: Platform.select({ ios: 'System', android: 'Roboto' }) as string,
  medium: Platform.select({ ios: 'System', android: 'Roboto' }) as string,
  bold: Platform.select({ ios: 'System', android: 'Roboto' }) as string,
  serif: Platform.select({ ios: 'Georgia', android: 'serif' }) as string,
  mono: Platform.select({ ios: 'Courier', android: 'monospace' }) as string,
  hero: Platform.select({ ios: 'Georgia', android: 'serif' }) as string,
}

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 30,
  hero: 32,
  hero2: 36,
} as const

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 999,
} as const
