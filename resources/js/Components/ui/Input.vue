<script setup lang="ts">
import { computed, useId } from 'vue';
import { useMergedClass } from '../../composables/useMergedClass';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    /** `secure` substitui o `secureTextEntry` do React Native. */
    secure?: boolean;
    type?: string;
    error?: string;
  }>(),
  { placeholder: '', secure: false, type: 'text' },
);

/** Substitui o par `value` / `onChangeText`. */
const model = defineModel<string>({ default: '' });

const id = useId();
const inputType = computed(() => (props.secure ? 'password' : props.type));

const { classes, rest } = useMergedClass(() => 'mb-4');
</script>

<template>
  <div v-bind="rest" :class="classes">
    <label v-if="label" :for="id" class="block text-slate-600 mb-2 font-medium">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      :type="inputType"
      :placeholder="placeholder"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? `${id}-error` : undefined"
      :class="[
        'w-full p-4 rounded-2xl border bg-white text-slate-800 outline-none transition-colors placeholder:text-slate-400',
        error ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600',
      ]"
    />
    <p v-if="error" :id="`${id}-error`" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>
