<script setup lang="ts">
import { ref } from 'vue';
import AdminSidebar from '../Components/admin/AdminSidebar.vue';
import AdminHeader from '../Components/admin/AdminHeader.vue';
import AdminBottomNav from '../Components/admin/AdminBottomNav.vue';

/**
 * Shell do painel — equivalente ao `App()` do protótipo: sidebar fixa em `lg`,
 * drawer no mobile, header com título por rota e bottom nav abaixo de `lg`.
 *
 * `title`/`subtitle` substituem o mapa `TITLES[screen]`: cada página informa
 * os seus via `layoutProps` no `defineOptions`.
 */
withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
  }>(),
  { title: '' },
);

const sidebarOpen = ref(false);
</script>

<template>
  <div class="h-[100dvh] flex overflow-hidden bg-[#F8FAFC]">
    <AdminSidebar v-model:open="sidebarOpen" />

    <div class="flex-1 flex flex-col overflow-hidden min-w-0">
      <AdminHeader :title="title" :subtitle="subtitle" @open-menu="sidebarOpen = true" />

      <main class="flex-1 flex flex-col overflow-hidden">
        <slot />
      </main>
    </div>

    <AdminBottomNav />
  </div>
</template>
