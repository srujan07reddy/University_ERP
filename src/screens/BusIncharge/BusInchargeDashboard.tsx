// Bus Incharge Dashboard
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Modal, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { 
  Users, Calendar, AlertCircle, Activity, ShieldCheck, Database, Wallet, Clock, MapPin, CheckCircle, 
  Layers, Search, LogOut, Menu, X, ClipboardList, BarChart3, Home, MessageSquare
} from 'lucide-react-native';

import { BusInchargeHomeTab } from './BusInchargeHomeTab';
import { BusInchargeAnalyticsTab } from './BusInchargeAnalyticsTab';
import { BusInchargeSurveysTab } from './BusInchargeSurveysTab';
import { BusInchargeCalendarTab } from './BusInchargeCalendarTab';
import { MessageCenter } from '../../components/Dashboard/MessageCenter';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';

export const BusInchargeDashboard = () => {
  const { user, setUser } = useStore();
  const [activeTab, setActiveTab] = useState('Home');
  const [menuVisible, setMenuVisible] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <BusInchargeHomeTab />;
      case 'Analytics':
        return <BusInchargeAnalyticsTab />;
      case 'Surveys':
        return <BusInchargeSurveysTab />;
      case 'Calendar':
        return <BusInchargeCalendarTab />;
      case 'SafeChat':
        return <MessageCenter />;
      default:
        return <BusInchargeHomeTab />;
    }
  };

  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  return (
    <Container style={{ flex: 1, backgroundColor: '#0F172A' } as any}>
      <View style={{ flex: 1, flexDirection: Platform.OS === 'web' ? 'row' : 'column' }}>
        
        {/* Web permanent sidebar - left side column */}
        {Platform.OS === 'web' && (
          <View style={{ width: 280, backgroundColor: '#0B0F19', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.08)', padding: 24, height: '100%', overflowY: 'auto' } as any}>
            <Text className="text-2xl font-bold text-white mb-6">Transport Desk</Text>
            <View className="space-y-4">
              <View>
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Fleet Management</Text>
                <View className="space-y-1">
                  {[
                    { id: 'Home', icon: Home, label: 'Live Tracking' },
                    { id: 'Analytics', icon: BarChart3, label: 'Analytics' },
                    { id: 'Calendar', icon: Calendar, label: 'Duty Rota' },
                    { id: 'Surveys', icon: ClipboardList, label: 'Feedback & Polls' },
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

        {/* Right content / workspace column */}
        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24, ...(Platform.OS === 'web' ? { overflowY: 'auto' } : {}) } as any}>
          {/* Mobile Header */}
          {Platform.OS !== 'web' && (
            <View className="flex-row justify-between items-center mb-6">
              <TouchableOpacity onPress={() => setMenuVisible(true)} className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <Menu color="white" size={20} />
              </TouchableOpacity>
              <Text className="text-white font-bold text-lg">Transport Panel</Text>
              <TouchableOpacity onPress={() => setUser(null)} className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20">
                <LogOut color="#ef4444" size={20} />
              </TouchableOpacity>
            </View>
          )}
          {renderContent()}
        </View>

        <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Mobile Menu Modal */}
        <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
          <View className="flex-1 bg-black/80 flex-row">
            <View className="w-72 bg-[#0F172A] p-8 border-r border-white/10">
              <View className="flex-row justify-between items-center mb-8">
                <Text className="text-2xl font-bold text-white">Menu</Text>
                <TouchableOpacity onPress={() => setMenuVisible(false)}>
                  <X color="white" size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View className="space-y-4">
                  {[
                    { id: 'Home', icon: Home, label: 'Live Tracking' },
                    { id: 'Analytics', icon: BarChart3, label: 'Analytics' },
                    { id: 'Calendar', icon: Calendar, label: 'Duty Rota' },
                    { id: 'Surveys', icon: ClipboardList, label: 'Feedback & Polls' },
                    { id: 'SafeChat', icon: MessageSquare, label: 'SafeChat' }
                  ].map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => { setActiveTab(item.id); setMenuVisible(false); }} className={`p-3 rounded-xl flex-row items-center ${activeTab === item.id ? 'bg-blue-600' : 'hover:bg-white/5'}`}>
                      <item.icon color={activeTab === item.id ? 'white' : '#94a3b8'} size={18} />
                      <Text className={`font-bold ml-3 text-xs ${activeTab === item.id ? 'text-white' : 'text-slate-400'}`}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity onPress={() => { setUser(null); setMenuVisible(false); }} className="p-4 rounded-xl flex-row items-center mt-4 bg-red-500/10 border border-red-500/20">
                    <LogOut color="#ef4444" size={18} />
                    <Text className="font-bold ml-3 text-xs text-red-400">Logout</Text>
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
