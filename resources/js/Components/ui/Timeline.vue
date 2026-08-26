<script setup lang="ts">
import type { TimelineItem } from '../../types';

defineProps<{ items: TimelineItem[] }>();
</script>

<template>
  <div class="px-1">
    <div v-for="(item, index) in items" :key="item.id" class="mb-6 flex flex-row">
      <div class="flex flex-col items-center mr-4">
        <div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow" />
        <div v-if="index !== items.length - 1" class="w-0.5 flex-1 bg-slate-200 mt-1 min-h-[60px]" />
      </div>

      <div class="flex-1 bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <div class="flex flex-row justify-between mb-2">
          <p class="text-slate-800 font-bold">{{ item.title }}</p>
          <p class="text-slate-400 text-xs">{{ item.date }}</p>
        </div>
        <p class="text-slate-600 leading-5 mb-3">{{ item.description }}</p>

        <div v-if="item.photos?.length" class="flex flex-row flex-wrap gap-2 mb-2">
          <img
            v-for="(photo, i) in item.photos"
            :key="i"
            :src="photo"
            :alt="`Foto ${i + 1} de ${item.title}`"
            class="w-20 h-20 rounded-xl object-cover"
          />
        </div>

        <div v-if="item.attachments?.length" class="flex flex-row flex-wrap gap-2">
          <span
            v-for="(file, i) in item.attachments"
            :key="i"
            class="flex flex-row items-center bg-slate-100 px-3 py-1.5 rounded-lg"
          >
            <span class="text-slate-500 text-xs mr-1" aria-hidden="true">📄</span>
            <span class="text-slate-600 text-xs">{{ file }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
