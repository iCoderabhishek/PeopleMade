import { StyleSheet } from 'react-native'
import { COLORS, SPACING } from '@/shared/constants/theme'

export const homeStyles = StyleSheet.create({
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: SPACING.xxl,
  },
})
