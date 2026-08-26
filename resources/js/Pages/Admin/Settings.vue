<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { Building2, Check, Lock, Mail, MoreHorizontal, Palette, Phone, Plus, User, Users } from 'lucide-vue-next';
import AdminLayout from '../../Layouts/AdminLayout.vue';
import AdminBadge from '../../Components/admin/AdminBadge.vue';
import AdminButton from '../../Components/admin/AdminButton.vue';
import AdminCard from '../../Components/admin/AdminCard.vue';
import FormField from '../../Components/admin/FormField.vue';
import InitialsAvatar from '../../Components/admin/InitialsAvatar.vue';
import { specialtyColor, statusColor } from '../../constants/adminTokens';
import { useToast } from '../../composables/useToast';
import { ADMIN_ROUTES } from '../../services/routes';
import { ADMIN_USER, CLINIC, SYSTEM_PREFERENCES, TEAM_MEMBERS } from '../../services/adminMockData';
import Toast from '../../Components/ui/Toast.vue';
import type { SystemPreference, TeamMember } from '../../types/admin';

defineOptions({
  layout: AdminLayout,
  layoutProps: { title: 'Configurações', subtitle: 'Preferências do sistema' },
});

const props = withDefaults(
  defineProps<{
    clinic?: typeof CLINIC;
    team?: TeamMember[];
    preferences?: SystemPreference[];
    profile?: typeof ADMIN_USER;
  }>(),
  {
    clinic: () => CLINIC,
    team: () => TEAM_MEMBERS,
    preferences: () => SYSTEM_PREFERENCES,
    profile: () => ADMIN_USER,
  },
);

type Tab = 'clinic' | 'users' | 'profile' | 'preferences';

const TABS: { id: Tab; label: string; icon: unknown }[] = [
  { id: 'clinic', label: 'Clínica', icon: Building2 },
  { id: 'users', label: 'Usuários', icon: Users },
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'preferences', label: 'Preferências', icon: Palette },
];

const tab = ref<Tab>('clinic');

const { visible: toastVisible, message: toastMessage, type: toastType, show: showToast } = useToast();

const clinicForm = ref({ ...props.clinic });
const profileForm = ref({
  fullName: props.profile.fullName,
  register: props.profile.register,
  specialty: 'Coordenação',
  email: props.profile.email,
  phone: props.profile.phone,
  password: '',
});
const prefsState = ref(props.preferences.map((p) => p.on));

const SPECIALTY_OPTIONS = ['Coordenação', 'Psicologia', 'Fonoaudiologia'];

function saveClinic() {
  router.put(ADMIN_ROUTES.settingsClinic, { ...clinicForm.value }, {
    preserveScroll: true,
    onSuccess: () => showToast('Dados da clínica salvos!', 'success'),
  });
}

function saveProfile() {
  router.put(ADMIN_ROUTES.settingsProfile, { ...profileForm.value }, {
    preserveScroll: true,
    onSuccess: () => showToast('Perfil atualizado!', 'success'),
  });
}

function togglePreference(index: number) {
  prefsState.value = prefsState.value.map((v, i) => (i === index ? !v : v));
  router.put(
    ADMIN_ROUTES.settingsPreferences,
    { preferences: prefsState.value },
    { preserveScroll: true, preserveState: true },
  );
}
</script>

