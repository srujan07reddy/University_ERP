import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Modal } from 'react-native';
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Bell, 
  ChevronRight,
  CreditCard,
  Calendar,
  AlertCircle,
  TrendingUp,
  LogOut,
  Menu, X, Home, Settings, User, MessageSquare, BarChart3, ClipboardList, Users, AlertTriangle, UserCheck
} from 'lucide-react-native';
import { StatCard } from '../../components/Dashboard/StatCard';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { AnalyticsView } from '../../components/Dashboard/AnalyticsView';
import { SurveyView } from '../../components/Dashboard/SurveyView';
import { CalendarView } from '../../components/Dashboard/CalendarView';
import { useStore } from '../../store/useStore';

const { width } = Dimensions.get('window');

export const StudentDashboard = () => {
  const { user, setUser } = useStore();
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const studentData = user?.universityData?.studentData;

  const renderContent = () => {
    switch (activeTab) {
      case 'Analytics':
        return <AnalyticsView role="Student" />;
      case 'Surveys':
        return <SurveyView role="Student" />;
      case 'Calendar':
        return <CalendarView role="Student" />;
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
                  <Text className="text-slate-400 text-sm font-medium">Academic Portal</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>Student Hub</Text>
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

            {/* Academic KPI Grid */}
            <View className="flex-row mb-6">
              <StatCard 
                title="Current CGPA" 
                value={studentData?.cgpa.toString() || '0.0'} 
                icon={GraduationCap} 
                trend="+0.2" 
                color="#3b82f6"
              />
              <StatCard 
                title="Attendance" 
                value={`${studentData?.attendance || 0}%`} 
                icon={Users} 
                trend="Above avg" 
                color="#10b981"
              />
            </View>

            <View className="flex-row mb-8">
              <StatCard 
                title="Credits Earned" 
                value={studentData?.credits.toString() || '0'} 
                icon={BookOpen} 
                trend="68% Done" 
                color="#8b5cf6"
              />
              <StatCard 
                title="Backlogs" 
                value={studentData?.backlogs.toString() || '0'} 
                icon={AlertTriangle} 
                color={studentData?.backlogs ? "#ef4444" : "#f59e0b"}
              />
            </View>

            {/* Progress Visualization */}
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8">
              <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>Degree Completion</Text>
              
              <View className="space-y-6">
                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-slate-300 text-sm">Core Subjects</Text>
                    <Text className="text-green-400 text-sm font-bold">12/14 Done</Text>
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
                    <Text className="text-slate-300 text-sm">Lab Projects</Text>
                    <Text className="text-blue-400 text-sm font-bold">4 Pending</Text>
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
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Academic Roadmap</Text>
              <View className="space-y-4">
                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-blue-600/20 p-3 rounded-2xl mr-4">
                    <TrendingUp color="#3b82f6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Mid-Term Examinations</Text>
                    <Text className="text-slate-400 text-xs">Starts Nov 12: Check schedule</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>

                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-purple-600/20 p-3 rounded-2xl mr-4">
                    <UserCheck color="#8b5cf6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Internship Fair</Text>
                    <Text className="text-slate-400 text-xs">Registrations closing in 2 days</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
      <View style={{ flex: 1 }}>
        <ScrollView 
          className="flex-1 px-6 pt-6"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
        </ScrollView>
        <BottomNavbar />

        {/* Mobile Menu Modal */}
        <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
          <View className="flex-1 bg-black/80 flex-row">
            <View className="w-72 bg-[#0F172A] p-8 border-r border-white/10">
              <View className="flex-row justify-between items-center mb-10">
                <Text className="text-2xl font-bold text-white">Student Menu</Text>
                <TouchableOpacity onPress={() => setMenuVisible(false)}>
                  <X color="white" size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View className="space-y-2">
                  {[
                    { id: 'Home', icon: Home, label: 'Dashboard' },
                    { id: 'Analytics', icon: BarChart3, label: 'Analytics' },
                    { id: 'Surveys', icon: ClipboardList, label: 'Surveys' },
                    { id: 'Calendar', icon: Calendar, label: 'Calendar' },
                    { id: 'Academic', icon: BookOpen, label: 'Academic Hub' },
                    { id: 'Timeline', icon: Calendar, label: 'My Schedule' },
                    { id: 'Fees', icon: CreditCard, label: 'Fees & Finance' },
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
