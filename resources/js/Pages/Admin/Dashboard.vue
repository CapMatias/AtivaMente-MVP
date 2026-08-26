<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { computed } from 'vue';
import { Clock, Plus, Star, TrendingUp, Users } from 'lucide-vue-next';
import AdminLayout from '../../Layouts/AdminLayout.vue';
import AdminBadge from '../../Components/admin/AdminBadge.vue';
import AdminButton from '../../Components/admin/AdminButton.vue';
import AdminCard from '../../Components/admin/AdminCard.vue';
import InitialsAvatar from '../../Components/admin/InitialsAvatar.vue';
import AreaChart from '../../Components/admin/charts/AreaChart.vue';
import BarChart from '../../Components/admin/charts/BarChart.vue';
import DonutChart from '../../Components/admin/charts/DonutChart.vue';
import { initialsOf, lastName, statusColor } from '../../constants/adminTokens';
import { ADMIN_ROUTES } from '../../services/routes';
import {
  ADMIN_USER,
  APPOINTMENTS_TODAY,
  CLINICAL_EVOLUTIONS,
  MONTHLY_DATA,
  SPECIALTY_DATA,
  WEEKLY_DATA,
} from '../../services/adminMockData';
import type { Appointment, BarSeries, ClinicalEvolution, SpecialtySlice } from '../../types/admin';

defineOptions({
  layout: AdminLayout,
  layoutProps: { title: 'Dashboard', subtitle: 'Visão geral da clínica' },
});

const props = withDefaults(
  defineProps<{
    greetingName?: string;
    today?: string;
    counters?: { children: number; sessionsToday: number; professionals: number; evolutions: number };
    appointments?: Appointment[];
    recentEvolutions?: ClinicalEvolution[];
    weekly?: typeof WEEKLY_DATA;
    monthly?: typeof MONTHLY_DATA;
    bySpecialty?: SpecialtySlice[];
  }>(),
  {
    greetingName: ADMIN_USER.name,
    today: 'Segunda, 22 de junho de 2026',
    counters: () => ({ children: 47, sessionsToday: 12, professionals: 8, evolutions: 284 }),
    appointments: () => APPOINTMENTS_TODAY,
    recentEvolutions: () => CLINICAL_EVOLUTIONS,
    weekly: () => WEEKLY_DATA,
    monthly: () => MONTHLY_DATA,
    bySpecialty: () => SPECIALTY_DATA,
  },
);

const stats = computed(() => [
  { label: 'Crianças', value: String(props.counters.children), change: '+3 este mês', icon: Users, bg: 'bg-blue-50', ic: 'text-blue-600' },
  { label: 'Sessões Hoje', value: String(props.counters.sessionsToday), change: '5 concluídas', icon: Clock, bg: 'bg-purple-50', ic: 'text-purple-600' },
  { label: 'Profissionais', value: String(props.counters.professionals), change: 'Todos ativos', icon: Star, bg: 'bg-green-50', ic: 'text-green-600' },
  { label: 'Evoluções', value: String(props.counters.evolutions), change: '+18 esta semana', icon: TrendingUp, bg: 'bg-amber-50', ic: 'text-amber-600' },
]);

const WEEK_SERIES: BarSeries[] = [
  { key: 'sessions', name: 'Sessões', color: '#2563EB' },
  { key: 'evolutions', name: 'Evoluções', color: '#22C55E' },
];
</script>

