<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import * as z from 'zod';
import AuthLayout from '../../Layouts/AuthLayout.vue';
import Input from '../../Components/ui/Input.vue';
import PrimaryButton from '../../Components/ui/PrimaryButton.vue';
import { useZodForm } from '../../composables/useZodForm';
import { ROUTES } from '../../services/routes';

defineOptions({ layout: AuthLayout });

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

const { form, handleSubmit } = useZodForm(loginSchema, { email: '', password: '' });

/**
 * O POST vai para o servidor; em caso de sucesso o backend redireciona para
 * `/home` (o Inertia troca a página) e em caso de erro devolve os erros de
 * validação, que caem no mesmo `form.errors`.
 */
const submit = handleSubmit((f) =>
  f.post(ROUTES.login, {
    onError: () => f.reset('password'),
  }),
);
</script>

<template>
  <Head title="Entrar" />

  <form novalidate @submit.prevent="submit">
    <div class="mb-12">
      <h1 class="text-slate-800 text-4xl font-bold mb-2">Bem-vindo!</h1>
      <p class="text-slate-400 text-lg">Acesse sua conta para continuar</p>
    </div>

    <Input
      v-model="form.email"
      label="Email"
      type="email"
      placeholder="seu@email.com"
      :error="form.errors.email"
    />

    <Input
      v-model="form.password"
      label="Senha"
      secure
      placeholder="••••••••"
      :error="form.errors.password"
    />

    <div class="mb-8 flex justify-end">
      <Link :href="ROUTES.forgotPassword" class="text-blue-600 font-medium">Esqueci minha senha</Link>
    </div>

    <PrimaryButton title="Entrar" type="submit" :loading="form.processing" />

    <div class="mt-6 text-center">
      <span class="text-slate-500">
        Não tem conta?
        <Link :href="ROUTES.signup" class="text-blue-600 font-bold">Criar conta</Link>
      </span>
    </div>
  </form>
</template>
