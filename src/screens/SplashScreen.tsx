import React from 'react';
import { View, Text } from 'react-native';
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
      <View className="items-center animate-bounce-in opacity-0">
        <View className="w-24 h-24 bg-blue-600 rounded-3xl items-center justify-center mb-4 shadow-lg">
          <Text className="text-white text-4xl font-bold">A</Text>
        </View>
        <Text className="text-slate-800 text-3xl font-bold tracking-tight animate-fade-in-down opacity-0">
          AtivaMente
        </Text>
        <Text className="text-slate-400 text-lg mt-2 animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
          Cuidado e Evolução
        </Text>
      </View>
    </View>
  );
}
