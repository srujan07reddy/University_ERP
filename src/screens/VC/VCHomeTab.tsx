import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput, Alert, Modal } from 'react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Wallet, DollarSign, TrendingUp, Briefcase, Database, MapPin,
  GraduationCap, UserCheck
} from 'lucide-react-native';

export const VCHomeTab = ({
  setMenuVisible
}: {
  setMenuVisible?: (visible: boolean) => void;
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
                  <Text className="text-slate-400 text-sm font-medium">University Leadership</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>Vice Chancellor</Text>
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

            {/* Strategic KPI Grid */}
            <View className="flex-row mb-6">
              <StatCard 
                title="Academic Rating" 
                value="4.85/5" 
                icon={GraduationCap} 
                trend="+0.2" 
                color="#3b82f6"
              />
              <StatCard 
                title="Faculty Strength" 
                value="1,240" 
                icon={Users} 
                trend="+45" 
                color="#10b981"
              />
            </View>

            <View className="flex-row mb-8">
              <StatCard 
                title="Research Output" 
                value="842" 
                icon={BookOpen} 
                trend="+12%" 
                color="#8b5cf6"
              />
              <StatCard 
                title="NIRF Rank" 
                value="#14" 
                icon={BarChart3} 
                trend="Top 1%" 
                color="#f59e0b"
              />
            </View>

            {/* University Vision Progress */}
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8">
              <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>Vision 2025 Progress</Text>
              
              <View className="space-y-6">
                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-slate-300 text-sm">International Accreditations</Text>
                    <Text className="text-green-400 text-sm font-bold">85%</Text>
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
                    <Text className="text-slate-300 text-sm">Research Grant Utilization</Text>
                    <Text className="text-blue-400 text-sm font-bold">$12.4M / $15M</Text>
                  </View>
                  <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <View 
                      style={{ width: '82%' as any, backgroundColor: '#10b981' }} 
                      className="h-full rounded-full" 
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Quick Actions / Critical Tasks */}
            <View className="mb-10">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Directives & Tasks</Text>
              <View className="space-y-4">
                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-blue-600/20 p-3 rounded-2xl mr-4">
                    <TrendingUp color="#3b82f6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Annual Strategy Review</Text>
                    <Text className="text-slate-400 text-xs">Due in 3 days: Board of Trustees</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>

                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-purple-600/20 p-3 rounded-2xl mr-4">
                    <UserCheck color="#8b5cf6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Faculty Tenure Approvals</Text>
                    <Text className="text-slate-400 text-xs">12 Pending reviews</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )
  );
};
