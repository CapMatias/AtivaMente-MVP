<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    width?: number | string;
    height?: number;
    borderRadius?: number;
    count?: number;
  }>(),
  { width: '100%', height: 20, borderRadius: 8, count: 1 },
);

const toSize = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);

/** A animação de opacidade em loop virou a keyframe `pulse-soft` do CSS. */
const style = computed(() => ({
  width: toSize(props.width),
  height: `${props.height}px`,
  borderRadius: `${props.borderRadius}px`,
}));
</script>

<template>
  <div>
    <div
      v-for="i in count"
      :key="i"
      class="mb-2 bg-slate-200 animate-pulse-soft"
      :style="style"
      aria-hidden="true"
    />
  </div>
</template>
