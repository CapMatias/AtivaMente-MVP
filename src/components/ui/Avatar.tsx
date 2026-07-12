import React from 'react';
import { View, Image } from 'react-native';

interface AvatarProps {
  src: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
};

export const Avatar = ({ src, size = 'md', className }: AvatarProps) => {
  return (
    <View className={`${SIZE_MAP[size]} rounded-full overflow-hidden border-2 border-white shadow-sm ${className}`}>
      <Image 
        source={{ uri: src }} 
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
  );
};
