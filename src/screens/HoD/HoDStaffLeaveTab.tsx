import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

export const HoDStaffLeaveTab = () => {
  const [myLeaveReason, setMyLeaveReason] = useState('');
  const [myLeavesList, setMyLeavesList] = useState<any[]>([
    { id: '1', reason: 'Conference Attendance', date: '2026-06-12', status: 'Approved' }
  ]);

  const handleApplyMyLeave = () => {
    if (!myLeaveReason) return;
    setMyLeavesList([
      ...myLeavesList,
      { id: Math.random().toString(), reason: myLeaveReason, date: new Date().toLocaleDateString(), status: 'Pending' }
    ]);
    setMyLeaveReason('');
    Alert.alert('Success', 'Leave applied. Awaiting review.');
  };

  return (
    <View className="space-y-6">
      <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 space-y-4">
        <Text className="text-white font-bold text-lg">Apply for Personal Leave</Text>
        <TextInput 
          placeholder="Reason for leave..." 
          placeholderTextColor="#64748b" 
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs h-12"
          value={myLeaveReason}
          onChangeText={setMyLeaveReason}
        />
        <TouchableOpacity onPress={handleApplyMyLeave} className="bg-blue-600 p-4 rounded-xl items-center">
          <Text className="text-white font-bold text-xs">Submit Request</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-white font-bold text-lg mt-2">Personal Leave History</Text>
      {myLeavesList.map((l, i) => (
        <View key={i} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
          <View>
            <Text className="text-white font-bold">{l.reason}</Text>
            <Text className="text-slate-400 text-xs mt-1">Submitted: {l.date}</Text>
          </View>
          <View className={`px-3 py-1 rounded-full border ${l.status === 'Approved' ? 'bg-green-500/10 border-green-500/20' : 'bg-orange-500/10 border-orange-500/20'}`}>
            <Text className={`text-[10px] font-bold ${l.status === 'Approved' ? 'text-green-400' : 'text-orange-400'}`}>{l.status.toUpperCase()}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
