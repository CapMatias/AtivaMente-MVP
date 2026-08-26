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
