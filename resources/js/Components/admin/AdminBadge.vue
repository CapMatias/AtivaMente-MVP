<script setup lang="ts">
import { useMergedClass } from '../../composables/useMergedClass';

/** Equivalente ao `Badge` do protótipo: pílula com borda e slot para ícone. */
defineOptions({ inheritAttrs: false });

const { classes, rest } = useMergedClass(
  () => 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border',
);
</script>

<template>
  <span v-bind="rest" :class="classes"><slot /></span>
</template>
