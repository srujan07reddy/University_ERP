import React from 'react';
import { View, Text } from 'react-native';
import { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';

export const AdministrationSettingsTab = () => (
  <GlobalScrollView>
    <View className="flex-1 items-center justify-center py-20">
      <Text className="text-white text-2xl font-bold">System Settings</Text>
      <Text className="text-slate-400 mt-2">Global ERP configuration settings coming soon.</Text>
    </View>
  </GlobalScrollView>
);
