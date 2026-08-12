import { useInvitationEditorService } from './invitation-editor.service';
import { useI18n } from '../../shared/i18n/i18n-context';

export function InvitationEditorPage() {
  const { invitation, loading, error, groomName, brideName, story, updateField, save, publish, publicLink } = useInvitationEditorService();
  const { t, language } = useI18n();

  if (loading) {
    return <p className="text-sm text-slate-500">{t('editor.loading')}</p>;
  }

  if (error) {
    return <p className="text-sm text-rose-600">{error}</p>;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">{t('editor.title')}</h1>
            <p className="mt-2 text-sm text-slate-600">{t('editor.description')}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">{t('editor.save')}</button>
            <button onClick={publish} className="rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700">{t('editor.publish')}</button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">{t('editor.details')}</h2>
          <div className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                {t('editor.groom')}
                <input value={groomName} onChange={(event) => updateField('groomName', event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                {t('editor.bride')}
                <input value={brideName} onChange={(event) => updateField('brideName', event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" />
              </label>
            </div>
            <label className="block text-sm font-medium text-slate-700">
              {t('editor.story')}
              <textarea value={story} onChange={(event) => updateField('story', event.target.value)} rows={6} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" />
            </label>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              {t('editor.publicLink', { link: publicLink })}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">{t('editor.eventsMedia')}</h2>
          <div className="mt-6 space-y-4">
            {(invitation?.events || []).length === 0 ? (
              <p className="text-sm text-slate-500">{t('editor.noEvents')}</p>
            ) : (
              invitation?.events.map((event, index) => (
                <div key={`${event.title}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{event.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{new Date(event.date_time).toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}</p>
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
