import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CalendarDays, Users } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { api } from '../lib/api';

interface InvitationSummary {
  id: string;
  slug: string;
  groom_name: string;
  bride_name: string;
  is_published: boolean;
}

export function DashboardPage() {
  const { token } = useAuth();
  const [invitations, setInvitations] = useState<InvitationSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await api.invitations.list(token);
        setInvitations(response || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-700">
              <Sparkles size={16} /> Welcome back
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">Manage your invitation experience</h1>
            <p className="mt-3 max-w-2xl text-slate-600">Create a polished digital invite, review your guests, and publish the final link for your celebration.</p>
          </div>
          <Link to="/templates" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700">
            Browse templates <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-pink-100 p-3 text-pink-600">
              <CalendarDays size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Your invitations</h2>
              <p className="text-sm text-slate-500">Track the invitations you are curating</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {loading ? (
              <p className="text-sm text-slate-500">Loading invitations…</p>
            ) : invitations.length === 0 ? (
              <p className="text-sm text-slate-500">No invitations yet. Start from a template to create one.</p>
            ) : (
              invitations.map((invitation) => (
                <Link key={invitation.id} to={`/invitations/${invitation.id}`} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-pink-300 hover:bg-pink-50">
                  <div>
                    <p className="font-medium text-slate-900">{invitation.groom_name || 'Unnamed'} & {invitation.bride_name || 'Guest'}</p>
                    <p className="text-sm text-slate-500">/{invitation.slug}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${invitation.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {invitation.is_published ? 'Published' : 'Draft'}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">
              <Users size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Next steps</h2>
              <p className="text-sm text-slate-500">Guide your guests from discovery to RSVP</p>
            </div>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>• Pick a template that matches your style.</li>
            <li>• Add couple stories, events, and photo galleries.</li>
            <li>• Share the public link and collect messages and RSVPs.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
