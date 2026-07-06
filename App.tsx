import 'react-native-gesture-handler';
import "./global.css";
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  const { height } = useWindowDimensions();
  return (
    <GestureHandlerRootView
      style={[
        { flex: 1 },
        Platform.OS === 'web' ? { height } : undefined,
      ]}
    >
      <SafeAreaProvider>
        <RootNavigator />
        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
