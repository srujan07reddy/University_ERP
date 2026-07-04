import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { Home, MessageSquare, User, Settings } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useStore } from '../../store/useStore';

interface BottomNavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({ activeTab, setActiveTab }) => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const user = useStore((state) => state.user);

  const getDashboardStackName = (role?: string) => {
    switch (role) {
      case 'Admin': return 'AdminStack';
      case 'Finance': return 'FinanceStack';
      case 'Faculty': return 'FacultyStack';
      case 'Student': return 'StudentStack';
      case 'Parent': return 'ParentStack';
      case 'Chancellor': return 'ChancellorStack';
      case 'ViceChancellor': return 'VCStack';
      case 'Dean': return 'DeanStack';
      case 'Registrar': return 'RegistrarStack';
      case 'PlacementOfficer': return 'PlacementStack';
      case 'CoE': return 'CoEStack';
      case 'HoD': return 'HoDStack';
      case 'Admissions': return 'AdmissionsStack';
      default: return 'Login';
    }
  };

  if (Platform.OS === 'web') return null;

  const tabs = [
    { id: 'Home', icon: Home, label: 'Home', screen: 'Dashboard' },
    { id: 'Chat', icon: MessageSquare, label: 'SafeChat', screen: 'SafeChat' },
    { id: 'Profile', icon: User, label: 'Profile', screen: 'Profile' },
    { id: 'Settings', icon: Settings, label: 'Settings', screen: 'Settings' },
  ];

  const currentActiveTab = route.name === 'SafeChat' ? 'Chat' : (activeTab || 'Home');

  return (
    <View 
      className="absolute bottom-6 left-6 right-6 bg-[#1E293B]/80 border border-white/10 rounded-[32px] flex-row items-center justify-around py-4 px-2 backdrop-blur-2xl shadow-2xl z-50"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === currentActiveTab;
        return (
          <TouchableOpacity 
            key={tab.id}
            onPress={() => {
              if (tab.screen === 'SafeChat') {
                navigation.navigate('SafeChat');
              } else if (tab.id === 'Home') {
                if (route.name === 'SafeChat') {
                  navigation.navigate(getDashboardStackName(user?.role));
                } else if (setActiveTab) {
                  setActiveTab('Home');
                }
              } else {
                if (route.name === 'SafeChat') {
                  navigation.navigate(getDashboardStackName(user?.role));
                  setTimeout(() => {
                    if (setActiveTab) setActiveTab(tab.id);
                  }, 100);
                } else if (setActiveTab) {
                  setActiveTab(tab.id);
                }
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
