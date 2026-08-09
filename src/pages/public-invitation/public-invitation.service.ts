import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '../../shared/api/api';

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
          const message = error instanceof Error ? error.message : 'Unable to load invitation';
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
  }, [guestSlug, invitationSlug]);

  const submitRsvp = useCallback(
    async (status: 'accepted' | 'declined') => {
      if (!invitationSlug || !guestSlug) {
        return;
      }

      try {
        await api.public.submitRsvp(invitationSlug, guestSlug, status);
        toast.success('RSVP submitted');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Unable to submit RSVP');
      }
    },
    [guestSlug, invitationSlug],
  );

  const submitMessage = useCallback(async () => {
    if (!invitationSlug) {
      return;
    }

    try {
      await api.public.submitMessage(invitationSlug, { name: messageName, message: messageText });
      toast.success('Message sent');
      setMessageName('');
      setMessageText('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to send message');
    }
  }, [invitationSlug, messageName, messageText]);

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
