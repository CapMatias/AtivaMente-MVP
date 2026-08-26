<script setup lang="ts">
import { computed } from 'vue';
import { AVATAR_COLORS } from '../../constants/adminTokens';
import { useMergedClass } from '../../composables/useMergedClass';

/** Equivalente ao primitivo `Av` do protótipo: iniciais sobre cor rotativa. */
defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    initials: string;
    idx?: number;
    size?: 'xs' | 'sm' | 'md' | 'lg';
  }>(),
  { idx: 0, size: 'md' },
);

const SIZE_MAP = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
} as const;

const tone = computed(() => AVATAR_COLORS[props.idx % AVATAR_COLORS.length]);

const { classes, rest } = useMergedClass(
  () =>
    `${SIZE_MAP[props.size]} ${tone.value} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`,
);
</script>

<template>
  <div v-bind="rest" :class="classes" aria-hidden="true">{{ initials }}</div>
</template>
