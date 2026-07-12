import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../components/ui/Header';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { MOCK_DATA } from '../services/mockData';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ChildProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const child = MOCK_DATA.children.find(c => c.id === id);

  if (!child) return <View className="flex-1 items-center justify-center"><Text>Criança não encontrada</Text></View>;

  return (
    <View className="flex-1 bg-slate-50">
      <Header title="Perfil da Criança" showBack onPress={() => router.back()} />
      
      <ScrollView className="flex-1 px-6 py-4">
        <View className="items-center mb-8">
          <Avatar src={child.avatarUrl!} size="lg" />
          <Text className="text-slate-800 text-2xl font-bold mt-4">{child.name}</Text>
          <Text className="text-slate-500">{child.diagnosis} • {child.age} anos</Text>
        </View>

        <Text className="text-slate-800 text-lg font-semibold mb-4">Informações Gerais</Text>
        <Card className="mb-6">
          <View className="space-y-3">
            <DetailItem label="Responsável" value={MOCK_DATA.user.name} />
            <DetailItem label="Próxima Terapia" value={`${child.nextSession?.type} - ${child.nextSession?.date}`} />
          </View>
        </Card>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-slate-800 text-lg font-semibold">Evoluções Recentes</Text>
          <TouchableOpacity onPress={() => router.push('/evolutions')}>
            <Text className="text-blue-600 font-bold">Ver todas</Text>
          </TouchableOpacity>
        </View>

        {MOCK_DATA.evolutions.filter(e => e.childId === child.id).map(evo => (
          <Card key={evo.id} className="mb-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-slate-800 font-bold">{evo.professionalName}</Text>
              <Text className="text-slate-400 text-xs">{evo.date}</Text>
            </View>
            <Text className="text-slate-600 leading-5">{evo.description}</Text>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

function DetailItem({ label, value }: { label: string, value: string | undefined }) {
  return (
    <View className="flex-row justify-between py-2 border-b border-slate-100 last:border-0">
      <Text className="text-slate-400">{label}</Text>
      <Text className="text-slate-800 font-medium">{value || 'Não informado'}</Text>
    </View>
  );
}
