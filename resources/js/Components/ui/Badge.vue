<script setup lang="ts">
import { useMergedClass } from '../../composables/useMergedClass';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label: string;
    color?: 'blue' | 'green' | 'red' | 'gray' | 'orange';
  }>(),
  { color: 'blue' },
);

const COLOR_MAP = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  red: 'bg-red-100 text-red-600',
  gray: 'bg-slate-100 text-slate-600',
  orange: 'bg-orange-100 text-orange-600',
} as const;

const { classes, rest } = useMergedClass(
  () => `inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-bold ${COLOR_MAP[props.color]}`,
);
</script>

<template>
  <span v-bind="rest" :class="classes">{{ label }}</span>
</template>
