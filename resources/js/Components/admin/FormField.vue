<script setup lang="ts">
import { computed, useId, useSlots } from 'vue';

/**
 * Equivalente ao `Field` do protótipo — input, textarea ou select com o mesmo
 * tratamento visual, rótulo opcional e slot de ícone à esquerda.
 */
withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    type?: string;
    as?: 'input' | 'textarea' | 'select';
    rows?: number;
    options?: string[];
    error?: string;
  }>(),
  { type: 'text', as: 'input', rows: 3 },
);

const model = defineModel<string>({ default: '' });

const id = useId();
const slots = useSlots();

const BASE =
  'w-full bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 transition-all';

const padding = computed(() => (slots.icon ? 'pl-9 pr-3' : 'px-3'));
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-sm font-medium text-slate-700">{{ label }}</label>

    <div class="relative">
      <div
        v-if="slots.icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      >
        <slot name="icon" />
      </div>

      <textarea
        v-if="as === 'textarea'"
        :id="id"
        v-model="model"
        :rows="rows"
        :placeholder="placeholder"
        :class="[BASE, 'px-3 py-2.5 resize-none']"
      />

      <select
        v-else-if="as === 'select'"
        :id="id"
        v-model="model"
        :class="[BASE, padding, 'py-2.5 appearance-none']"
      >
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>

      <input
        v-else
        :id="id"
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :aria-invalid="Boolean(error)"
        :class="[BASE, padding, 'py-2.5']"
      />
    </div>

    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>
