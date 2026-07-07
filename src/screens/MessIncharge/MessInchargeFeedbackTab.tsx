import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useStore } from '../../store/useStore';
import { MessageSquare, Star, Filter } from 'lucide-react-native';

export const MessInchargeFeedbackTab = () => {
  const { messReviews } = useStore();
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'All'>('All');

  const filteredReviews = selectedRatingFilter === 'All'
    ? messReviews
    : messReviews.filter(r => Math.floor(r.rating) === selectedRatingFilter);

  return (
    <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} keyboardShouldPersistTaps="handled">
    <View className="space-y-8">
      {/* Title */}
      <View className="flex-row justify-between items-center bg-white/5 p-8 rounded-[40px] border border-white/10">
        <View>
          <Text className="text-white text-3xl font-bold">Feedback & Reviews</Text>
          <Text className="text-slate-400 mt-1">Real-time student feedback streams and ratings</Text>
        </View>
      </View>

      {/* Filters */}
      <View className="bg-white/5 p-6 rounded-[28px] border border-white/10 flex-row flex-wrap items-center gap-4 justify-between">
        <View className="flex-row items-center gap-2">
          <Filter color="#f97316" size={16} />
          <Text className="text-slate-300 font-semibold text-sm">Filter by Rating:</Text>
        </View>
        <View className="flex-row gap-2 flex-wrap">
          {['All', 5, 4, 3, 2, 1].map((filter) => (
            <TouchableOpacity
              key={filter.toString()}
              onPress={() => setSelectedRatingFilter(filter as any)}
              className={`px-4 py-2.5 rounded-xl border flex-row items-center gap-1 ${
                selectedRatingFilter === filter
                  ? 'bg-orange-600 border-orange-500'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {typeof filter === 'number' && <Star color={selectedRatingFilter === filter ? 'white' : '#eab308'} size={12} fill={selectedRatingFilter === filter ? 'white' : '#eab308'} />}
              <Text className={`text-xs font-bold ${selectedRatingFilter === filter ? 'text-white' : 'text-slate-400'}`}>
                {filter === 'All' ? 'Show All' : `${filter} Star${typeof filter === 'number' && filter > 1 ? 's' : ''}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Review Feed */}
      <View className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <View key={review.id} className="bg-white/5 p-8 rounded-[32px] border border-white/10 flex-row gap-6 items-start">
              {/* User Avatar Circle */}
              <View className="w-14 h-14 bg-orange-600/20 rounded-2xl items-center justify-center border border-orange-500/20">
                <MessageSquare color="#f97316" size={24} />
              </View>

              {/* Feed Card Content */}
              <View className="flex-1 w-full md:w-auto space-y-2">
                <View className="flex-row justify-between items-start flex-wrap gap-2">
                  <View>
                    <Text className="text-white font-bold text-lg">{review.studentName}</Text>
                    <Text className="text-slate-500 text-xs mt-0.5">{review.date} • {review.mealType}</Text>
                  </View>
                  {/* Stars Badge */}
                  <View className="bg-yellow-500/10 px-3 py-1 rounded-full flex-row items-center border border-yellow-500/20">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        color={i < review.rating ? '#eab308' : '#334155'}
                        fill={i < review.rating ? '#eab308' : '#334155'}
                        size={12}
                      />
                    ))}
                    <Text className="text-yellow-400 font-bold ml-2 text-xs">{review.rating}</Text>
                  </View>
                </View>
                
                <Text className="text-slate-300 text-sm leading-relaxed mt-2 italic">
                  "{review.comment}"
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View className="bg-white/5 p-12 rounded-[32px] border border-white/10 items-center justify-center">
            <Text className="text-slate-400 font-medium">No reviews match the selected filter.</Text>
          </View>
        )}
      </View>
    </View>
    </ScrollView>
  );
};

export default MessInchargeFeedbackTab;
