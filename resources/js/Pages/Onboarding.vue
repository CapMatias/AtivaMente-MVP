<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import PrimaryButton from '../Components/ui/PrimaryButton.vue';
import { ROUTES } from '../services/routes';

const ONBOARDING_STEPS = [
  {
    title: 'Acompanhe o desenvolvimento do seu filho.',
    description: 'Tenha acesso a todas as evoluções e relatórios em um só lugar.',
    image: 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png',
  },
  {
    title: 'Agende terapias de forma rápida.',
    description: 'Solicite novos horários e organize a agenda do seu filho com facilidade.',
    image: 'https://cdn-icons-png.flaticon.com/512/2693/2693507.png',
  },
  {
    title: 'Receba evoluções diretamente no app.',
    description: 'Fique por dentro de cada conquista do seu filho em tempo real.',
    image: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
  },
];

const currentStep = ref(0);
const step = computed(() => ONBOARDING_STEPS[currentStep.value]);
const isLast = computed(() => currentStep.value === ONBOARDING_STEPS.length - 1);

function nextStep() {
  if (!isLast.value) {
    currentStep.value += 1;
  } else {
    router.visit(ROUTES.login, { replace: true });
  }
}
</script>

<template>
  <Head title="Bem-vindo" />

  <div class="min-h-dvh bg-white px-8 flex flex-col">
    <div class="flex-1 flex flex-col justify-center items-center">
      <img
        :key="currentStep"
        :src="step.image"
        alt=""
        class="w-64 h-64 mb-12 animate-scale-in opacity-0"
      />
      <div :key="`text-${currentStep}`" class="flex flex-col items-center animate-fade-in-up opacity-0" style="animation-delay: 0.2s">
        <h1 class="text-slate-800 text-2xl font-bold text-center mb-4">{{ step.title }}</h1>
        <p class="text-slate-500 text-center text-lg mb-12 leading-6">{{ step.description }}</p>
      </div>
    </div>

    <div class="flex flex-row justify-between items-center mb-12">
      <div class="flex flex-row gap-2">
        <span
          v-for="(_, index) in ONBOARDING_STEPS"
          :key="index"
          class="h-2 rounded-full transition-all duration-300"
          :class="index === currentStep ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200'"
        />
      </div>
      <PrimaryButton
        :title="isLast ? 'Começar' : 'Próximo'"
        class="w-32"
        @click="nextStep"
      />
    </div>
  </div>
</template>
