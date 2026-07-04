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

export const AdminTimetableTab = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];
    
    return (
      <View className="space-y-6">
        <View className="flex-row justify-between items-center bg-white/5 p-8 rounded-[40px] border border-white/10">
          <View>
            <Text className="text-white text-3xl font-bold">Master Academic Schedule</Text>
            <Text className="text-slate-400 mt-1">Viewing {timetableMode}-wise timetable for {timetableFilter}</Text>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity 
              onPress={handleAutoGenerateTimetable}
              className="bg-blue-600 px-8 py-3 rounded-2xl flex-row items-center gap-2 shadow-lg shadow-blue-500/30"
            >
              <Activity color="white" size={18} />
              <Text className="text-white font-bold text-xs">{isGenerating ? 'Optimizing...' : 'Generate AI Schedule'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => { setTimetableMode('Class'); setTimetableFilter('10th-A'); }}
              className={`px-6 py-3 rounded-2xl border ${timetableMode === 'Class' ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10'}`}
            >
              <Text className="text-white font-bold text-xs">Class-wise</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => { setTimetableMode('Teacher'); setTimetableFilter('Mr. Ramesh'); }}
              className={`px-6 py-3 rounded-2xl border ${timetableMode === 'Teacher' ? 'bg-purple-600 border-purple-500' : 'bg-white/5 border-white/10'}`}
            >
              <Text className="text-white font-bold text-xs">Teacher-wise</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="space-y-4 mb-2">
           {timetableMode === 'Class' ? (
             <View className="space-y-4">
               <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16} scrollEnabled={true} className="flex-row gap-2" style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
                 {DEPARTMENTS.map((dept) => (
                   <TouchableOpacity 
                     key={dept} 
                     onPress={() => setTimetableFilter(dept + '-A')}
                     className={`px-6 py-3 rounded-xl border ${timetableFilter.startsWith(dept) ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/10'}`}
                   >
                     <Text className={`font-bold ${timetableFilter.startsWith(dept) ? 'text-white' : 'text-slate-400'}`}>{dept}</Text>
                   </TouchableOpacity>
                 ))}
               </ScrollView>
               <View className="flex-row gap-3">
                 {['Section A', 'Section B', 'Section C'].map((sec) => (
                   <TouchableOpacity 
                     key={sec} 
                     onPress={() => setTimetableFilter(timetableFilter.split('-')[0] + '-' + sec.split(' ')[1])}
                     className={`px-8 py-3 rounded-xl border ${timetableFilter.endsWith(sec.split(' ')[1]) ? 'bg-blue-500/20 border-blue-500/40' : 'bg-white/5 border-white/10'}`}
                   >
                     <Text className={`font-bold text-xs ${timetableFilter.endsWith(sec.split(' ')[1]) ? 'text-blue-400' : 'text-slate-500'}`}>{sec}</Text>
                   </TouchableOpacity>
                 ))}
               </View>
             </View>
           ) : (
             <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2" style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
               {['Mr. Ramesh', 'Ms. Priya', 'Mr. Amit', 'Ms. Sneha', 'Mr. Vikram'].map((teacher) => (
                 <TouchableOpacity 
                   key={teacher} 
                   onPress={() => setTimetableFilter(teacher)}
                   className={`px-6 py-3 rounded-xl border ${timetableFilter === teacher ? 'bg-purple-600 border-purple-500 shadow-lg shadow-purple-500/20' : 'bg-white/5 border-white/10'}`}
                 >
                   <Text className={`font-bold ${timetableFilter === teacher ? 'text-white' : 'text-slate-400'}`}>{teacher}</Text>
                 </TouchableOpacity>
               ))}
             </ScrollView>
           )}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16} scrollEnabled={true} className="pb-4" style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
          <View className="bg-white/5 p-4 rounded-[40px] border border-white/10">
            <View className="flex-row border-b border-white/10 pb-6">
              <View className="w-32 items-center justify-center">
                <Clock color="#64748b" size={24} />
              </View>
              {days.map(day => (
                <View key={day} className="w-56 items-center py-2">
                  <Text className="text-blue-400 font-bold text-lg">{day}</Text>
                </View>
              ))}
            </View>

            {timeSlots.map((slot, i) => (
              <View key={slot} className={`flex-row border-b border-white/5 ${i === timeSlots.length - 1 ? 'border-b-0' : ''}`}>
                <View className="w-32 h-32 items-center justify-center border-r border-white/5">
                  <Text className="text-slate-500 font-medium text-xs">{slot}</Text>
                </View>
                {days.map(day => {
                  const entry = timetableData.find(e => e.day === day && e.slot === slot) || (timetableData.length === 0 ? { subject: 'Mathematics', teacher: 'Mr. Ramesh', room: 'RM 101' } : null);
                  return (
                    <View key={`${day}-${slot}`} className="w-56 h-32 p-3 border-r border-white/5">
                      {entry ? (
                        <View className={`flex-1 rounded-3xl p-5 justify-center border ${i % 2 === 0 ? 'bg-blue-500/10 border-blue-500/20' : 'bg-purple-500/10 border-purple-500/20'}`}>
                          <View className="flex-row justify-between items-start mb-2">
                            <Text className="text-white font-bold text-sm">
                              {timetableMode === 'Class' ? entry.subject : (timetableFilter.includes('10th') ? entry.subject : 'Grade 10-A')}
                            </Text>
                            <View className="bg-white/10 px-2 py-1 rounded-md">
                              <Text className="text-white/60 text-[8px] font-bold">{entry.room}</Text>
                            </View>
                          </View>
                          <Text className="text-slate-400 text-xs">
                            {timetableMode === 'Class' ? entry.teacher : 'Advanced Algebra'}
                          </Text>
                          <View className="flex-row items-center mt-3">
                            <View className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                            <Text className="text-green-400 text-[10px] font-bold">OPTIMIZED</Text>
                          </View>
                        </View>
                      ) : (
                        <View className="flex-1 rounded-3xl border border-dashed border-white/5 items-center justify-center bg-black/20">
                          <Text className="text-slate-700 text-xs font-medium">Interval / Free</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };