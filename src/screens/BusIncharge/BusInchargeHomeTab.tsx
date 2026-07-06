import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { MapPin, Activity } from 'lucide-react-native';

export const BusInchargeHomeTab = () => {
  const routes = [
    { id: '1', busNo: 'KA-01-2024', driver: 'Ramesh Kumar', phone: '+91 98765 43210', route: 'Electronic City - Silk Board', status: 'On Time', students: 45, currentStop: 'Silk Board' },
    { id: '2', busNo: 'KA-01-2025', driver: 'Suresh Singh', phone: '+91 98765 43211', route: 'Indiranagar - MG Road', status: 'Delayed', students: 38, currentStop: 'Domlur' },
    { id: '3', busNo: 'KA-01-2026', driver: 'Amit Patel', phone: '+91 98765 43212', route: 'Whitefield - Marathahalli', status: 'On Time', students: 50, currentStop: 'Marathahalli' }
  ];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
    <View className="space-y-8">
      <View className="flex-row justify-between items-center bg-white/5 p-8 rounded-[40px] border border-white/10">
        <View>
          <Text className="text-white text-3xl font-bold">Fleet Management</Text>
          <Text className="text-slate-400 mt-1">Real-time GPS bus tracking & route monitoring</Text>
        </View>
        <View className="flex-row gap-4">
          <View className="bg-green-500/20 px-4 py-2 rounded-2xl flex-row items-center border border-green-500/30">
            <Activity color="#10b981" size={16} />
            <Text className="text-green-400 font-bold ml-2">8/10 BUSES ACTIVE</Text>
          </View>
        </View>
      </View>

      <View className="flex-row flex-wrap -mx-3">
        {routes.map((bus) => (
          <View key={bus.id} className="w-full lg:w-1/2 px-3 mb-6">
            <View className="bg-white/5 p-8 rounded-[32px] border border-white/10">
              <View className="flex-row justify-between items-start mb-6">
                <View className="flex-row items-center">
                  <View className="w-14 h-14 bg-blue-600/20 rounded-2xl items-center justify-center mr-4 border border-blue-500/20">
                    <MapPin color="#3b82f6" size={28} />
                  </View>
                  <View>
                    <Text className="text-white font-bold text-xl">{bus.busNo}</Text>
                    <Text className="text-slate-400 text-xs mt-1">Route: {bus.route}</Text>
                  </View>
                </View>
                <View className={`px-4 py-2 rounded-xl ${bus.status === 'On Time' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                  <Text className={`font-bold text-xs ${bus.status === 'On Time' ? 'text-green-400' : 'text-red-400'}`}>{bus.status.toUpperCase()}</Text>
                </View>
              </View>

              <View className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5 mb-6">
                <View className="flex-row justify-between items-center">
                  <Text className="text-slate-500 text-sm">Current Stop</Text>
                  <Text className="text-white font-bold">{bus.currentStop}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-slate-500 text-sm">Capacity</Text>
                  <Text className="text-blue-400 font-bold">{bus.students} / 50 Students</Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 bg-white/10 rounded-full items-center justify-center mr-2"><Text className="text-white text-[10px] font-bold">{bus.driver[0]}</Text></View>
                  <View>
                    <Text className="text-white text-xs font-semibold">{bus.driver}</Text>
                    <Text className="text-slate-500 text-[10px]">{bus.phone}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => Alert.alert('GPS Location', `Locating Bus ${bus.busNo} near ${bus.currentStop}...`)} className="bg-blue-600 px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20">
                  <Text className="text-white font-bold text-xs">View on Map</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
    </ScrollView>
  );
};
