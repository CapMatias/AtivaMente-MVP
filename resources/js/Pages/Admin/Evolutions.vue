<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { ArrowLeft, Check, CheckCircle2, ChevronRight, Edit2, FileText, MoreHorizontal, Plus, Search } from 'lucide-vue-next';
import * as z from 'zod';
import AdminLayout from '../../Layouts/AdminLayout.vue';
import AdminBadge from '../../Components/admin/AdminBadge.vue';
import AdminButton from '../../Components/admin/AdminButton.vue';
import AdminCard from '../../Components/admin/AdminCard.vue';
import AdminModal from '../../Components/admin/AdminModal.vue';
import FormField from '../../Components/admin/FormField.vue';
import InitialsAvatar from '../../Components/admin/InitialsAvatar.vue';
import { initialsOf, lastName, specialtyColor } from '../../constants/adminTokens';
import { useZodForm } from '../../composables/useZodForm';
import { ADMIN_ROUTES } from '../../services/routes';
import {
  CLINICAL_EVOLUTIONS,
  EVOLUTION_RATINGS,
  PATIENTS,
  THERAPISTS,
} from '../../services/adminMockData';
import type { ClinicalEvolution, Patient } from '../../types/admin';

defineOptions({
  layout: AdminLayout,
  layoutProps: { title: 'Evoluções Clínicas', subtitle: 'Prontuário eletrônico' },
});

const props = withDefaults(
  defineProps<{
    evolutions?: ClinicalEvolution[];
    patients?: Patient[];
  }>(),
  {
    evolutions: () => CLINICAL_EVOLUTIONS,
    patients: () => PATIENTS,
  },
);

const selectedId = ref<number | null>(null);
const showForm = ref(false);
const search = ref('');

const patientNames = computed(() => props.patients.map((p) => p.name));

const filtered = computed(() => {
  const q = search.value.toLowerCase();
  return props.evolutions.filter((e) => e.child.toLowerCase().includes(q));
});

/** Agrupa por criança, como o `reduce` do protótipo. */
const grouped = computed(() => {
  const map = new Map<string, ClinicalEvolution[]>();
  for (const e of filtered.value) {
    if (!map.has(e.child)) map.set(e.child, []);
    map.get(e.child)!.push(e);
  }
  return [...map.entries()];
});

const selected = computed(() => props.evolutions.find((e) => e.id === selectedId.value) ?? null);

const evolutionSchema = z.object({
  child: z.string().min(1, 'Selecione a criança'),
  date: z.string().min(1, 'Informe a data'),
  therapist: z.string().min(1),
  objectives: z.string(),
  text: z.string().min(10, 'Descreva a evolução'),
  rating: z.string().min(1),
});

const { form, handleSubmit } = useZodForm(evolutionSchema, {
  child: '',
  date: '',
  therapist: THERAPISTS[0],
  objectives: '',
  text: '',
  rating: EVOLUTION_RATINGS[0],
});

const save = handleSubmit((f) =>
  f.post(ADMIN_ROUTES.evolutionStore, {
    preserveScroll: true,
    onSuccess: () => {
      showForm.value = false;
      f.reset();
    },
  }),
);
</script>

