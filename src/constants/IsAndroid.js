import { Platform } from "react-native";

export const isAndroid = Platform.OS === 'android' && Platform.Version >= 21;
