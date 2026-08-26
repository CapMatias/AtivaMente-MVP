import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BottomSheet = ({ visible, onClose, title, children }: BottomSheetProps) => {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 z-50">
      <TouchableOpacity className="flex-1 bg-black/50" onPress={onClose} activeOpacity={1} />
      <View 
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 pb-10"
        style={{ 
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: -4 }, 
          shadowOpacity: 0.1, 
          shadowRadius: 16, 
          elevation: 8 
        }}
      >
        <View className="w-12 h-1 bg-slate-200 rounded-full self-center mb-4" />
        {title && <Text className="text-slate-800 text-xl font-bold mb-4">{title}</Text>}
        {children}
      </View>
    </View>
  );
};