<template>
  <Head title="Dashboard" />

  <div class="flex-1 overflow-y-auto">
    <div class="p-4 lg:p-6 space-y-5 pb-24 lg:pb-6">
      <!-- Boas-vindas -->
      <div class="flex items-start justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold text-slate-800">Bom dia, {{ greetingName }} 👋</h2>
          <p class="text-slate-500 mt-0.5 text-[14px]">{{ today }}</p>
        </div>
        <AdminButton size="sm" @click="router.visit(ADMIN_ROUTES.childCreate)">
          <Plus :size="14" />Nova Criança
        </AdminButton>
      </div>

      <!-- Indicadores -->
      <div class="grid grid-cols-2 gap-3">
        <AdminCard v-for="s in stats" :key="s.label" class="p-4">
          <div :class="['w-9 h-9 rounded-xl flex items-center justify-center mb-3', s.bg]">
            <component :is="s.icon" :size="17" :class="s.ic" />
          </div>
          <p class="text-2xl font-bold text-slate-800">{{ s.value }}</p>
          <p class="text-xs text-slate-500 mt-0.5">{{ s.label }}</p>
          <p class="text-xs text-green-600 mt-1 font-medium">{{ s.change }}</p>
        </AdminCard>
      </div>

      <!-- Atendimentos da semana -->
      <AdminCard class="p-4">
        <div class="mb-4">
          <h3 class="text-sm font-bold text-slate-800">Atendimentos da Semana</h3>
          <p class="text-xs text-slate-400 mt-0.5">Sessões e evoluções</p>
        </div>
        <BarChart :data="weekly" category-key="day" :series="WEEK_SERIES" :height="160" />
      </AdminCard>

      <!-- Próximos atendimentos -->
      <AdminCard class="overflow-hidden">
        <div class="flex items-center justify-between px-4 py-3 border-b border-slate-50">
          <h3 class="text-sm font-bold text-slate-800">Próximos Atendimentos</h3>
          <Link
            :href="ADMIN_ROUTES.agenda"
            class="text-xs font-medium text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Ver agenda
          </Link>
        </div>
        <div class="divide-y divide-slate-50">
          <div
            v-for="(a, i) in appointments"
            :key="`${a.time}-${a.child}`"
            class="flex items-center gap-3 px-4 py-3"
          >
            <div class="w-12 text-center flex-shrink-0">
              <p class="text-xs font-mono font-bold text-blue-600">{{ a.time }}</p>
            </div>
            <InitialsAvatar :initials="initialsOf(a.child)" :idx="i" size="sm" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-slate-800 truncate">{{ a.child }}</p>
              <p class="text-xs text-slate-400 truncate">{{ a.therapist }}</p>
            </div>
            <AdminBadge :class="statusColor(a.status)">{{ a.status }}</AdminBadge>
          </div>
        </div>
      </AdminCard>

      <!-- Tendência mensal -->
      <AdminCard class="p-4">
        <h3 class="text-sm font-bold text-slate-800 mb-1">Tendência Mensal</h3>
        <p class="text-xs text-slate-400 mb-4">Sessões realizadas por mês</p>
        <AreaChart :data="monthly" category-key="month" value-key="sessions" color="#2563EB" :height="130" />
      </AdminCard>

      <!-- Por especialidade -->
      <AdminCard class="p-4">
        <h3 class="text-sm font-bold text-slate-800 mb-4">Por Especialidade</h3>
        <div class="flex gap-4 items-center">
          <DonutChart :data="bySpecialty" :size="110" />
          <div class="flex-1 space-y-2">
            <div v-for="slice in bySpecialty" :key="slice.name" class="flex items-center gap-2">
              <div class="w-2.5 h-2.5 rounded-sm flex-shrink-0" :style="{ background: slice.color }" />
              <span class="text-xs text-slate-500 flex-1">{{ slice.name }}</span>
              <span class="text-xs font-bold text-slate-700">{{ slice.value }}%</span>
            </div>
          </div>
        </div>
      </AdminCard>

      <!-- Atividade recente -->
      <AdminCard class="overflow-hidden">
        <div class="flex items-center justify-between px-4 py-3 border-b border-slate-50">
          <h3 class="text-sm font-bold text-slate-800">Atividade Recente</h3>
          <Link
            :href="ADMIN_ROUTES.evolutions"
            class="text-xs font-medium text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Ver evoluções
          </Link>
        </div>
        <div
          v-for="(e, i) in recentEvolutions.slice(0, 3)"
          :key="e.id"
          class="flex gap-3 px-4 py-3 border-b border-slate-50 last:border-0"
        >
          <InitialsAvatar :initials="initialsOf(e.child)" :idx="i" size="sm" />
          <div class="flex-1 min-w-0">
            <div class="flex justify-between gap-2">
              <p class="text-sm font-semibold text-slate-800 truncate">{{ e.child }}</p>
              <span class="text-xs text-slate-400 flex-shrink-0">{{ e.date.slice(5) }}</span>
            </div>
            <p class="text-xs text-slate-400">{{ lastName(e.therapist) }} · {{ e.specialty }}</p>
            <p class="text-xs text-slate-600 mt-1 line-clamp-1">{{ e.text }}</p>
          </div>
        </div>
      </AdminCard>
    </div>
  </div>
</template>
