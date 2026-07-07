import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Clock } from 'lucide-react-native';

const TIMETABLE_SLOTS = [
  { day: 'Monday',    time: '10:00 AM', subject: 'Advanced Algorithms',  room: 'Lab 3 (Ground Floor)' },
  { day: 'Tuesday',  time: '02:00 PM', subject: 'Distributed Systems',   room: 'LH 402' },
  { day: 'Wednesday',time: '11:30 AM', subject: 'Advanced Algorithms',  room: 'LH 403' },
  { day: 'Thursday', time: '09:00 AM', subject: 'Distributed Systems',   room: 'Lab 5 (2nd Floor)' },
];

export const FacultyTimetableTab = () => (
  <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} keyboardShouldPersistTaps="handled">
    <View className="space-y-6">
      <Text className="text-white text-2xl font-bold mb-2">Weekly Schedule</Text>
      {TIMETABLE_SLOTS.map((slot, i) => (
        <View key={i} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
          <View>
            <Text className="text-slate-400 text-[10px] font-bold uppercase">{slot.day} • {slot.time}</Text>
            <Text className="text-white font-bold text-lg mt-1">{slot.subject}</Text>
            <Text className="text-blue-400 text-xs mt-1">{slot.room}</Text>
          </View>
          <TouchableOpacity
            onPress={() => Alert.alert('Replacement Class', 'Request sent to HoD for substitute arrangement.')}
            className="bg-purple-600/20 px-3 py-1.5 rounded-full border border-purple-500/20"
          >
            <Text className="text-purple-400 text-[10px] font-bold">REPLACEMENT CLASS</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  </ScrollView>
);
