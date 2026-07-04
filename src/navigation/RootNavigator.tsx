import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useStore } from '../store/useStore';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { AdminDashboard } from '../screens/Admin/AdminDashboard';
import { FacultyDashboard } from '../screens/Faculty/FacultyDashboard';
import { StudentDashboard } from '../screens/Student/StudentDashboard';
import { ParentDashboard } from '../screens/Parent/ParentDashboard';
import { FinanceDashboard } from '../screens/Finance/FinanceDashboard';
import { SafeChat } from '../screens/SafeChat';

// University Screens
import { ChancellorDashboard } from '../screens/Chancellor/ChancellorDashboard';
import { VCDashboard } from '../screens/VC/VCDashboard';
import { ProVCDashboard } from '../screens/ProVC/ProVCDashboard';
import { DeanDashboard } from '../screens/Dean/DeanDashboard';
import { RegistrarDashboard } from '../screens/Registrar/RegistrarDashboard';
import { PlacementDashboard } from '../screens/Placement/PlacementDashboard';
import { CoEDashboard } from '../screens/CoE/CoEDashboard';
import { HoDDashboard } from '../screens/HoD/HoDDashboard';
import { AdmissionsDashboard } from '../screens/Admissions/AdmissionsDashboard';

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
              {user.role === 'Admin' && (
                <Stack.Screen name="AdminStack" component={AdminDashboard} />
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
              {user.role === 'Chancellor' && (
                <Stack.Screen name="ChancellorStack" component={ChancellorDashboard} />
              )}
              {user.role === 'ViceChancellor' && (
                <Stack.Screen name="VCStack" component={VCDashboard} />
              )}
              {user.role === 'ProVC' && (
                <Stack.Screen name="ProVCStack" component={ProVCDashboard} />
              )}
              {user.role === 'Dean' && (
                <Stack.Screen name="DeanStack" component={DeanDashboard} />
              )}
              {user.role === 'Registrar' && (
                <Stack.Screen name="RegistrarStack" component={RegistrarDashboard} />
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
              <Stack.Screen name="SafeChat" component={SafeChat} />
            </>
          )}
        </Stack.Navigator>
        {user && <FloatingChatbot />}
      </View>
    </NavigationContainer>
  );
};

