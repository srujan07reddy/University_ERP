import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput, Alert, Modal } from 'react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Wallet, DollarSign, TrendingUp, Briefcase, Database, MapPin,
  Handshake
} from 'lucide-react-native';

export const PlacementHomeTab = ({
  setMenuVisible,
  setActiveTab
}: {
  setMenuVisible?: (visible: boolean) => void;
  setActiveTab?: (tab: string) => void;
}) => {
  const { user, setUser, users, substitutions } = useStore();
  const studentData = user?.universityData?.studentData;
  const facultyData = user?.universityData?.facultyData;
  
  return (
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
                  <Text className="text-slate-400 text-sm font-medium">Training & Placement Portal</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>Placement Hub</Text>
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

            {/* KPI grid */}
            <View className="flex-row mb-6">
              <StatCard title="Eligible Students" value="326" icon={Users} trend="CSE, IT, AI" color="#3b82f6" />
              <StatCard title="Placement Rate" value="84%" icon={Handshake} trend="+5% vs 2025" color="#10b981" />
            </View>

            <View className="flex-row mb-8">
              <StatCard title="Highest Package" value="45 LPA" icon={Award} trend="Google" color="#8b5cf6" />
              <StatCard title="Offers Secured" value="280" icon={Briefcase} color="#f59e0b" />
            </View>

            {/* Placement Progress chart placeholder */}
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8">
              <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>Department-wise Placements</Text>
              
              <View className="space-y-6">
                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-slate-300 text-sm">Computer Science Engineering</Text>
                    <Text className="text-green-400 text-sm font-bold">92% Placed</Text>
                  </View>
                  <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <View style={{ width: '92%' as any, backgroundColor: '#10b981' }} className="h-full rounded-full" />
                  </View>
                </View>

                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-slate-300 text-sm">Information Technology</Text>
                    <Text className="text-blue-400 text-sm font-bold">84% Placed</Text>
                  </View>
                  <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <View style={{ width: '84%' as any, backgroundColor: '#3b82f6' }} className="h-full rounded-full" />
                  </View>
                </View>
              </View>
            </View>

            {/* Quick Actions Shortcuts */}
            <View className="mb-10">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Quick Actions</Text>
              <View className="flex-row flex-wrap gap-3">
                {[
                  { label: 'Set Eligibility', id: 'EligibleStudents' },
                  { label: 'Recruiters Database', id: 'CompaniesList' },
                  { label: 'Manage Drives', id: 'ManageDrives' },
                  { label: 'ATS Skill Gap', id: 'Analytics' }
                ].map((btn, idx) => (
                  <TouchableOpacity key={idx} onPress={() => setActiveTab?.(btn.id)} className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
                    <Text className="text-blue-400 font-bold text-xs">{btn.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )
  );
};
