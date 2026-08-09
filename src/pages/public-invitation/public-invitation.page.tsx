import { usePublicInvitationService } from './public-invitation.service';

export function PublicInvitationPage() {
  const { data, loading, error, messageName, messageText, setMessageName, setMessageText, submitRsvp, submitMessage, guestSlug } = usePublicInvitationService();

  if (loading) {
    return <div className="p-8 text-sm text-slate-500">Loading invitation…</div>;
  }

  if (error) {
    return <div className="p-8 text-sm text-rose-600">{error}</div>;
  }

  if (!data?.invitation) {
    return <div className="p-8 text-sm text-slate-500">Invitation not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">You’re invited</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">{data.invitation.groom_name} & {data.invitation.bride_name}</h1>
          <p className="mt-4 text-slate-600">{data.invitation.template?.name || 'Elegant wedding invitation'}</p>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Our story</h2>
          <p className="mt-3 whitespace-pre-line text-slate-600">{data.invitation.story}</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Events</h2>
            <div className="mt-4 space-y-3">
              {data.invitation.events.map((event, index) => (
                <div key={`${event.title}-${index}`} className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{event.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{new Date(event.date_time).toLocaleString()}</p>
                  <p className="text-sm text-slate-600">{event.venue_name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900">RSVP</h2>
            {guestSlug ? (
              <div className="mt-4 flex gap-3">
                <button onClick={() => void submitRsvp('accepted')} className="rounded-full bg-emerald-600 px-4 py-2 font-semibold text-white">Accept</button>
                <button onClick={() => void submitRsvp('declined')} className="rounded-full bg-rose-600 px-4 py-2 font-semibold text-white">Decline</button>
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-600">Open this page through a guest link to RSVP.</p>
            )}

            <h3 className="mt-8 text-lg font-semibold text-slate-900">Leave a message</h3>
            <div className="mt-4 space-y-3">
              <input value={messageName} onChange={(event) => setMessageName(event.target.value)} placeholder="Your name" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
              <textarea value={messageText} onChange={(event) => setMessageText(event.target.value)} rows={4} placeholder="Write a message" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
              <button onClick={() => void submitMessage()} className="rounded-full bg-pink-600 px-4 py-2 font-semibold text-white">Send message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
