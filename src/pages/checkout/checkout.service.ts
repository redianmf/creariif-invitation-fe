import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '../../shared/api/api';
import { selectAuthToken, useAuthStore } from '../../shared/auth/auth-store';
import { useI18n } from '../../shared/i18n/i18n-context';

export interface CheckoutTemplate {
  id: string;
  name: string;
  price: number;
}

export function useCheckoutService() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAuthStore(selectAuthToken);
  const { t } = useI18n();
  const selectedTemplate = (location.state as { template?: CheckoutTemplate } | null)?.template;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = useCallback(async () => {
    if (!selectedTemplate) {
      setError(t('checkout.selectFirst'));
      toast.error(t('checkout.selectFirst'));
      navigate('/templates');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await api.orders.checkout({ template_id: selectedTemplate.id }, token);
      toast.success(t('checkout.success'));
      navigate('/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : t('checkout.error');
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [navigate, selectedTemplate, t, token]);

  return {
    selectedTemplate,
    loading,
    error,
    handleCheckout,
  };
}
