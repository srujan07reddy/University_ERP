import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, Modal, TextInput, Alert, Platform, ScrollView } from 'react-native';

import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Briefcase, Building2, Handshake, Info
} from 'lucide-react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { MessageCenter } from '../../components/Dashboard/MessageCenter';

import { PlacementHomeTab } from './PlacementHomeTab';

import { PlacementAnalyticsTab } from './PlacementAnalyticsTab';
import { PlacementSurveysTab } from './PlacementSurveysTab';
import { PlacementCalendarTab } from './PlacementCalendarTab';
export const PlacementDashboard = () => {
  const { user, setUser, businessRules } = useStore();
  const [activeTab, setActiveTab] = useState('Home');
  const [menuVisible, setMenuVisible] = useState(false);

  // Scroll event tracking

  const attendanceRule = businessRules?.find(r => r.id === 'rule_1');
  const initialAttendance = attendanceRule?.isEnabled ? String(attendanceRule.value) : '75';

  // TPMS Eligibility Criteria Config State
  const [eligibilityCriteria, setEligibilityCriteria] = useState({
    minCgpa: '7.5',
    maxArrears: '0',
    minAttendance: initialAttendance,
    dept: 'CSE, IT, AI'
  });
  const [eligibilityResultCount, setEligibilityResultCount] = useState(326);

  // Simulated Recruiters & CRM State
  const [recruiters, setRecruiters] = useState([
    { id: '1', company: 'TCS', contact: 'hr@tcs.com', offers2025: 120, offers2026: 140, avgCtc: '4.2 LPA', status: 'MoU Signed' },
    { id: '2', company: 'Infosys', contact: 'recruitment@infosys.com', offers2025: 80, offers2026: 95, avgCtc: '4.0 LPA', status: 'Active' },
    { id: '3', company: 'Google', contact: 'hiring-eng@google.com', offers2025: 4, offers2026: 6, avgCtc: '32.0 LPA', status: 'Contacted' }
  ]);

  // Simulated Drives State
  const [drives, setDrives] = useState([
    { id: '1', company: 'XYZ Corp', type: 'On-Campus', date: '2026-11-05', role: 'Software Engineer', ctc: '12 LPA', eligibility: 'CGPA >= 7.5' },
    { id: '2', company: 'Meta Labs', type: 'Virtual', date: '2026-11-12', role: 'Intern Developer', ctc: '50k/mo Stipend', eligibility: 'CGPA >= 8.0' }
  ]);

  // Modal forms
  const [createDriveModal, setCreateDriveModal] = useState(false);
  const [newDriveForm, setNewDriveForm] = useState({ company: '', type: 'On-Campus', date: '', role: '', ctc: '', eligibility: '' });

  // AI Assistant States
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const calculateEligibility = () => {
    // Dynamic recalculation simulation
    const cgpaNum = parseFloat(eligibilityCriteria.minCgpa) || 0;
    const arrearsNum = parseInt(eligibilityCriteria.maxArrears) || 0;
    
    let count = 450;
    if (cgpaNum >= 8.5) count = 80;
    else if (cgpaNum >= 7.5) count = 220;
    else if (cgpaNum >= 6.5) count = 380;
    
    if (arrearsNum === 0) count = Math.floor(count * 0.8);
    else count = Math.floor(count * 0.95);

    setEligibilityResultCount(count);
    Alert.alert('Filter Updated', `TPMS filtered eligible student count: ${count}`);
  };

  const handleCreateDrive = () => {
    if (!newDriveForm.company || !newDriveForm.role) return;
    setDrives([...drives, { id: Math.random().toString(), ...newDriveForm }]);
    setCreateDriveModal(false);
    setNewDriveForm({ company: '', type: 'On-Campus', date: '', role: '', ctc: '', eligibility: '' });
    Alert.alert('Drive Scheduled', 'Placement drive broadcasted to eligible students.');
  };

  const handleRunAIATS = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiAnalysis(`[Placement AI Skill Gap & ATS Report]\n\nAnalysis Summary:\n1. 78% of registered final years are qualified in DSA fundamentals.\n2. Gap Identified: Lack of Cloud (AWS/Azure) hands-on experience.\n3. ATS Score average: 68/100. Recommend technical training in backend sharding.\n4. Risk Index: Low (85% expected placement rate by graduation).`);
      setIsGenerating(false);
    }, 1200);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'EligibleStudents':
        return (
          <View className="space-y-6">
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 space-y-4">
              <Text className="text-white font-bold text-lg">TPMS Eligibility Rule Engine</Text>
              
              <View className="flex-row gap-4">
                <View className="flex-1">
                  <Text className="text-slate-400 text-[10px] uppercase font-bold mb-2">Min CGPA</Text>
                  <TextInput 
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs h-12"
                    value={eligibilityCriteria.minCgpa}
                    onChangeText={(t) => setEligibilityCriteria({...eligibilityCriteria, minCgpa: t})}
                    keyboardType="numeric"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-400 text-[10px] uppercase font-bold mb-2">Max Arrears</Text>
                  <TextInput 
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs h-12"
                    value={eligibilityCriteria.maxArrears}
                    onChangeText={(t) => setEligibilityCriteria({...eligibilityCriteria, maxArrears: t})}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View>
                <Text className="text-slate-400 text-[10px] uppercase font-bold mb-2">Department Restrictions</Text>
                <TextInput 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs h-12"
                  value={eligibilityCriteria.dept}
                  onChangeText={(t) => setEligibilityCriteria({...eligibilityCriteria, dept: t})}
                />
              </View>

              <TouchableOpacity onPress={calculateEligibility} className="bg-blue-600 p-4 rounded-xl items-center mt-4">
                <Text className="text-white font-bold text-xs">Run Eligibility Filter</Text>
              </TouchableOpacity>
            </View>

            <View className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
              <View>
                <Text className="text-white font-bold text-lg">Filtering Results</Text>
                <Text className="text-slate-400 text-xs mt-1">CS, IT, AI Batches • Min attendance: 75%</Text>
              </View>
              <View className="bg-green-600/10 px-4 py-2 rounded-xl border border-green-500/20">
                <Text className="text-green-400 font-bold text-lg">{eligibilityResultCount} Eligible</Text>
              </View>
            </View>
          </View>
        );

      case 'CompaniesList':
        return (
          <View className="space-y-6">
            <Text className="text-white text-2xl font-bold">CRM Recruiter Database</Text>
            {recruiters.map((rec) => (
              <View key={rec.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10">
                <View className="flex-row justify-between items-center mb-3">
                  <View>
                    <Text className="text-white font-bold text-lg">{rec.company}</Text>
                    <Text className="text-slate-400 text-xs">{rec.contact}</Text>
                  </View>
                  <View className="bg-blue-600/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                    <Text className="text-blue-400 text-[10px] font-bold">{rec.status}</Text>
                  </View>
                </View>
                <Text className="text-slate-300 text-xs border-t border-white/5 pt-3">
                  Hiring History: 2025 ({rec.offers2025} offers) | 2026 ({rec.offers2026} offers) • Avg CTC: {rec.avgCtc}
                </Text>
              </View>
            ))}
          </View>
        );

      case 'ManageDrives':
        return (
          <View className="space-y-6">
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text className="text-white text-2xl font-bold">Placement Season Drives</Text>
                <Text className="text-slate-400 text-xs">Configure campus & virtual recruitment drives</Text>
              </View>
              <TouchableOpacity onPress={() => setCreateDriveModal(true)} className="bg-blue-600 p-3 rounded-xl">
                <Plus color="white" size={16} />
              </TouchableOpacity>
            </View>

            {drives.map((drv) => (
              <View key={drv.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-white font-bold text-lg">{drv.company}</Text>
                    <Text className="text-slate-400 text-xs mt-1">{drv.role} • {drv.type}</Text>
                  </View>
                  <View className="bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    <Text className="text-blue-400 text-[10px] font-bold">{drv.ctc}</Text>
                  </View>
                </View>
                <View className="w-full h-px bg-white/5 my-4" />
                <View className="flex-row justify-between items-center">
                  <Text className="text-slate-400 text-xs">Drive Date: {drv.date} • {drv.eligibility}</Text>
                  <TouchableOpacity onPress={() => Alert.alert('Details', 'Opening applicants roster...')} className="bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                    <Text className="text-slate-300 font-bold text-xs">View Candidates</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );

      case 'Analytics':
        return (
          <View className="space-y-6">
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 space-y-4">
              <Text className="text-white font-bold text-lg">AI Resume & Skill Gap Analyzer</Text>
              <Text className="text-slate-400 text-xs leading-relaxed">
                Run machine learning analysis comparing student profiles against corporate market demand to identify training fields.
              </Text>
              <TouchableOpacity onPress={handleRunAIATS} className="bg-blue-600 p-4 rounded-xl flex-row justify-center items-center gap-2">
                <Sparkles color="white" size={16} />
                <Text className="text-white font-bold text-xs">{isGenerating ? 'Analyzing Roster...' : 'Generate Skill Gap Report'}</Text>
              </TouchableOpacity>
              {aiAnalysis ? (
                <View className="bg-white/5 p-4 rounded-xl border border-white/10 mt-4">
                  <Text className="text-slate-300 text-xs leading-relaxed">{aiAnalysis}</Text>
                </View>
              ) : null}
            </View>
          </View>
        );

      case 'SafeChat':
        return <MessageCenter />;

            default:
        return <PlacementHomeTab setMenuVisible={setMenuVisible} setActiveTab={setActiveTab} />;
    }
  };

  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  return (
    <Container style={{ flex: 1, backgroundColor: '#0F172A' } as any}>
      <View style={{ flex: 1, flexDirection: Platform.OS === 'web' ? 'row' : 'column' }}>
        
        {/* Web permanent sidebar - left side column */}
        {Platform.OS === 'web' && (
          <ScrollView style={{ width: 280, backgroundColor: '#0B0F19', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.08)', height: '100%' }} contentContainerStyle={{ padding: 24, paddingBottom: 60 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true} className="">
            <Text className="text-2xl font-bold text-white mb-6">Placement Hub</Text>
            <View className="space-y-4">
              
              <View>
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Operations</Text>
                <View className="space-y-1">
                  {[
                    { id: 'Home', icon: Home, label: 'Dashboard' },
                    { id: 'EligibleStudents', icon: Users, label: 'Eligible Students' },
                    { id: 'CompaniesList', icon: Building2, label: 'Companies Database' },
                    { id: 'ManageDrives', icon: Briefcase, label: 'Manage Drives' },
                    { id: 'Analytics', icon: Sparkles, label: 'AI Placement Analytics' },
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

            </View>
          </ScrollView>
        )}

        {/* Right content / workspace column */}
        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24, ...(Platform.OS === 'web' ? { overflowY: 'auto' } : {}), minHeight: 0 } as any}>
          {renderContent()}
        </View>

        <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Mobile Menu Modal */}
        <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
          <View className="flex-1 bg-black/80 flex-row">
            <View className="w-72 bg-[#0F172A] p-8 border-r border-white/10">
              <View className="flex-row justify-between items-center mb-8">
                <Text className="text-2xl font-bold text-white">Placement Menu</Text>
                <TouchableOpacity onPress={() => setMenuVisible(false)}>
                  <X color="white" size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true} className="">
                <View className="space-y-2">
                  {[
                    { id: 'Home', icon: Home, label: 'Dashboard' },
                    { id: 'EligibleStudents', icon: Users, label: 'Eligible Students' },
                    { id: 'CompaniesList', icon: Building2, label: 'Companies Database' },
                    { id: 'ManageDrives', icon: Briefcase, label: 'Manage Drives' },
                    { id: 'Analytics', icon: Sparkles, label: 'AI Placement Analytics' },
                    { id: 'SafeChat', icon: MessageSquare, label: 'SafeChat' }
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

        {/* Create Drive Modal */}
        <Modal animationType="slide" transparent={true} visible={createDriveModal} onRequestClose={() => setCreateDriveModal(false)}>
          <View className="flex-1 justify-center items-center bg-black/60 p-4">
            <View className="bg-[#1E293B] w-full max-w-lg p-8 rounded-[32px] border border-white/10">
              <Text className="text-white text-2xl font-bold mb-4">Create Placement Drive</Text>
              <View className="space-y-4">
                <TextInput 
                  placeholder="Company Name" 
                  placeholderTextColor="#64748b" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  value={newDriveForm.company}
                  onChangeText={(t) => setNewDriveForm({...newDriveForm, company: t})}
                />
                <TextInput 
                  placeholder="Role / Title" 
                  placeholderTextColor="#64748b" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  value={newDriveForm.role}
                  onChangeText={(t) => setNewDriveForm({...newDriveForm, role: t})}
                />
                <TextInput 
                  placeholder="CTC package (e.g. 14 LPA)" 
                  placeholderTextColor="#64748b" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  value={newDriveForm.ctc}
                  onChangeText={(t) => setNewDriveForm({...newDriveForm, ctc: t})}
                />
                <TextInput 
                  placeholder="Eligibility rules" 
                  placeholderTextColor="#64748b" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  value={newDriveForm.eligibility}
                  onChangeText={(t) => setNewDriveForm({...newDriveForm, eligibility: t})}
                />
                <TouchableOpacity onPress={handleCreateDrive} className="bg-blue-600 p-4 rounded-xl items-center mt-4">
                  <Text className="text-white font-bold">Schedule Drive</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCreateDriveModal(false)} className="p-2 items-center">
                  <Text className="text-slate-400">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Container>
  );
};
