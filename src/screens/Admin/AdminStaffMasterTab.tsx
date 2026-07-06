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

export const AdminStaffMasterTab = ({
  searchQuery,
  setSearchQuery,
  setSelectedUser,
  setDetailModalVisible,
  setIsEditing,
  setFormData
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedUser: (user: any) => void;
  setDetailModalVisible: (visible: boolean) => void;
  setIsEditing: (editing: boolean) => void;
  setFormData: (data: any) => void;
}) => {
    const { users, deleteUser } = useStore();
    const filtered = users.filter((u: any) => u.role === 'Faculty' && (u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.id.includes(searchQuery)));
    return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
      <View className="space-y-6">
        <View className="bg-white/5 p-6 rounded-3xl border border-white/10 flex-row items-center">
          <Search color="#64748b" size={20} />
          <TextInput placeholder="Search staff..." placeholderTextColor="#64748b" className="flex-1 ml-4 text-white" value={searchQuery} onChangeText={setSearchQuery} />
        </View>
        <View className="bg-white/5 rounded-3xl p-8 border border-white/10">
          <Text className="text-white text-xl font-bold mb-6">Staff Master List</Text>
          <View className="space-y-3">
            {filtered.map((s: any) => (
              <View key={s.id} className="flex-row items-center justify-between p-4 bg-white/5 rounded-2xl">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-blue-500/20 rounded-full items-center justify-center mr-3">
                    <Text className="text-blue-400 font-bold">{s.name[0]}</Text>
                  </View>
                  <View><Text className="text-white font-bold">{s.name}</Text></View>
                </View>
                <View className="flex-row gap-2">
                  <TouchableOpacity onPress={() => { setSelectedUser(s); setDetailModalVisible(true); setIsEditing(false); }} className="bg-blue-600/20 p-2 rounded-lg"><Eye color="#60a5fa" size={16} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => { setSelectedUser(s); setFormData({...s, ...s.staffData}); setIsEditing(true); setDetailModalVisible(true); }} className="bg-white/10 p-2 rounded-lg"><Edit color="#94a3b8" size={16} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteUser(s.id)} className="bg-red-500/10 p-2 rounded-lg"><Trash2 color="#ef4444" size={16} /></TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
    );
  };