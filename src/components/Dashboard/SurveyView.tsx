import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ClipboardList, ChevronRight, Clock, Star, Users } from 'lucide-react-native';

interface SurveyViewProps {
  role: string;
}

export const SurveyView: React.FC<SurveyViewProps> = ({ role }) => {
  const surveys = [
    { id: 1, title: 'Institutional Quality Audit 2024', status: 'Active', deadline: 'Oct 30', participants: '4,200+', color: '#3b82f6' },
    { id: 2, title: 'Departmental Resource Feedback', status: 'Pending', deadline: 'Nov 05', participants: '850+', color: '#8b5cf6' },
    { id: 3, title: 'Student Satisfaction Survey', status: 'New', deadline: 'Nov 12', participants: '12,000+', color: '#10b981' },
    { id: 4, title: 'Faculty Work-Life Balance Study', status: 'Completed', deadline: 'Passed', participants: '2,400', color: '#f59e0b' },
  ];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      scrollEventThrottle={16}
      scrollEnabled={true}
    >
      <View className="space-y-8">
      <View>
        <Text className="text-white text-3xl font-bold mb-2">Surveys & Feedback</Text>
        <Text className="text-slate-400">Help us improve the university experience</Text>
      </View>

      <View className="flex-row justify-between mb-2">
        <View className="bg-white/5 px-6 py-4 rounded-3xl border border-white/10 items-center justify-center flex-1 mr-3">
          <Text className="text-blue-400 text-2xl font-bold">12</Text>
          <Text className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Active</Text>
        </View>
        <View className="bg-white/5 px-6 py-4 rounded-3xl border border-white/10 items-center justify-center flex-1 mx-3">
          <Text className="text-purple-400 text-2xl font-bold">8</Text>
          <Text className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Completed</Text>
        </View>
        <View className="bg-white/5 px-6 py-4 rounded-3xl border border-white/10 items-center justify-center flex-1 ml-3">
          <Text className="text-orange-400 text-2xl font-bold">3</Text>
          <Text className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Pending</Text>
        </View>
      </View>

      <View className="space-y-4">
        {surveys.map((survey) => (
          <TouchableOpacity 
            key={survey.id} 
            className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row items-center"
          >
            <View style={{ backgroundColor: `${survey.color}20` }} className="w-14 h-14 rounded-2xl items-center justify-center mr-5">
              <ClipboardList color={survey.color} size={28} />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <Text className="text-white font-bold text-lg">{survey.title}</Text>
              </View>
              <View className="flex-row items-center">
                <View className="flex-row items-center mr-4">
                  <Clock color="#64748b" size={12} />
                  <Text className="text-slate-400 text-xs ml-1">{survey.deadline}</Text>
                </View>
                <View className="flex-row items-center">
                  <Users color="#64748b" size={12} />
                  <Text className="text-slate-400 text-xs ml-1">{survey.participants}</Text>
                </View>
              </View>
            </View>
            <ChevronRight color="#475569" size={20} />
          </TouchableOpacity>
        ))}
      </View>

      <View className="bg-blue-600/10 p-8 rounded-[40px] border border-blue-500/20 items-center">
        <Star color="#3b82f6" size={32} fill="#3b82f6" />
        <Text className="text-white font-bold mt-4 text-center text-lg">Your voice matters!</Text>
        <Text className="text-slate-400 text-center mt-2 text-sm leading-relaxed">
          Participation in institutional surveys helps our governance teams make data-driven decisions for a better campus.
        </Text>
        <TouchableOpacity className="bg-blue-600 px-8 py-4 rounded-2xl mt-6 w-full">
          <Text className="text-white font-bold text-center">Start Mandatory Audit</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};
