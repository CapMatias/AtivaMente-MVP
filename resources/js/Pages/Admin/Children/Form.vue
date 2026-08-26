<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { ArrowLeft, Baby, Check, FileText, Mail, Phone, User } from 'lucide-vue-next';
import * as z from 'zod';
import AdminLayout from '../../../Layouts/AdminLayout.vue';
import AdminButton from '../../../Components/admin/AdminButton.vue';
import AdminCard from '../../../Components/admin/AdminCard.vue';
import FormField from '../../../Components/admin/FormField.vue';
import { useZodForm } from '../../../composables/useZodForm';
import { ADMIN_ROUTES } from '../../../services/routes';
import { SPECIALTIES, THERAPISTS } from '../../../services/adminMockData';

defineOptions({
  layout: AdminLayout,
  layoutProps: { title: 'Nova Criança', subtitle: 'Cadastro de paciente' },
});

const RELATIONSHIPS = ['Mãe', 'Pai', 'Avó/Avô', 'Tutor(a)'];

/** Os campos marcados com * no protótipo viraram regras Zod. */
const childSchema = z.object({
  name: z.string().min(3, 'Informe o nome completo'),
  dob: z.string().min(1, 'Informe a data de nascimento'),
  diagnosis: z.string(),
  specialty: z.string().min(1),
  therapist: z.string(),
  responsible: z.string().min(3, 'Informe o responsável'),
  phone: z.string().min(9, 'Telefone inválido'),
  email: z.string().email('E-mail inválido').or(z.literal('')),
  relationship: z.string(),
  document: z.string(),
  observations: z.string(),
});

const { form, handleSubmit } = useZodForm(childSchema, {
  name: '',
  dob: '',
  diagnosis: '',
  specialty: SPECIALTIES[0],
  therapist: THERAPISTS[0],
  responsible: '',
  phone: '',
  email: '',
  relationship: RELATIONSHIPS[0],
  document: '',
  observations: '',
});

const submit = handleSubmit((f) => f.post(ADMIN_ROUTES.childStore));
</script>

<template>
  <Head title="Nova Criança" />

  <div class="flex-1 overflow-y-auto">
    <form class="p-4 lg:p-6 pb-28 lg:pb-6 max-w-2xl mx-auto space-y-4" novalidate @submit.prevent="submit">
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="p-2 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Voltar"
          @click="router.visit(ADMIN_ROUTES.children)"
        >
          <ArrowLeft :size="17" class="text-slate-600" />
        </button>
        <div>
          <h2 class="text-lg font-bold text-slate-800">Nova Criança</h2>
          <p class="text-xs text-slate-500">Cadastro de novo paciente</p>
        </div>
      </div>

      <!-- Dados da criança -->
      <AdminCard class="p-5">
        <h3 class="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
          <span class="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
            <Baby :size="13" class="text-blue-600" />
          </span>
          Dados da Criança
        </h3>
        <div class="space-y-4">
          <FormField v-model="form.name" label="Nome completo *" placeholder="Nome da criança" :error="form.errors.name" />
          <div class="grid grid-cols-2 gap-3">
            <FormField v-model="form.dob" label="Data de nascimento *" type="date" :error="form.errors.dob" />
            <FormField v-model="form.diagnosis" label="Diagnóstico" placeholder="Ex.: TEA, TDAH..." />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <FormField v-model="form.specialty" label="Especialidade *" as="select" :options="SPECIALTIES" />
            <FormField v-model="form.therapist" label="Terapeuta" as="select" :options="THERAPISTS" />
          </div>
        </div>
      </AdminCard>

      <!-- Responsável -->
      <AdminCard class="p-5">
        <h3 class="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
          <span class="w-6 h-6 bg-purple-50 rounded-lg flex items-center justify-center">
            <User :size="13" class="text-purple-600" />
          </span>
          Responsável
        </h3>
        <div class="space-y-4">
          <FormField
            v-model="form.responsible"
            label="Nome do responsável *"
            placeholder="Nome completo"
            :error="form.errors.responsible"
          >
            <template #icon><User :size="14" /></template>
          </FormField>
          <div class="grid grid-cols-2 gap-3">
            <FormField v-model="form.phone" label="Telefone *" placeholder="(11) 9XXXX-XXXX" :error="form.errors.phone">
              <template #icon><Phone :size="14" /></template>
            </FormField>
            <FormField v-model="form.email" label="E-mail" type="email" placeholder="email@exemplo.com" :error="form.errors.email">
              <template #icon><Mail :size="14" /></template>
            </FormField>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <FormField v-model="form.relationship" label="Parentesco" as="select" :options="RELATIONSHIPS" />
            <FormField v-model="form.document" label="CPF" placeholder="000.000.000-00" />
          </div>
        </div>
      </AdminCard>

      <!-- Observações clínicas -->
      <AdminCard class="p-5">
        <h3 class="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
          <span class="w-6 h-6 bg-green-50 rounded-lg flex items-center justify-center">
            <FileText :size="13" class="text-green-600" />
          </span>
          Observações Clínicas
        </h3>
        <FormField
          v-model="form.observations"
          as="textarea"
          :rows="4"
          placeholder="Histórico clínico, comorbidades, medicamentos, alergias, informações relevantes..."
        />
      </AdminCard>

      <div class="flex gap-3">
        <AdminButton
          variant="secondary"
          class="flex-1 justify-center"
          @click="router.visit(ADMIN_ROUTES.children)"
        >
          Cancelar
        </AdminButton>
        <AdminButton type="submit" class="flex-1 justify-center" :disabled="form.processing">
          <Check :size="14" />Salvar Paciente
        </AdminButton>
      </div>
    </form>
  </div>
</template>
