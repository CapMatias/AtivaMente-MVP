import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import '../global.css';
import { useAuthStore } from '../src/store/authStore';

// Rotas abertas sem login; '' é a splash (index).
const PUBLIC_ROUTES = ['', 'login', 'signup', 'forgot-password'];

export default function Layout() {
  const segments = useSegments();
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.state.isAuthenticated);

  // Sem login, qualquer outra tela volta para o login (a sessão ainda não é salva, então recarregar a página também volta).
  useEffect(() => {
    if (!isAuthenticated && !PUBLIC_ROUTES.includes(segments[0] ?? '')) router.replace('/login');
  }, [isAuthenticated, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="child/[id]" />
      <Stack.Screen name="evolutions" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}
