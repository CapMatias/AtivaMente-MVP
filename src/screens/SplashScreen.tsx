import React from 'react';
import { View, Text, Image } from 'react-native';
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
        <Image
          source={require('../../assets/images/logo.png')}
          style={{ width: 112, height: 112, marginBottom: 16 }}
          resizeMode="contain"
          accessibilityLabel="Logo do AtivaMente"
        />
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
