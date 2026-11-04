<script setup lang="ts">
import logo from '../../images/logo.svg';

withDefaults(defineProps<{ centered?: boolean }>(), { centered: true });
</script>

<template>
  <!-- Equivalente às telas de auth do Stack: fundo branco, sem tab bar. -->
  <div
    class="min-h-dvh bg-white px-8 flex flex-col"
    :class="centered ? 'justify-center' : 'py-12'"
  >
    <div class="w-full max-w-md mx-auto">
      <img :src="logo" alt="Logo do AtivaMente" class="w-16 h-16 object-contain mb-6" />
      <slot />
    </div>
  </div>
</template>
