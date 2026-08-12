import { useEffect, useState } from 'react';
import { api } from '../../shared/api/api';
import { useAuth } from '../../shared/auth/auth-context';
import { useI18n } from '../../shared/i18n/i18n-context';

export interface InvitationSummary {
  id: string;
  slug: string;
  groom_name: string;
  bride_name: string;
  is_published: boolean;
}

export function useDashboardService() {
  const { token } = useAuth();
  const { t } = useI18n();
  const [invitations, setInvitations] = useState<InvitationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await api.invitations.list(token);
        if (active) {
          setInvitations(response || []);
        }
      } catch (error) {
        if (active) {
          setError(error instanceof Error ? error.message : t('error.loadInvitations'));
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

  return {
    invitations,
    loading,
    error,
  };
}
