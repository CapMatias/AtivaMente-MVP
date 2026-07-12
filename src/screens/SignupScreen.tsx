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

const signupSchema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupScreen() {
  const router = useRouter();
  const { setAuthenticated, setUser } = useAuthStore();
  
  const { control, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const user = await AuthService.register(data);
      setUser(user);
      setAuthenticated(true);
      router.replace('/home');
    } catch (e) {
      alert('Erro ao criar conta');
    }
  };

  return (
    <View className="flex-1 bg-white px-8 py-12">
      <View className="mb-8">
        <Text className="text-slate-800 text-3xl font-bold mb-2">Crie sua conta</Text>
        <Text className="text-slate-400 text-lg">Junte-se ao AtivaMente</Text>
      </View>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input label="Nome Completo" placeholder="João Silva" value={value} onChangeText={onChange} error={errors.name?.message} />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input label="Email" placeholder="email@exemplo.com" value={value} onChangeText={onChange} error={errors.email?.message} />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <Input label="Telefone" placeholder="(11) 99999-9999" value={value} onChangeText={onChange} error={errors.phone?.message} />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input label="Senha" placeholder="••••••••" secureTextEntry value={value} onChangeText={onChange} error={errors.password?.message} />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <Input label="Confirmar Senha" placeholder="••••••••" secureTextEntry value={value} onChangeText={onChange} error={errors.confirmPassword?.message} />
        )}
      />

      <PrimaryButton title="Criar Conta" onPress={handleSubmit(onSubmit)} className="mt-4" />

      <TouchableOpacity onPress={() => router.push('/login')} className="mt-6 items-center">
        <Text className="text-slate-500">Já tem conta? <Text className="text-blue-600 font-bold">Entrar</Text></Text>
      </TouchableOpacity>
    </View>
  );
}
