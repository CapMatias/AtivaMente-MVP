import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { COLORS } from '../src/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, 
      tabBarStyle: { 
        backgroundColor: COLORS.white, 
        borderTopWidth: 1, 
        borderTopColor: '#F1F5F9',
        height: 60,
        paddingBottom: 10 
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: '#94A3B8'
    }}>
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'Início',
          tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text> 
        }} 
      />
      <Tabs.Screen 
        name="children" 
        options={{ 
          title: 'Filhos',
          tabBarIcon: ({ color }) => <Text style={{ color }}>👧</Text> 
        }} 
      />
      <Tabs.Screen 
        name="agenda" 
        options={{ 
          title: 'Agenda',
          tabBarIcon: ({ color }) => <Text style={{ color }}>📅</Text> 
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ color }}>👤</Text> 
        }} 
      />
    </Tabs>
  );
}

import { Text } from 'react-native';
