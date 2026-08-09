import { useAuthService } from './auth.service';

export function AuthPage() {
  const { mode, changeMode, loginForm, registerForm, onLogin, onRegister } = useAuthService();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-slate-100 px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-gradient-to-br from-pink-600 to-rose-500 p-10 text-white">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-pink-100">Creariif Invitation</p>
            <h1 className="text-4xl font-semibold">Beautiful invitation experiences for every celebration.</h1>
            <p className="mt-4 max-w-md text-pink-50/90">Create, customize, and share your wedding invitation with a polished digital experience.</p>
          </div>

          <div className="p-10">
            <div className="mb-6 flex gap-2 rounded-full border border-slate-200 p-1">
              <button type="button" onClick={() => changeMode('login')} className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${mode === 'login' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>
                Sign in
              </button>
              <button type="button" onClick={() => changeMode('register')} className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${mode === 'register' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>
                Create account
              </button>
            </div>

            {mode === 'login' ? (
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                  <input {...loginForm.register('email')} className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="you@example.com" />
                  {loginForm.formState.errors.email && <p className="mt-1 text-sm text-rose-500">{loginForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                  <input type="password" {...loginForm.register('password')} className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="••••••••" />
                  {loginForm.formState.errors.password && <p className="mt-1 text-sm text-rose-500">{loginForm.formState.errors.password.message}</p>}
                </div>
                <button type="submit" className="w-full rounded-2xl bg-pink-600 px-4 py-3 font-semibold text-white transition hover:bg-pink-700">
                  Sign in
                </button>
              </form>
            ) : (
              <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
                  <input {...registerForm.register('name')} className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Your name" />
                  {registerForm.formState.errors.name && <p className="mt-1 text-sm text-rose-500">{registerForm.formState.errors.name.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                  <input {...registerForm.register('email')} className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="you@example.com" />
                  {registerForm.formState.errors.email && <p className="mt-1 text-sm text-rose-500">{registerForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                  <input type="password" {...registerForm.register('password')} className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="••••••••" />
                  {registerForm.formState.errors.password && <p className="mt-1 text-sm text-rose-500">{registerForm.formState.errors.password.message}</p>}
                </div>
                <button type="submit" className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700">
                  Create account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
