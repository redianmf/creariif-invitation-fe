import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '../../shared/api/api';
import { selectAuthToken, useAuthStore } from '../../shared/auth/auth-store';
import { useI18n } from '../../shared/i18n/i18n-context';

export interface InvitationDetail {
  id: string;
  slug: string;
  groom_name: string;
  bride_name: string;
  story: string;
  is_published: boolean;
  events: Array<{ title: string; date_time: string; venue_name: string }>;
  media: Array<{ url: string; type: string }>;
}

export function useInvitationEditorService() {
  const { id } = useParams();
  const token = useAuthStore(selectAuthToken);
  const { t } = useI18n();
  const [invitation, setInvitation] = useState<InvitationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groomName, setGroomName] = useState('');
  const [brideName, setBrideName] = useState('');
  const [story, setStory] = useState('');

  const loadInvitation = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.invitations.get(id, token);
      setInvitation(response);
      setGroomName(response.groom_name || '');
      setBrideName(response.bride_name || '');
      setStory(response.story || '');
    } catch (error) {
      const message = error instanceof Error ? error.message : t('editor.loadError');
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [id, t, token]);

  useEffect(() => {
    void loadInvitation();
  }, [loadInvitation]);

  const updateField = useCallback((field: 'groomName' | 'brideName' | 'story', value: string) => {
    switch (field) {
      case 'groomName':
        setGroomName(value);
        break;
      case 'brideName':
        setBrideName(value);
        break;
      case 'story':
        setStory(value);
        break;
    }
  }, []);

  const save = useCallback(async () => {
    if (!id) {
      return;
    }

    try {
      await api.invitations.update(id, { groom_name: groomName, bride_name: brideName, story }, token);
      toast.success(t('editor.updated'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('editor.saveError'));
    }
  }, [brideName, groomName, id, story, t, token]);

  const publish = useCallback(async () => {
    if (!id) {
      return;
    }

    try {
      await api.invitations.publish(id, token);
      toast.success(t('editor.published'));
      setInvitation((prev) => (prev ? { ...prev, is_published: true } : prev));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('editor.publishError'));
    }
  }, [id, t, token]);

  return {
    invitation,
    loading,
    error,
    groomName,
    brideName,
    story,
    updateField,
    save,
    publish,
    publicLink: invitation?.slug ? `/p/${invitation.slug}` : '/p/your-link',
  };
}
