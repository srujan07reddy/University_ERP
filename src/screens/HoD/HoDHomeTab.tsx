import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput, Alert, Modal } from 'react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Wallet, DollarSign, TrendingUp, Briefcase, Database, MapPin
} from 'lucide-react-native';

export const HoDHomeTab = () => {
  const { user, setUser, users, substitutions } = useStore();
  const studentData = user?.universityData?.studentData;
  const facultyData = user?.universityData?.facultyData;
  
  return (
    (
          <>
            {/* Dashboard Overview */}
            <View className="flex-row justify-between items-center mb-8">
              <View className="flex-row items-center">
                {Platform.OS !== 'web' && (
                  <TouchableOpacity 
                    onPress={() => setMenuVisible(true)}
                    className="bg-white/5 p-3 rounded-2xl border border-white/10 mr-4"
                  >
                    <Menu color="white" size={20} />
                  </TouchableOpacity>
                )}
                <View>
                  <Text className="text-slate-400 text-sm font-medium">Department of Computer Science</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>HOD Management Portal</Text>
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

            {/* Department KPIs widgets */}
            <View className="flex-row mb-6">
              <StatCard title="Total Faculty" value="16" icon={Users} trend="CS Department" color="#3b82f6" />
              <StatCard title="Total Students" value="480" icon={Users} trend="4 Active Batches" color="#10b981" />
            </View>

            <View className="flex-row mb-8">
              <StatCard title="Faculty on Leave" value="2" icon={Clock} trend="Today" color="#8b5cf6" />
              <StatCard title="Pending Approvals" value={leaveRequests.filter(req => req.status === 'Pending').length.toString()} icon={AlertCircle} trend="Requires Action" color="#ef4444" />
            </View>

            {/* Student placement widget */}
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8 flex-row justify-between items-center">
              <View>
                <Text className="text-white font-bold text-lg">Placement Drive Statistics</Text>
                <Text className="text-slate-400 text-xs mt-1">CS Eligible Students: 120 • Placed: 102</Text>
              </View>
              <View className="bg-blue-600/15 p-4 rounded-full border border-blue-500/20">
                <Text className="text-blue-400 font-bold text-xl">85%</Text>
              </View>
            </View>
          </>
        )
  );
};
