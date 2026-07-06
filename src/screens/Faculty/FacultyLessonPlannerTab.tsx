import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw
} from 'lucide-react-native';

export const FacultyLessonPlannerTab = () => {
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
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
    (
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
        )
    </ScrollView>
  );
};
