import React from 'react';
import { View, Platform, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useStore } from '../store/useStore';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { FacultyDashboard } from '../screens/Faculty/FacultyDashboard';
import { StudentDashboard } from '../screens/Student/StudentDashboard';
import { ParentDashboard } from '../screens/Parent/ParentDashboard';
import { FinanceDashboard } from '../screens/Finance/FinanceDashboard';
import { SafeChat } from '../screens/SafeChat';

// University Screens
import { AdministrationDashboard } from '../screens/Administration/AdministrationDashboard';
import { DeanDashboard } from '../screens/Dean/DeanDashboard';
import { PlacementDashboard } from '../screens/Placement/PlacementDashboard';
import { CoEDashboard } from '../screens/CoE/CoEDashboard';
import { HoDDashboard } from '../screens/HoD/HoDDashboard';
import { AdmissionsDashboard } from '../screens/Admissions/AdmissionsDashboard';
import { BusInchargeDashboard } from '../screens/BusIncharge/BusInchargeDashboard';
import { MessInchargeDashboard } from '../screens/MessIncharge/MessInchargeDashboard';

// Floating Chatbot
import { FloatingChatbot } from '../components/Navigation/FloatingChatbot';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const user = useStore((state) => state.user);

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <>
              {user.role === 'Administration' && (
                <Stack.Screen name="AdministrationStack" component={AdministrationDashboard} />
              )}
              {user.role === 'Finance' && (
                <Stack.Screen name="FinanceStack" component={FinanceDashboard} /> 
              )}
              {user.role === 'Faculty' && (
                <Stack.Screen name="FacultyStack" component={FacultyDashboard} />
              )}
              {user.role === 'Student' && (
                <Stack.Screen name="StudentStack" component={StudentDashboard} />
              )}
              {user.role === 'Parent' && (
                <Stack.Screen name="ParentStack" component={ParentDashboard} />
              )}
              {user.role === 'Dean' && (
                <Stack.Screen name="DeanStack" component={DeanDashboard} />
              )}
              {user.role === 'PlacementOfficer' && (
                <Stack.Screen name="PlacementStack" component={PlacementDashboard} />
              )}
              {user.role === 'CoE' && (
                <Stack.Screen name="CoEStack" component={CoEDashboard} />
              )}
              {user.role === 'HoD' && (
                <Stack.Screen name="HoDStack" component={HoDDashboard} />
              )}
              {user.role === 'Admissions' && (
                <Stack.Screen name="AdmissionsStack" component={AdmissionsDashboard} />
              )}
              {user.role === 'BusIncharge' && (
                <Stack.Screen name="BusInchargeStack" component={BusInchargeDashboard} />
              )}
              {user.role === 'MessIncharge' && (
                <Stack.Screen name="MessInchargeStack" component={MessInchargeDashboard} />
              )}
              <Stack.Screen name="SafeChat" component={SafeChat} />
            </>
          )}
        </Stack.Navigator>
        {user && <FloatingChatbot />}
      </View>
    </NavigationContainer>
  );
};

