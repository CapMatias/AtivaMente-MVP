import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header = ({ title, showBack, onBack }: HeaderProps) => {
  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
      <View className="flex-row items-center">
        {showBack && (
          <TouchableOpacity onPress={onBack} className="mr-4 p-2 rounded-full bg-slate-100">
             {/* Icon would go here */}
             <Text className="text-slate-600">←</Text>
          </TouchableOpacity>
        )}
        <Text className="text-xl font-bold text-slate-800">{title}</Text>
      </View>
    </View>
  );
};
