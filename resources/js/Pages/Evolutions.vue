<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import AppLayout from '../Layouts/AppLayout.vue';
import Avatar from '../Components/ui/Avatar.vue';
import EmptyState from '../Components/ui/EmptyState.vue';
import Header from '../Components/ui/Header.vue';
import Timeline from '../Components/ui/Timeline.vue';
import { MOCK_DATA } from '../services/mockData';
import type { Child, Evolution, TimelineItem } from '../types';

defineOptions({ layout: AppLayout });

const props = withDefaults(
  defineProps<{
    evolutions?: Evolution[];
    children?: Child[];
  }>(),
  {
    evolutions: () => MOCK_DATA.evolutions,
    children: () => MOCK_DATA.children,
  },
);

const selectedChild = ref<string>('all');

const childrenOptions = computed(() => [
  { id: 'all', name: 'Todos', avatarUrl: undefined as string | undefined },
  ...props.children,
]);

const timelineItems = computed<TimelineItem[]>(() =>
  props.evolutions
    .filter((e) => selectedChild.value === 'all' || e.childId === selectedChild.value)
    .map((evo) => ({
      id: evo.id,
      date: evo.date,
      title: evo.professionalName,
      description: evo.description,
      photos: evo.photos,
      attachments: evo.attachments,
    })),
);
</script>

<template>
  <Head title="Evoluções" />

  <Header title="Evoluções" />

  <div class="px-6 py-4">
    <h2 class="text-slate-800 text-lg font-semibold mb-3">Filtrar por filho</h2>

    <!-- `overflow-x-auto` substitui o `<ScrollView horizontal>` -->
    <div class="flex flex-row gap-2 mb-6 overflow-x-auto pb-1">
      <button
        v-for="child in childrenOptions"
        :key="child.id"
        type="button"
        class="flex flex-row items-center shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="
          selectedChild === child.id
            ? 'bg-blue-600 text-white'
            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
        "
        :aria-pressed="selectedChild === child.id"
        @click="selectedChild = child.id"
      >
        <Avatar
          v-if="child.id !== 'all' && child.avatarUrl"
          :src="child.avatarUrl"
          size="sm"
          :alt="child.name"
          class="w-6 h-6 mr-2"
        />
        {{ child.name }}
      </button>
    </div>

    <h2 class="text-slate-800 text-lg font-semibold mb-4">Linha do Tempo</h2>

    <EmptyState
      v-if="timelineItems.length === 0"
      icon="📈"
      title="Nenhuma evolução"
      description="As evoluções dos profissionais aparecerão aqui."
    />
    <Timeline v-else :items="timelineItems" />
  </div>
</template>
