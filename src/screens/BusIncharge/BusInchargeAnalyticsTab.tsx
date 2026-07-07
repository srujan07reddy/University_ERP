import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StatCard } from '../../components/Dashboard/StatCard';
import { TrendingUp, Users, Clock, AlertCircle } from 'lucide-react-native';
import { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';

export const BusInchargeAnalyticsTab = () => {
  return (
    <GlobalScrollView>
    <View className="space-y-8">
      <View className="bg-white/5 p-8 rounded-[40px] border border-white/10">
        <Text className="text-white text-3xl font-bold">Transport Analytics</Text>
        <Text className="text-slate-400 mt-1">Fleet telemetry and passenger metrics</Text>
      </View>

      <View className="flex-col md:flex-row gap-4 mb-6">
        <StatCard title="Total Commuters" value="482" icon={Users} trend="+12" color="#3b82f6" />
        <StatCard title="Buses on Schedule" value="90%" icon={Clock} trend="Optimal" color="#10b981" />
      </View>

      <View className="flex-col md:flex-row gap-4 mb-8">
        <StatCard title="Average Fuel efficiency" value="4.8 km/l" icon={TrendingUp} trend="+0.2%" color="#8b5cf6" />
        <StatCard title="Maintenance Alerts" value="1" icon={AlertCircle} color="#f59e0b" />
      </View>
    </View>
    </GlobalScrollView>
  );
};
