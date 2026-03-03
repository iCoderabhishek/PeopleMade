import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import { COLORS, BORDER_RADIUS } from '@/shared/constants/theme'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

type BottomSheetProps = {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  height?: number
}

export function BottomSheet({
  visible,
  onClose,
  children,
  height = SCREEN_HEIGHT * 0.92,
}: BottomSheetProps) {
  const sheetRef = useRef<GorhomBottomSheet>(null)
  const snapPoints = useMemo(() => [height], [height])

  useEffect(() => {
    if (visible) {
      sheetRef.current?.expand()
    } else {
      sheetRef.current?.close()
    }
  }, [visible])

  const handleChange = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose()
      }
    },
    [onClose],
  )

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  )

  if (!visible) return null

  return (
    <GorhomBottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleChange}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handle}
      backgroundStyle={styles.background}
    >
      <BottomSheetScrollView style={styles.content}>
        {children}
      </BottomSheetScrollView>
    </GorhomBottomSheet>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.border,
  },
  content: {
    flex: 1,
  },
})

