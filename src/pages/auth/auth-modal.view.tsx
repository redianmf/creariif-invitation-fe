import { Globe2, X } from "lucide-react";
import { useAuthService } from "./auth.service";
import { useI18n } from "../../shared/i18n/i18n-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  const { mode, changeMode, loginForm, registerForm, onLogin, onRegister, onGoogleSignIn } = useAuthService({ onAuthenticated: onClose });
  const { t } = useI18n();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl">
        <Button
          onClick={onClose}
          variant="outline"
          size="icon"
          className="absolute right-4 top-4 rounded-full border-slate-200 text-slate-600 hover:bg-slate-100"
        >
          <X size={18} />
        </Button>

        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-gradient-to-br from-pink-600 via-rose-500 to-orange-400 p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-100">
              {t('auth.welcomeBack')}
            </p>
            <h2 className="mt-4 text-3xl font-semibold">
              {t('auth.modalTitle')}
            </h2>
            <p className="mt-4 text-sm text-pink-50/90">
              {t('auth.modalDescription')}
            </p>
          </div>

          <div className="p-8">
            <div className="mb-6 flex gap-2 rounded-full border border-slate-200 p-1">
              <Button
                type="button"
                variant={mode === "login" ? "default" : "ghost"}
                onClick={() => changeMode("login")}
                className={`h-auto flex-1 rounded-full px-4 py-2 text-sm font-medium ${mode === "login" ? "bg-slate-900 text-white" : "text-slate-600"}`}
              >
                {t('auth.signIn')}
              </Button>
              <Button
                type="button"
                variant={mode === "register" ? "default" : "ghost"}
                onClick={() => changeMode("register")}
                className={`h-auto flex-1 rounded-full px-4 py-2 text-sm font-medium ${mode === "register" ? "bg-slate-900 text-white" : "text-slate-600"}`}
              >
                {t('auth.createAccount')}
              </Button>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={onGoogleSignIn}
              className="mb-4 h-auto w-full rounded-2xl border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 hover:border-pink-300 hover:bg-pink-50"
            >
              <Globe2 size={18} />
              {t('auth.continueGoogle')}
            </Button>

            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
              <div className="h-px flex-1 bg-slate-200" />
              <span>{t('auth.or')}</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {mode === "login" ? (
              <form
                onSubmit={loginForm.handleSubmit(onLogin)}
                className="space-y-4"
              >
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {t('auth.email')}
                  </label>
                  <Input
                    {...loginForm.register("email")}
                    className="h-auto rounded-2xl border-slate-200 px-4 py-3"
                    placeholder="you@example.com"
                  />
                  {loginForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-rose-500">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {t('auth.password')}
                  </label>
                  <Input
                    type="password"
                    {...loginForm.register("password")}
                    className="h-auto rounded-2xl border-slate-200 px-4 py-3"
                    placeholder="••••••••"
                  />
                  {loginForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-rose-500">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="h-auto w-full rounded-2xl bg-pink-600 px-4 py-3 font-semibold text-white hover:bg-pink-700"
                >
                  {t('auth.signIn')}
                </Button>
              </form>
            ) : (
              <form
                onSubmit={registerForm.handleSubmit(onRegister)}
                className="space-y-4"
              >
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {t('auth.name')}
                  </label>
                  <Input
                    {...registerForm.register("name")}
                    className="h-auto rounded-2xl border-slate-200 px-4 py-3"
                    placeholder={t('auth.yourName')}
                  />
                  {registerForm.formState.errors.name && (
                    <p className="mt-1 text-sm text-rose-500">
                      {registerForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {t('auth.email')}
                  </label>
                  <Input
                    {...registerForm.register("email")}
                    className="h-auto rounded-2xl border-slate-200 px-4 py-3"
                    placeholder="you@example.com"
                  />
                  {registerForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-rose-500">
                      {registerForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {t('auth.password')}
                  </label>
                  <Input
                    type="password"
                    {...registerForm.register("password")}
                    className="h-auto rounded-2xl border-slate-200 px-4 py-3"
                    placeholder="••••••••"
                  />
                  {registerForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-rose-500">
                      {registerForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="h-auto w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-700"
                >
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
