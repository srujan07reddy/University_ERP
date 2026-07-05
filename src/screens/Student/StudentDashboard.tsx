import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Modal, Alert, Platform } from 'react-native';
import { useScrollEvents } from '../../hooks/useScrollEvents';
import {
  Users, Clock, Bell, LogOut, Menu, X, Home, Settings, User,
  MessageSquare, Calendar, Award, FileText, CheckCircle, RefreshCw,
  Wallet, Compass, MapPin, BookOpenCheck, BookOpen, ClipboardList,
  Layers, Database, Sparkles, AlertCircle,
  Container
} from 'lucide-react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { MessageCenter } from '../../components/Dashboard/MessageCenter';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';

import { StudentProfileTab } from './StudentProfileTab';
import { StudentAcademicsTab } from './StudentAcademicsTab';
import { StudentTimetableTab } from './StudentTimetableTab';
import { StudentAttendanceTab } from './StudentAttendanceTab';
import { StudentMarksTab } from './StudentMarksTab';
import { StudentAssignmentsTab } from './StudentAssignmentsTab';
import { StudentLeaveTab } from './StudentLeaveTab';
import { StudentFeesTab } from './StudentFeesTab';
import { StudentHostelTab } from './StudentHostelTab';
import { StudentTransportTab } from './StudentTransportTab';
import { StudentPlacementTab } from './StudentPlacementTab';
import { StudentProjectsTab } from './StudentProjectsTab';
import { StudentGrievanceTab } from './StudentGrievanceTab';

const MENU_ITEMS = [
  { id: 'Home', icon: Home, label: 'Dashboard' },
  { id: 'My Profile', icon: User, label: 'My Profile' },
  { id: 'Academics', icon: BookOpen, label: 'Academics' },
  { id: 'Timetable', icon: Calendar, label: 'My Timetable' },
  { id: 'Attendance', icon: Clock, label: 'Attendance logs' },
  { id: 'Marks', icon: ClipboardList, label: 'Internal Assessment' },
  { id: 'Assignments', icon: FileText, label: 'Assignments' },
  { id: 'Leave', icon: RefreshCw, label: 'Leave & OD Requests' },
  { id: 'Fees', icon: Wallet, label: 'Fee Management' },
  { id: 'Grievance', icon: AlertCircle, label: 'Grievance Portal' },
  { id: 'SafeChat', icon: MessageSquare, label: 'SafeChat' },
];

export const StudentDashboard = () => {
  const { user, setUser } = useStore();
  const [activeTab, setActiveTab] = useState('Home');
  const [menuVisible, setMenuVisible] = useState(false);

  // Scroll tracking
  useScrollEvents();

  const renderContent = () => {
    switch (activeTab) {
      case 'My Profile': return <StudentProfileTab />;
      case 'Academics': return <StudentAcademicsTab />;
      case 'Timetable': return <StudentTimetableTab />;
      case 'Attendance': return <StudentAttendanceTab />;
      case 'Marks': return <StudentMarksTab />;
      case 'Assignments': return <StudentAssignmentsTab />;
      case 'Leave': return <StudentLeaveTab />;
      case 'Fees': return <StudentFeesTab />;
      case 'Hostel': return <StudentHostelTab />;
      case 'Transport': return <StudentTransportTab />;
      case 'Placement': return <StudentPlacementTab />;
      case 'Projects': return <StudentProjectsTab />;
      case 'Grievance': return <StudentGrievanceTab />;
      case 'SafeChat': return <MessageCenter />;
      default: return (
        <View>
          {/* Header */}
          <View className="flex-row justify-between items-center mb-8">
            <View className="flex-row items-center">
              {Platform.OS !== 'web' && (
                <TouchableOpacity
                  onPress={() => setMenuVisible(true)}
                  className="bg-white/5 p-3 rounded-2xl border border-white/10 mr-4"
                >
                  <Menu color="white" size={20} />
                </TouchableOpacity>
              )}
              <View>
                <Text className="text-slate-400 text-sm font-medium">Academic Portal</Text>
                <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>{user?.name}</Text>
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
            <StatCard title="Current CGPA" value={user?.universityData?.studentData?.cgpa?.toString() || '3.85'} icon={Award} trend="+0.2" color="#3b82f6" />
            <StatCard title="Attendance" value={`${user?.universityData?.studentData?.attendancePercentage || 0}%`} icon={CheckCircle} trend="Eligible" color="#10b981" />
          </View>
          <View className="flex-row mb-8">
            <StatCard title="Credits Earned" value={user?.universityData?.studentData?.creditsEarned?.toString() || '102'} icon={BookOpen} trend="On track" color="#8b5cf6" />
            <StatCard title="Fee Pending" value={`$${user?.universityData?.studentData?.feesDue || '1500'}`} icon={Wallet} color="#f59e0b" />
          </View>
        </View>
      );
    }
  };

  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  return (
    <Container style={{ flex: 1, backgroundColor: '#0F172A' } as any}>
      <View style={{ flex: 1, flexDirection: Platform.OS === 'web' ? 'row' : 'column' }}>
        {/* Web sidebar */}
        {Platform.OS === 'web' && (
          <View style={{ width: 280, backgroundColor: '#0B0F19', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.08)', padding: 24, height: '100%', overflowY: 'auto' } as any}>
            <Text className="text-2xl font-bold text-white mb-6">Student Hub</Text>
            <View className="space-y-4">
              {MENU_ITEMS.map(item => (
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
        )}
        {/* Main content */}
        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24, ...(Platform.OS === 'web' ? { overflowY: 'auto' } : {}) } as any}>
          {renderContent()}
        </View>
        <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* Mobile menu modal */}
        <Modal animationType="fade" transparent visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
          <View className="flex-1 bg-black/80 flex-row">
            <View className="w-72 bg-[#0F172A] p-8 border-r border-white/10">
              <View className="flex-row justify-between items-center mb-8">
                <Text className="text-2xl font-bold text-white">Student Menu</Text>
                <TouchableOpacity onPress={() => setMenuVisible(false)}>
                  <X color="white" size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View className="space-y-4">
                  {MENU_ITEMS.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => { setActiveTab(item.id); setMenuVisible(false); }}
                      className={`p-3 rounded-xl flex-row items-center ${activeTab === item.id ? 'bg-blue-600' : 'hover:bg-white/5'}`}
                    >
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
