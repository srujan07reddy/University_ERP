import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Modal, TextInput, Alert, Platform } from 'react-native';
import { useScrollEvents } from '../../hooks/useScrollEvents';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw
} from 'lucide-react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { MessageCenter } from '../../components/Dashboard/MessageCenter';

export const FacultyDashboard = () => {
  const { user, setUser, users, updateUser, assignments, addAssignment, notes, addNote, leaveRequests, addLeaveRequest } = useStore();
  const facultyData = user?.universityData?.facultyData;
  const [activeTab, setActiveTab] = useState('Home');
  const [menuVisible, setMenuVisible] = useState(false);
  
  // Scroll event tracking
  const { handleScroll: handleMainScroll, scrollPosition } = useScrollEvents();

  // Module Forms/Modal States
  const [marksModal, setMarksModal] = useState(false);
  const [assignmentModal, setAssignmentModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const [leaveModal, setLeaveModal] = useState(false);
  const [eventModal, setEventModal] = useState(false);
  
  // Form State
  const [newAssignment, setNewAssignment] = useState({ title: '', course: '', deadline: '', maxMarks: '100' });
  const [newNote, setNewNote] = useState({ title: '', content: '', course: '', section: '', year: '3rd Year', dept: 'Computer Science' });
  const [newLeave, setNewLeave] = useState({ reason: '', type: 'Casual Leave' as any });
  const [newEvent, setNewEvent] = useState({ name: '', type: 'Workshop', budget: '500' });
  
  // Simulated State Data
  const [localStudents, setLocalStudents] = useState([
    { id: 'STU-001', name: 'John Doe', attendance: 82, marks: 88, parent: 'Robert Wilson (parent@university.com)', slowLearner: false, subject: 'Advanced Algorithms', batch: '3rd Year', section: 'Section A' },
    { id: 'STU-002', name: 'Mark Ruffalo', attendance: 72, marks: 54, parent: 'Frank Ruffalo (frank@mail.com)', slowLearner: true, subject: 'Distributed Systems', batch: '3rd Year', section: 'Section B' },
    { id: 'STU-003', name: 'Alice Becker', attendance: 68, marks: 95, parent: 'Sarah Becker (sarah@mail.com)', slowLearner: false, subject: 'Advanced Algorithms', batch: '3rd Year', section: 'Section A' },
    { id: 'STU-004', name: 'Gwen Stacy', attendance: 95, marks: 98, parent: 'George Stacy (george@mail.com)', slowLearner: false, subject: 'Distributed Systems', batch: '3rd Year', section: 'Section B' }
  ]);
  const [filterSubject, setFilterSubject] = useState('Advanced Algorithms');
  const [filterBatch, setFilterBatch] = useState('3rd Year');
  const [filterSection, setFilterSection] = useState('Section A');

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

  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentDetailModal, setStudentDetailModal] = useState(false);
  const [editMarksForm, setEditMarksForm] = useState({ studentId: '', marks: '' });

  // AI Assistant States
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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
    Alert.alert('Success', 'Assignment posted successfully.');
  };

  const handleUploadNote = () => {
    if (!newNote.title || !newNote.content) return;
    addNote({
      id: Math.random().toString(36).substr(2, 9),
      sender: user?.name || 'Faculty',
      title: newNote.title,
      content: newNote.content,
      date: new Date().toISOString().split('T')[0],
      department: newNote.dept
    });
    setNoteModal(false);
    setNewNote({ title: '', content: '', course: '', section: '', year: '3rd Year', dept: 'Computer Science' });
    Alert.alert('Success', 'Notes shared with students.');
  };

  const handleApplyLeave = () => {
    if (!newLeave.reason) return;
    addLeaveRequest({
      id: Math.random().toString(36).substr(2, 9),
      senderId: user?.id || 'faculty',
      senderName: user?.name || 'Prof. Sarah Smith',
      receiverRole: 'HoD',
      reason: newLeave.reason,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    });
    setLeaveModal(false);
    setNewLeave({ reason: '', type: 'Casual Leave' });
    Alert.alert('Success', 'Leave application submitted to HOD.');
  };

  const handleAISuggest = () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      setAiOutput(`[AI Suggestion for: "${aiPrompt}"]\n\nLesson Plan Outline:\n1. Introduction to topic concepts (30 mins)\n2. Interactive quiz mapped to CO-1 (15 mins)\n3. Case study discussion & PPT resources (30 mins)\n4. Q&A summary session (15 mins)`);
      setIsGenerating(false);
    }, 1200);
  };

  const notifyAbsentee = (studentName: string) => {
    Alert.alert('FCM Notification Sent', `An automated attendance alert has been dispatched to ${studentName} and their parent.`);
  };

  const exportExcel = () => {
    Alert.alert('Export Complete', 'Grades ledger downloaded as XLS sheet.');
  };

  const importExcel = () => {
    Alert.alert('Excel Simulated Import', 'Parsed 4 student grade sheets and updated marks dashboard.');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'My Profile':
        return (
          <View className="space-y-6">
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 items-center">
              <View className="w-24 h-24 bg-blue-600 rounded-full items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                <User color="white" size={48} />
              </View>
              <Text className="text-white text-2xl font-bold">{user?.name}</Text>
              <Text className="text-slate-400 text-sm">{facultyData?.designation} • {facultyData?.department}</Text>
              
              <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-2xl flex-row items-center mt-6 gap-2">
                <Download color="white" size={16} />
                <Text className="text-white font-bold text-xs">Download Digital ID Card</Text>
              </TouchableOpacity>
            </View>

            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 space-y-4">
              <Text className="text-white font-bold text-lg mb-2">Qualifications & Details</Text>
              <View className="flex-row justify-between border-b border-white/5 py-3">
                <Text className="text-slate-400 text-xs">Faculty ID</Text>
                <Text className="text-white font-bold text-xs">{facultyData?.facultyId}</Text>
              </View>
              <View className="flex-row justify-between border-b border-white/5 py-3">
                <Text className="text-slate-400 text-xs">Workload Target</Text>
                <Text className="text-white font-bold text-xs">{facultyData?.teachingHoursPerWeek} hrs / week</Text>
              </View>
              <View className="flex-row justify-between border-b border-white/5 py-3">
                <Text className="text-slate-400 text-xs">Research Publications</Text>
                <Text className="text-white font-bold text-xs">{facultyData?.publications} papers</Text>
              </View>
              <View className="flex-row justify-between py-3">
                <Text className="text-slate-400 text-xs">Emergency Contact</Text>
                <Text className="text-slate-300 text-xs font-bold">+91 98765 43210</Text>
              </View>
            </View>
          </View>
        );

      case 'Timetable':
        return (
          <View className="space-y-6">
            <Text className="text-white text-2xl font-bold mb-2">Weekly Schedule</Text>
            {[
              { day: 'Monday', time: '10:00 AM', subject: 'Advanced Algorithms', room: 'Lab 3 (Ground Floor)' },
              { day: 'Tuesday', time: '02:00 PM', subject: 'Distributed Systems', room: 'LH 402' },
              { day: 'Wednesday', time: '11:30 AM', subject: 'Advanced Algorithms', room: 'LH 403' },
              { day: 'Thursday', time: '09:00 AM', subject: 'Distributed Systems', room: 'Lab 5 (2nd Floor)' },
            ].map((slot, i) => (
              <View key={i} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
                <View>
                  <Text className="text-slate-400 text-[10px] font-bold uppercase">{slot.day} • {slot.time}</Text>
                  <Text className="text-white font-bold text-lg mt-1">{slot.subject}</Text>
                  <Text className="text-blue-400 text-xs mt-1">{slot.room}</Text>
                </View>
                <TouchableOpacity className="bg-purple-600/20 px-3 py-1.5 rounded-full border border-purple-500/20">
                  <Text className="text-purple-400 text-[10px] font-bold">REPLACEMENT CLASS</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );

      case 'Attendance':
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
                  <Text className="text-slate-400 text-xs mt-1">ID: {st.id} • Parent: {st.parent.split(' (')[0]}</Text>
                  <Text className={`text-xs font-bold mt-2 ${st.attendance < 75 ? 'text-red-400' : 'text-green-400'}`}>
                    Attendance: {st.attendance}% {st.attendance < 75 ? '(Shortage Alert)' : ''}
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  {st.attendance < 75 && (
                    <TouchableOpacity onPress={() => notifyAbsentee(st.name)} className="bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
                      <Bell color="#ef4444" size={16} />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={() => {
                    setSelectedStudent(st);
                    setEditMarksForm({ studentId: st.id, marks: st.marks.toString() });
                    setStudentDetailModal(true);
                  }} className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <Edit color="#94a3b8" size={16} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );

      case 'Marks':
        return (
          <View className="space-y-6">
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text className="text-white text-2xl font-bold">Internal Gradebook</Text>
                <Text className="text-slate-400 text-xs">Class Avg: 83.7% • Slow Learners: {localStudents.filter(s => s.slowLearner).length}</Text>
              </View>
              <View className="flex-row gap-2">
                <TouchableOpacity onPress={importExcel} className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <Upload color="white" size={16} />
                </TouchableOpacity>
                <TouchableOpacity onPress={exportExcel} className="bg-blue-600 p-3 rounded-xl">
                  <Download color="white" size={16} />
                </TouchableOpacity>
              </View>
            </View>

            {renderFilterSelectors()}

            {/* Toppers & Slow Learners cards */}
            <View className="flex-row gap-4 mb-2">
              <View className="flex-1 bg-green-500/10 p-5 rounded-3xl border border-green-500/20">
                <Text className="text-green-400 font-bold text-xs uppercase">Class Topper</Text>
                <Text className="text-white font-bold text-lg mt-1">{filterSubject === 'Advanced Algorithms' ? 'Alice Becker' : 'Gwen Stacy'}</Text>
                <Text className="text-slate-400 text-xs mt-1">Score: {filterSubject === 'Advanced Algorithms' ? '95%' : '98%'}</Text>
              </View>
              <View className="flex-1 bg-orange-500/10 p-5 rounded-3xl border border-orange-500/20">
                <Text className="text-orange-400 font-bold text-xs uppercase">Slow Learner Alert</Text>
                <Text className="text-white font-bold text-lg mt-1">{filterSubject === 'Advanced Algorithms' ? 'Alice Becker' : 'Mark Ruffalo'}</Text>
                <Text className="text-slate-400 text-xs mt-1">Needs counseling</Text>
              </View>
            </View>

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
                  <Text className="text-blue-400 font-bold text-xs">EDIT MARKS</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );

      case 'Assignments':
        return (
          <View className="space-y-6">
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text className="text-white text-2xl font-bold">Coursework & Assignments</Text>
                <Text className="text-slate-400 text-xs">Evaluate submissions, define prompts</Text>
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
                    <Text className="text-slate-400 text-xs mt-1">{asm.course} • Deadline: {asm.deadline}</Text>
                  </View>
                  <View className="bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    <Text className="text-blue-400 text-[10px] font-bold">Max Marks: {asm.totalMarks}</Text>
                  </View>
                </View>
                <View className="w-full h-px bg-white/5 my-4" />
                <View className="flex-row justify-between items-center">
                  <Text className="text-slate-400 text-xs">Submissions: {asm.submissions || 3} students</Text>
                  <TouchableOpacity onPress={() => Alert.alert('Grading Console', 'Opening submission viewer...')} className="bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                    <Text className="text-slate-300 font-bold text-xs">Evaluate Submissions</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );

      case 'LessonPlans':
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

            <Text className="text-white font-bold text-lg mt-2">Syllabus Completion Tracker</Text>
            {[
              { course: 'Advanced Algorithms', progress: 65, status: 'On Track' },
              { course: 'Distributed Systems', progress: 40, status: 'Behind Schedule' }
            ].map((plan, idx) => (
              <View key={idx} className="bg-white/5 p-6 rounded-[32px] border border-white/10 space-y-4">
                <View className="flex-row justify-between items-center">
                  <Text className="text-white font-bold">{plan.course}</Text>
                  <Text className={`text-[10px] font-bold uppercase ${plan.status === 'On Track' ? 'text-green-400' : 'text-orange-400'}`}>{plan.status}</Text>
                </View>
                <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <View style={{ width: `${plan.progress}%` as any }} className="h-full bg-blue-600 rounded-full" />
                </View>
                <View className="flex-row justify-between items-center mt-2">
                  <Text className="text-slate-400 text-xs">Mapped Outcomes: CO-1, CO-2, CO-3</Text>
                  <TouchableOpacity onPress={() => Alert.alert('Outcomes Mapping', 'Mapped to accreditation criteria.')} className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    <Text className="text-slate-300 text-[10px] font-bold">MAP COs/POs</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );

      case 'Leave':
        return (
          <View className="space-y-6">
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text className="text-white text-2xl font-bold">Personal Leave & OD Portal</Text>
                <Text className="text-slate-400 text-xs">Balance: 12 days remaining</Text>
              </View>
              <TouchableOpacity onPress={() => setLeaveModal(true)} className="bg-blue-600 p-3 rounded-xl">
                <Plus color="white" size={16} />
              </TouchableOpacity>
            </View>

            {leaveRequests.filter(req => req.senderId === user?.id).map((req) => (
              <View key={req.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
                <View>
                  <Text className="text-white font-bold">{req.reason}</Text>
                  <Text className="text-slate-400 text-xs mt-1">Submitted: {req.date}</Text>
                </View>
                <View className={`px-4 py-1.5 rounded-full border ${req.status === 'Pending' ? 'bg-orange-500/10 border-orange-500/20' : req.status === 'Approved' ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                  <Text className={`text-[10px] font-bold ${req.status === 'Pending' ? 'text-orange-400' : req.status === 'Approved' ? 'text-green-400' : 'text-red-400'}`}>{req.status.toUpperCase()}</Text>
                </View>
              </View>
            ))}
          </View>
        );

      case 'Research':
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
                <Text className="text-slate-400 text-xs mt-1">{res.source} • {res.date}</Text>
              </View>
            ))}
          </View>
        );

      case 'SafeChat':
        return <MessageCenter />;

      default:
        return (
          <>
            {/* Header / Welcome message */}
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
                  <Text className="text-slate-400 text-sm font-medium">Welcome back,</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>{user?.name || 'Prof. Sarah Smith'}</Text>
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
              <StatCard title="Active Courses" value="4" icon={BookOpen} trend="Fall 2024" color="#3b82f6" />
              <StatCard title="Student Reach" value="240" icon={Users} trend="+12%" color="#10b981" />
            </View>

            <View className="flex-row mb-8">
              <StatCard title="Research Papers" value="12" icon={Award} trend="+2 New" color="#8b5cf6" />
              <StatCard title="Workload" value="18h/wk" icon={Clock} trend="Optimal" color="#f59e0b" />
            </View>

            {/* Timetable / Upcoming Classes */}
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Today's Timetable</Text>
              <View className="space-y-4">
                <View className="flex-row items-center justify-between p-4 bg-white/5 rounded-2xl">
                  <View className="flex-row items-center gap-3">
                    <Clock color="#3b82f6" size={20} />
                    <View>
                      <Text className="text-white font-bold text-sm">Advanced Algorithms</Text>
                      <Text className="text-slate-400 text-xs">Section A • 10:00 AM</Text>
                    </View>
                  </View>
                  <Text className="text-blue-400 text-xs font-bold">Lab 3</Text>
                </View>

                <View className="flex-row items-center justify-between p-4 bg-white/5 rounded-2xl">
                  <View className="flex-row items-center gap-3">
                    <Clock color="#8b5cf6" size={20} />
                    <View>
                      <Text className="text-white font-bold text-sm">Distributed Systems</Text>
                      <Text className="text-slate-400 text-xs">Section B • 02:00 PM</Text>
                    </View>
                  </View>
                  <Text className="text-purple-400 text-xs font-bold">Room 402</Text>
                </View>
              </View>
            </View>

            {/* Quick shortcuts */}
            <View className="mb-10">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Quick Shortcuts</Text>
              <View className="flex-row flex-wrap gap-3">
                {[
                  { label: 'Mark Attendance', id: 'Attendance' },
                  { label: 'Edit Marks', id: 'Marks' },
                  { label: 'Apply Leave', id: 'Leave' },
                  { label: 'Lesson Plans', id: 'LessonPlans' }
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
            <Text className="text-2xl font-bold text-white mb-6">Faculty Hub</Text>
            <View className="space-y-1">
              {[
                { id: 'Home', icon: Home, label: 'Dashboard' },
                { id: 'My Profile', icon: User, label: 'My Profile' },
                { id: 'Timetable', icon: Calendar, label: 'My Timetable' },
                { id: 'Attendance', icon: Clock, label: 'Student Attendance' },
                { id: 'Marks', icon: ClipboardList, label: 'Internal Marks' },
                { id: 'Assignments', icon: FileText, label: 'Assignments' },
                { id: 'LessonPlans', icon: BookOpen, label: 'Lesson Plan' },
                { id: 'Leave', icon: RefreshCw, label: 'Apply Leave' },
                { id: 'Research', icon: Award, label: 'My Research' },
                { id: 'SafeChat', icon: MessageSquare, label: 'SafeChat' },
              ].map((item) => (
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
              <View className="flex-row justify-between items-center mb-10">
                <Text className="text-2xl font-bold text-white">Faculty Menu</Text>
                <TouchableOpacity onPress={() => setMenuVisible(false)}>
                  <X color="white" size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }} scrollEventThrottle={16} scrollEnabled={true} showsVerticalScrollIndicator={false}>
                <View className="space-y-2">
                  {[
                    { id: 'Home', icon: Home, label: 'Dashboard' },
                    { id: 'My Profile', icon: User, label: 'My Profile' },
                    { id: 'Timetable', icon: Calendar, label: 'My Timetable' },
                    { id: 'Attendance', icon: Clock, label: 'Student Attendance' },
                    { id: 'Marks', icon: ClipboardList, label: 'Internal Marks' },
                    { id: 'Assignments', icon: FileText, label: 'Assignments' },
                    { id: 'LessonPlans', icon: BookOpen, label: 'Lesson Plan' },
                    { id: 'Leave', icon: RefreshCw, label: 'Apply Leave' },
                    { id: 'Research', icon: Award, label: 'My Research' },
                    { id: 'SafeChat', icon: MessageSquare, label: 'SafeChat' },
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

        <Modal animationType="slide" transparent={true} visible={studentDetailModal} onRequestClose={() => setStudentDetailModal(false)}>
          <View className="flex-1 justify-center items-center bg-black/60 p-4">
            <View className="bg-[#1E293B] w-full max-w-lg p-8 rounded-[32px] border border-white/10">
              <Text className="text-white text-2xl font-bold mb-1">{selectedStudent?.name}</Text>
              <Text className="text-blue-400 text-xs font-bold mb-4">Student Profile & Academic Record</Text>

              <View className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-6 space-y-2">
                <Text className="text-slate-400 text-[10px] uppercase font-bold">Academic Performance</Text>
                <Text className="text-white text-xs">CGPA: {selectedStudent?.marks ? (selectedStudent.marks / 25).toFixed(2) : '3.85'}</Text>
                <Text className="text-white text-xs">Attendance: {selectedStudent?.attendance}%</Text>
                <Text className="text-white text-xs">Parent Contact: {selectedStudent?.parent}</Text>
                <Text className="text-white text-xs">Status: {selectedStudent?.attendance < 75 ? 'Attendance Shortage Warning' : 'Good Standing'}</Text>
              </View>

              <View className="space-y-4">
                <View>
                  <Text className="text-slate-400 text-xs mb-2">Edit Internal Marks (%)</Text>
                  <TextInput 
                    placeholder="Marks" 
                    placeholderTextColor="#64748b" 
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                    value={editMarksForm.marks}
                    onChangeText={(t) => setEditMarksForm({...editMarksForm, marks: t})}
                    keyboardType="numeric"
                  />
                </View>
                 <TouchableOpacity onPress={() => {
                  const newMarks = parseInt(editMarksForm.marks) || 0;
                  setLocalStudents(prev => prev.map(s => s.id === selectedStudent.id ? {...s, marks: newMarks} : s));
                  
                  // Update globally in store
                  const studentUser = users.find(u => u.name === selectedStudent.name && u.role === 'Student');
                  if (studentUser) {
                    const newCgpa = parseFloat((newMarks / 25).toFixed(2));
                    updateUser(studentUser.id, {
                      universityData: {
                        studentData: {
                          ...studentUser.universityData?.studentData,
                          cgpa: newCgpa
                        } as any
                      }
                    });
                  }
                  
                  setStudentDetailModal(false);
                  Alert.alert('Success', 'Internal marks updated.');
                }} className="bg-blue-600 p-4 rounded-xl items-center mt-4">
                  <Text className="text-white font-bold">Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStudentDetailModal(false)} className="p-2 items-center">
                  <Text className="text-slate-400">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Create Assignment Modal */}
        <Modal animationType="slide" transparent={true} visible={assignmentModal} onRequestClose={() => setAssignmentModal(false)}>
          <View className="flex-1 justify-center items-center bg-black/60 p-4">
            <View className="bg-[#1E293B] w-full max-w-lg p-8 rounded-[32px] border border-white/10">
              <Text className="text-white text-2xl font-bold mb-4">Post Assignment</Text>
              <View className="space-y-4">
                <TextInput 
                  placeholder="Assignment Title" 
                  placeholderTextColor="#64748b" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  value={newAssignment.title}
                  onChangeText={(t) => setNewAssignment({...newAssignment, title: t})}
                />
                <TextInput 
                  placeholder="Course / Subject" 
                  placeholderTextColor="#64748b" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  value={newAssignment.course}
                  onChangeText={(t) => setNewAssignment({...newAssignment, course: t})}
                />
                <TextInput 
                  placeholder="Deadline (YYYY-MM-DD)" 
                  placeholderTextColor="#64748b" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  value={newAssignment.deadline}
                  onChangeText={(t) => setNewAssignment({...newAssignment, deadline: t})}
                />
                <TouchableOpacity onPress={handleCreateAssignment} className="bg-blue-600 p-4 rounded-xl items-center mt-4">
                  <Text className="text-white font-bold">Publish</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAssignmentModal(false)} className="p-2 items-center">
                  <Text className="text-slate-400">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Apply Leave Modal */}
        <Modal animationType="slide" transparent={true} visible={leaveModal} onRequestClose={() => setLeaveModal(false)}>
          <View className="flex-1 justify-center items-center bg-black/60 p-4">
            <View className="bg-[#1E293B] w-full max-w-lg p-8 rounded-[32px] border border-white/10">
              <Text className="text-white text-2xl font-bold mb-4">Apply for Leave</Text>
              <View className="space-y-4">
                <TextInput 
                  placeholder="Reason for Leave" 
                  placeholderTextColor="#64748b" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  value={newLeave.reason}
                  onChangeText={(t) => setNewLeave({...newLeave, reason: t})}
                />
                <View className="flex-row gap-2">
                  {['Casual Leave', 'Medical Leave', 'Duty Leave'].map((t) => (
                    <TouchableOpacity key={t} onPress={() => setNewLeave({...newLeave, type: t as any})} className={`flex-1 p-3 rounded-xl border ${newLeave.type === t ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10'}`}>
                      <Text className="text-white text-center text-[10px] font-bold">{t}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity onPress={handleApplyLeave} className="bg-blue-600 p-4 rounded-xl items-center mt-4">
                  <Text className="text-white font-bold">Submit Request</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLeaveModal(false)} className="p-2 items-center">
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
