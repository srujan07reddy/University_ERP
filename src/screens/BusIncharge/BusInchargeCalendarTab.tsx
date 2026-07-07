import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Calendar, ShieldAlert } from 'lucide-react-native';
import { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';

export const BusInchargeCalendarTab = () => {
  const schedule = [
    { event: 'Route 12 Servicing', date: 'Jul 10', status: 'Booked' },
    { event: 'Driver Ramesh Kumar License Renewal', date: 'Jul 14', status: 'Pending' },
    { event: 'Emergency Drill - Route 3', date: 'Jul 20', status: 'Planned' }
  ];

  return (
    <GlobalScrollView>
    <View className="space-y-8">
      <View className="bg-white/5 p-8 rounded-[40px] border border-white/10">
        <Text className="text-white text-3xl font-bold">Duty Rota & Maintenance Calendar</Text>
        <Text className="text-slate-400 mt-1">Track vehicle health inspections and driver shift schedules</Text>
      </View>

      <View className="space-y-4">
        {schedule.map((item, idx) => (
          <View key={idx} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
            <View className="flex-row items-center gap-3">
              <Calendar color="#8b5cf6" size={24} />
              <View>
                <Text className="text-white font-bold text-lg">{item.event}</Text>
                <Text className="text-slate-400 text-xs">Date: {item.date}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Action Logged', `${item.event} status confirmed.`)} className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
              <Text className="text-slate-350 text-xs font-bold">{item.status}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
    </GlobalScrollView>
  );
};
