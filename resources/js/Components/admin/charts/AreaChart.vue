<script setup lang="ts">
import { computed, ref, useId } from 'vue';

/**
 * Substitui o `<AreaChart>` do recharts: linha suave, preenchimento em
 * gradiente vertical e pontos — sem dependência de biblioteca de gráficos.
 */
const props = withDefaults(
  defineProps<{
    data: Record<string, string | number>[];
    categoryKey: string;
    valueKey: string;
    color?: string;
    height?: number;
    /** Oculta o eixo Y, como o `<YAxis hide />` do protótipo. */
    hideYAxis?: boolean;
  }>(),
  { color: '#2563EB', height: 130, hideYAxis: false },
);

const gradientId = `area-gradient-${useId()}`;
const VIEW_W = 320;
const PAD = computed(() => ({ top: 8, right: 6, bottom: 20, left: props.hideYAxis ? 6 : 26 }));

const innerW = computed(() => VIEW_W - PAD.value.left - PAD.value.right);
const innerH = computed(() => props.height - PAD.value.top - PAD.value.bottom);

const values = computed(() => props.data.map((row) => Number(row[props.valueKey]) || 0));
const maxValue = computed(() => Math.ceil(Math.max(...values.value, 1) / 4) * 4);
const ticks = computed(() => [0, 0.5, 1].map((f) => Math.round(maxValue.value * f)));

const stepX = computed(() => innerW.value / Math.max(props.data.length - 1, 1));
const xOf = (i: number) => PAD.value.left + i * stepX.value;
const yOf = (value: number) => PAD.value.top + innerH.value * (1 - value / maxValue.value);

const points = computed(() => values.value.map((v, i) => ({ x: xOf(i), y: yOf(v), v })));

const linePath = computed(() => points.value.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' '));

const areaPath = computed(() => {
  if (points.value.length === 0) return '';
  const baseline = PAD.value.top + innerH.value;
  const first = points.value[0];
  const last = points.value[points.value.length - 1];
  return `${linePath.value} L${last.x},${baseline} L${first.x},${baseline} Z`;
});

const hovered = ref<number | null>(null);
</script>

<template>
  <div class="relative">
    <svg :viewBox="`0 0 ${VIEW_W} ${height}`" class="w-full" :style="{ height: `${height}px` }" role="img">
      <defs>
        <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" :stop-color="color" stop-opacity="0.18" />
          <stop offset="95%" :stop-color="color" stop-opacity="0" />
        </linearGradient>
      </defs>

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

      <template v-if="!hideYAxis">
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
      </template>

      <path :d="areaPath" :fill="`url(#${gradientId})`" />
      <path :d="linePath" fill="none" :stroke="color" stroke-width="2" stroke-linejoin="round" />

      <g v-for="(p, i) in points" :key="i">
        <circle :cx="p.x" :cy="p.y" r="3" :fill="color" />
        <rect
          :x="p.x - stepX / 2"
          :y="PAD.top"
          :width="stepX"
          :height="innerH"
          fill="transparent"
          @mouseenter="hovered = i"
          @mouseleave="hovered = null"
        />
        <text :x="p.x" :y="height - 6" text-anchor="middle" font-size="9" fill="#94A3B8">
          {{ data[i][categoryKey] }}
        </text>
      </g>
    </svg>

    <div
      v-if="hovered !== null"
      class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 bg-white border border-slate-100 rounded-xl px-3 py-1.5 text-xs shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
    >
      <span class="text-slate-500">{{ data[hovered][categoryKey] }}: </span>
      <span class="font-semibold text-slate-700">{{ data[hovered][valueKey] }}</span>
    </div>
  </div>
</template>
