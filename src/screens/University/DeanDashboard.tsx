import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Modal, TextInput, Alert, Platform } from 'react-native';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Layers, Database, Wallet, Info
} from 'lucide-react-native';
import { useStore } from '../../store/useStore';
import { useScrollEvents } from '../../hooks/useScrollEvents';
import { StatCard } from '../../components/Dashboard/StatCard';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { MessageCenter } from '../../components/Dashboard/MessageCenter';

export const DeanDashboard = () => {
  const { user, setUser, leaveRequests, updateLeaveStatus, assignments, addAssignment } = useStore();
  const [activeTab, setActiveTab] = useState('Home');
  const [menuVisible, setMenuVisible] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Scroll event tracking
  const { handleScroll: handleMainScroll } = useScrollEvents();

  // Simulated Engineering School Data (Dean of SET)
  const [schoolDepartments, setSchoolDepartments] = useState([
    { code: 'CSE', name: 'Computer Science & Engineering', facultyCount: 16, students: 480, progress: '68%' },
    { code: 'CS-CYBER', name: 'CSE Cyber Security', facultyCount: 8, students: 240, progress: '72%' },
    { code: 'AI-DS', name: 'Artificial Intelligence & Data Science', facultyCount: 8, students: 200, progress: '64%' },
    { code: 'AI-ML', name: 'AI & Machine Learning', facultyCount: 6, students: 120, progress: '60%' },
    { code: 'ECE', name: 'Electronics & Communication Engineering', facultyCount: 10, students: 320, progress: '58%' },
    { code: 'BIOTECH', name: 'Biotechnology', facultyCount: 4, students: 80, progress: '55%' }
  ]);

  const [schoolBudgets, setSchoolBudgets] = useState([
    { id: '1', item: 'AI Research Lab Server GPU Upgrade', amount: '$45,000', status: 'Pending Approval' },
    { id: '2', item: 'Biotechnology Lab Consumables', amount: '$12,000', status: 'Approved' },
    { id: '3', item: 'CSE International FDP Guest Honorarium', amount: '$5,000', status: 'Pending Approval' }
  ]);

  const [schoolFaculty, setSchoolFaculty] = useState([
    { name: 'Dr. Sarah Smith', dept: 'CSE', workload: '18h/wk', rating: '4.8/5' },
    { name: 'Dr. Sarah Wilson', dept: 'AI-DS', workload: '16h/wk', rating: '4.6/5' },
    { name: 'Dr. Gregory House', dept: 'CSE', workload: '14h/wk', rating: '4.7/5' }
  ]);

  // Dean School approvals queue (leaves, events, budgets, purchases)
  const [approvalsQueue, setApprovalsQueue] = useState([
    { id: 'APP-001', type: 'Budget Request', details: 'AI Research Lab GPU Upgrade ($45,000)', dept: 'CSE', requester: 'Dr. Sarah Smith' },
    { id: 'APP-002', type: 'Event Proposal', details: 'National Workshop on Cyber Forensics', dept: 'CS-CYBER', requester: 'Prof. Albus Dumbledore' },
    { id: 'APP-003', type: 'Equipment Purchase', details: 'Biotech Distillation Unit ($8,500)', dept: 'BIOTECH', requester: 'Dr. Sarah Wilson' }
  ]);
  // Staff Console simulated states
  const [localStudents, setLocalStudents] = useState([
    { id: 'STU-001', name: 'John Doe', attendance: 82, marks: 88, parent: 'Robert Wilson (parent@university.com)', slowLearner: false, subject: 'Advanced Algorithms', batch: '3rd Year', section: 'Section A' },
    { id: 'STU-002', name: 'Mark Ruffalo', attendance: 72, marks: 54, parent: 'Frank Ruffalo (frank@mail.com)', slowLearner: true, subject: 'Distributed Systems', batch: '3rd Year', section: 'Section B' },
    { id: 'STU-003', name: 'Alice Becker', attendance: 68, marks: 95, parent: 'Sarah Becker (sarah@mail.com)', slowLearner: false, subject: 'Advanced Algorithms', batch: '3rd Year', section: 'Section A' },
    { id: 'STU-004', name: 'Gwen Stacy', attendance: 95, marks: 98, parent: 'George Stacy (george@mail.com)', slowLearner: false, subject: 'Distributed Systems', batch: '3rd Year', section: 'Section B' }
  ]);
  const [filterSubject, setFilterSubject] = useState('Advanced Algorithms');
  const [filterBatch, setFilterBatch] = useState('3rd Year');
  const [filterSection, setFilterSection] = useState('Section A');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentDetailModal, setStudentDetailModal] = useState(false);
  const [editMarksForm, setEditMarksForm] = useState({ studentId: '', marks: '' });

  const [assignmentModal, setAssignmentModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', course: '', deadline: '', maxMarks: '100' });

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [myLeaveReason, setMyLeaveReason] = useState('');
  const [myLeavesList, setMyLeavesList] = useState<any[]>([]);

  const filteredStudents = localStudents.filter(
    (st) => st.subject === filterSubject && st.batch === filterBatch && st.section === filterSection
  );

  const renderFilterSelectors = () => (
    <View className="bg-white/5 p-6 rounded-3xl border border-white/10 mb-6 space-y-4">
      <Text className="text-white font-bold text-xs">Filter Student Group</Text>
      
      <View>
        <Text className="text-slate-400 text-[9px] uppercase font-bold mb-1.5">Subject</Text>
        <View className="flex-row gap-2">
          {['Advanced Algorithms', 'Distributed Systems'].map((sub) => (
            <TouchableOpacity 
              key={sub} 
              onPress={() => setFilterSubject(sub)}
              className={`px-3 py-1.5 rounded-lg border ${filterSubject === sub ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10'}`}
            >
              <Text className="text-white text-[10px] font-bold">{sub}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="flex-row gap-4">
        <View className="flex-1">
          <Text className="text-slate-400 text-[9px] uppercase font-bold mb-1.5">Batch / Year</Text>
          <View className="flex-row gap-2">
            {['3rd Year', '2nd Year'].map((bat) => (
              <TouchableOpacity 
                key={bat} 
                onPress={() => setFilterBatch(bat)}
                className={`flex-1 py-1.5 rounded-lg border ${filterBatch === bat ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10'}`}
              >
                <Text className="text-white text-center text-[10px] font-bold">{bat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="flex-1">
          <Text className="text-slate-400 text-[9px] uppercase font-bold mb-1.5">Section</Text>
          <View className="flex-row gap-2">
            {['Section A', 'Section B'].map((sec) => (
              <TouchableOpacity 
                key={sec} 
                onPress={() => setFilterSection(sec)}
                className={`flex-1 py-1.5 rounded-lg border ${filterSection === sec ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10'}`}
              >
                <Text className="text-white text-center text-[10px] font-bold">{sec}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const handleAISuggest = () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      setAiOutput(`[AI Lesson Planner - Bloom's Taxonomy]\n\nTopic: ${aiPrompt}\n\n1. Remember & Understand: Cover definitions and basic data structures (1 Hour).\n2. Apply & Analyze: Implement simple operations (stack, queue) (2 Hours).\n3. Evaluate & Create: Map optimization complexities to PO-1 & PSO-2 (1 Hour).`);
      setIsGenerating(false);
    }, 1000);
  };

  const handleCreateAssignment = () => {
    if (!newAssignment.title || !newAssignment.course) return;
    addAssignment({
      id: Math.random().toString(36).substr(2, 9),
      title: newAssignment.title,
      deadline: newAssignment.deadline || '2026-07-15',
      totalMarks: parseInt(newAssignment.maxMarks),
      submissions: 0,
      course: newAssignment.course
    });
    setAssignmentModal(false);
    setNewAssignment({ title: '', course: '', deadline: '', maxMarks: '100' });
    Alert.alert('Success', 'Assignment posted.');
  };
  const handleApproveDeanRequest = (id: string) => {
    setApprovalsQueue(prev => prev.filter(a => a.id !== id));
    Alert.alert('Approved', `Dean approved request: ${id}`);
  };

  const handleRejectDeanRequest = (id: string) => {
    setApprovalsQueue(prev => prev.filter(a => a.id !== id));
    Alert.alert('Rejected', `Request: ${id} has been rejected.`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Departments':
        return (
          <View className="space-y-6">
            <Text className="text-white text-2xl font-bold">School Departments Overview</Text>
            {schoolDepartments.map((dept) => (
              <View key={dept.code} className="bg-white/5 p-6 rounded-[32px] border border-white/10">
                <View className="flex-row justify-between items-center mb-3">
                  <View>
                    <Text className="text-white font-bold text-lg">{dept.name}</Text>
                    <Text className="text-slate-400 text-xs">Code: {dept.code} • Students: {dept.students}</Text>
                  </View>
                  <View className="bg-blue-600/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                    <Text className="text-blue-400 text-[10px] font-bold">Faculty: {dept.facultyCount}</Text>
                  </View>
                </View>
                <View className="h-1.5 bg-white/5 rounded-full overflow-hidden mt-3">
                  <View style={{ width: dept.progress as any }} className="h-full bg-blue-600 rounded-full" />
                </View>
                <Text className="text-slate-400 text-[10px] mt-2">Syllabus Completion: {dept.progress}</Text>
              </View>
            ))}
          </View>
        );

      case 'Faculty':
        return (
          <View className="space-y-6">
            <Text className="text-white text-2xl font-bold">School Faculty Directory</Text>
            {schoolFaculty.map((fac, idx) => (
              <View key={idx} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
                <View>
                  <Text className="text-white font-bold text-lg">{fac.name}</Text>
                  <Text className="text-slate-400 text-xs mt-1">Dept: {fac.dept} • Workload: {fac.workload}</Text>
                </View>
                <View className="bg-purple-600/15 px-4 py-2 rounded-xl border border-purple-500/20">
                  <Text className="text-purple-400 font-bold text-xs">Rating: {fac.rating}</Text>
                </View>
              </View>
            ))}
          </View>
        );

      case 'Approvals':
        return (
          <View className="space-y-6">
            <Text className="text-white text-2xl font-bold mb-2">Dean School Approval Roster</Text>
            {approvalsQueue.length === 0 ? (
              <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 items-center justify-center">
                <CheckCircle color="#10b981" size={40} className="mb-4" />
                <Text className="text-white font-bold text-lg">Zero Pending Approvals</Text>
                <Text className="text-slate-500 text-xs mt-2">All school budgets, equipment purchases, event proposals are fully cleared.</Text>
              </View>
            ) : null}

            {approvalsQueue.map((req) => (
              <View key={req.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-purple-400 text-[10px] font-bold uppercase">{req.type}</Text>
                    <Text className="text-white font-bold text-lg mt-1">{req.details}</Text>
                    <Text className="text-slate-400 text-xs mt-1">Dept: {req.dept} • Requester: {req.requester}</Text>
                  </View>
                </View>
                <View className="flex-row gap-4 mt-6">
                  <TouchableOpacity onPress={() => handleApproveDeanRequest(req.id)} className="flex-1 bg-green-600 p-3.5 rounded-xl items-center">
                    <Text className="text-white font-bold text-xs">APPROVE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleRejectDeanRequest(req.id)} className="flex-1 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl items-center">
                    <Text className="text-red-400 font-bold text-xs">REJECT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );

      case 'Budget':
        return (
          <View className="space-y-6">
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text className="text-white text-2xl font-bold">School Budgets & Purchases</Text>
                <Text className="text-slate-400 text-xs">Total SET Budget allocated: $250k (Remaining: $62k)</Text>
              </View>
            </View>
            {schoolBudgets.map((b) => (
              <View key={b.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
                <View className="flex-1 mr-4">
                  <Text className="text-white font-bold text-lg">{b.item}</Text>
                  <Text className="text-slate-400 text-xs mt-1">Amount: {b.amount}</Text>
                </View>
                <View className={`px-4 py-1.5 rounded-full border ${b.status === 'Approved' ? 'bg-green-500/10 border-green-500/20' : 'bg-orange-500/10 border-orange-500/20'}`}>
                  <Text className={`text-[10px] font-bold ${b.status === 'Approved' ? 'text-green-400' : 'text-orange-400'}`}>{b.status.toUpperCase()}</Text>
                </View>
              </View>
            ))}
          </View>
        );

      case 'StaffTimetable':
        return (
          <View className="space-y-6">
            <Text className="text-white text-2xl font-bold">My Personal Classes</Text>
            <View className="bg-white/5 p-6 rounded-[32px] border border-white/10">
              <Text className="text-slate-400 text-[10px] font-bold uppercase">Tuesday • 02:00 PM</Text>
              <Text className="text-white font-bold text-lg mt-1">Distributed Systems</Text>
              <Text className="text-blue-400 text-xs mt-1">Room LH 403</Text>
            </View>
          </View>
        );

      case 'StaffLeave':
        return (
          <View className="space-y-6">
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 space-y-4">
              <Text className="text-white font-bold text-lg">Apply for Personal Leave</Text>
              <TextInput 
                placeholder="Reason for leave..." 
                placeholderTextColor="#64748b" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs h-12"
                value={myLeaveReason}
                onChangeText={setMyLeaveReason}
              />
              <TouchableOpacity onPress={() => {
                if (!myLeaveReason) return;
                setMyLeavesList([...myLeavesList, { reason: myLeaveReason, date: 'Today', status: 'Approved' }]);
                setMyLeaveReason('');
                Alert.alert('Leave Logged', 'As Dean, your personal leave is logged and auto-approved.');
              }} className="bg-blue-600 p-4 rounded-xl items-center">
                <Text className="text-white font-bold text-xs">Submit Request</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-white font-bold text-lg mt-2">Personal Leave History</Text>
            {myLeavesList.map((l, i) => (
              <View key={i} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
                <View>
                  <Text className="text-white font-bold">{l.reason}</Text>
                  <Text className="text-slate-400 text-xs mt-1">Submitted: {l.date}</Text>
                </View>
                <View className="bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                  <Text className="text-green-400 text-[10px] font-bold">APPROVED</Text>
                </View>
              </View>
            ))}
          </View>
        );

      case 'StaffAttendance':
        return (
          <View className="space-y-6">
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text className="text-white text-2xl font-bold">Student Attendance</Text>
                <Text className="text-slate-400 text-xs">Verify classes, notify absentees</Text>
              </View>
              <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-xl">
                <Text className="text-white font-bold text-xs">Bulk Mark All Present</Text>
              </TouchableOpacity>
            </View>

            {renderFilterSelectors()}

            {filteredStudents.length === 0 ? (
              <View className="bg-white/5 p-8 rounded-[32px] border border-white/10 items-center justify-center">
                <Text className="text-slate-400 text-xs">No students registered in this filter configuration.</Text>
              </View>
            ) : null}

            {filteredStudents.map((st) => (
              <View key={st.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
                <View>
                  <Text className="text-white font-bold text-lg">{st.name}</Text>
                  <Text className="text-slate-400 text-xs mt-1">ID: {st.id}</Text>
                  <Text className={`text-xs font-bold mt-2 ${st.attendance < 75 ? 'text-red-400' : 'text-green-400'}`}>
                    Attendance: {st.attendance}% {st.attendance < 75 ? '(Shortage Alert)' : ''}
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  <TouchableOpacity className="bg-green-600 px-4 py-2 rounded-xl">
                    <Text className="text-white font-bold text-xs">Present</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl">
                    <Text className="text-red-400 font-bold text-xs">Absent</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );

      case 'StaffMarks':
        return (
          <View className="space-y-6">
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text className="text-white text-2xl font-bold">Internal Gradebook</Text>
                <Text className="text-slate-455 text-xs">Class Avg: 83.7%</Text>
              </View>
            </View>

            {renderFilterSelectors()}

            {filteredStudents.length === 0 ? (
              <View className="bg-white/5 p-8 rounded-[32px] border border-white/10 items-center justify-center">
                <Text className="text-slate-400 text-xs">No students registered in this filter configuration.</Text>
              </View>
            ) : null}

            {filteredStudents.map((st) => (
              <View key={st.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
                <View>
                  <Text className="text-white font-bold">{st.name}</Text>
                  <Text className="text-slate-400 text-xs mt-1">Grade: {st.marks}% • status: {st.marks >= 50 ? 'Pass' : 'Fail'}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                  setSelectedStudent(st);
                  setEditMarksForm({ studentId: st.id, marks: st.marks.toString() });
                  setStudentDetailModal(true);
                }} className="bg-blue-600/10 px-4 py-2 rounded-xl border border-blue-500/20">
                  <Text className="text-blue-400 font-bold text-xs">Edit Grade</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );

      case 'StaffAssignments':
        return (
          <View className="space-y-6">
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text className="text-white text-2xl font-bold">Coursework & Assignments</Text>
                <Text className="text-slate-450 text-xs">Evaluate submissions, define prompts</Text>
              </View>
              <TouchableOpacity onPress={() => setAssignmentModal(true)} className="bg-blue-600 p-3 rounded-xl">
                <Plus color="white" size={16} />
              </TouchableOpacity>
            </View>

            {assignments.map((asm) => (
              <View key={asm.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-white font-bold text-lg">{asm.title}</Text>
                    <Text className="text-slate-450 text-xs mt-1">{asm.course} • Deadline: {asm.deadline}</Text>
                  </View>
                  <View className="bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    <Text className="text-blue-400 text-[10px] font-bold">Max Marks: {asm.totalMarks}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        );

      case 'StaffLessonPlans':
        return (
          <View className="space-y-6">
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 space-y-4">
              <Text className="text-white font-bold text-lg">AI Syllabus & Lesson Planner</Text>
              <TextInput 
                placeholder="Topic / Chapter details..." 
                placeholderTextColor="#64748b" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs h-12"
                value={aiPrompt}
                onChangeText={setAiPrompt}
              />
              <TouchableOpacity onPress={handleAISuggest} className="bg-blue-600 p-4 rounded-xl flex-row justify-center items-center gap-2">
                <Sparkles color="white" size={16} />
                <Text className="text-white font-bold text-xs">{isGenerating ? 'Analyzing...' : 'Generate AI Lesson Plan'}</Text>
              </TouchableOpacity>
              {aiOutput ? (
                <View className="bg-white/5 p-4 rounded-xl border border-white/10 mt-4">
                  <Text className="text-slate-300 text-xs leading-relaxed">{aiOutput}</Text>
                </View>
              ) : null}
            </View>
          </View>
        );

      case 'StaffResearch':
        return (
          <View className="space-y-6">
            <Text className="text-white text-2xl font-bold mb-2">My Research Portfolio</Text>
            {[
              { type: 'Journal Publication', title: 'Federated Learning Frameworks in Private Cloud ERPs', date: 'Published May 2026', source: 'IEEE Transactions' },
              { type: 'Conference Proceeding', title: 'Heuristic Resource Mapping for Multi-Tenant Architectures', date: 'Presented April 2026', source: 'ICAC-26' },
              { type: 'Patent Logged', title: 'System and Method for Encrypted Distributed Database Sharding', date: 'Filed March 2026', source: 'IPO Reg Office' }
            ].map((res, i) => (
              <View key={i} className="bg-white/5 p-6 rounded-[32px] border border-white/10">
                <Text className="text-purple-400 text-[10px] font-bold uppercase">{res.type}</Text>
                <Text className="text-white font-bold text-lg mt-1">{res.title}</Text>
                <Text className="text-slate-450 text-xs mt-1">{res.source} • {res.date}</Text>
              </View>
            ))}
          </View>
        );

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
                  <Text className="text-slate-400 text-sm font-medium">School of Engineering & Technology</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>Dean Console</Text>
                </View>
              </View>
              <View className="flex-row gap-3">
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
              <StatCard title="Total Departments" value="6" icon={Layers} trend="SET School" color="#3b82f6" />
              <StatCard title="Total Faculty" value="52" icon={Users} trend="12 Ph.D. Scholars" color="#10b981" />
            </View>

            <View className="flex-row mb-8">
              <StatCard title="Syllabus Progress" value="65%" icon={BookOpen} trend="On Track" color="#8b5cf6" />
              <StatCard title="Pending Approvals" value={approvalsQueue.length.toString()} icon={AlertCircle} color="#ef4444" />
            </View>

            {/* Strategic Oversight */}
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8 flex-row justify-between items-center">
              <View>
                <Text className="text-white font-bold text-lg">School Placement Rate</Text>
                <Text className="text-slate-400 text-xs mt-1">SET Eligible: 140 students • Offers: 122</Text>
              </View>
              <View className="bg-blue-600/15 p-4 rounded-full border border-blue-500/20">
                <Text className="text-blue-400 font-bold text-xl">87%</Text>
              </View>
            </View>

            {/* Quick Actions Shortcuts */}
            <View className="mb-10">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Quick Shortcuts</Text>
              <View className="flex-row flex-wrap gap-3">
                {[
                  { label: 'View Departments', id: 'Departments' },
                  { label: 'Faculty Directory', id: 'Faculty' },
                  { label: 'Approvals Queue', id: 'Approvals' },
                  { label: 'School Budgets', id: 'Budget' }
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
            <Text className="text-2xl font-bold text-white mb-6">Dean Office</Text>
            <View className="space-y-4">
              
              <View>
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">School Administration</Text>
                <View className="space-y-1">
                  {[
                    { id: 'Home', icon: Home, label: 'Dashboard' },
                    { id: 'Departments', icon: Layers, label: 'Departments' },
                    { id: 'Faculty', icon: Users, label: 'Faculty Workload' },
                    { id: 'Approvals', icon: CheckCircle, label: 'Approvals Queue' },
                    { id: 'Budget', icon: Wallet, label: 'Budget & Purchases' },
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
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">My Staff Operations</Text>
                <View className="space-y-1">
                  {[
                    { id: 'StaffTimetable', icon: Calendar, label: 'My Timetable' },
                    { id: 'StaffLeave', icon: RefreshCw, label: 'Apply Personal Leave' },
                    { id: 'StaffAttendance', icon: Clock, label: 'Student Attendance' },
                    { id: 'StaffMarks', icon: ClipboardList, label: 'Internal Marks' },
                    { id: 'StaffAssignments', icon: FileText, label: 'Assignments' },
                    { id: 'StaffLessonPlans', icon: BookOpen, label: 'Lesson Plan' },
                    { id: 'StaffResearch', icon: Award, label: 'My Research' }
                  ].map((item) => (
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
                <Text className="text-2xl font-bold text-white">Dean Menu</Text>
                <TouchableOpacity onPress={() => setMenuVisible(false)}>
                  <X color="white" size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View className="space-y-2">
                  {[
                    { id: 'Home', icon: Home, label: 'Dashboard' },
                    { id: 'Departments', icon: Layers, label: 'Departments' },
                    { id: 'Faculty', icon: Users, label: 'Faculty Workload' },
                    { id: 'Approvals', icon: CheckCircle, label: 'Approvals Queue' },
                    { id: 'Budget', icon: Wallet, label: 'Budget & Purchases' },
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

                  <View className="p-3 border-t border-white/5 mt-4">
                    <Text className="text-slate-505 text-[9px] font-bold uppercase">My Staff Operations</Text>
                  </View>

                  {[
                    { id: 'StaffTimetable', icon: Calendar, label: 'My Timetable' },
                    { id: 'StaffLeave', icon: RefreshCw, label: 'Apply Personal Leave' },
                    { id: 'StaffAttendance', icon: Clock, label: 'Student Attendance' },
                    { id: 'StaffMarks', icon: ClipboardList, label: 'Internal Marks' },
                    { id: 'StaffAssignments', icon: FileText, label: 'Assignments' },
                    { id: 'StaffLessonPlans', icon: BookOpen, label: 'Lesson Plan' },
                    { id: 'StaffResearch', icon: Award, label: 'My Research' }
                  ].map((item) => (
                    <TouchableOpacity 
                      key={item.id} 
                      onPress={() => {
                        setActiveTab(item.id);
                        setMenuVisible(false);
                      }} 
                      className={`p-4 rounded-2xl flex-row items-center ${activeTab === item.id ? 'bg-purple-600' : 'hover:bg-white/5'}`}
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
