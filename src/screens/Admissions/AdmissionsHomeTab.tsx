import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput, Alert, Modal } from 'react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { api } from '../../utils/api';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Wallet, DollarSign, TrendingUp, Briefcase, Database, MapPin, UserPlus, Search, ClipboardCheck
} from 'lucide-react-native';

export const AdmissionsHomeTab = () => {
  const { user, setUser, users, addUser } = useStore();
  const [menuVisible, setMenuVisible] = React.useState(false);
  
  // Form states
  const [enrollModalVisible, setEnrollModalVisible] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [rollNumber, setRollNumber] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [course, setCourse] = React.useState('');
  const [specialization, setSpecialization] = React.useState('');
  const [batch, setBatch] = React.useState('');
  const [totalTermFees, setTotalTermFees] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');
  const [paidFees, setPaidFees] = React.useState('');

  const handleEnrollSubmit = async () => {
    if (!name || !email || !rollNumber || !course || !batch || !totalTermFees || !dueDate) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const payload = {
      name,
      email,
      roll_number: rollNumber,
      department: department ? parseInt(department) : null,
      course,
      specialization,
      batch,
      total_term_fees: parseFloat(totalTermFees),
      due_date: dueDate,
      paid_fees: parseFloat(paidFees) || 0.0,
    };

    try {
      await api.post('/students/enroll/', payload);
      Alert.alert('Success', 'Student enrolled successfully in database!');
    } catch (error: any) {
      console.log('API call failed, falling back to local store:', error);
      // Fallback for offline demo state
      const newStudent: any = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: 'Student',
        universityData: {
          studentData: {
            studentId: rollNumber,
            major: department || 'General',
            course: course,
            specialization: specialization,
            currentSemester: 1,
            creditsEarned: 0,
            creditsTotal: 140,
            cgpa: 0.0,
            attendancePercentage: 100.0,
            registeredCourses: [],
            feesDue: parseFloat(totalTermFees) - (parseFloat(paidFees) || 0),
            feeHistory: paidFees ? [{ date: new Date().toISOString().split('T')[0], amount: parseFloat(paidFees), status: 'Success' }] : [],
            backlogs: 0
          }
        }
      };
      addUser(newStudent);
      Alert.alert('Success', 'Student added to local store (demo mode)');
    }

    // Reset Form
    setName('');
    setEmail('');
    setRollNumber('');
    setDepartment('');
    setCourse('');
    setSpecialization('');
    setBatch('');
    setTotalTermFees('');
    setDueDate('');
    setPaidFees('');
    setEnrollModalVisible(false);
  };
  
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => setMenuVisible(true)}
              className="bg-white/5 p-3 rounded-2xl border border-white/10 mr-4"
            >
              <Menu color="white" size={20} />
            </TouchableOpacity>
            <View>
              <Text className="text-slate-400 text-sm font-medium">Enrollment Services</Text>
              <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>Admissions Office</Text>
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

        {/* Admissions KPI Grid */}
        <View className="flex-row mb-6">
          <StatCard 
            title="Total Applications" 
            value="4,820" 
            icon={Users} 
            trend="+15%" 
            color="#3b82f6"
          />
          <StatCard 
            title="Shortlisted" 
            value="1,240" 
            icon={UserPlus} 
            trend="+45" 
            color="#10b981"
          />
        </View>

        <View className="flex-row mb-8">
          <StatCard 
            title="Documents Verified" 
            value="94%" 
            icon={FileText} 
            trend="On track" 
            color="#8b5cf6"
          />
          <StatCard 
            title="Conversion Rate" 
            value="22%" 
            icon={TrendingUp} 
            trend="+2.4%" 
            color="#f59e0b"
          />
        </View>

        {/* Action Button: Enroll New Student */}
        <TouchableOpacity 
          onPress={() => setEnrollModalVisible(true)}
          className="bg-blue-600 p-5 rounded-3xl mb-8 flex-row justify-between items-center"
        >
          <View className="flex-row items-center">
            <View className="bg-white/20 p-3 rounded-2xl mr-4">
              <UserPlus color="white" size={24} />
            </View>
            <View>
              <Text className="text-white font-bold text-lg">Enroll New Student</Text>
              <Text className="text-white/80 text-xs">Add new student credentials, course details & fees</Text>
            </View>
          </View>
          <ChevronRight color="white" size={24} />
        </TouchableOpacity>

        {/* Admission Cycle Progress */}
        <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8">
          <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>Fall 2024 Enrollment</Text>
          
          <View className="space-y-6">
            <View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-slate-300 text-sm">Undergraduate Admissions</Text>
                <Text className="text-green-400 text-sm font-bold">85% Filled</Text>
              </View>
              <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                <View 
                  style={{ width: '85%' as any, backgroundColor: '#3b82f6' }} 
                  className="h-full rounded-full" 
                />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-slate-300 text-sm">Postgraduate Admissions</Text>
                <Text className="text-blue-400 text-sm font-bold">64% Filled</Text>
              </View>
              <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                <View 
                  style={{ width: '64%' as any, backgroundColor: '#10b981' }} 
                  className="h-full rounded-full" 
                />
              </View>
            </View>
          </View>
        </View>

        {/* Strategic Roadmap */}
        <View className="mb-10">
          <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Upcoming Deadlines</Text>
          <View className="space-y-4">
            <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
              <View className="bg-blue-600/20 p-3 rounded-2xl mr-4">
                <Search color="#3b82f6" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold">Early Bird Deadline</Text>
                <Text className="text-slate-400 text-xs">Oct 30: Merit scholarship eligibility</Text>
              </View>
              <ChevronRight color="#475569" size={20} />
            </TouchableOpacity>

            <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
              <View className="bg-purple-600/20 p-3 rounded-2xl mr-4">
                <ClipboardCheck color="#8b5cf6" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold">Entrance Exam Slot Booking</Text>
                <Text className="text-slate-400 text-xs">Closing Nov 05 for Batch B</Text>
              </View>
              <ChevronRight color="#475569" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Enrollment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={enrollModalVisible}
        onRequestClose={() => setEnrollModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-[#0F172A] rounded-t-[40px] p-8 max-h-[85%] border-t border-white/10">
            <View className="flex-row justify-between items-center mb-6">
              <View className="flex-row items-center">
                <UserPlus color="#3b82f6" size={28} className="mr-3" />
                <Text className="text-2xl font-bold text-white">Enroll Student</Text>
              </View>
              <TouchableOpacity onPress={() => setEnrollModalVisible(false)} className="bg-white/5 p-2 rounded-full">
                <X color="white" size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="space-y-4">
              <View>
                <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Student Name *</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter full name"
                  placeholderTextColor="#64748b"
                  className="bg-white/5 text-white px-5 py-4 rounded-2xl border border-white/10"
                />
              </View>

              <View>
                <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Email Address *</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="student@example.com"
                  placeholderTextColor="#64748b"
                  keyboardType="email-address"
                  className="bg-white/5 text-white px-5 py-4 rounded-2xl border border-white/10"
                />
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1">
                  <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Roll Number *</Text>
                  <TextInput
                    value={rollNumber}
                    onChangeText={setRollNumber}
                    placeholder="e.g. STU2026_01"
                    placeholderTextColor="#64748b"
                    className="bg-white/5 text-white px-5 py-4 rounded-2xl border border-white/10"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Department ID</Text>
                  <TextInput
                    value={department}
                    onChangeText={setDepartment}
                    placeholder="e.g. 1"
                    placeholderTextColor="#64748b"
                    keyboardType="numeric"
                    className="bg-white/5 text-white px-5 py-4 rounded-2xl border border-white/10"
                  />
                </View>
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1">
                  <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Course *</Text>
                  <TextInput
                    value={course}
                    onChangeText={setCourse}
                    placeholder="e.g. B.Tech CS"
                    placeholderTextColor="#64748b"
                    className="bg-white/5 text-white px-5 py-4 rounded-2xl border border-white/10"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Specialization</Text>
                  <TextInput
                    value={specialization}
                    onChangeText={setSpecialization}
                    placeholder="e.g. AI & ML"
                    placeholderTextColor="#64748b"
                    className="bg-white/5 text-white px-5 py-4 rounded-2xl border border-white/10"
                  />
                </View>
              </View>

              <View>
                <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Batch (e.g. 2026-2030) *</Text>
                <TextInput
                  value={batch}
                  onChangeText={setBatch}
                  placeholder="e.g. 2026-2030"
                  placeholderTextColor="#64748b"
                  className="bg-white/5 text-white px-5 py-4 rounded-2xl border border-white/10"
                />
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1">
                  <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Term Fees *</Text>
                  <TextInput
                    value={totalTermFees}
                    onChangeText={setTotalTermFees}
                    placeholder="e.g. 85000"
                    placeholderTextColor="#64748b"
                    keyboardType="numeric"
                    className="bg-white/5 text-white px-5 py-4 rounded-2xl border border-white/10"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Paid Fees</Text>
                  <TextInput
                    value={paidFees}
                    onChangeText={setPaidFees}
                    placeholder="e.g. 25000"
                    placeholderTextColor="#64748b"
                    keyboardType="numeric"
                    className="bg-white/5 text-white px-5 py-4 rounded-2xl border border-white/10"
                  />
                </View>
              </View>

              <View>
                <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Due Date (YYYY-MM-DD) *</Text>
                <TextInput
                  value={dueDate}
                  onChangeText={setDueDate}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#64748b"
                  className="bg-white/5 text-white px-5 py-4 rounded-2xl border border-white/10"
                />
              </View>

              <TouchableOpacity 
                onPress={handleEnrollSubmit}
                className="bg-blue-600 p-5 rounded-2xl mt-6 items-center flex-row justify-center"
              >
                <Plus color="white" size={20} className="mr-2" />
                <Text className="text-white font-bold text-base">Submit Enrollment</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};
