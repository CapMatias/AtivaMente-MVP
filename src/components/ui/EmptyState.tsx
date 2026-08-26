import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../../constants/theme';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
}

export const EmptyState = ({ title, description, icon }: EmptyStateProps) => {
  return (
    <View className="flex-1 items-center justify-center py-12 px-6">
      {icon && <Text className="text-5xl mb-4">{icon}</Text>}
      <Text className="text-slate-800 text-lg font-bold text-center mb-2">{title}</Text>
      {description && (
        <Text className="text-slate-400 text-center leading-5">{description}</Text>
      )}
    </View>
  );
};
