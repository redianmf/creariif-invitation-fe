import { useAuthService } from './auth.service';
import { useI18n } from '../../shared/i18n/i18n-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AuthPage() {
  const { mode, changeMode, loginForm, registerForm, onLogin, onRegister } = useAuthService();
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-slate-100 px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-gradient-to-br from-pink-600 to-rose-500 p-10 text-white">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-pink-100">Creariif Invitation</p>
            <h1 className="text-4xl font-semibold">{t('auth.pageTitle')}</h1>
            <p className="mt-4 max-w-md text-pink-50/90">{t('auth.pageDescription')}</p>
          </div>

          <div className="p-10">
            <div className="mb-6 flex gap-2 rounded-full border border-slate-200 p-1">
              <Button type="button" variant={mode === 'login' ? 'default' : 'ghost'} onClick={() => changeMode('login')} className={`h-auto flex-1 rounded-full px-4 py-2 text-sm font-medium ${mode === 'login' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>
                {t('auth.signIn')}
              </Button>
              <Button type="button" variant={mode === 'register' ? 'default' : 'ghost'} onClick={() => changeMode('register')} className={`h-auto flex-1 rounded-full px-4 py-2 text-sm font-medium ${mode === 'register' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>
                {t('auth.createAccount')}
              </Button>
            </div>

            {mode === 'login' ? (
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">{t('auth.email')}</label>
                  <Input {...loginForm.register('email')} className="h-auto rounded-2xl border-slate-200 px-4 py-3" placeholder="you@example.com" />
                  {loginForm.formState.errors.email && <p className="mt-1 text-sm text-rose-500">{loginForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">{t('auth.password')}</label>
                  <Input type="password" {...loginForm.register('password')} className="h-auto rounded-2xl border-slate-200 px-4 py-3" placeholder="••••••••" />
                  {loginForm.formState.errors.password && <p className="mt-1 text-sm text-rose-500">{loginForm.formState.errors.password.message}</p>}
                </div>
                <Button type="submit" className="h-auto w-full rounded-2xl bg-pink-600 px-4 py-3 font-semibold text-white hover:bg-pink-700">
                  {t('auth.signIn')}
                </Button>
              </form>
            ) : (
              <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">{t('auth.name')}</label>
                  <Input {...registerForm.register('name')} className="h-auto rounded-2xl border-slate-200 px-4 py-3" placeholder={t('auth.yourName')} />
                  {registerForm.formState.errors.name && <p className="mt-1 text-sm text-rose-500">{registerForm.formState.errors.name.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">{t('auth.email')}</label>
                  <Input {...registerForm.register('email')} className="h-auto rounded-2xl border-slate-200 px-4 py-3" placeholder="you@example.com" />
                  {registerForm.formState.errors.email && <p className="mt-1 text-sm text-rose-500">{registerForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">{t('auth.password')}</label>
                  <Input type="password" {...registerForm.register('password')} className="h-auto rounded-2xl border-slate-200 px-4 py-3" placeholder="••••••••" />
                  {registerForm.formState.errors.password && <p className="mt-1 text-sm text-rose-500">{registerForm.formState.errors.password.message}</p>}
                </div>
                <Button type="submit" className="h-auto w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-700">
                  {t('auth.createAccount')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
