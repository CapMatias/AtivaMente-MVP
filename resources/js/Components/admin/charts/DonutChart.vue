<script setup lang="ts">
import { computed } from 'vue';
import type { SpecialtySlice } from '../../../types/admin';

/**
 * Substitui o `<PieChart>` com `innerRadius`/`paddingAngle` do recharts.
 * Cada fatia é um arco SVG; o vão entre elas vem do `paddingAngle`.
 */
const props = withDefaults(
  defineProps<{
    data: SpecialtySlice[];
    size?: number;
    innerRadius?: number;
    outerRadius?: number;
    paddingAngle?: number;
  }>(),
  { size: 110, innerRadius: 28, outerRadius: 50, paddingAngle: 3 },
);

const total = computed(() => props.data.reduce((sum, slice) => sum + slice.value, 0) || 1);
const center = computed(() => props.size / 2);

/** Ângulo (graus, 0 = topo) para coordenada cartesiana. */
function polar(radius: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: center.value + radius * Math.cos(rad), y: center.value + radius * Math.sin(rad) };
}

const arcs = computed(() => {
  let cursor = 0;

  return props.data.map((slice) => {
    const sweep = (slice.value / total.value) * 360;
    const start = cursor + props.paddingAngle / 2;
    const end = cursor + sweep - props.paddingAngle / 2;
    cursor += sweep;

    const outerStart = polar(props.outerRadius, start);
    const outerEnd = polar(props.outerRadius, end);
    const innerEnd = polar(props.innerRadius, end);
    const innerStart = polar(props.innerRadius, start);
    const largeArc = end - start > 180 ? 1 : 0;

    const d = [
      `M${outerStart.x},${outerStart.y}`,
      `A${props.outerRadius},${props.outerRadius} 0 ${largeArc} 1 ${outerEnd.x},${outerEnd.y}`,
      `L${innerEnd.x},${innerEnd.y}`,
      `A${props.innerRadius},${props.innerRadius} 0 ${largeArc} 0 ${innerStart.x},${innerStart.y}`,
      'Z',
    ].join(' ');

    return { d, color: slice.color, name: slice.name, value: slice.value };
  });
});
</script>

<template>
  <svg
    :viewBox="`0 0 ${size} ${size}`"
    :width="size"
    :height="size"
    class="flex-shrink-0"
    role="img"
    aria-label="Distribuição por especialidade"
  >
    <path v-for="arc in arcs" :key="arc.name" :d="arc.d" :fill="arc.color">
      <title>{{ arc.name }}: {{ arc.value }}%</title>
    </path>
  </svg>
</template>
