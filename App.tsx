import 'react-native-gesture-handler';
import "./global.css";
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, height: Platform.OS === 'web' ? '100vh' : '100%' } as any}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <RootNavigator />
        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
