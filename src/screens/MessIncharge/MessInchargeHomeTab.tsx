import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useStore } from '../../store/useStore';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ChartContainer, chartConfig } from '../../components/Dashboard/ChartContainer';
import { BarChart } from 'react-native-chart-kit';
import { 
  Users, Flame, Trash2, Star, Calendar, MessageSquare 
} from 'lucide-react-native';

export const MessInchargeHomeTab = () => {
  const { messLogs, messReviews, users } = useStore();

  // Calculations
  const hostellersCount = users.filter((u) => u.role === 'Student').length * 10 || 1250; // Mock calculation factor
  const averageRating = messReviews.length 
    ? (messReviews.reduce((sum, r) => sum + r.rating, 0) / messReviews.length).toFixed(1)
    : '4.0';

  const todayLogs = messLogs.filter(l => l.date === '2026-07-04');
  const todayCooked = todayLogs.reduce((sum, l) => sum + l.cookedQty, 0);
  const todayWasted = todayLogs.reduce((sum, l) => sum + l.wastedQty, 0);

  // Chart data
  const chartLabels = messLogs.slice(0, 4).reverse().map(l => `${l.date.split('-')[2]} ${l.mealType}`);
  const cookedData = messLogs.slice(0, 4).reverse().map(l => l.cookedQty);
  const wastedData = messLogs.slice(0, 4).reverse().map(l => l.wastedQty);

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = Math.min(screenWidth - 64, 600);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: cookedData,
        color: (opacity = 1) => `rgba(249, 115, 22, ${opacity})`, // Orange for Cooked
      },
      {
        data: wastedData,
        color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, // Red for Wasted
      }
    ],
    legend: ['Cooked (kg)', 'Wasted (kg)']
  };

  const localChartConfig = {
    ...chartConfig,
    backgroundGradientFrom: "#1e293b",
    backgroundGradientTo: "#0f172a",
    color: (opacity = 1) => `rgba(249, 115, 22, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  return (
    <View className="space-y-8">
      {/* Welcome Banner */}
      <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 flex-row justify-between items-center">
        <View>
          <Text className="text-white text-3xl font-bold">Mess Analytics</Text>
          <Text className="text-slate-400 mt-1">Track student strength, meal metrics, and waste optimization</Text>
        </View>
        <View className="bg-orange-500/20 px-4 py-2 rounded-2xl flex-row items-center border border-orange-500/30">
          <Calendar color="#f97316" size={16} />
          <Text className="text-orange-400 font-bold ml-2">DINING HALL ACTIVE</Text>
        </View>
      </View>

      {/* Stats Cards Row */}
      <View className="flex-row flex-wrap -mx-2">
        <StatCard title="Subscribed Hostellers" value={hostellersCount} icon={Users} trend="Active today" color="#3b82f6" />
        <StatCard title="Average Meal Rating" value={`${averageRating} / 5`} icon={Star} trend="From reviews" color="#eab308" />
        <StatCard title="Today Prepared (kg)" value={todayCooked || 370} icon={Flame} trend="Breakfast & Lunch" color="#f97316" />
        <StatCard title="Today Wasted (kg)" value={todayWasted || 30} icon={Trash2} trend="Target < 5%" color="#ef4444" />
      </View>

      {/* Main Content Layout */}
      <View className="flex-row flex-wrap -mx-3">
        {/* Left Side: Chart */}
        <View className="w-full lg:w-2/3 px-3 mb-6">
          <View className="bg-white/5 p-6 rounded-[32px] border border-white/10">
            <Text className="text-white font-bold text-xl mb-4">Meal Prep vs Waste History</Text>
            {chartLabels.length > 0 ? (
              <BarChart
                data={data}
                width={chartWidth}
                height={280}
                yAxisLabel=""
                yAxisSuffix=" kg"
                chartConfig={localChartConfig}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            ) : (
              <Text className="text-slate-400">No logs logged yet.</Text>
            )}
          </View>
        </View>

        {/* Right Side: Quick Feedback Feed */}
        <View className="w-full lg:w-1/3 px-3 mb-6">
          <View className="bg-white/5 p-6 rounded-[32px] border border-white/10 h-full">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white font-bold text-xl">Recent Feedback</Text>
              <MessageSquare color="#f97316" size={20} />
            </View>

            <View className="space-y-4">
              {messReviews.slice(0, 3).map((review) => (
                <View key={review.id} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-white font-semibold text-sm">{review.studentName}</Text>
                    <View className="bg-yellow-500/10 px-2 py-0.5 rounded-full flex-row items-center border border-yellow-500/20">
                      <Star color="#eab308" size={10} fill="#eab308" />
                      <Text className="text-yellow-400 text-[10px] font-bold ml-1">{review.rating}</Text>
                    </View>
                  </View>
                  <Text className="text-slate-400 text-xs italic">"{review.comment}"</Text>
                  <Text className="text-slate-500 text-[10px] mt-2">{review.date} • {review.mealType}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MessInchargeHomeTab;
