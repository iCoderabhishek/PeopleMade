import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '@/shared/hooks/use-redux';
import { AuthNavigator } from './auth.navigator';
import { MainTabsNavigator } from './main-tabs.navigator';

type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, animation: 'none' }}
      initialRouteName={isLoggedIn ? 'Main' : 'Auth'}
    >
      {isLoggedIn ? (
        <RootStack.Screen name="Main" component={MainTabsNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
}
