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

export const AdminFinanceTab = ({
  screenWidth,
  sortedStudents,
  setMessagingTargetIds,
  setMessageForm,
  messageForm,
  setGroupMessageModalVisible
}: {
  screenWidth: number;
  sortedStudents: any[];
  setMessagingTargetIds: (ids: string[]) => void;
  setMessageForm: (form: any) => void;
  messageForm: any;
  setGroupMessageModalVisible: (visible: boolean) => void;
}) => {
  return (
    <View className="space-y-8">
      <View className="bg-white/5 p-8 rounded-3xl border border-white/10">
        <Text className="text-white text-xl font-bold mb-6">Live Revenue vs. Expenses</Text>
        <ChartContainer title="Financial Performance" subtitle="Real-time collection vs operational costs">
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr"],
              datasets: [
                { data: [35, 42, 38, 45], color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`, strokeWidth: 3 },
                { data: [28, 30, 29, 32], color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, strokeWidth: 2 }
              ],
              legend: ["Revenue", "Expenses"]
            }}
            width={screenWidth * 0.7}
            height={250}
            yAxisLabel="$"
            yAxisSuffix="k"
            chartConfig={{...chartConfig, backgroundGradientFrom: '#0F172A', backgroundGradientTo: '#0F172A' }}
            style={{ borderRadius: 16 }}
          />
        </ChartContainer>
      </View>

      <View className="bg-white/5 p-8 rounded-[40px] border border-white/10">
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-white text-2xl font-bold">Fee Default Tracker</Text>
            <Text className="text-slate-400 mt-1">Students with outstanding dues {'>'} $2000</Text>
          </View>
          <TouchableOpacity 
            onPress={() => {
              const defaulters = sortedStudents.filter(s => s.isDefaulter);
              setMessagingTargetIds(defaulters.map(s => s.id));
              setMessageForm({...messageForm, title: 'Urgent: Fee Payment Pending'});
              setGroupMessageModalVisible(true);
            }} 
            className="bg-red-600 px-6 py-3 rounded-2xl flex-row items-center shadow-lg shadow-red-500/30"
          >
            <Mail color="white" size={18} />
            <Text className="text-white font-bold ml-2">Message All Defaulters</Text>
          </TouchableOpacity>
        </View>
        
        <View className="flex-row flex-wrap gap-4 mb-8">
          {['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Graduates'].map((grade, i) => {
            const defaultRate = [15, 8, 22, 5, 12, 30][i];
            const color = defaultRate > 20 ? 'bg-red-600/40' : defaultRate > 10 ? 'bg-orange-600/40' : 'bg-green-600/40';
            return (
              <View key={grade} className={`w-32 h-32 ${color} rounded-3xl items-center justify-center border border-white/10`}>
                <Text className="text-white font-bold">{grade}</Text>
                <Text className="text-white/60 text-[10px] mt-1">{defaultRate}% Pending</Text>
              </View>
            );
          })}
        </View>

        <View className="space-y-3">
          {sortedStudents.filter(s => s.isDefaulter).map((s) => (
            <View key={s.id} className="flex-row items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-red-500/20 rounded-full items-center justify-center mr-4"><Text className="text-red-400 font-bold">{s.name[0]}</Text></View>
                <View>
                  <Text className="text-white font-bold">{s.name}</Text>
                  <Text className="text-red-400 text-xs">Due Amount: ${s.feeDue}</Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={() => {
                  setMessagingTargetIds([s.id]);
                  setMessageForm({...messageForm, title: 'Fee Due Reminder'});
                  setGroupMessageModalVisible(true);
                }}
                className="bg-white/5 p-3 rounded-xl border border-white/10"
              >
                <Mail color="#ef4444" size={18} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};