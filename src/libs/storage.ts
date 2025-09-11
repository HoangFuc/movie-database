import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

export const STORAGE_KEYS = {
  category: 'md.category',
  sortBy: 'md.sortBy',
}

export const saveString = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    Alert.alert("Error", "Error when saving")
  }
}

export const getString = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value ?? null
  } catch (error) {
    Alert.alert("Error", "Error when get storage")
    return null
  }
}


