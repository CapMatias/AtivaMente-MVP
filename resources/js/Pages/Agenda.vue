<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import AppLayout from '../Layouts/AppLayout.vue';
import Badge from '../Components/ui/Badge.vue';
import BottomSheet from '../Components/ui/BottomSheet.vue';
import Calendar from '../Components/ui/Calendar.vue';
import Card from '../Components/ui/Card.vue';
import Header from '../Components/ui/Header.vue';
import Toast from '../Components/ui/Toast.vue';
import { useToast } from '../composables/useToast';
import { SessionService } from '../services/api';
import { MOCK_DATA } from '../services/mockData';
import type { Child, Session } from '../types';

defineOptions({ layout: AppLayout });

type FilterType = 'all' | 'scheduled' | 'completed';

const props = withDefaults(
  defineProps<{
    sessions?: Session[];
    children?: Child[];
  }>(),
  {
    sessions: () => MOCK_DATA.sessions,
    children: () => MOCK_DATA.children,
  },
);

const selectedDate = ref<string | null>(null);
const filter = ref<FilterType>('all');
const showScheduleSheet = ref(false);
const selectedChildId = ref<string | null>(null);
const submitting = ref(false);

const { visible: toastVisible, message: toastMessage, type: toastType, show: showToast } = useToast();

const markedDates = computed(() => props.sessions.map((s) => s.date));

const filteredSessions = computed(() =>
  props.sessions.filter((s) => (filter.value === 'all' ? true : s.status === filter.value)),
);

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'scheduled', label: 'Agendadas' },
  { value: 'completed', label: 'Concluídas' },
];

const listTitle = computed(() =>
  filter.value === 'scheduled' ? 'Próximas Sessões' : filter.value === 'completed' ? 'Histórico' : 'Todas as Sessões',
);

function confirmScheduling() {
  if (!selectedChildId.value) return;

  submitting.value = true;
  SessionService.requestScheduling(
    {
      childId: selectedChildId.value,
      date: selectedDate.value ?? '',
      time: '',
    },
    {
      preserveScroll: true,
      onSuccess: () => {
        showScheduleSheet.value = false;
        selectedChildId.value = null;
        showToast('Solicitação enviada com sucesso!', 'success');
      },
      onError: () => showToast('Não foi possível enviar a solicitação.', 'error'),
      onFinish: () => {
        submitting.value = false;
      },
    },
  );
}
</script>

<template>
  <Head title="Minha Agenda" />

  <Header title="Minha Agenda" />
  <Toast v-model:visible="toastVisible" :message="toastMessage" :type="toastType" />

  <div class="px-6 py-4">
    <Card class="mb-6 bg-blue-600 p-6">
      <p class="text-white text-xl font-bold mb-2">Nova Solicitação</p>
      <p class="text-blue-100 mb-4">Deseja agendar uma nova sessão para seu filho?</p>
      <button
        type="button"
        class="w-full bg-white py-3 rounded-xl text-blue-600 font-bold transition-colors hover:bg-blue-50"
        @click="showScheduleSheet = true"
      >
        Solicitar Agendamento
      </button>
    </Card>

    <Calendar v-model="selectedDate" :marked-dates="markedDates" />

    <div class="flex flex-row mb-4 gap-2">
      <button
        v-for="option in FILTERS"
        :key="option.value"
        type="button"
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="filter === option.value ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'"
        :aria-pressed="filter === option.value"
        @click="filter = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <h2 class="text-slate-800 text-lg font-semibold mb-3">{{ listTitle }}</h2>

    <div v-if="filteredSessions.length === 0" class="flex flex-col items-center py-8">
      <p class="text-4xl mb-3" aria-hidden="true">📅</p>
      <p class="text-slate-400">Nenhuma sessão encontrada</p>
    </div>

    <Card v-for="session in filteredSessions" :key="session.id" class="mb-4">
      <div class="flex flex-row justify-between items-center">
        <div class="flex-1">
          <div class="flex flex-row items-center mb-1">
            <p class="text-slate-800 font-bold text-lg">{{ session.type }}</p>
            <Badge
              :label="session.status === 'scheduled' ? 'Agendada' : 'Concluída'"
              :color="session.status === 'scheduled' ? 'blue' : 'green'"
              class="ml-2"
            />
          </div>
          <p class="text-slate-500">{{ session.professionalName }}</p>
          <p class="text-blue-600 font-medium mt-1">{{ session.date }} • {{ session.time }}</p>
        </div>
        <button
          v-if="session.status === 'scheduled'"
          type="button"
          class="p-2 bg-red-50 rounded-full text-red-500 text-sm transition-colors hover:bg-red-100"
          :aria-label="`Cancelar sessão de ${session.type}`"
        >
          ✕
        </button>
      </div>
    </Card>
  </div>

  <BottomSheet v-model:open="showScheduleSheet" title="Solicitar Agendamento">
    <p class="text-slate-500 mb-4">Selecione o tipo de terapia e o horário desejado.</p>

    <Card
      v-for="child in children"
      :key="child.id"
      class="mb-3"
      :class="selectedChildId === child.id && 'ring-2 ring-blue-600'"
      @click="selectedChildId = child.id"
    >
      <p class="text-slate-800 font-bold">{{ child.name }}</p>
      <p class="text-slate-500 text-sm">{{ child.diagnosis }}</p>
    </Card>

    <button
      type="button"
      class="w-full py-4 rounded-2xl font-bold mt-4 text-white transition-colors"
      :class="selectedChildId && !submitting ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-300 cursor-not-allowed'"
      :disabled="!selectedChildId || submitting"
      @click="confirmScheduling"
    >
      Confirmar Solicitação
    </button>
  </BottomSheet>
</template>
