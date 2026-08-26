<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import * as z from 'zod';
import AuthLayout from '../../Layouts/AuthLayout.vue';
import Input from '../../Components/ui/Input.vue';
import PrimaryButton from '../../Components/ui/PrimaryButton.vue';
import { useZodForm } from '../../composables/useZodForm';
import { ROUTES } from '../../services/routes';

defineOptions({ layout: AuthLayout, layoutProps: { centered: false } });

const signupSchema = z
  .object({
    name: z.string().min(3, 'Nome muito curto'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(9, 'Telefone inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

const { form, handleSubmit } = useZodForm(signupSchema, {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
});

const submit = handleSubmit((f) =>
  f.post(ROUTES.signup, {
    onError: () => f.reset('password', 'confirmPassword'),
  }),
);
</script>

<template>
  <Head title="Criar conta" />

  <form novalidate @submit.prevent="submit">
    <div class="mb-8">
      <h1 class="text-slate-800 text-3xl font-bold mb-2">Crie sua conta</h1>
      <p class="text-slate-400 text-lg">Junte-se ao AtivaMente</p>
    </div>

    <Input v-model="form.name" label="Nome Completo" placeholder="João Silva" :error="form.errors.name" />
    <Input v-model="form.email" label="Email" type="email" placeholder="email@exemplo.com" :error="form.errors.email" />
    <Input v-model="form.phone" label="Telefone" type="tel" placeholder="(11) 99999-9999" :error="form.errors.phone" />
    <Input v-model="form.password" label="Senha" secure placeholder="••••••••" :error="form.errors.password" />
    <Input
      v-model="form.confirmPassword"
      label="Confirmar Senha"
      secure
      placeholder="••••••••"
      :error="form.errors.confirmPassword"
    />

    <PrimaryButton title="Criar Conta" type="submit" class="mt-4" :loading="form.processing" />

    <div class="mt-6 text-center">
      <span class="text-slate-500">
        Já tem conta?
        <Link :href="ROUTES.login" class="text-blue-600 font-bold">Entrar</Link>
      </span>
    </div>
  </form>
</template>
