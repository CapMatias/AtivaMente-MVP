<script setup lang="ts">
import { computed } from 'vue';
import { useMergedClass } from '../../composables/useMergedClass';
import Spinner from './Spinner.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    title: string;
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit';
  }>(),
  { loading: false, disabled: false, type: 'button' },
);

const inactive = computed(() => props.loading || props.disabled);

const { classes, rest } = useMergedClass(() => [
  'w-full py-4 px-6 rounded-2xl flex flex-row justify-center items-center border border-blue-600 font-bold text-lg text-blue-600 transition-colors hover:bg-blue-50',
  inactive.value && 'opacity-50 cursor-not-allowed hover:bg-transparent',
]);
</script>

<template>
  <button v-bind="rest" :type="type" :disabled="inactive" :class="classes">
    <Spinner v-if="loading" class="text-blue-600" />
    <span v-else>{{ title }}</span>
  </button>
</template>
