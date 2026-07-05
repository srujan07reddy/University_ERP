import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { AnalyticsView } from '../../components/Dashboard/AnalyticsView';

export const HoDAnalyticsTab = () => {
  const [aiReportOutput, setAiReportOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAISummarize = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiReportOutput(
        '[AI HOD Report — Fall 2026]\n\nDepartment Performance Summary:\n• 3 students flagged below 60% attendance (Auto-alert dispatched)\n• Advanced Algorithms: Avg 87.5% — High performing cohort\n• Distributed Systems: Avg 64% — Recommend supplementary lab sessions\n• Faculty workload balanced at 16h/wk average\n\nRecommendation: Schedule remedial workshop for DS batch before mid-term.'
      );
      setIsGenerating(false);
    }, 1400);
  };

  return (
    <View className="space-y-6">
      <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 space-y-4">
        <Text className="text-white font-bold text-lg">AI At-Risk &amp; Performance Predictor</Text>
        <Text className="text-slate-400 text-xs leading-relaxed">
          Generate dynamic monthly performance reports and identify students who have attendance/grades shortage.
        </Text>
        <TouchableOpacity onPress={handleAISummarize} className="bg-blue-600 p-4 rounded-xl flex-row justify-center items-center gap-2">
          <Sparkles color="white" size={16} />
          <Text className="text-white font-bold text-xs">{isGenerating ? 'Summarizing...' : 'Generate HOD AI Report'}</Text>
        </TouchableOpacity>
        {aiReportOutput ? (
          <View className="bg-white/5 p-4 rounded-xl border border-white/10 mt-4">
            <Text className="text-slate-300 text-xs leading-relaxed">{aiReportOutput}</Text>
          </View>
        ) : null}
      </View>

      <AnalyticsView role="HoD" />
    </View>
  );
};
