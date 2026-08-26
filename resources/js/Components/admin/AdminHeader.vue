<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { Bell, Menu } from 'lucide-vue-next';
import InitialsAvatar from './InitialsAvatar.vue';
import { ADMIN_ROUTES } from '../../services/routes';
import { ADMIN_USER } from '../../services/adminMockData';

defineProps<{
  title: string;
  subtitle?: string;
}>();

const emit = defineEmits<{ (e: 'open-menu'): void }>();
</script>

<template>
  <header class="h-14 bg-white border-b border-slate-100 px-4 flex items-center gap-3 flex-shrink-0">
    <button
      type="button"
      class="lg:hidden p-2 -ml-1 rounded-xl hover:bg-slate-100 transition-colors"
      aria-label="Abrir menu"
      @click="emit('open-menu')"
    >
      <Menu :size="18" class="text-slate-600" />
    </button>

    <div class="flex-1 min-w-0">
      <h1 class="text-base font-bold text-slate-800 truncate">{{ title }}</h1>
      <p v-if="subtitle" class="text-xs text-slate-400 hidden sm:block">{{ subtitle }}</p>
    </div>

    <div class="flex items-center gap-2">
      <button type="button" class="relative p-2 rounded-xl hover:bg-slate-100 transition-colors" aria-label="Notificações">
        <Bell :size="17" class="text-slate-500" />
        <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
      </button>
      <Link :href="ADMIN_ROUTES.settings" class="hidden sm:block" aria-label="Configurações">
        <InitialsAvatar initials="DM" :idx="2" size="sm" />
      </Link>
    </div>
  </header>
</template>
