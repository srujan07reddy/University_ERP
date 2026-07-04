import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Modal, TextInput, Alert, Platform } from 'react-native';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Layers, Database, Wallet, MapPin, Search, Compass, BookOpenCheck
} from 'lucide-react-native';
import { useStore } from '../../store/useStore';
import { useScrollEvents } from '../../hooks/useScrollEvents';
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
export const StudentDashboard = () => {
  const { user, setUser, businessRules } = useStore();
  const [activeTab, setActiveTab] = useState('Home');
  const [menuVisible, setMenuVisible] = useState(false);

  const studentData = user?.universityData?.studentData;
  
  // Scroll event tracking
  const { handleScroll: handleMainScroll } = useScrollEvents();

  // Eligibility flags (simulated based on John Doe profile data)
  const isHostelResident = true;
  const isTransportUser = true;
  const isFinalYear = true;
  const isPlacementEligible = true;

  // UI Interactive States
  const [grievanceText, setGrievanceText] = useState('');
  const [personalDetails, setPersonalDetails] = useState({ phone: '+1 234 567 890', email: user?.email || 'student@university.com', address: '123 Baker Street, London' });
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [pdfSubmitted, setPdfSubmitted] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);

  const facultyProfiles: Record<string, { qualifications: string, experience: string, rating: string, papers: string[], patents: string[] }> = {
    'Dr. Sarah Smith': {
      qualifications: 'Ph.D. in Computer Science (Artificial Intelligence)',
      experience: '12 Years',
      rating: '4.8 / 5.0',
      papers: [
        'Federated Learning Frameworks in Private Cloud ERPs - IEEE Transactions, 2026',
        'Scalable Multi-Tenant Architectures in Higher Ed SaaS - Springer, 2025'
      ],
      patents: [
        'System and Method for Encrypted Distributed Database Sharding (Patent No: 18/402,129)'
      ]
    },
    'Dr. Sarah Wilson': {
      qualifications: 'Ph.D. in Machine Learning',
      experience: '8 Years',
      rating: '4.6 / 5.0',
      papers: [
        'Contrastive Representation Learning in Skill Gap Analyzers - NeurIPS, 2025',
        'Optimizing Heuristic Resource Allocation for High-Density Classrooms - ACM, 2024'
      ],
      patents: [
        'Dynamic Skill Dependency Tracking and Career Path Predictor (Patent No: 18/395,201)'
      ]
    },
    'Dr. Gregory House': {
      qualifications: 'Ph.D. in Distributed Systems & Logic',
      experience: '14 Years',
      rating: '4.7 / 5.0',
      papers: [
        'Conflict Resolution Strategies in Real-Time Academic Timetable Scheduling - IEEE, 2026',
        'Diagnosis of Performance Anomalies in Educational Cloud Infrastructure - ACM, 2025'
      ],
      patents: [
        'Automatic Scheduling Engine utilizing Constraint Satisfaction Algorithms (Patent No: 18/412,305)'
      ]
    }
  };

  // CV Analyzer & Skill Scorer States
  const [cvUploaded, setCvUploaded] = useState(false);
  const [atsAnalyzing, setAtsAnalyzing] = useState(false);
  const [atsResult, setAtsResult] = useState('');

  // AI Assistant States
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePayFees = () => {
    Alert.alert('Payment Portal', 'Online transaction successful! Receipt downloaded.', [
      { text: 'OK', onPress: () => Alert.alert('Downloaded', 'Receipt_FEES_OCT2026.pdf saved to device.') }
    ]);
  };

  const handleAskAI = () => {
    if (!aiQuestion) return;
    setIsGenerating(true);
    setTimeout(() => {
      setAiResponse(`[UniAI Assistant]: Based on your Software Engineering syllabus, the key topics for CS301 Mid-term are:\n1. MVC Architecture Pattern\n2. Object Relational Mapping (ORM)\n3. RESTful API best practices.\n\nRecommended resource: "Software Architecture in Practice (3rd Ed)", Chapter 4.`);
      setIsGenerating(false);
    }, 1000);
  };

  const handleGrievance = () => {
    if (!grievanceText) return;
    setGrievanceText('');
    Alert.alert('Grievance Logged', 'Your ticket has been sent to the Student Welfare Cell (ID: GRV-992).');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'My Profile':
        return <StudentProfileTab />;
      case 'Academics':
        return <StudentAcademicsTab />;
      case 'Timetable':
        return <StudentTimetableTab />;
      case 'Attendance':
        return <StudentAttendanceTab />;
      case 'Marks':
        return <StudentMarksTab />;
      case 'Assignments':
        return <StudentAssignmentsTab />;
      case 'Leave':
        return <StudentLeaveTab />;
      case 'Fees':
        return <StudentFeesTab />;
      case 'Hostel':
        return <StudentHostelTab />;
      case 'Transport':
        return <StudentTransportTab />;
      case 'Placement':
        return <StudentPlacementTab />;
      case 'Projects':
        return <StudentProjectsTab />;
      case 'Grievance':
        return <StudentGrievanceTab />;
      case 'SafeChat':
        return <MessageCenter />;
      default:
        return (
          <>
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
                <TouchableOpacity 
                  onPress={() => setUser(null)}
                  className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20"
                >
                  <LogOut color="#ef4444" size={20} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Academic KPIs */}
            <View className="flex-row mb-6">
              <StatCard title="Current CGPA" value={studentData?.cgpa.toString() || '3.85'} icon={Award} trend="+0.2" color="#3b82f6" />
              <StatCard title="Attendance" value={`${studentData?.attendancePercentage || 0}%`} icon={CheckCircle} trend="Eligible" color="#10b981" />
            </View>

            <View className="flex-row mb-8">
              <StatCard title="Credits Earned" value={studentData?.creditsEarned.toString() || '102'} icon={BookOpen} trend="On track" color="#8b5cf6" />
              <StatCard title="Fee Pending" value={`$${studentData?.feesDue || '1500'}`} icon={Wallet} color="#f59e0b" />
            </View>

            {/* AI Academic Assistant */}
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8 space-y-4">
              <Text className="text-white font-bold text-lg">AI Academic Tutor</Text>
              <TextInput 
                placeholder="Ask about syllabus, notes or references..." 
                placeholderTextColor="#64748b" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs h-12"
                value={aiQuestion}
                onChangeText={setAiQuestion}
              />
              <TouchableOpacity onPress={handleAskAI} className="bg-blue-600 p-4 rounded-xl flex-row justify-center items-center gap-2">
                <Sparkles color="white" size={16} />
                <Text className="text-white font-bold text-xs">{isGenerating ? 'Answering...' : 'Query AI'}</Text>
              </TouchableOpacity>
              {aiResponse ? (
                <View className="bg-white/5 p-4 rounded-xl border border-white/10 mt-4">
                  <Text className="text-slate-300 text-xs leading-relaxed">{aiResponse}</Text>
                </View>
              ) : null}
            </View>

            {/* Quick Actions Shortcuts */}
            <View className="mb-10">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Quick Actions</Text>
              <View className="flex-row flex-wrap gap-3">
                {[
                  { label: 'View Timetable', id: 'Timetable' },
                  { label: 'Submit Assignment', id: 'Assignments' },
                  { label: 'Pay Dues', id: 'Fees' },
                  { label: 'Hostel Card', id: 'Hostel' }
                ].map((btn, idx) => (
                  <TouchableOpacity key={idx} onPress={() => setActiveTab(btn.id)} className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
                    <Text className="text-blue-400 font-bold text-xs">{btn.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        );
    }
  };

  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  return (
    <Container style={{ flex: 1, backgroundColor: '#0F172A' } as any}>
      <View style={{ flex: 1, flexDirection: Platform.OS === 'web' ? 'row' : 'column' }}>
        
        {/* Web permanent sidebar - left side column */}
        {Platform.OS === 'web' && (
          <View style={{ width: 280, backgroundColor: '#0B0F19', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.08)', padding: 24, height: '100%', overflowY: 'auto' } as any}>
            <Text className="text-2xl font-bold text-white mb-6">Student Hub</Text>
            <View className="space-y-4">
              <View>
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Base Portal</Text>
                <View className="space-y-1">
                  {[
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

              <View>
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">My Services</Text>
                <View className="space-y-1">
                  {isHostelResident && (
                    <TouchableOpacity 
                      onPress={() => setActiveTab('Hostel')} 
                      style={{ padding: 10, borderRadius: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: activeTab === 'Hostel' ? '#8b5cf6' : 'transparent', marginBottom: 2 }}
                    >
                      <Compass color={activeTab === 'Hostel' ? 'white' : '#94a3b8'} size={16} />
                      <Text style={{ fontWeight: 'bold', marginLeft: 12, color: activeTab === 'Hostel' ? 'white' : '#94a3b8', fontSize: 12 }}>My Hostel Room</Text>
                    </TouchableOpacity>
                  )}
                  {isTransportUser && (
                    <TouchableOpacity 
                      onPress={() => setActiveTab('Transport')} 
                      style={{ padding: 10, borderRadius: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: activeTab === 'Transport' ? '#8b5cf6' : 'transparent', marginBottom: 2 }}
                    >
                      <MapPin color={activeTab === 'Transport' ? 'white' : '#94a3b8'} size={16} />
                      <Text style={{ fontWeight: 'bold', marginLeft: 12, color: activeTab === 'Transport' ? 'white' : '#94a3b8', fontSize: 12 }}>Transport Route</Text>
                    </TouchableOpacity>
                  )}
                  {isPlacementEligible && (
                    <TouchableOpacity 
                      onPress={() => setActiveTab('Placement')} 
                      style={{ padding: 10, borderRadius: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: activeTab === 'Placement' ? '#8b5cf6' : 'transparent', marginBottom: 2 }}
                    >
                      <Award color={activeTab === 'Placement' ? 'white' : '#94a3b8'} size={16} />
                      <Text style={{ fontWeight: 'bold', marginLeft: 12, color: activeTab === 'Placement' ? 'white' : '#94a3b8', fontSize: 12 }}>Placement Cell</Text>
                    </TouchableOpacity>
                  )}
                  {isFinalYear && (
                    <TouchableOpacity 
                      onPress={() => setActiveTab('Projects')} 
                      style={{ padding: 10, borderRadius: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: activeTab === 'Projects' ? '#8b5cf6' : 'transparent', marginBottom: 2 }}
                    >
                      <BookOpenCheck color={activeTab === 'Projects' ? 'white' : '#94a3b8'} size={16} />
                      <Text style={{ fontWeight: 'bold', marginLeft: 12, color: activeTab === 'Projects' ? 'white' : '#94a3b8', fontSize: 12 }}>Final Year Project</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Right content / workspace column */}
        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24, ...(Platform.OS === 'web' ? { overflowY: 'auto' } : {}) } as any}>
          {renderContent()}
        </View>

        <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Mobile Menu Modal */}
        <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
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
                  {/* Category 1: Base Portal */}
                  <View>
                    <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Base Portal</Text>
                    <View className="space-y-1">
                      {[
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
                        { id: 'SafeChat', icon: MessageSquare, label: 'SafeChat' }
                      ].map((item) => (
                        <TouchableOpacity key={item.id} onPress={() => { setActiveTab(item.id); setMenuVisible(false); }} className={`p-3 rounded-xl flex-row items-center ${activeTab === item.id ? 'bg-blue-600' : 'hover:bg-white/5'}`}>
                          <item.icon color={activeTab === item.id ? 'white' : '#94a3b8'} size={18} />
                          <Text className={`font-bold ml-3 text-xs ${activeTab === item.id ? 'text-white' : 'text-slate-400'}`}>{item.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Category 2: Conditional Services */}
                  <View>
                    <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">My Services</Text>
                    <View className="space-y-1">
                      {isHostelResident && (
                        <TouchableOpacity onPress={() => { setActiveTab('Hostel'); setMenuVisible(false); }} className={`p-3 rounded-xl flex-row items-center ${activeTab === 'Hostel' ? 'bg-purple-600' : 'hover:bg-white/5'}`}>
                          <Compass color={activeTab === 'Hostel' ? 'white' : '#94a3b8'} size={18} />
                          <Text className={`font-bold ml-3 text-xs ${activeTab === 'Hostel' ? 'text-white' : 'text-slate-400'}`}>My Hostel Room</Text>
                        </TouchableOpacity>
                      )}
                      {isTransportUser && (
                        <TouchableOpacity onPress={() => { setActiveTab('Transport'); setMenuVisible(false); }} className={`p-3 rounded-xl flex-row items-center ${activeTab === 'Transport' ? 'bg-purple-600' : 'hover:bg-white/5'}`}>
                          <MapPin color={activeTab === 'Transport' ? 'white' : '#94a3b8'} size={18} />
                          <Text className={`font-bold ml-3 text-xs ${activeTab === 'Transport' ? 'text-white' : 'text-slate-400'}`}>Transport Route</Text>
                        </TouchableOpacity>
                      )}
                      {isPlacementEligible && (
                        <TouchableOpacity onPress={() => { setActiveTab('Placement'); setMenuVisible(false); }} className={`p-3 rounded-xl flex-row items-center ${activeTab === 'Placement' ? 'bg-purple-600' : 'hover:bg-white/5'}`}>
                          <Award color={activeTab === 'Placement' ? 'white' : '#94a3b8'} size={18} />
                          <Text className={`font-bold ml-3 text-xs ${activeTab === 'Placement' ? 'text-white' : 'text-slate-400'}`}>Placement Cell</Text>
                        </TouchableOpacity>
                      )}
                      {isFinalYear && (
                        <TouchableOpacity onPress={() => { setActiveTab('Projects'); setMenuVisible(false); }} className={`p-3 rounded-xl flex-row items-center ${activeTab === 'Projects' ? 'bg-purple-600' : 'hover:bg-white/5'}`}>
                          <BookOpenCheck color={activeTab === 'Projects' ? 'white' : '#94a3b8'} size={18} />
                          <Text className={`font-bold ml-3 text-xs ${activeTab === 'Projects' ? 'text-white' : 'text-slate-400'}`}>Final Year Project</Text>
                        </TouchableOpacity>
                      )}
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

        {/* Edit Demographics Modal */}
        <Modal animationType="slide" transparent={true} visible={editProfileModal} onRequestClose={() => setEditProfileModal(false)}>
          <View className="flex-1 justify-center items-center bg-black/60 p-4">
            <View className="bg-[#1E293B] w-full max-w-lg p-8 rounded-[32px] border border-white/10">
              <Text className="text-white text-2xl font-bold mb-4">Edit Demographics</Text>
              <View className="space-y-4">
                <TextInput 
                  placeholder="Phone" 
                  placeholderTextColor="#64748b" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  value={personalDetails.phone}
                  onChangeText={(t) => setPersonalDetails({...personalDetails, phone: t})}
                />
                <TextInput 
                  placeholder="Email" 
                  placeholderTextColor="#64748b" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  value={personalDetails.email}
                  onChangeText={(t) => setPersonalDetails({...personalDetails, email: t})}
                />
                <TextInput 
                  placeholder="Address" 
                  placeholderTextColor="#64748b" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  value={personalDetails.address}
                  onChangeText={(t) => setPersonalDetails({...personalDetails, address: t})}
                />
                <TouchableOpacity onPress={() => {
                  setEditProfileModal(false);
                  Alert.alert('Success', 'Profile contact details updated.');
                }} className="bg-blue-600 p-4 rounded-xl items-center mt-4">
                  <Text className="text-white font-bold">Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditProfileModal(false)} className="p-2 items-center">
                  <Text className="text-slate-400">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Faculty Details Modal */}
        <Modal animationType="slide" transparent={true} visible={selectedFaculty !== null} onRequestClose={() => setSelectedFaculty(null)}>
          <View className="flex-1 justify-center items-center bg-black/60 p-4">
            <View className="bg-[#1E293B] w-full max-w-lg p-8 rounded-[32px] border border-white/10">
              <Text className="text-white text-2xl font-bold mb-1">{selectedFaculty?.name}</Text>
              <Text className="text-blue-400 text-xs font-bold mb-4">{selectedFaculty?.qualifications}</Text>

              <ScrollView style={{ maxHeight: 350, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }} className="space-y-4">
                <View className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Text className="text-slate-400 text-[10px] uppercase font-bold">Academic Record</Text>
                  <Text className="text-white text-xs mt-1">Experience: {selectedFaculty?.experience}</Text>
                  <Text className="text-white text-xs mt-0.5">Rating: {selectedFaculty?.rating}</Text>
                </View>

                <View className="space-y-2">
                  <Text className="text-slate-400 text-[10px] uppercase font-bold mt-2">Publications & Research Papers</Text>
                  {selectedFaculty?.papers?.map((paper: string, pIdx: number) => (
                    <View key={pIdx} className="bg-white/5 p-3 rounded-xl border border-white/5">
                      <Text className="text-white text-xs font-semibold">{paper}</Text>
                    </View>
                  ))}
                </View>

                <View className="space-y-2">
                  <Text className="text-slate-400 text-[10px] uppercase font-bold mt-2">Logged Patents</Text>
                  {selectedFaculty?.patents?.map((patent: string, pIdx: number) => (
                    <View key={pIdx} className="bg-white/5 p-3 rounded-xl border border-white/5">
                      <Text className="text-slate-300 text-xs italic">{patent}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>

              <TouchableOpacity onPress={() => setSelectedFaculty(null)} className="bg-blue-600 p-4 rounded-xl items-center mt-6">
                <Text className="text-white font-bold text-xs">Close Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Container>
  );
};
