<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Rotas do AtivaMente (equivalente ao expo-router)
|--------------------------------------------------------------------------
|
| Cada rota do antigo diretório `app/` virou uma rota Inertia:
|
|   app/index.tsx            -> GET  /                 -> Pages/Splash.vue
|   app/onboarding.tsx       -> GET  /onboarding       -> Pages/Onboarding.vue
|   app/login.tsx            -> GET  /login            -> Pages/Auth/Login.vue
|   app/signup.tsx           -> GET  /signup           -> Pages/Auth/Signup.vue
|   app/forgot-password.tsx  -> GET  /forgot-password  -> Pages/Auth/ForgotPassword.vue
|   app/(tabs)/home.tsx      -> GET  /home             -> Pages/Home.vue
|   app/(tabs)/children.tsx  -> GET  /children         -> Pages/Children/Index.vue
|   app/child/[id].tsx       -> GET  /children/{child} -> Pages/Children/Show.vue
|   app/(tabs)/agenda.tsx    -> GET  /agenda           -> Pages/Agenda.vue
|   app/evolutions.tsx       -> GET  /evolutions       -> Pages/Evolutions.vue
|   app/notifications.tsx    -> GET  /notifications    -> Pages/Notifications.vue
|   app/(tabs)/profile.tsx   -> GET  /profile          -> Pages/Profile.vue
|
| As páginas Vue declaram defaults para todas as props de dados, então elas
| renderizam mesmo sem os arrays abaixo — troque cada `Inertia::render` por um
| controller de verdade conforme o backend ficar pronto.
|
*/

Route::inertia('/', 'Splash')->name('splash');
Route::inertia('/onboarding', 'Onboarding')->name('onboarding');

// ----------------------------------------------------------------- convidado
Route::middleware('guest')->group(function () {
    Route::inertia('/login', 'Auth/Login')->name('login');
    Route::inertia('/signup', 'Auth/Signup')->name('signup');
    Route::inertia('/forgot-password', 'Auth/ForgotPassword')->name('password.request');

    // Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    // Route::post('/signup', [RegisteredUserController::class, 'store']);
    // Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
});

// -------------------------------------------------------------- autenticado
Route::middleware('auth')->group(function () {
    Route::get('/home', function () {
        return Inertia::render('Home', [
            // 'user'       => auth()->user(),
            // 'children'   => ChildResource::collection(auth()->user()->children),
            // 'sessions'   => SessionResource::collection(...),
            // 'evolutions' => EvolutionResource::collection(...),
        ]);
    })->name('home');

    Route::get('/children', fn () => Inertia::render('Children/Index'))->name('children.index');
    Route::get('/children/{child}', fn (string $child) => Inertia::render('Children/Show', [
        // 'child'      => ChildResource::make($child),
        // 'evolutions' => EvolutionResource::collection($child->evolutions),
        // 'parent'     => auth()->user(),
    ]))->name('children.show');

    Route::get('/agenda', fn () => Inertia::render('Agenda'))->name('agenda');
    Route::post('/agenda/solicitacoes', function () {
        // SchedulingRequest::create(request()->validate([...]));
        return back()->with('success', 'Solicitação enviada com sucesso!');
    })->name('agenda.request');

    Route::get('/evolutions', fn () => Inertia::render('Evolutions'))->name('evolutions');
    Route::get('/notifications', fn () => Inertia::render('Notifications'))->name('notifications');

    Route::get('/profile', fn () => Inertia::render('Profile'))->name('profile');
    // Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::put('/profile/password', [PasswordController::class, 'update'])->name('password.update');
    // Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

/*
|--------------------------------------------------------------------------
| Painel administrativo (protótipo Figma Make "AtivaMente SaaS")
|--------------------------------------------------------------------------
|
| O protótipo era um App.tsx único com um estado `Screen`; cada tela virou
| uma rota Inertia de verdade:
|
|   Screen "login"          -> GET  /admin/login          -> Admin/Login.vue
|   Screen "dashboard"      -> GET  /admin                -> Admin/Dashboard.vue
|   Screen "children"       -> GET  /admin/criancas       -> Admin/Children/Index.vue
|   Screen "child-form"     -> GET  /admin/criancas/nova  -> Admin/Children/Form.vue
|   Screen "child-profile"  -> GET  /admin/criancas/{id}  -> Admin/Children/Show.vue
|   Screen "agenda"         -> GET  /admin/agenda         -> Admin/Agenda.vue
|   Screen "evolucoes"      -> GET  /admin/evolucoes      -> Admin/Evolutions.vue
|   Screen "settings"       -> GET  /admin/configuracoes  -> Admin/Settings.vue
|
| Como no app dos pais, as páginas declaram defaults para as props de dados
| (services/adminMockData.ts), então renderizam antes do backend existir.
|
*/

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::inertia('/login', 'Admin/Login')->name('login');
        // Route::post('/login', [Admin\AuthController::class, 'store']);
    });

    Route::middleware('auth')->group(function () {
        Route::get('/', fn () => Inertia::render('Admin/Dashboard', [
            // 'greetingName'     => auth()->user()->first_name,
            // 'today'            => now()->translatedFormat('l, j \d\e F \d\e Y'),
            // 'counters'         => $metrics->counters(),
            // 'appointments'     => AppointmentResource::collection($today),
            // 'recentEvolutions' => EvolutionResource::collection($recent),
            // 'weekly' / 'monthly' / 'bySpecialty' => séries dos gráficos
        ]))->name('dashboard');

        Route::get('/criancas', fn () => Inertia::render('Admin/Children/Index'))->name('children.index');
        Route::inertia('/criancas/nova', 'Admin/Children/Form')->name('children.create');
        Route::get('/criancas/{patient}', fn (string $patient) => Inertia::render('Admin/Children/Show', [
            // 'patient'    => PatientResource::make($patient),
            // 'evolutions' => EvolutionResource::collection($patient->evolutions),
        ]))->name('children.show');
        // Route::post('/criancas', [Admin\PatientController::class, 'store'])->name('children.store');

        Route::get('/agenda', fn () => Inertia::render('Admin/Agenda'))->name('agenda');
        Route::post('/agenda/atendimentos', function () {
            // Appointment::create(request()->validate([...]));
            return back()->with('success', 'Atendimento agendado.');
        })->name('agenda.store');

        Route::get('/evolucoes', fn () => Inertia::render('Admin/Evolutions'))->name('evolutions');
        // Route::post('/evolucoes', [Admin\EvolutionController::class, 'store'])->name('evolutions.store');

        Route::get('/configuracoes', fn () => Inertia::render('Admin/Settings'))->name('settings');
        // Route::put('/configuracoes/clinica',      [Admin\ClinicController::class, 'update']);
        // Route::put('/configuracoes/perfil',       [Admin\ProfileController::class, 'update']);
        // Route::put('/configuracoes/preferencias', [Admin\PreferenceController::class, 'update']);
        // Route::post('/logout', [Admin\AuthController::class, 'destroy'])->name('logout');
    });
});
