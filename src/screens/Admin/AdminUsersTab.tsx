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

export const AdminUsersTab = () => (
    <View className="bg-white/5 rounded-3xl p-8 border border-white/10 shadow-sm">
      <View className="flex-row justify-between items-center mb-8">
        <View>
          <Text className="text-white text-2xl font-bold">Registration Center</Text>
          <Text className="text-slate-400 mt-1">Manage school admissions and appointments</Text>
        </View>
        <View className="flex-row gap-4">
          <TouchableOpacity 
            onPress={() => setAppointmentModalVisible(true)}
            className="bg-blue-600 px-6 py-3 rounded-2xl flex-row items-center shadow-lg shadow-blue-900/50"
          >
            <UserPlus color="white" size={20} />
            <Text className="text-white font-bold ml-2">Appoint Faculty</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setAdmissionModalVisible(true)}
            className="bg-blue-600 px-6 py-3 rounded-2xl flex-row items-center shadow-lg shadow-blue-900/50"
          >
            <Users color="white" size={20} />
            <Text className="text-white font-bold ml-2">New Admission</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="space-y-3">
        {users.slice(-5).reverse().map((u, i) => (
          <View key={i} className="flex-row items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
            <View className="flex-row items-center">
              <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${u.role === 'Faculty' ? 'bg-blue-500/20' : 'bg-purple-500/20'}`}>
                <Text className={`font-bold ${u.role === 'Faculty' ? 'text-blue-400' : 'text-purple-400'}`}>{u.name[0]}</Text>
              </View>
              <View>
                <Text className="text-white font-bold">{u.name}</Text>
                <Text className="text-slate-400 text-xs">{u.role} • {u.email}</Text>
              </View>
            </View>
            <View className="bg-green-500/20 px-3 py-1 rounded-full">
              <Text className="text-green-400 text-[10px] font-bold">VERIFIED</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );