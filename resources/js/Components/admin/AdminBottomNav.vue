<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { Calendar, FileText, Home, Settings, Users } from 'lucide-vue-next';
import { ADMIN_ROUTES } from '../../services/routes';

/** Barra inferior exibida só abaixo de `lg`, espelhando a sidebar. */
const ITEMS = [
  { label: 'Início', href: ADMIN_ROUTES.dashboard, icon: Home, exact: true },
  { label: 'Crianças', href: ADMIN_ROUTES.children, icon: Users, exact: false },
  { label: 'Agenda', href: ADMIN_ROUTES.agenda, icon: Calendar, exact: false },
  { label: 'Evoluções', href: ADMIN_ROUTES.evolutions, icon: FileText, exact: false },
  { label: 'Config.', href: ADMIN_ROUTES.settings, icon: Settings, exact: false },
];

const page = usePage();
const currentPath = computed(() => page.url.split('?')[0]);

function isActive(href: string, exact: boolean) {
  return exact ? currentPath.value === href : currentPath.value.startsWith(href);
}
</script>

<template>
  <nav
    class="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-100 z-30 flex"
    style="padding-bottom: env(safe-area-inset-bottom)"
    aria-label="Navegação"
  >
    <Link
      v-for="item in ITEMS"
      :key="item.href"
      :href="item.href"
      class="flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors"
      :class="isActive(item.href, item.exact) ? 'text-blue-600' : 'text-slate-400'"
      :aria-current="isActive(item.href, item.exact) ? 'page' : undefined"
    >
      <component
        :is="item.icon"
        :size="20"
        :class="isActive(item.href, item.exact) ? 'text-blue-600' : 'text-slate-400'"
      />
      {{ item.label }}
    </Link>
  </nav>
</template>
