import React, { useState } from 'react';
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
