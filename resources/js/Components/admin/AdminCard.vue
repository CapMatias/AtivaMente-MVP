<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useMergedClass } from '../../composables/useMergedClass';

/** Equivalente ao `Card` do protótipo (raio `xl`, borda slate-100). */
defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const clickable = computed(() => Boolean(attrs.onClick));

const { classes, rest } = useMergedClass(() => [
  'bg-white rounded-xl border border-slate-100 shadow-sm text-left',
  clickable.value &&
    'w-full cursor-pointer active:scale-[0.99] hover:shadow-md hover:border-blue-100 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50',
]);
</script>

<template>
  <component
    :is="clickable ? 'button' : 'div'"
    :type="clickable ? 'button' : undefined"
    v-bind="rest"
    :class="classes"
  >
    <slot />
  </component>
</template>
