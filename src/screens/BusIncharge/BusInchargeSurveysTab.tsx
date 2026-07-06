import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { ClipboardList, Star } from 'lucide-react-native';

export const BusInchargeSurveysTab = () => {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
    <View className="space-y-8">
      <View className="bg-white/5 p-8 rounded-[40px] border border-white/10">
        <Text className="text-white text-3xl font-bold">Commuter Feedback</Text>
        <Text className="text-slate-400 mt-1">Review student satisfaction logs and driver ratings</Text>
      </View>

      <View className="bg-white/5 p-8 rounded-[32px] border border-white/10 space-y-4">
        <Text className="text-white font-bold text-lg">Active Transport Surveys</Text>
        <View className="p-4 bg-white/5 rounded-2xl border border-white/5 flex-row justify-between items-center">
          <View>
            <Text className="text-white font-semibold">Route 12 Satisfaction Survey</Text>
            <Text className="text-slate-400 text-xs">Assessing stop delays near Sector 4 crossing</Text>
          </View>
          <TouchableOpacity onPress={() => Alert.alert('Survey Published', 'Details sent to active Route 12 commuters.')} className="bg-blue-600 px-4 py-2 rounded-xl">
            <Text className="text-white text-xs font-bold">Broadcast Poll</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};
