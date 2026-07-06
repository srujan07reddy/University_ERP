import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput, Alert, Modal } from 'react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Wallet, DollarSign, TrendingUp, Briefcase, Database, MapPin,
  PieChart
} from 'lucide-react-native';

export const FinanceHomeTab = ({
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
                <TouchableOpacity 
                  onPress={() => setMenuVisible?.(true)}
                  className="bg-white/5 p-3 rounded-2xl border border-white/10 mr-4"
                >
                  <Menu color="white" size={20} />
                </TouchableOpacity>
                <View>
                  <Text className="text-slate-400 text-sm font-medium">Fiscal Management</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>Finance Hub</Text>
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

            {/* Financial KPI Grid */}
            <View className="flex-row mb-6">
              <StatCard 
                title="Revenue" 
                value="$12.4M" 
                icon={DollarSign} 
                trend="+8.2%" 
                color="#3b82f6"
              />
              <StatCard 
                title="Operational Cost" 
                value="$8.1M" 
                icon={TrendingUp} 
                trend="-2.4%" 
                color="#ef4444"
              />
            </View>

            <View className="flex-row mb-8">
              <StatCard 
                title="Grant Utilization" 
                value="74%" 
                icon={BarChart3} 
                trend="On track" 
                color="#8b5cf6"
              />
              <StatCard 
                title="Asset Value" 
                value="$450M" 
                icon={PieChart} 
                trend="+4.2%" 
                color="#f59e0b"
              />
            </View>

            {/* Monthly Budget Allocation */}
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8">
              <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>Budget Allocation</Text>
              
              <View className="space-y-6">
                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-slate-300 text-sm">Faculty Salaries (Oct)</Text>
                    <Text className="text-green-400 text-sm font-bold">$2.4M / $2.4M</Text>
                  </View>
                  <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <View 
                      style={{ width: '100%' as any, backgroundColor: '#10b981' }} 
                      className="h-full rounded-full" 
                    />
                  </View>
                </View>

                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-slate-300 text-sm">Campus Maintenance Fund</Text>
                    <Text className="text-blue-400 text-sm font-bold">$840k Remaining</Text>
                  </View>
                  <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <View 
                      style={{ width: '64%' as any, backgroundColor: '#3b82f6' }} 
                      className="h-full rounded-full" 
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Strategic Roadmap */}
            <View className="mb-10">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Strategic Financial Planning</Text>
              <View className="space-y-4">
                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-blue-600/20 p-3 rounded-2xl mr-4">
                    <Clock color="#3b82f6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Annual Audit Preparation</Text>
                    <Text className="text-slate-400 text-xs">External audit starting Nov 12</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>

                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-purple-600/20 p-3 rounded-2xl mr-4">
                    <Users color="#8b5cf6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">New Research Grants</Text>
                    <Text className="text-slate-400 text-xs">3 Proposal budgets approved</Text>
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
