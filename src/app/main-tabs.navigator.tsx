import React from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HomeNavigator } from './home.navigator'
import { FavoritesScreen } from '@/features/favorites/screens/favorites.screen'
import { HomeIcon, HeartIcon } from '@/shared/components/tab-icons'
import { useTabBarVisibility } from '@/shared/contexts/tab-bar-visibility'
import { COLORS, SPACING, FONT_SIZES } from '@/shared/constants/theme'

export type MainTabParamList = {
  HomeTab: undefined
  FavoritesTab: undefined
}

const Tab = createBottomTabNavigator<MainTabParamList>()

const TAB_BAR_HEIGHT = 56

function AnimatedTabBar({ state, descriptors, navigation }: any) {
  const { translateY } = useTabBarVisibility()
  const insets = useSafeAreaInsets()
  const totalHeight = TAB_BAR_HEIGHT + insets.bottom

  return (
    <Animated.View
      style={[
        styles.tabBar,
        {
          height: totalHeight,
          paddingBottom: insets.bottom,
          transform: [{ translateY }],
        },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index
        const label = options.title || route.name
        const color = isFocused ? COLORS.primary : COLORS.secondary

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={onPress}
            activeOpacity={0.7}
          >
            {route.name === 'HomeTab' ? (
              <HomeIcon color={color} size={22} />
            ) : (
              <HeartIcon color={color} size={22} filled={isFocused} />
            )}
            <Text style={[styles.tabLabel, { color }]}>
              {label}
            </Text>
            {isFocused && <View style={styles.indicator} />}
          </TouchableOpacity>
        )
      })}
    </Animated.View>
  )
}

export function MainTabsNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{ title: 'Favorites' }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.sm,
    gap: 3,
  },
  tabLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '500',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    width: 24,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: COLORS.accent,
  },
})
