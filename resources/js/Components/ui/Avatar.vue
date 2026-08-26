<script setup lang="ts">
import { useMergedClass } from '../../composables/useMergedClass';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    src: string;
    size?: 'sm' | 'md' | 'lg';
    alt?: string;
  }>(),
  { size: 'md', alt: '' },
);

const SIZE_MAP = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
} as const;

const { classes, rest } = useMergedClass(
  () => `${SIZE_MAP[props.size]} rounded-full overflow-hidden border-2 border-white shadow-sm`,
);
</script>

<template>
  <div v-bind="rest" :class="classes">
    <img :src="src" :alt="alt" class="w-full h-full object-cover" />
  </div>
</template>
