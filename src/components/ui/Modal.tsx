import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal = ({ visible, onClose, title, children }: ModalProps) => {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 z-50 items-center justify-center">
      <TouchableOpacity className="flex-1 bg-black/50" onPress={onClose} activeOpacity={1} />
      <View 
        className="absolute bg-white rounded-3xl p-6 mx-8 w-[85%] max-h-[80%]"
        style={{ 
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 8 }, 
          shadowOpacity: 0.15, 
          shadowRadius: 24, 
          elevation: 8 
        }}
      >
        {title && <Text className="text-slate-800 text-xl font-bold mb-4">{title}</Text>}
        {children}
      </View>
    </View>
  );
};
