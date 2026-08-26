<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue';

const emit = defineEmits<{ (e: 'closed'): void }>();

defineProps<{
  /** Título opcional do diálogo. */
  title?: string;
}>();

/** `v-model:open` substitui o par `visible` + `onClose` do React Native. */
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

// Avisa o pai quando o diálogo termina de fechar (ex.: para limpar formulários).
watch(open, (value, previous) => {
  if (previous && !value) emit('closed');
});

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
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/50" @click="close" />
        <div
          class="relative bg-white rounded-3xl p-6 mx-8 w-[85%] max-w-md max-h-[80%] overflow-y-auto shadow-[0_8px_24px_rgba(0,0,0,0.15)] animate-scale-in"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
        >
          <p v-if="title" class="text-slate-800 text-xl font-bold mb-4">{{ title }}</p>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
