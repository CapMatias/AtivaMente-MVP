import { Stack, Tabs } from 'expo-router';
import { View } from 'react-native';
import { COLORS } from './src/constants/theme';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
