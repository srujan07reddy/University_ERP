import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert, ScrollView } from 'react-native';
import { Plus, Trash2 } from 'lucide-react-native';
import { useStore } from '../../store/useStore';

const INITIAL_ALLOCATIONS = [
  { subject: 'Advanced Algorithms', assignedFaculty: 'Dr. Sarah Smith',      class: '3rd Year CSE-A' },
  { subject: 'Distributed Systems',  assignedFaculty: 'Dr. Gregory House',   class: '3rd Year CSE-B' },
  { subject: 'Data Structures',      assignedFaculty: 'Dr. Sarah Wilson',     class: '2nd Year CSE-A' },
];

export const HoDSubjectAllocTab = () => {
  const { users } = useStore();
  const [subjectAllocations, setSubjectAllocations] = useState(INITIAL_ALLOCATIONS);
  const [editAllocModal, setEditAllocModal] = useState(false);
  const [newAllocForm, setNewAllocForm] = useState({ subject: '', faculty: '', class: '' });

  const handleAllocateSubject = () => {
    if (!newAllocForm.subject || !newAllocForm.faculty) return;
    const targetFaculty = users.find(u => u.name.toLowerCase().includes(newAllocForm.faculty.toLowerCase()) && u.role === 'Faculty');
    setSubjectAllocations(prev => [...prev, {
      subject: newAllocForm.subject,
      assignedFaculty: targetFaculty?.name || newAllocForm.faculty,
      class: newAllocForm.class,
    }]);
    setEditAllocModal(false);
    setNewAllocForm({ subject: '', faculty: '', class: '' });
    Alert.alert('Success', 'Faculty allocated. Mapped to global database.');
  };

  return (
    <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} keyboardShouldPersistTaps="handled">
    <View className="space-y-6">
      <View className="flex-row justify-between items-center mb-2">
        <View>
          <Text className="text-white text-2xl font-bold">Subject Allocations</Text>
          <Text className="text-slate-400 text-xs">Assign subjects, mentors, and class coordinators</Text>
        </View>
        <TouchableOpacity onPress={() => setEditAllocModal(true)} className="bg-blue-600 p-3 rounded-xl">
          <Plus color="white" size={16} />
        </TouchableOpacity>
      </View>

      {subjectAllocations.map((alloc, idx) => (
        <View key={idx} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
          <View>
            <Text className="text-white font-bold text-lg">{alloc.subject}</Text>
            <Text className="text-slate-400 text-xs mt-1">Class Coordinator: {alloc.class}</Text>
            <Text className="text-blue-400 text-xs mt-1 font-bold">Faculty: {alloc.assignedFaculty}</Text>
          </View>
          <TouchableOpacity
            onPress={() => { setSubjectAllocations(prev => prev.filter((_, i) => i !== idx)); Alert.alert('Removed', 'Allocation deleted.'); }}
            className="bg-red-500/10 p-3 rounded-xl border border-red-500/20"
          >
            <Trash2 color="#ef4444" size={16} />
          </TouchableOpacity>
        </View>
      ))}

      {/* Allocate Subject Modal */}
      <Modal animationType="slide" transparent visible={editAllocModal} onRequestClose={() => setEditAllocModal(false)}>
        <View className="flex-1 w-full md:w-auto justify-center items-center bg-black/60 p-4">
          <View className="bg-[#1E293B] w-full max-w-lg p-8 rounded-[32px] border border-white/10">
            <Text className="text-white text-2xl font-bold mb-4">Allocate Subject</Text>
            <View className="space-y-4">
              <TextInput placeholder="Subject Name" placeholderTextColor="#64748b" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={newAllocForm.subject} onChangeText={(t) => setNewAllocForm({ ...newAllocForm, subject: t })} />
              <TextInput placeholder="Faculty Name" placeholderTextColor="#64748b" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={newAllocForm.faculty} onChangeText={(t) => setNewAllocForm({ ...newAllocForm, faculty: t })} />
              <TextInput placeholder="Class Section (e.g. 3rd Year CSE-A)" placeholderTextColor="#64748b" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={newAllocForm.class} onChangeText={(t) => setNewAllocForm({ ...newAllocForm, class: t })} />
              <TouchableOpacity onPress={handleAllocateSubject} className="bg-blue-600 p-4 rounded-xl items-center mt-4">
                <Text className="text-white font-bold">Assign Faculty</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditAllocModal(false)} className="p-2 items-center">
                <Text className="text-slate-400">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </ScrollView>
  );
};
