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

export const AdminPayrollTab = () => {
  const { payroll, approvePayroll, addLog } = useStore();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
    <View className="bg-white/5 rounded-3xl p-8 border border-white/10">
      <Text className="text-white text-2xl font-bold mb-8">Monthly Payroll Approval</Text>
      <View className="space-y-4">
        {payroll.map((p: any) => (
          <View key={p.id} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex-row justify-between items-center">
            <View>
              <Text className="text-white font-bold text-lg">{p.staffName}</Text>
              <Text className="text-slate-400">{p.month} • Amount: ${p.amount}</Text>
              <View className="bg-orange-500/20 px-3 py-1 rounded-full mt-2 w-32">
                <Text className="text-orange-400 text-[10px] font-bold text-center">{p.status}</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => {
                approvePayroll(p.id);
                addLog({ actor: 'Admin', action: 'Payroll Authorized', details: `Salary for ${p.staffName} approved for ${p.month}`, severity: 'Info' as const });
                Alert.alert('Success', 'Payroll disbursement authorized.');
              }}
              className="bg-green-600 px-6 py-3 rounded-2xl"
            >
              <Text className="text-white font-bold">Authorize Payment</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
    </ScrollView>
  );
};