import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput, Alert, Modal } from 'react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Wallet, DollarSign, TrendingUp, Briefcase, Database, MapPin,
  Lock, FileCheck, AlertTriangle, ShieldAlert, Printer
} from 'lucide-react-native';

const coeData = {
  totalExams: 124,
  marksUploaded: 98,
  integrityAlerts: [
    { id: '1', msg: 'Anomalous grading in CS301 Section B', severity: 'High' },
    { id: '2', msg: 'Delayed result upload for PH101', severity: 'Low' }
  ],
  marksPending: 26,
  evaluationProgress: 72
};

export const CoEHomeTab = ({
  setMenuVisible
}: {
  setMenuVisible?: (visible: boolean) => void;
}) => {
  const { user, setUser, users, substitutions } = useStore();
  const studentData = user?.universityData?.studentData;
  const facultyData = user?.universityData?.facultyData;
  
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
    (
          <>
            {/* Header */}
            <View className="flex-row justify-between items-center mb-8">
              <View className="flex-row items-center">
                {Platform.OS !== 'web' && (
                  <TouchableOpacity 
                    onPress={() => setMenuVisible?.(true)}
                    className="bg-white/5 p-3 rounded-2xl border border-white/10 mr-4"
                  >
                    <Menu color="white" size={20} />
                  </TouchableOpacity>
                )}
                <View>
                  <View className="flex-row items-center mb-1">
                    <Lock color="#3b82f6" size={14} />
                    <Text className="text-blue-500 text-[10px] font-bold ml-1 uppercase tracking-widest">Secure Exam Node</Text>
                  </View>
                  <Text className="text-white text-3xl font-bold">CoE Command Hub</Text>
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

            {/* Exam Lifecycle Stats */}
            <View className="flex-row mb-6">
              <StatCard 
                title="Total Exams" 
                value={coeData?.totalExams.toString() || '124'} 
                icon={FileCheck} 
                color="#3b82f6"
              />
              <StatCard 
                title="Marks Uploaded" 
                value={coeData?.marksUploaded.toString() || '98'} 
                icon={ClipboardList} 
                trend={`${Math.round(((coeData?.marksUploaded || 98) / (coeData?.totalExams || 124)) * 100)}%`}
                color="#10b981"
              />
            </View>

            <View className="flex-row mb-8">
              <StatCard 
                title="Integrity Alerts" 
                value={coeData?.integrityAlerts.length.toString() || '2'} 
                icon={AlertTriangle} 
                color="#ef4444"
              />
              <StatCard 
                title="Marks Pending" 
                value={coeData?.marksPending.toString() || '26'} 
                icon={AlertTriangle} 
                color="#f59e0b"
              />
            </View>

            {/* Integrity Alerts Section */}
            <View className="bg-red-500/5 p-6 rounded-[32px] border border-red-500/20 mb-8">
              <View className="flex-row justify-between items-center mb-6">
                <View className="flex-row items-center">
                  <ShieldAlert color="#ef4444" size={20} />
                  <Text className="text-white text-lg font-bold ml-2">Integrity Monitoring</Text>
                </View>
                <TouchableOpacity>
                  <Text className="text-red-400 text-xs font-bold">Review All</Text>
                </TouchableOpacity>
              </View>
              
              {(coeData?.integrityAlerts || [
                { id: '1', msg: 'Anomalous grading in CS301 Section B', severity: 'High' },
                { id: '2', msg: 'Delayed result upload for PH101', severity: 'Low' }
              ]).map((alert: any) => (
                <View key={alert.id} className="flex-row items-center justify-between py-4 border-b border-white/5">
                  <View className="flex-1">
                    <Text className="text-white font-medium text-sm">{alert.msg}</Text>
                    <Text className={`text-[10px] font-bold mt-1 ${alert.severity === 'High' ? 'text-red-400' : 'text-orange-400'}`}>
                      {alert.severity} PRIORITY
                    </Text>
                  </View>
                  <ChevronRight color="#475569" size={16} />
                </View>
              ))}
            </View>

            {/* Evaluation Progress Bar */}
            <View className="bg-white/5 p-6 rounded-[32px] border border-white/10 mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="text-white font-bold text-lg">Evaluation Progress</Text>
                  <Text className="text-slate-400 text-xs">Real-time correction status</Text>
                </View>
                <Text className="text-blue-400 font-bold text-2xl">{coeData?.evaluationProgress || 72}%</Text>
              </View>
              <View className="h-3 bg-white/5 rounded-full overflow-hidden">
                <View 
                  style={{ width: `${coeData?.evaluationProgress || 72}%` }} 
                  className="h-full bg-blue-500" 
                />
              </View>
            </View>

            {/* Lifecycle Management */}
            <View className="mb-10">
              <Text className="text-white text-xl font-bold mb-6">Exam Operations Hierarchy</Text>
              
              {/* Pre-Exam Phase */}
              <View className="mb-8">
                <View className="flex-row items-center mb-4">
                  <View className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                  <Text className="text-blue-400 font-bold text-xs tracking-widest uppercase">Pre-Exam Phase</Text>
                </View>
                <View className="flex-row justify-between">
                  <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 w-[48%] items-center">
                    <Calendar color="#3b82f6" size={24} />
                    <Text className="text-white text-[11px] mt-3 font-bold text-center">Scheduling & Seating</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 w-[48%] items-center">
                    <Lock color="#3b82f6" size={24} />
                    <Text className="text-white text-[11px] mt-3 font-bold text-center">Paper Setting</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* During-Exam Phase */}
              <View className="mb-8">
                <View className="flex-row items-center mb-4">
                  <View className="w-2 h-2 rounded-full bg-amber-500 mr-2" />
                  <Text className="text-amber-400 font-bold text-xs tracking-widest uppercase">During-Exam Phase</Text>
                </View>
                <View className="flex-row justify-between">
                  <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 w-[48%] items-center">
                    <Printer color="#f59e0b" size={24} />
                    <Text className="text-white text-[11px] mt-3 font-bold text-center">Hall Ticket Generation</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 w-[48%] items-center">
                    <Users color="#f59e0b" size={24} />
                    <Text className="text-white text-[11px] mt-3 font-bold text-center">Invigilation Duty</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Post-Exam Phase */}
              <View className="mb-8">
                <View className="flex-row items-center mb-4">
                  <View className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                  <Text className="text-emerald-400 font-bold text-xs tracking-widest uppercase">Post-Exam Phase</Text>
                </View>
                <View className="flex-row justify-between">
                  <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 w-[48%] items-center">
                    <ShieldAlert color="#10b981" size={24} />
                    <Text className="text-white text-[11px] mt-3 font-bold text-center">Dummy Numbering</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 w-[48%] items-center">
                    <BarChart3 color="#10b981" size={24} />
                    <Text className="text-white text-[11px] mt-3 font-bold text-center">Result Declaration</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )
    </ScrollView>
  );
};
