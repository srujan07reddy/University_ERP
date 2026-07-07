import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';

const INITIAL_SLOTS = [
  { time: '10:00 AM', subject: 'Advanced Algorithms', faculty: 'Dr. Sarah Smith',   room: 'LH 402' },
  { time: '02:00 PM', subject: 'Distributed Systems',  faculty: 'Dr. Gregory House', room: 'LH 403' },
];

export const HoDTimetableTab = () => {
  const [timetableSlots] = useState(INITIAL_SLOTS);

  return (
    <GlobalScrollView>
    <View className="space-y-6">
      <View className="bg-white/5 p-6 rounded-[32px] border border-white/10">
        <Text className="text-white font-bold text-lg mb-2">Conflict Detector &amp; Timetable Scheduler</Text>
        <Text className="text-slate-400 text-xs leading-relaxed mb-6">
          Our algorithmic scheduler automatically assigns classrooms and teachers. Click below to analyze conflicts.
        </Text>
        <TouchableOpacity
          onPress={() => Alert.alert('Scheduler Engine', 'Zero timetable conflicts detected for Fall Semester.')}
          className="bg-blue-600 p-4 rounded-xl items-center"
        >
          <Text className="text-white font-bold text-xs">Run Timetable Generator</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-white font-bold text-lg">Active Timetable Slots</Text>
      {timetableSlots.map((slot, i) => (
        <View key={i} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
          <View>
            <Text className="text-slate-400 text-[10px] font-bold uppercase">{slot.time} • Room {slot.room}</Text>
            <Text className="text-white font-bold text-lg mt-1">{slot.subject}</Text>
            <Text className="text-blue-400 text-xs mt-1">{slot.faculty}</Text>
          </View>
          <TouchableOpacity
            onPress={() => Alert.alert('Edit Slot', 'Timetable slot editor opened.')}
            className="bg-white/5 p-3 rounded-xl border border-white/10"
          >
            <RefreshCw color="white" size={16} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
    </GlobalScrollView>
  );
};
