import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform, Modal } from 'react-native';
import { 
  FileCheck, Users, Search, FileText, Bell, ChevronRight, Database, LogOut, 
  Menu, X, Home, Settings, User, MessageSquare, BarChart3, ClipboardList, Calendar, ShieldAlert as Shield
} from 'lucide-react-native';
import { StatCard } from '../../components/Dashboard/StatCard';
import { useStore } from '../../store/useStore';
import { useScrollEvents } from '../../hooks/useScrollEvents';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { MessageCenter } from '../../components/Dashboard/MessageCenter';

import { RegistrarHomeTab } from './RegistrarHomeTab';

import { RegistrarAnalyticsTab } from './RegistrarAnalyticsTab';
import { RegistrarSurveysTab } from './RegistrarSurveysTab';
import { RegistrarCalendarTab } from './RegistrarCalendarTab';
export const RegistrarDashboard = () => {
  const { user, setUser } = useStore();
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  
  // Scroll event tracking
  const { handleScroll: handleMainScroll } = useScrollEvents();

  const renderContent = () => {
    switch (activeTab) {
      case 'SafeChat':
        return <MessageCenter />;
            default:
        return <RegistrarHomeTab setMenuVisible={setMenuVisible} />;
    }
  };

  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  return (
    <Container style={{ flex: 1, backgroundColor: '#0F172A' } as any}>
      <View style={{ flex: 1, flexDirection: Platform.OS === 'web' ? 'row' : 'column' }}>
        
        {/* Web permanent sidebar */}
        {Platform.OS === 'web' && (
          <View style={{ width: 280, backgroundColor: '#0B0F19', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.08)', padding: 24, height: '100%', overflowY: 'auto' } as any}>
            <Text className="text-2xl font-bold text-white mb-6">Registrar Office</Text>
            <View className="space-y-4">
              <View>
                <Text className="text-slate-505 text-[10px] font-bold uppercase tracking-widest mb-2">Administration</Text>
                <View className="space-y-1">
                  {[
                    { id: 'Home', icon: Home, label: 'Dashboard' },
                    { id: 'SafeChat', icon: MessageSquare, label: 'SafeChat' }
                  ].map((item) => (
                    <TouchableOpacity 
                      key={item.id} 
                      onPress={() => setActiveTab(item.id)} 
                      style={{ padding: 10, borderRadius: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: activeTab === item.id ? '#2563eb' : 'transparent', marginBottom: 2 }}
                    >
                      <item.icon color={activeTab === item.id ? 'white' : '#94a3b8'} size={16} />
                      <Text style={{ fontWeight: 'bold', marginLeft: 12, color: activeTab === item.id ? 'white' : '#94a3b8', fontSize: 12 }}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Workspace column */}
        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24, ...(Platform.OS === 'web' ? { overflowY: 'auto' } : {}) } as any}>
          {renderContent()}
        </View>

        <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Mobile Menu Modal */}
        <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
          <View className="flex-1 bg-black/80 flex-row">
            <View className="w-72 bg-[#0F172A] p-8 border-r border-white/10">
              <View className="flex-row justify-between items-center mb-8">
                <Text className="text-2xl font-bold text-white">Registrar Menu</Text>
                <TouchableOpacity onPress={() => setMenuVisible(false)}>
                  <X color="white" size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View className="space-y-2">
                  {[
                    { id: 'Home', icon: Home, label: 'Dashboard' },
                    { id: 'SafeChat', icon: MessageSquare, label: 'SafeChat' }
                  ].map((item) => (
                    <TouchableOpacity 
                      key={item.id} 
                      onPress={() => {
                        setActiveTab(item.id);
                        setMenuVisible(false);
                      }} 
                      className={`p-4 rounded-2xl flex-row items-center ${activeTab === item.id ? 'bg-blue-600' : 'hover:bg-white/5'}`}
                    >
                      <item.icon color={activeTab === item.id ? 'white' : '#94a3b8'} size={20} />
                      <Text className={`font-bold ml-4 ${activeTab === item.id ? 'text-white' : 'text-slate-400'}`}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                  
                  <TouchableOpacity 
                    onPress={() => { setUser(null); setMenuVisible(false); }} 
                    className="p-4 rounded-2xl flex-row items-center mt-6 bg-red-500/10 border border-red-500/20"
                  >
                    <LogOut color="#ef4444" size={20} />
                    <Text className="font-bold ml-4 text-red-400">Logout</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            <TouchableOpacity className="flex-1" onPress={() => setMenuVisible(false)} />
          </View>
        </Modal>

      </View>
    </Container>
  );
};
