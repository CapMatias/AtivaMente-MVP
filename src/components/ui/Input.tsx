import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';

interface InputProps {
  label?: string;
  placeholder: string;
  value?: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  className?: string;
}

export const Input = ({ label, placeholder, value, onChangeText, secureTextEntry, error, className }: InputProps) => {
  // Campos de senha ganham o botão de mostrar/ocultar; os demais ficam como estavam.
  const [visible, setVisible] = React.useState(false);
  const hidden = Boolean(secureTextEntry) && !visible;

  return (
    <View className={`mb-4 ${className}`}>
      {label && <Text className="text-slate-600 mb-2 font-medium">{label}</Text>}
      <View>
        <TextInput
          value={value ?? ''}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={hidden}
          className={`p-4 rounded-2xl border bg-white text-slate-800 ${error ? 'border-red-500' : 'border-slate-200'}`}
          style={{ borderColor: error ? '#EF4444' : COLORS.gray[200], paddingRight: secureTextEntry ? 88 : undefined }}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setVisible((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={{ position: 'absolute', right: 16, top: 0, bottom: 0, justifyContent: 'center' }}
          >
            <Text className="text-blue-600 font-medium">{visible ? 'Ocultar' : 'Mostrar'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};
