import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { Home, MessageSquare, User, Settings, Bell } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export const BottomNavbar = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const tabs = [
    { id: 'Home', icon: Home, label: 'Home', screen: 'Dashboard' },
    { id: 'Chat', icon: MessageSquare, label: 'SafeChat', screen: 'SafeChat' },
    { id: 'Profile', icon: User, label: 'Profile', screen: 'Profile' },
    { id: 'Settings', icon: Settings, label: 'Settings', screen: 'Settings' },
  ];

  return (
    <View 
      className="absolute bottom-6 left-6 right-6 bg-[#1E293B]/80 border border-white/10 rounded-[32px] flex-row items-center justify-around py-4 px-2 backdrop-blur-2xl shadow-2xl"
      style={Platform.OS === 'web' ? { maxWidth: 600, alignSelf: 'center', bottom: 20 } : {}}
    >
      {tabs.map((tab) => {
        const isActive = false; // We will handle this logic if we use tabs properly
        return (
          <TouchableOpacity 
            key={tab.id}
            onPress={() => {
                if (tab.screen === 'SafeChat') {
                    navigation.navigate('SafeChat');
                } else {
                    // For now, these are placeholders or navigate back to dashboard
                }
            }}
            className="items-center px-4"
          >
            <View className={`p-2 rounded-2xl ${isActive ? 'bg-blue-600' : ''}`}>
              <tab.icon color={isActive ? 'white' : '#94a3b8'} size={24} />
            </View>
            <Text className={`text-[8px] font-bold mt-1 ${isActive ? 'text-blue-400' : 'text-slate-500'}`}>
              {tab.label.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
