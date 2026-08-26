import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header } from '../components/ui/Header';
import { NotificationCard } from '../components/ui/NotificationCard';

const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Nova evolução registrada',
    message: 'Dra. Ana Beatriz registrou uma nova evolução de Lucas sobre a sessão de Terapia Ocupacional.',
    time: 'Há 2 horas',
    read: false,
    type: 'info' as const,
  },
  {
    id: 'n2',
    title: 'Sessão confirmada',
    message: 'A sessão de Fonoaudiologia de Maya para 16/07 foi confirmada pelo Dr. Marcos Lima.',
    time: 'Há 5 horas',
    read: false,
    type: 'success' as const,
  },
  {
    id: 'n3',
    title: 'Lembrete de sessão',
    message: 'Amanhã Lucas tem sessão de Terapia Ocupacional às 14:00 com Dra. Ana Beatriz.',
    time: 'Ontem',
    read: true,
    type: 'warning' as const,
  },
  {
    id: 'n4',
    title: 'Relatório disponível',
    message: 'O relatório mensal de julho de Lucas está disponível para visualização.',
    time: '10/07/2026',
    read: true,
    type: 'info' as const,
  },
  {
    id: 'n5',
    title: 'Pagamento confirmado',
    message: 'O pagamento da sessão de 01/07 de Lucas foi confirmado com sucesso.',
    time: '02/07/2026',
    read: true,
    type: 'success' as const,
  },
];

export default function NotificationsScreen() {
  return (
    <View className="flex-1 bg-slate-50">
      <Header title="Notificações" />

      <ScrollView className="flex-1 px-6 py-4">
        {MOCK_NOTIFICATIONS.length === 0 ? (
          <View className="items-center py-12">
            <Text className="text-5xl mb-4">🔔</Text>
            <Text className="text-slate-800 text-lg font-bold text-center mb-2">Sem notificações</Text>
            <Text className="text-slate-400 text-center">Quando houver novidades, elas aparecerão aqui.</Text>
          </View>
        ) : (
          MOCK_NOTIFICATIONS.map(notification => (
            <NotificationCard
              key={notification.id}
              title={notification.title}
              message={notification.message}
              time={notification.time}
              read={notification.read}
              type={notification.type}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
