import { Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "./i18n-context";
import { languages } from "./translations";
import type { Language } from "./translations";

export function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700">
      <Languages size={16} aria-hidden="true" />
      <span className="sr-only">{t("language.label")}</span>
      <Select
        value={language}
        onValueChange={(value) => setLanguage(value as Language)}
      >
        <SelectTrigger aria-label={t("language.label")} className="h-8 border-0 bg-transparent px-0 shadow-none hover:bg-transparent focus-visible:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languages).map(([code, label]) => (
            <SelectItem key={code} value={code}>{label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
