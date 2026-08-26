<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import AppLayout from '../Layouts/AppLayout.vue';
import EmptyState from '../Components/ui/EmptyState.vue';
import Header from '../Components/ui/Header.vue';
import NotificationCard from '../Components/ui/NotificationCard.vue';
import { MOCK_DATA } from '../services/mockData';
import { ROUTES } from '../services/routes';
import type { Notification } from '../types';

defineOptions({ layout: AppLayout });

withDefaults(defineProps<{ notifications?: Notification[] }>(), {
  notifications: () => MOCK_DATA.notifications,
});
</script>

<template>
  <Head title="Notificações" />

  <Header title="Notificações" show-back @back="router.visit(ROUTES.home)" />

  <div class="px-6 py-4">
    <EmptyState
      v-if="notifications.length === 0"
      icon="🔔"
      title="Sem notificações"
      description="Quando houver novidades, elas aparecerão aqui."
    />

    <NotificationCard
      v-for="notification in notifications"
      :key="notification.id"
      :title="notification.title"
      :message="notification.message"
      :time="notification.time"
      :read="notification.read"
      :type="notification.type"
    />
  </div>
</template>
