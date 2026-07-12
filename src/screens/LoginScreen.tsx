import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'expo-router';
import { Input } from '../components/ui/Input';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { AuthService } from '../services/api';
import { useAuthStore } from '../store/authStore';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const { setAuthenticated, setUser } = useAuthStore();
  
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await AuthService.login(data.email, data.password);
      setUser(user);
      setAuthenticated(true);
      router.replace('/home');
    } catch (e) {
      alert('Erro ao fazer login');
    }
  };

  return (
    <View className="flex-1 bg-white px-8 justify-center">
      <View className="mb-12">
        <Text className="text-slate-800 text-4xl font-bold mb-2">Bem-vindo!</Text>
        <Text className="text-slate-400 text-lg">Acesse sua conta para continuar</Text>
      </View>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input 
            label="Email"
            placeholder="seu@email.com"
            value={value}
            onChangeText={onChange}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input 
            label="Senha"
            placeholder="••••••••"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={errors.password?.message}
          />
        )}
      />

      <TouchableOpacity 
        onPress={() => router.push('/forgot-password')} 
        className="mb-8 items-end"
      >
        <Text className="text-blue-600 font-medium">Esqueci minha senha</Text>
      </TouchableOpacity>

      <PrimaryButton title="Entrar" onPress={handleSubmit(onSubmit)} />

      <TouchableOpacity 
        onPress={() => router.push('/signup')} 
        className="mt-6 items-center"
      >
        <Text className="text-slate-500">Não tem conta? <Text className="text-blue-600 font-bold">Criar conta</Text></Text>
      </TouchableOpacity>
    </View>
  );
}
