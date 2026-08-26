import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Header } from '../components/ui/Header';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SecondaryButton } from '../components/ui/SecondaryButton';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { MOCK_DATA } from '../services/mockData';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { state, logout } = useAuthStore();
  const user = state.user || MOCK_DATA.user;
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View className="flex-1 bg-slate-50">
      <Header title="Meu Perfil" />
      <Toast visible={toastVisible} message="Perfil atualizado!" type="success" onHide={() => setToastVisible(false)} />

      <ScrollView className="flex-1 px-6 py-4">
        <View className="items-center mb-8">
          <TouchableOpacity className="relative">
            <Image
              source={{ uri: user.avatarUrl || 'https://i.pravatar.cc/150' }}
              className="w-24 h-24 rounded-full border-4 border-white"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}
            />
            <View className="absolute bottom-0 right-0 bg-blue-600 w-8 h-8 rounded-full items-center justify-center border-2 border-white">
              <Text className="text-white text-xs">✎</Text>
            </View>
          </TouchableOpacity>
          <Text className="text-slate-800 text-xl font-bold mt-4">{user.name}</Text>
          <Text className="text-slate-500">{user.email}</Text>
        </View>

        <Text className="text-slate-800 text-lg font-semibold mb-4">Informações da Conta</Text>
        <View className="mb-4">
          <Input label="Nome" placeholder="Nome" value={name} onChangeText={setName} />
          <Input label="Email" placeholder="Email" value={email} onChangeText={setEmail} />
          <Input label="Telefone" placeholder="Telefone" value={phone} onChangeText={setPhone} />
        </View>

        <PrimaryButton title="Salvar Alterações" onPress={() => setToastVisible(true)} />

        <Text className="text-slate-800 text-lg font-semibold mt-8 mb-4">Configurações</Text>

        <TouchableOpacity
          className="bg-white rounded-2xl p-4 flex-row justify-between items-center mb-3 shadow-sm"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
          onPress={() => setShowPasswordModal(true)}
        >
          <View className="flex-row items-center">
            <Text className="text-xl mr-3">🔒</Text>
            <Text className="text-slate-800 font-medium">Alterar Senha</Text>
          </View>
          <Text className="text-slate-400">›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white rounded-2xl p-4 flex-row justify-between items-center mb-3 shadow-sm"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
          onPress={() => setShowSettingsModal(true)}
        >
          <View className="flex-row items-center">
            <Text className="text-xl mr-3">⚙️</Text>
            <Text className="text-slate-800 font-medium">Configurações</Text>
          </View>
          <Text className="text-slate-400">›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white rounded-2xl p-4 flex-row justify-between items-center mb-6 shadow-sm"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
        >
          <View className="flex-row items-center">
            <Text className="text-xl mr-3">🔔</Text>
            <Text className="text-slate-800 font-medium">Notificações</Text>
          </View>
          <Text className="text-slate-400">›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-50 py-4 rounded-2xl flex-row justify-center items-center mb-8"
          onPress={() => {
            logout();
            router.replace('/login');
          }}
        >
          <Text className="text-red-600 font-bold text-lg">Sair do Aplicativo</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        }}
        title="Alterar Senha"
      >
        <Input label="Senha Atual" placeholder="••••••••" secureTextEntry value={currentPassword} onChangeText={setCurrentPassword} />
        <Input label="Nova Senha" placeholder="••••••••" secureTextEntry value={newPassword} onChangeText={setNewPassword} />
        <Input label="Confirmar Nova Senha" placeholder="••••••••" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
        <PrimaryButton
          title="Alterar Senha"
          onPress={() => {
            setShowPasswordModal(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setToastVisible(true);
          }}
        />
      </Modal>

      <Modal
        visible={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title="Configurações"
      >
        <Card className="mb-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-slate-800">Modo Escuro</Text>
            <View className="w-12 h-6 bg-slate-300 rounded-full">
              <View className="w-5 h-5 bg-white rounded-full m-0.5" />
            </View>
          </View>
        </Card>
        <Card className="mb-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-slate-800">Notificações Push</Text>
            <View className="w-12 h-6 bg-blue-600 rounded-full">
              <View className="w-5 h-5 bg-white rounded-full m-0.5 ml-auto" />
            </View>
          </View>
        </Card>
        <Card>
          <View className="flex-row justify-between items-center">
            <Text className="text-slate-800">Idioma</Text>
            <Text className="text-slate-500">Português</Text>
          </View>
        </Card>
      </Modal>
    </View>
  );
}
