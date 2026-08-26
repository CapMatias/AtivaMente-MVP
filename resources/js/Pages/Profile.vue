<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import * as z from 'zod';
import AppLayout from '../Layouts/AppLayout.vue';
import Card from '../Components/ui/Card.vue';
import Header from '../Components/ui/Header.vue';
import Input from '../Components/ui/Input.vue';
import Modal from '../Components/ui/Modal.vue';
import PrimaryButton from '../Components/ui/PrimaryButton.vue';
import Toast from '../Components/ui/Toast.vue';
import { useToast } from '../composables/useToast';
import { useZodForm } from '../composables/useZodForm';
import { AuthService } from '../services/api';
import { MOCK_DATA } from '../services/mockData';
import { ROUTES } from '../services/routes';
import { useAuthStore } from '../stores/auth';
import type { User } from '../types';

defineOptions({ layout: AppLayout });

const props = withDefaults(defineProps<{ user?: User }>(), {
  user: () => MOCK_DATA.user,
});

const auth = useAuthStore();
const { visible: toastVisible, message: toastMessage, type: toastType, show: showToast } = useToast();

const showPasswordModal = ref(false);
const showSettingsModal = ref(false);

const profileSchema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone inválido'),
});

const { form: profileForm, handleSubmit: handleProfileSubmit } = useZodForm(profileSchema, {
  name: props.user.name,
  email: props.user.email,
  phone: props.user.phone,
});

const saveProfile = handleProfileSubmit((f) =>
  f.put(ROUTES.profileUpdate, {
    preserveScroll: true,
    onSuccess: () => showToast('Perfil atualizado!', 'success'),
    onError: () => showToast('Não foi possível salvar as alterações.', 'error'),
  }),
);

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Informe a senha atual'),
    newPassword: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

const { form: passwordForm, handleSubmit: handlePasswordSubmit } = useZodForm(passwordSchema, {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const changePassword = handlePasswordSubmit((f) =>
  f.put(ROUTES.passwordUpdate, {
    preserveScroll: true,
    onSuccess: () => {
      f.reset();
      showPasswordModal.value = false;
      showToast('Senha alterada com sucesso!', 'success');
    },
  }),
);

function closePasswordModal() {
  passwordForm.reset();
  passwordForm.clearErrors();
}

function logout() {
  // O store limpa o estado local; quem encerra a sessão é o servidor.
  auth.logout();
  AuthService.logout();
}

type SettingAction = 'password' | 'settings' | 'notifications';

const SETTINGS_ROWS: { icon: string; label: string; action: SettingAction }[] = [
  { icon: '🔒', label: 'Alterar Senha', action: 'password' },
  { icon: '⚙️', label: 'Configurações', action: 'settings' },
  { icon: '🔔', label: 'Notificações', action: 'notifications' },
];

function openSetting(action: SettingAction) {
  if (action === 'password') showPasswordModal.value = true;
  else if (action === 'settings') showSettingsModal.value = true;
}
</script>

<template>
  <Head title="Meu Perfil" />

  <Header title="Meu Perfil" />
  <Toast v-model:visible="toastVisible" :message="toastMessage" :type="toastType" />

  <div class="px-6 py-4">
    <div class="flex flex-col items-center mb-8">
      <button type="button" class="relative" aria-label="Alterar foto de perfil">
        <img
          :src="user.avatarUrl || 'https://i.pravatar.cc/150'"
          :alt="user.name"
          class="w-24 h-24 rounded-full border-4 border-white object-cover shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
        />
        <span
          class="absolute bottom-0 right-0 bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white text-white text-xs"
          aria-hidden="true"
        >
          ✎
        </span>
      </button>
      <p class="text-slate-800 text-xl font-bold mt-4">{{ user.name }}</p>
      <p class="text-slate-500">{{ user.email }}</p>
    </div>

    <h2 class="text-slate-800 text-lg font-semibold mb-4">Informações da Conta</h2>
    <form novalidate @submit.prevent="saveProfile">
      <Input v-model="profileForm.name" label="Nome" placeholder="Nome" :error="profileForm.errors.name" />
      <Input v-model="profileForm.email" label="Email" type="email" placeholder="Email" :error="profileForm.errors.email" />
      <Input v-model="profileForm.phone" label="Telefone" type="tel" placeholder="Telefone" :error="profileForm.errors.phone" />

      <PrimaryButton title="Salvar Alterações" type="submit" :loading="profileForm.processing" />
    </form>

    <h2 class="text-slate-800 text-lg font-semibold mt-8 mb-4">Configurações</h2>

    <button
      v-for="row in SETTINGS_ROWS"
      :key="row.label"
      type="button"
      class="w-full bg-white rounded-2xl p-4 flex flex-row justify-between items-center mb-3 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-colors hover:bg-slate-50"
      @click="openSetting(row.action)"
    >
      <span class="flex flex-row items-center">
        <span class="text-xl mr-3" aria-hidden="true">{{ row.icon }}</span>
        <span class="text-slate-800 font-medium">{{ row.label }}</span>
      </span>
      <span class="text-slate-400" aria-hidden="true">›</span>
    </button>

    <button
      type="button"
      class="w-full bg-red-50 py-4 rounded-2xl flex flex-row justify-center items-center mt-3 mb-8 text-red-600 font-bold text-lg transition-colors hover:bg-red-100"
      @click="logout"
    >
      Sair do Aplicativo
    </button>
  </div>

  <Modal v-model:open="showPasswordModal" title="Alterar Senha" @closed="closePasswordModal">
    <form novalidate @submit.prevent="changePassword">
      <Input
        v-model="passwordForm.currentPassword"
        label="Senha Atual"
        secure
        placeholder="••••••••"
        :error="passwordForm.errors.currentPassword"
      />
      <Input
        v-model="passwordForm.newPassword"
        label="Nova Senha"
        secure
        placeholder="••••••••"
        :error="passwordForm.errors.newPassword"
      />
      <Input
        v-model="passwordForm.confirmPassword"
        label="Confirmar Nova Senha"
        secure
        placeholder="••••••••"
        :error="passwordForm.errors.confirmPassword"
      />
      <PrimaryButton title="Alterar Senha" type="submit" :loading="passwordForm.processing" />
    </form>
  </Modal>

  <Modal v-model:open="showSettingsModal" title="Configurações">
    <Card class="mb-3">
      <div class="flex flex-row justify-between items-center">
        <span class="text-slate-800">Modo Escuro</span>
        <span class="w-12 h-6 bg-slate-300 rounded-full block">
          <span class="w-5 h-5 bg-white rounded-full m-0.5 block" />
        </span>
      </div>
    </Card>
    <Card class="mb-3">
      <div class="flex flex-row justify-between items-center">
        <span class="text-slate-800">Notificações Push</span>
        <span class="w-12 h-6 bg-blue-600 rounded-full block">
          <span class="w-5 h-5 bg-white rounded-full m-0.5 ml-auto block" />
        </span>
      </div>
    </Card>
    <Card>
      <div class="flex flex-row justify-between items-center">
        <span class="text-slate-800">Idioma</span>
        <span class="text-slate-500">Português</span>
      </div>
    </Card>
  </Modal>
</template>
