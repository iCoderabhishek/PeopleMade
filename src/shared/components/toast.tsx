import React, { createContext, useContext, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Toast, { BaseToastProps } from 'react-native-toast-message'
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/shared/constants/theme'

type ToastType = 'error' | 'success'

type ToastOptions = {
  type?: ToastType
  actionLabel?: string
  onAction?: () => void
}

type ToastContextType = {
  showToast: (message: string, options?: ToastOptions) => void
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => { },
})

export function useToast() {
  return useContext(ToastContext)
}

// Custom internal component to render the toast with the action button
const CustomToast = ({
  text1,
  props,
  type,
}: BaseToastProps & { type: ToastType; props: { actionLabel?: string; onAction?: () => void; hide: () => void } }) => {
  const bgColor = type === 'error' ? COLORS.primary : '#2E7D32'
  const accentBar = type === 'error' ? COLORS.error : '#66BB6A'

  const handleAction = () => {
    props.onAction?.()
    props.hide()
  }

  return (
    <View style={[toastStyles.toast, { backgroundColor: bgColor }]}>
      <View style={[toastStyles.accentBar, { backgroundColor: accentBar }]} />
      <Text style={toastStyles.message}>{text1}</Text>
      {props.actionLabel && (
        <TouchableOpacity onPress={handleAction} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={toastStyles.actionText}>{props.actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const toastConfig = {
  error: (props: any) => <CustomToast {...props} type="error" />,
  success: (props: any) => <CustomToast {...props} type="success" />,
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const showToast = useCallback((message: string, options?: ToastOptions) => {
    Toast.show({
      type: options?.type || 'error',
      text1: message,
      position: 'top',
      visibilityTime: 3000,
      topOffset: SPACING.xl,
      props: {
        actionLabel: options?.actionLabel,
        onAction: options?.onAction,
        hide: () => Toast.hide(),
      },
    })
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast config={toastConfig} />
    </ToastContext.Provider>
  )
}

const toastStyles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderBottomLeftRadius: BORDER_RADIUS.md,
  },
  message: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.white,
    marginLeft: SPACING.sm,
  },
  actionText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.accent,
    marginLeft: SPACING.md,
  },
})

