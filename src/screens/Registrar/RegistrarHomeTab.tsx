import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput, Alert, Modal } from 'react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Wallet, DollarSign, TrendingUp, Briefcase, Database, MapPin,
  FileCheck
} from 'lucide-react-native';

export const RegistrarHomeTab = ({
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
                  <Text className="text-slate-400 text-sm font-medium">Administrative Head</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>University Registrar</Text>
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

            {/* Operational KPI Grid */}
            <View className="flex-row mb-6">
              <StatCard 
                title="Active Enrollments" 
                value="12,840" 
                icon={Users} 
                trend="+540" 
                color="#3b82f6"
              />
              <StatCard 
                title="Degree Audit" 
                value="98.2%" 
                icon={FileCheck} 
                trend="On track" 
                color="#10b981"
              />
            </View>

            <View className="flex-row mb-8">
              <StatCard 
                title="Records Digitized" 
                value="94%" 
                icon={Database} 
                trend="+12%" 
                color="#8b5cf6"
              />
              <StatCard 
                title="Pending Verifications" 
                value="142" 
                icon={Shield} 
                trend="-15" 
                color="#f59e0b"
              />
            </View>

            {/* Compliance & Records */}
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8">
              <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>Compliance & Records</Text>
              
              <View className="space-y-6">
                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-slate-300 text-sm">Convocation Eligibility Audit</Text>
                    <Text className="text-green-400 text-sm font-bold">Completed</Text>
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
                    <Text className="text-slate-300 text-sm">Faculty Service Book Digitization</Text>
                    <Text className="text-blue-400 text-sm font-bold">78%</Text>
                  </View>
                  <View className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <View 
                      style={{ width: '78%' as any, backgroundColor: '#3b82f6' }} 
                      className="h-full rounded-full" 
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Departmental Queue */}
            <View className="mb-10">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 24 }}>Administrative Queue</Text>
              <View className="space-y-4">
                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-blue-600/20 p-3 rounded-2xl mr-4">
                    <FileText color="#3b82f6" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">End-of-Term Grade Audit</Text>
                    <Text className="text-slate-400 text-xs">Awaiting CoE final sign-off</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>

                <TouchableOpacity className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                  <View className="bg-amber-600/20 p-3 rounded-2xl mr-4">
                    <Users color="#f59e0b" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Employee Exit Clearance</Text>
                    <Text className="text-slate-400 text-xs">4 Faculty departures pending</Text>
                  </View>
                  <ChevronRight color="#475569" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )
  );
};
