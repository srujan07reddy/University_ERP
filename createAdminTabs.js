const fs = require('fs');
const path = require('path');

const dir = path.join('src', 'screens', 'Administration');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const files = [
{
name: 'AdministrationDashboard.tsx',
content: `import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { useStore } from '../../store/useStore';
import { Sidebar } from '../../components/Navigation/Sidebar';
import { Home, BarChart3, ClipboardList, Settings, User, MessageSquare, Shield, FileText } from 'lucide-react-native';

import { AdministrationHomeTab } from './AdministrationHomeTab';
import { AdministrationAnalyticsTab } from './AdministrationAnalyticsTab';
import { AdministrationSurveysTab } from './AdministrationSurveysTab';
import { AdministrationComplianceTab } from './AdministrationComplianceTab';
import { AdministrationReportsTab } from './AdministrationReportsTab';
import { AdministrationSafeChatTab } from './AdministrationSafeChatTab';
import { AdministrationUsersTab } from './AdministrationUsersTab';
import { AdministrationSettingsTab } from './AdministrationSettingsTab';

const { width } = Dimensions.get('window');

export const AdministrationDashboard = () => {
  const { user, setUser } = useStore();
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const renderContent = () => {
    switch (activeTab) {
      case 'Analytics': return <AdministrationAnalyticsTab />;
      case 'Surveys': return <AdministrationSurveysTab />;
      case 'Compliance': return <AdministrationComplianceTab />;
      case 'Reports': return <AdministrationReportsTab />;
      case 'SafeChat': return <AdministrationSafeChatTab />;
      case 'Users': return <AdministrationUsersTab />;
      case 'Settings': return <AdministrationSettingsTab />;
      default: return <AdministrationHomeTab setMenuVisible={setMenuVisible} />;
    }
  };

  return (
    <View className="flex-1 bg-slate-900 flex-row">
      <Sidebar
        role="Administration"
        userName={user?.name || 'Administrator'}
        activeTab={activeTab}
        onTabSelect={(t) => { setActiveTab(t); setMenuVisible(false); }}
        isVisible={menuVisible}
        onClose={() => setMenuVisible(false)}
        menuItems={[
          { id: 'Home', icon: Home, label: 'Dashboard' },
          { id: 'Analytics', icon: BarChart3, label: 'Analytics' },
          { id: 'Surveys', icon: ClipboardList, label: 'Surveys' },
          { id: 'Compliance', icon: Shield, label: 'Compliance Audit' },
          { id: 'Reports', icon: FileText, label: 'Reports' },
          { id: 'SafeChat', icon: MessageSquare, label: 'SafeChat' },
          { id: 'Users', icon: User, label: 'User Management' },
          { id: 'Settings', icon: Settings, label: 'Settings' },
        ]}
      />
      
      <View className="flex-1 p-6" style={{ marginLeft: width > 768 ? 280 : 0 }}>
        {renderContent()}
      </View>
    </View>
  );
};
`
},
{
name: 'AdministrationHomeTab.tsx',
content: `import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';
import { StatCard } from '../../components/Dashboard/StatCard';
import { useStore } from '../../store/useStore';
import { Users, DollarSign, GraduationCap, Shield, Menu, Bell, LogOut } from 'lucide-react-native';
import { ApprovalsPortal } from '../../components/Dashboard/ApprovalsPortal';

export const AdministrationHomeTab = ({ setMenuVisible }: { setMenuVisible: (v: boolean) => void }) => {
  const { user, setUser } = useStore();

  return (
    <GlobalScrollView>
      <>
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => setMenuVisible(true)}
              className="bg-white/5 p-3 rounded-2xl border border-white/10 mr-4 md:hidden"
            >
              <Menu color="white" size={20} />
            </TouchableOpacity>
            <View>
              <Text className="text-slate-400 text-sm font-medium">Institutional Governance</Text>
              <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>Administration</Text>
            </View>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <Bell color="#94a3b8" size={20} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setUser(null)}
              className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20"
            >
              <LogOut color="#ef4444" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Global KPIs */}
        <View className="flex-col md:flex-row flex-wrap gap-4 mb-8">
          <View className="w-full md:w-[48%] xl:w-[23%]">
            <StatCard title="Total Enrollment" value="18,450" icon={Users} trend="+8.2%" color="#3b82f6" />
          </View>
          <View className="w-full md:w-[48%] xl:w-[23%]">
            <StatCard title="Revenue Target" value="94%" icon={DollarSign} trend="+2.4%" color="#10b981" />
          </View>
          <View className="w-full md:w-[48%] xl:w-[23%]">
            <StatCard title="Graduation Rate" value="92.4%" icon={GraduationCap} trend="+1.2%" color="#8b5cf6" />
          </View>
          <View className="w-full md:w-[48%] xl:w-[23%]">
            <StatCard title="Compliance" value="A++" icon={Shield} trend="NAAC" color="#f59e0b" />
          </View>
        </View>

        <ApprovalsPortal />
      </>
    </GlobalScrollView>
  );
};
`
},
{
name: 'AdministrationAnalyticsTab.tsx',
content: `import React from 'react';
import { AnalyticsView } from '../../components/Dashboard/AnalyticsView';

export const AdministrationAnalyticsTab = () => {
  return <AnalyticsView role="Administration" />;
};
`
},
{
name: 'AdministrationSurveysTab.tsx',
content: `import React from 'react';
import { SurveyView } from '../../components/Dashboard/SurveyView';

export const AdministrationSurveysTab = () => {
  return <SurveyView role="Administration" />;
};
`
},
{
name: 'AdministrationComplianceTab.tsx',
content: `import React from 'react';
import { View, Text } from 'react-native';
import { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';

export const AdministrationComplianceTab = () => (
  <GlobalScrollView>
    <View className="flex-1 items-center justify-center py-20">
      <Text className="text-white text-2xl font-bold">Compliance Audit</Text>
      <Text className="text-slate-400 mt-2">Regulatory tracking system coming soon.</Text>
    </View>
  </GlobalScrollView>
);
`
},
{
name: 'AdministrationReportsTab.tsx',
content: `import React from 'react';
import { View, Text } from 'react-native';
import { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';

export const AdministrationReportsTab = () => (
  <GlobalScrollView>
    <View className="flex-1 items-center justify-center py-20">
      <Text className="text-white text-2xl font-bold">Governance Reports</Text>
      <Text className="text-slate-400 mt-2">Reporting engine coming soon.</Text>
    </View>
  </GlobalScrollView>
);
`
},
{
name: 'AdministrationSafeChatTab.tsx',
content: `import React from 'react';
import { MessageCenter } from '../../components/Dashboard/MessageCenter';

export const AdministrationSafeChatTab = () => {
  return <MessageCenter />;
};
`
},
{
name: 'AdministrationUsersTab.tsx',
content: `import React from 'react';
import { View, Text } from 'react-native';
import { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';

export const AdministrationUsersTab = () => (
  <GlobalScrollView>
    <View className="flex-1 items-center justify-center py-20">
      <Text className="text-white text-2xl font-bold">User Management</Text>
      <Text className="text-slate-400 mt-2">Manage staff, students, and faculty here.</Text>
    </View>
  </GlobalScrollView>
);
`
},
{
name: 'AdministrationSettingsTab.tsx',
content: `import React from 'react';
import { View, Text } from 'react-native';
import { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';

export const AdministrationSettingsTab = () => (
  <GlobalScrollView>
    <View className="flex-1 items-center justify-center py-20">
      <Text className="text-white text-2xl font-bold">System Settings</Text>
      <Text className="text-slate-400 mt-2">Global ERP configuration settings coming soon.</Text>
    </View>
  </GlobalScrollView>
);
`
}
];

files.forEach(f => {
    fs.writeFileSync(path.join(dir, f.name), f.content);
    console.log('Created ' + f.name);
});
