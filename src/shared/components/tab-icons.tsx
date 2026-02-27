import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type IconProps = {
  color: string
  size: number
}

export function HomeIcon({ color, size }: IconProps) {
  return (
    <View style={[styles.iconWrap, { width: size, height: size }]}>
      <View
        style={[
          {
            borderLeftWidth: size * 0.55,
            borderRightWidth: size * 0.55,
            borderBottomWidth: size * 0.4,
            borderBottomColor: color,
          },
          styles.homeTriangle,
        ]}
      />
      <View
        style={[
          {
            width: size * 0.7,
            height: size * 0.42,
            backgroundColor: color,
          },
          styles.homeBlock,
        ]}
      />
    </View>
  )
}

export function HeartIcon({
  color,
  size,
  filled,
}: IconProps & { filled: boolean }) {
  return (
    <Text style={{ fontSize: size * 0.9, color, lineHeight: size + 4 }}>
      {filled ? '\u2665' : '\u2661'}
    </Text>
  )
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  homeTriangle: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginBottom: -1,
  },
  homeBlock: {
    borderRadius: 2,
  },
})
