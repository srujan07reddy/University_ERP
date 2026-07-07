import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';

const INITIAL_INVENTORY = [
  { name: 'Dell Precision Workstations',  count: 40, status: 'Operational',  maintenance: 'Good' },
  { name: 'AI Server NVIDIA A100',        count: 1,  status: 'Under Repair', maintenance: 'Scheduled Nov 10' },
  { name: 'MATLAB Multi-User License',    count: 50, status: 'Active',       maintenance: 'Renews Dec 2026' },
];

export const HoDInventoryTab = () => {
  const [inventoryItems] = useState(INITIAL_INVENTORY);

  return (
    <GlobalScrollView>
    <View className="space-y-6">
      <Text className="text-white text-2xl font-bold mb-2">Inventory &amp; Lab Equipment</Text>
      {inventoryItems.map((item, idx) => (
        <View key={idx} className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex-row justify-between items-center">
          <View>
            <Text className="text-white font-bold text-lg">{item.name}</Text>
            <Text className="text-slate-400 text-xs mt-1">Status: {item.status} • Stock: {item.count} units</Text>
            <Text className="text-blue-400 text-xs mt-1">Maintenance: {item.maintenance}</Text>
          </View>
          <TouchableOpacity
            onPress={() => Alert.alert('Maintenance Request', 'Maintenance ticket submitted to engineering cell.')}
            className="bg-white/5 p-3 rounded-xl border border-white/10"
          >
            <RefreshCw color="white" size={16} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
    </GlobalScrollView>
  );
};
