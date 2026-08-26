<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { Check, ChevronLeft, ChevronRight, Plus } from 'lucide-vue-next';
import AdminLayout from '../../Layouts/AdminLayout.vue';
import AdminButton from '../../Components/admin/AdminButton.vue';
import AdminCard from '../../Components/admin/AdminCard.vue';
import AdminModal from '../../Components/admin/AdminModal.vue';
import FormField from '../../Components/admin/FormField.vue';
import { ADMIN_ROUTES } from '../../services/routes';
import {
  PATIENTS,
  ROOMS,
  SPECIALTY_DATA,
  THERAPISTS,
  WEEK_SCHEDULE,
} from '../../services/adminMockData';
import { useZodForm } from '../../composables/useZodForm';
import * as z from 'zod';
import type { Patient, ScheduleSlot, SpecialtySlice } from '../../types/admin';

defineOptions({
  layout: AdminLayout,
  layoutProps: { title: 'Agenda', subtitle: 'Horários e atendimentos' },
});

const props = withDefaults(
  defineProps<{
    schedule?: Record<string, ScheduleSlot[]>;
    patients?: Patient[];
    specialties?: SpecialtySlice[];
    weekLabel?: string;
    startDay?: number;
  }>(),
  {
    schedule: () => WEEK_SCHEDULE,
    patients: () => PATIENTS,
    specialties: () => SPECIALTY_DATA,
    weekLabel: '24 a 28 de junho de 2024',
    startDay: 24,
  },
);

const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

const showModal = ref(false);
const mobileDay = ref('Seg');

const patientNames = computed(() => props.patients.map((p) => p.name));

/** Slot de um dia/horário — `undefined` quando o intervalo está livre. */
function slotAt(day: string, time: string) {
  return (props.schedule[day] ?? []).find((s) => s.time === time);
}

const appointmentSchema = z.object({
  child: z.string().min(1, 'Selecione a criança'),
  date: z.string().min(1, 'Informe a data'),
  time: z.string().min(1, 'Informe o horário'),
  therapist: z.string().min(1),
  room: z.string().min(1),
  notes: z.string(),
});

const { form, handleSubmit } = useZodForm(appointmentSchema, {
  child: '',
  date: '',
  time: '',
  therapist: THERAPISTS[0],
  room: ROOMS[0],
  notes: '',
});

const save = handleSubmit((f) =>
  f.post(ADMIN_ROUTES.appointmentStore, {
    preserveScroll: true,
    onSuccess: () => {
      showModal.value = false;
      f.reset();
    },
  }),
);
</script>

