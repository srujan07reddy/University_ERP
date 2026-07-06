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

export const AdminInventoryTab = () => {
  const { assets } = useStore();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
    <View className="bg-white/5 rounded-3xl p-8 border border-white/10">
      <Text className="text-white text-2xl font-bold mb-8">Asset & Inventory Tracking</Text>
      <View className="space-y-4">
        {assets.map((asset: any) => (
          <View key={asset.id} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex-row justify-between items-center">
            <View>
              <Text className="text-white font-bold text-lg">{asset.name}</Text>
              <Text className="text-slate-400">{asset.category} • Condition: {asset.condition}</Text>
              <Text className="text-slate-500 text-xs mt-1">Next Maint: {asset.nextMaintenance}</Text>
            </View>
            <TouchableOpacity className="bg-blue-600/20 px-4 py-2 rounded-xl border border-blue-500/30">
              <Text className="text-blue-400 font-bold text-xs">Schedule Maintenance</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
    </ScrollView>
  );
};