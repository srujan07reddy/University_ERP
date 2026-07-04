import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react-native';
import { useStore } from '../../store/useStore';

export const FloatingChatbot = () => {
  const { user } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: `Hello ${user?.name || 'there'}! I am your UniBot assistant. How can I help you today?` }
  ]);

  if (!user) return null;

  const getSuggestions = () => {
    switch (user.role) {
      case 'Student':
        return ['Show my CGPA', 'Check my attendance', 'Show outstanding fees'];
      case 'Faculty':
        return ['View my workload', 'Syllabus progress', 'Research publications'];
      case 'Admin':
        return ['Check system stats', 'View audit logs', 'Check live users'];
      case 'Finance':
        return ['Show revenue', 'Operational cost', 'Budget details'];
      case 'ViceChancellor':
      case 'Chancellor':
        return ['Strategic goals', 'Institutional health', 'System KPIs'];
      default:
        return ['Help', 'About University', 'Contact Support'];
    }
  };

  const getBotResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Student Responses
    if (user.role === 'Student') {
      const studentData = user.universityData?.studentData;
      if (lowerInput.includes('cgpa')) {
        return `Your current CGPA is ${studentData?.cgpa || '3.85'}. You are doing great!`;
      }
      if (lowerInput.includes('attendance')) {
        return `Your current attendance is ${studentData?.attendancePercentage || '82'}%. You need at least 75% to stay compliant.`;
      }
      if (lowerInput.includes('fee')) {
        return `Your outstanding fee due is $${studentData?.feesDue || '1500'}. You have completed ${studentData?.feeHistory?.length || 2} previous payments successfully.`;
      }
    }

    // Faculty Responses
    if (user.role === 'Faculty' || user.role === 'HoD') {
      const facultyData = user.universityData?.facultyData;
      if (lowerInput.includes('workload')) {
        return `Your assigned teaching hours are ${facultyData?.teachingHoursPerWeek || '18'} hours per week.`;
      }
      if (lowerInput.includes('syllabus')) {
        return `Syllabus progress for your assigned courses is currently at ${facultyData?.syllabusProgress || '65'}%.`;
      }
      if (lowerInput.includes('publication') || lowerInput.includes('research')) {
        return `You have published ${facultyData?.publications || '12'} research papers and hold ${facultyData?.researchGrants || '3'} active research grants.`;
      }
    }

    // Admin Responses
    if (user.role === 'Admin') {
      if (lowerInput.includes('stats') || lowerInput.includes('live')) {
        return `System Status: 142 Staff present, 4850 Students checked in. Platform status is 100% operational.`;
      }
      if (lowerInput.includes('logs')) {
        return `Latest audit log: "University Admin session started" (severity: Info). System log level: Optimal.`;
      }
      if (lowerInput.includes('users')) {
        return `There are currently 13 active roles and over 5,000 registered user accounts in the database.`;
      }
    }

    // Finance Responses
    if (user.role === 'Finance') {
      if (lowerInput.includes('revenue')) {
        return `Total collections recorded this fiscal period: $12.4M (up +8.2% from previous cycle).`;
      }
      if (lowerInput.includes('cost')) {
        return `Total operational expenditures stand at $8.1M (-2.4% savings achieved).`;
      }
      if (lowerInput.includes('budget') || lowerInput.includes('asset')) {
        return `Capital assets are currently valued at $450M. Campus maintenance allocation: $840k remaining.`;
      }
    }

    // VC/Chancellor Responses
    if (user.role === 'ViceChancellor' || user.role === 'Chancellor') {
      const vcData = user.universityData?.vcData;
      if (lowerInput.includes('goals') || lowerInput.includes('strategic')) {
        return `Your active strategic goals: ${vcData?.strategicGoals?.join(', ') || 'Campus Expansion 2026, AI Research Center Launch'}.`;
      }
      if (lowerInput.includes('health') || lowerInput.includes('kpi')) {
        return `Institutional health is rated "Excellent" with research outputs up +24% YoY.`;
      }
    }

    // General Responses
    if (lowerInput.includes('help')) {
      return `I can help you retrieve your dashboard data quickly. Try clicking one of the suggested buttons or typing a question!`;
    }
    if (lowerInput.includes('about')) {
      return `Welcome to the Advanced University ERP Platform. Built with high-security encryptions and multi-role governance consoles.`;
    }
    if (lowerInput.includes('contact')) {
      return `For technical support, contact the Admin Desk at support@university.com or use Safe-Chat to reach out directly.`;
    }

    return `I received your message: "${input}". As a UniBot assistant for ${user.role}s, I suggest checking the quick action buttons for instant stats!`;
  };

  const handleSend = (textToSend = message) => {
    if (!textToSend.trim()) return;
    
    const userMsg = { sender: 'user' as const, text: textToSend };
    const botMsg = { sender: 'bot' as const, text: getBotResponse(textToSend) };

    setChatHistory(prev => [...prev, userMsg, botMsg]);
    if (textToSend === message) setMessage('');
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      {isOpen ? (
        <View style={styles.chatWindow} className="bg-[#1E293B] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden">
          {/* Header */}
          <View className="bg-blue-600/20 px-6 py-4 flex-row justify-between items-center border-b border-white/10">
            <View className="flex-row items-center gap-2">
              <Bot color="#3b82f6" size={20} />
              <View>
                <Text className="text-white font-bold text-sm flex-row items-center">UniBot Assistant <Sparkles color="#60a5fa" size={12} /></Text>
                <Text className="text-slate-400 text-[10px]">{user.role} Helper</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setIsOpen(false)} className="p-1 bg-white/5 rounded-full border border-white/10">
              <X color="white" size={16} />
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView 
            className="flex-1 p-4" 
            contentContainerStyle={{ gap: 12, paddingBottom: 16 }}
            ref={(ref) => ref?.scrollToEnd({ animated: true })}
          >
            {chatHistory.map((chat, idx) => (
              <View 
                key={idx} 
                className={`max-w-[85%] p-3 rounded-2xl ${chat.sender === 'user' ? 'bg-blue-600 rounded-tr-none self-end' : 'bg-white/5 border border-white/10 rounded-tl-none self-start'}`}
              >
                <Text className="text-white text-xs leading-relaxed">{chat.text}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Quick Suggestions */}
          <View className="px-4 py-2 flex-row flex-wrap gap-2 border-t border-white/5 bg-slate-900/30">
            {getSuggestions().map((suggestion, idx) => (
              <TouchableOpacity 
                key={idx} 
                onPress={() => handleSend(suggestion)}
                className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
              >
                <Text className="text-blue-400 text-[10px] font-bold">{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Input Area */}
          <View className="p-4 border-t border-white/10 flex-row gap-2 bg-slate-900/50">
            <TextInput 
              placeholder="Ask UniBot..." 
              placeholderTextColor="#64748b" 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs h-10"
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={() => handleSend()}
            />
            <TouchableOpacity 
              onPress={() => handleSend()}
              className="bg-blue-600 w-10 h-10 rounded-xl items-center justify-center shadow-lg shadow-blue-500/20"
            >
              <Send color="white" size={16} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity 
          onPress={() => setIsOpen(true)}
          className="bg-blue-600 w-14 h-14 rounded-full items-center justify-center shadow-2xl shadow-blue-500/40 border border-white/20"
          style={styles.fab}
        >
          <MessageSquare color="white" size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? 100 : 96,
    right: 24,
    backgroundColor: '#3b82f6',
  },
  chatWindow: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? 168 : 160,
    right: 24,
    width: 320,
    height: 420,
  }
});
