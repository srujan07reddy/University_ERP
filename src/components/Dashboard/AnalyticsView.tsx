import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface AnalyticsViewProps {
  role: string;
  data?: any;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ role, data }) => {
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
      <View>
        <Text className="text-white text-3xl font-bold mb-2">{role} Analytics</Text>
        <Text className="text-slate-400">Comprehensive performance metrics and insights</Text>
      </View>

      {/* Metric Grid */}
      <View className="flex-row flex-wrap justify-between">
        {[
          { label: 'Overall Performance', value: '94%', icon: TrendingUp, color: '#3b82f6' },
          { label: 'Growth Index', value: '+12.5%', icon: Activity, color: '#10b981' },
          { label: 'Efficiency', value: '88%', icon: PieChart, color: '#f59e0b' },
          { label: 'Engagement', value: '4.8/5', icon: BarChart3, color: '#8b5cf6' },
        ].map((metric, i) => (
          <View key={i} className="w-[48%] bg-white/5 p-6 rounded-[32px] border border-white/10 mb-4">
            <View style={{ backgroundColor: `${metric.color}20` }} className="w-12 h-12 rounded-2xl items-center justify-center mb-4">
              <metric.icon color={metric.color} size={24} />
            </View>
            <Text className="text-slate-400 text-xs mb-1 font-medium">{metric.label}</Text>
            <Text className="text-white text-2xl font-bold">{metric.value}</Text>
          </View>
        ))}
      </View>

      {/* Visual Chart Placeholder */}
      <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 items-center justify-center min-h-[300px]">
        <BarChart3 color="#3b82f6" size={48} />
        <Text className="text-white font-bold mt-4 text-xl">Interactive Data Visualizer</Text>
        <Text className="text-slate-500 text-center mt-2 px-6">
          Real-time {role.toLowerCase()} performance trends will be visualized here once the live data stream is connected.
        </Text>
        
        {/* Mock Chart Bars */}
        <View className="flex-row items-end justify-center h-32 gap-3 mt-8 w-full px-4">
          {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
            <View 
              key={i} 
              style={{ height: `${h}%`, backgroundColor: i === 3 ? '#3b82f6' : '#ffffff10' }} 
              className="flex-1 rounded-t-xl" 
            />
          ))}
        </View>
      </View>

      {/* Detailed Insights */}
      <View className="bg-[#1E293B]/50 p-8 rounded-[40px] border border-white/5">
        <Text className="text-white font-bold text-lg mb-6">Strategic Insights</Text>
        <View className="space-y-4">
          {[
            'Retention rates have stabilized across all departments.',
            'Efficiency benchmarks surpassed the Q3 goal by 4%.',
            'Resource allocation is currently optimized for peak performance.',
            'Institutional health index remains in the top 5th percentile.'
          ].map((insight, i) => (
            <View key={i} className="flex-row items-start">
              <View className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3" />
              <Text className="text-slate-300 text-sm flex-1 leading-relaxed">{insight}</Text>
            </View>
          ))}
        </View>
      </View>
      </View>
    </ScrollView>
  );
};
