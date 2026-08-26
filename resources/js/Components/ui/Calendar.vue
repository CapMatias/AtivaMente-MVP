<script setup lang="ts">
import { computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    markedDates?: string[];
  }>(),
  { markedDates: () => [] },
);

/** `v-model` no lugar de `selectedDate` + `onDateSelect`. */
const selectedDate = defineModel<string | null>({ default: null });

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const currentMonth = ref(new Date());

const year = computed(() => currentMonth.value.getFullYear());
const month = computed(() => currentMonth.value.getMonth());
const daysInMonth = computed(() => new Date(year.value, month.value + 1, 0).getDate());
const firstDay = computed(() => new Date(year.value, month.value, 1).getDay());

function formatDate(day: number) {
  return `${year.value}-${String(month.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const days = computed(() =>
  Array.from({ length: daysInMonth.value }, (_, i) => {
    const day = i + 1;
    const dateStr = formatDate(day);
    return {
      day,
      dateStr,
      isSelected: dateStr === selectedDate.value,
      isMarked: props.markedDates.includes(dateStr),
    };
  }),
);

function shiftMonth(delta: number) {
  currentMonth.value = new Date(year.value, month.value + delta, 1);
}
</script>

<template>
  <div class="bg-white rounded-2xl p-4 mb-4">
    <div class="flex flex-row items-center justify-between mb-4">
      <button
        type="button"
        class="p-2 rounded-full text-slate-500 hover:bg-slate-100"
        aria-label="Mês anterior"
        @click="shiftMonth(-1)"
      >
        ‹
      </button>
      <p class="text-slate-800 text-lg font-bold text-center">{{ MONTHS[month] }} {{ year }}</p>
      <button
        type="button"
        class="p-2 rounded-full text-slate-500 hover:bg-slate-100"
        aria-label="Próximo mês"
        @click="shiftMonth(1)"
      >
        ›
      </button>
    </div>

    <div class="grid grid-cols-7 mb-2">
      <span v-for="day in DAYS" :key="day" class="text-slate-400 text-xs font-medium text-center">
        {{ day }}
      </span>
    </div>

    <div class="grid grid-cols-7">
      <div v-for="i in firstDay" :key="`empty-${i}`" class="h-10" />
      <button
        v-for="item in days"
        :key="item.day"
        type="button"
        class="h-10 flex items-center justify-center"
        :aria-pressed="item.isSelected"
        @click="selectedDate = item.dateStr"
      >
        <span
          :class="[
            'w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors',
            item.isSelected
              ? 'bg-blue-600 text-white font-bold'
              : item.isMarked
                ? 'bg-blue-100 text-blue-600 font-medium'
                : 'text-slate-600 hover:bg-slate-100',
          ]"
        >
          {{ item.day }}
        </span>
      </button>
    </div>
  </div>
</template>
