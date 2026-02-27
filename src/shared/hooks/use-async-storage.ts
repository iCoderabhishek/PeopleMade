import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage(key: string) {
  const get = async () => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  const set = async (value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  const remove = async () => {
    await AsyncStorage.removeItem(key);
  };

  return { get, set, remove };
}