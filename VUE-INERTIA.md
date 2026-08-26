# AtivaMente — frontend Vue 3 + Inertia.js

Porte do frontend Expo/React Native (`app/` + `src/`) para **Vue 3 (Composition API,
`<script setup>`, TypeScript) + Inertia.js**. Os arquivos React Native seguem
intactos no repositório; nada foi sobrescrito.

## Pré-requisito: um backend Inertia

O Inertia não é um roteador de cliente — ele é o adaptador entre um backend que
renderiza respostas (Laravel, Rails, Phoenix…) e um frontend SPA. Este
repositório não tinha backend, então o código foi escrito no layout padrão do
**Laravel** e as rotas de exemplo estão em `routes/web.php`.

Enquanto o backend não existir, **as páginas funcionam sozinhas**: toda prop de
dados tem `withDefaults` apontando para `resources/js/services/mockData.ts` —
os mesmos mocks que as telas React Native usavam.

## Estrutura

```
resources/
  css/app.css                  Tailwind v4 (porte do tailwind.config.js do NativeWind)
  views/app.blade.php          documento raiz (@inertia / @inertiaHead)
  js/
    app.ts                     createInertiaApp + Pinia
    ssr.ts                     entrada de SSR (opcional)
    Layouts/
      AppLayout.vue            ex-`app/(tabs)/_layout.tsx` (tab bar inferior)
      AuthLayout.vue           telas de login/cadastro/recuperação
    Pages/                     uma página por rota (ver tabela abaixo)
    Components/ui/             ex-`src/components/ui/`
    composables/
      useMergedClass.ts        `cn()` + fallthrough de `class` (ex-`className`)
      useZodForm.ts            ex-`react-hook-form` + `zodResolver`
      useToast.ts              estado local do `<Toast>`
    stores/auth.ts             ex-`src/store/authStore.ts` (zustand -> Pinia)
    services/                  routes.ts, api.ts, mockData.ts
    constants/theme.ts         paleta (inalterada)
    types/index.ts             tipos de domínio (inalterados)
routes/web.php                 rotas Inertia de exemplo
vite.config.ts                 Vite + laravel-vite-plugin + @vitejs/plugin-vue
tsconfig.web.json              tsconfig do frontend web (o da raiz é do Expo)
```

### Mapa de telas

| React Native (`src/screens`)  | Rota                | Página Vue                     |
| ----------------------------- | ------------------- | ------------------------------ |
| `SplashScreen`                | `/`                 | `Pages/Splash.vue`             |
| `OnboardingScreen`            | `/onboarding`       | `Pages/Onboarding.vue`         |
| `LoginScreen`                 | `/login`            | `Pages/Auth/Login.vue`         |
| `SignupScreen`                | `/signup`           | `Pages/Auth/Signup.vue`        |
| `ForgotPasswordScreen`        | `/forgot-password`  | `Pages/Auth/ForgotPassword.vue`|
| `HomeScreen`                  | `/home`             | `Pages/Home.vue`               |
| `ChildrenScreen`              | `/children`         | `Pages/Children/Index.vue`     |
| `ChildProfileScreen`          | `/children/{id}`    | `Pages/Children/Show.vue`      |
| `AgendaScreen`                | `/agenda`           | `Pages/Agenda.vue`             |
| `EvolutionsScreen`            | `/evolutions`       | `Pages/Evolutions.vue`         |
| `NotificationsScreen`         | `/notifications`    | `Pages/Notifications.vue`      |
| `ProfileScreen`               | `/profile`          | `Pages/Profile.vue`            |

## Equivalências aplicadas

| React Native / Expo                     | Vue 3 + Inertia                                   |
| --------------------------------------- | ------------------------------------------------- |
| `<View>` / `<Text>` / `<Image>`         | `<div>` / `<p>`,`<span>` / `<img>`                |
| `<TouchableOpacity onPress>`            | `<button @click>` (com `:disabled`, `aria-*`)     |
| `<ScrollView>`                          | fluxo normal da página / `overflow-x-auto`        |
| `useState`                              | `ref()` / `computed()`                            |
| `useEffect`                             | `onMounted` / `watch` / `onBeforeUnmount`         |
| `useRouter().push` (expo-router)        | `<Link>` e `router.visit()` do Inertia            |
| `useLocalSearchParams()`                | props enviadas pelo controller                    |
| zustand (`useAuthStore`)                | Pinia (`useAuthStore`), sincronizado com `auth.user` |
| `react-hook-form` + `zodResolver`       | `useZodForm` sobre o `useForm` do Inertia (Zod mantido) |
| `className` + NativeWind                | Tailwind v4 + `cn()` (tailwind-merge)             |
| `numberOfLines={3}`                     | `line-clamp-3`                                    |
| `<ActivityIndicator>`                   | `<Spinner>` (SVG + `animate-spin`)                |
| `Animated.loop` (skeleton)              | keyframe `pulse-soft` no CSS                      |
| `alert()`                               | `<Toast>` via `useToast()`                        |
| `visible` + `onClose`                   | `v-model:open` (Modal, BottomSheet)               |
| `value` + `onChangeText`                | `v-model` (`<Input>`, `<Calendar>`)               |

## Instalação (dentro do projeto Laravel hospedeiro)

```bash
npm install vue@^3.5 @inertiajs/vue3 pinia zod clsx tailwind-merge && npm install -D @vitejs/plugin-vue vite laravel-vite-plugin tailwindcss @tailwindcss/vite vue-tsc typescript @vue/server-renderer
```

Lado PHP:

```bash
composer require inertiajs/inertia-laravel && php artisan inertia:middleware
```

Scripts sugeridos no `package.json` do host:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build && vite build --ssr",
    "typecheck": "vue-tsc --noEmit -p tsconfig.web.json"
  }
}
```

## Props compartilhadas

`AppLayout.vue` espera `auth.user` em toda resposta e espelha esse valor no
store Pinia. Em `app/Http/Middleware/HandleInertiaRequests.php`:

```php
public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'auth' => [
            'user' => $request->user(),
        ],
    ]);
}
```

## Observações

- **Rotas nomeadas**: os caminhos ficam centralizados em
  `resources/js/services/routes.ts`. Se instalar o Ziggy, troque os valores por
  `route('nome')` e reative `@routes` no `app.blade.php`.
- **Mocks**: `VITE_USE_MOCKS=false` no `.env` faz `services/api.ts` bater nos
  endpoints JSON reais em vez de devolver os mocks.
- **Datas dos mocks** continuam em julho/2026, como na versão React Native.
- **`tsconfig.web.json`** é separado porque o `tsconfig.json` da raiz pertence
  ao app Expo (`expo/tsconfig.base`).
