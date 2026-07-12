import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'expo-router';
import { Input } from '../components/ui/Input';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { AuthService } from '../services/api';

const recoverySchema = z.object({
  email: z.string().email('Email inválido'),
});

type RecoveryFormData = z.infer<typeof recoverySchema>;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<RecoveryFormData>({
    resolver: zodResolver(recoverySchema),
  });

  const onSubmit = async (data: RecoveryFormData) => {
    const success = await AuthService.recoverPassword(data.email);
    if (success) {
      alert('E-mail de recuperação enviado!');
      router.replace('/login');
    }
  };

  return (
    <View className="flex-1 bg-white px-8 justify-center">
      <View className="mb-12">
        <Text className="text-slate-800 text-3xl font-bold mb-2">Recuperar Senha</Text>
        <Text className="text-slate-400 text-lg">Insira seu e-mail para redefinir sua senha</Text>
      </View>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input label="Email" placeholder="seu@email.com" value={value} onChangeText={onChange} />
        )}
      />

      <PrimaryButton title="Enviar Link" onPress={handleSubmit(onSubmit)} />

      <TouchableOpacity onPress={() => router.replace('/login')} className="mt-6 items-center">
        <Text className="text-slate-500">Voltar para o <Text className="text-blue-600 font-bold">Login</Text></Text>
      </TouchableOpacity>
    </View>
  );
}
