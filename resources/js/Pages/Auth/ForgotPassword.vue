<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import * as z from 'zod';
import AuthLayout from '../../Layouts/AuthLayout.vue';
import Input from '../../Components/ui/Input.vue';
import PrimaryButton from '../../Components/ui/PrimaryButton.vue';
import Toast from '../../Components/ui/Toast.vue';
import { useToast } from '../../composables/useToast';
import { useZodForm } from '../../composables/useZodForm';
import { ROUTES } from '../../services/routes';

defineOptions({ layout: AuthLayout });

/** `status` é a flash message que o backend devolve após enviar o e-mail. */
defineProps<{ status?: string }>();

const recoverySchema = z.object({
  email: z.string().email('Email inválido'),
});

const { form, handleSubmit } = useZodForm(recoverySchema, { email: '' });
const { visible: toastVisible, message: toastMessage, type: toastType, show: showToast } = useToast();

const submit = handleSubmit((f) =>
  f.post(ROUTES.forgotPassword, {
    onSuccess: () => {
      // Substitui o `alert()` da versão React Native.
      showToast('E-mail de recuperação enviado!', 'success');
      f.reset();
    },
  }),
);
</script>

<template>
  <Head title="Recuperar senha" />

  <Toast v-model:visible="toastVisible" :message="toastMessage" :type="toastType" />

  <form novalidate @submit.prevent="submit">
    <div class="mb-12">
      <h1 class="text-slate-800 text-3xl font-bold mb-2">Recuperar Senha</h1>
      <p class="text-slate-400 text-lg">Insira seu e-mail para redefinir sua senha</p>
    </div>

    <p v-if="status" class="mb-4 text-green-600 font-medium">{{ status }}</p>

    <Input
      v-model="form.email"
      label="Email"
      type="email"
      placeholder="seu@email.com"
      :error="form.errors.email"
    />

    <PrimaryButton title="Enviar Link" type="submit" :loading="form.processing" />

    <div class="mt-6 text-center">
      <span class="text-slate-500">
        Voltar para o
        <Link :href="ROUTES.login" class="text-blue-600 font-bold">Login</Link>
      </span>
    </div>
  </form>
</template>
