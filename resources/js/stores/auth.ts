import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { AppState, User } from '../types';

/**
 * Equivalente Pinia do antigo `useAuthStore` (zustand).
 *
 * A fonte de verdade da autenticação continua sendo o servidor: o middleware
 * do Inertia compartilha `auth.user` em toda página e `syncFromShared()`
 * espelha esse valor aqui. O store guarda apenas o estado de UI que não vive
 * no servidor (ex.: filho selecionado).
 */
export const useAuthStore = defineStore('auth', () => {
  const state = ref<AppState>({
    user: null,
    isAuthenticated: false,
    selectedChildId: null,
  });

  const user = computed(() => state.value.user);
  const isAuthenticated = computed(() => state.value.isAuthenticated);
  const selectedChildId = computed(() => state.value.selectedChildId);

  function setUser(value: User | null) {
    state.value.user = value;
  }

  function setAuthenticated(value: boolean) {
    state.value.isAuthenticated = value;
  }

  function setSelectedChild(childId: string | null) {
    state.value.selectedChildId = childId;
  }

  /** Alinha o store com as props compartilhadas da resposta Inertia atual. */
  function syncFromShared(sharedUser: User | null) {
    state.value.user = sharedUser;
    state.value.isAuthenticated = sharedUser !== null;
  }

  function logout() {
    state.value = { user: null, isAuthenticated: false, selectedChildId: null };
  }

  return {
    state,
    user,
    isAuthenticated,
    selectedChildId,
    setUser,
    setAuthenticated,
    setSelectedChild,
    syncFromShared,
    logout,
  };
});
