import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { api } from '../../shared/api/api';
import { useAuth } from '../../shared/auth/auth-context';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginInputs = z.infer<typeof loginSchema>;
type RegisterInputs = z.infer<typeof registerSchema>;

interface AuthServiceOptions {
  onAuthenticated?: () => void;
}

export function useAuthService({ onAuthenticated }: AuthServiceOptions = {}) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();
  const { login } = useAuth();

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
        const user = response.user;
        const token = response.token.access_token;
        login(user, token);
        toast.success('Signed in successfully');
        onAuthenticated?.();
        navigate('/dashboard');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Unable to sign in');
      }
    },
    [login, navigate],
  );

  const onRegister = useCallback(
    async (values: RegisterInputs) => {
      try {
        await api.auth.register(values);
        toast.success('Account created. You can sign in now.');
        setMode('login');
        loginForm.reset({ email: values.email, password: values.password });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Unable to create account');
      }
    },
    [loginForm],
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
      toast.error(error instanceof Error ? error.message : 'Unable to start Google sign in');
    }
  }, []);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) return;
    const authorizationCode = code;

    async function finishGoogleAuth() {
      try {
        const response = await api.auth.googleCallback(authorizationCode);
        login(response.user, response.token.access_token);
        toast.success('Signed in with Google');
        onAuthenticated?.();
        navigate('/dashboard');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Google sign in failed');
      }
    }

    void finishGoogleAuth();
  }, [login, navigate, onAuthenticated]);

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
