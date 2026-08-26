<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { ArrowLeft, Brain, Edit2, MoreHorizontal, Phone, Plus, User } from 'lucide-vue-next';
import AdminLayout from '../../../Layouts/AdminLayout.vue';
import AdminBadge from '../../../Components/admin/AdminBadge.vue';
import AdminButton from '../../../Components/admin/AdminButton.vue';
import AdminCard from '../../../Components/admin/AdminCard.vue';
import InitialsAvatar from '../../../Components/admin/InitialsAvatar.vue';
import AreaChart from '../../../Components/admin/charts/AreaChart.vue';
import { lastName, specialtyColor, statusColor } from '../../../constants/adminTokens';
import { ADMIN_ROUTES } from '../../../services/routes';
import { APPOINTMENTS_TODAY, CLINICAL_EVOLUTIONS, PATIENTS } from '../../../services/adminMockData';
import type { Appointment, ClinicalEvolution, Patient } from '../../../types/admin';

defineOptions({
  layout: AdminLayout,
  layoutProps: { title: 'Perfil do Paciente' },
});

const props = withDefaults(
  defineProps<{
    patient?: Patient;
    evolutions?: ClinicalEvolution[];
    appointments?: Appointment[];
  }>(),
  {
    patient: () => PATIENTS[0],
    evolutions: () => CLINICAL_EVOLUTIONS,
    appointments: () => APPOINTMENTS_TODAY,
  },
);

type Tab = 'overview' | 'evolutions' | 'sessions';
const tab = ref<Tab>('overview');

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Visão Geral' },
  { id: 'evolutions', label: 'Evoluções' },
  { id: 'sessions', label: 'Sessões' },
];

const patientEvolutions = computed(() => {
  const own = props.evolutions.filter((e) => e.childId === props.patient.id);
  return own.length ? own : props.evolutions.slice(0, 2);
});

const birthDate = computed(() => new Date(props.patient.dob).toLocaleDateString('pt-BR'));

const summary = computed(() => [
  { v: String(props.patient.sessions), l: 'Sessões' },
  { v: String(patientEvolutions.value.length || 4), l: 'Evoluções' },
  { v: '8 meses', l: 'Na clínica' },
]);

const contactRows = computed(() => [
  { icon: User, label: 'Responsável', value: props.patient.responsible },
  { icon: Phone, label: 'Telefone', value: props.patient.phone },
  { icon: Brain, label: 'Terapeuta', value: props.patient.therapist },
]);

const PROGRESS = [
  { m: 'Mar', v: 3 },
  { m: 'Abr', v: 5 },
  { m: 'Mai', v: 6 },
  { m: 'Jun', v: 8 },
];
</script>

