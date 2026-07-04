import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, TextInput, Alert, Modal, FlatList, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { 
  Users, LogOut, TrendingUp, 
  UserPlus, Calendar, AlertCircle, Activity,
  ShieldCheck, Briefcase, Database, Wallet,
  Clock, MapPin, CheckCircle, BarChart as BarChartIcon,
  Filter, Layers, Search, Eye, Edit, Trash2,
  MessageSquare, Mail, ClipboardList, Plus, ChevronRight,
  Target, GraduationCap
} from 'lucide-react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { ChartContainer, chartConfig } from '../../components/Dashboard/ChartContainer';
import { StatCard } from '../../components/Dashboard/StatCard';
import { CalendarModule } from '../../components/Dashboard/CalendarModule';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';

const screenWidth = Dimensions.get("window").width;
const DEPARTMENTS = ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Business', 'Arts', 'Sciences'];
const SEMESTERS = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'];

import { AdminOverviewTab } from './AdminOverviewTab';
import { AdminFinanceTab } from './AdminFinanceTab';
import { AdminInventoryTab } from './AdminInventoryTab';
import { AdminPayrollTab } from './AdminPayrollTab';
import { AdminStudentMasterTab } from './AdminStudentMasterTab';
import { AdminStaffMasterTab } from './AdminStaffMasterTab';
import { AdminLogsTab } from './AdminLogsTab';
import { AdminAnalyticsTab } from './AdminAnalyticsTab';
import { AdminTimetableTab } from './AdminTimetableTab';
import { AdminSurveysTab } from './AdminSurveysTab';
import { AdminUsersTab } from './AdminUsersTab';
import { AdminRulesConsoleTab } from './AdminRulesConsoleTab';
export const AdminDashboard = () => {
  const { 
    user, setUser, users, addUser, deleteUser, substitutions, 
    assignSubstitution, assets, payroll, approvePayroll, addLog, 
    leaveRequests, updateLeaveStatus, surveys, addSurvey, 
    performanceSettings, updatePerformanceSettings, addMessage, auditLogs,
    businessRules, updateBusinessRule, simulateHours
  } = useStore();

  const [activeTab, setActiveTab] = useState<'Overview' | 'Users' | 'Staff' | 'StudentsMaster' | 'StaffMaster' | 'Logs' | 'Analytics' | 'Profile' | 'Finance' | 'Inventory' | 'Payroll' | 'Calendar' | 'Surveys' | 'Timetable' | 'Approvals' | 'RulesConsole'>('Overview');
  
  // Modals
  const [reassignModalVisible, setReassignModalVisible] = useState(false);
  const [admissionModalVisible, setAdmissionModalVisible] = useState(false);
  const [appointmentModalVisible, setAppointmentModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [surveyModalVisible, setSurveyModalVisible] = useState(false);
  const [groupMessageModalVisible, setGroupMessageModalVisible] = useState(false);
  const [perfSettingsModalVisible, setPerfSettingsModalVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [selectedAbsentStaff, setSelectedAbsentStaff] = useState<any>(null);
  const [selectedDept, setSelectedDept] = useState('Computer Science');
  const [analyticsMetric, setAnalyticsMetric] = useState<'Attendance' | 'Assignments' | 'Assessments' | 'ExamComparison'>('Attendance');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [analyticsSortOrder, setAnalyticsSortOrder] = useState<'high' | 'low' | 'none' | 'improvement'>('none');
  const [segmentFilter, setSegmentFilter] = useState<'high' | 'medium' | 'low' | 'none'>('none');
  const [messagingTargetIds, setMessagingTargetIds] = useState<string[]>([]);
  const [emergencyText, setEmergencyText] = useState('');
  
  // Survey Form
  const [surveyForm, setSurveyForm] = useState({ title: '', description: '', role: 'All' as any, options: '' });
  
  // Messaging Form
  const [messageForm, setMessageForm] = useState({ title: '', body: '', targetGroup: '' });
  
  // Timetable State
  const [timetableMode, setTimetableMode] = useState<'Class' | 'Teacher'>('Class');
  const [timetableFilter, setTimetableFilter] = useState('Year 1-CSE');
  const [timetableData, setTimetableData] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState('Year 1');
  const [selectedSem, setSelectedSem] = useState('Sem 1');
  const [isGenerating, setIsGenerating] = useState(false);

  // Performance Segmentation Logic
  const sortedStudents = useMemo(() => {
    let base = users.filter(u => u.role === 'Student').map((s: any) => {
      const score = (parseInt(s.id) * 7) % 100 || 75;
      let segment: 'high' | 'medium' | 'low' = 'medium';
      if (score >= 85) segment = 'high';
      else if (score < 60) segment = 'low';
      
      // Mock fee due logic
      const feeDue = (parseInt(s.id) * 100) % 5000;
      const isDefaulter = feeDue > 2000;
      
      // Mock exam comparison data
      const preLastExam = (parseInt(s.id) * 7) % 40 + 45;
      const lastExam = (parseInt(s.id) * 9) % 40 + 50;
      const presentExam = (parseInt(s.id) * 11) % 40 + 55;
      const improvement = presentExam - lastExam;
      const overallTrend = presentExam - preLastExam;
      
      return { ...s, score, segment, feeDue, isDefaulter, preLastExam, lastExam, presentExam, improvement, overallTrend };
    });

    if (analyticsSortOrder === 'high') return base.sort((a, b) => b.presentExam - a.presentExam);
    if (analyticsSortOrder === 'low') return base.sort((a, b) => a.presentExam - b.presentExam);
    if (analyticsSortOrder === 'improvement') return base.sort((a, b) => b.improvement - a.improvement);
    return base;
  }, [users, analyticsSortOrder]);

  const filteredAnalyticsStudents = sortedStudents.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = segmentFilter === 'none' || s.segment === segmentFilter;
    return matchesSearch && matchesSegment;
  });

  const handleCreateSurvey = () => {
    if (!surveyForm.title || !surveyForm.options) return;
    const newSurvey = {
      id: Math.random().toString(36).substr(2, 9),
      title: surveyForm.title,
      description: surveyForm.description,
      role: surveyForm.role,
      options: surveyForm.options.split(',').map(o => o.trim()),
      results: {},
      createdBy: 'Admin',
      createdAt: new Date().toISOString(),
      isActive: true
    };
    addSurvey(newSurvey as any);
    setSurveyModalVisible(false);
    setSurveyForm({ title: '', description: '', role: 'All', options: '' });
    Alert.alert('Survey Published', `Survey "${newSurvey.title}" is now live for ${newSurvey.role}s.`);
  };

  const handleGroupMessage = async () => {
    if (!messageForm.title || messagingTargetIds.length === 0) return;
    
    for (const targetId of messagingTargetIds) {
      await addMessage({
        id: Math.random().toString(36).substr(2, 9),
        senderId: user?.id || 'admin',
        receiverId: targetId,
        text: `[${messageForm.title}] ${messageForm.body}`,
        timestamp: new Date().toISOString()
      });
    }
    setGroupMessageModalVisible(false);
    setMessagingTargetIds([]);
    Alert.alert('Group Message Sent', `Notification delivered to ${messagingTargetIds.length} recipients.`);
  };

  const handleBroadcast = () => {
    if (!emergencyText) return;
    addLog({ actor: 'Admin', action: 'Emergency Broadcast', details: emergencyText, severity: 'Critical' });
    Alert.alert('Success', 'Emergency notification broadcasted to all users via FCM engine.');
    setEmergencyText('');
  };

  const [formData, setFormData] = useState<any>({
    name: '', motherName: '', fatherName: '', phone: '', email: '', aadhar: '', 
    sex: 'Male', nationality: 'Indian', dob: '', applyingCourse: '', 
    previousInstitute: '', staffChildName: '', siblingsInfo: '',
    correspondenceAddress: '', permanentAddress: '', 
    religion: '', caste: '', category: '', hobbies: '',
    stayingWithParents: true, hostelRequired: false, transportRequired: false,
    motherQualification: '', motherOccupation: '', motherPhone: '', motherAadhar: '',
    fatherQualification: '', fatherOccupation: '', fatherPhone: '', fatherAadhar: '',
    department: '', experience: '', certifications: '', subjects: ''
  });

  const handleFinalSubmit = (role: 'Faculty' | 'Student') => {
    if (!formData.name || !formData.email) return;
    const newUser: any = {
      id: Math.random().toString(36).substring(2, 11),
      name: formData.name,
      email: formData.email,
      role: role,
      phone: formData.phone,
      universityData: role === 'Faculty' ? {
        facultyData: {
          facultyId: `FAC-${Math.floor(Math.random() * 10000)}`,
          department: formData.department,
          designation: 'Assistant Professor',
          teachingHoursPerWeek: 18,
          researchGrants: 0,
          publications: 0,
          assignedCourses: formData.subjects.split(',').map((s: string) => ({ name: s.trim(), performance: [80, 85, 90] })),
          syllabusProgress: 0,
          leaveBalance: 20
        }
      } : role === 'Student' ? {
        studentData: {
          studentId: `STU-${Math.floor(Math.random() * 10000)}`,
          major: formData.applyingCourse || 'General',
          currentSemester: 1,
          creditsEarned: 0,
          creditsTotal: 120,
          cgpa: 0,
          attendancePercentage: 100,
          registeredCourses: [],
          feesDue: 5000,
          feeHistory: []
        }
      } : undefined
    };
    addUser(newUser);
    setAdmissionModalVisible(false);
    setAppointmentModalVisible(false);
    const resetData = {
      name: '', motherName: '', fatherName: '', phone: '', email: '', aadhar: '', 
      sex: 'Male', nationality: 'Indian', dob: '', applyingClass: '', 
      previousSchool: '', staffChildName: '', siblingsInfo: '',
      correspondenceAddress: '', permanentAddress: '', 
      religion: '', caste: '', category: '', hobbies: '',
      stayingWithParents: true, hostelRequired: false, transportRequired: false,
      motherQualification: '', motherOccupation: '', motherPhone: '', motherAadhar: '',
      fatherQualification: '', fatherOccupation: '', fatherPhone: '', fatherAadhar: '',
      department: '', experience: '', certifications: '', subjects: ''
    };
    setFormData(resetData);
    Alert.alert('Success', `${role === 'Faculty' ? 'Faculty Appointed' : 'Admission Successful'}!`);
  };

  const handleAutoGenerateTimetable = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Logic: 
      // 1. Identify staff on leave
      const absentStaffIds = leaveRequests.filter(r => r.status === 'Approved').map(r => r.senderId);
      
      // 2. Identify available substitutes (Staff not on leave)
      const availableStaff = users.filter(u => u.role === 'Faculty' && !absentStaffIds.includes(u.id));
      
      // 3. Generate 8 slots for 6 days
      const newSchedule: any[] = [];
      const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Computers', 'Physical Ed'];
      
      for (let d = 0; d < 6; d++) {
        for (let s = 0; s < 8; s++) {
          const teacher = availableStaff[Math.floor(Math.random() * availableStaff.length)];
          newSchedule.push({
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d],
            slot: ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'][s],
            subject: subjects[Math.floor(Math.random() * subjects.length)],
            teacher: teacher?.name || 'Guest Faculty',
            room: `RM 10${s}`,
            isSubstitute: false
          });
        }
      }
      setTimetableData(newSchedule);
      setIsGenerating(false);
      Alert.alert('AI Optimization Complete', 'Schedule generated based on faculty availability and leave records.');
    }, 1500);
  };

  const handleMarkAbsent = (staff: any) => {
    setSelectedAbsentStaff(staff);
    setReassignModalVisible(true);
  };

  const confirmReassignment = (substitute: any) => {
    assignSubstitution({
      staffId: selectedAbsentStaff.id,
      substituteId: substitute.id,
      date: new Date().toISOString(),
      status: 'Active'
    });
    setReassignModalVisible(false);
    Alert.alert('Reassigned', `${substitute.name} will cover classes for ${selectedAbsentStaff.name} today.`);
  };

  

  

  

  

  

  

  const renderStaff = () => {
    const handleApproveAndReassign = (req: any) => {
      updateLeaveStatus(req.id, 'Approved');
      const staff = users.find(u => u.id === req.senderId);
      if (staff) handleMarkAbsent(staff);
    };

    return (
      <View>
        <View className="bg-white/5 rounded-3xl p-8 border border-white/10 shadow-sm mb-8">
          <Text className="text-white text-xl font-bold mb-6">Staff Leave Requests</Text>
          <View className="space-y-4">
            {leaveRequests.filter((r: any) => r.receiverRole === 'Admin' && r.status === 'Pending').map((req: any) => (
              <View key={req.id} className="flex-row justify-between items-center bg-white/5 p-6 rounded-2xl">
                <View>
                  <Text className="text-white font-bold">{req.senderName}</Text>
                  <Text className="text-slate-400 text-xs mt-1">Leave Date: {req.date}</Text>
                  <Text className="text-slate-300 mt-2 italic">"{req.reason}"</Text>
                </View>
                <View className="flex-row gap-2">
                  <TouchableOpacity onPress={() => handleApproveAndReassign(req)} className="bg-blue-600 px-4 py-2 rounded-xl">
                    <Text className="text-white font-bold text-xs">Approve & Reassign</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => updateLeaveStatus(req.id, 'Rejected')} className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                    <Text className="text-slate-300 font-bold text-xs">Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="bg-white/5 rounded-3xl p-8 border border-white/10 shadow-sm">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-xl font-bold">Staff Attendance & Substitution</Text>
            <View className="flex-row items-center bg-orange-500/10 px-4 py-2 rounded-xl">
              <AlertCircle color="#f59e0b" size={16} />
              <Text className="text-orange-400 ml-2 font-bold text-xs">{substitutions.length} Active Subs</Text>
            </View>
          </View>
          <View className="space-y-3">
            {users.filter(u => u.role === 'Faculty').map((staff: any) => {
              const isSub = substitutions.some(s => s.staffId === staff.id);
              return (
                <View key={staff.id} className="flex-row items-center justify-between p-4 bg-white/5 rounded-2xl">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-blue-500/20 rounded-full items-center justify-center mr-3">
                      <Text className="text-blue-400 font-bold">{staff.name[0]}</Text>
                    </View>
                    <View><Text className="text-white font-semibold">{staff.name}</Text></View>
                  </View>
                  <TouchableOpacity onPress={() => handleMarkAbsent(staff)} disabled={isSub} className={`${isSub ? 'bg-white/5' : 'bg-red-500/10'} px-6 py-2 rounded-xl`}>
                    <Text className={`${isSub ? 'text-slate-500' : 'text-red-400'} font-bold text-sm`}>{isSub ? 'Reassigned' : 'Mark Absent'}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  

  

  

  

  

  

  

  return (
    <View style={{ flex: 1 }}>
      <View className="absolute inset-0 bg-[#0F172A]" />
      <View className="flex-1 flex-row">
        {/* Desktop Sidebar */}
        <View className="w-72 bg-[#0F172A]/80 border-r border-white/10 p-8 hidden lg:flex">
          <View className="flex-row items-center mb-10">
            <View className="w-10 h-10 bg-blue-600 rounded-xl items-center justify-center mr-3 shadow-lg shadow-blue-500/50">
              <ShieldCheck color="white" size={24} />
            </View>
            <Text className="text-2xl font-bold text-white tracking-tighter">AdminCenter</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="space-y-1">
              {[
                { id: 'Overview', icon: Activity, label: 'Overview' },
                { id: 'Approvals', icon: CheckCircle, label: 'Approvals Desk' },
                { id: 'Analytics', icon: TrendingUp, label: 'Analytics' },
                { id: 'Surveys', icon: ClipboardList, label: 'Surveys' },
                { id: 'Calendar', icon: Calendar, label: 'Calendar' },
                { id: 'Users', icon: UserPlus, label: 'Registration' },
                { id: 'Finance', icon: Wallet, label: 'Financials' },
                { id: 'Inventory', icon: Database, label: 'Assets' },
                { id: 'Payroll', icon: Briefcase, label: 'Payroll' },
                { id: 'StaffMaster', icon: Users, label: 'Staff Master' },
                { id: 'StudentsMaster', icon: GraduationCap, label: 'Student Master' },
                { id: 'Timetable', icon: Calendar, label: 'Timetable' },
                { id: 'RulesConsole', icon: ShieldCheck, label: 'Rules Console' },
                { id: 'Logs', icon: ShieldCheck, label: 'Audit Logs' }
              ].map((tab) => (
                <TouchableOpacity 
                  key={tab.id} 
                  onPress={() => setActiveTab(tab.id as any)} 
                  className={`p-4 rounded-2xl flex-row items-center transition-all ${activeTab === tab.id ? 'bg-blue-600 shadow-lg shadow-blue-900/40' : 'hover:bg-white/5'}`}
                >
                  <tab.icon color={activeTab === tab.id ? 'white' : '#64748b'} size={20} />
                  <Text className={`font-bold ml-4 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}>{tab.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View className="flex-1">
          {/* Header */}
          <View className="bg-[#0F172A]/40 p-6 flex-row justify-between items-center border-b border-white/10 backdrop-blur-xl">
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => setMobileMenuVisible(true)} className="lg:hidden p-2 mr-4 bg-white/5 rounded-xl border border-white/10">
                <Layers color="white" size={24} />
              </TouchableOpacity>
              <View>
                <Text className="text-white text-3xl font-bold tracking-tight">{activeTab}</Text>
                <Text className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">Management Console</Text>
              </View>
            </View>
            
            <View className="flex-row items-center gap-4">
              <View className="hidden md:flex flex-row items-center bg-white/5 px-4 py-2 rounded-2xl border border-white/10 mr-4">
                <Activity color="#10b981" size={16} />
                <Text className="text-green-400 text-xs font-bold ml-2">SYSTEM LIVE</Text>
              </View>
              <TouchableOpacity onPress={() => setUser(null)} className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
                <LogOut color="#ef4444" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, padding: 32, ...(Platform.OS === 'web' ? { overflowY: 'auto' } : {}) } as any}>
            {activeTab === 'Overview' && <AdminOverviewTab />}
            {activeTab === 'Approvals' && <ApprovalsPortal />}
            {activeTab === 'Analytics' && (
              <AdminAnalyticsTab 
                messageForm={messageForm}
                setMessageForm={setMessageForm}
                setGroupMessageModalVisible={setGroupMessageModalVisible}
                performanceSettings={performanceSettings}
                messagingTargetIds={messagingTargetIds}
                setMessagingTargetIds={setMessagingTargetIds}
                setPerfSettingsModalVisible={setPerfSettingsModalVisible}
              />
            )}
            {activeTab === 'Surveys' && (
              <AdminSurveysTab setSurveyModalVisible={setSurveyModalVisible} />
            )}
            {activeTab === 'Calendar' && <CalendarModule />}
            {activeTab === 'Users' && (
              <AdminUsersTab 
                setAppointmentModalVisible={setAppointmentModalVisible} 
                setAdmissionModalVisible={setAdmissionModalVisible} 
              />
            )}
            {activeTab === 'Finance' && (
              <AdminFinanceTab 
                screenWidth={screenWidth}
                sortedStudents={sortedStudents}
                setMessagingTargetIds={setMessagingTargetIds}
                setMessageForm={setMessageForm}
                messageForm={messageForm}
                setGroupMessageModalVisible={setGroupMessageModalVisible}
              />
            )}
            {activeTab === 'Inventory' && <AdminInventoryTab />}
            {activeTab === 'Payroll' && <AdminPayrollTab />}
            {activeTab === 'StudentsMaster' && (
              <AdminStudentMasterTab 
                sortedStudents={sortedStudents}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectedUser={setSelectedUser}
                setDetailModalVisible={setDetailModalVisible}
                setIsEditing={setIsEditing}
                setFormData={setFormData}
              />
            )}
            {activeTab === 'StaffMaster' && (
              <AdminStaffMasterTab 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectedUser={setSelectedUser}
                setDetailModalVisible={setDetailModalVisible}
                setIsEditing={setIsEditing}
                setFormData={setFormData}
              />
            )}
            {activeTab === 'RulesConsole' && <AdminRulesConsoleTab />}
            {activeTab === 'Logs' && <AdminLogsTab />}
            {activeTab === 'Timetable' && (
              <AdminTimetableTab 
                timetableMode={timetableMode}
                setTimetableMode={setTimetableMode}
                timetableFilter={timetableFilter}
                setTimetableFilter={setTimetableFilter}
                timetableData={timetableData}
                isGenerating={isGenerating}
                handleAutoGenerateTimetable={handleAutoGenerateTimetable}
              />
            )}
          </View>
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={groupMessageModalVisible} onRequestClose={() => setGroupMessageModalVisible(false)}><View className="flex-1 justify-center items-center bg-black/60 p-4"><View className="bg-[#1E293B] w-full max-w-xl p-10 rounded-[40px] border border-white/10"><Text className="text-white text-3xl font-bold mb-8">Targeted Messaging</Text><View className="space-y-4"><View className="flex-row gap-4">{['high', 'medium', 'low'].map((seg) => (<TouchableOpacity key={seg} onPress={() => setMessageForm({...messageForm, targetGroup: seg})} className={`flex-1 p-4 rounded-2xl border ${messageForm.targetGroup === seg ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10'}`}><Text className={`text-center font-bold uppercase text-[10px] ${messageForm.targetGroup === seg ? 'text-white' : 'text-slate-400'}`}>{seg}</Text></TouchableOpacity>))}</View><TextInput placeholder="Subject" placeholderTextColor="#64748b" className="bg-white/5 p-5 rounded-2xl border border-white/10 text-white" value={messageForm.title} onChangeText={(t) => setMessageForm({...messageForm, title: t})} /><TextInput placeholder="Content" multiline numberOfLines={4} placeholderTextColor="#64748b" className="bg-white/5 p-5 rounded-2xl border border-white/10 text-white h-32" value={messageForm.body} onChangeText={(t) => setMessageForm({...messageForm, body: t})} /><TouchableOpacity onPress={handleGroupMessage} className="bg-blue-600 p-6 rounded-2xl items-center mt-6"><Text className="text-white font-bold">Send Private Broadcast</Text></TouchableOpacity><TouchableOpacity onPress={() => setGroupMessageModalVisible(false)} className="p-4 items-center"><Text className="text-slate-400">Cancel</Text></TouchableOpacity></View></View></View></Modal>
      <Modal animationType="slide" transparent={true} visible={surveyModalVisible} onRequestClose={() => setSurveyModalVisible(false)}><View className="flex-1 justify-center items-center bg-black/60 p-4"><View className="bg-[#1E293B] w-full max-w-xl p-10 rounded-[40px] border border-white/10"><Text className="text-white text-3xl font-bold mb-8">Create Survey</Text><View className="space-y-4"><TextInput placeholder="Title" placeholderTextColor="#64748b" className="bg-white/5 p-5 rounded-2xl border border-white/10 text-white" value={surveyForm.title} onChangeText={(t) => setSurveyForm({...surveyForm, title: t})} /><TextInput placeholder="Description" placeholderTextColor="#64748b" className="bg-white/5 p-5 rounded-2xl border border-white/10 text-white" value={surveyForm.description} onChangeText={(t) => setSurveyForm({...surveyForm, description: t})} /><TextInput placeholder="Options (comma separated)" placeholderTextColor="#64748b" className="bg-white/5 p-5 rounded-2xl border border-white/10 text-white" value={surveyForm.options} onChangeText={(t) => setSurveyForm({...surveyForm, options: t})} /><TouchableOpacity onPress={handleCreateSurvey} className="bg-blue-600 p-6 rounded-2xl items-center mt-6"><Text className="text-white font-bold">Publish Survey</Text></TouchableOpacity><TouchableOpacity onPress={() => setSurveyModalVisible(false)} className="p-4 items-center"><Text className="text-slate-400">Cancel</Text></TouchableOpacity></View></View></View></Modal>
      <Modal animationType="fade" transparent={true} visible={perfSettingsModalVisible} onRequestClose={() => setPerfSettingsModalVisible(false)}><View className="flex-1 justify-center items-center bg-black/60 p-4"><View className="bg-[#1E293B] w-full max-w-lg p-10 rounded-[40px] border border-white/10"><Text className="text-white text-2xl font-bold mb-6">Performance Definitions</Text><View className="space-y-6"><View><Text className="text-green-400 font-bold mb-2">High</Text><TextInput multiline className="bg-white/5 p-4 rounded-2xl border border-white/10 text-white h-20" value={performanceSettings.high} onChangeText={(t) => updatePerformanceSettings({...performanceSettings, high: t})} /></View><View><Text className="text-blue-400 font-bold mb-2">Medium</Text><TextInput multiline className="bg-white/5 p-4 rounded-2xl border border-white/10 text-white h-20" value={performanceSettings.medium} onChangeText={(t) => updatePerformanceSettings({...performanceSettings, medium: t})} /></View><View><Text className="text-red-400 font-bold mb-2">Low</Text><TextInput multiline className="bg-white/5 p-4 rounded-2xl border border-white/10 text-white h-20" value={performanceSettings.low} onChangeText={(t) => updatePerformanceSettings({...performanceSettings, low: t})} /></View><TouchableOpacity onPress={() => setPerfSettingsModalVisible(false)} className="bg-blue-600 p-5 rounded-2xl items-center"><Text className="text-white font-bold">Update</Text></TouchableOpacity></View></View></View></Modal>
      <Modal animationType="slide" transparent={true} visible={detailModalVisible} onRequestClose={() => setDetailModalVisible(false)}><View className="flex-1 justify-center items-center bg-black/60 p-4"><View className="bg-[#1E293B] w-full max-w-2xl p-10 rounded-[40px] border border-white/10"><Text className="text-white text-2xl font-bold mb-8">{selectedUser?.name}</Text><ScrollView style={{ maxHeight: 384, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }} className="mb-8">{isEditing ? (<View className="space-y-4"><TextInput className="bg-white/5 p-4 rounded-2xl border border-white/10 text-white" value={formData.name} onChangeText={(t) => setFormData({...formData, name: t})} /><TextInput className="bg-white/5 p-4 rounded-2xl border border-white/10 text-white" value={formData.email} onChangeText={(t) => setFormData({...formData, email: t})} /></View>) : (<View><Text className="text-slate-400 leading-relaxed">{selectedUser?.role} record details.</Text></View>)}</ScrollView><View className="flex-row gap-4"><TouchableOpacity onPress={() => setDetailModalVisible(false)} className="flex-1 bg-blue-600 p-4 rounded-2xl items-center"><Text className="text-white font-bold">Close</Text></TouchableOpacity></View></View></View></Modal>
      <Modal animationType="slide" transparent={true} visible={appointmentModalVisible} onRequestClose={() => setAppointmentModalVisible(false)}>
        <View className="flex-1 justify-center items-center bg-black/60 p-4">
          <View className="bg-[#1E293B] w-full max-w-xl p-10 rounded-[40px] border border-white/10 shadow-2xl">
            <Text className="text-white text-3xl font-bold mb-8">Appoint Institutional Official</Text>
            <View className="space-y-4">
              <TextInput placeholder="Full Name" placeholderTextColor="#64748b" className="bg-white/5 p-5 rounded-2xl border border-white/10 text-white" value={formData.name} onChangeText={(t) => setFormData({...formData, name: t})} />
              <TextInput placeholder="Email" placeholderTextColor="#64748b" className="bg-white/5 p-5 rounded-2xl border border-white/10 text-white" value={formData.email} onChangeText={(t) => setFormData({...formData, email: t})} />
              <TouchableOpacity onPress={() => handleFinalSubmit('Faculty')} className="bg-blue-600 p-6 rounded-2xl items-center mt-6">
                <Text className="text-white font-bold">Confirm Appointment</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAppointmentModalVisible(false)} className="p-4 items-center">
                <Text className="text-slate-400">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Comprehensive Admission Form Modal */}
      <Modal animationType="slide" transparent={true} visible={admissionModalVisible} onRequestClose={() => setAdmissionModalVisible(false)}>
        <View className="flex-1 justify-center items-center bg-black/60 p-4">
          <View className="bg-[#1E293B] w-full max-w-4xl p-10 rounded-[40px] border border-white/10 shadow-2xl h-[90%]">
            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-white text-3xl font-bold">Comprehensive Admission Form</Text>
              <TouchableOpacity onPress={() => setAdmissionModalVisible(false)} className="p-2">
                <CheckCircle color="#64748b" size={24} />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false} className="pr-4" style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
              <View className="space-y-8">
                {/* Section 1: Student Details */}
                <View>
                  <Text className="text-blue-400 font-bold mb-4 uppercase tracking-widest text-xs">1. Student Information</Text>
                  <View className="flex-row flex-wrap -mx-2">
                    <View className="w-full md:w-1/2 px-2 mb-4">
                      <Text className="text-slate-400 text-xs mb-2">Student's Full Name (Block Letters)</Text>
                      <TextInput placeholder="FULL NAME" placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white" value={formData.name} onChangeText={(t) => setFormData({...formData, name: t})} />
                    </View>
                    <View className="w-full md:w-1/2 px-2 mb-4">
                      <Text className="text-slate-400 text-xs mb-2">Date of Birth</Text>
                      <TextInput placeholder="DD/MM/YYYY" placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white" value={formData.dob} onChangeText={(t) => setFormData({...formData, dob: t})} />
                    </View>
                    <View className="w-full md:w-1/3 px-2 mb-4">
                      <Text className="text-slate-400 text-xs mb-2">Sex</Text>
                      <View className="flex-row gap-2">
                        {['Male', 'Female'].map(s => (
                          <TouchableOpacity key={s} onPress={() => setFormData({...formData, sex: s})} className={`flex-1 p-3 rounded-xl border ${formData.sex === s ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10'}`}>
                            <Text className="text-white text-center text-xs font-bold">{s}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                    <View className="w-full md:w-1/3 px-2 mb-4">
                      <Text className="text-slate-400 text-xs mb-2">Aadhar No.</Text>
                      <TextInput placeholder="12 Digit No." placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white" value={formData.aadhar} onChangeText={(t) => setFormData({...formData, aadhar: t})} />
                    </View>
                    <View className="w-full md:w-1/3 px-2 mb-4">
                      <Text className="text-slate-400 text-xs mb-2">Nationality</Text>
                      <TextInput placeholder="Nationality" placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white" value={formData.nationality} onChangeText={(t) => setFormData({...formData, nationality: t})} />
                    </View>
                    <View className="w-full md:w-1/2 px-2 mb-4">
                      <Text className="text-slate-400 text-xs mb-2">Applying for Class</Text>
                      <TextInput placeholder="Standard" placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white" value={formData.applyingClass} onChangeText={(t) => setFormData({...formData, applyingClass: t})} />
                    </View>
                    <View className="w-full md:w-1/2 px-2 mb-4">
                      <Text className="text-slate-400 text-xs mb-2">Previous School</Text>
                      <TextInput placeholder="School Name" placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white" value={formData.previousSchool} onChangeText={(t) => setFormData({...formData, previousSchool: t})} />
                    </View>
                  </View>
                </View>

                {/* Section 2: Parent Details */}
                <View>
                  <Text className="text-purple-400 font-bold mb-4 uppercase tracking-widest text-xs">2. Parent / Guardian Details</Text>
                  <View className="flex-row -mx-4">
                    {/* Mother */}
                    <View className="flex-1 px-4 border-r border-white/5">
                      <Text className="text-white font-bold mb-4">Mother</Text>
                      <TextInput placeholder="Name" placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white mb-3" value={formData.motherName} onChangeText={(t) => setFormData({...formData, motherName: t})} />
                      <TextInput placeholder="Qualification" placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white mb-3" value={formData.motherQualification} onChangeText={(t) => setFormData({...formData, motherQualification: t})} />
                      <TextInput placeholder="Occupation" placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white mb-3" value={formData.motherOccupation} onChangeText={(t) => setFormData({...formData, motherOccupation: t})} />
                      <TextInput placeholder="Contact No." placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white mb-3" value={formData.motherPhone} onChangeText={(t) => setFormData({...formData, motherPhone: t})} />
                      <TextInput placeholder="Aadhar No." placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white" value={formData.motherAadhar} onChangeText={(t) => setFormData({...formData, motherAadhar: t})} />
                    </View>
                    {/* Father */}
                    <View className="flex-1 px-4">
                      <Text className="text-white font-bold mb-4">Father</Text>
                      <TextInput placeholder="Name" placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white mb-3" value={formData.fatherName} onChangeText={(t) => setFormData({...formData, fatherName: t})} />
                      <TextInput placeholder="Qualification" placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white mb-3" value={formData.fatherQualification} onChangeText={(t) => setFormData({...formData, fatherQualification: t})} />
                      <TextInput placeholder="Occupation" placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white mb-3" value={formData.fatherOccupation} onChangeText={(t) => setFormData({...formData, fatherOccupation: t})} />
                      <TextInput placeholder="Contact No." placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white mb-3" value={formData.fatherPhone} onChangeText={(t) => setFormData({...formData, fatherPhone: t})} />
                      <TextInput placeholder="Aadhar No." placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white" value={formData.fatherAadhar} onChangeText={(t) => setFormData({...formData, fatherAadhar: t})} />
                    </View>
                  </View>
                  <TextInput placeholder="Parent E-Mail ID" placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white mt-4" value={formData.email} onChangeText={(t) => setFormData({...formData, email: t})} />
                </View>

                {/* Section 3: Address & Logistics */}
                <View>
                  <Text className="text-green-400 font-bold mb-4 uppercase tracking-widest text-xs">3. Address & Logistics</Text>
                  <View className="space-y-4">
                    <TextInput placeholder="Correspondence Address" multiline numberOfLines={3} placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white h-24" value={formData.correspondenceAddress} onChangeText={(t) => setFormData({...formData, correspondenceAddress: t})} />
                    <TextInput placeholder="Permanent Address" multiline numberOfLines={3} placeholderTextColor="#64748b" className="bg-white/5 p-4 rounded-xl border border-white/10 text-white h-24" value={formData.permanentAddress} onChangeText={(t) => setFormData({...formData, permanentAddress: t})} />
                    <View className="flex-row gap-4">
                      <TextInput placeholder="Religion" placeholderTextColor="#64748b" className="flex-1 bg-white/5 p-4 rounded-xl border border-white/10 text-white" value={formData.religion} onChangeText={(t) => setFormData({...formData, religion: t})} />
                      <TextInput placeholder="Caste" placeholderTextColor="#64748b" className="flex-1 bg-white/5 p-4 rounded-xl border border-white/10 text-white" value={formData.caste} onChangeText={(t) => setFormData({...formData, caste: t})} />
                      <TextInput placeholder="Category" placeholderTextColor="#64748b" className="flex-1 bg-white/5 p-4 rounded-xl border border-white/10 text-white" value={formData.category} onChangeText={(t) => setFormData({...formData, category: t})} />
                    </View>
                    
                    <View className="flex-row gap-4">
                      <View className="flex-1">
                        <Text className="text-slate-400 text-xs mb-2">School Transport?</Text>
                        <TouchableOpacity onPress={() => setFormData({...formData, transportRequired: !formData.transportRequired})} className={`p-3 rounded-xl border ${formData.transportRequired ? 'bg-green-600 border-green-500' : 'bg-white/5 border-white/10'}`}>
                          <Text className="text-white text-center font-bold">{formData.transportRequired ? 'YES' : 'NO'}</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex-1">
                        <Text className="text-slate-400 text-xs mb-2">Hostel Required?</Text>
                        <TouchableOpacity onPress={() => setFormData({...formData, hostelRequired: !formData.hostelRequired})} className={`p-3 rounded-xl border ${formData.hostelRequired ? 'bg-green-600 border-green-500' : 'bg-white/5 border-white/10'}`}>
                          <Text className="text-white text-center font-bold">{formData.hostelRequired ? 'YES' : 'NO'}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Submit */}
                <TouchableOpacity onPress={() => handleFinalSubmit('Student')} className="bg-blue-600 p-6 rounded-3xl items-center shadow-lg shadow-blue-500/30">
                  <Text className="text-white font-bold text-lg">Process Enrollment</Text>
                </TouchableOpacity>
                <View className="h-10" />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Reassign Modal */}
      <Modal animationType="fade" transparent={true} visible={reassignModalVisible} onRequestClose={() => setReassignModalVisible(false)}>
        <View className="flex-1 justify-center items-center bg-black/60 p-4">
          <View className="bg-[#1E293B] w-full max-w-lg p-10 rounded-[40px] border border-white/10">
            <Text className="text-white text-2xl font-bold mb-8">Reassign</Text>
            <ScrollView className="mb-6" style={{ maxHeight: 320, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
              {users.filter(u => u.role === 'Faculty' && u.id !== selectedAbsentStaff?.id).map((sub) => (
                <TouchableOpacity key={sub.id} onPress={() => confirmReassignment(sub)} className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-3 flex-row items-center justify-between">
                  <Text className="text-white font-bold">{sub.name}</Text>
                  <CheckCircle color="#34d399" size={20} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setReassignModalVisible(false)} className="bg-white/5 p-4 rounded-2xl items-center">
              <Text className="text-white font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Mobile Menu Modal */}
      <Modal animationType="fade" transparent={true} visible={mobileMenuVisible} onRequestClose={() => setMobileMenuVisible(false)}>
        <View className="flex-1 bg-black/80 flex-row">
          <View className="w-72 bg-[#0F172A] p-8">
            <View className="flex-row justify-between items-center mb-10">
              <Text className="text-2xl font-bold text-white">Menu</Text>
              <TouchableOpacity onPress={() => setMobileMenuVisible(false)}>
                <CheckCircle color="white" size={24} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
              <View className="space-y-2">
                {[
                  { id: 'Overview', icon: Activity, label: 'Overview' },
                  { id: 'Analytics', icon: TrendingUp, label: 'Analytics' },
                  { id: 'Surveys', icon: ClipboardList, label: 'Surveys' },
                  { id: 'Calendar', icon: Calendar, label: 'Calendar' },
                  { id: 'Users', icon: UserPlus, label: 'Registration' },
                  { id: 'Finance', icon: Wallet, label: 'Financials' },
                  { id: 'Inventory', icon: Database, label: 'Assets' },
                  { id: 'Payroll', icon: Briefcase, label: 'Payroll' },
                  { id: 'StaffMaster', icon: Users, label: 'Staff Master' },
                  { id: 'StudentsMaster', icon: GraduationCap, label: 'Student Master' },
                  { id: 'Timetable', icon: Calendar, label: 'Timetable' },
                  { id: 'Logs', icon: ShieldCheck, label: 'Audit Logs' }
                ].map((tab) => (
                  <TouchableOpacity key={tab.id} onPress={() => { setActiveTab(tab.id as any); setMobileMenuVisible(false); }} className={`p-4 rounded-2xl flex-row items-center ${activeTab === tab.id ? 'bg-blue-600' : ''}`}>
                    <tab.icon color={activeTab === tab.id ? 'white' : '#64748b'} size={20} />
                    <Text className={`font-bold ml-4 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}>{tab.label}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity 
                  onPress={() => { setUser(null); setMobileMenuVisible(false); }} 
                  className="p-4 rounded-2xl flex-row items-center mt-6 bg-red-500/10 border border-red-500/20"
                >
                  <LogOut color="#ef4444" size={20} />
                  <Text className="font-bold ml-4 text-red-400">Logout</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          <TouchableOpacity className="flex-1" onPress={() => setMobileMenuVisible(false)} />
        </View>
      </Modal>
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab as any} />
    </View>
  );
};
