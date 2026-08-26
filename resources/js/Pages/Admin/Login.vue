<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { Brain, Lock, Mail } from 'lucide-vue-next';
import * as z from 'zod';
import AdminButton from '../../Components/admin/AdminButton.vue';
import FormField from '../../Components/admin/FormField.vue';
import { useZodForm } from '../../composables/useZodForm';
import { ADMIN_ROUTES } from '../../services/routes';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  remember: z.boolean(),
});

const { form, handleSubmit } = useZodForm(loginSchema, {
  email: '',
  password: '',
  remember: true,
});

const submit = handleSubmit((f) =>
  f.post(ADMIN_ROUTES.login, { onError: () => f.reset('password') }),
);

const HIGHLIGHTS = [
  { n: '240+', l: 'Crianças' },
  { n: '98%', l: 'Satisfação' },
  { n: '12', l: 'Especialistas' },
];
</script>

<template>
  <Head title="Entrar — Painel" />

  <div class="min-h-dvh bg-[#F8FAFC] flex flex-col lg:flex-row">
    <!-- Hero -->
    <div class="lg:w-1/2 bg-[#2563EB] flex flex-col justify-between p-8 lg:p-12 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div class="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div class="relative flex items-center gap-3">
        <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <Brain :size="20" class="text-white" />
        </div>
        <span class="text-xl font-bold text-white">AtivaMente</span>
      </div>

      <div class="relative py-8 lg:py-0">
        <h2 class="text-2xl lg:text-3xl font-bold text-white leading-tight mb-3">
          Cuidando do<br />desenvolvimento<br />de cada criança
        </h2>
        <p class="text-blue-100 text-sm leading-relaxed max-w-xs">
          Gerencie atendimentos, evoluções clínicas e o desenvolvimento de seus pacientes em um único lugar.
        </p>
        <div class="mt-6 flex gap-5">
          <div v-for="item in HIGHLIGHTS" :key="item.l">
            <p class="text-white font-bold text-lg">{{ item.n }}</p>
            <p class="text-blue-200 text-xs">{{ item.l }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulário -->
    <div class="flex-1 flex items-center justify-center p-6 lg:p-12">
      <div class="w-full max-w-sm">
        <h2 class="text-2xl font-bold text-slate-800 mb-1">Bem-vindo de volta</h2>
        <p class="text-sm text-slate-500 mb-8">Gestão Inteligente de Terapias Infantis</p>

        <form class="space-y-4" novalidate @submit.prevent="submit">
          <FormField
            v-model="form.email"
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            :error="form.errors.email"
          >
            <template #icon><Mail :size="15" /></template>
          </FormField>

          <FormField
            v-model="form.password"
            label="Senha"
            type="password"
            placeholder="Sua senha"
            :error="form.errors.password"
          >
            <template #icon><Lock :size="15" /></template>
          </FormField>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm text-slate-500 cursor-pointer">
              <input v-model="form.remember" type="checkbox" class="rounded" />
              Lembrar-me
            </label>
            <a :href="ADMIN_ROUTES.login" class="text-sm text-blue-600 hover:underline font-medium">
              Esqueci a senha
            </a>
          </div>

          <AdminButton type="submit" size="lg" class="w-full justify-center" :disabled="form.processing">
            <span v-if="form.processing" class="flex items-center gap-2">
              <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Entrando...
            </span>
            <span v-else>Entrar</span>
          </AdminButton>
        </form>

        <p class="text-xs text-center text-slate-400 mt-6">
          Problemas? <a href="mailto:contato@bemcrescer.com.br" class="text-blue-600 hover:underline">Contate o suporte</a>
        </p>
      </div>
    </div>
  </div>
</template>
