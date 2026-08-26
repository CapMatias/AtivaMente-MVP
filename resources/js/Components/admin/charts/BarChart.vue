<script setup lang="ts">
import { computed, ref } from 'vue';
import type { BarSeries } from '../../../types/admin';

/**
 * Substitui o `<BarChart>` do recharts sem adicionar dependência de gráficos:
 * mesmas séries, grade tracejada, eixos sem linha e barras com topo arredondado.
 */

const props = withDefaults(
  defineProps<{
    data: Record<string, string | number>[];
    categoryKey: string;
    series: BarSeries[];
    height?: number;
  }>(),
  { height: 160 },
);

const PAD = { top: 8, right: 4, bottom: 20, left: 26 };
const VIEW_W = 320;

const innerW = VIEW_W - PAD.left - PAD.right;
const innerH = computed(() => props.height - PAD.top - PAD.bottom);

const maxValue = computed(() => {
  const values = props.data.flatMap((row) => props.series.map((s) => Number(row[s.key]) || 0));
  const max = Math.max(...values, 1);
  return Math.ceil(max / 4) * 4;
});

const ticks = computed(() => [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(maxValue.value * f)));

const groupW = computed(() => innerW / Math.max(props.data.length, 1));
const barW = computed(() => (groupW.value - 12) / Math.max(props.series.length, 1) - 3);

const hovered = ref<number | null>(null);

const yOf = (value: number) => PAD.top + innerH.value * (1 - value / maxValue.value);
</script>

<template>
  <div class="relative">
    <svg :viewBox="`0 0 ${VIEW_W} ${height}`" class="w-full" :style="{ height: `${height}px` }" role="img">
      <!-- grade horizontal -->
      <line
        v-for="tick in ticks"
        :key="`grid-${tick}`"
        :x1="PAD.left"
        :x2="VIEW_W - PAD.right"
        :y1="yOf(tick)"
        :y2="yOf(tick)"
        stroke="rgba(0,0,0,0.04)"
        stroke-dasharray="3 3"
      />

      <!-- eixo Y -->
      <text
        v-for="tick in ticks"
        :key="`ty-${tick}`"
        :x="PAD.left - 6"
        :y="yOf(tick) + 3"
        text-anchor="end"
        font-size="9"
        fill="#94A3B8"
      >
        {{ tick }}
      </text>

      <!-- barras -->
      <g v-for="(row, i) in data" :key="i" @mouseenter="hovered = i" @mouseleave="hovered = null">
        <rect
          :x="PAD.left + i * groupW"
          :y="PAD.top"
          :width="groupW"
          :height="innerH"
          :fill="hovered === i ? 'rgba(37,99,235,0.04)' : 'transparent'"
        />
        <rect
          v-for="(s, j) in series"
          :key="s.key"
          :x="PAD.left + i * groupW + 6 + j * (barW + 3)"
          :y="yOf(Number(row[s.key]) || 0)"
          :width="barW"
          :height="Math.max(innerH - (yOf(Number(row[s.key]) || 0) - PAD.top), 0)"
          :fill="s.color"
          rx="3"
        />
        <text
          :x="PAD.left + i * groupW + groupW / 2"
          :y="height - 6"
          text-anchor="middle"
          font-size="9"
          fill="#94A3B8"
        >
          {{ row[categoryKey] }}
        </text>
      </g>
    </svg>

    <!-- tooltip equivalente ao do recharts -->
    <div
      v-if="hovered !== null"
      class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 bg-white border border-slate-100 rounded-xl px-3 py-2 text-xs shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
    >
      <p class="font-semibold text-slate-700 mb-0.5">{{ data[hovered][categoryKey] }}</p>
      <p v-for="s in series" :key="s.key" class="flex items-center gap-1.5 text-slate-500">
        <span class="w-2 h-2 rounded-sm" :style="{ background: s.color }" />
        {{ s.name }}: <span class="font-semibold text-slate-700">{{ data[hovered][s.key] }}</span>
      </p>
    </div>
  </div>
</template>
