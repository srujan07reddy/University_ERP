import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { useStore } from '../../store/useStore';

export const HoDApprovalsTab = () => {
  const { leaveRequests, updateLeaveStatus } = useStore();

  const handleApproveLeave = (id: string) => {
    updateLeaveStatus(id, 'Approved');
    Alert.alert('Leave Approved', 'Faculty request status updated successfully.');
  };

  const handleRejectLeave = (id: string) => {
    updateLeaveStatus(id, 'Rejected');
    Alert.alert('Leave Rejected', 'Faculty request status updated.');
  };

  const pendingLeaves = leaveRequests.filter(r => r.status === 'Pending');

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
    <View className="space-y-6">
      <Text className="text-white text-2xl font-bold mb-2">Central Approval Center</Text>

      {pendingLeaves.length === 0 ? (
        <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 items-center justify-center">
          <CheckCircle color="#10b981" size={40} />
          <Text className="text-white font-bold text-lg mt-4">Zero Pending Approvals</Text>
          <Text className="text-slate-500 text-xs mt-2">All leave requests and lock approvals are fully cleared.</Text>
        </View>
      ) : null}

      {pendingLeaves.map((req) => (
        <View key={req.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-white font-bold text-lg">{req.senderName}</Text>
              <Text className="text-slate-400 text-xs mt-1">Requesting leave on {req.date}</Text>
              <Text className="text-slate-300 text-xs font-medium mt-3 italic">&quot; {req.reason} &quot;</Text>
            </View>
          </View>
          <View className="flex-row gap-4 mt-6">
            <TouchableOpacity onPress={() => handleApproveLeave(req.id)} className="flex-1 bg-green-600 p-3.5 rounded-xl items-center">
              <Text className="text-white font-bold text-xs">APPROVE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRejectLeave(req.id)} className="flex-1 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl items-center">
              <Text className="text-red-400 font-bold text-xs">REJECT</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Full approvals portal below */}
      <ApprovalsPortal />
    </View>
    </ScrollView>
  );
};
