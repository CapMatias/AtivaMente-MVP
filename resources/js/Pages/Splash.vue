<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { onBeforeUnmount, onMounted } from 'vue';
import { ROUTES } from '../services/routes';

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
      <div class="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mb-4 shadow-lg">
        <span class="text-white text-4xl font-bold">A</span>
      </div>
      <p class="text-slate-800 text-3xl font-bold tracking-tight animate-fade-in-down opacity-0">
        AtivaMente
      </p>
      <p class="text-slate-400 text-lg mt-2 animate-fade-in opacity-0" style="animation-delay: 0.5s">
        Cuidado e Evolução
      </p>
    </div>
  </div>
</template>
