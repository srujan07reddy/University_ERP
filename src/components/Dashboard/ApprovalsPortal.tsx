import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { CheckCircle2, XCircle, AlertCircle, FileText, ChevronRight, Send, ArrowRight } from 'lucide-react-native';
import { ApprovalRequest, UserRole } from '../../types';

export const ApprovalsPortal = () => {
  const { user, approvalRequests, submitApprovalRequest, updateApprovalStatus } = useStore();
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Submit Form States
  const [category, setCategory] = useState<'Leave' | 'OD' | 'Budget' | 'Event' | 'Purchase' | 'Research' | 'MarksLocking'>('Leave');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  if (!user) return null;

  // Filter requests that are relevant to this user
  // If the user's role is the currentApproverRole, show it in their "Pending Reviews"
  const pendingReviews = approvalRequests.filter(
    (req) => req.status === 'Pending' && req.currentApproverRole === user.role
  );

  // Requests sent by the current user
  const myRequests = approvalRequests.filter((req) => req.senderId === user.id);

  // All requests (visible to Admin/Chancellor)
  const isAllViewer = ['Admin', 'Chancellor', 'ViceChancellor'].includes(user.role);
  const allRequests = isAllViewer ? approvalRequests : [];

  const handleAction = (id: string, action: 'Approve' | 'Reject' | 'Correction' | 'Escalate') => {
    updateApprovalStatus(id, action, user.name, user.role, comments);
    setComments('');
    setSelectedRequest(null);
    if (Platform.OS === 'web') {
      alert(`Request has been updated to: ${action === 'Correction' ? 'Correction Required' : action + 'd'}`);
    } else {
      Alert.alert('Success', `Request updated successfully.`);
    }
  };

  const handleSubmit = () => {
    if (!title || !description) {
      alert('Please fill out all fields.');
      return;
    }
    submitApprovalRequest({
      category,
      title,
      description,
      amount: amount ? parseFloat(amount) : undefined,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      currentApproverRole: category === 'Budget' || category === 'Purchase' ? 'Dean' : 'HoD'
    });
    setTitle('');
    setDescription('');
    setAmount('');
    setIsSubmitting(false);
    alert('Approval request submitted successfully!');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <View className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full flex-row items-center gap-1"><CheckCircle2 size={12} color="#10b981" /><Text className="text-green-400 text-xs font-bold">APPROVED</Text></View>;
      case 'Rejected':
        return <View className="bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full flex-row items-center gap-1"><XCircle size={12} color="#ef4444" /><Text className="text-red-400 text-xs font-bold">REJECTED</Text></View>;
      case 'CorrectionRequired':
        return <View className="bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full flex-row items-center gap-1"><AlertCircle size={12} color="#f59e0b" /><Text className="text-orange-400 text-xs font-bold">CORRECTION REQ.</Text></View>;
      case 'Escalated':
        return <View className="bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full flex-row items-center gap-1"><AlertCircle size={12} color="#a855f7" /><Text className="text-purple-400 text-xs font-bold">ESCALATED</Text></View>;
      default:
        return <View className="bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full flex-row items-center gap-1"><AlertCircle size={12} color="#3b82f6" /><Text className="text-blue-400 text-xs font-bold">PENDING</Text></View>;
    }
  };

  return (
    <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} keyboardShouldPersistTaps="handled">
    <View className="flex-1 space-y-6">
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-white text-2xl font-bold">Universal Approval Desk</Text>
          <Text className="text-slate-400 text-sm">Dynamic cross-department workflow manager</Text>
        </View>
        {!['Chancellor', 'ViceChancellor', 'ProVC', 'Finance'].includes(user.role) && (
          <TouchableOpacity 
            onPress={() => setIsSubmitting(!isSubmitting)}
            className="bg-blue-600 px-6 py-3 rounded-2xl"
          >
            <Text className="text-white font-bold">{isSubmitting ? 'View Requests' : 'Create New Request'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {isSubmitting ? (
        // Submission Form View
        <View className="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-4">
          <Text className="text-white text-lg font-bold mb-2">New Approval Request</Text>
          
          <View className="flex-row gap-2 mb-2 flex-wrap">
            {['Leave', 'OD', 'Budget', 'Event', 'Purchase', 'Research', 'MarksLocking'].map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat as any)}
                className={`px-4 py-2 rounded-xl border ${category === cat ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10'}`}
              >
                <Text className={`text-xs font-bold ${category === cat ? 'text-white' : 'text-slate-400'}`}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Request Title (e.g. Purchase of Lab Glassware)"
            placeholderTextColor="#64748b"
            value={title}
            onChangeText={setTitle}
            className="bg-white/5 p-5 rounded-2xl border border-white/10 text-white"
          />

          {(category === 'Budget' || category === 'Purchase') && (
            <TextInput
              placeholder="Amount ($)"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              className="bg-white/5 p-5 rounded-2xl border border-white/10 text-white"
            />
          )}

          <TextInput
            placeholder="Detailed description and justification..."
            placeholderTextColor="#64748b"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            className="bg-white/5 p-5 rounded-2xl border border-white/10 text-white h-32"
          />

          <TouchableOpacity 
            onPress={handleSubmit}
            className="bg-blue-600 p-5 rounded-2xl flex-row justify-center items-center gap-2"
          >
            <Send color="white" size={18} />
            <Text className="text-white font-bold">Submit to {category === 'Budget' || category === 'Purchase' ? 'Dean Office' : 'HOD Console'}</Text>
          </TouchableOpacity>
        </View>
      ) : selectedRequest ? (
        // Detail View for Review & Action
        <View className="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-6">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-xs font-bold text-blue-400 uppercase tracking-widest">{selectedRequest.category}</Text>
              <Text className="text-white text-2xl font-bold mt-1">{selectedRequest.title}</Text>
              <Text className="text-slate-400 text-xs mt-1">Submitted by {selectedRequest.senderName} ({selectedRequest.senderRole}) on {selectedRequest.dateCreated}</Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedRequest(null)} className="bg-white/5 px-4 py-2 rounded-xl border border-white/10">
              <Text className="text-slate-400 font-bold text-xs">Back</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <Text className="text-white/80 text-sm leading-relaxed">{selectedRequest.description}</Text>
            {selectedRequest.amount && (
              <Text className="text-blue-400 text-lg font-bold mt-4">Estimated Budget: ${selectedRequest.amount}</Text>
            )}
          </View>

          {/* Workflow progress history */}
          <View className="space-y-3">
            <Text className="text-white font-bold text-sm">Approval Route & Actions</Text>
            {selectedRequest.history.map((hist, idx) => (
              <View key={idx} className="flex-row items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                <FileText color="#94a3b8" size={16} />
                <View className="flex-1">
                  <View className="flex-row justify-between">
                    <Text className="text-white font-bold text-xs">{hist.actorName} ({hist.actorRole})</Text>
                    <Text className="text-slate-500 text-[10px]">{hist.actionDate}</Text>
                  </View>
                  <Text className="text-slate-400 text-xs mt-1">{hist.comments || 'No comment provided.'}</Text>
                  <View className="mt-2 self-start">{getStatusBadge(hist.status)}</View>
                </View>
              </View>
            ))}
          </View>

          {/* Review actions if current user is the target approver */}
          {selectedRequest.status === 'Pending' && selectedRequest.currentApproverRole === user.role && (
            <View className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
              <Text className="text-white font-bold text-sm">Submit Review Decision</Text>
              <TextInput
                placeholder="Write approval comments, reasons for rejection, or correction remarks..."
                placeholderTextColor="#64748b"
                value={comments}
                onChangeText={setComments}
                className="bg-[#0F172A] p-4 rounded-xl border border-white/10 text-white"
              />
              <View className="flex-row gap-3">
                <TouchableOpacity 
                  onPress={() => handleAction(selectedRequest.id, 'Approve')}
                  className="flex-1 bg-green-600 p-4 rounded-xl items-center flex-row justify-center gap-2"
                >
                  <CheckCircle2 color="white" size={16} />
                  <Text className="text-white font-bold text-xs">Approve & Forward</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleAction(selectedRequest.id, 'Correction')}
                  className="flex-1 bg-orange-600 p-4 rounded-xl items-center flex-row justify-center gap-2"
                >
                  <AlertCircle color="white" size={16} />
                  <Text className="text-white font-bold text-xs">Correction Req.</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleAction(selectedRequest.id, 'Reject')}
                  className="flex-1 bg-red-600 p-4 rounded-xl items-center flex-row justify-center gap-2"
                >
                  <XCircle color="white" size={16} />
                  <Text className="text-white font-bold text-xs">Reject Request</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ) : (
        // List Views
        <ScrollView className="space-y-6">
          {/* Pending items for Approver */}
          {pendingReviews.length > 0 && (
            <View className="mb-6">
              <Text className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-3">Pending My Review</Text>
              <View className="space-y-3">
                {pendingReviews.map((req) => (
                  <TouchableOpacity
                    key={req.id}
                    onPress={() => setSelectedRequest(req)}
                    className="bg-yellow-500/5 border border-yellow-500/20 p-5 rounded-2xl flex-row justify-between items-center"
                  >
                    <View className="flex-1 mr-4">
                      <View className="flex-row items-center gap-2">
                        <Text className="text-white font-bold">{req.title}</Text>
                        <View className="bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20"><Text className="text-yellow-400 text-[9px] font-bold uppercase">{req.category}</Text></View>
                        {req.isEscalated && (
                          <View className="bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20"><Text className="text-red-400 text-[9px] font-bold uppercase">ESCALATED (+{req.hoursElapsed}h)</Text></View>
                        )}
                      </View>
                      <Text className="text-slate-400 text-xs mt-1">From: {req.senderName} ({req.senderRole}) • Created: {req.dateCreated}</Text>
                    </View>
                    <ChevronRight color="#f59e0b" size={20} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* My Submitted Requests */}
          {myRequests.length > 0 && (
            <View className="mb-6">
              <Text className="text-white/80 font-bold text-sm uppercase tracking-wider mb-3">My Submitted Requests</Text>
              <View className="space-y-3">
                {myRequests.map((req) => (
                  <TouchableOpacity
                    key={req.id}
                    onPress={() => setSelectedRequest(req)}
                    className="bg-white/5 border border-white/10 p-5 rounded-2xl flex-row justify-between items-center"
                  >
                    <View className="flex-1 mr-4">
                      <Text className="text-white font-bold">{req.title}</Text>
                      <View className="flex-row items-center gap-3 mt-1">
                        <Text className="text-slate-400 text-xs">Approver: {req.currentApproverRole}</Text>
                        <Text className="text-slate-500 text-[10px]">• {req.dateCreated}</Text>
                        {req.isEscalated && (
                          <View className="bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20"><Text className="text-red-400 text-[9px] font-bold uppercase">ESCALATED (+{req.hoursElapsed}h)</Text></View>
                        )}
                      </View>
                    </View>
                    <View className="flex-row items-center gap-2">
                      {getStatusBadge(req.status)}
                      <ChevronRight color="#475569" size={16} />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Global Requests Overview (for Admin / Chancellor) */}
          {isAllViewer && allRequests.length > 0 && (
            <View>
              <Text className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-3">All System Requests (Admin Logs)</Text>
              <View className="space-y-3">
                {allRequests.map((req) => (
                  <TouchableOpacity
                    key={req.id}
                    onPress={() => setSelectedRequest(req)}
                    className="bg-white/5 border border-white/10 p-5 rounded-2xl flex-row justify-between items-center"
                  >
                    <View className="flex-1 mr-4">
                      <Text className="text-white font-bold">{req.title}</Text>
                      <Text className="text-slate-400 text-xs mt-1">Sender: {req.senderName} ({req.senderRole}) • Next Sign-off: {req.currentApproverRole}</Text>
                      {req.isEscalated && (
                        <View className="bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20 mt-1 self-start"><Text className="text-red-400 text-[9px] font-bold uppercase">ESCALATED (+{req.hoursElapsed}h)</Text></View>
                      )}
                    </View>
                    <View className="flex-row items-center gap-2">
                      {getStatusBadge(req.status)}
                      <ChevronRight color="#475569" size={16} />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {pendingReviews.length === 0 && myRequests.length === 0 && !isAllViewer && (
            <View className="items-center py-12">
              <FileText size={48} color="#475569" />
              <Text className="text-slate-400 text-sm mt-4 font-semibold">No approval requests filed yet.</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
    </ScrollView>
  );
};
