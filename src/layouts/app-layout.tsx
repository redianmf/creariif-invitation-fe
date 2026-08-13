import { Link, Outlet, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { LanguageSelector } from '../shared/i18n/language-selector';
import { useI18n } from '../shared/i18n/i18n-context';
import { UserMenu } from '../components/user-menu';

export function Layout() {
  const location = useLocation();
  const { t } = useI18n();
  const navItems = [
    { to: '/dashboard', label: t('nav.dashboard') },
    { to: '/templates', label: t('nav.templates') },
    { to: '/checkout', label: t('nav.checkout') },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-pink-100 p-2 text-pink-600">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Creariif Invitation</p>
              <p className="text-sm text-slate-500">{t('brand.tagline')}</p>
            </div>
          </div>

          <nav className="hidden gap-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-4 py-2 text-sm font-medium ${location.pathname === item.to ? 'bg-pink-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
