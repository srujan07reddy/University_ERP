import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Upload } from 'lucide-react-native';

export const StudentAssignmentsTab = () => {
  const [pdfSubmitted, setPdfSubmitted] = useState(false);

  return (
    <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} keyboardShouldPersistTaps="handled">
    <View className="space-y-6">
      <View className="bg-white/5 p-8 rounded-[40px] border border-white/10">
        <Text className="text-white font-bold text-lg mb-2">Upload Assignment PDF</Text>
        <Text className="text-slate-400 text-xs mb-6">Drag and drop or select your assignment file to submit.</Text>
        
        <TouchableOpacity onPress={() => {
          setPdfSubmitted(true);
          Alert.alert('PDF Submitted', 'Assignment_CS301_JohnDoe.pdf uploaded successfully!');
        }} className="bg-white/5 border border-dashed border-white/20 p-8 rounded-2xl items-center mb-6">
          <Upload color="#94a3b8" size={32} />
          <Text className="text-slate-400 text-xs mt-2">{pdfSubmitted ? 'Assignment_CS301_JohnDoe.pdf (1.2MB)' : 'Click to Upload PDF File'}</Text>
        </TouchableOpacity>

        {pdfSubmitted && (
          <View className="bg-green-500/10 p-4 rounded-xl border border-green-500/20">
            <Text className="text-green-400 text-xs font-bold text-center">Submission Status: Logged On-Time</Text>
          </View>
        )}
      </View>
    </View>
    </ScrollView>
  );
};
