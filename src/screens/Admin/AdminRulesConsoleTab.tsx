import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, TextInput, Alert, Modal, FlatList, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { ChartContainer, chartConfig } from '../../components/Dashboard/ChartContainer';
import { StatCard } from '../../components/Dashboard/StatCard';
import { 
  Users, LogOut, TrendingUp, 
  UserPlus, Calendar, AlertCircle, Activity,
  ShieldCheck, Briefcase, Database, Wallet,
  Clock, MapPin, CheckCircle, BarChart as BarChartIcon,
  Filter, Layers, Search, Eye, Edit, Trash2,
  MessageSquare, Mail, ClipboardList, Plus, ChevronRight,
  Target, GraduationCap
} from 'lucide-react-native';

export const AdminRulesConsoleTab = () => {
  const { businessRules, updateBusinessRule, simulateHours } = useStore();
    return (
      <View className="space-y-8">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-3xl font-bold">Business Rules Console</Text>
            <Text className="text-slate-400 text-sm mt-1">Configure automated policies and system thresholds for Jeppiaar University</Text>
          </View>
          <TouchableOpacity 
            onPress={() => {
              simulateHours(24);
              Alert.alert('Time Simulated', 'Simulated 24 hours passing. Workflow escalations evaluated and logged.');
            }}
            className="bg-purple-600 px-6 py-4 rounded-2xl flex-row items-center shadow-lg shadow-purple-950/40 hover:bg-purple-700"
          >
            <Activity color="white" size={20} />
            <Text className="text-white font-bold ml-2">Simulate 24 Hours</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap -mx-3">
          <View className="w-full lg:w-2/3 px-3 space-y-6">
            {businessRules.map((rule) => (
              <View key={rule.id} className="bg-white/5 p-6 rounded-[28px] border border-white/10 flex-row justify-between items-center">
                <View className="flex-1 mr-4">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-white font-bold text-lg">{rule.name}</Text>
                    <View className={`px-2 py-0.5 rounded-full ${rule.category === 'Attendance' ? 'bg-red-500/20' : rule.category === 'Placement' ? 'bg-emerald-500/20' : rule.category === 'Leave' ? 'bg-amber-500/20' : 'bg-blue-500/20'}`}>
                      <Text className={`text-[10px] font-bold ${rule.category === 'Attendance' ? 'text-red-400' : rule.category === 'Placement' ? 'text-emerald-400' : rule.category === 'Leave' ? 'text-amber-400' : 'text-blue-400'}`}>{rule.category}</Text>
                    </View>
                  </View>
                  <Text className="text-slate-400 text-xs mt-1">
                    Status: {rule.isEnabled ? 'Active Enforcement' : 'Disabled'}
                  </Text>
                </View>

                <View className="flex-row items-center gap-4">
                  {/* +/- Increments */}
                  <View className="flex-row items-center bg-white/5 rounded-2xl border border-white/10 px-2 py-1">
                    <TouchableOpacity 
                      onPress={() => updateBusinessRule(rule.id, Number(rule.value) - 1)}
                      className="p-2"
                    >
                      <Text className="text-slate-400 font-bold text-lg">-</Text>
                    </TouchableOpacity>
                    <Text className="text-white font-bold px-4">{rule.value}</Text>
                    <TouchableOpacity 
                      onPress={() => updateBusinessRule(rule.id, Number(rule.value) + 1)}
                      className="p-2"
                    >
                      <Text className="text-slate-400 font-bold text-lg">+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Toggle Button */}
                  <TouchableOpacity 
                    onPress={() => updateBusinessRule(rule.id, rule.value, !rule.isEnabled)}
                    className={`px-4 py-2 rounded-xl border ${rule.isEnabled ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}
                  >
                    <Text className={`text-xs font-bold ${rule.isEnabled ? 'text-emerald-400' : 'text-red-400'}`}>
                      {rule.isEnabled ? 'DISABLE' : 'ENABLE'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Right sidebar details */}
          <View className="w-full lg:w-1/3 px-3">
            <View className="bg-white/5 p-6 rounded-[28px] border border-white/10 space-y-6">
              <Text className="text-white font-bold text-xl">Approval Workflow Matrix</Text>
              
              <View className="space-y-4">
                <View className="flex-row gap-3">
                  <View className="w-6 h-6 rounded-full bg-blue-600 items-center justify-center col">
                    <Text className="text-white text-xs font-bold">1</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Academic Leaves & OD</Text>
                    <Text className="text-slate-400 text-xs">OD &gt; Threshold Days triggers auto HOD and Dean approval chain.</Text>
                  </View>
                </View>

                <View className="flex-row gap-3">
                  <View className="w-6 h-6 rounded-full bg-blue-600 items-center justify-center">
                    <Text className="text-white text-xs font-bold">2</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Automated Escalations</Text>
                    <Text className="text-slate-400 text-xs">Exceeding escalation hours auto moves requests up the hierarchy: HOD → Dean → Pro VC.</Text>
                  </View>
                </View>

                <View className="flex-row gap-3">
                  <View className="w-6 h-6 rounded-full bg-blue-600 items-center justify-center">
                    <Text className="text-white text-xs font-bold">3</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">Budget Approval Thresholds</Text>
                    <Text className="text-slate-400 text-xs">Requests over $5k auto-escalate from Dean to Pro VC and VC clearance.</Text>
                  </View>
                </View>
              </View>

              <View className="bg-[#1E293B] p-4 rounded-2xl border border-white/5">
                <Text className="text-yellow-400 text-xs font-bold">Active Engine Note</Text>
                <Text className="text-slate-400 text-[11px] mt-1">Changes are saved in-memory and affect attendance eligibility indicators and placement dashboard rosters instantly.</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };