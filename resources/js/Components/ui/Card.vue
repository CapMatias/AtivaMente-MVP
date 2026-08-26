<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useMergedClass } from '../../composables/useMergedClass';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

/** Card só vira elemento clicável quando o pai escuta `@click`. */
const clickable = computed(() => Boolean(attrs.onClick));

const { classes, rest } = useMergedClass(() => [
  'block w-full text-left bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]',
  clickable.value &&
    'cursor-pointer transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
]);
</script>

<template>
  <!-- o listener do pai chega por `rest`; não re-emitimos para não disparar duas vezes -->
  <component
    :is="clickable ? 'button' : 'div'"
    :type="clickable ? 'button' : undefined"
    v-bind="rest"
    :class="classes"
  >
    <slot />
  </component>
</template>
