import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../shared/api/api';
import { useAuth } from '../../shared/auth/auth-context';
import { useI18n } from '../../shared/i18n/i18n-context';

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  price: number;
  category: string;
}

export function useTemplatesService() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { t } = useI18n();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await api.templates.list(token);
        if (active) {
          setTemplates(response || []);
        }
      } catch (error) {
        if (active) {
          setError(error instanceof Error ? error.message : t('error.loadTemplates'));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [t, token]);

  const selectTemplate = useCallback(
    (template: Template) => {
      navigate('/checkout', { state: { template } });
    },
    [navigate],
  );

  return {
    templates,
    loading,
    error,
    selectTemplate,
  };
}
