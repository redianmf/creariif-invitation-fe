import { Languages } from "lucide-react";
import { useI18n } from "./i18n-context";
import { languages } from "./translations";
import type { Language } from "./translations";

export function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();

  return (
    <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
      <Languages size={16} aria-hidden="true" />
      <span className="sr-only">{t("language.label")}</span>
      <select
        aria-label={t("language.label")}
        value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
        className="cursor-pointer bg-transparent font-medium outline-none"
      >
        {Object.entries(languages).map(([code, label]) => (
          <option key={code} value={code}>{label}</option>
        ))}
      </select>
    </label>
  );
}
