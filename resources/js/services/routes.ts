/**
 * URLs do lado do servidor consumidas pelo Inertia.
 * Se o projeto usar Ziggy, troque estes valores por `route('nome')`.
 */
export const ROUTES = {
  splash: '/',
  onboarding: '/onboarding',
  login: '/login',
  logout: '/logout',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  home: '/home',
  children: '/children',
  child: (id: string) => `/children/${id}`,
  agenda: '/agenda',
  scheduleRequest: '/agenda/solicitacoes',
  evolutions: '/evolutions',
  notifications: '/notifications',
  profile: '/profile',
  profileUpdate: '/profile',
  passwordUpdate: '/profile/password',
} as const;

/**
 * Painel administrativo (protótipo Figma Make "AtivaMente SaaS").
 * Cada `Screen` do App.tsx monolítico virou uma rota real.
 */
export const ADMIN_ROUTES = {
  login: '/admin/login',
  logout: '/admin/logout',
  dashboard: '/admin',
  children: '/admin/criancas',
  childCreate: '/admin/criancas/nova',
  child: (id: number | string) => `/admin/criancas/${id}`,
  childStore: '/admin/criancas',
  agenda: '/admin/agenda',
  appointmentStore: '/admin/agenda/atendimentos',
  evolutions: '/admin/evolucoes',
  evolutionStore: '/admin/evolucoes',
  settings: '/admin/configuracoes',
  settingsClinic: '/admin/configuracoes/clinica',
  settingsProfile: '/admin/configuracoes/perfil',
  settingsPreferences: '/admin/configuracoes/preferencias',
} as const;
