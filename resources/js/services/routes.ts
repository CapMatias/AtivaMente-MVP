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
