<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    message: string;
    type?: 'success' | 'error' | 'info';
    /** Milissegundos até esconder sozinho. */
    duration?: number;
  }>(),
  { type: 'info', duration: 3000 },
);

const visible = defineModel<boolean>('visible', { default: false });

const BG_MAP = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-600',
} as const;

let timer: ReturnType<typeof setTimeout> | undefined;

function clear() {
  if (timer) clearTimeout(timer);
  timer = undefined;
}

watch(visible, (value) => {
  clear();
  if (value) {
    timer = setTimeout(() => {
      visible.value = false;
    }, props.duration);
  }
});

onBeforeUnmount(clear);
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="visible"
        role="status"
        aria-live="polite"
        :class="['fixed top-16 left-6 right-6 mx-auto max-w-md px-4 py-3 rounded-2xl shadow-lg z-50', BG_MAP[type]]"
      >
        <p class="text-white font-medium text-center">{{ message }}</p>
      </div>
    </Transition>
  </Teleport>
</template>
