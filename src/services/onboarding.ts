import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * As boas-vindas aparecem uma única vez por conta, logo depois do primeiro
 * login ou cadastro. A marca fica guardada no aparelho, por e-mail, e
 * sobrevive ao logout: sair e entrar de novo não repete as boas-vindas.
 */
const keyFor = (email?: string) => `onboarding_visto:${(email ?? '').trim().toLowerCase()}`;

export async function hasSeenOnboarding(email?: string): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(keyFor(email))) === '1';
  } catch {
    // Sem acesso ao armazenamento, não trava o login: segue direto para o app.
    return true;
  }
}

export async function markOnboardingSeen(email?: string): Promise<void> {
  try {
    await AsyncStorage.setItem(keyFor(email), '1');
  } catch {
    // Pior caso: as boas-vindas aparecem de novo no próximo login.
  }
}
