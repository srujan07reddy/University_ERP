import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput, Alert, Modal } from 'react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Wallet, DollarSign, TrendingUp, Briefcase, Database, MapPin,
  Layers
} from 'lucide-react-native';

export const DeanHomeTab = ({
  setMenuVisible,
  setActiveTab
}: {
  setMenuVisible?: (visible: boolean) => void;
  setActiveTab?: (tab: string) => void;
}) => {
  const { user, setUser, users, substitutions, approvalRequests } = useStore();
  const approvalsQueue = approvalRequests.filter(req => req.currentApproverRole === 'Dean' && req.status === 'Pending');
  const studentData = user?.universityData?.studentData;
  const facultyData = user?.universityData?.facultyData;
  
  return (
    <GlobalScrollView>
    (
          <>
            {/* Header */}
            <View className="flex-row justify-between items-center mb-8">
              <View className="flex-col md:flex-row items-start md:items-center gap-4 md:gap-0">
                {Platform.OS !== 'web' && (
                  <TouchableOpacity 
                    onPress={() => setMenuVisible?.(true)}
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
            <View className="flex-col md:flex-row gap-4 mb-6">
              <StatCard title="Total Departments" value="6" icon={Layers} trend="SET School" color="#3b82f6" />
              <StatCard title="Total Faculty" value="52" icon={Users} trend="12 Ph.D. Scholars" color="#10b981" />
            </View>

            <View className="flex-col md:flex-row gap-4 mb-8">
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
                  <TouchableOpacity key={idx} onPress={() => setActiveTab?.(btn.id)} className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
                    <Text className="text-blue-400 font-bold text-xs">{btn.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )
    </GlobalScrollView>
  );
};
