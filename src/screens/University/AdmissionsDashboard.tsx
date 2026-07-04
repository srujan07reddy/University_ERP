import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { 
  Users, 
  UserPlus, 
  FileText, 
  TrendingUp, 
  Bell, 
  ChevronRight,
  ClipboardCheck,
  Search,
  CheckCircle2,
  LogOut,
  Menu, X, Home, Settings, User, MessageSquare, BarChart3, ClipboardList, Calendar
} from 'lucide-react-native';
import { StatCard } from '../../components/Dashboard/StatCard';
import { useStore } from '../../store/useStore';
import { useScrollEvents } from '../../hooks/useScrollEvents';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { AnalyticsView } from '../../components/Dashboard/AnalyticsView';
import { SurveyView } from '../../components/Dashboard/SurveyView';
import { CalendarView } from '../../components/Dashboard/CalendarView';
import { Modal } from 'react-native';

export const AdmissionsDashboard = () => {
  const { user, setUser } = useStore();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('Home');  
  // Scroll event tracking
  const { handleScroll: handleMainScroll } = useScrollEvents();
  const renderContent = () => {
    switch (activeTab) {
      case 'Analytics':
        return <AnalyticsView role="Admissions Officer" />;
      case 'Surveys':
        return <SurveyView role="Admissions Officer" />;
      case 'Calendar':
        return <CalendarView role="Admissions Officer" />;
      default:
        return (
          <>
            {/* Header */}
            <View className="flex-row justify-between items-center mb-8">
              <View className="flex-row items-center">
                <TouchableOpacity 
                  onPress={() => setMenuVisible(true)}
                  className="bg-white/5 p-3 rounded-2xl border border-white/10 mr-4"
                >
                  <Menu color="white" size={20} />
                </TouchableOpacity>
                <View>
                  <Text className="text-slate-400 text-sm font-medium">Enrollment Services</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>Admissions Office</Text>
                </View>
              </View>
              <View className="flex-row gap-3">
                <TouchableOpacity className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <Bell color="#94a3b8" size={20} />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setUser(null)}
                  className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20"
                >
                  <LogOut color="#ef4444" size={20} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Admissions KPI Grid */}
            <View className="flex-row mb-6">
              <StatCard 
                title="Total Applications" 
                value="4,820" 
                icon={Users} 
                trend="+15%" 
                color="#3b82f6"
              />
              <StatCard 
                title="Shortlisted" 
                value="1,240" 
                icon={UserPlus} 
                trend="+45" 
                color="#10b981"
              />
            </View>

            <View className="flex-row mb-8">
              <StatCard 
                title="Documents Verified" 
                value="94%" 
                icon={FileText} 
                trend="On track" 
                color="#8b5cf6"
              />
              <StatCard 
                title="Conversion Rate" 
                value="22%" 
                icon={TrendingUp} 
                trend="+2.4%" 
                color="#f59e0b"
              />
            </View>

            {/* Admission Cycle Progress */}
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8">
              <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>Fall 2024 Enrollment</Text>
              
              <View className="space-y-6">
                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-slate-300 text-sm">Undergraduate Admissions</Text>
                    <Text className="text-green-400 text-sm font-bold">85% Filled</Text>
                  </View>
                  <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <View 
                      style={{ width: '85%' as any, backgroundColor: '#3b82f6' }} 
                      className="h-full rounded-full" 
                    />
                  </View>
                </View>

                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-slate-300 text-sm">Postgraduate Admissions</Text>
                    <Text className="text-blue-400 text-sm font-bold">64% Filled</Text>
                  </View>
                  <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <View 
                      style={{ width: '64%' as any, backgroundColor: '#10b981' }} 
                      className="h-full rounded-full" 
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Strategic Roadmap */}
            <View className="mb-10">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Upcoming Deadlines</Text>
              <View className="space-y-4">
                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-blue-600/20 p-3 rounded-2xl mr-4">
                    <Search color="#3b82f6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Early Bird Deadline</Text>
                    <Text className="text-slate-400 text-xs">Oct 30: Merit scholarship eligibility</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>

                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-purple-600/20 p-3 rounded-2xl mr-4">
                    <ClipboardCheck color="#8b5cf6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Entrance Exam Slot Booking</Text>
                    <Text className="text-slate-400 text-xs">Closing Nov 05 for Batch B</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        );
    }
  };
  const admissionsData = user?.universityData?.admissionsData;

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
                <Text className="text-2xl font-bold text-white">Admissions Menu</Text>
                <TouchableOpacity onPress={() => setMenuVisible(false)}>
                  <X color="white" size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View className="space-y-2">
                  {[
                    { id: 'Home', icon: Home, label: 'Dashboard' },
                    { id: 'Analytics', icon: BarChart3, label: 'Analytics' },
                    { id: 'Surveys', icon: ClipboardList, label: 'Surveys' },
                    { id: 'Calendar', icon: Calendar, label: 'Calendar' },
                    { id: 'Applications', icon: FileText, label: 'Applications Hub' },
                    { id: 'Shortlist', icon: UserPlus, label: 'Shortlisted Candidates' },
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
