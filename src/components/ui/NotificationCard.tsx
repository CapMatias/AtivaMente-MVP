import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from './Card';
import { Badge } from './Badge';

interface NotificationCardProps {
  title: string;
  message: string;
  time: string;
  read?: boolean;
  type?: 'info' | 'success' | 'warning';
  onPress?: () => void;
}

export const NotificationCard = ({ title, message, time, read = false, type = 'info', onPress }: NotificationCardProps) => {
  const badgeColor = type === 'success' ? 'green' : type === 'warning' ? 'orange' : 'blue';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card className={`mb-3 ${!read ? 'border-l-4 border-blue-600' : ''}`}>
        <View className="flex-row justify-between items-start mb-1">
          <Text className="text-slate-800 font-bold flex-1 mr-2">{title}</Text>
          <Badge label={type === 'success' ? 'Concluído' : type === 'warning' ? 'Atenção' : 'Novo'} color={badgeColor} />
        </View>
        <Text className="text-slate-500 text-sm leading-4 mb-2">{message}</Text>
        <Text className="text-slate-400 text-xs">{time}</Text>
      </Card>
    </TouchableOpacity>
  );
};
