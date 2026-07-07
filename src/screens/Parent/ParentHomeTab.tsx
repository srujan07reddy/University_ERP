import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput, Alert, Modal } from 'react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Wallet, DollarSign, TrendingUp, Briefcase, Database, MapPin,
  GraduationCap, CreditCard
} from 'lucide-react-native';

export const ParentHomeTab = ({
  setMenuVisible
}: {
  setMenuVisible?: (visible: boolean) => void;
}) => {
  const { user, setUser, users, substitutions } = useStore();
  const studentData = user?.universityData?.studentData;
  const facultyData = user?.universityData?.facultyData;
  
  return (
    <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} keyboardShouldPersistTaps="handled">
    (
          <>
            {/* Header */}
            <View className="flex-row justify-between items-center mb-8">
              <View className="flex-col md:flex-row items-start md:items-center gap-4 md:gap-0">
                <TouchableOpacity 
                  onPress={() => setMenuVisible?.(true)}
                  className="bg-white/5 p-3 rounded-2xl border border-white/10 mr-4"
                >
                  <Menu color="white" size={20} />
                </TouchableOpacity>
                <View>
                  <Text className="text-slate-400 text-sm font-medium">Student: John Doe (STU001)</Text>
                  <Text className="text-white text-3xl font-bold">Parent Portal</Text>
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

            {/* Child Academic KPIs */}
            <View className="flex-col md:flex-row gap-4 mb-6">
              <StatCard 
                title="Current GPA" 
                value="3.85" 
                icon={GraduationCap} 
                trend="+0.1" 
                color="#3b82f6"
              />
              <StatCard 
                title="Attendance" 
                value="94%" 
                icon={Clock} 
                trend="Good" 
                color="#10b981"
              />
            </View>

            <View className="flex-col md:flex-row gap-4 mb-8">
              <StatCard 
                title="Fees Status" 
                value="Paid" 
                icon={CreditCard} 
                color="#10b981"
              />
              <StatCard 
                title="Next Exam" 
                value="Nov 12" 
                icon={FileText} 
                color="#8b5cf6"
              />
            </View>

            {/* Performance Visualization */}
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8">
              <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>Academic Progress</Text>
              
              <View className="space-y-6">
                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-slate-300 text-sm">Syllabus Completion</Text>
                    <Text className="text-green-400 text-sm font-bold">78%</Text>
                  </View>
                  <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <View 
                      style={{ width: '78%' as any, backgroundColor: '#3b82f6' }} 
                      className="h-full rounded-full" 
                    />
                  </View>
                </View>

                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-slate-300 text-sm">Project Submissions</Text>
                    <Text className="text-blue-400 text-sm font-bold">8/10 Done</Text>
                  </View>
                  <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <View 
                      style={{ width: '80%' as any, backgroundColor: '#10b981' }} 
                      className="h-full rounded-full" 
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Strategic Roadmap */}
            <View className="mb-10">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Institutional Notices</Text>
              <View className="space-y-4">
                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-blue-600/20 p-3 rounded-2xl mr-4">
                    <AlertCircle color="#3b82f6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Parent-Teacher Meeting</Text>
                    <Text className="text-slate-400 text-xs">Nov 15: Room 102 @ 10:00 AM</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>

                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-purple-600/20 p-3 rounded-2xl mr-4">
                    <GraduationCap color="#8b5cf6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Scholarship Renewal</Text>
                    <Text className="text-slate-400 text-xs">Applications closing in 5 days</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            {/* Institutional Reports */}
            <View className="mb-10">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Academic Reports</Text>
              <View className="space-y-4">
                {[
                  { title: 'Semester 5 Grade Card', date: 'Published Aug 12, 2024', status: 'Final' },
                  { title: 'Mid-term Performance Report', date: 'Published Oct 01, 2024', status: 'Draft' },
                ].map((report, i) => (
                  <TouchableOpacity key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10 flex-row items-center">
                    <View className="bg-blue-600/10 p-3 rounded-2xl mr-4">
                      <FileText color="#3b82f6" size={24} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold">{report.title}</Text>
                      <Text className="text-slate-400 text-xs">{report.date}</Text>
                    </View>
                    <ChevronRight color="#475569" size={20} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View className="h-40" />
          </>
        )
    </ScrollView>
  );
};
