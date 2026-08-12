import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Sparkles, UserCircle2 } from 'lucide-react';
import { useAuth } from '../shared/auth/auth-context';
import { LanguageSelector } from '../shared/i18n/language-selector';
import { useI18n } from '../shared/i18n/i18n-context';

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
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
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <UserCircle2 size={16} />
              {user?.name || t('dashboard.guest')}
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/auth');
              }}
              className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
