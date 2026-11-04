<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';
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
// Campos de senha ganham o botão de mostrar/ocultar; os demais ficam como estavam.
const isPassword = computed(() => props.secure || props.type === 'password');
const visible = ref(false);
const inputType = computed(() => (isPassword.value && !visible.value ? 'password' : isPassword.value ? 'text' : props.type));

const { classes, rest } = useMergedClass(() => 'mb-4');
</script>

<template>
  <div v-bind="rest" :class="classes">
    <label v-if="label" :for="id" class="block text-slate-600 mb-2 font-medium">{{ label }}</label>
    <div class="relative">
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
        isPassword ? 'pr-12' : '',
      ]"
    />
    <button
      v-if="isPassword"
      type="button"
      class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
      :aria-label="visible ? 'Ocultar senha' : 'Mostrar senha'"
      :aria-pressed="visible"
      @click="visible = !visible"
    >
      <EyeOff v-if="visible" :size="18" />
      <Eye v-else :size="18" />
    </button>
    </div>
    <p v-if="error" :id="`${id}-error`" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>
