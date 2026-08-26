import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Header } from '../components/ui/Header';
import { Badge } from '../components/ui/Badge';
import { useAuthStore } from '../store/authStore';
import { MOCK_DATA } from '../services/mockData';

export default function HomeScreen() {
  const { state } = useAuthStore();
  const user = state.user || MOCK_DATA.user;
  const router = useRouter();

  const lastEvolution = MOCK_DATA.evolutions[0];

  return (
    <View className="flex-1 bg-slate-50">
      <Header title="AtivaMente" />

      <ScrollView className="flex-1 px-6 py-4">
        <View className="mb-6 animate-fade-in-down opacity-0">
          <Text className="text-slate-400 text-lg">Olá,</Text>
          <Text className="text-slate-800 text-3xl font-bold">{user.name}!</Text>
        </View>

        <Text className="text-slate-800 text-lg font-semibold mb-3 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
          Próxima Sessão
        </Text>
        <Card className="mb-6 border-l-4 border-blue-600 animate-slide-in-right opacity-0" style={{ animationDelay: '0.2s' }}>
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-slate-800 text-xl font-bold">{MOCK_DATA.children[0].name}</Text>
              <Text className="text-slate-500">{MOCK_DATA.children[0].nextSession?.type}</Text>
              <Text className="text-blue-600 font-medium mt-2">
                {MOCK_DATA.children[0].nextSession?.date} às {MOCK_DATA.children[0].nextSession?.time}
              </Text>
            </View>
            <Avatar src={MOCK_DATA.children[0].avatarUrl!} size="sm" />
          </View>
        </Card>

        <Text className="text-slate-800 text-lg font-semibold mb-3 animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
          Resumo das Terapias
        </Text>
        <View className="flex-row justify-between mb-6">
          <Card className="flex-1 mr-2 items-center py-4 animate-scale-in opacity-0" style={{ animationDelay: '0.35s' }}>
            <Text className="text-3xl font-bold text-blue-600">{MOCK_DATA.sessions.length}</Text>
            <Text className="text-slate-500 text-xs mt-1">Agendadas</Text>
          </Card>
          <Card className="flex-1 mx-2 items-center py-4 animate-scale-in opacity-0" style={{ animationDelay: '0.45s' }}>
            <Text className="text-3xl font-bold text-green-600">
              {MOCK_DATA.sessions.filter(s => s.status === 'completed').length}
            </Text>
            <Text className="text-slate-500 text-xs mt-1">Concluídas</Text>
          </Card>
          <Card className="flex-1 ml-2 items-center py-4 animate-scale-in opacity-0" style={{ animationDelay: '0.55s' }}>
            <Text className="text-3xl font-bold text-orange-500">
              {MOCK_DATA.children.length}
            </Text>
            <Text className="text-slate-500 text-xs mt-1">Filhos</Text>
          </Card>
        </View>

        {lastEvolution && (
          <>
            <Text className="text-slate-800 text-lg font-semibold mb-3 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
              Última Evolução
            </Text>
            <Card className="mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.65s' }}>
              <View className="flex-row justify-between mb-2">
                <Text className="text-slate-800 font-bold">{lastEvolution.professionalName}</Text>
                <Badge label={lastEvolution.date} color="blue" />
              </View>
              <Text className="text-slate-600 leading-5" numberOfLines={3}>{lastEvolution.description}</Text>
            </Card>
          </>
        )}

        <Text className="text-slate-800 text-lg font-semibold mb-3 animate-fade-in opacity-0" style={{ animationDelay: '0.7s' }}>
          Ações Rápidas
        </Text>
        <View className="flex-row flex-wrap justify-between mb-6">
          <TouchableOpacity className="w-[48%] mb-3 animate-slide-in-left opacity-0" style={{ animationDelay: '0.75s' }} onPress={() => router.push('/agenda')}>
            <Card className="flex-row items-center p-4 bg-blue-50">
              <Text className="text-2xl mr-3">📅</Text>
              <Text className="font-bold text-slate-800">Agendar</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity className="w-[48%] mb-3 animate-slide-in-right opacity-0" style={{ animationDelay: '0.8s' }} onPress={() => router.push('/evolutions')}>
            <Card className="flex-row items-center p-4 bg-green-50">
              <Text className="text-2xl mr-3">📈</Text>
              <Text className="font-bold text-slate-800">Evoluções</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity className="w-[48%] mb-3 animate-slide-in-left opacity-0" style={{ animationDelay: '0.85s' }} onPress={() => router.push('/children')}>
            <Card className="flex-row items-center p-4 bg-purple-50">
              <Text className="text-2xl mr-3">👨‍👩‍👧</Text>
              <Text className="font-bold text-slate-800">Meus Filhos</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity className="w-[48%] mb-3 animate-slide-in-right opacity-0" style={{ animationDelay: '0.9s' }} onPress={() => router.push('/profile')}>
            <Card className="flex-row items-center p-4 bg-orange-50">
              <Text className="text-2xl mr-3">👤</Text>
              <Text className="font-bold text-slate-800">Perfil</Text>
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
