import { Linking } from "react-native";
import { MMKV } from "react-native-mmkv";

let TOKEN = "token";
let USER = "user";

export const storage = new MMKV();

export function getItem<T>(key: string): T {
  const value = storage.getString(key);

  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.delete(key);
}

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

export const getToken = () => getItem(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: string) => setItem<string>(TOKEN, value);

export const getUserFromLocalStorage = () => getItem(USER);
export const removeUserFromLocalStorage = () => removeItem(USER);
export const setUserToLocalStorage = (value: any) => setItem<any>(USER, value);
