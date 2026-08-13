import { UserCircle2 } from "lucide-react";
import { selectAuthUser, useAuthStore } from "../../shared/auth/auth-store";
import { useI18n } from "../../shared/i18n/i18n-context";

export function ProfilePage() {
  const user = useAuthStore(selectAuthUser);
  const { t } = useI18n();

  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-pink-100 p-4 text-pink-600">
          <UserCircle2 size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{t("profile.title")}</h1>
          <p className="text-slate-500">{t("profile.description")}</p>
        </div>
      </div>
      <dl className="mt-8 divide-y divide-slate-100 rounded-2xl border border-slate-100 px-5">
        <div className="flex justify-between gap-4 py-4">
          <dt className="text-sm text-slate-500">{t("auth.name")}</dt>
          <dd className="text-right text-sm font-medium text-slate-900">{user?.name}</dd>
        </div>
        <div className="flex justify-between gap-4 py-4">
          <dt className="text-sm text-slate-500">{t("auth.email")}</dt>
          <dd className="text-right text-sm font-medium text-slate-900">{user?.email}</dd>
        </div>
      </dl>
    </section>
  );
}
