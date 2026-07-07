import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Modal, Alert, Platform, ScrollView } from 'react-native';
import {
  Users, Clock, Bell, LogOut, Menu, X, Home, CheckCircle,
  MessageSquare, Calendar, Award, FileText, BookOpen,
  RefreshCw, Sparkles, Layers, Database
} from 'lucide-react-native';
import { useStore } from '../../store/useStore';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { MessageCenter } from '../../components/Dashboard/MessageCenter';

import { HoDHomeTab } from './HoDHomeTab';
import { HoDFacultyTab } from './HoDFacultyTab';
import { HoDSubjectAllocTab } from './HoDSubjectAllocTab';
import { HoDTimetableTab } from './HoDTimetableTab';
import { HoDAnalyticsTab } from './HoDAnalyticsTab';
import { HoDInventoryTab } from './HoDInventoryTab';
import { HoDApprovalsTab } from './HoDApprovalsTab';
import { HoDStaffTimetableTab } from './HoDStaffTimetableTab';
import { HoDStaffLeaveTab } from './HoDStaffLeaveTab';
import { HoDStaffAttendanceTab } from './HoDStaffAttendanceTab';
import { HoDStaffMarksTab } from './HoDStaffMarksTab';
import { HoDStaffAssignmentsTab } from './HoDStaffAssignmentsTab';
import { HoDStaffLessonPlansTab } from './HoDStaffLessonPlansTab';
import { HoDStaffResearchTab } from './HoDStaffResearchTab';

const HOD_MGMT_ITEMS = [
  { id: 'Home',               icon: Home,         label: 'Dashboard' },
  { id: 'Faculty',            icon: Users,        label: 'Faculty Appraisal' },
  { id: 'SubjectAllocation',  icon: Layers,       label: 'Subject Allocation' },
  { id: 'TimetableManagement',icon: Calendar,     label: 'Timetable Scheduler' },
  { id: 'Approvals',          icon: CheckCircle,  label: 'Central Approvals' },
  { id: 'Analytics',          icon: Sparkles,     label: 'Department AI' },
  { id: 'Inventory',          icon: Database,     label: 'Inventory & Labs' },
];

const STAFF_ITEMS = [
  { id: 'StaffTimetable',  icon: Calendar,      label: 'My Timetable' },
  { id: 'StaffLeave',      icon: RefreshCw,     label: 'Apply Leave' },
  { id: 'StaffAttendance', icon: Clock,         label: 'Student Attendance' },
  { id: 'StaffMarks',      icon: FileText,      label: 'Internal Marks' },
  { id: 'StaffAssignments',icon: BookOpen,      label: 'Assignments' },
  { id: 'StaffLessonPlans',icon: BookOpen,      label: 'Lesson Plan' },
  { id: 'StaffResearch',   icon: Award,         label: 'My Research' },
  { id: 'SafeChat',        icon: MessageSquare, label: 'SafeChat' },
];

export const HoDDashboard = () => {
  const { user, setUser } = useStore();
  const [activeTab, setActiveTab] = useState('Home');
  const [menuVisible, setMenuVisible] = useState(false);
  const [assignmentModal, setAssignmentModal] = useState(false);


  const renderContent = () => {
    switch (activeTab) {
      case 'Faculty':             return <HoDFacultyTab />;
      case 'SubjectAllocation':   return <HoDSubjectAllocTab />;
      case 'TimetableManagement': return <HoDTimetableTab />;
      case 'Approvals':           return <HoDApprovalsTab />;
      case 'Analytics':           return <HoDAnalyticsTab />;
      case 'Inventory':           return <HoDInventoryTab />;
      case 'StaffTimetable':      return <HoDStaffTimetableTab />;
      case 'StaffLeave':          return <HoDStaffLeaveTab />;
      case 'StaffAttendance':     return <HoDStaffAttendanceTab />;
      case 'StaffMarks':          return <HoDStaffMarksTab />;
      case 'StaffAssignments':    return <HoDStaffAssignmentsTab setAssignmentModal={setAssignmentModal} />;
      case 'StaffLessonPlans':    return <HoDStaffLessonPlansTab />;
      case 'StaffResearch':       return <HoDStaffResearchTab />;
      case 'SafeChat':            return <MessageCenter />;
      default:                    return <HoDHomeTab setMenuVisible={setMenuVisible} />;
    }
  };

  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  return (
    <Container style={{ flex: 1, backgroundColor: '#0F172A' } as any}>
      <View style={{ flex: 1, flexDirection: Platform.OS === 'web' ? 'row' : 'column' }}>

        {/* Web sidebar */}
        {Platform.OS === 'web' && (
          <ScrollView style={{ width: 280, flexShrink: 0, flexGrow: 0, backgroundColor: '#0B0F19', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.08)', height: '100%' }} contentContainerStyle={{ padding: 24, paddingBottom: 60 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true} className="hidden lg:flex flex-col">
            <Text className="text-2xl font-bold text-white mb-6">HOD Console</Text>
            <View className="space-y-4">
              <View>
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">HOD Management</Text>
                <View className="space-y-1">
                  {HOD_MGMT_ITEMS.map((item) => (
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
              <View>
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">My Staff Operations</Text>
                <View className="space-y-1">
                  {STAFF_ITEMS.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => setActiveTab(item.id)}
                      style={{ padding: 10, borderRadius: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: activeTab === item.id ? '#8b5cf6' : 'transparent', marginBottom: 2 }}
                    >
                      <item.icon color={activeTab === item.id ? 'white' : '#94a3b8'} size={16} />
                      <Text style={{ fontWeight: 'bold', marginLeft: 12, color: activeTab === item.id ? 'white' : '#94a3b8', fontSize: 12 }}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
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
              <View className="flex-row justify-between items-center mb-8">
                <Text className="text-2xl font-bold text-white">Menu</Text>
                <TouchableOpacity onPress={() => setMenuVisible(false)}>
                  <X color="white" size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true} className="">
                <View className="space-y-4">
                  <View>
                    <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">HOD Management</Text>
                    <View className="space-y-1">
                      {HOD_MGMT_ITEMS.map((item) => (
                        <TouchableOpacity key={item.id} onPress={() => { setActiveTab(item.id); setMenuVisible(false); }} className={`p-3 rounded-xl flex-row items-center ${activeTab === item.id ? 'bg-blue-600' : ''}`}>
                          <item.icon color={activeTab === item.id ? 'white' : '#94a3b8'} size={18} />
                          <Text className={`font-bold ml-3 text-xs ${activeTab === item.id ? 'text-white' : 'text-slate-400'}`}>{item.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <View>
                    <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">My Staff Operations</Text>
                    <View className="space-y-1">
                      {STAFF_ITEMS.map((item) => (
                        <TouchableOpacity key={item.id} onPress={() => { setActiveTab(item.id); setMenuVisible(false); }} className={`p-3 rounded-xl flex-row items-center ${activeTab === item.id ? 'bg-purple-600' : ''}`}>
                          <item.icon color={activeTab === item.id ? 'white' : '#94a3b8'} size={18} />
                          <Text className={`font-bold ml-3 text-xs ${activeTab === item.id ? 'text-white' : 'text-slate-400'}`}>{item.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => { setUser(null); setMenuVisible(false); }}
                    className="p-4 rounded-xl flex-row items-center mt-4 bg-red-500/10 border border-red-500/20"
                  >
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