<template>
  <Head title="Configurações" />

  <Toast v-model:visible="toastVisible" :message="toastMessage" :type="toastType" />

  <div class="flex-1 overflow-y-auto">
    <div class="p-4 lg:p-6 space-y-4 pb-24 lg:pb-6">
      <div>
        <h2 class="text-lg font-bold text-slate-800">Configurações</h2>
        <p class="text-xs text-slate-500">Gerencie as preferências do sistema</p>
      </div>

      <!-- Abas -->
      <div class="flex gap-1 bg-slate-100 rounded-xl p-1 overflow-x-auto" role="tablist">
        <button
          v-for="t in TABS"
          :key="t.id"
          type="button"
          role="tab"
          :aria-selected="tab === t.id"
          class="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
          :class="tab === t.id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
          @click="tab = t.id"
        >
          <component :is="t.icon" :size="13" />{{ t.label }}
        </button>
      </div>

      <!-- Aba: clínica -->
      <AdminCard v-if="tab === 'clinic'" class="p-5">
        <h3 class="text-sm font-bold text-slate-800 mb-4">Dados da Clínica</h3>
        <div class="space-y-4">
          <FormField v-model="clinicForm.name" label="Nome da clínica" />
          <div class="grid grid-cols-2 gap-3">
            <FormField v-model="clinicForm.cnpj" label="CNPJ" />
            <FormField v-model="clinicForm.phone" label="Telefone" />
          </div>
          <FormField v-model="clinicForm.address" label="Endereço" />
          <div class="grid grid-cols-2 gap-3">
            <FormField v-model="clinicForm.email" label="E-mail" type="email" />
            <FormField v-model="clinicForm.site" label="Site" />
          </div>
          <FormField v-model="clinicForm.about" label="Sobre a clínica" as="textarea" :rows="3" />
        </div>
        <div class="flex gap-2 mt-4">
          <AdminButton variant="secondary" size="sm" @click="clinicForm = { ...clinic }">Cancelar</AdminButton>
          <AdminButton size="sm" @click="saveClinic"><Check :size="13" />Salvar</AdminButton>
        </div>
      </AdminCard>

      <!-- Aba: usuários -->
      <AdminCard v-else-if="tab === 'users'" class="overflow-hidden">
        <div class="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 class="text-sm font-bold text-slate-800">Equipe ({{ team.length }})</h3>
          <AdminButton size="sm"><Plus :size="13" />Convidar</AdminButton>
        </div>
        <div
          v-for="member in team"
          :key="member.name"
          class="flex items-center gap-3 p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
        >
          <InitialsAvatar :initials="member.av" :idx="member.ai" size="md" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-slate-800 truncate">{{ member.name }}</p>
            <p class="text-xs text-slate-400">{{ member.role }}</p>
          </div>
          <div class="hidden sm:flex items-center gap-2">
            <AdminBadge :class="specialtyColor(member.specialty)">{{ member.specialty }}</AdminBadge>
            <AdminBadge :class="statusColor(member.status)">{{ member.status }}</AdminBadge>
          </div>
          <button type="button" class="p-1.5 rounded-xl hover:bg-slate-100 transition-colors" :aria-label="`Opções de ${member.name}`">
            <MoreHorizontal :size="14" class="text-slate-400" />
          </button>
        </div>
      </AdminCard>

      <!-- Aba: perfil -->
      <AdminCard v-else-if="tab === 'profile'" class="p-5">
        <h3 class="text-sm font-bold text-slate-800 mb-4">Meu Perfil</h3>
        <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl mb-4">
          <InitialsAvatar :initials="profile.initials" :idx="2" size="lg" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800">{{ profile.name }}</p>
            <p class="text-xs text-slate-500">{{ profile.role }} · {{ profile.register }}</p>
          </div>
          <AdminButton variant="secondary" size="sm">Editar foto</AdminButton>
        </div>

        <div class="space-y-4">
          <FormField v-model="profileForm.fullName" label="Nome completo" />
          <div class="grid grid-cols-2 gap-3">
            <FormField v-model="profileForm.register" label="Registro profissional" />
            <FormField v-model="profileForm.specialty" label="Especialidade" as="select" :options="SPECIALTY_OPTIONS" />
          </div>
          <FormField v-model="profileForm.email" label="E-mail" type="email">
            <template #icon><Mail :size="14" /></template>
          </FormField>
          <FormField v-model="profileForm.phone" label="Telefone">
            <template #icon><Phone :size="14" /></template>
          </FormField>
          <FormField
            v-model="profileForm.password"
            label="Nova senha"
            type="password"
            placeholder="Deixe em branco para manter"
          >
            <template #icon><Lock :size="14" /></template>
          </FormField>
        </div>

        <div class="flex gap-2 mt-4">
          <AdminButton variant="secondary" size="sm">Cancelar</AdminButton>
          <AdminButton size="sm" @click="saveProfile"><Check :size="13" />Salvar Perfil</AdminButton>
        </div>
      </AdminCard>

      <!-- Aba: preferências -->
      <AdminCard v-else class="p-5">
        <h3 class="text-sm font-bold text-slate-800 mb-4">Preferências do Sistema</h3>
        <div class="space-y-1">
          <div
            v-for="(pref, i) in preferences"
            :key="pref.label"
            class="flex items-center justify-between py-3.5 border-b border-slate-50 last:border-0"
          >
            <div class="flex-1 pr-4">
              <p class="text-sm font-semibold text-slate-800">{{ pref.label }}</p>
              <p class="text-xs text-slate-400 mt-0.5">{{ pref.desc }}</p>
            </div>
            <button
              type="button"
              role="switch"
              :aria-checked="prefsState[i]"
              :aria-label="pref.label"
              class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
              :class="prefsState[i] ? 'bg-blue-600' : 'bg-slate-200'"
              @click="togglePreference(i)"
            >
              <span
                class="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform"
                :class="prefsState[i] ? 'translate-x-6' : 'translate-x-1'"
              />
            </button>
          </div>
        </div>
      </AdminCard>
    </div>
  </div>
</template>
