<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { AlertCircle, ChevronRight, Edit2, Eye, Plus, Search, Trash2 } from 'lucide-vue-next';
import AdminLayout from '../../../Layouts/AdminLayout.vue';
import AdminBadge from '../../../Components/admin/AdminBadge.vue';
import AdminButton from '../../../Components/admin/AdminButton.vue';
import AdminCard from '../../../Components/admin/AdminCard.vue';
import InitialsAvatar from '../../../Components/admin/InitialsAvatar.vue';
import { specialtyColor, statusColor } from '../../../constants/adminTokens';
import { ADMIN_ROUTES } from '../../../services/routes';
import { PATIENTS } from '../../../services/adminMockData';
import type { Patient } from '../../../types/admin';

defineOptions({
  layout: AdminLayout,
  layoutProps: { title: 'Crianças', subtitle: 'Gestão de pacientes' },
});

const props = withDefaults(defineProps<{ patients?: Patient[] }>(), {
  patients: () => PATIENTS,
});

const search = ref('');
const filter = ref('Todos');

const FILTERS = ['Todos', 'Ativo', 'Inativo', 'Fonoaudiologia', 'Psicologia', 'Fisioterapia'];

const TABLE_HEADS = ['Nome', 'Idade', 'Diagnóstico', 'Especialidade', 'Responsável', 'Status', 'Ações'];

const filtered = computed(() => {
  const q = search.value.toLowerCase();
  return props.patients.filter((c) => {
    const matches = c.name.toLowerCase().includes(q) || c.diagnosis.toLowerCase().includes(q);
    const inFilter = filter.value === 'Todos' || c.specialty === filter.value || c.status === filter.value;
    return matches && inFilter;
  });
});

function open(id: number) {
  router.visit(ADMIN_ROUTES.child(id));
}
</script>

<template>
  <Head title="Crianças" />

  <div class="flex-1 overflow-y-auto">
    <div class="p-4 lg:p-6 space-y-4 pb-24 lg:pb-6">
      <div class="flex items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold text-slate-800">Crianças</h2>
          <p class="text-xs text-slate-500">{{ patients.length }} pacientes cadastrados</p>
        </div>
        <AdminButton size="sm" @click="router.visit(ADMIN_ROUTES.childCreate)">
          <Plus :size="14" />Nova
        </AdminButton>
      </div>

      <!-- Busca + filtros -->
      <AdminCard class="p-3">
        <div class="relative mb-3">
          <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            v-model="search"
            type="search"
            placeholder="Buscar nome ou diagnóstico..."
            aria-label="Buscar criança"
            class="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400"
          />
        </div>
        <div class="flex gap-1.5 flex-wrap">
          <button
            v-for="f in FILTERS"
            :key="f"
            type="button"
            class="px-3 py-1 rounded-lg text-xs font-medium transition-all"
            :class="filter === f ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
            :aria-pressed="filter === f"
            @click="filter = f"
          >
            {{ f }}
          </button>
        </div>
      </AdminCard>

      <!-- Cards (mobile) -->
      <div class="space-y-2 lg:hidden">
        <AdminCard v-for="(c, i) in filtered" :key="c.id" class="p-4" @click="open(c.id)">
          <div class="flex items-center gap-3">
            <InitialsAvatar :initials="c.avatar" :idx="i" size="md" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <p class="text-sm font-bold text-slate-800">{{ c.name }}</p>
                <AdminBadge :class="statusColor(c.status)">{{ c.status }}</AdminBadge>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">{{ c.age }} anos · {{ c.diagnosis }}</p>
              <p class="text-xs text-slate-400 mt-0.5">{{ c.responsible }} · {{ c.phone }}</p>
            </div>
            <ChevronRight :size="16" class="text-slate-300 flex-shrink-0" />
          </div>
          <div class="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
            <AdminBadge :class="specialtyColor(c.specialty)">{{ c.specialty }}</AdminBadge>
            <p class="text-xs text-slate-400">{{ c.therapist }}</p>
          </div>
        </AdminCard>
      </div>

      <!-- Tabela (desktop) -->
      <AdminCard class="overflow-hidden hidden lg:block">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50/80 border-b border-slate-100">
              <th
                v-for="h in TABLE_HEADS"
                :key="h"
                scope="col"
                class="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide"
              >
                {{ h }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(c, i) in filtered"
              :key="c.id"
              class="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group"
            >
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <InitialsAvatar :initials="c.avatar" :idx="i" size="sm" />
                  <div>
                    <p class="text-sm font-semibold text-slate-800">{{ c.name }}</p>
                    <p class="text-xs text-slate-400">{{ c.therapist }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-slate-700">{{ c.age }} anos</td>
              <td class="px-4 py-3 text-sm text-slate-700">{{ c.diagnosis }}</td>
              <td class="px-4 py-3">
                <AdminBadge :class="specialtyColor(c.specialty)">{{ c.specialty }}</AdminBadge>
              </td>
              <td class="px-4 py-3">
                <p class="text-sm text-slate-700">{{ c.responsible }}</p>
                <p class="text-xs text-slate-400">{{ c.phone }}</p>
              </td>
              <td class="px-4 py-3">
                <AdminBadge :class="statusColor(c.status)">{{ c.status }}</AdminBadge>
              </td>
              <td class="px-4 py-3">
                <div class="flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <Link
                    :href="ADMIN_ROUTES.child(c.id)"
                    class="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                    :aria-label="`Ver ${c.name}`"
                  >
                    <Eye :size="14" />
                  </Link>
                  <Link
                    :href="ADMIN_ROUTES.childCreate"
                    class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                    :aria-label="`Editar ${c.name}`"
                  >
                    <Edit2 :size="14" />
                  </Link>
                  <button
                    type="button"
                    class="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                    :aria-label="`Excluir ${c.name}`"
                  >
                    <Trash2 :size="14" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filtered.length === 0" class="py-12 text-center">
          <AlertCircle :size="28" class="text-slate-300 mx-auto mb-3" />
          <p class="text-sm text-slate-400">Nenhuma criança encontrada</p>
        </div>
      </AdminCard>
    </div>
  </div>
</template>
