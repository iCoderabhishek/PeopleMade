import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import { store } from '../redux/store';
import { AppNavigator } from '../app/navigation';
import { TabBarVisibilityProvider } from '@/shared/contexts/tab-bar-visibility';
import { ToastProvider } from '@/shared/components/toast';
import { restoreAuth } from '../redux/slices/auth.slice';
import { restoreFavorites } from '../redux/slices/favorites.slice';

enableScreens();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function hydrate() {
      try {
        const authData = await AsyncStorage.getItem('auth');
        const favoritesData = await AsyncStorage.getItem('favorites');

        if (authData) {
          store.dispatch(restoreAuth(JSON.parse(authData)));
        }
        if (favoritesData) {
          store.dispatch(restoreFavorites(JSON.parse(favoritesData)));
        }
      } catch (e) {
        console.error('Failed to hydrate state', e);
      } finally {
        setIsReady(true);
      }
    }

    hydrate();

    // Persist state on changes
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      AsyncStorage.setItem(
        'auth',
        JSON.stringify({
          isLoggedIn: state.auth.isLoggedIn,
          user: state.auth.user,
          token: state.auth.token,
        })
      );
      AsyncStorage.setItem('favorites', JSON.stringify(state.favorites.items));
    });

    return unsubscribe;
  }, []);

  if (!isReady) {
    return null; // Ensure we block rendering navigators until hydrated
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={'light-content'} />
        <ToastProvider>
          <TabBarVisibilityProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </TabBarVisibilityProvider>
        </ToastProvider>
      </SafeAreaProvider>
    </Provider>
  );
}