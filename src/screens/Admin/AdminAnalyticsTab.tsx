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

const SEMESTERS = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'];
const screenWidth = Dimensions.get('window').width;

export const AdminAnalyticsTab = ({
  messageForm,
  setMessageForm,
  setGroupMessageModalVisible,
  performanceSettings,
  messagingTargetIds,
  setMessagingTargetIds,
  setPerfSettingsModalVisible
}: {
  messageForm: any;
  setMessageForm: (form: any) => void;
  setGroupMessageModalVisible: (visible: boolean) => void;
  performanceSettings: { high: string; medium: string; low: string };
  messagingTargetIds: string[];
  setMessagingTargetIds: (ids: string[]) => void;
  setPerfSettingsModalVisible: (visible: boolean) => void;
}) => {
    const { users } = useStore();
    const [analyticsMetric, setAnalyticsMetric] = useState<'Attendance' | 'Assignments' | 'Assessments' | 'ExamComparison'>('Attendance');
    const [selectedSem, setSelectedSem] = useState('Sem 1');
    const [analyticsSortOrder, setAnalyticsSortOrder] = useState<'high' | 'low' | 'none' | 'improvement'>('none');
    const [segmentFilter, setSegmentFilter] = useState<'high' | 'medium' | 'low' | 'none'>('none');
    const [searchQuery, setSearchQuery] = useState('');

    // Safe string hash — works for both numeric and alphanumeric IDs
    const strHash = (str: string) => str.split('').reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) | 0, 0);

    // Performance Segmentation Logic computed locally
    const sortedStudents = React.useMemo(() => {
      let base = users.filter(u => u.role === 'Student').map((s: any) => {
        const h = Math.abs(strHash(s.id));
        const score = (h * 7) % 100 || 75;
        let segment: 'high' | 'medium' | 'low' = 'medium';
        if (score >= 85) segment = 'high';
        else if (score < 60) segment = 'low';
        
        const feeDue = (h * 100) % 5000;
        const isDefaulter = feeDue > 2000;
        
        const preLastExam = (h * 7) % 40 + 45;
        const lastExam = (h * 9) % 40 + 50;
        const presentExam = (h * 11) % 40 + 55;
        const improvement = presentExam - lastExam;
        const overallTrend = presentExam - preLastExam;
        
        return { ...s, score, segment, feeDue, isDefaulter, preLastExam, lastExam, presentExam, improvement, overallTrend };
      });

      if (analyticsSortOrder === 'high') return base.sort((a, b) => b.presentExam - a.presentExam);
      if (analyticsSortOrder === 'low') return base.sort((a, b) => a.presentExam - b.presentExam);
      if (analyticsSortOrder === 'improvement') return base.sort((a, b) => b.improvement - a.improvement);
      return base;
    }, [users, analyticsSortOrder]);

    const filteredAnalyticsStudents = sortedStudents.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSegment = segmentFilter === 'none' || s.segment === segmentFilter;
      return matchesSearch && matchesSegment;
    });

    const getChartData = () => {
      if (analyticsMetric === 'Attendance') {
        return {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            { data: [92, 94, 88, 95, 91], color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`, strokeWidth: 3 },
            { data: [85, 87, 82, 89, 86], color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, strokeWidth: 2 }
          ],
          legend: ["Section A", "Section B"]
        };
      } else if (analyticsMetric === 'Assignments') {
        return {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            { data: [45, 52, 38, 65, 48], color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`, strokeWidth: 3 },
            { data: [40, 48, 35, 60, 42], color: (opacity = 1) => `rgba(236, 72, 153, ${opacity})`, strokeWidth: 2 }
          ],
          legend: ["Section A", "Section B"]
        };
      } else if (analyticsMetric === 'ExamComparison') {
        return {
          labels: ["Math", "Sci", "Eng", "Hist", "Soc"],
          datasets: [
            { data: [58, 62, 65, 60, 68], color: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`, strokeWidth: 1 }, // Previous Exam
            { data: [65, 70, 72, 68, 75], color: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`, strokeWidth: 2 }, // Last Exam
            { data: [78, 82, 85, 80, 88], color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`, strokeWidth: 3 }  // Present Exam
          ],
          legend: ["Prev Exam", "Last Exam", "Present Exam"]
        };
      } else {
        return {
          labels: ["Math", "Sci", "Eng", "Hist", "Soc"],
          datasets: [
            { data: [78, 82, 75, 88, 80], color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`, strokeWidth: 3 },
            { data: [72, 75, 70, 82, 78], color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, strokeWidth: 2 }
          ],
          legend: ["Section A", "Section B"]
        };
      }
    };

    return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
      <View className="space-y-8">
        <View className="bg-white/5 rounded-[40px] p-8 border border-white/10 shadow-sm">
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-white text-3xl font-bold">Academic Intelligence</Text>
              <Text className="text-slate-400 mt-1">Real-time performance tracking</Text>
            </View>
            <TouchableOpacity onPress={() => setPerfSettingsModalVisible(true)} className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <ClipboardList color="#94a3b8" size={24} />
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-4 mb-8">
             {['Attendance', 'Assignments', 'Assessments', 'ExamComparison'].map((m: any) => (
                <TouchableOpacity key={m} onPress={() => setAnalyticsMetric(m)} className={`flex-1 p-4 rounded-2xl border ${analyticsMetric === m ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10'}`}>
                  <Text className={`text-center font-bold text-[10px] uppercase ${analyticsMetric === m ? 'text-white' : 'text-slate-400'}`}>{m === 'ExamComparison' ? 'Exam Progress' : m}</Text>
                </TouchableOpacity>
              ))}
          </View>
          <View className="mb-8">
            <ScrollView horizontal showsHorizontalScrollIndicator={true} scrollEventThrottle={16} scrollEnabled={true} className="flex-row gap-3" style={{ width: '100%' }} showsVerticalScrollIndicator={true}>
              {SEMESTERS.map((grade: string) => (
                <TouchableOpacity key={grade} onPress={() => setSelectedSem(grade)} className={`px-8 py-4 rounded-2xl border ${selectedSem === grade ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10'}`}>
                  <Text className={`font-bold ${selectedSem === grade ? 'text-white' : 'text-slate-400'}`}>{grade}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <ChartContainer title={`${analyticsMetric} Comparison`} subtitle={`Semester ${selectedSem}`}>
            <ScrollView horizontal showsHorizontalScrollIndicator={true} scrollEventThrottle={16} scrollEnabled={true} className="w-full" style={{ width: '100%' }} showsVerticalScrollIndicator={true}>
              <LineChart data={getChartData()} width={Math.max(screenWidth * 0.7, 600)} height={300} yAxisLabel="" yAxisSuffix={analyticsMetric === 'Assessments' ? "" : "%"} chartConfig={{...chartConfig, backgroundGradientFrom: '#0F172A', backgroundGradientTo: '#0F172A', decimalPlaces: 0 }} bezier style={{ marginVertical: 8, borderRadius: 24 }} />
            </ScrollView>
          </ChartContainer>
        </View>

        <View className="bg-white/5 rounded-[40px] p-8 border border-white/10">
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-white text-2xl font-bold">Performance Segmentation</Text>
              <Text className="text-slate-400 mt-1">{filteredAnalyticsStudents.length} Students Selected</Text>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity 
                onPress={() => {
                  if (analyticsSortOrder === 'none') setAnalyticsSortOrder('high');
                  else if (analyticsSortOrder === 'high') setAnalyticsSortOrder('low');
                  else if (analyticsSortOrder === 'low') setAnalyticsSortOrder('improvement');
                  else setAnalyticsSortOrder('none');
                }} 
                className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 flex-row items-center gap-2"
              >
                <TrendingUp color={analyticsSortOrder !== 'none' ? '#3b82f6' : '#94a3b8'} size={20} />
                <Text className="text-white font-bold text-xs">
                  {analyticsSortOrder === 'none' ? 'Sort' : `Sorted: ${analyticsSortOrder}`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  setMessagingTargetIds(filteredAnalyticsStudents.map(s => s.id));
                  setMessageForm({...messageForm, title: 'Academic Progress Update'});
                  setGroupMessageModalVisible(true);
                }} 
                className="bg-blue-600 px-6 py-3 rounded-2xl flex-row items-center shadow-lg shadow-blue-500/30"
              >
                <Mail color="white" size={18} />
                <Text className="text-white font-bold ml-2">Message Filtered</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row gap-4 mb-8">
            {[
              { label: 'High', color: 'text-green-400', bg: 'bg-green-500/10', desc: performanceSettings.high, key: 'high' },
              { label: 'Medium', color: 'text-blue-400', bg: 'bg-blue-500/10', desc: performanceSettings.medium, key: 'medium' },
              { label: 'Low', color: 'text-red-400', bg: 'bg-red-500/10', desc: performanceSettings.low, key: 'low' }
            ].map((seg) => (
              <TouchableOpacity 
                key={seg.label} 
                onPress={() => setSegmentFilter(seg.key as any === segmentFilter ? 'none' : seg.key as any)}
                className={`flex-1 ${seg.bg} p-6 rounded-3xl border ${segmentFilter === seg.key ? 'border-white/40' : 'border-white/5'}`}
              >
                <Text className={`${seg.color} font-bold text-lg`}>{seg.label}</Text>
                <Text className="text-slate-400 text-[10px] mt-2">{seg.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="space-y-3">
            {filteredAnalyticsStudents.map((s: any) => (
              <View key={s.id} className="flex-row items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-white/10 rounded-full items-center justify-center mr-4"><Text className="text-white font-bold">{s.name[0]}</Text></View>
                  <View>
                    <Text className="text-white font-bold">{s.name}</Text>
                    <Text className="text-slate-500 text-[10px]">
                      {s.preLastExam}% → {s.lastExam}% → {s.presentExam}% ({s.overallTrend > 0 ? '+' : ''}{s.overallTrend}% Trend)
                    </Text>
                  </View>
                </View>
                <View className={`px-4 py-1 rounded-full ${s.segment === 'high' ? 'bg-green-500/20' : s.segment === 'low' ? 'bg-red-500/20' : 'bg-blue-500/20'}`}><Text className={`text-[10px] font-bold ${s.segment === 'high' ? 'text-green-400' : s.segment === 'low' ? 'text-red-400' : 'text-blue-400'}`}>{s.segment.toUpperCase()}</Text></View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
    );
  };