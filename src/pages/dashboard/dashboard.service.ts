import { useEffect, useState } from 'react';
import { api } from '../../shared/api/api';
import { useAuth } from '../../shared/auth/auth-context';

export interface InvitationSummary {
  id: string;
  slug: string;
  groom_name: string;
  bride_name: string;
  is_published: boolean;
}

export function useDashboardService() {
  const { token } = useAuth();
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
          setError(error instanceof Error ? error.message : 'Unable to load invitations');
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
  }, [token]);

  return {
    invitations,
    loading,
    error,
  };
}
