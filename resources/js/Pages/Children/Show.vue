<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { computed } from 'vue';
import AppLayout from '../../Layouts/AppLayout.vue';
import Avatar from '../../Components/ui/Avatar.vue';
import Card from '../../Components/ui/Card.vue';
import EmptyState from '../../Components/ui/EmptyState.vue';
import Header from '../../Components/ui/Header.vue';
import { MOCK_DATA } from '../../services/mockData';
import { ROUTES } from '../../services/routes';
import type { Child, Evolution, User } from '../../types';

defineOptions({ layout: AppLayout });

/**
 * `child` vem resolvido do servidor (route model binding), substituindo o
 * `useLocalSearchParams()` do expo-router.
 */
const props = withDefaults(
  defineProps<{
    child?: Child | null;
    evolutions?: Evolution[];
    parent?: User;
  }>(),
  {
    child: () => MOCK_DATA.children[0],
    evolutions: () => MOCK_DATA.evolutions,
    parent: () => MOCK_DATA.user,
  },
);

const childEvolutions = computed(() =>
  props.child ? props.evolutions.filter((e) => e.childId === props.child!.id) : [],
);

const nextSessionLabel = computed(() => {
  const session = props.child?.nextSession;
  return session ? `${session.type} - ${session.date}` : undefined;
});
</script>

<template>
  <Head :title="child ? child.name : 'Criança não encontrada'" />

  <Header title="Perfil da Criança" show-back @back="router.visit(ROUTES.children)" />

  <EmptyState v-if="!child" icon="🔍" title="Criança não encontrada" />

  <div v-else class="px-6 py-4">
    <div class="flex flex-col items-center mb-8">
      <Avatar v-if="child.avatarUrl" :src="child.avatarUrl" size="lg" :alt="child.name" />
      <p class="text-slate-800 text-2xl font-bold mt-4">{{ child.name }}</p>
      <p class="text-slate-500">{{ child.diagnosis }} • {{ child.age }} anos</p>
    </div>

    <h2 class="text-slate-800 text-lg font-semibold mb-4">Informações Gerais</h2>
    <Card class="mb-6">
      <div class="flex flex-row justify-between py-2 border-b border-slate-100">
        <span class="text-slate-400">Responsável</span>
        <span class="text-slate-800 font-medium">{{ parent.name || 'Não informado' }}</span>
      </div>
      <div class="flex flex-row justify-between py-2">
        <span class="text-slate-400">Próxima Terapia</span>
        <span class="text-slate-800 font-medium">{{ nextSessionLabel || 'Não informado' }}</span>
      </div>
    </Card>

    <div class="flex flex-row justify-between items-center mb-4">
      <h2 class="text-slate-800 text-lg font-semibold">Evoluções Recentes</h2>
      <Link :href="ROUTES.evolutions" class="text-blue-600 font-bold">Ver todas</Link>
    </div>

    <EmptyState
      v-if="childEvolutions.length === 0"
      icon="📈"
      title="Nenhuma evolução"
      description="As evoluções dos profissionais aparecerão aqui."
    />

    <Card v-for="evo in childEvolutions" :key="evo.id" class="mb-4">
      <div class="flex flex-row justify-between mb-2">
        <p class="text-slate-800 font-bold">{{ evo.professionalName }}</p>
        <p class="text-slate-400 text-xs">{{ evo.date }}</p>
      </div>
      <p class="text-slate-600 leading-5">{{ evo.description }}</p>
    </Card>
  </div>
</template>
