import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../components/ui/Header';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Calendar } from '../components/ui/Calendar';
import { BottomSheet } from '../components/ui/BottomSheet';
import { Toast } from '../components/ui/Toast';
import { MOCK_DATA } from '../services/mockData';
import { useRouter } from 'expo-router';

type FilterType = 'all' | 'scheduled' | 'completed';

export default function AgendaScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [showScheduleSheet, setShowScheduleSheet] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const markedDates = MOCK_DATA.sessions.map(s => s.date);

  const filteredSessions = MOCK_DATA.sessions.filter(s => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  return (
    <View className="flex-1 bg-slate-50">
      <Header title="Minha Agenda" />
      <Toast visible={toastVisible} message="Solicitação enviada com sucesso!" type="success" onHide={() => setToastVisible(false)} />

      <ScrollView className="flex-1 px-6 py-4">
        <Card className="mb-6 bg-blue-600 p-6">
          <Text className="text-white text-xl font-bold mb-2">Nova Solicitação</Text>
          <Text className="text-blue-100 mb-4">Deseja agendar uma nova sessão para seu filho?</Text>
          <TouchableOpacity
            className="bg-white py-3 rounded-xl items-center"
            onPress={() => setShowScheduleSheet(true)}
          >
            <Text className="text-blue-600 font-bold">Solicitar Agendamento</Text>
          </TouchableOpacity>
        </Card>

        <Calendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          markedDates={markedDates}
        />

        <View className="flex-row mb-4 gap-2">
          {(['all', 'scheduled', 'completed'] as FilterType[]).map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              className={`px-4 py-2 rounded-full ${filter === f ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <Text className={`text-sm font-medium ${filter === f ? 'text-white' : 'text-slate-600'}`}>
                {f === 'all' ? 'Todas' : f === 'scheduled' ? 'Agendadas' : 'Concluídas'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-slate-800 text-lg font-semibold mb-3">
          {filter === 'scheduled' ? 'Próximas Sessões' : filter === 'completed' ? 'Histórico' : 'Todas as Sessões'}
        </Text>

        {filteredSessions.length === 0 ? (
          <View className="items-center py-8">
            <Text className="text-4xl mb-3">📅</Text>
            <Text className="text-slate-400">Nenhuma sessão encontrada</Text>
          </View>
        ) : (
          filteredSessions.map(session => (
            <Card key={session.id} className="mb-4">
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-slate-800 font-bold text-lg">{session.type}</Text>
                    <Badge
                      label={session.status === 'scheduled' ? 'Agendada' : 'Concluída'}
                      color={session.status === 'scheduled' ? 'blue' : 'green'}
                      className="ml-2"
                    />
                  </View>
                  <Text className="text-slate-500">{session.professionalName}</Text>
                  <Text className="text-blue-600 font-medium mt-1">{session.date} • {session.time}</Text>
                </View>
                {session.status === 'scheduled' && (
                  <TouchableOpacity className="p-2 bg-red-50 rounded-full">
                    <Text className="text-red-500 text-sm">✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            </Card>
          ))
        )}
      </ScrollView>

      <BottomSheet
        visible={showScheduleSheet}
        onClose={() => setShowScheduleSheet(false)}
        title="Solicitar Agendamento"
      >
        <Text className="text-slate-500 mb-4">Selecione o tipo de terapia e o horário desejado.</Text>
        {MOCK_DATA.children.map(child => (
          <Card key={child.id} className="mb-3">
            <Text className="text-slate-800 font-bold">{child.name}</Text>
            <Text className="text-slate-500 text-sm">{child.diagnosis}</Text>
          </Card>
        ))}
        <TouchableOpacity
          className="bg-blue-600 py-4 rounded-2xl items-center mt-4"
          onPress={() => {
            setShowScheduleSheet(false);
            setToastVisible(true);
          }}
        >
          <Text className="text-white font-bold">Confirmar Solicitação</Text>
        </TouchableOpacity>
      </BottomSheet>
    </View>
  );
}
