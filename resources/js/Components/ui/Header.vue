<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    showBack?: boolean;
  }>(),
  { showBack: false },
);

const emit = defineEmits<{ (e: 'back'): void }>();
</script>

<template>
  <header class="flex flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
    <div class="flex flex-row items-center">
      <button
        v-if="showBack"
        type="button"
        class="mr-4 p-2 rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
        aria-label="Voltar"
        @click="emit('back')"
      >
        ←
      </button>
      <h1 class="text-xl font-bold text-slate-800">{{ title }}</h1>
    </div>
    <slot name="actions" />
  </header>
</template>
