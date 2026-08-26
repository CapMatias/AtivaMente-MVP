import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/theme';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const SecondaryButton = ({ title, onPress, loading, disabled, className }: SecondaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      className={`py-4 px-6 rounded-2xl flex-row justify-center items-center border border-blue-600 ${className || ''}`}
      style={{ opacity: loading || disabled ? 0.5 : 1 }}
    >
      {loading ? <ActivityIndicator color={COLORS.primary} /> : (
        <Text className="text-blue-600 font-bold text-lg text-center">{title}</Text>
      )}
    </TouchableOpacity>
  );
};
