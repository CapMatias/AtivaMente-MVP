<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
  icon?: string;
}>();
</script>

<template>
  <div class="flex flex-col flex-1 items-center justify-center py-12 px-6">
    <p v-if="icon" class="text-5xl mb-4" aria-hidden="true">{{ icon }}</p>
    <p class="text-slate-800 text-lg font-bold text-center mb-2">{{ title }}</p>
    <p v-if="description" class="text-slate-400 text-center leading-5">{{ description }}</p>
  </div>
</template>
