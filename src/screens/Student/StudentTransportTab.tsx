import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';
import { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';
import { 
  Users, BookOpen, Clock, Bell, ChevronRight, AlertCircle, LogOut, Menu, X, Home, Settings, User, 
  MessageSquare, BarChart3, ClipboardList, Calendar, Award, FileText, CheckCircle, Upload, Plus, Edit, 
  Trash2, Send, Download, Sparkles, Shield, RefreshCw, Layers, Database, Wallet, MapPin, Search, Compass, BookOpenCheck
} from 'lucide-react-native';

export const StudentTransportTab = () => {
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
    <GlobalScrollView>
    (
          <View className="space-y-6">
            <Text className="text-white text-2xl font-bold mb-2">Transport route</Text>
            <View className="bg-white/5 p-6 rounded-[32px] border border-white/10 space-y-4">
              <View className="flex-row justify-between border-b border-white/5 pb-3">
                <Text className="text-slate-400 text-xs">Bus Route</Text>
                <Text className="text-white font-bold text-xs">Route 12 (Central Square)</Text>
              </View>
              <View className="flex-row justify-between border-b border-white/5 pb-3">
                <Text className="text-slate-400 text-xs">Driver Contact</Text>
                <Text className="text-white font-bold text-xs">+91 99887 76655</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-slate-400 text-xs">Boarding Point</Text>
                <Text className="text-blue-400 font-bold text-xs">Sector 4 Crossing</Text>
              </View>
            </View>
          </View>
        )
    </GlobalScrollView>
  );
};
