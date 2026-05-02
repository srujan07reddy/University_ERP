import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { useStore } from '../store/useStore';
import { MOCK_USERS } from '../utils/mockData';
import { UserRole } from '../types';
import { Mail, Lock, Phone, ShieldCheck, ChevronRight, Eye, EyeOff } from 'lucide-react-native';

export const LoginScreen = () => {
  const setUser = useStore((state) => state.setUser);
  const [role, setRole] = useState<UserRole>('Admin');
  const [email, setEmail] = useState('admin@university.com');
  const [password, setPassword] = useState('password123');
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('1234');
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isOtpLogin = role === 'Faculty' || role === 'Student';

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setShowOtp(false);
    const roleEmailMap: Record<string, string> = {
      Admin: 'admin@university.com',
      ViceChancellor: 'vc@university.com',
      Faculty: 'faculty@university.com',
      Student: 'student@university.com',
      CoE: 'coe@university.com',
      Dean: 'dean@university.com',
      Registrar: 'registrar@university.com',
      Finance: 'finance@university.com',
      Parent: 'parent@university.com',
      Chancellor: 'chancellor@university.com',
      PlacementOfficer: 'placement@university.com',
      HoD: 'hod@university.com',
      Admissions: 'admissions@university.com'
    };
    if (roleEmailMap[newRole]) {
      setEmail(roleEmailMap[newRole]);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    let user;
    if (!isOtpLogin) {
      user = MOCK_USERS.find(u => u.email === email && u.role === role);
      if (!user) user = MOCK_USERS.find(u => u.email === email);
    } else {
      user = MOCK_USERS.find(u => u.role === role);
    }

    if (user) {
      setUser(user, 'mock-jwt-token');
    } else {
      alert(`Invalid credentials for ${role}. Try using the default email provided.`);
    }
    setLoading(false);
  };

  const handleSendOtp = () => {
    if (phone.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }
    setShowOtp(true);
    alert('OTP sent to ' + phone);
  };

  return (
    <View className="flex-1 bg-[#0F172A]">
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }} 
        className="px-6"
      >
        <View 
          style={{ 
            maxWidth: 450, 
            width: '100%', 
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
          className="rounded-[40px] p-10 overflow-hidden"
        >
          <View className="items-center mb-8">
            <View className="bg-blue-600/10 p-5 rounded-[24px] mb-4 border border-blue-500/20">
              <ShieldCheck color="#2563eb" size={44} />
            </View>
            <Text className="text-white text-3xl font-bold tracking-tight">University ERP</Text>
            <Text className="text-slate-400 mt-2 font-medium">Advanced Campus Management</Text>
          </View>

          <View className="mb-8">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-white/5 p-1.5 rounded-2xl border border-white/5">
              {(['Admin', 'Faculty', 'Chancellor', 'ViceChancellor', 'CoE', 'Admissions', 'Registrar', 'Dean', 'HoD', 'PlacementOfficer', 'Finance', 'Student', 'Parent'] as const).map((r) => (
                <TouchableOpacity
                  key={r}
                  onPress={() => handleRoleChange(r)}
                  className={`px-4 py-3.5 rounded-xl items-center mx-1 ${role === r ? 'bg-blue-600 shadow-lg' : ''}`}
                >
                  <Text className={`text-[10px] font-bold tracking-tight ${role === r ? 'text-white' : 'text-slate-400'}`}>
                    {r === 'Faculty' ? 'STAFF / FACULTY' : r.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="space-y-6">
            {!isOtpLogin ? (
              <>
                <View className="mb-4">
                  <Text className="text-slate-300 font-bold text-[10px] mb-2 ml-1 tracking-wider uppercase">Institutional Email</Text>
                  <View className="bg-white/5 p-4 rounded-2xl flex-row items-center border border-white/10">
                    <Mail color="#64748b" size={20} />
                    <TextInput
                      placeholder="e.g. admin@university.com"
                      placeholderTextColor="#475569"
                      className="flex-1 ml-3 text-white font-medium"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                </View>

                <View className="mb-6">
                  <View className="flex-row justify-between items-center mb-2 px-1">
                    <Text className="text-slate-300 font-bold text-[10px] tracking-wider uppercase">Security Password</Text>
                    <TouchableOpacity>
                      <Text className="text-blue-500 text-[11px] font-bold">Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="bg-white/5 p-4 rounded-2xl flex-row items-center border border-white/10">
                    <Lock color="#64748b" size={20} />
                    <TextInput
                      placeholder="••••••••"
                      placeholderTextColor="#475569"
                      secureTextEntry={!showPassword}
                      className="flex-1 ml-3 text-white font-medium"
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <EyeOff color="#64748b" size={20} />
                      ) : (
                        <Eye color="#64748b" size={20} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View className="mb-4">
                  <Text className="text-slate-300 font-bold text-[10px] mb-2 ml-1 tracking-wider uppercase">Registered Mobile</Text>
                  <View className="bg-white/5 p-4 rounded-2xl flex-row items-center border border-white/10">
                    <Phone color="#64748b" size={20} />
                    <TextInput
                      placeholder="Enter mobile number"
                      placeholderTextColor="#475569"
                      keyboardType="phone-pad"
                      className="flex-1 ml-3 text-white font-medium"
                      value={phone}
                      onChangeText={setPhone}
                    />
                  </View>
                </View>
                {showOtp && (
                  <View className="mb-6">
                    <Text className="text-slate-300 font-bold text-[10px] mb-2 ml-1 tracking-wider uppercase">Identity Verification</Text>
                    <View className="bg-white/5 p-4 rounded-2xl flex-row items-center border border-white/10">
                      <Lock color="#64748b" size={20} />
                      <TextInput
                        placeholder="4-digit code"
                        placeholderTextColor="#475569"
                        keyboardType="number-pad"
                        maxLength={4}
                        className="flex-1 ml-3 text-white font-medium"
                        value={otp}
                        onChangeText={setOtp}
                      />
                    </View>
                  </View>
                )}
              </>
            )}

            <View className="items-center">
              <TouchableOpacity
                onPress={!isOtpLogin || showOtp ? handleLogin : handleSendOtp}
                disabled={loading}
                activeOpacity={0.8}
                style={{ width: '100%' }}
                className="bg-blue-600 p-5 rounded-2xl flex-row items-center justify-center shadow-xl shadow-blue-900/40"
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Text className="text-white font-bold text-lg mr-2">
                      {!isOtpLogin ? 'Sign In' : (showOtp ? 'Verify & Continue' : 'Send OTP')}
                    </Text>
                    <ChevronRight color="white" size={20} />
                  </>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity className="mt-6">
                <Text className="text-slate-500 text-xs font-medium">Enterprise Security Protocol Active</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="mt-12 items-center">
          <Text className="text-white/40 text-sm font-medium">
            System Version 4.2.0-stable
          </Text>
          <Text className="text-white/40 text-[10px] mt-1 tracking-widest">
            ENTERPRISE INFRASTRUCTURE • SECURE NODE
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
