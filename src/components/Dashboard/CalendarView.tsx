import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronRight, Plus } from 'lucide-react-native';

interface CalendarViewProps {
  role: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ role }) => {
  const events = [
    { id: 1, title: 'Annual Convocation 2024', time: '09:00 AM', date: 'Oct 25', location: 'Main Auditorium', type: 'Event', color: '#3b82f6' },
    { id: 2, title: 'Board of Governors Meeting', time: '02:30 PM', date: 'Oct 28', location: 'Council Room', type: 'Meeting', color: '#ef4444' },
    { id: 3, title: 'Semester End Examination Begins', time: 'All Day', date: 'Nov 10', location: 'Examination Halls', type: 'Academic', color: '#10b981' },
    { id: 4, title: 'Cultural Fest - Spark 24', time: '10:00 AM', date: 'Nov 15', location: 'Campus Grounds', type: 'Festival', color: '#f59e0b' },
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
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-white text-3xl font-bold mb-2">University Calendar</Text>
          <Text className="text-slate-400">Events, schedules, and important deadlines</Text>
        </View>
        <TouchableOpacity className="bg-blue-600 w-12 h-12 rounded-2xl items-center justify-center shadow-lg shadow-blue-500/40">
          <Plus color="white" size={24} />
        </TouchableOpacity>
      </View>

      {/* Date Picker Ribbon Mock */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        scrollEventThrottle={16} 
        scrollEnabled={true} 
        className="flex-row gap-4 mb-4"
        style={{ width: '100%' }}
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
      >
        {[20, 21, 22, 23, 24, 25, 26, 27].map((day, i) => (
          <TouchableOpacity 
            key={day} 
            className={`w-16 h-20 rounded-2xl items-center justify-center border ${i === 5 ? 'bg-blue-600 border-blue-400 shadow-lg shadow-blue-500/30' : 'bg-white/5 border-white/10'}`}
          >
            <Text className={`text-[10px] uppercase font-bold ${i === 5 ? 'text-white' : 'text-slate-500'}`}>{['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i % 7]}</Text>
            <Text className={`text-xl font-bold mt-1 ${i === 5 ? 'text-white' : 'text-white/80'}`}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="space-y-6">
        <Text className="text-white/60 text-xs font-bold uppercase tracking-widest px-1">Upcoming for {role}</Text>
        {events.map((event) => (
          <View key={event.id} className="flex-row">
            {/* Time Line */}
            <View className="items-center mr-6">
              <View style={{ backgroundColor: event.color }} className="w-4 h-4 rounded-full border-4 border-[#0F172A]" />
              <View className="w-0.5 flex-1 bg-white/10 my-1" />
            </View>
            
            <TouchableOpacity className="flex-1 bg-white/5 p-6 rounded-[32px] border border-white/10 mb-2">
              <View className="flex-row justify-between items-start mb-3">
                <View style={{ backgroundColor: `${event.color}20` }} className="px-3 py-1 rounded-full border border-white/5">
                  <Text style={{ color: event.color }} className="text-[10px] font-bold uppercase">{event.type}</Text>
                </View>
                <Text className="text-slate-500 text-xs font-bold">{event.date}</Text>
              </View>
              <Text className="text-white font-bold text-lg mb-2">{event.title}</Text>
              <View className="flex-row items-center gap-4">
                <View className="flex-row items-center">
                  <Clock color="#64748b" size={14} />
                  <Text className="text-slate-400 text-xs ml-1.5">{event.time}</Text>
                </View>
                <View className="flex-row items-center">
                  <MapPin color="#64748b" size={14} />
                  <Text className="text-slate-400 text-xs ml-1.5">{event.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      </View>
    </ScrollView>
  );
};
