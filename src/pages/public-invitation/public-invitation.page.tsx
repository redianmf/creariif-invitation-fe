import { usePublicInvitationService } from './public-invitation.service';
import { useI18n } from '../../shared/i18n/i18n-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function PublicInvitationPage() {
  const { data, loading, error, messageName, messageText, setMessageName, setMessageText, submitRsvp, submitMessage, guestSlug } = usePublicInvitationService();
  const { t, language } = useI18n();

  if (loading) {
    return <div className="p-8 text-sm text-slate-500">{t('public.loading')}</div>;
  }

  if (error) {
    return <div className="p-8 text-sm text-rose-600">{error}</div>;
  }

  if (!data?.invitation) {
    return <div className="p-8 text-sm text-slate-500">{t('public.notFound')}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">{t('public.invited')}</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">{data.invitation.groom_name} & {data.invitation.bride_name}</h1>
          <p className="mt-4 text-slate-600">{data.invitation.template?.name || t('public.defaultTemplate')}</p>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">{t('public.ourStory')}</h2>
          <p className="mt-3 whitespace-pre-line text-slate-600">{data.invitation.story}</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900">{t('public.events')}</h2>
            <div className="mt-4 space-y-3">
              {data.invitation.events.map((event, index) => (
                <div key={`${event.title}-${index}`} className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{event.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{new Date(event.date_time).toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}</p>
                  <p className="text-sm text-slate-600">{event.venue_name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900">{t('public.rsvp')}</h2>
            {guestSlug ? (
              <div className="mt-4 flex gap-3">
                <Button onClick={() => void submitRsvp('accepted')} className="rounded-full bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700">{t('public.accept')}</Button>
                <Button onClick={() => void submitRsvp('declined')} className="rounded-full bg-rose-600 px-4 py-2 font-semibold text-white hover:bg-rose-700">{t('public.decline')}</Button>
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-600">{t('public.rsvpHint')}</p>
            )}

            <h3 className="mt-8 text-lg font-semibold text-slate-900">{t('public.leaveMessage')}</h3>
            <div className="mt-4 space-y-3">
              <Input value={messageName} onChange={(event) => setMessageName(event.target.value)} placeholder={t('public.yourName')} className="h-auto rounded-2xl border-slate-200 px-4 py-3" />
              <Textarea value={messageText} onChange={(event) => setMessageText(event.target.value)} rows={4} placeholder={t('public.writeMessage')} className="min-h-0 rounded-2xl border-slate-200 px-4 py-3" />
              <Button onClick={() => void submitMessage()} className="rounded-full bg-pink-600 px-4 py-2 font-semibold text-white hover:bg-pink-700">{t('public.sendMessage')}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
