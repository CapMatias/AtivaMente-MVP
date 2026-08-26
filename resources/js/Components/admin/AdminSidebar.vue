<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { Brain, Calendar, FileText, LayoutDashboard, LogOut, Settings, Users, X } from 'lucide-vue-next';
import InitialsAvatar from './InitialsAvatar.vue';
import { ADMIN_ROUTES } from '../../services/routes';
import { ADMIN_USER, CLINIC } from '../../services/adminMockData';

const open = defineModel<boolean>('open', { default: false });

const NAV = [
  { label: 'Dashboard', href: ADMIN_ROUTES.dashboard, icon: LayoutDashboard, exact: true },
  { label: 'Crianças', href: ADMIN_ROUTES.children, icon: Users, exact: false },
  { label: 'Agenda', href: ADMIN_ROUTES.agenda, icon: Calendar, exact: false },
  { label: 'Evoluções', href: ADMIN_ROUTES.evolutions, icon: FileText, exact: false },
  { label: 'Configurações', href: ADMIN_ROUTES.settings, icon: Settings, exact: false },
];

const page = usePage();
const currentPath = computed(() => page.url.split('?')[0]);

/** "Crianças" segue ativo em /criancas/nova e /criancas/{id}, como no protótipo. */
function isActive(href: string, exact: boolean) {
  return exact ? currentPath.value === href : currentPath.value.startsWith(href);
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 bg-black/40 z-40 lg:hidden" @click="open = false" />

  <aside
    class="fixed lg:static inset-y-0 left-0 z-50 w-64 h-full bg-white border-r border-slate-100 flex flex-col transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none"
    :class="open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >
    <div class="px-5 py-5 border-b border-slate-100 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 bg-[#2563EB] rounded-xl flex items-center justify-center shadow-sm">
          <Brain :size="17" class="text-white" />
        </div>
        <div>
          <span class="text-base font-bold text-slate-800 tracking-tight">AtivaMente</span>
          <p class="text-[10px] text-slate-400 leading-none mt-0.5">{{ CLINIC.name }}</p>
        </div>
      </div>
      <button
        type="button"
        class="lg:hidden p-1.5 rounded-lg hover:bg-slate-100"
        aria-label="Fechar menu"
        @click="open = false"
      >
        <X :size="16" class="text-slate-500" />
      </button>
    </div>

    <nav class="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="Menu principal">
      <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 pb-2 mt-1">Menu Principal</p>
      <Link
        v-for="item in NAV"
        :key="item.href"
        :href="item.href"
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
        :class="
          isActive(item.href, item.exact)
            ? 'bg-blue-50 text-blue-700'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        "
        :aria-current="isActive(item.href, item.exact) ? 'page' : undefined"
        @click="open = false"
      >
        <component
          :is="item.icon"
          :size="17"
          :class="isActive(item.href, item.exact) ? 'text-blue-600' : 'text-slate-400'"
        />
        {{ item.label }}
        <span v-if="isActive(item.href, item.exact)" class="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
      </Link>
    </nav>

    <div class="px-3 py-4 border-t border-slate-100">
      <Link
        :href="ADMIN_ROUTES.logout"
        method="post"
        as="button"
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
      >
        <InitialsAvatar :initials="ADMIN_USER.initials" :idx="2" size="sm" />
        <span class="flex-1 min-w-0">
          <span class="block text-sm font-semibold text-slate-800 truncate">{{ ADMIN_USER.name }}</span>
          <span class="block text-xs text-slate-400">{{ ADMIN_USER.role }}</span>
        </span>
        <LogOut :size="14" class="text-slate-400" />
      </Link>
    </div>
  </aside>
</template>
