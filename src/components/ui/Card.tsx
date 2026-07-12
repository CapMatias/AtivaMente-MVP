import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export const Card = ({ children, className, onPress }: CardProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      className={`bg-white rounded-2xl p-4 shadow-sm ${className}`}
      style={{ 
        backgroundColor: COLORS.white, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.05, 
        shadowRadius: 8,
        elevation: 2 
      }}
    >
      {children}
    </TouchableOpacity>
  );
};
