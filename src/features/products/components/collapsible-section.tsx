import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { COLORS, SPACING, FONT_SIZES } from '@/shared/constants/theme'
import { CollapsibleSectionProps } from '../types/products-types'

export function CollapsibleSection({
  title,
  children,
}: CollapsibleSectionProps) {
  const [expanded, setExpanded] = useState(false)
  const rotation = useRef(new Animated.Value(0)).current

  const toggle = () => {
    const toValue = expanded ? 0 : 1

    Animated.timing(rotation, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start()

    setExpanded(!expanded)
  }

  const rotateZ = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  })

  return (
    <View style={styles.container}>
      <View style={styles.separator} />

      <TouchableOpacity
        style={styles.header}
        onPress={toggle}
        activeOpacity={0.7}
      >
        <Text style={styles.title}>{title}</Text>
        <Animated.Text style={[styles.icon, { transform: [{ rotateZ }] }]}>
          +
        </Animated.Text>
      </TouchableOpacity>

      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  icon: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.primary,
    fontWeight: '300',
  },
  content: {
    paddingBottom: SPACING.md,
  },
})
