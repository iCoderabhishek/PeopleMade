import { StyleSheet, Dimensions } from 'react-native'
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONTS,
  BORDER_RADIUS,
} from '@/shared/constants/theme'

// Input, button, and error styles live in @/shared/components/input-field and @/shared/components/button

const { width, height } = Dimensions.get('window')

export const loginStyles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundImage: {
    width,
    height: height * 0.42,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 26, 26, 0.3)',
  },
  brandContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    // backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.xl + 8,
    paddingVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.md,
  },
  logoText: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '700',
    color: COLORS.overlay,
    fontFamily: FONTS.hero,
    letterSpacing: 0.8,
    textTransform: 'capitalize'
  },
  tagline: {
    fontSize: FONT_SIZES.md,
    color: COLORS.secondary,
    marginTop: SPACING.xs,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  formContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    marginTop: -24,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl + 8,
    paddingBottom: SPACING.xxl,
  },
  welcomeText: {
    fontSize: FONT_SIZES.hero,
    fontFamily: FONTS.bold,
    fontWeight: '900',
    color: COLORS.chrome,
    lineHeight: 40,
  },
  subtitleText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.secondary,
    marginBottom: SPACING.xxl,
  },
  submitButton: {
    marginTop: SPACING.xl,
  },
})
