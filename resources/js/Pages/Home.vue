<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import AppLayout from '../Layouts/AppLayout.vue';
import Avatar from '../Components/ui/Avatar.vue';
import Badge from '../Components/ui/Badge.vue';
import Card from '../Components/ui/Card.vue';
import Header from '../Components/ui/Header.vue';
import { MOCK_DATA } from '../services/mockData';
import { ROUTES } from '../services/routes';
import type { Child, Evolution, Session, User } from '../types';

defineOptions({ layout: AppLayout });

/**
 * As props vêm do controller (`Inertia::render('Home', [...])`).
 * Enquanto o backend não existir, os defaults usam os mocks.
 */
const props = withDefaults(
  defineProps<{
    user?: User;
    children?: Child[];
    sessions?: Session[];
    evolutions?: Evolution[];
  }>(),
  {
    user: () => MOCK_DATA.user,
    children: () => MOCK_DATA.children,
    sessions: () => MOCK_DATA.sessions,
    evolutions: () => MOCK_DATA.evolutions,
  },
);

const firstChild = computed(() => props.children[0]);
const lastEvolution = computed(() => props.evolutions[0]);
const completedCount = computed(() => props.sessions.filter((s) => s.status === 'completed').length);

const QUICK_ACTIONS = [
  { label: 'Agendar', icon: '📅', href: ROUTES.agenda, tone: 'bg-blue-50', animation: 'animate-slide-in-left', delay: '0.75s' },
  { label: 'Evoluções', icon: '📈', href: ROUTES.evolutions, tone: 'bg-green-50', animation: 'animate-slide-in-right', delay: '0.8s' },
  { label: 'Meus Filhos', icon: '👨‍👩‍👧', href: ROUTES.children, tone: 'bg-purple-50', animation: 'animate-slide-in-left', delay: '0.85s' },
  { label: 'Perfil', icon: '👤', href: ROUTES.profile, tone: 'bg-orange-50', animation: 'animate-slide-in-right', delay: '0.9s' },
];
</script>

<template>
  <Head title="Início" />

  <Header title="AtivaMente">
    <template #actions>
      <Link :href="ROUTES.notifications" class="text-xl" aria-label="Notificações">🔔</Link>
    </template>
  </Header>

  <div class="px-6 py-4">
    <div class="mb-6 animate-fade-in-down opacity-0">
      <p class="text-slate-400 text-lg">Olá,</p>
      <p class="text-slate-800 text-3xl font-bold">{{ user.name }}!</p>
    </div>

    <h2 class="text-slate-800 text-lg font-semibold mb-3 animate-fade-in opacity-0" style="animation-delay: 0.1s">
      Próxima Sessão
    </h2>
    <Card
      v-if="firstChild"
      class="mb-6 border-l-4 border-blue-600 animate-slide-in-right opacity-0"
      style="animation-delay: 0.2s"
    >
      <div class="flex flex-row justify-between items-center">
        <div class="flex-1">
          <p class="text-slate-800 text-xl font-bold">{{ firstChild.name }}</p>
          <p class="text-slate-500">{{ firstChild.nextSession?.type }}</p>
          <p class="text-blue-600 font-medium mt-2">
            {{ firstChild.nextSession?.date }} às {{ firstChild.nextSession?.time }}
          </p>
        </div>
        <Avatar v-if="firstChild.avatarUrl" :src="firstChild.avatarUrl" size="sm" :alt="firstChild.name" />
      </div>
    </Card>

    <h2 class="text-slate-800 text-lg font-semibold mb-3 animate-fade-in opacity-0" style="animation-delay: 0.3s">
      Resumo das Terapias
    </h2>
    <div class="flex flex-row justify-between gap-4 mb-6">
      <Card class="flex-1 flex flex-col items-center py-4 animate-scale-in opacity-0" style="animation-delay: 0.35s">
        <span class="text-3xl font-bold text-blue-600">{{ sessions.length }}</span>
        <span class="text-slate-500 text-xs mt-1">Agendadas</span>
      </Card>
      <Card class="flex-1 flex flex-col items-center py-4 animate-scale-in opacity-0" style="animation-delay: 0.45s">
        <span class="text-3xl font-bold text-green-600">{{ completedCount }}</span>
        <span class="text-slate-500 text-xs mt-1">Concluídas</span>
      </Card>
      <Card class="flex-1 flex flex-col items-center py-4 animate-scale-in opacity-0" style="animation-delay: 0.55s">
        <span class="text-3xl font-bold text-orange-500">{{ children.length }}</span>
        <span class="text-slate-500 text-xs mt-1">Filhos</span>
      </Card>
    </div>

    <template v-if="lastEvolution">
      <h2 class="text-slate-800 text-lg font-semibold mb-3 animate-fade-in opacity-0" style="animation-delay: 0.6s">
        Última Evolução
      </h2>
      <Card class="mb-6 animate-fade-in-up opacity-0" style="animation-delay: 0.65s">
        <div class="flex flex-row justify-between mb-2">
          <p class="text-slate-800 font-bold">{{ lastEvolution.professionalName }}</p>
          <Badge :label="lastEvolution.date" color="blue" />
        </div>
        <!-- `line-clamp-3` substitui o `numberOfLines={3}` do React Native -->
        <p class="text-slate-600 leading-5 line-clamp-3">{{ lastEvolution.description }}</p>
      </Card>
    </template>

    <h2 class="text-slate-800 text-lg font-semibold mb-3 animate-fade-in opacity-0" style="animation-delay: 0.7s">
      Ações Rápidas
    </h2>
    <div class="flex flex-row flex-wrap justify-between mb-6">
      <Link
        v-for="action in QUICK_ACTIONS"
        :key="action.href"
        :href="action.href"
        class="w-[48%] mb-3 opacity-0"
        :class="action.animation"
        :style="{ animationDelay: action.delay }"
      >
        <Card class="flex flex-row items-center p-4" :class="action.tone">
          <span class="text-2xl mr-3" aria-hidden="true">{{ action.icon }}</span>
          <span class="font-bold text-slate-800">{{ action.label }}</span>
        </Card>
      </Link>
    </div>
  </div>
</template>
