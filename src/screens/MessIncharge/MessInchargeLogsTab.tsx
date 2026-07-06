import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useStore } from '../../store/useStore';
import { ClipboardList, Plus, Trash2, Calendar, Star } from 'lucide-react-native';

export const MessInchargeLogsTab = () => {
  const { messLogs, addMessLog } = useStore();

  const [date, setDate] = useState('2026-07-04');
  const [mealType, setMealType] = useState<'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner'>('Lunch');
  const [cookedQty, setCookedQty] = useState('');
  const [wastedQty, setWastedQty] = useState('');
  const [studentsFed, setStudentsFed] = useState('');
  const [rating, setRating] = useState('4');

  const handleAddLog = () => {
    if (!cookedQty || !wastedQty || !studentsFed) {
      Alert.alert('Error', 'Please fill in all quantities.');
      return;
    }

    addMessLog({
      date,
      mealType,
      cookedQty: parseFloat(cookedQty),
      wastedQty: parseFloat(wastedQty),
      studentsFed: parseInt(studentsFed),
      rating: parseFloat(rating),
    });

    Alert.alert('Success', 'Daily mess log added successfully.');
    // Reset state
    setCookedQty('');
    setWastedQty('');
    setStudentsFed('');
    setRating('4');
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
    <View className="space-y-8">
      {/* Page Title */}
      <View className="flex-row justify-between items-center bg-white/5 p-8 rounded-[40px] border border-white/10">
        <View>
          <Text className="text-white text-3xl font-bold">Meal & Waste Log Manager</Text>
          <Text className="text-slate-400 mt-1">Record quantities cooked vs. wasted per meal</Text>
        </View>
      </View>

      <View className="flex-row flex-wrap -mx-3">
        {/* Left Side: Form */}
        <View className="w-full lg:w-1/2 px-3 mb-6">
          <View className="bg-white/5 p-8 rounded-[32px] border border-white/10 space-y-6">
            <Text className="text-white font-bold text-xl mb-4">Record New Log</Text>

            {/* Date Input */}
            <View>
              <Text className="text-slate-400 font-bold text-xs mb-2">Date (YYYY-MM-DD)</Text>
              <TextInput
                placeholder="2026-07-04"
                placeholderTextColor="#475569"
                value={date}
                onChangeText={setDate}
                className="bg-white/5 p-4 rounded-2xl border border-white/10 text-white font-medium"
              />
            </View>

            {/* Meal Type Buttons */}
            <View>
              <Text className="text-slate-400 font-bold text-xs mb-2">Meal Type</Text>
              <View className="flex-row gap-2">
                {(['Breakfast', 'Lunch', 'Snacks', 'Dinner'] as const).map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setMealType(type)}
                    className={`flex-1 py-3 rounded-xl items-center border ${
                      mealType === type 
                        ? 'bg-orange-600 border-orange-500' 
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <Text className={`text-xs font-bold ${mealType === type ? 'text-white' : 'text-slate-400'}`}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Cooked & Wasted Inputs */}
            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="text-slate-400 font-bold text-xs mb-2">Cooked Qty (kg)</Text>
                <TextInput
                  placeholder="e.g. 250"
                  placeholderTextColor="#475569"
                  keyboardType="numeric"
                  value={cookedQty}
                  onChangeText={setCookedQty}
                  className="bg-white/5 p-4 rounded-2xl border border-white/10 text-white font-medium"
                />
              </View>
              <View className="flex-1">
                <Text className="text-slate-400 font-bold text-xs mb-2">Wasted Qty (kg)</Text>
                <TextInput
                  placeholder="e.g. 20"
                  placeholderTextColor="#475569"
                  keyboardType="numeric"
                  value={wastedQty}
                  onChangeText={setWastedQty}
                  className="bg-white/5 p-4 rounded-2xl border border-white/10 text-white font-medium"
                />
              </View>
            </View>

            {/* Students Fed & Rating */}
            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="text-slate-400 font-bold text-xs mb-2">Students Fed</Text>
                <TextInput
                  placeholder="e.g. 750"
                  placeholderTextColor="#475569"
                  keyboardType="numeric"
                  value={studentsFed}
                  onChangeText={setStudentsFed}
                  className="bg-white/5 p-4 rounded-2xl border border-white/10 text-white font-medium"
                />
              </View>
              <View className="flex-1">
                <Text className="text-slate-400 font-bold text-xs mb-2">Internal Rating (1-5)</Text>
                <TextInput
                  placeholder="e.g. 4"
                  placeholderTextColor="#475569"
                  keyboardType="numeric"
                  value={rating}
                  onChangeText={setRating}
                  className="bg-white/5 p-4 rounded-2xl border border-white/10 text-white font-medium"
                />
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              onPress={handleAddLog}
              className="bg-orange-600 p-5 rounded-2xl flex-row items-center justify-center shadow-lg shadow-orange-950/40"
            >
              <Plus color="white" size={20} />
              <Text className="text-white font-bold ml-2">Add Log Record</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Right Side: Table / List */}
        <View className="w-full lg:w-1/2 px-3 mb-6">
          <View className="bg-white/5 p-8 rounded-[32px] border border-white/10 space-y-6">
            <Text className="text-white font-bold text-xl">Historical Logs</Text>
            <View className="space-y-4">
              {messLogs.map((log) => (
                <View key={log.id} className="bg-white/5 p-5 rounded-2xl border border-white/5 flex-row justify-between items-center">
                  <View>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-white font-bold">{log.mealType}</Text>
                      <Text className="text-slate-500 text-xs">({log.date})</Text>
                    </View>
                    <View className="flex-row gap-4 mt-2">
                      <Text className="text-slate-400 text-xs">Cooked: <Text className="text-orange-400 font-semibold">{log.cookedQty}kg</Text></Text>
                      <Text className="text-slate-400 text-xs">Wasted: <Text className="text-red-400 font-semibold">{log.wastedQty}kg</Text></Text>
                      <Text className="text-slate-400 text-xs">Fed: <Text className="text-blue-400 font-semibold">{log.studentsFed}</Text></Text>
                    </View>
                  </View>
                  <View className="bg-yellow-500/10 px-3 py-1.5 rounded-xl flex-row items-center border border-yellow-500/20">
                    <Star color="#eab308" size={14} fill="#eab308" />
                    <Text className="text-yellow-400 font-bold ml-1 text-xs">{log.rating}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default MessInchargeLogsTab;