<template>
  <Head title="Evoluções Clínicas" />

  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Mobile: lista ou detalhe -->
    <div class="lg:hidden flex-1 overflow-y-auto pb-24">
      <div v-if="selected" class="p-4 space-y-4">
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="p-2 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Voltar à lista"
            @click="selectedId = null"
          >
            <ArrowLeft :size="17" class="text-slate-600" />
          </button>
          <h2 class="text-base font-bold text-slate-800 flex-1">Evolução</h2>
          <button type="button" class="p-1.5 rounded-xl hover:bg-slate-100" aria-label="Editar">
            <Edit2 :size="15" class="text-slate-400" />
          </button>
        </div>

        <AdminCard class="p-4">
          <div class="flex items-center gap-3 mb-3">
            <InitialsAvatar :initials="initialsOf(selected.child)" :idx="0" size="md" />
            <div>
              <p class="text-sm font-bold text-slate-800">{{ selected.child }}</p>
              <div class="flex items-center gap-2 mt-0.5">
                <AdminBadge :class="specialtyColor(selected.specialty)">{{ selected.specialty }}</AdminBadge>
                <span class="text-xs text-slate-400">{{ selected.date }}</span>
              </div>
            </div>
          </div>
          <p class="text-xs text-slate-500 mb-1">{{ selected.therapist }}</p>
          <p class="text-sm text-slate-700 leading-relaxed">{{ selected.text }}</p>
          <div v-if="selected.objectives" class="mt-3 pt-3 border-t border-slate-50 grid grid-cols-2 gap-3">
            <div>
              <p class="text-[10px] text-slate-400">Objetivos</p>
              <p class="text-xs font-semibold text-slate-700 mt-0.5">{{ selected.objectives }}</p>
            </div>
            <div>
              <p class="text-[10px] text-slate-400">Evolução</p>
              <p class="text-xs font-semibold text-green-600 mt-0.5">{{ selected.evolution }}</p>
            </div>
          </div>
        </AdminCard>
      </div>

      <div v-else class="p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-slate-800">Evoluções</h2>
          <AdminButton size="sm" @click="showForm = true"><Plus :size="13" />Nova</AdminButton>
        </div>

        <div class="relative">
          <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            v-model="search"
            type="search"
            placeholder="Buscar criança..."
            aria-label="Buscar criança"
            class="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/40"
          />
        </div>

        <div v-for="([child, items], gi) in grouped" :key="child">
          <div class="flex items-center gap-2 mb-2 mt-3">
            <InitialsAvatar :initials="initialsOf(child)" :idx="gi" size="xs" />
            <p class="text-xs font-bold text-slate-600">{{ child }}</p>
            <span class="text-[10px] text-slate-400 ml-auto">{{ items.length }} evolução(ões)</span>
          </div>
          <AdminCard v-for="e in items" :key="e.id" class="p-3 mb-2" @click="selectedId = e.id">
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-700 truncate">{{ e.objectives }}</p>
                <p class="text-[11px] text-slate-400 mt-0.5">{{ e.date }} · {{ lastName(e.therapist) }}</p>
                <p class="text-xs text-slate-600 mt-1 line-clamp-2">{{ e.text }}</p>
              </div>
              <ChevronRight :size="14" class="text-slate-300 mt-0.5 flex-shrink-0" />
            </div>
          </AdminCard>
        </div>
      </div>
    </div>

    <!-- Desktop: lista + detalhe lado a lado -->
    <div class="hidden lg:flex flex-1 overflow-hidden">
      <div class="w-72 border-r border-slate-100 flex flex-col overflow-hidden">
        <div class="p-4 border-b border-slate-100">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-bold text-slate-800">Evoluções</h3>
            <AdminButton size="sm" aria-label="Nova evolução" @click="showForm = true">
              <Plus :size="12" />
            </AdminButton>
          </div>
          <div class="relative">
            <Search :size="13" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              v-model="search"
              type="search"
              placeholder="Buscar criança..."
              aria-label="Buscar criança"
              class="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/40"
            />
          </div>
        </div>

        <div class="overflow-y-auto flex-1">
          <div v-for="([child, items], gi) in grouped" :key="child">
            <div class="flex items-center gap-2 px-4 py-2 bg-slate-50/60 border-b border-slate-100">
              <InitialsAvatar :initials="initialsOf(child)" :idx="gi" size="xs" />
              <div>
                <p class="text-xs font-bold text-slate-700">{{ child }}</p>
                <p class="text-[10px] text-slate-400">{{ items.length }} evolução(ões)</p>
              </div>
            </div>
            <button
              v-for="e in items"
              :key="e.id"
              type="button"
              class="w-full text-left px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors"
              :class="selectedId === e.id ? 'bg-blue-50/60 border-l-2 border-l-blue-500' : ''"
              @click="selectedId = e.id"
            >
              <p class="text-xs font-semibold text-slate-700 truncate">{{ e.objectives }}</p>
              <p class="text-[10px] text-slate-400 mt-0.5">{{ e.date }} · {{ lastName(e.therapist) }}</p>
            </button>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div v-if="selected" class="p-6 max-w-2xl space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <InitialsAvatar :initials="initialsOf(selected.child)" :idx="0" size="md" />
              <div>
                <h2 class="text-base font-bold text-slate-800">{{ selected.child }}</h2>
                <div class="flex items-center gap-2 mt-0.5">
                  <AdminBadge :class="specialtyColor(selected.specialty)">{{ selected.specialty }}</AdminBadge>
                  <span class="text-xs text-slate-400">{{ selected.date }}</span>
                </div>
              </div>
            </div>
            <div class="flex gap-1">
              <button type="button" class="p-1.5 rounded-xl hover:bg-slate-100 transition-colors" aria-label="Editar">
                <Edit2 :size="14" class="text-slate-400" />
              </button>
              <button type="button" class="p-1.5 rounded-xl hover:bg-slate-100 transition-colors" aria-label="Mais opções">
                <MoreHorizontal :size="14" class="text-slate-400" />
              </button>
            </div>
          </div>

          <AdminCard class="p-4">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Terapeuta</p>
            <p class="text-sm text-slate-700">{{ selected.therapist }}</p>
          </AdminCard>

          <AdminCard class="p-4">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Registro de Evolução</p>
            <p class="text-sm text-slate-700 leading-relaxed">{{ selected.text }}</p>
          </AdminCard>

          <div v-if="selected.objectives" class="grid grid-cols-2 gap-3">
            <AdminCard class="p-4">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Objetivos</p>
              <p class="text-sm text-slate-700">{{ selected.objectives }}</p>
            </AdminCard>
            <AdminCard class="p-4">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Evolução</p>
              <div class="flex items-center gap-1.5">
                <CheckCircle2 :size="14" class="text-green-500" />
                <p class="text-sm font-semibold text-green-700">{{ selected.evolution }}</p>
              </div>
            </AdminCard>
          </div>
        </div>

        <div v-else class="h-full flex items-center justify-center">
          <div class="text-center">
            <FileText :size="36" class="text-slate-200 mx-auto mb-3" />
            <p class="text-sm text-slate-400">Selecione uma evolução para visualizar</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <AdminModal v-model:open="showForm" title="Nova Evolução">
    <form novalidate @submit.prevent="save">
      <div class="space-y-4">
        <FormField v-model="form.child" label="Criança" as="select" :options="patientNames" :error="form.errors.child" />
        <div class="grid grid-cols-2 gap-3">
          <FormField v-model="form.date" label="Data da sessão" type="date" :error="form.errors.date" />
          <FormField v-model="form.therapist" label="Terapeuta" as="select" :options="THERAPISTS" />
        </div>
        <FormField v-model="form.objectives" label="Objetivos" placeholder="Ex.: Articulação de fonemas..." />
        <FormField
          v-model="form.text"
          label="Registro de evolução *"
          as="textarea"
          :rows="5"
          placeholder="Descreva o andamento da sessão, comportamentos observados, progressos e próximos passos..."
          :error="form.errors.text"
        />
        <FormField v-model="form.rating" label="Evolução geral" as="select" :options="EVOLUTION_RATINGS" />
      </div>
      <div class="flex gap-2 mt-5">
        <AdminButton variant="secondary" class="flex-1 justify-center" @click="showForm = false">Cancelar</AdminButton>
        <AdminButton type="submit" class="flex-1 justify-center" :disabled="form.processing">
          <Check :size="13" />Salvar
        </AdminButton>
      </div>
    </form>
  </AdminModal>
</template>
