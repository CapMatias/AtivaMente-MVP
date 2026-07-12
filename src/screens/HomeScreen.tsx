import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { Header } from '../components/ui/Header';
import { useAuthStore } from '../store/authStore';
import { MOCK_DATA } from '../services/mockData';

export default function HomeScreen() {
  const { state } = useAuthStore();
  const user = state.user || MOCK_DATA.user;

  return (
    <View className="flex-1 bg-slate-50">
      <Header title="AtivaMente" />
      
      <ScrollView className="flex-1 px-6 py-4">
        <View className="mb-8">
          <Text className="text-slate-400 text-lg">Olá,</Text>
          <Text className="text-slate-800 text-3xl font-bold">{user.name}!</Text>
        </View>

        <Text className="text-slate-800 text-lg font-semibold mb-4">Próxima Sessão</Text>
        <Card className="mb-6 border-l-4 border-blue-600">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-slate-800 text-xl font-bold">Lucas Silva</Text>
              <Text className="text-slate-500">{MOCK_DATA.children[0].nextSession?.type}</Text>
              <Text className="text-blue-600 font-medium mt-2">
                {MOCK_DATA.children[0].nextSession?.date} às {MOCK_DATA.children[0].nextSession?.time}
              </Text>
            </View>
            <Avatar src={MOCK_DATA.children[0].avatarUrl!} size="sm" />
          </View>
        </Card>

        <Text className="text-slate-800 text-lg font-semibold mb-4">Ações Rápidas</Text>
        <View className="flex-row flex-wrap justify-between">
          <QuickActionButton title="Agendar" icon="📅" color="bg-blue-100 text-blue-600" />
          <QuickActionButton title="Evoluções" icon="📈" color="bg-green-100 text-green-600" />
          <QuickActionButton title="Filhos" icon="👨‍👩‍👧" color="bg-purple-100 text-purple-600" />
          <QuickActionButton title="Perfil" icon="👤" color="bg-orange-100 text-orange-600" />
        </View>
      </ScrollView>
    </View>
  );
}

function QuickActionButton({ title, icon, color }: { title: string, icon: string, color: string }) {
  return (
    <TouchableOpacity className="w-[46%] mb-4">
      <Card className={`flex-row items-center p-4 ${color}`}>
        <Text className="text-2xl mr-3">{icon}</Text>
        <Text className="font-bold text-slate-800">{title}</Text>
      </Card>
    </TouchableOpacity>
  );
}
import { TouchableOpacity } from 'react-native';
