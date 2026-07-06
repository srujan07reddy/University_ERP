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

export const AdminOverviewTab = () => {
  const { users, substitutions, addLog } = useStore();
  const [emergencyText, setEmergencyText] = useState('');

  const handleBroadcast = () => {
    if (!emergencyText.trim()) {
      Alert.alert('Error', 'Please enter some text to broadcast.');
      return;
    }
    addLog({
      actor: 'Admin',
      action: 'Emergency Broadcast',
      details: emergencyText,
      severity: 'Critical'
    });
    Alert.alert('Broadcast Sent', 'Emergency broadcast sent via FCM successfully.');
    setEmergencyText('');
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
    <View className="space-y-8">
      <View className="flex-row flex-wrap -mx-2">
        <StatCard title="Total Students" value={850} icon={Users} trend="+12%" color="#3b82f6" />
        <StatCard title="Institutional Staff" value={users.filter((u: any) => !['Student', 'Parent'].includes(u.role)).length} icon={Calendar} trend="+2%" color="#10b981" />
        <StatCard title="Daily Revenue" value="$42.5k" icon={TrendingUp} trend="+5.4%" color="#8b5cf6" />
        <StatCard title="Active Subs" value={substitutions.length} icon={Activity} color="#f59e0b" />
      </View>

      <View className="flex-row gap-6">
        <View className="flex-1 bg-white/5 p-8 rounded-3xl border border-white/10">
          <Text className="text-white text-xl font-bold mb-6">HR Compliance & Health</Text>
          <View className="space-y-4">
            <View className="flex-row justify-between items-center p-4 bg-blue-600/10 rounded-2xl">
              <View className="flex-row items-center">
                <Users color="#60a5fa" size={20} />
                <Text className="text-blue-300 font-semibold ml-2">Staff-Student Ratio</Text>
              </View>
              <Text className="text-white font-bold">1:18</Text>
            </View>
            <View className="flex-row justify-between items-center p-4 bg-green-600/10 rounded-2xl">
              <View className="flex-row items-center">
                <TrendingUp color="#34d399" size={20} />
                <Text className="text-green-300 font-semibold ml-2">Academic Benchmark</Text>
              </View>
              <Text className="text-white font-bold">94.2%</Text>
            </View>
          </View>
        </View>

        <View className="flex-1 bg-white/5 p-8 rounded-3xl border border-white/10">
          <Text className="text-white text-xl font-bold mb-4">Emergency Broadcast Center</Text>
          <TextInput
            placeholder="Type emergency alert (Holidays, Urgent alerts)..."
            placeholderTextColor="#64748b"
            className="bg-white/5 p-4 rounded-2xl border border-white/10 text-white h-24 mb-4"
            multiline
            value={emergencyText}
            onChangeText={setEmergencyText}
          />
          <TouchableOpacity onPress={handleBroadcast} className="bg-red-600 p-4 rounded-2xl items-center flex-row justify-center">
            <ShieldCheck color="white" size={20} />
            <Text className="text-white font-bold ml-2">Send FCM Broadcast</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};