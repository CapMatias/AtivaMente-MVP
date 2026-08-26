import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { COLORS } from '../../constants/theme';

interface LoadingSkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  count?: number;
}

export const LoadingSkeleton = ({ width = '100%', height = 20, borderRadius = 8, count = 1 }: LoadingSkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <Animated.View
          key={i}
          style={{ width, height, borderRadius, opacity, backgroundColor: COLORS.gray[200], marginBottom: 8 }}
        />
      ))}
    </View>
  );
};
