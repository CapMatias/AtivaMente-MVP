<script setup lang="ts">
import { useMergedClass } from '../../composables/useMergedClass';

/** Equivalente ao `Btn` do protótipo. */
defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit';
    disabled?: boolean;
  }>(),
  { variant: 'primary', size: 'md', type: 'button', disabled: false },
);

const VARIANTS = {
  primary: 'bg-[#2563EB] text-white hover:bg-blue-700 shadow-sm',
  secondary: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100',
  ghost: 'text-slate-500 hover:bg-slate-100 hover:text-slate-700',
  danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100',
} as const;

const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-sm',
} as const;

const { classes, rest } = useMergedClass(() => [
  'inline-flex items-center gap-2 rounded-xl font-medium transition-all duration-150 active:scale-95',
  'focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 disabled:pointer-events-none',
  VARIANTS[props.variant],
  SIZES[props.size],
]);
</script>

<template>
  <button v-bind="rest" :type="type" :disabled="disabled" :class="classes">
    <slot />
  </button>
</template>
