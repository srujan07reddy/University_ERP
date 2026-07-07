import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Modal, Alert, Platform, ScrollView } from 'react-native';
import {
  Home, User, Calendar, Clock, ClipboardList, FileText, BookOpen,
  RefreshCw, Award, MessageSquare, LogOut, Menu, X, Bell
} from 'lucide-react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { MessageCenter } from '../../components/Dashboard/MessageCenter';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';

import { FacultyProfileTab } from './FacultyProfileTab';
import { FacultyAttendanceTab } from './FacultyAttendanceTab';
import { FacultyGradesTab } from './FacultyGradesTab';
import { FacultyAssignmentsTab } from './FacultyAssignmentsTab';
import { FacultyLessonPlannerTab } from './FacultyLessonPlannerTab';
import { FacultyResearchTab } from './FacultyResearchTab';
import { FacultyTimetableTab } from './FacultyTimetableTab';

const MENU_ITEMS = [
  { id: 'Home',        icon: Home,          label: 'Dashboard' },
  { id: 'My Profile',  icon: User,          label: 'My Profile' },
  { id: 'Timetable',   icon: Calendar,      label: 'My Timetable' },
  { id: 'Attendance',  icon: Clock,         label: 'Student Attendance' },
  { id: 'Marks',       icon: ClipboardList, label: 'Internal Marks' },
  { id: 'Assignments', icon: FileText,      label: 'Assignments' },
  { id: 'LessonPlans', icon: BookOpen,      label: 'Lesson Plan' },
  { id: 'Leave',       icon: RefreshCw,     label: 'Apply Leave' },
  { id: 'Research',    icon: Award,         label: 'My Research' },
  { id: 'SafeChat',    icon: MessageSquare, label: 'SafeChat' },
];

export const FacultyDashboard = () => {
  const { user, setUser, assignments, addAssignment } = useStore();
  const facultyData = user?.universityData?.facultyData;
  const [activeTab, setActiveTab] = useState('Home');
  const [menuVisible, setMenuVisible] = useState(false);
  const [assignmentModal, setAssignmentModal] = useState(false);


  const renderContent = () => {
    switch (activeTab) {
      case 'My Profile':   return <FacultyProfileTab />;
      case 'Timetable':    return <FacultyTimetableTab />;
      case 'Attendance':   return <FacultyAttendanceTab />;
      case 'Marks':        return <FacultyGradesTab />;
      case 'Assignments':  return <FacultyAssignmentsTab setAssignmentModal={setAssignmentModal} />;
      case 'LessonPlans':  return <FacultyLessonPlannerTab />;
      case 'Leave':        return <ApprovalsPortal />;
      case 'Research':     return <FacultyResearchTab />;
      case 'SafeChat':     return <MessageCenter />;
      default:
        return (
          <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={{ paddingBottom: 24 }}>
            {/* Header */}
            <View className="flex-row justify-between items-center mb-8">
              <View className="flex-col md:flex-row items-start md:items-center gap-4 md:gap-0">
                {Platform.OS !== 'web' && (
                  <TouchableOpacity onPress={() => setMenuVisible(true)} className="bg-white/5 p-3 rounded-2xl border border-white/10 mr-4">
                    <Menu color="white" size={20} />
                  </TouchableOpacity>
                )}
                <View>
                  <Text className="text-slate-400 text-sm font-medium">Welcome back,</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>{user?.name || 'Prof. Sarah Smith'}</Text>
                </View>
              </View>
              <View className="flex-row gap-3">
                <TouchableOpacity className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <Bell color="#94a3b8" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setUser(null)} className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20">
                  <LogOut color="#ef4444" size={20} />
                </TouchableOpacity>
              </View>
            </View>

            {/* KPI Cards */}
            <View className="flex-row mb-6">
              <StatCard title="Active Courses" value="4" icon={BookOpen} trend="Fall 2024" color="#3b82f6" />
              <StatCard title="Student Reach" value="240" icon={Clock} trend="+12%" color="#10b981" />
            </View>
            <View className="flex-row mb-8">
              <StatCard title="Research Papers" value={facultyData?.publications?.toString() || '12'} icon={Award} trend="+2 New" color="#8b5cf6" />
              <StatCard title="Workload" value={`${facultyData?.teachingHoursPerWeek || 18}h/wk`} icon={Clock} trend="Optimal" color="#f59e0b" />
            </View>

            {/* Quick Shortcuts */}
            <View className="mb-10">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Quick Shortcuts</Text>
              <View className="flex-row flex-wrap gap-3">
                {[
                  { label: 'Mark Attendance', id: 'Attendance' },
                  { label: 'Edit Marks',      id: 'Marks' },
                  { label: 'Apply Leave',     id: 'Leave' },
                  { label: 'Lesson Plans',    id: 'LessonPlans' },
                ].map((btn, idx) => (
                  <TouchableOpacity key={idx} onPress={() => setActiveTab(btn.id)} className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
                    <Text className="text-blue-400 font-bold text-xs">{btn.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        );
    }
  };

  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  return (
    <Container style={{ flex: 1, backgroundColor: '#0F172A' } as any}>
      <View style={{ flex: 1, flexDirection: Platform.OS === 'web' ? 'row' : 'column' }}>

        {/* Web sidebar */}
        {Platform.OS === 'web' && (
          <ScrollView style={{ width: 280, flexShrink: 0, flexGrow: 0, backgroundColor: '#0B0F19', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.08)', height: '100%' }} contentContainerStyle={{ padding: 24, paddingBottom: 60 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true} className="hidden lg:flex flex-col">
            <Text className="text-2xl font-bold text-white mb-6">Faculty Hub</Text>
            <View className="space-y-1">
              {MENU_ITEMS.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setActiveTab(item.id)}
                  style={{ padding: 12, borderRadius: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: activeTab === item.id ? '#2563eb' : 'transparent', marginBottom: 4 }}
                >
                  <item.icon color={activeTab === item.id ? 'white' : '#94a3b8'} size={18} />
                  <Text style={{ fontWeight: 'bold', marginLeft: 12, color: activeTab === item.id ? 'white' : '#94a3b8', fontSize: 13 }}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {/* Main content */}
        <View style={{ flex: 1, overflow: 'hidden' }} className="px-6 pt-6 pb-32">
          {renderContent()}
        </View>

        <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Mobile Menu Modal */}
        <Modal animationType="fade" transparent visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
          <View className="flex-1 bg-black/80 flex-row">
            <View className="w-72 bg-[#0F172A] p-8 border-r border-white/10">
              <View className="flex-row justify-between items-center mb-10">
                <Text className="text-2xl font-bold text-white">Faculty Menu</Text>
                <TouchableOpacity onPress={() => setMenuVisible(false)}>
                  <X color="white" size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true} className="">
                <View className="space-y-2">
                  {MENU_ITEMS.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => { setActiveTab(item.id); setMenuVisible(false); }}
                      className={`p-4 rounded-2xl flex-row items-center ${activeTab === item.id ? 'bg-blue-600' : ''}`}
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
