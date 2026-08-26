import React from 'react';
import { View, Text } from 'react-native';

interface BadgeProps {
  label: string;
  color?: 'blue' | 'green' | 'red' | 'gray' | 'orange';
  className?: string;
}

const COLOR_MAP = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  red: 'bg-red-100 text-red-600',
  gray: 'bg-slate-100 text-slate-600',
  orange: 'bg-orange-100 text-orange-600',
};

export const Badge = ({ label, color = 'blue', className }: BadgeProps) => {
  return (
    <View className={`px-3 py-1 rounded-full self-start ${COLOR_MAP[color]} ${className || ''}`}>
      <Text className={`text-xs font-bold ${COLOR_MAP[color].split(' ')[1]}`}>{label}</Text>
    </View>
  );
};
