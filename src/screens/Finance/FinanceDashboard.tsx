import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { 
  DollarSign, 
  CreditCard, 
  FileText, 
  TrendingUp, 
  Bell, 
  ChevronRight, 
  Wallet, 
  PieChart, 
  AlertCircle, 
  LogOut, 
  Menu, X, Home, Settings, User, MessageSquare, BarChart3, ClipboardList, Calendar, Clock, Users, CheckCircle
} from 'lucide-react-native';
import { StatCard } from '../../components/Dashboard/StatCard';
import { useStore } from '../../store/useStore';
import { useScrollEvents } from '../../hooks/useScrollEvents';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { AnalyticsView } from '../../components/Dashboard/AnalyticsView';
import { SurveyView } from '../../components/Dashboard/SurveyView';
import { CalendarView } from '../../components/Dashboard/CalendarView';
import { Modal, Alert } from 'react-native';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';

const { width } = Dimensions.get('window');

import { FinanceHomeTab } from './FinanceHomeTab';

import { FinanceAnalyticsTab } from './FinanceAnalyticsTab';
import { FinanceSurveysTab } from './FinanceSurveysTab';
import { FinanceCalendarTab } from './FinanceCalendarTab';
import { FinanceApprovalsTab } from './FinanceApprovalsTab';
export const FinanceDashboard = () => {
  const { user, setUser } = useStore();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('Home');
  
  // Scroll event tracking
  const { handleScroll: handleMainScroll } = useScrollEvents();

  const renderContent = () => {
    switch (activeTab) {
      case 'Approvals':
        return <FinanceApprovalsTab />;
      case 'Analytics':
        return <FinanceAnalyticsTab />;
      case 'Surveys':
        return <FinanceSurveysTab />;
      case 'Calendar':
        return <FinanceCalendarTab />;
            default:
        return <FinanceHomeTab setMenuVisible={setMenuVisible} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24, ...(Platform.OS === 'web' ? { overflowY: 'auto' } : {}) } as any}>
          {renderContent()}
        </View>
        <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Mobile Menu Modal */}
        <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
          <View className="flex-1 bg-black/80 flex-row">
            <View className="w-72 bg-[#0F172A] p-8 border-r border-white/10">
              <View className="flex-row justify-between items-center mb-10">
                <Text className="text-2xl font-bold text-white">Finance Menu</Text>
                <TouchableOpacity onPress={() => setMenuVisible(false)}>
                  <X color="white" size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View className="space-y-2">
                  {[
                    { id: 'Home', icon: Home, label: 'Dashboard' },
                    { id: 'Approvals', icon: CheckCircle, label: 'Approvals Desk' },
                    { id: 'Analytics', icon: BarChart3, label: 'Analytics' },
                    { id: 'Surveys', icon: ClipboardList, label: 'Surveys' },
                    { id: 'Calendar', icon: Calendar, label: 'Calendar' },
                    { id: 'Revenue', icon: DollarSign, label: 'Revenue Streams' },
                    { id: 'Payroll', icon: CreditCard, label: 'Payroll Center' },
                    { id: 'Audit', icon: FileText, label: 'Financial Audit' },
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