<template>
  <Head :title="patient.name" />

  <div class="flex-1 overflow-y-auto">
    <div class="p-4 lg:p-6 space-y-4 pb-24 lg:pb-6">
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="p-2 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Voltar"
          @click="router.visit(ADMIN_ROUTES.children)"
        >
          <ArrowLeft :size="17" class="text-slate-600" />
        </button>
        <h2 class="text-base font-bold text-slate-800 flex-1">Perfil do Paciente</h2>
        <AdminButton variant="secondary" size="sm" @click="router.visit(ADMIN_ROUTES.childCreate)">
          <Edit2 :size="13" />Editar
        </AdminButton>
      </div>

      <!-- Cartão do paciente -->
      <AdminCard class="p-5">
        <div class="flex gap-4 items-start">
          <div class="relative">
            <InitialsAvatar :initials="patient.avatar" :idx="patient.id - 1" size="lg" />
            <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-base font-bold text-slate-800">{{ patient.name }}</h3>
            <p class="text-xs text-slate-500">{{ patient.age }} anos · {{ birthDate }}</p>
            <div class="flex flex-wrap gap-1.5 mt-2">
              <AdminBadge :class="specialtyColor(patient.specialty)">{{ patient.specialty }}</AdminBadge>
              <AdminBadge :class="statusColor(patient.status)">{{ patient.status }}</AdminBadge>
              <AdminBadge class="bg-slate-50 text-slate-600 border-slate-200">{{ patient.diagnosis }}</AdminBadge>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-50">
          <div v-for="s in summary" :key="s.l" class="text-center">
            <p class="text-lg font-bold text-slate-800">{{ s.v }}</p>
            <p class="text-xs text-slate-400">{{ s.l }}</p>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-slate-50 space-y-2.5">
          <div v-for="row in contactRows" :key="row.label" class="flex items-center gap-3">
            <div class="w-7 h-7 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <component :is="row.icon" :size="13" class="text-slate-400" />
            </div>
            <div class="min-w-0">
              <p class="text-[10px] text-slate-400">{{ row.label }}</p>
              <p class="text-sm font-medium text-slate-700 truncate">{{ row.value }}</p>
            </div>
          </div>
        </div>
      </AdminCard>

      <!-- Abas -->
      <div class="flex bg-slate-100 rounded-xl p-1" role="tablist">
        <button
          v-for="t in TABS"
          :key="t.id"
          type="button"
          role="tab"
          :aria-selected="tab === t.id"
          class="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
          :class="tab === t.id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'"
          @click="tab = t.id"
        >
          {{ t.label }}
        </button>
      </div>

      <!-- Aba: visão geral -->
      <div v-if="tab === 'overview'" class="space-y-3">
        <AdminCard class="p-4">
          <h4 class="text-sm font-bold text-slate-800 mb-3">Próximas Sessões</h4>
          <div
            v-for="(a, i) in appointments.slice(0, 3)"
            :key="`${a.time}-${a.child}`"
            class="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0"
          >
            <div class="w-10 h-10 bg-blue-50 rounded-xl flex flex-col items-center justify-center">
              <span class="text-[9px] font-bold text-blue-500">Jun</span>
              <span class="text-sm font-bold text-blue-700 leading-none">{{ 24 + i }}</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-800">{{ a.time }} — {{ lastName(a.therapist) }}</p>
              <p class="text-xs text-slate-400">{{ a.specialty }} · {{ a.room }}</p>
            </div>
          </div>
        </AdminCard>

        <AdminCard class="p-4">
          <h4 class="text-sm font-bold text-slate-800 mb-3">Progresso</h4>
          <AreaChart :data="PROGRESS" category-key="m" value-key="v" color="#22C55E" :height="110" hide-y-axis />
        </AdminCard>
      </div>

      <!-- Aba: evoluções -->
      <div v-else-if="tab === 'evolutions'" class="space-y-3">
        <AdminButton size="sm" @click="router.visit(ADMIN_ROUTES.evolutions)">
          <Plus :size="13" />Nova Evolução
        </AdminButton>

        <AdminCard v-for="e in patientEvolutions" :key="e.id" class="p-4">
          <div class="flex items-start justify-between mb-2">
            <div>
              <p class="text-sm font-bold text-slate-800">{{ e.therapist }}</p>
              <div class="flex items-center gap-2 mt-1">
                <AdminBadge :class="specialtyColor(e.specialty)">{{ e.specialty }}</AdminBadge>
                <span class="text-xs text-slate-400">{{ e.date }}</span>
              </div>
            </div>
            <button type="button" class="p-1 rounded-lg hover:bg-slate-100" aria-label="Mais opções">
              <MoreHorizontal :size="14" class="text-slate-400" />
            </button>
          </div>
          <p class="text-sm text-slate-600 leading-relaxed">{{ e.text }}</p>
          <div v-if="e.objectives" class="mt-3 pt-3 border-t border-slate-50 flex gap-4">
            <div>
              <p class="text-[10px] text-slate-400">Objetivos</p>
              <p class="text-xs font-semibold text-slate-700">{{ e.objectives }}</p>
            </div>
            <div>
              <p class="text-[10px] text-slate-400">Evolução</p>
              <p class="text-xs font-semibold text-green-600">{{ e.evolution }}</p>
            </div>
          </div>
        </AdminCard>
      </div>

      <!-- Aba: sessões -->
      <div v-else class="space-y-2">
        <AdminCard v-for="(a, i) in appointments" :key="`${a.time}-${a.child}`" class="p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-slate-50 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
              <span class="text-[9px] text-slate-400">Jun</span>
              <span class="text-sm font-bold text-slate-700 leading-none">{{ 18 + i }}</span>
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-slate-800">{{ a.time }} — {{ lastName(a.therapist) }}</p>
              <p class="text-xs text-slate-400">{{ patient.specialty }} · {{ a.room }}</p>
            </div>
            <AdminBadge :class="statusColor('Concluído')">Concluído</AdminBadge>
          </div>
        </AdminCard>
      </div>
    </div>
  </div>
</template>
