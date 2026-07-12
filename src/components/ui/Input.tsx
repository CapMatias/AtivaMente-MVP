import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { COLORS } from '../../constants/theme';

interface InputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  className?: string;
}

export const Input = ({ label, placeholder, value, onChangeText, secureTextEntry, error, className }: InputProps) => {
  return (
    <View className={`mb-4 ${className}`}>
      {label && <Text className="text-slate-600 mb-2 font-medium">{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        className={`p-4 rounded-2xl border bg-white text-slate-800 ${error ? 'border-red-500' : 'border-slate-200'}`}
        style={{ borderColor: error ? '#EF4444' : COLORS.gray[200] }}
      />
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};
