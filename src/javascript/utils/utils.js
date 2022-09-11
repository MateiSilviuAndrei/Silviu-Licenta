import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp} from '@react-navigation/native';
import {Linking} from 'react-native';

/**
 * Set a key in AsyncStorage
 * @param key {String}
 * @param value {String}
 * @returns {Promise}
 */
export const setKeyInStorage = async (key, value) => {
  return AsyncStorage.setItem(key, value);
};

/**
 * Sets multiple keys in AsyncStorage
 * @param values {Array}
 * @returns {Promise}
 */
export const setMultipleKeysInStorage = async values => {
  return AsyncStorage.multiSet(values);
};

/**
 * Gets multiple keys from AsyncStorage
 * @param keys {Array}
 * @returns {Promise}
 */
export const getMultipleKeysFromStorage = async keys => {
  return AsyncStorage.multiGet(keys);
};

/**
 * Get a key from AsyncStorage
 * @param key {String}
 * @returns {Promise}
 */
export const getKeyFromStorage = async key => {
  return AsyncStorage.getItem(key);
};

/**
 * Remove a key from AsyncStorage
 * @param key {String}
 * @returns {Promise}
 */
export const removeKeyFromStorage = async key => {
  return AsyncStorage.removeItem(key);
};

/**
 * Clear AsyncStorage
 * @returns {Promise}
 */
export const clearStorage = async () => {
  return AsyncStorage.clear();
};
