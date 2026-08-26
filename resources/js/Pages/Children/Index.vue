<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import AppLayout from '../../Layouts/AppLayout.vue';
import Avatar from '../../Components/ui/Avatar.vue';
import Card from '../../Components/ui/Card.vue';
import EmptyState from '../../Components/ui/EmptyState.vue';
import Header from '../../Components/ui/Header.vue';
import { MOCK_DATA } from '../../services/mockData';
import { ROUTES } from '../../services/routes';
import type { Child } from '../../types';

defineOptions({ layout: AppLayout });

withDefaults(defineProps<{ children?: Child[] }>(), {
  children: () => MOCK_DATA.children,
});

function openChild(id: string) {
  router.visit(ROUTES.child(id));
}
</script>

<template>
  <Head title="Meus Filhos" />

  <Header title="Meus Filhos" />

  <div class="px-6 py-4">
    <EmptyState
      v-if="children.length === 0"
      icon="👧"
      title="Nenhum filho cadastrado"
      description="Os filhos vinculados à sua conta aparecerão aqui."
    />

    <Card
      v-for="(child, index) in children"
      :key="child.id"
      class="mb-4 animate-fade-in-up opacity-0"
      :style="{ animationDelay: `${index * 0.15}s` }"
      @click="openChild(child.id)"
    >
      <div class="flex flex-row items-center">
        <Avatar v-if="child.avatarUrl" :src="child.avatarUrl" size="md" :alt="child.name" />
        <div class="ml-4 flex-1">
          <p class="text-slate-800 text-xl font-bold">{{ child.name }}</p>
          <p class="text-slate-500">{{ child.age }} anos • {{ child.diagnosis }}</p>
          <span
            v-if="child.nextSession"
            class="inline-block mt-2 py-1 px-2 bg-blue-100 rounded-lg text-blue-600 text-xs font-bold"
          >
            Próxima: {{ child.nextSession.date }}
          </span>
        </div>
      </div>
    </Card>
  </div>
</template>
