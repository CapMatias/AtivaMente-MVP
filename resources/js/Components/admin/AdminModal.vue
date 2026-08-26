<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue';
import { X } from 'lucide-vue-next';

/**
 * Equivalente ao `Modal` do protótipo: bottom sheet no mobile, diálogo
 * centralizado a partir de `sm`, com cabeçalho fixo.
 */
defineProps<{ title: string }>();

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
      <div
        v-if="open"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
        @click.self="close"
      >
        <div
          class="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
        >
          <div
            class="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10"
          >
            <h3 class="text-base font-bold text-slate-800">{{ title }}</h3>
            <button
              type="button"
              class="p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Fechar"
              @click="close"
            >
              <X :size="16" class="text-slate-500" />
            </button>
          </div>
          <div class="p-5"><slot /></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
