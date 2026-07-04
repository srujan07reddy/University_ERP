import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Layers, Database, Wallet, MapPin, Search, Compass, BookOpenCheck
} from 'lucide-react-native';

export const StudentProfileTab = () => {
  const { user, businessRules } = useStore();
  const studentData = user?.universityData?.studentData;
  const [personalDetails, setPersonalDetails] = useState({ phone: '+1 234 567 890', email: user?.email || 'student@university.com', address: '123 Baker Street, London' });
  const [pdfSubmitted, setPdfSubmitted] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false);
  const [atsAnalyzing, setAtsAnalyzing] = useState(false);
  const [atsResult, setAtsResult] = useState('');
  const [grievanceText, setGrievanceText] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);

  const facultyProfiles: Record<string, { qualifications: string, experience: string, rating: string, papers: string[], patents: string[] }> = {
    'Dr. Sarah Smith': {
      qualifications: 'Ph.D. in Computer Science (Artificial Intelligence)',
      experience: '12 Years',
      rating: '4.8 / 5.0',
      papers: [
        'Federated Learning Frameworks in Private Cloud ERPs - IEEE Transactions, 2026',
        'Scalable Multi-Tenant Architectures in Higher Ed SaaS - Springer, 2025'
      ],
      patents: [
        'System and Method for Encrypted Distributed Database Sharding (Patent No: 18/402,129)'
      ]
    }
  };

  const handlePayFees = () => {
    Alert.alert('Payment Portal', 'Online transaction successful! Receipt downloaded.', [
      { text: 'OK', onPress: () => Alert.alert('Downloaded', 'Receipt_FEES_OCT2026.pdf saved to device.') }
    ]);
  };

  return (
    (
          <View className="space-y-6">
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 items-center">
              <View className="w-24 h-24 bg-blue-600 rounded-full items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                <User color="white" size={48} />
              </View>
              <Text className="text-white text-2xl font-bold">{user?.name}</Text>
              <Text className="text-slate-400 text-sm">Major: {studentData?.major} • Sem: {studentData?.currentSemester}</Text>
              
              <View className="flex-row gap-2 mt-6">
                <TouchableOpacity onPress={() => setEditProfileModal(true)} className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
                  <Text className="text-slate-300 font-bold text-xs">Edit Details</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Downloaded', 'Student_ID_JohnDoe.pdf saved.')} className="bg-blue-600 px-5 py-3 rounded-2xl flex-row items-center gap-2">
                  <Download color="white" size={14} />
                  <Text className="text-white font-bold text-xs">ID Card</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 space-y-4">
              <Text className="text-white font-bold text-lg mb-2">Student Demographics</Text>
              <View className="flex-row justify-between border-b border-white/5 py-3">
                <Text className="text-slate-400 text-xs">Phone</Text>
                <Text className="text-white font-bold text-xs">{personalDetails.phone}</Text>
              </View>
              <View className="flex-row justify-between border-b border-white/5 py-3">
                <Text className="text-slate-400 text-xs">Email</Text>
                <Text className="text-white font-bold text-xs">{personalDetails.email}</Text>
              </View>
              <View className="flex-row justify-between border-b border-white/5 py-3">
                <Text className="text-slate-400 text-xs">Address</Text>
                <Text className="text-white font-bold text-xs">{personalDetails.address}</Text>
              </View>
              <View className="flex-row justify-between py-3">
                <Text className="text-slate-400 text-xs">Emergency Contact</Text>
                <Text className="text-slate-300 text-xs font-bold">Robert Wilson (Parent)</Text>
              </View>
            </View>
          </View>
        )
  );
};
