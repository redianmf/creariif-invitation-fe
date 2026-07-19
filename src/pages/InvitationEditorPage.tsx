import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';

interface InvitationDetail {
  id: string;
  slug: string;
  groom_name: string;
  bride_name: string;
  story: string;
  is_published: boolean;
  events: Array<{ title: string; date_time: string; venue_name: string }>;
  media: Array<{ url: string; type: string }>;
}

export function InvitationEditorPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [invitation, setInvitation] = useState<InvitationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [groomName, setGroomName] = useState('');
  const [brideName, setBrideName] = useState('');
  const [story, setStory] = useState('');

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const response = await api.invitations.get(id, token);
        setInvitation(response);
        setGroomName(response.groom_name || '');
        setBrideName(response.bride_name || '');
        setStory(response.story || '');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Unable to load invitation');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, token]);

  const save = async () => {
    if (!id) return;
    try {
      await api.invitations.update(id, { groom_name: groomName, bride_name: brideName, story }, token);
      toast.success('Invitation updated');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to save invitation');
    }
  };

  const publish = async () => {
    if (!id) return;
    try {
      await api.invitations.publish(id, token);
      toast.success('Invitation published');
      setInvitation((prev) => prev ? { ...prev, is_published: true } : prev);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to publish invitation');
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-500">Loading invitation…</p>;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Invitation editor</h1>
            <p className="mt-2 text-sm text-slate-600">Edit the core content of your invitation and share the public link when ready.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">Save</button>
            <button onClick={publish} className="rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700">Publish</button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Invitation details</h2>
          <div className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Groom name
                <input value={groomName} onChange={(event) => setGroomName(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Bride name
                <input value={brideName} onChange={(event) => setBrideName(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" />
              </label>
            </div>
            <label className="block text-sm font-medium text-slate-700">
              Story
              <textarea value={story} onChange={(event) => setStory(event.target.value)} rows={6} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" />
            </label>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              Public link: /p/{invitation?.slug || 'your-link'}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Events & media</h2>
          <div className="mt-6 space-y-4">
            {(invitation?.events || []).length === 0 ? (
              <p className="text-sm text-slate-500">No events have been added yet.</p>
            ) : (
              invitation?.events.map((event, index) => (
                <div key={`${event.title}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{event.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{new Date(event.date_time).toLocaleString()}</p>
                  <p className="text-sm text-slate-600">{event.venue_name}</p>
                </div>
              ))
            )}
            {(invitation?.media || []).length > 0 && (
              <div className="space-y-2">
                {(invitation?.media || []).map((item) => (
                  <div key={item.url} className="rounded-2xl border border-slate-200 p-3 text-sm text-slate-600">
                    {item.type}: {item.url}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
