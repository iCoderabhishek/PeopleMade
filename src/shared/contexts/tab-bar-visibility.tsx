import React, { createContext, useContext, useRef, useMemo } from 'react'
import { Animated } from 'react-native'

type TabBarVisibilityContextType = {
  translateY: Animated.Value
  hide: () => void
  show: () => void
}

const TabBarVisibilityContext =
  createContext<TabBarVisibilityContextType | null>(null)

export function TabBarVisibilityProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const translateY = useRef(new Animated.Value(0)).current

  const actions = useMemo(
    () => ({
      translateY,
      hide: () => {
        Animated.spring(translateY, {
          toValue: 100,
          useNativeDriver: true,
          damping: 18,
          stiffness: 180,
        }).start()
      },
      show: () => {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 18,
          stiffness: 180,
        }).start()
      },
    }),
    [translateY],
  )

  return (
    <TabBarVisibilityContext.Provider value={actions}>
      {children}
    </TabBarVisibilityContext.Provider>
  )
}

export function useTabBarVisibility() {
  const context = useContext(TabBarVisibilityContext)
  if (!context) {
    throw new Error(
      'useTabBarVisibility must be used within TabBarVisibilityProvider',
    )
  }
  return context
}
