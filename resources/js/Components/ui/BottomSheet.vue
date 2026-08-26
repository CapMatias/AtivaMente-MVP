<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue';

defineProps<{ title?: string }>();

const open = defineModel<boolean>('open', { default: false });

function close() {
  open.value = false;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close();
}

watch(
  open,
  (value) => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = value ? 'hidden' : '';
    if (value) document.addEventListener('keydown', onKeydown);
    else document.removeEventListener('keydown', onKeydown);
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/50" @click="close" />
        <div
          class="absolute bottom-0 left-0 right-0 mx-auto w-full max-w-lg bg-white rounded-t-3xl p-6 pb-10 max-h-[85%] overflow-y-auto shadow-[0_-4px_16px_rgba(0,0,0,0.1)] animate-slide-in-up"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
        >
          <div class="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
          <p v-if="title" class="text-slate-800 text-xl font-bold mb-4">{{ title }}</p>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
