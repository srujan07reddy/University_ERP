import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Upload } from 'lucide-react-native';

export const StudentPlacementTab = () => {
  const [cvUploaded, setCvUploaded] = useState(false);
  const [atsAnalyzing, setAtsAnalyzing] = useState(false);
  const [atsResult, setAtsResult] = useState('');

  return (
    <View className="space-y-6">
      {/* Student CV Ingestion & ATS Analyzer Widget */}
      <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 space-y-4">
        <Text className="text-white font-bold text-lg">AI Resume Optimizer & ATS Matcher</Text>
        <Text className="text-slate-400 text-xs">
          Upload your CV to run the **STUDENT SKILL SCORER** parser. Measures ATS compatibility and flags missing technical competencies.
        </Text>
        
        <TouchableOpacity 
          onPress={() => {
            setAtsAnalyzing(true);
            setTimeout(() => {
              setCvUploaded(true);
              setAtsAnalyzing(false);
              setAtsResult(`[STUDENT SKILL SCORER - ATS ANALYSIS]\n\n• Score: 84 / 100\n• Identified Skills: React Native, JavaScript, Zustand, TailwindCSS\n• Skill Gaps: Docker, AWS Cloud, DSA (Red-Black Trees)\n• Fitment: Strong fit for Frontend Eng & Cross-Platform Mobile roles.`);
            }, 1200);
          }} 
          className="bg-white/5 border border-dashed border-white/20 p-8 rounded-2xl items-center"
        >
          <Upload color="#94a3b8" size={32} />
          <Text className="text-slate-400 text-xs mt-2">
            {atsAnalyzing ? 'Running AI Parser...' : cvUploaded ? 'Resume_John_Doe.pdf (Ingested)' : 'Drop Resume PDF to check ATS score'}
          </Text>
        </TouchableOpacity>

        {atsResult ? (
          <View className="bg-green-500/10 p-5 rounded-2xl border border-green-500/20">
            <Text className="text-green-400 text-xs font-bold leading-relaxed">{atsResult}</Text>
          </View>
        ) : null}
      </View>

      <Text className="text-white text-2xl font-bold mt-4">Placement Drives</Text>
      {[
        { company: 'Google Inc.', date: 'Oct 30', role: 'Software Engineer Intern', status: 'Registered' },
        { company: 'Microsoft corp.', date: 'Nov 04', role: 'Full Stack Associate', status: 'Resume Screen' }
      ].map((drive, idx) => (
        <View key={idx} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
          <View>
            <Text className="text-white font-bold text-lg">{drive.company}</Text>
            <Text className="text-slate-450 text-xs mt-1">{drive.role} • Date: {drive.date}</Text>
          </View>
          <View className="bg-blue-600/10 px-3 py-1.5 rounded-full border border-blue-500/20">
            <Text className="text-blue-400 text-[10px] font-bold">{drive.status}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
