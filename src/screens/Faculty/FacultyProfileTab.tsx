import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw
} from 'lucide-react-native';

export const FacultyProfileTab = () => {
  const { user, users, assignments, addAssignment, notes, addNote, leaveRequests, addLeaveRequest } = useStore();
  const facultyData = user?.universityData?.facultyData;
  const [newAssignment, setNewAssignment] = useState({ title: '', course: '', deadline: '', maxMarks: '100' });
  const [newNote, setNewNote] = useState({ title: '', content: '', course: '', section: '', year: '3rd Year', dept: 'Computer Science' });
  const [newLeave, setNewLeave] = useState({ reason: '', type: 'Casual Leave' });
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentDetailModal, setStudentDetailModal] = useState(false);
  const [editMarksForm, setEditMarksForm] = useState({ studentId: '', marks: '' });
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

  const notifyAbsentee = (studentName: string) => {
    Alert.alert('FCM Notification Sent', `An automated attendance alert has been dispatched to ${studentName} and their parent.`);
  };

  const exportExcel = () => {
    Alert.alert('Export Complete', 'Grades ledger downloaded as XLS sheet.');
  };

  const importExcel = () => {
    Alert.alert('Excel Simulated Import', 'Parsed 4 student grade sheets and updated marks dashboard.');
  };

  const handleAISuggest = () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      setAiOutput(`[AI Suggestion for: "${aiPrompt}"]\n\nLesson Plan Outline:\n1. Introduction to topic concepts (30 mins)\n2. Interactive quiz mapped to CO-1 (15 mins)\n3. Case study discussion & PPT resources (30 mins)\n4. Q&A summary session (15 mins)`);
      setIsGenerating(false);
    }, 1200);
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
    Alert.alert('Success', 'Assignment posted successfully.');
  };

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

  return (
    <GlobalScrollView>
    (
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
        )
    </GlobalScrollView>
  );
};
