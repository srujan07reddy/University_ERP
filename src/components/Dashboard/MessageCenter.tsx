import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { Send, Sparkles, Users, MessageSquare, Bell, Shield, Layers } from 'lucide-react-native';
import { useStore } from '../../store/useStore';

export const MessageCenter = () => {
  const { user, users, messages, addMessage } = useStore();
  const [selectedChat, setSelectedChat] = useState<'Broadcasts' | string>('Broadcasts');
  const [messageText, setMessageText] = useState('');
  
  // Broadcast configuration (only visible for Dean / VC / Admin)
  const [broadcastTarget, setBroadcastTarget] = useState<'All' | 'HoD' | 'Faculty' | 'Student'>('All');
  const [broadcastTitle, setBroadcastTitle] = useState('');

  const activeDirectChats = users.filter(u => u.id !== user?.id);

  const handleSendMessage = () => {
    if (selectedChat === 'Broadcasts') {
      // Send Broadcast Push Notification
      if (!broadcastTitle || !messageText) {
        Alert.alert('Validation Error', 'Please enter a notification title and content.');
        return;
      }
      
      const newMsg = {
        id: Math.random().toString(36).substr(2, 9),
        senderId: user?.id || 'dean',
        receiverId: `broadcast-${broadcastTarget}`,
        text: messageText,
        title: broadcastTitle,
        senderName: user?.name || 'Dean of SET',
        senderRole: user?.role || 'Dean',
        timestamp: new Date().toISOString(),
        isBroadcast: true,
        targetRole: broadcastTarget
      };
      
      addMessage(newMsg);
      setMessageText('');
      setBroadcastTitle('');
      Alert.alert('Push Notification Sent', `Dispatched to all ${broadcastTarget} devices via App Push & SMS Channels.`);
    } else {
      // Send Direct Message
      if (!messageText.trim()) return;
      
      const targetUser = users.find(u => u.id === selectedChat);
      const newMsg = {
        id: Math.random().toString(36).substr(2, 9),
        senderId: user?.id || 'sender',
        receiverId: selectedChat,
        text: messageText,
        senderName: user?.name || 'User',
        senderRole: user?.role || 'Faculty',
        timestamp: new Date().toISOString()
      };
      
      addMessage(newMsg);
      setMessageText('');
    }
  };

  // Filter conversations
  const filteredMessages = messages.filter((msg: any) => {
    if (selectedChat === 'Broadcasts') {
      return msg.isBroadcast;
    } else {
      // Direct message between user.id and selectedChat
      return !msg.isBroadcast && (
        (msg.senderId === user?.id && msg.receiverId === selectedChat) ||
        (msg.senderId === selectedChat && msg.receiverId === user?.id)
      );
    }
  });

  return (
    <View style={{ flex: 1, height: '100%' }} className="space-y-6">
      <View className="flex-row justify-between items-center mb-2">
        <View>
          <Text className="text-white text-2xl font-bold">SafeChat Communication Center</Text>
          <Text className="text-slate-450 text-xs">University Encrypted & Audited Communication Channels</Text>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: 'row', minHeight: 480 }} className="bg-white/5 rounded-[40px] border border-white/10 overflow-hidden">
        
        {/* Chats list sidebar */}
        <View className="w-80 border-r border-white/10 bg-slate-950/40">
          <View className="p-5 border-b border-white/5">
            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Active Channels</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="p-3 space-y-1">
              
              {/* Broadcast item */}
              <TouchableOpacity 
                onPress={() => setSelectedChat('Broadcasts')}
                className={`p-4 rounded-2xl flex-row items-center justify-between ${selectedChat === 'Broadcasts' ? 'bg-blue-600' : 'hover:bg-white/5'}`}
              >
                <View className="flex-row items-center">
                  <Bell color="white" size={16} />
                  <Text className="text-white font-bold text-xs ml-3">Push Notifications</Text>
                </View>
                <View className="bg-red-500/20 px-2 py-0.5 rounded-full border border-red-500/20">
                  <Text className="text-red-400 text-[9px] font-bold">LIVE</Text>
                </View>
              </TouchableOpacity>

              <View className="p-3 border-t border-white/5 mt-2">
                <Text className="text-slate-500 text-[9px] font-bold uppercase">Direct Contacts</Text>
              </View>

              {activeDirectChats.map((c) => (
                <TouchableOpacity 
                  key={c.id}
                  onPress={() => setSelectedChat(c.id)}
                  className={`p-4 rounded-2xl flex-row items-center ${selectedChat === c.id ? 'bg-blue-600' : 'hover:bg-white/5'}`}
                >
                  <View className="h-6 w-6 rounded-full bg-slate-800 border border-white/10 items-center justify-center mr-3">
                    <Text className="text-white text-[10px] font-bold">{c.name.charAt(0)}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-xs">{c.name}</Text>
                    <Text className="text-slate-400 text-[10px] mt-0.5">{c.role}</Text>
                  </View>
                </TouchableOpacity>
              ))}

            </View>
          </ScrollView>
        </View>

        {/* Messaging Pane */}
        <View className="flex-1 flex-col bg-slate-900/10">
          
          {/* Header */}
          <View className="p-6 border-b border-white/5 flex-row justify-between items-center">
            <View>
              <Text className="text-white font-bold text-sm">
                {selectedChat === 'Broadcasts' ? 'Institutional Broadcast Feed' : users.find(u => u.id === selectedChat)?.name}
              </Text>
              <Text className="text-slate-450 text-[10px] mt-0.5">
                {selectedChat === 'Broadcasts' ? 'Broadcasting system & Announcements logs' : 'End-to-End Encrypted Tunnel'}
              </Text>
            </View>
          </View>

          {/* Messages list */}
          <ScrollView className="flex-1 p-6" contentContainerStyle={{ paddingBottom: 24 }}>
            <View className="space-y-4">
              {filteredMessages.length === 0 ? (
                <View className="py-10 items-center justify-center">
                  <MessageSquare color="#475569" size={32} />
                  <Text className="text-slate-500 text-xs mt-3">No messages in this chat stream.</Text>
                </View>
              ) : null}

              {filteredMessages.map((msg: any) => {
                const isMyMessage = msg.senderId === user?.id;
                
                if (msg.isBroadcast) {
                  return (
                    <View key={msg.id} className="bg-blue-900/10 p-5 rounded-2xl border border-blue-500/20 space-y-2">
                      <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center gap-2">
                          <Shield color="#3b82f6" size={14} />
                          <Text className="text-blue-400 text-[10px] font-bold uppercase">{msg.senderRole} Broadcast</Text>
                        </View>
                        <Text className="text-slate-550 text-[9px]">{new Date(msg.timestamp).toLocaleTimeString()}</Text>
                      </View>
                      <Text className="text-white font-bold text-sm">{msg.title}</Text>
                      <Text className="text-slate-300 text-xs leading-relaxed">{msg.text}</Text>
                      <Text className="text-slate-500 text-[10px] italic">Target Audience: {msg.targetRole}s</Text>
                    </View>
                  );
                }

                return (
                  <View 
                    key={msg.id} 
                    style={{ alignSelf: isMyMessage ? 'flex-end' : 'flex-start' }}
                    className={`max-w-[80%] p-4 rounded-2xl ${isMyMessage ? 'bg-blue-600' : 'bg-white/5 border border-white/5'}`}
                  >
                    {!isMyMessage && (
                      <Text className="text-blue-400 text-[9px] font-bold mb-1 uppercase">{msg.senderName} ({msg.senderRole})</Text>
                    )}
                    <Text className="text-white text-xs leading-relaxed">{msg.text}</Text>
                    <Text className="text-slate-400 text-[8px] text-right mt-1.5">{new Date(msg.timestamp).toLocaleTimeString()}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>

          {/* Form Composer */}
          <View className="p-6 border-t border-white/5 bg-slate-950/20 space-y-4">
            {selectedChat === 'Broadcasts' && (user?.role === 'Dean' || user?.role === 'ViceChancellor' || user?.role === 'Admin') && (
              <View className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                <Text className="text-white font-bold text-[10px] uppercase tracking-wide">Configure Push Notification Broadcast</Text>
                
                <TextInput 
                  placeholder="Notification Header Title" 
                  placeholderTextColor="#64748b" 
                  className="bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white text-xs"
                  value={broadcastTitle}
                  onChangeText={setBroadcastTitle}
                />
                
                <View className="flex-row items-center gap-2">
                  <Text className="text-slate-400 text-[10px] mr-2">Target Group:</Text>
                  {['All', 'HoD', 'Faculty', 'Student'].map((t: any) => (
                    <TouchableOpacity 
                      key={t}
                      onPress={() => setBroadcastTarget(t)}
                      className={`px-3 py-1 rounded-lg border ${broadcastTarget === t ? 'bg-blue-600 border-blue-500' : 'bg-slate-950/40 border-white/5'}`}
                    >
                      <Text className="text-white text-[9px] font-bold">{t}s</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View className="flex-row gap-3 items-center">
              <TextInput 
                placeholder={selectedChat === 'Broadcasts' ? "Type announcement message..." : "Type secure message..."}
                placeholderTextColor="#64748b" 
                className="flex-1 bg-slate-950/40 border border-white/10 rounded-xl px-4 py-3 text-white text-xs h-12"
                value={messageText}
                onChangeText={setMessageText}
              />
              <TouchableOpacity onPress={handleSendMessage} className="bg-blue-600 p-3 h-12 w-12 rounded-xl justify-center items-center">
                <Send color="white" size={16} />
              </TouchableOpacity>
            </View>
          </View>

        </View>

      </View>
    </View>
  );
};
