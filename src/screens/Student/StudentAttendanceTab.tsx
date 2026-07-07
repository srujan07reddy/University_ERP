import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useStore } from '../../store/useStore';
import { Award, AlertCircle } from 'lucide-react-native';
import { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';

export const StudentAttendanceTab = () => {
  const { user, businessRules } = useStore();
  const studentData = user?.universityData?.studentData;
  
  const attendanceRule = businessRules?.find(r => r.id === 'rule_1');
  const minAttendance = attendanceRule?.isEnabled && typeof attendanceRule.value === 'number' ? attendanceRule.value : 75;
  const isEligible = (studentData?.attendancePercentage || 0) >= minAttendance;

  return (
    <GlobalScrollView>
    <View className="space-y-6">
      <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 items-center justify-center">
        <Text className="text-slate-400 text-sm font-medium">Overall Attendance</Text>
        <Text className="text-white text-5xl font-bold mt-2">{studentData?.attendancePercentage}%</Text>
        
        <View className={`px-4 py-1.5 rounded-full border mt-4 ${isEligible ? 'bg-green-600/10 border-green-500/20' : 'bg-red-600/10 border-red-500/20'}`}>
          <Text className={`text-xs font-bold ${isEligible ? 'text-green-400' : 'text-red-400'}`}>
            {isEligible ? 'ELIGIBLE FOR EXAMS' : `BLOCKED: ATTENDANCE < ${minAttendance}%`}
          </Text>
        </View>

        {isEligible ? (
          <TouchableOpacity 
            onPress={() => Alert.alert('Hall Ticket', 'Your Hall Ticket (HT-2026-CSE) has been generated and downloaded.')}
            className="bg-blue-600 px-6 py-3 rounded-2xl mt-6 flex-row items-center gap-2"
          >
            <Award color="white" size={16} />
            <Text className="text-white font-bold text-xs">Download Hall Ticket</Text>
          </TouchableOpacity>
        ) : (
          <View className="bg-red-500/5 border border-red-500/10 p-4 rounded-2xl mt-6 flex-row items-center gap-3">
            <AlertCircle color="#f87171" size={18} />
            <Text className="text-slate-450 text-xs flex-1">Hall Ticket blocked automatically by system policy since attendance is below the configured {minAttendance}% requirement.</Text>
          </View>
        )}
      </View>

      <Text className="text-white font-bold text-lg mt-2">Subject-wise History</Text>
      {[
        { subject: 'Software Architecture', attendance: 85 },
        { subject: 'Database Management Systems', attendance: 78 },
        { subject: 'Advanced Algorithms', attendance: 83 }
      ].map((item, idx) => (
        <View key={idx} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
          <Text className="text-white font-bold">{item.subject}</Text>
          <Text className="text-blue-400 font-bold">{item.attendance}%</Text>
        </View>
      ))}
    </View>
    </GlobalScrollView>
  );
};
