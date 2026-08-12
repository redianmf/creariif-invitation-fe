import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CalendarDays, Users } from 'lucide-react';
import { useDashboardService } from './dashboard.service';
import { useI18n } from '../../shared/i18n/i18n-context';

export function DashboardPage() {
  const { invitations, loading, error } = useDashboardService();
  const { t } = useI18n();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-700">
              <Sparkles size={16} /> {t('dashboard.welcome')}
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">{t('dashboard.title')}</h1>
            <p className="mt-3 max-w-2xl text-slate-600">{t('dashboard.description')}</p>
          </div>
          <Link to="/templates" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700">
            {t('dashboard.browseTemplates')} <ArrowRight size={16} />
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
              <h2 className="text-xl font-semibold text-slate-900">{t('dashboard.invitations')}</h2>
              <p className="text-sm text-slate-500">{t('dashboard.invitationsDescription')}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {loading ? (
              <p className="text-sm text-slate-500">{t('dashboard.loading')}</p>
            ) : error ? (
              <p className="text-sm text-rose-600">{error}</p>
            ) : invitations.length === 0 ? (
              <p className="text-sm text-slate-500">{t('dashboard.empty')}</p>
            ) : (
              invitations.map((invitation) => (
                <Link key={invitation.id} to={`/invitations/${invitation.id}`} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-pink-300 hover:bg-pink-50">
                  <div>
                    <p className="font-medium text-slate-900">{invitation.groom_name || t('dashboard.unnamed')} & {invitation.bride_name || t('dashboard.guest')}</p>
                    <p className="text-sm text-slate-500">/{invitation.slug}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${invitation.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {invitation.is_published ? t('dashboard.published') : t('dashboard.draft')}
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
              <h2 className="text-xl font-semibold text-slate-900">{t('dashboard.nextSteps')}</h2>
              <p className="text-sm text-slate-500">{t('dashboard.nextStepsDescription')}</p>
            </div>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>• {t('dashboard.step1')}</li>
            <li>• {t('dashboard.step2')}</li>
            <li>• {t('dashboard.step3')}</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
