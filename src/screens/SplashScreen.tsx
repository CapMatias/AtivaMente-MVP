import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Animated.View entering={FadeIn.duration(1000)} className="items-center">
        <View className="w-24 h-24 bg-blue-600 rounded-3xl items-center justify-center mb-4 shadow-lg">
          <Text className="text-white text-4xl font-bold">A</Text>
        </View>
        <Text className="text-slate-800 text-3xl font-bold tracking-tight">AtivaMente</Text>
        <Text className="text-slate-400 text-lg mt-2">Cuidado e Evolução</Text>
      </Animated.View>
    </View>
  );
}
