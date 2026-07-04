import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput, Alert, Modal } from 'react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Wallet, DollarSign, TrendingUp, Briefcase, Database, MapPin,
  GraduationCap
} from 'lucide-react-native';

export const ProVCHomeTab = ({
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
                  <Text className="text-slate-400 text-sm font-medium">Academic & Student Affairs</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>Pro Vice Chancellor</Text>
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
                title="Curriculum Completion" 
                value="94.2%" 
                icon={GraduationCap} 
                trend="On Schedule" 
                color="#3b82f6"
              />
              <StatCard 
                title="Faculty Appraisals" 
                value="142 / 160" 
                icon={Users} 
                trend="92% Completed" 
                color="#10b981"
              />
            </View>

            <View className="flex-row mb-8">
              <StatCard 
                title="Research Proposals" 
                value="34" 
                icon={BookOpen} 
                trend="18 Approved" 
                color="#8b5cf6"
              />
              <StatCard 
                title="Accreditation Score" 
                value="A++ (3.72)" 
                icon={Award} 
                trend="NAAC Grade" 
                color="#f59e0b"
              />
            </View>

            {/* Academic Progression */}
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8">
              <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>Academic Milestones</Text>
              
              <View className="space-y-6">
                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-slate-300 text-sm">Outcome Based Education (OBE) Mapping</Text>
                    <Text className="text-green-400 text-sm font-bold">90%</Text>
                  </View>
                  <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <View 
                      style={{ width: '90%' as any, backgroundColor: '#3b82f6' }} 
                      className="h-full rounded-full" 
                    />
                  </View>
                </View>

                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-slate-300 text-sm">Industry Collaborations & MoUs</Text>
                    <Text className="text-blue-400 text-sm font-bold">42 signed / 50 Goal</Text>
                  </View>
                  <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <View 
                      style={{ width: '84%' as any, backgroundColor: '#10b981' }} 
                      className="h-full rounded-full" 
                    />
                  </View>
                </View>
              </View>
            </View>
          </>
        )
  );
};
