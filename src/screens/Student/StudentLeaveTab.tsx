import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Layers, Database, Wallet, MapPin, Search, Compass, BookOpenCheck
} from 'lucide-react-native';

export const StudentLeaveTab = () => {
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
    <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} keyboardShouldPersistTaps="handled">
    (
          <View className="space-y-6">
            <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 space-y-4">
              <Text className="text-white font-bold text-lg">Apply for Leave / OD</Text>
              <TextInput 
                placeholder="Reason for leave/OD request..." 
                placeholderTextColor="#64748b" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs h-12"
              />
              <TouchableOpacity onPress={() => Alert.alert('Success', 'Medical Leave logged. Pending HOD review.')} className="bg-blue-600 p-4 rounded-xl items-center">
                <Text className="text-white font-bold text-xs">Submit Application</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
    </ScrollView>
  );
};
