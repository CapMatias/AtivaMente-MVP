import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Header } from '../components/ui/Header';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { MOCK_DATA } from '../services/mockData';
import { useAuthStore } from '../store/authStore';

export default function ProfileScreen() {
  const { state } = useAuthStore();
  const user = state.user || MOCK_DATA.user;

  return (
    <View className="flex-1 bg-slate-50">
      <Header title="Meu Perfil" />
      
      <ScrollView className="flex-1 px-6 py-4">
        <View className="items-center mb-8">
          <TouchableOpacity className="relative">
            <Image 
              source={{ uri: user.avatarUrl || 'https://i.pravatar.cc/150' }} 
              className="w-24 h-24 rounded-full border-4 border-white shadow-sm"
            />
            <View className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full border-2 border-white">
              <Text className="text-white text-xs">✎</Text>
            </View>
          </TouchableOpacity>
          <Text className="text-slate-800 text-xl font-bold mt-4">{user.name}</Text>
          <Text className="text-slate-500">{user.email}</Text>
        </View>

        <Text className="text-slate-800 text-lg font-semibold mb-4">Informações da Conta</Text>
        <View className="space-y-4 mb-8">
          <Input label="Nome" placeholder="Nome" value={user.name} onChangeText={() => {}} />
          <Input label="Email" placeholder="Email" value={user.email} onChangeText={() => {}} />
          <Input label="Telefone" placeholder="Telefone" value={user.phone} onChangeText={() => {}} />
        </View>

        <PrimaryButton title="Salvar Alterações" onPress={() => alert('Perfil atualizado!')} />

        <TouchableOpacity 
          className="mt-8 p-4 bg-red-50 rounded-2xl flex-row justify-center items-center"
          onPress={() => alert('Saindo...')}
        >
          <Text className="text-red-600 font-bold">Sair do Aplicativo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
