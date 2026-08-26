import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '../components/ui/PrimaryButton';

const ONBOARDING_STEPS = [
  {
    title: 'Acompanhe o desenvolvimento do seu filho.',
    description: 'Tenha acesso a todas as evoluções e relatórios em um só lugar.',
    image: 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png',
  },
  {
    title: 'Agende terapias de forma rápida.',
    description: 'Solicite novos horários e organize a agenda do seu filho com facilidade.',
    image: 'https://cdn-icons-png.flaticon.com/512/2693/2693507.png',
  },
  {
    title: 'Receba evoluções diretamente no app.',
    description: 'Fique por dentro de cada conquista do seu filho em tempo real.',
    image: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const nextStep = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace('/login');
    }
  };

  return (
    <View className="flex-1 bg-white px-8 justify-center">
      <View className="flex-1 justify-center items-center">
        <Image
          key={currentStep}
          source={{ uri: ONBOARDING_STEPS[currentStep].image }}
          className="w-64 h-64 mb-12 animate-scale-in opacity-0"
        />
        <View className="items-center animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
          <Text className="text-slate-800 text-2xl font-bold text-center mb-4">
            {ONBOARDING_STEPS[currentStep].title}
          </Text>
          <Text className="text-slate-500 text-center text-lg mb-12 leading-6">
            {ONBOARDING_STEPS[currentStep].description}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-12">
        <View className="flex-row space-x-2">
          {ONBOARDING_STEPS.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </View>
        <PrimaryButton
          title={currentStep === ONBOARDING_STEPS.length - 1 ? 'Começar' : 'Próximo'}
          onPress={nextStep}
          className="w-32"
        />
      </View>
    </View>
  );
}
