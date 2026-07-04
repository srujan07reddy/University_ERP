import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Modal, TextInput, Alert, Platform } from 'react-native';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Layers, Database, Wallet
} from 'lucide-react-native';
import { useStore } from '../../store/useStore';
import { useScrollEvents } from '../../hooks/useScrollEvents';
import { StatCard } from '../../components/Dashboard/StatCard';
import { BottomNavbar } from '../../components/Navigation/BottomNavbar';
import { MessageCenter } from '../../components/Dashboard/MessageCenter';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';

export const HoDDashboard = () => {
  const { user, setUser, users, updateUser, leaveRequests, updateLeaveStatus, assignments, addAssignment, notes, addNote } = useStore();
  const [activeTab, setActiveTab] = useState('Home');
  const [menuVisible, setMenuVisible] = useState(false);

  // Scroll event tracking
  const { handleScroll: handleMainScroll } = useScrollEvents();

  // Simulated Database states
  const [localFaculty, setLocalFaculty] = useState([
    { id: 'FAC-001', name: 'Dr. Sarah Smith', qualification: 'Ph.D. in AI', experience: '12 Years', subjects: 'Advanced Algorithms', workload: '18h/wk', rating: '4.8/5' },
    { id: 'FAC-002', name: 'Dr. Sarah Wilson', qualification: 'Ph.D. in ML', experience: '8 Years', subjects: 'Data Structures', workload: '16h/wk', rating: '4.6/5' },
    { id: 'FAC-003', name: 'Prof. Albus Dumbledore', qualification: 'Ph.D. in Magic Systems', experience: '45 Years', subjects: 'Systems Magic', workload: '8h/wk', rating: '4.9/5' }
  ]);
  const [subjectAllocations, setSubjectAllocations] = useState([
    { subject: 'Advanced Algorithms', assignedFaculty: 'Dr. Sarah Smith', class: '3rd Year CSE-A' },
    { subject: 'Distributed Systems', assignedFaculty: 'Dr. Gregory House', class: '3rd Year CSE-B' },
    { subject: 'Data Structures', assignedFaculty: 'Dr. Sarah Wilson', class: '2nd Year CSE-A' }
  ]);
  const [timetableSlots, setTimetableSlots] = useState([
    { time: '10:00 AM', subject: 'Advanced Algorithms', faculty: 'Dr. Sarah Smith', room: 'LH 402' },
    { time: '02:00 PM', subject: 'Distributed Systems', faculty: 'Dr. Gregory House', room: 'LH 403' }
  ]);
  const [inventoryItems, setInventoryItems] = useState([
    { name: 'Dell Precision Workstations', count: 40, status: 'Operational', maintenance: 'Good' },
    { name: 'AI Server NVIDIA A100', count: 1, status: 'Under Repair', maintenance: 'Scheduled Nov 10' },
    { name: 'MATLAB Multi-User License', count: 50, status: 'Active', maintenance: 'Renews Dec 2026' }
  ]);
  const [grievances, setGrievances] = useState([
    { id: '1', title: 'Lab 3 AC not working', student: 'John Doe', status: 'Assigned to Facility Support' },
    { id: '2', title: 'Grace marks criteria for Mid-term', student: 'Alice Becker', status: 'Pending Review' }
  ]);

  // Modals & Forms
  const [editAllocModal, setEditAllocModal] = useState(false);
  const [newAllocForm, setNewAllocForm] = useState({ subject: '', faculty: '', class: '' });
  const [aiReportModal, setAiReportModal] = useState(false);
  const [aiReportOutput, setAiReportOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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

  const [myLeaveReason, setMyLeaveReason] = useState('');
  const [myLeavesList, setMyLeavesList] = useState<any[]>([]);

  const handleAISummarize = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiReportOutput(`[HOD AI Monthly Performance Summary]\n\nKey Insights:\n1. Department attendance averages 88% (at-risk flag for 2 students).\n2. Curriculum syllabus completion stands at 65% across CSE programs.\n3. Overloaded Faculty alert: Dr. Sarah Smith is currently at 18 hours/week.\n4. Budget utilization is within normal parameters (15% remaining for Q4).`);
      setIsGenerating(false);
    }, 1200);
  };

  const handleAllocateSubject = () => {
    if (!newAllocForm.subject || !newAllocForm.faculty) return;
    
    // Find designated Faculty in global store users
    const targetFaculty = users.find(u => u.name.toLowerCase().includes(newAllocForm.faculty.toLowerCase()) && u.role === 'Faculty');
    if (targetFaculty) {
      const currentCourses = targetFaculty.universityData?.facultyData?.assignedCourses || [];
      const updatedCourses = [...currentCourses, { name: newAllocForm.subject, performance: [80, 80, 80, 80, 80] }];
      updateUser(targetFaculty.id, {
        universityData: {
          facultyData: {
            ...targetFaculty.universityData?.facultyData,
            assignedCourses: updatedCourses
          } as any
        }
      });
    }

    setSubjectAllocations([...subjectAllocations, { 
      subject: newAllocForm.subject, 
      assignedFaculty: newAllocForm.faculty, 
      class: newAllocForm.class 
    }]);
    setEditAllocModal(false);
    setNewAllocForm({ subject: '', faculty: '', class: '' });
    Alert.alert('Success', 'Faculty allocated. Mapped to global database.');
  };

  const handleApproveLeave = (id: string) => {
    updateLeaveStatus(id, 'Approved');
    Alert.alert('Leave Approved', 'Faculty request status updated successfully.');
  };

  const handleRejectLeave = (id: string) => {
    updateLeaveStatus(id, 'Rejected');
    Alert.alert('Leave Rejected', 'Faculty request status updated.');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Approvals':
        return <ApprovalsPortal />;
      // --- HOD MANAGEMENT SECTIONS ---
      case 'Faculty':
        return (
          <View className="space-y-6">
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text className="text-white text-2xl font-bold">Faculty Management</Text>
                <Text className="text-slate-400 text-xs">Directory & performance appraisal indices</Text>
              </View>
            </View>
            {localFaculty.map((fac) => (
              <View key={fac.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10">
                <View className="flex-row justify-between items-center mb-3">
                  <View>
                    <Text className="text-white font-bold text-lg">{fac.name}</Text>
                    <Text className="text-slate-400 text-xs">{fac.qualification} • Exp: {fac.experience}</Text>
                  </View>
                  <View className="bg-blue-600/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                    <Text className="text-blue-400 text-[10px] font-bold">Appraisal Rating: {fac.rating}</Text>
                  </View>
                </View>
                <Text className="text-slate-300 text-xs border-t border-white/5 pt-3">
                  Subject: {fac.subjects} | Workload: {fac.workload}
                </Text>
              </View>
            ))}
          </View>
        );

      case 'SubjectAllocation':
        return (
          <View className="space-y-6">
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text className="text-white text-2xl font-bold">Subject Allocations</Text>
                <Text className="text-slate-400 text-xs">Assign subjects, mentors, and class coordinators</Text>
              </View>
              <TouchableOpacity onPress={() => setEditAllocModal(true)} className="bg-blue-600 p-3 rounded-xl">
                <Plus color="white" size={16} />
              </TouchableOpacity>
            </View>

            {subjectAllocations.map((alloc, idx) => (
              <View key={idx} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
                <View>
                  <Text className="text-white font-bold text-lg">{alloc.subject}</Text>
                  <Text className="text-slate-400 text-xs mt-1">Class Coordinator: {alloc.class}</Text>
                  <Text className="text-blue-400 text-xs mt-1 font-bold">Faculty: {alloc.assignedFaculty}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                  setSubjectAllocations(prev => prev.filter((_, i) => i !== idx));
                  Alert.alert('Removed', 'Allocation deleted.');
                }} className="bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                  <Trash2 color="#ef4444" size={16} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );

      case 'TimetableManagement':
        return (
          <View className="space-y-6">
            <View className="bg-white/5 p-6 rounded-[32px] border border-white/10">
              <Text className="text-white font-bold text-lg mb-2">Conflict Detector & Timetable Scheduler</Text>
              <Text className="text-slate-400 text-xs leading-relaxed mb-6">
                Our algorithmic scheduler automatically assigns classrooms and teachers. Click below to analyze conflicts.
              </Text>
              <TouchableOpacity onPress={() => Alert.alert('Scheduler engine', 'Zero timetable conflicts detected for Fall Semester.')} className="bg-blue-600 p-4 rounded-xl items-center">
                <Text className="text-white font-bold text-xs">Run Timetable Generator</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-white font-bold text-lg">Active Timetable Slots</Text>
            {timetableSlots.map((slot, i) => (
              <View key={i} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
                <View>
                  <Text className="text-slate-400 text-[10px] font-bold uppercase">{slot.time} • Room {slot.room}</Text>
                  <Text className="text-white font-bold text-lg mt-1">{slot.subject}</Text>
                  <Text className="text-blue-400 text-xs mt-1">{slot.faculty}</Text>
                </View>
              </View>
            ))}
          </View>
        );

      case 'Approvals':
        return (
          <View className="space-y-6">
            <Text className="text-white text-2xl font-bold mb-2">Central Approval Center</Text>
            {leaveRequests.filter(r => r.status === 'Pending').length === 0 ? (
              <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 items-center justify-center">
                <CheckCircle color="#10b981" size={40} className="mb-4" />
                <Text className="text-white font-bold text-lg">Zero Pending Approvals</Text>
                <Text className="text-slate-500 text-xs mt-2">All leave requests, lock approvals are fully cleared.</Text>
              </View>
            ) : null}

            {leaveRequests.filter(req => req.status === 'Pending').map((req) => (
              <View key={req.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-white font-bold text-lg">{req.senderName}</Text>
                    <Text className="text-slate-400 text-xs mt-1">Requesting leave on {req.date}</Text>
                    <Text className="text-slate-300 text-xs font-medium mt-3 italic">" {req.reason} "</Text>
                  </View>
                </View>
                <View className="flex-row gap-4 mt-6">
                  <TouchableOpacity onPress={() => handleApproveLeave(req.id)} className="flex-1 bg-green-600 p-3.5 rounded-xl items-center">
                    <Text className="text-white font-bold text-xs">APPROVE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleRejectLeave(req.id)} className="flex-1 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl items-center">
                    <Text className="text-red-400 font-bold text-xs">REJECT</Text>
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
              <Text className="text-white font-bold text-lg">AI At-Risk & Performance Predictor</Text>
              <Text className="text-slate-400 text-xs leading-relaxed">
                Generate dynamic monthly performance reports and identify students who have attendance/grades shortage.
              </Text>
              <TouchableOpacity onPress={handleAISummarize} className="bg-blue-600 p-4 rounded-xl flex-row justify-center items-center gap-2">
                <Sparkles color="white" size={16} />
                <Text className="text-white font-bold text-xs">{isGenerating ? 'Summarizing...' : 'Generate HOD AI Report'}</Text>
              </TouchableOpacity>
              {aiReportOutput ? (
                <View className="bg-white/5 p-4 rounded-xl border border-white/10 mt-4">
                  <Text className="text-slate-300 text-xs leading-relaxed">{aiReportOutput}</Text>
                </View>
              ) : null}
            </View>
          </View>
        );

      case 'Inventory':
        return (
          <View className="space-y-6">
            <Text className="text-white text-2xl font-bold mb-2">Inventory & Lab Equipment</Text>
            {inventoryItems.map((item, idx) => (
              <View key={idx} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
                <View>
                  <Text className="text-white font-bold text-lg">{item.name}</Text>
                  <Text className="text-slate-400 text-xs mt-1">Status: {item.status} • Stock: {item.count} units</Text>
                  <Text className="text-blue-400 text-xs mt-1">Maintenance: {item.maintenance}</Text>
                </View>
                <TouchableOpacity onPress={() => Alert.alert('Maintenance request', 'Maintenance ticket submitted to engineering cell.')} className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <RefreshCw color="white" size={16} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );

      // --- PERSONAL STAFF CONSOLE SECTIONS ---
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
                Alert.alert('Leave Logged', 'As HOD, your personal leave is logged and auto-approved.');
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
                <Text className="text-slate-450 text-xs">Class Avg: 83.7%</Text>
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
            {/* Dashboard Overview */}
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
                  <Text className="text-slate-400 text-sm font-medium">Department of Computer Science</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>HOD Management Portal</Text>
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

            {/* Department KPIs widgets */}
            <View className="flex-row mb-6">
              <StatCard title="Total Faculty" value="16" icon={Users} trend="CS Department" color="#3b82f6" />
              <StatCard title="Total Students" value="480" icon={Users} trend="4 Active Batches" color="#10b981" />
            </View>

            <View className="flex-row mb-8">
              <StatCard title="Faculty on Leave" value="2" icon={Clock} trend="Today" color="#8b5cf6" />
              <StatCard title="Pending Approvals" value={leaveRequests.filter(req => req.status === 'Pending').length.toString()} icon={AlertCircle} trend="Requires Action" color="#ef4444" />
            </View>

            {/* Student placement widget */}
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8 flex-row justify-between items-center">
              <View>
                <Text className="text-white font-bold text-lg">Placement Drive Statistics</Text>
                <Text className="text-slate-400 text-xs mt-1">CS Eligible Students: 120 • Placed: 102</Text>
              </View>
              <View className="bg-blue-600/15 p-4 rounded-full border border-blue-500/20">
                <Text className="text-blue-400 font-bold text-xl">85%</Text>
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
            <Text className="text-2xl font-bold text-white mb-6">HOD Console</Text>
            <View className="space-y-4">
              <View>
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">HOD Management</Text>
                <View className="space-y-1">
                  {[
                    { id: 'Home', icon: Home, label: 'Dashboard' },
                    { id: 'Faculty', icon: Users, label: 'Faculty Appraisal' },
                    { id: 'SubjectAllocation', icon: Layers, label: 'Subject Allocation' },
                    { id: 'TimetableManagement', icon: Calendar, label: 'Timetable Scheduler' },
                    { id: 'Approvals', icon: CheckCircle, label: 'Central Approvals' },
                    { id: 'Analytics', icon: Sparkles, label: 'Department AI' },
                    { id: 'Inventory', icon: Database, label: 'Inventory & Labs' }
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
                    { id: 'StaffLeave', icon: RefreshCw, label: 'Apply Leave' },
                    { id: 'StaffAttendance', icon: Clock, label: 'Student Attendance' },
                    { id: 'StaffMarks', icon: ClipboardList, label: 'Internal Marks' },
                    { id: 'StaffAssignments', icon: FileText, label: 'Assignments' },
                    { id: 'StaffLessonPlans', icon: BookOpen, label: 'Lesson Plan' },
                    { id: 'StaffResearch', icon: Award, label: 'My Research' },
                    { id: 'SafeChat', icon: MessageSquare, label: 'SafeChat' }
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
                <Text className="text-2xl font-bold text-white">Menu</Text>
                <TouchableOpacity onPress={() => setMenuVisible(false)}>
                  <X color="white" size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View className="space-y-4">
                  {/* Category 1: HOD Management */}
                  <View>
                    <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">HOD Management</Text>
                    <View className="space-y-1">
                      {[
                        { id: 'Home', icon: Home, label: 'Dashboard' },
                        { id: 'Faculty', icon: Users, label: 'Faculty Appraisal' },
                        { id: 'SubjectAllocation', icon: Layers, label: 'Subject Allocation' },
                        { id: 'TimetableManagement', icon: Calendar, label: 'Timetable Scheduler' },
                        { id: 'Approvals', icon: CheckCircle, label: 'Central Approvals' },
                        { id: 'Analytics', icon: Sparkles, label: 'Department AI' },
                        { id: 'Inventory', icon: Database, label: 'Inventory & Labs' }
                      ].map((item) => (
                        <TouchableOpacity key={item.id} onPress={() => { setActiveTab(item.id); setMenuVisible(false); }} className={`p-3 rounded-xl flex-row items-center ${activeTab === item.id ? 'bg-blue-600' : 'hover:bg-white/5'}`}>
                          <item.icon color={activeTab === item.id ? 'white' : '#94a3b8'} size={18} />
                          <Text className={`font-bold ml-3 text-xs ${activeTab === item.id ? 'text-white' : 'text-slate-400'}`}>{item.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Category 2: Staff Console */}
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
                        { id: 'StaffResearch', icon: Award, label: 'My Research' },
                        { id: 'SafeChat', icon: MessageSquare, label: 'SafeChat' }
                      ].map((item) => (
                        <TouchableOpacity key={item.id} onPress={() => { setActiveTab(item.id); setMenuVisible(false); }} className={`p-3 rounded-xl flex-row items-center ${activeTab === item.id ? 'bg-purple-600' : 'hover:bg-white/5'}`}>
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

        {/* Allocate Subject Modal */}
        <Modal animationType="slide" transparent={true} visible={editAllocModal} onRequestClose={() => setEditAllocModal(false)}>
          <View className="flex-1 justify-center items-center bg-black/60 p-4">
            <View className="bg-[#1E293B] w-full max-w-lg p-8 rounded-[32px] border border-white/10">
              <Text className="text-white text-2xl font-bold mb-4">Allocate Subject</Text>
              <View className="space-y-4">
                <TextInput 
                  placeholder="Subject Name" 
                  placeholderTextColor="#64748b" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  value={newAllocForm.subject}
                  onChangeText={(t) => setNewAllocForm({...newAllocForm, subject: t})}
                />
                <TextInput 
                  placeholder="Faculty Name" 
                  placeholderTextColor="#64748b" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  value={newAllocForm.faculty}
                  onChangeText={(t) => setNewAllocForm({...newAllocForm, faculty: t})}
                />
                <TextInput 
                  placeholder="Class Section (e.g. 3rd Year CSE-A)" 
                  placeholderTextColor="#64748b" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  value={newAllocForm.class}
                  onChangeText={(t) => setNewAllocForm({...newAllocForm, class: t})}
                />
                <TouchableOpacity onPress={handleAllocateSubject} className="bg-blue-600 p-4 rounded-xl items-center mt-4">
                  <Text className="text-white font-bold">Assign Faculty</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditAllocModal(false)} className="p-2 items-center">
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
