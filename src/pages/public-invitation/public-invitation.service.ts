import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '../../shared/api/api';
import { useI18n } from '../../shared/i18n/i18n-context';

export interface PublicInvitationData {
  invitation: {
    slug: string;
    groom_name: string;
    bride_name: string;
    story: string;
    events: Array<{ title: string; date_time: string; venue_name: string }>;
    media: Array<{ url: string; type: string }>;
    template?: { name: string };
  };
  guest?: {
    name: string;
    slug: string;
    rsvp_status?: string;
  };
}

export function usePublicInvitationService() {
  const { invitationSlug, guestSlug } = useParams();
  const { t } = useI18n();
  const [data, setData] = useState<PublicInvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messageName, setMessageName] = useState('');
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    let active = true;

    async function load() {
      if (!invitationSlug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await api.public.getInvitation(invitationSlug, guestSlug);
        if (active) {
          setData(response);
        }
      } catch (error) {
        if (active) {
          const message = error instanceof Error ? error.message : t('editor.loadError');
          setError(message);
          toast.error(message);
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
  }, [guestSlug, invitationSlug, t]);

  const submitRsvp = useCallback(
    async (status: 'accepted' | 'declined') => {
      if (!invitationSlug || !guestSlug) {
        return;
      }

      try {
        await api.public.submitRsvp(invitationSlug, guestSlug, status);
        toast.success(t('public.rsvpSuccess'));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t('public.rsvpError'));
      }
    },
    [guestSlug, invitationSlug, t],
  );

  const submitMessage = useCallback(async () => {
    if (!invitationSlug) {
      return;
    }

    try {
      await api.public.submitMessage(invitationSlug, { name: messageName, message: messageText });
      toast.success(t('public.messageSuccess'));
      setMessageName('');
      setMessageText('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('public.messageError'));
    }
  }, [invitationSlug, messageName, messageText, t]);

  return {
    data,
    loading,
    error,
    messageName,
    messageText,
    setMessageName,
    setMessageText,
    submitRsvp,
    submitMessage,
    guestSlug,
  };
}