<template>
  <Head title="Agenda" />

  <div class="flex-1 flex flex-col overflow-hidden">
    <div class="p-4 lg:p-6 flex-1 flex flex-col space-y-4 overflow-hidden pb-20 lg:pb-0">
      <div class="flex items-center justify-between gap-3 flex-shrink-0">
        <div>
          <h2 class="text-lg font-bold text-slate-800">Agenda</h2>
          <p class="text-xs text-slate-500">{{ weekLabel }}</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="hidden sm:flex items-center gap-1 border border-slate-200 rounded-xl p-1">
            <button type="button" class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Semana anterior">
              <ChevronLeft :size="14" class="text-slate-500" />
            </button>
            <span class="text-xs font-semibold px-2 text-slate-700">Jun {{ startDay }}–{{ startDay + 4 }}</span>
            <button type="button" class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Próxima semana">
              <ChevronRight :size="14" class="text-slate-500" />
            </button>
          </div>
          <AdminButton size="sm" @click="showModal = true"><Plus :size="14" />Novo</AdminButton>
        </div>
      </div>

      <!-- Legenda -->
      <div class="flex gap-3 flex-wrap flex-shrink-0">
        <div v-for="s in specialties" :key="s.name" class="flex items-center gap-1.5">
          <div class="w-2 h-2 rounded-sm" :style="{ background: s.color }" />
          <span class="text-[11px] text-slate-500">{{ s.name }}</span>
        </div>
      </div>

      <!-- Seletor de dia (mobile) -->
      <div class="flex gap-1.5 overflow-x-auto pb-1 flex-shrink-0 lg:hidden">
        <button
          v-for="(d, i) in DAYS"
          :key="d"
          type="button"
          class="flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl transition-all"
          :class="mobileDay === d ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600'"
          :aria-pressed="mobileDay === d"
          @click="mobileDay = d"
        >
          <span class="text-[10px] font-semibold">{{ d }}</span>
          <span class="text-base font-bold leading-tight">{{ startDay + i }}</span>
        </button>
      </div>

      <!-- Lista do dia (mobile) -->
      <div class="lg:hidden flex-1 overflow-y-auto space-y-2">
        <div v-for="t in TIMES" :key="t" class="flex gap-3">
          <div class="w-12 pt-2 flex-shrink-0">
            <span class="text-xs font-mono font-semibold text-slate-400">{{ t }}</span>
          </div>
          <button
            v-if="slotAt(mobileDay, t)"
            type="button"
            class="flex-1 rounded-xl p-3 border text-left active:scale-[0.98] transition-transform"
            :style="{ background: slotAt(mobileDay, t)!.color, borderColor: slotAt(mobileDay, t)!.border }"
          >
            <p class="text-xs font-bold text-slate-800">{{ slotAt(mobileDay, t)!.child }}</p>
            <p class="text-[10px] text-slate-500 mt-0.5">{{ slotAt(mobileDay, t)!.specialty }}</p>
          </button>
          <button
            v-else
            type="button"
            class="flex-1 border border-dashed border-slate-200 rounded-xl min-h-[48px] hover:bg-slate-50 transition-colors flex items-center justify-center"
            @click="showModal = true"
          >
            <span class="text-[10px] text-slate-300">Disponível</span>
          </button>
        </div>
      </div>

      <!-- Grade semanal (desktop) -->
      <AdminCard class="hidden lg:flex flex-col flex-1 overflow-hidden">
        <div class="overflow-auto flex-1">
          <div class="grid min-w-[600px]" style="grid-template-columns: 56px repeat(5, 1fr)">
            <div class="bg-slate-50/60 border-b border-r border-slate-100 p-3" />
            <div
              v-for="(d, i) in DAYS"
              :key="`head-${d}`"
              class="border-b border-r border-slate-100 p-3 text-center"
              :class="i === 0 ? 'bg-blue-50/40' : 'bg-slate-50/40'"
            >
              <p class="text-xs font-bold text-slate-400">{{ d }}</p>
              <p class="text-base font-bold mt-0.5" :class="i === 0 ? 'text-blue-600' : 'text-slate-700'">
                {{ startDay + i }}
              </p>
            </div>

            <template v-for="t in TIMES" :key="t">
              <div class="border-b border-r border-slate-100 p-2 text-right">
                <span class="text-[11px] font-mono text-slate-400">{{ t }}</span>
              </div>
              <div
                v-for="d in DAYS"
                :key="`${d}-${t}`"
                class="border-b border-r border-slate-100 p-1.5 min-h-[52px] hover:bg-slate-50/50 transition-colors"
              >
                <button
                  v-if="slotAt(d, t)"
                  type="button"
                  class="rounded-lg p-2 h-full w-full text-left hover:opacity-80 transition-opacity border"
                  :style="{ background: slotAt(d, t)!.color, borderColor: slotAt(d, t)!.border }"
                >
                  <p class="text-[11px] font-bold text-slate-800 truncate">{{ slotAt(d, t)!.child }}</p>
                  <p class="text-[10px] text-slate-500 mt-0.5">{{ slotAt(d, t)!.specialty }}</p>
                </button>
              </div>
            </template>
          </div>
        </div>
      </AdminCard>
    </div>
  </div>

  <AdminModal v-model:open="showModal" title="Novo Atendimento">
    <form novalidate @submit.prevent="save">
      <div class="space-y-4">
        <FormField v-model="form.child" label="Criança" as="select" :options="patientNames" :error="form.errors.child" />
        <div class="grid grid-cols-2 gap-3">
          <FormField v-model="form.date" label="Data" type="date" :error="form.errors.date" />
          <FormField v-model="form.time" label="Horário" type="time" :error="form.errors.time" />
        </div>
        <FormField v-model="form.therapist" label="Terapeuta" as="select" :options="THERAPISTS" />
        <FormField v-model="form.room" label="Sala" as="select" :options="ROOMS" />
        <FormField v-model="form.notes" label="Observações" as="textarea" :rows="2" placeholder="Instruções adicionais..." />
      </div>
      <div class="flex gap-2 mt-5">
        <AdminButton variant="secondary" class="flex-1 justify-center" @click="showModal = false">Cancelar</AdminButton>
        <AdminButton type="submit" class="flex-1 justify-center" :disabled="form.processing">
          <Check :size="13" />Salvar
        </AdminButton>
      </div>
    </form>
  </AdminModal>
</template>
