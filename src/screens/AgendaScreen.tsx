import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../components/ui/Header';
import { Card } from '../components/ui/Card';
import { MOCK_DATA } from '../services/mockData';
import { useRouter } from 'expo-router';

export default function AgendaScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-50">
      <Header title="Minha Agenda" />
      
      <ScrollView className="flex-1 px-6 py-4">
        <Card className="mb-6 bg-blue-600 p-6">
          <Text className="text-white text-xl font-bold mb-2">Nova Solicitação</Text>
          <Text className="text-blue-100 mb-4">Deseja agendar uma nova sessão para seu filho?</Text>
          <TouchableOpacity className="bg-white py-3 rounded-xl items-center">
            <Text className="text-blue-600 font-bold">Solicitar Agendamento</Text>
          </TouchableOpacity>
        </Card>

        <Text className="text-slate-800 text-lg font-semibold mb-4">Próximas Sessões</Text>
        {MOCK_DATA.sessions.filter(s => s.status === 'scheduled').map(session => (
          <Card key={session.id} className="mb-4 flex-row justify-between items-center">
            <View>
              <Text className="text-slate-800 font-bold text-lg">{session.type}</Text>
              <Text className="text-slate-500">{session.professionalName}</Text>
              <Text className="text-blue-600 font-medium mt-1">{session.date} • {session.time}</Text>
            </View>
            <TouchableOpacity className="p-2 bg-slate-100 rounded-full">
              <Text className="text-slate-400">✕</Text>
            </TouchableOpacity>
          </Card>
        ))}

        <Text className="text-slate-800 text-lg font-semibold mt-8 mb-4">Histórico</Text>
        {MOCK_DATA.sessions.filter(s => s.status === 'completed').map(session => (
          <Card key={session.id} className="mb-4 opacity-70">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-slate-800 font-bold">{session.type}</Text>
                <Text className="text-slate-400">{session.date}</Text>
              </View>
              <Text className="text-green-600 font-bold text-xs">Concluída</Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
