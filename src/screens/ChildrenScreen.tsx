import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../components/ui/Header';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { MOCK_DATA } from '../services/mockData';
import { useRouter } from 'expo-router';

export default function ChildrenScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-50">
      <Header title="Meus Filhos" />
      
      <ScrollView className="flex-1 px-6 py-4">
        {MOCK_DATA.children.map((child) => (
          <Card 
            key={child.id} 
            className="mb-4" 
            onPress={() => router.push(`/child/${child.id}`)}
          >
            <View className="flex-row items-center">
              <Avatar src={child.avatarUrl!} size="md" />
              <View className="ml-4 flex-1">
                <Text className="text-slate-800 text-xl font-bold">{child.name}</Text>
                <Text className="text-slate-500">{child.age} anos • {child.diagnosis}</Text>
                <View className="mt-2 py-1 px-2 bg-blue-100 rounded-lg self-start">
                  <Text className="text-blue-600 text-xs font-bold">
                    Próxima: {child.nextSession?.date}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
