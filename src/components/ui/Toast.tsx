import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../../constants/theme';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  visible: boolean;
  onHide?: () => void;
}

const BG_MAP = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-600',
};

export const Toast = ({ message, type = 'info', visible, onHide }: ToastProps) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => onHide?.(), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View className={`absolute top-16 left-6 right-6 px-4 py-3 rounded-2xl shadow-lg z-50 ${BG_MAP[type]}`}>
      <Text className="text-white font-medium text-center">{message}</Text>
    </View>
  );
};
