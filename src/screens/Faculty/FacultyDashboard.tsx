import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Modal } from 'react-native';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Bell, 
  ChevronRight,
  AlertCircle,
  Award,
  LogOut,
  Menu, 
  X, 
  Home, 
  Settings, 
  User, 
  MessageSquare,
  BarChart3,
  ClipboardList,
  Calendar
} from 'lucide-react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { AnalyticsView } from '../../components/Dashboard/AnalyticsView';
import { SurveyView } from '../../components/Dashboard/SurveyView';
import { CalendarView } from '../../components/Dashboard/CalendarView';

const { width } = Dimensions.get('window');

export const FacultyDashboard = () => {
  const { user, setUser } = useStore();
  const facultyData = user?.universityData?.facultyData;
  const [activeTab, setActiveTab] = useState('Home');
  const [menuVisible, setMenuVisible] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'Analytics':
        return <AnalyticsView role="Faculty" />;
      case 'Surveys':
        return <SurveyView role="Faculty" />;
      case 'Calendar':
        return <CalendarView role="Faculty" />;
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
                  <Text className="text-slate-400 text-sm font-medium">Department of Computer Science</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>Faculty Hub</Text>
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

            {/* Teaching KPIs */}
            <View className="flex-row mb-6">
              <StatCard 
                title="Active Courses" 
                value="4" 
                icon={BookOpen} 
                trend="Fall 2024" 
                color="#3b82f6"
              />
              <StatCard 
                title="Student Reach" 
                value="240" 
                icon={Users} 
                trend="+12%" 
                color="#10b981"
              />
            </View>

            <View className="flex-row mb-8">
              <StatCard 
                title="Research Papers" 
                value="12" 
                icon={Award} 
                trend="+2 New" 
                color="#8b5cf6"
              />
              <StatCard 
                title="Workload" 
                value="18h/wk" 
                icon={Clock} 
                trend="Optimal" 
                color="#f59e0b"
              />
            </View>

            {/* Strategic Roadmap */}
            <View className="mb-10">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Upcoming Classes</Text>
              <View className="space-y-4">
                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-blue-600/20 p-3 rounded-2xl mr-4">
                    <BookOpen color="#3b82f6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Data Structures</Text>
                    <Text className="text-slate-400 text-xs">Section A • 10:00 AM - 11:30 AM</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>

                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-purple-600/20 p-3 rounded-2xl mr-4">
                    <Award color="#8b5cf6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Research Seminar</Text>
                    <Text className="text-slate-400 text-xs">Advanced ML Group • 2:00 PM</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            {/* Tab Selector */}
            <View className="flex-row bg-white/5 p-1.5 rounded-2xl border border-white/5 mb-8">
              {['Courses', 'Research', 'Attendance'].map((tab) => (
                <TouchableOpacity 
                  key={tab}
                  onPress={() => setActiveTab(tab as any)}
                  className={`flex-1 py-3 rounded-xl items-center ${activeTab === tab ? 'bg-blue-600 shadow-lg' : ''}`}
                >
                  <Text className={`text-xs font-bold ${activeTab === tab ? 'text-white' : 'text-slate-400'}`}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {activeTab === 'Courses' && (
              <View className="space-y-6">
                <Text className="text-white text-lg font-bold mb-2">Class Performance Heatmap</Text>
                {facultyData?.assignedCourses.map((course, idx) => (
                  <View key={idx} className="bg-white/5 p-6 rounded-[32px] border border-white/10">
                    <View className="flex-row justify-between items-center mb-6">
                      <Text className="text-white font-bold">{course.name}</Text>
                      <TouchableOpacity className="bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                        <Text className="text-blue-400 text-[10px] font-bold">UPLOAD MARKS</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <View className="flex-row justify-between items-end h-24 mb-4">
                      {course.performance.map((score, i) => (
                        <View key={i} className="items-center">
                          <View 
                            style={{ 
                              height: `${score}%` as any, 
                              width: 32, 
                              backgroundColor: score > 80 ? '#10b981' : score > 60 ? '#3b82f6' : '#ef4444',
                              opacity: 0.8
                            }} 
                            className="rounded-lg mb-2"
                          />
                          <Text className="text-slate-500 text-[8px] font-bold">SEC {i+1}</Text>
                        </View>
                      ))}
                    </View>
                    <Text className="text-slate-400 text-xs italic">Average score distributed across 5 lecture sections.</Text>
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'Attendance' && (
              <View className="space-y-6">
                <View className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-3xl">
                  <View className="flex-row items-center mb-4">
                    <AlertCircle color="#f59e0b" size={20} />
                    <Text className="text-orange-500 font-bold ml-2">Attendance Shortage (Critical)</Text>
                  </View>
                  <View className="space-y-4">
                    {[
                      { name: 'Alice Becker', attendance: '68%', id: 'STU-102' },
                      { name: 'Mark Ruffalo', attendance: '72%', id: 'STU-441' },
                    ].map((s, i) => (
                      <View key={i} className="flex-row justify-between items-center bg-white/5 p-4 rounded-2xl">
                        <View>
                          <Text className="text-white font-medium">{s.name}</Text>
                          <Text className="text-slate-500 text-[10px]">{s.id}</Text>
                        </View>
                        <Text className="text-red-400 font-bold">{s.attendance}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}

            {activeTab === 'Research' && (
              <View className="space-y-6">
                <View className="bg-white/5 p-8 rounded-[32px] border border-white/10 items-center">
                  <BarChart3 color="#8b5cf6" size={40} className="mb-4" />
                  <Text className="text-white text-2xl font-bold">{facultyData?.publications}</Text>
                  <Text className="text-slate-400 font-medium">Published Research Papers</Text>
                  <View className="w-full h-px bg-white/5 my-6" />
                  <TouchableOpacity className="bg-blue-600 px-8 py-3 rounded-2xl">
                    <Text className="text-white font-bold">New Publication</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
                <Text className="text-2xl font-bold text-white">Faculty Menu</Text>
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
                    { id: 'Courses', icon: BookOpen, label: 'My Courses' },
                    { id: 'Attendance', icon: Clock, label: 'Student Attendance' },
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
