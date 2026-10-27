<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { onBeforeUnmount, onMounted } from 'vue';
import { ROUTES } from '../../services/routes';
import logo from '../../../images/logo.svg';

/** Equivalente ao `SplashScreen`: após 3s segue para o onboarding. */
let timer: ReturnType<typeof setTimeout>;

onMounted(() => {
  timer = setTimeout(() => {
    router.visit(ROUTES.onboarding, { replace: true });
  }, 3000);
});

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <Head title="AtivaMente" />

  <div class="min-h-dvh bg-white flex flex-col justify-center items-center">
    <div class="flex flex-col items-center animate-bounce-in opacity-0">
      <img :src="logo" alt="Logo do AtivaMente" class="w-28 h-28 mb-4 object-contain" />
      <p class="text-slate-800 text-3xl font-bold tracking-tight animate-fade-in-down opacity-0">
        AtivaMente
      </p>
      <p class="text-slate-400 text-lg mt-2 animate-fade-in opacity-0" style="animation-delay: 0.5s">
        Cuidado e Evolução
      </p>
    </div>
  </div>
</template>
