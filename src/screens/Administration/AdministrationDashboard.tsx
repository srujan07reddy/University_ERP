import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { Home, BarChart3, ClipboardList, Settings, User, MessageSquare, Shield, FileText, LogOut, Menu } from 'lucide-react-native';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';

import { AdministrationHomeTab } from './AdministrationHomeTab';
import { AdministrationAnalyticsTab } from './AdministrationAnalyticsTab';
import { AdministrationSurveysTab } from './AdministrationSurveysTab';
import { AdministrationComplianceTab } from './AdministrationComplianceTab';
import { AdministrationReportsTab } from './AdministrationReportsTab';
import { AdministrationSafeChatTab } from './AdministrationSafeChatTab';
import { AdministrationUsersTab } from './AdministrationUsersTab';
import { AdministrationSettingsTab } from './AdministrationSettingsTab';

export const AdministrationDashboard = () => {
  const { user, setUser } = useStore();
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const renderContent = () => {
    switch (activeTab) {
      case 'Analytics': return <AdministrationAnalyticsTab />;
      case 'Surveys': return <AdministrationSurveysTab />;
      case 'Compliance': return <AdministrationComplianceTab />;
      case 'Reports': return <AdministrationReportsTab />;
      case 'SafeChat': return <AdministrationSafeChatTab />;
      case 'Users': return <AdministrationUsersTab />;
      case 'Settings': return <AdministrationSettingsTab />;
      default: return <AdministrationHomeTab setMenuVisible={setMenuVisible} />;
    }
  };

  const menuItems = [
    { id: 'Home', icon: Home, label: 'Dashboard' },
    { id: 'Analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'Surveys', icon: ClipboardList, label: 'Surveys' },
    { id: 'Compliance', icon: Shield, label: 'Compliance Audit' },
    { id: 'Reports', icon: FileText, label: 'Reports' },
    { id: 'SafeChat', icon: MessageSquare, label: 'SafeChat' },
    { id: 'Users', icon: User, label: 'User Management' },
    { id: 'Settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        
        {/* Desktop Sidebar */}
        <View className="hidden md:flex w-72 bg-slate-900 border-r border-white/5 p-6 h-full">
          <View className="mb-8 px-2">
            <Text className="text-white font-bold text-xl">Administration</Text>
            <Text className="text-slate-400 text-xs mt-1">Institutional Governance</Text>
          </View>
          
          <View className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                onPress={() => setActiveTab(item.id)} 
                className={`p-4 rounded-2xl flex-row items-center transition-all ${activeTab === item.id ? 'bg-blue-600' : 'hover:bg-white/5'}`}
              >
                <item.icon color={activeTab === item.id ? 'white' : '#94a3b8'} size={20} />
                <Text className={`font-bold ml-4 ${activeTab === item.id ? 'text-white' : 'text-slate-400'}`}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity 
            onPress={() => setUser(null)} 
            className="p-4 rounded-2xl flex-row items-center mt-6 bg-red-500/10 border border-red-500/20"
          >
            <LogOut color="#ef4444" size={20} />
            <Text className="font-bold ml-4 text-red-400">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content Area */}
        <View style={{ flex: 1, overflow: 'hidden' }} className={`px-6 pt-6 ${Platform.OS === 'web' ? 'pb-6' : 'pb-32'}`}>
          {renderContent()}
        </View>

      </View>
      
      {/* Mobile Bottom Navigation */}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};
