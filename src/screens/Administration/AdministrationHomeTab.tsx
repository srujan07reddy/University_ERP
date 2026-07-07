import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StatCard } from '../../components/Dashboard/StatCard';
import { useStore } from '../../store/useStore';
import { Users, DollarSign, GraduationCap, Shield, Menu, Bell, LogOut } from 'lucide-react-native';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';

export const AdministrationHomeTab = ({ setMenuVisible }: { setMenuVisible: (v: boolean) => void }) => {
  const { user, setUser } = useStore();

  return (
    <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} keyboardShouldPersistTaps="handled">
      <>
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => setMenuVisible(true)}
              className="bg-white/5 p-3 rounded-2xl border border-white/10 mr-4 md:hidden"
            >
              <Menu color="white" size={20} />
            </TouchableOpacity>
            <View>
              <Text className="text-slate-400 text-sm font-medium">Institutional Governance</Text>
              <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>Administration</Text>
            </View>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <Bell color="#94a3b8" size={20} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setUser(null)}
              className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20"
            >
              <LogOut color="#ef4444" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Global KPIs */}
        <View className="flex-col md:flex-row flex-wrap gap-4 mb-8">
          <View className="w-full md:w-[48%] xl:w-[23%]">
            <StatCard title="Total Enrollment" value="18,450" icon={Users} trend="+8.2%" color="#3b82f6" />
          </View>
          <View className="w-full md:w-[48%] xl:w-[23%]">
            <StatCard title="Revenue Target" value="94%" icon={DollarSign} trend="+2.4%" color="#10b981" />
          </View>
          <View className="w-full md:w-[48%] xl:w-[23%]">
            <StatCard title="Graduation Rate" value="92.4%" icon={GraduationCap} trend="+1.2%" color="#8b5cf6" />
          </View>
          <View className="w-full md:w-[48%] xl:w-[23%]">
            <StatCard title="Compliance" value="A++" icon={Shield} trend="NAAC" color="#f59e0b" />
          </View>
        </View>

        <ApprovalsPortal />
      </>
    </ScrollView>
  );
};
