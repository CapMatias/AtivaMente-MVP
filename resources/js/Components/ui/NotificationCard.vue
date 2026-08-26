<script setup lang="ts">
import { computed } from 'vue';
import Badge from './Badge.vue';
import Card from './Card.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    title: string;
    message: string;
    time: string;
    read?: boolean;
    type?: 'info' | 'success' | 'warning';
  }>(),
  { read: false, type: 'info' },
);

const badgeColor = computed(() =>
  props.type === 'success' ? 'green' : props.type === 'warning' ? 'orange' : 'blue',
);

const badgeLabel = computed(() =>
  props.type === 'success' ? 'Concluído' : props.type === 'warning' ? 'Atenção' : 'Novo',
);
</script>

<template>
  <Card :class="['mb-3', !read && 'border-l-4 border-blue-600']" v-bind="$attrs">
    <div class="flex flex-row justify-between items-start mb-1">
      <p class="text-slate-800 font-bold flex-1 mr-2">{{ title }}</p>
      <Badge :label="badgeLabel" :color="badgeColor" />
    </div>
    <p class="text-slate-500 text-sm leading-4 mb-2">{{ message }}</p>
    <p class="text-slate-400 text-xs">{{ time }}</p>
  </Card>
</template>
