// Mess Incharge Dashboard Wrapper
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform, ScrollView } from 'react-native';
import { useStore } from '../../store/useStore';
import MessInchargeHomeTab from './MessInchargeHomeTab';
import MessInchargeLogsTab from './MessInchargeLogsTab';
import MessInchargeFeedbackTab from './MessInchargeFeedbackTab';
import { MessageCenter } from '../../components/Dashboard/MessageCenter';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { 
  Users, LogOut, FileText, MessageSquare, ClipboardList
} from 'lucide-react-native';

export const MessInchargeDashboard = () => {
  const { user, setUser } = useStore();
  const [activeTab, setActiveTab] = useState('Home');

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <MessInchargeHomeTab />;
      case 'Log Manager':
        return <MessInchargeLogsTab />;
      case 'Feedback & Reviews':
        return <MessInchargeFeedbackTab />;
      case 'SafeChat':
        return <MessageCenter />;
      default:
        return <MessInchargeHomeTab />;
    }
  };

  const menuItems = [
    { name: 'Home', icon: Users },
    { name: 'Log Manager', icon: ClipboardList },
    { name: 'Feedback & Reviews', icon: FileText },
    { name: 'SafeChat', icon: MessageSquare },
  ];

  return (
    <View className="flex-1 bg-[#0F172A]">
      {/* Header */}
      <View className="bg-slate-900 border-b border-white/5 px-8 py-5 flex-row justify-between items-center">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-500/30 items-center justify-center">
            <ClipboardList color="#f97316" size={20} />
          </View>
          <View>
            <Text className="text-white font-bold text-lg">Jeppiaar Mess Portal</Text>
            <Text className="text-slate-500 text-xs">Mess Incharge Console</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-4">
          <View className="items-end hidden md:flex">
            <Text className="text-white font-semibold text-sm">{user?.name}</Text>
            <Text className="text-orange-400 font-bold text-[10px] tracking-wider uppercase">{user?.role}</Text>
          </View>
          <TouchableOpacity 
            onPress={() => setUser(null)}
            className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl"
          >
            <LogOut color="#f87171" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Body */}
      <View className="flex-1 flex-row">
        {/* Sidebar for Desktop */}
        <View className="hidden md:flex w-72 bg-slate-900/50 border-r border-white/5 p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <TouchableOpacity
                key={item.name}
                onPress={() => setActiveTab(item.name)}
                className={`flex-row items-center px-4 py-3.5 rounded-2xl transition-all ${
                  isActive ? 'bg-orange-600 text-white' : 'hover:bg-white/5 text-slate-400'
                }`}
              >
                <Icon color={isActive ? 'white' : '#94a3b8'} size={20} />
                <Text className={`font-bold ml-3 text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Content Area */}
        <ScrollView className="flex-1 p-8" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
          {renderContent()}
        </ScrollView>
      </View>

      {/* Mobile Navbar */}
      <View className="md:hidden">
        <BottomNavbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </View>
    </View>
  );
};
