import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';

const INITIAL_FACULTY = [
  { id: 'FAC-001', name: 'Dr. Sarah Smith',        qualification: 'Ph.D. in AI',            experience: '12 Years', subjects: 'Advanced Algorithms', workload: '18h/wk', rating: '4.8/5' },
  { id: 'FAC-002', name: 'Dr. Sarah Wilson',       qualification: 'Ph.D. in ML',            experience: '8 Years',  subjects: 'Data Structures',       workload: '16h/wk', rating: '4.6/5' },
  { id: 'FAC-003', name: 'Prof. Albus Dumbledore', qualification: 'Ph.D. in Magic Systems', experience: '45 Years', subjects: 'Systems Magic',          workload: '8h/wk',  rating: '4.9/5' },
];

export const HoDFacultyTab = () => {
  const [localFaculty] = useState(INITIAL_FACULTY);

  return (
    <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} keyboardShouldPersistTaps="handled">
    <View className="space-y-6">
      <View className="flex-row justify-between items-center mb-2">
        <View>
          <Text className="text-white text-2xl font-bold">Faculty Management</Text>
          <Text className="text-slate-400 text-xs">Directory &amp; performance appraisal indices</Text>
        </View>
      </View>

      {localFaculty.map((fac) => (
        <View key={fac.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10">
          <View className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-white font-bold text-lg">{fac.name}</Text>
              <Text className="text-slate-400 text-xs">{fac.qualification} • Exp: {fac.experience}</Text>
            </View>
            <View className="bg-blue-600/10 px-3 py-1.5 rounded-full border border-blue-500/20">
              <Text className="text-blue-400 text-[10px] font-bold">Appraisal Rating: {fac.rating}</Text>
            </View>
          </View>
          <Text className="text-slate-300 text-xs border-t border-white/5 pt-3">
            Subject: {fac.subjects} | Workload: {fac.workload}
          </Text>
        </View>
      ))}
    </View>
    </ScrollView>
  );
};
