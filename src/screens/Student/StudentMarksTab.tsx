import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Layers, Database, Wallet, MapPin, Search, Compass, BookOpenCheck
} from 'lucide-react-native';

export const StudentMarksTab = () => {
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
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 items-center justify-center">
              <Text className="text-slate-400 text-sm font-medium">Current CGPA</Text>
              <Text className="text-white text-5xl font-bold mt-2">{studentData?.cgpa}</Text>
            </View>

            <Text className="text-white font-bold text-lg mt-2">Internal Assessment Transcripts</Text>
            {[
              { exam: 'Mid-term Assessment 1', score: '92/100', status: 'A+' },
              { exam: 'Internal Lab Evaluation', score: '48/50', status: 'O' },
              { exam: 'Model Theory Examination', score: '88/100', status: 'A' }
            ].map((row, idx) => (
              <View key={idx} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
                <View>
                  <Text className="text-white font-bold">{row.exam}</Text>
                  <Text className="text-slate-450 text-xs mt-1">Score: {row.score}</Text>
                </View>
                <Text className="text-green-400 font-bold text-lg">{row.status}</Text>
              </View>
            ))}
          </View>
        )
  );
};
