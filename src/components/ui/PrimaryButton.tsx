import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const PrimaryButton = ({ title, onPress, loading, disabled, className }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={loading || disabled}
      className={`py-4 px-6 rounded-2xl flex-row justify-center items-center ${className || 'bg-blue-600'}`}
      style={{ backgroundColor: loading || disabled ? COLORS.gray[300] : COLORS.primary }}
    >
      {loading ? <ActivityIndicator color={COLORS.white} /> : (
        <Text className="text-white font-bold text-lg text-center">{title}</Text>
      )}
    </TouchableOpacity>
  );
};
