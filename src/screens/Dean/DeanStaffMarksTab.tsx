import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';

export const DeanStaffMarksTab = () => {
  const [filterSubject, setFilterSubject] = useState('Advanced Algorithms');
  const [filterBatch, setFilterBatch] = useState('3rd Year');
  const [filterSection, setFilterSection] = useState('Section A');
  const [localStudents] = useState([
    { id: 'STU-001', name: 'John Doe', attendance: 82, marks: 88, parent: 'Robert Wilson (parent@university.com)', slowLearner: false, subject: 'Advanced Algorithms', batch: '3rd Year', section: 'Section A' },
    { id: 'STU-002', name: 'Mark Ruffalo', attendance: 72, marks: 54, parent: 'Frank Ruffalo (frank@mail.com)', slowLearner: true, subject: 'Distributed Systems', batch: '3rd Year', section: 'Section B' },
    { id: 'STU-003', name: 'Alice Becker', attendance: 68, marks: 95, parent: 'Sarah Becker (sarah@mail.com)', slowLearner: false, subject: 'Advanced Algorithms', batch: '3rd Year', section: 'Section A' },
    { id: 'STU-004', name: 'Gwen Stacy', attendance: 95, marks: 98, parent: 'George Stacy (george@mail.com)', slowLearner: false, subject: 'Distributed Systems', batch: '3rd Year', section: 'Section B' }
  ]);

  const filteredStudents = localStudents.filter(
    (st) => st.subject === filterSubject && st.batch === filterBatch && st.section === filterSection
  );

  const renderFilterSelectors = () => (
    <View className="bg-white/5 p-6 rounded-3xl border border-white/10 mb-6 space-y-4">
      <Text className="text-white font-bold text-xs">Filter Student Group</Text>
      
      <View>
        <Text className="text-slate-400 text-[9px] uppercase font-bold mb-1.5">Subject</Text>
        <View className="flex-row gap-2">
          {['Advanced Algorithms', 'Distributed Systems'].map((sub) => (
            <TouchableOpacity 
              key={sub} 
              onPress={() => setFilterSubject(sub)}
              className={`px-3 py-1.5 rounded-lg border ${filterSubject === sub ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10'}`}
            >
              <Text className="text-white text-[10px] font-bold">{sub}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="flex-row gap-4">
        <View className="flex-1">
          <Text className="text-slate-400 text-[9px] uppercase font-bold mb-1.5">Batch / Year</Text>
          <View className="flex-row gap-2">
            {['3rd Year', '2nd Year'].map((bat) => (
              <TouchableOpacity 
                key={bat} 
                onPress={() => setFilterBatch(bat)}
                className={`flex-1 py-1.5 rounded-lg border ${filterBatch === bat ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10'}`}
              >
                <Text className="text-white text-center text-[10px] font-bold">{bat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="flex-1">
          <Text className="text-slate-400 text-[9px] uppercase font-bold mb-1.5">Section</Text>
          <View className="flex-row gap-2">
            {['Section A', 'Section B'].map((sec) => (
              <TouchableOpacity 
                key={sec} 
                onPress={() => setFilterSection(sec)}
                className={`flex-1 py-1.5 rounded-lg border ${filterSection === sec ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10'}`}
              >
                <Text className="text-white text-center text-[10px] font-bold">{sec}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
    <View className="space-y-6">
      <View className="flex-row justify-between items-center mb-2">
        <View>
          <Text className="text-white text-2xl font-bold">Internal Gradebook</Text>
          <Text className="text-slate-400 text-xs">Class Avg: 83.7%</Text>
        </View>
      </View>

      {renderFilterSelectors()}

      {filteredStudents.length === 0 ? (
        <View className="bg-white/5 p-8 rounded-[32px] border border-white/10 items-center justify-center">
          <Text className="text-slate-400 text-xs">No students registered in this filter configuration.</Text>
        </View>
      ) : null}

      {filteredStudents.map((st) => (
        <View key={st.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
          <View>
            <Text className="text-white font-bold">{st.name}</Text>
            <Text className="text-slate-400 text-xs mt-1">Grade: {st.marks}% • status: {st.marks >= 50 ? 'Pass' : 'Fail'}</Text>
          </View>
          <TouchableOpacity onPress={() => Alert.alert('Edit Marks', `Edit Grade for ${st.name}`)} className="bg-blue-600/10 px-4 py-2 rounded-xl border border-blue-500/20">
            <Text className="text-blue-400 font-bold text-xs">Edit Grade</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
    </ScrollView>
  );
};
