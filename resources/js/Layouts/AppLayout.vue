<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed, watch } from 'vue';
import { useAuthStore } from '../stores/auth';
import { ROUTES } from '../services/routes';
import type { SharedProps } from '../types';

/**
 * Equivalente ao `app/(tabs)/_layout.tsx` (expo-router Tabs).
 * A navegação inferior usa `<Link>` do Inertia — visitas XHR, sem reload.
 */
const page = usePage<SharedProps>();
const auth = useAuthStore();

// Mantém o store alinhado com as props compartilhadas de cada resposta.
watch(
  () => page.props.auth?.user ?? null,
  (user) => auth.syncFromShared(user),
  { immediate: true },
);

const TABS = [
  { name: 'Início', href: ROUTES.home, icon: '🏠' },
  { name: 'Filhos', href: ROUTES.children, icon: '👧' },
  { name: 'Agenda', href: ROUTES.agenda, icon: '📅' },
  { name: 'Perfil', href: ROUTES.profile, icon: '👤' },
];

const currentPath = computed(() => page.url.split('?')[0]);

const isActive = (href: string) => currentPath.value === href || currentPath.value.startsWith(`${href}/`);
</script>

<template>
  <div class="flex flex-col min-h-dvh bg-slate-50">
    <main class="flex-1 pb-[60px]">
      <slot />
    </main>

    <nav
      class="fixed bottom-0 left-0 right-0 h-[60px] flex flex-row bg-white border-t border-slate-100 pb-2.5"
      aria-label="Navegação principal"
    >
      <Link
        v-for="tab in TABS"
        :key="tab.href"
        :href="tab.href"
        class="flex-1 flex flex-col items-center justify-center text-xs transition-colors"
        :class="isActive(tab.href) ? 'text-blue-600 font-medium' : 'text-slate-400'"
        :aria-current="isActive(tab.href) ? 'page' : undefined"
      >
        <span class="text-base leading-none mb-0.5" aria-hidden="true">{{ tab.icon }}</span>
        {{ tab.name }}
      </Link>
    </nav>
  </div>
</template>
