import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, Platform, ScrollView } from 'react-native';

import { 
  Bell, 
  ChevronRight, 
  GraduationCap, 
  Clock, 
  CreditCard, 
  AlertCircle, 
  FileText, 
  ShieldCheck, 
  LogOut, 
  Menu, X, Home, Settings, User, MessageSquare, BarChart3, ClipboardList, Calendar
} from 'lucide-react-native';
import { StatCard } from '../../components/Dashboard/StatCard';
import { useStore } from '../../store/useStore';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { AnalyticsView } from '../../components/Dashboard/AnalyticsView';
import { SurveyView } from '../../components/Dashboard/SurveyView';
import { CalendarView } from '../../components/Dashboard/CalendarView';
import { Modal } from 'react-native';

const { width } = Dimensions.get('window');

import { ParentHomeTab } from './ParentHomeTab';

import { ParentAnalyticsTab } from './ParentAnalyticsTab';
import { ParentSurveysTab } from './ParentSurveysTab';
import { ParentCalendarTab } from './ParentCalendarTab';
export const ParentDashboard = () => {
  const { user, setUser } = useStore();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('Home');
  
  // Scroll event tracking

  const renderContent = () => {
    switch (activeTab) {
      case 'Analytics':
        return <ParentAnalyticsTab />;
      case 'Surveys':
        return <ParentSurveysTab />;
      case 'Calendar':
        return <ParentCalendarTab />;
            default:
        return <ParentHomeTab />;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, overflow: 'hidden' }} className="px-6 pt-6 pb-32">
          {renderContent()}
        </View>
        <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Mobile Menu Modal */}
        <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
          <View className="flex-1 bg-black/80 flex-row">
            <View className="w-72 bg-[#0F172A] p-8 border-r border-white/10">
              <View className="flex-row justify-between items-center mb-10">
                <Text className="text-2xl font-bold text-white">Parent Menu</Text>
                <TouchableOpacity onPress={() => setMenuVisible(false)}>
                  <X color="white" size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} keyboardShouldPersistTaps="handled">
                <View className="space-y-2">
                  {[
                    { id: 'Home', icon: Home, label: 'Dashboard' },
                    { id: 'Analytics', icon: BarChart3, label: 'Analytics' },
                    { id: 'Surveys', icon: ClipboardList, label: 'Surveys' },
                    { id: 'Calendar', icon: Calendar, label: 'Calendar' },
                    { id: 'Academic', icon: GraduationCap, label: 'Child Performance' },
                    { id: 'Attendance', icon: Clock, label: 'Attendance Logs' },
                    { id: 'SafeChat', icon: MessageSquare, label: 'SafeChat' },
                    { id: 'Profile', icon: User, label: 'Profile' },
                    { id: 'Settings', icon: Settings, label: 'Settings' },
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
    </SafeAreaView>
  );
};
