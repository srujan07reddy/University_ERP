import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, Alert, Modal, FlatList, Platform, ScrollView } from 'react-native';

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

export const AdminLogsTab = () => {
  const { auditLogs } = useStore();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
      <View className="bg-white/5 rounded-3xl p-8 border border-white/10" style={{ flex: 1 }}>
        <Text className="text-white text-xl font-bold mb-6">Audit Logs</Text>
        <ScrollView className="space-y-3" style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
          {auditLogs.map((log) => (
            <View key={log.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex-row justify-between">
              <View className="flex-1">
                <Text className="text-white font-bold">{log.action}</Text>
                <Text className="text-slate-400 text-xs">{log.actor} • {new Date(log.timestamp).toLocaleTimeString()}</Text>
                <Text className="text-slate-500 text-xs mt-1">{log.details}</Text>
              </View>
              <View className={`px-3 py-1 rounded-full h-6 ${log.severity === 'Critical' ? 'bg-red-500/20' : 'bg-blue-500/20'}`}>
                <Text className={`text-[10px] font-bold ${log.severity === 'Critical' ? 'text-red-400' : 'text-blue-400'}`}>{log.severity}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
    );
  };