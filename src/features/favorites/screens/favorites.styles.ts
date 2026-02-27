import { StyleSheet } from 'react-native'
import { COLORS, SPACING, FONT_SIZES, FONTS } from '@/shared/constants/theme'

export const favoritesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingBottom: SPACING.xl + 70,
  },
  columnWrapper: {
    paddingHorizontal: SPACING.sm,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.hero,
    fontFamily: FONTS.serif,
    color: COLORS.primary,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.secondary,
    marginTop: SPACING.xs,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: 100,
  },
  emptyHeart: {
    fontSize: 56,
    color: COLORS.border,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  emptyMessage: {
    fontSize: FONT_SIZES.md,
    color: COLORS.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
})
