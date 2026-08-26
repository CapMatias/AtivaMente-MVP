import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../components/ui/Header';
import { Timeline } from '../components/ui/Timeline';
import { Avatar } from '../components/ui/Avatar';
import { MOCK_DATA } from '../services/mockData';
import { useRouter } from 'expo-router';

export default function EvolutionsScreen() {
  const router = useRouter();
  const [selectedChild, setSelectedChild] = useState<string>('all');

  const childrenOptions = [{ id: 'all', name: 'Todos' }, ...MOCK_DATA.children];

  const filteredEvolutions = selectedChild === 'all'
    ? MOCK_DATA.evolutions
    : MOCK_DATA.evolutions.filter(e => e.childId === selectedChild);

  const timelineItems = filteredEvolutions.map(evo => ({
    id: evo.id,
    date: evo.date,
    title: evo.professionalName,
    description: evo.description,
    photos: evo.photos,
    attachments: evo.attachments,
  }));

  return (
    <View className="flex-1 bg-slate-50">
      <Header title="Evoluções" />

      <ScrollView className="flex-1 px-6 py-4">
        <Text className="text-slate-800 text-lg font-semibold mb-3">Filtrar por filho</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          <View className="flex-row gap-2">
            {childrenOptions.map((child) => (
              <TouchableOpacity
                key={child.id}
                onPress={() => setSelectedChild(child.id)}
                className={`flex-row items-center px-4 py-2 rounded-full ${selectedChild === child.id ? 'bg-blue-600' : 'bg-white border border-slate-200'}`}
              >
                {child.id !== 'all' && (
                  <Avatar src={(child as any).avatarUrl || ''} size="sm" className="w-6 h-6 mr-2" />
                )}
                <Text className={`text-sm font-medium ${selectedChild === child.id ? 'text-white' : 'text-slate-600'}`}>
                  {child.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text className="text-slate-800 text-lg font-semibold mb-4">Linha do Tempo</Text>

        {timelineItems.length === 0 ? (
          <View className="items-center py-12">
            <Text className="text-5xl mb-4">📈</Text>
            <Text className="text-slate-800 text-lg font-bold text-center mb-2">Nenhuma evolução</Text>
            <Text className="text-slate-400 text-center">As evoluções dos profissionais aparecerão aqui.</Text>
          </View>
        ) : (
          <Timeline items={timelineItems} />
        )}
      </ScrollView>
    </View>
  );
}
