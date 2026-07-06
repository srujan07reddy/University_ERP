import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Layers, Database, Wallet, MapPin, Search, Compass, BookOpenCheck
} from 'lucide-react-native';

export const StudentAcademicsTab = () => {
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
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
    (
          <View className="space-y-6">
            <Text className="text-white text-2xl font-bold mb-2">Registered Courses</Text>
            {[
              { code: 'CS301', name: 'Software Architecture', credits: 4, faculty: 'Dr. Gregory House' },
              { code: 'CS302', name: 'Database Management Systems', credits: 4, faculty: 'Dr. Sarah Wilson' },
              { code: 'CS305', name: 'Advanced Algorithms', credits: 3, faculty: 'Dr. Sarah Smith' }
            ].map((subject, idx) => (
              <View key={idx} className="bg-white/5 p-6 rounded-[32px] border border-white/10">
                <View className="flex-row justify-between items-center mb-3">
                  <View>
                    <Text className="text-white font-bold text-lg">{subject.name}</Text>
                    <Text className="text-slate-400 text-xs">{subject.code} • Credits: {subject.credits}</Text>
                  </View>
                </View>
                <View className="flex-row justify-between items-center border-t border-white/5 pt-3">
                  <Text className="text-slate-350 text-xs">
                    Faculty: {subject.faculty}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => setSelectedFaculty({ name: subject.faculty, ...facultyProfiles[subject.faculty] })} 
                    className="bg-blue-600/10 px-3 py-1 rounded-lg border border-blue-500/20"
                  >
                    <Text className="text-blue-400 font-bold text-[10px]">View Profile & Research</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )
    </ScrollView>
  );
};
