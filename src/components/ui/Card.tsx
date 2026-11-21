import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  /** animationDelay é CSS da web: escalona as animações de entrada (animate-*) dos cards. */
  style?: ViewStyle & { animationDelay?: string };
}

export const Card = ({ children, className = '', onPress, style }: CardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      className={`bg-white rounded-2xl p-4 shadow-sm ${className}`}
      style={[
        {
          backgroundColor: COLORS.white,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        },
        style as ViewStyle,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};
