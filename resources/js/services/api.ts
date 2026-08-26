import { router } from '@inertiajs/vue3';
import type { Child, Evolution, Session, User } from '../types';
import { MOCK_DATA } from './mockData';
import { ROUTES } from './routes';

/**
 * No Inertia a leitura de dados chega como props da página (o controller as
 * envia). Estes helpers cobrem os dois casos restantes:
 *
 *  - mutações → `router.post/put/delete`, que devolvem uma nova resposta Inertia;
 *  - leituras avulsas (sem navegação) → `fetch` no endpoint JSON equivalente,
 *    com fallback para os mocks enquanto o backend não existir.
 */

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';

function mock<T>(value: T, delay = 1000): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

async function getJson<T>(url: string, fallback: T): Promise<T> {
  if (USE_MOCKS) return mock(fallback);
  const response = await fetch(url, {
    headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
    credentials: 'same-origin',
  });
  if (!response.ok) throw new Error(`Falha ao carregar ${url}: ${response.status}`);
  return (await response.json()) as T;
}

type VisitOptions = Parameters<typeof router.post>[2];

export const AuthService = {
  login(data: { email: string; password: string }, options?: VisitOptions) {
    return router.post(ROUTES.login, data, options);
  },
  register(data: Record<string, unknown>, options?: VisitOptions) {
    return router.post(ROUTES.signup, data, options);
  },
  recoverPassword(data: { email: string }, options?: VisitOptions) {
    return router.post(ROUTES.forgotPassword, data, options);
  },
  logout(options?: VisitOptions) {
    return router.post(ROUTES.logout, {}, options);
  },
};

export const ChildService = {
  getChildren(parentId: string): Promise<Child[]> {
    return getJson(
      ROUTES.children,
      MOCK_DATA.children.filter((c) => c.parentId === parentId),
    );
  },
  getChildById(id: string): Promise<Child | null> {
    return getJson(ROUTES.child(id), MOCK_DATA.children.find((c) => c.id === id) ?? null);
  },
};

export const SessionService = {
  getSessionsByChild(childId: string): Promise<Session[]> {
    return getJson(
      `${ROUTES.agenda}?child=${childId}`,
      MOCK_DATA.sessions.filter((s) => s.childId === childId),
    );
  },
  requestScheduling(data: { childId: string; date: string; time: string }, options?: VisitOptions) {
    return router.post(ROUTES.scheduleRequest, data, options);
  },
};

export const EvolutionService = {
  getEvolutionsByChild(childId: string): Promise<Evolution[]> {
    return getJson(
      `${ROUTES.evolutions}?child=${childId}`,
      MOCK_DATA.evolutions.filter((e) => e.childId === childId),
    );
  },
};

export const ProfileService = {
  update(data: Partial<User>, options?: VisitOptions) {
    return router.put(ROUTES.profileUpdate, data as Record<string, unknown>, options);
  },
  updatePassword(
    data: { currentPassword: string; newPassword: string; confirmPassword: string },
    options?: VisitOptions,
  ) {
    return router.put(ROUTES.passwordUpdate, data, options);
  },
};
