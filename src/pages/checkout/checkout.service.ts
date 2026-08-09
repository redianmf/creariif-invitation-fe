import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '../../shared/api/api';
import { useAuth } from '../../shared/auth/auth-context';

export interface CheckoutTemplate {
  id: string;
  name: string;
  price: number;
}

export function useCheckoutService() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const selectedTemplate = (location.state as { template?: CheckoutTemplate } | null)?.template;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = useCallback(async () => {
    if (!selectedTemplate) {
      setError('Please choose a template first');
      toast.error('Please choose a template first');
      navigate('/templates');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await api.orders.checkout({ template_id: selectedTemplate.id }, token);
      toast.success('Checkout initialized successfully');
      navigate('/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Checkout failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [navigate, selectedTemplate, token]);

  return {
    selectedTemplate,
    loading,
    error,
    handleCheckout,
  };
}
