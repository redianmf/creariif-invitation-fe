import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { api } from '../../shared/api/api';
import { useAuthStore } from '../../shared/auth/auth-store';
import { useI18n } from '../../shared/i18n/i18n-context';

interface LoginInputs {
  email: string;
  password: string;
}

interface RegisterInputs extends LoginInputs {
  name: string;
}

interface AuthServiceOptions {
  onAuthenticated?: () => void;
}

export function useAuthService({ onAuthenticated }: AuthServiceOptions = {}) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();
  const setLoginResponse = useAuthStore((state) => state.setLoginResponse);
  const { t } = useI18n();
  const loginSchema = z.object({
    email: z.string().email(t('validation.email')),
    password: z.string().min(6, t('validation.password')),
  });
  const registerSchema = z.object({
    name: z.string().min(2, t('validation.name')),
    email: z.string().email(t('validation.email')),
    password: z.string().min(6, t('validation.password')),
  });

  const loginForm = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onLogin = useCallback(
    async (values: LoginInputs) => {
      try {
        const response = await api.auth.login(values);
        setLoginResponse(response);
        toast.success(t('toast.signInSuccess'));
        onAuthenticated?.();
        navigate('/dashboard');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t('toast.signInError'));
      }
    },
    [navigate, onAuthenticated, setLoginResponse, t],
  );

  const onRegister = useCallback(
    async (values: RegisterInputs) => {
      try {
        await api.auth.register(values);
        toast.success(t('toast.accountCreated'));
        setMode('login');
        loginForm.reset({ email: values.email, password: values.password });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t('toast.accountError'));
      }
    },
    [loginForm, t],
  );

  const changeMode = useCallback((nextMode: 'login' | 'register') => {
    setMode(nextMode);
  }, []);

  const onGoogleSignIn = useCallback(async () => {
    try {
      const response = await api.auth.googleLogin();
      if (response.url) {
        window.location.assign(response.url);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.googleStartError'));
    }
  }, [t]);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) return;
    const authorizationCode = code;

    async function finishGoogleAuth() {
      try {
        const response = await api.auth.googleCallback(authorizationCode);
        setLoginResponse(response);
        toast.success(t('toast.googleSuccess'));
        onAuthenticated?.();
        navigate('/dashboard');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t('toast.googleError'));
      }
    }

    void finishGoogleAuth();
  }, [navigate, onAuthenticated, setLoginResponse, t]);

  return {
    mode,
    changeMode,
    loginForm,
    registerForm,
    onLogin,
    onRegister,
    onGoogleSignIn,
  };
}
