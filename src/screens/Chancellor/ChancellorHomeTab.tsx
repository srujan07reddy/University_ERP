import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput, Alert, Modal } from 'react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Wallet, DollarSign, TrendingUp, Briefcase, Database, MapPin,
  GraduationCap, PieChart
} from 'lucide-react-native';

export const ChancellorHomeTab = ({
  setMenuVisible
}: {
  setMenuVisible: (visible: boolean) => void;
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
                <TouchableOpacity 
                  onPress={() => setMenuVisible(true)}
                  className="bg-white/5 p-3 rounded-2xl border border-white/10 mr-4"
                >
                  <Menu color="white" size={20} />
                </TouchableOpacity>
                <View>
                  <Text className="text-slate-400 text-sm font-medium">Institutional Governance</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>University Chancellor</Text>
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

            {/* Global KPIs */}
            <View className="flex-row mb-6">
              <StatCard 
                title="Total Enrollment" 
                value="18,450" 
                icon={Users} 
                trend="+8.2%" 
                color="#3b82f6"
              />
              <StatCard 
                title="Revenue Target" 
                value="94%" 
                icon={DollarSign} 
                trend="+2.4%" 
                color="#10b981"
              />
            </View>

            <View className="flex-row mb-8">
              <StatCard 
                title="Graduation Rate" 
                value="92.4%" 
                icon={GraduationCap} 
                trend="+1.2%" 
                color="#8b5cf6"
              />
              <StatCard 
                title="Compliance" 
                value="A++" 
                icon={Shield} 
                trend="NAAC" 
                color="#f59e0b"
              />
            </View>

            {/* Enrollment & Revenue Insights */}
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8">
              <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>Institutional Health</Text>
              
              <View className="space-y-6">
                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-slate-300 text-sm">Admissions (2024 vs 2023)</Text>
                    <Text className="text-green-400 text-sm font-bold">+12% Growth</Text>
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
                    <Text className="text-slate-300 text-sm">Revenue Collection Status</Text>
                    <Text className="text-blue-400 text-sm font-bold">$42.8M Collected</Text>
                  </View>
                  <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <View 
                      style={{ width: '94%' as any, backgroundColor: '#10b981' }} 
                      className="h-full rounded-full" 
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Strategic Roadmap */}
            <View className="mb-10">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Strategic Roadmap</Text>
              <View className="space-y-4">
                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-blue-600/20 p-3 rounded-2xl mr-4">
                    <PieChart color="#3b82f6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Research Excellence Center</Text>
                    <Text className="text-slate-400 text-xs">Phase 2: Equipment Procurement ($2.4M)</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>

                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-purple-600/20 p-3 rounded-2xl mr-4">
                    <Shield color="#8b5cf6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">NAAC Peer Review Audit</Text>
                    <Text className="text-slate-400 text-xs">Upcoming: Oct 15 - Oct 20, 2024</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )
    </ScrollView>
  );
};
