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

export const AdminSurveysTab = ({
  setSurveyModalVisible
}: {
  setSurveyModalVisible: (visible: boolean) => void;
}) => {
  const { surveys } = useStore();
  return (
    <View className="space-y-8">
      <View className="flex-row justify-between items-center">
        <View><Text className="text-white text-3xl font-bold">Surveys</Text></View>
        <TouchableOpacity onPress={() => setSurveyModalVisible(true)} className="bg-blue-600 px-8 py-4 rounded-2xl flex-row items-center"><Plus color="white" size={24} /><Text className="text-white font-bold ml-2">New Survey</Text></TouchableOpacity>
      </View>
      <View className="flex-row flex-wrap -mx-3">
        {surveys.map((s) => (
          <View key={s.id} className="w-full lg:w-1/2 px-3 mb-6">
            <View className="bg-white/5 p-8 rounded-[32px] border border-white/10">
              <Text className="text-white font-bold text-xl mb-2">{s.title}</Text>
              <Text className="text-slate-400 text-xs mb-4">Target: {s.role}</Text>
              <View className="space-y-3">
                {s.options.map((opt, i) => {
                  const total = (Object.values(s.results) as number[]).reduce((a,b) => a+b, 0) || 1;
                  const pct = Math.round(((s.results[opt] || 0) / total) * 100);
                  return (
                    <View key={i} className="bg-white/5 rounded-2xl overflow-hidden h-12 justify-center px-4 relative">
                      <View className="absolute inset-0 bg-blue-600/10" style={{ width: `${pct}%` }} />
                      <View className="flex-row justify-between relative z-10"><Text className="text-white">{opt}</Text><Text className="text-blue-400 font-bold">{pct}%</Text></View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};