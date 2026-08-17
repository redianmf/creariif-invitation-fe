import { ArrowRight, Heart, Sparkles, ShieldCheck, Star } from "lucide-react";
import { AuthModal } from "../auth/auth-modal.view";
import { useLandingService } from "./landing.service";
import { LanguageSelector } from "../../shared/i18n/language-selector";
import { useI18n } from "../../shared/i18n/i18n-context";
import { Button } from "@/components/ui/button";
import { UserMenu } from "../../components/user-menu";
import {
  selectIsAuthenticated,
  useAuthStore,
} from "../../shared/auth/auth-store";

export function LandingPage() {
  const { authOpen, openAuthModal, closeAuthModal, steps, highlights } =
    useLandingService();
  const { t } = useI18n();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  return (
    <div className="min-h-screen bg-[#fffaf7] text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-pink-100 p-2 text-pink-600">
              <Heart size={18} />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">
                Creariif Invitation
              </p>
              <p className="text-xs text-slate-500">{t("landing.tagline")}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#about" className="transition hover:text-pink-600">
              {t("nav.about")}
            </a>
            <a href="#demo" className="transition hover:text-pink-600">
              {t("nav.demo")}
            </a>
            <a href="#steps" className="transition hover:text-pink-600">
              {t("nav.steps")}
            </a>
            <a href="#contact" className="transition hover:text-pink-600">
              {t("nav.contact")}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button
                onClick={openAuthModal}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                {t("auth.login")}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 py-20 lg:px-8 lg:py-28">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.18),_transparent_30%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-3 py-1 text-sm font-medium text-pink-700 shadow-sm">
                <Sparkles size={16} /> {t("landing.badge")}
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {t("landing.title")}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                {t("landing.description")}
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-br from-pink-200/70 via-rose-100/60 to-white blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-4 shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
                <img
                  src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80"
                  alt={t("landing.imageAlt")}
                  className="h-[460px] w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
                {t("landing.why")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                {t("landing.whyTitle")}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 rounded-full bg-pink-100 p-2 text-pink-600 w-fit">
                    <Star size={16} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="demo" className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-slate-900 p-10 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">
                  {t("landing.demoEyebrow")}
                </p>
                <h2 className="mt-3 text-3xl font-semibold">
                  {t("landing.demoTitle")}
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  {t("landing.demoDescription")}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-pink-500/20 p-2 text-pink-300">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="font-semibold">{t("landing.livePreview")}</p>
                    <p className="text-sm text-slate-300">
                      {t("landing.livePreviewDescription")}
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-3">
                    • {t("landing.demoFeature1")}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-3">
                    • {t("landing.demoFeature2")}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-3">
                    • {t("landing.demoFeature3")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="steps" className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
                {t("nav.steps")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                {t("landing.stepsTitle")}
              </h2>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-3 relative">
              <div className="hidden lg:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-pink-200 via-rose-200 to-pink-200 -z-10" />
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-white bg-pink-100 text-2xl font-bold text-pink-600 shadow-md">
                    {index + 1}
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-slate-600 max-w-xs">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-16 flex justify-center">
              <Button
                onClick={openAuthModal}
                className="h-auto rounded-full bg-slate-900 px-8 py-4 font-semibold text-white hover:bg-slate-700"
              >
                {t("landing.getStarted")}
              </Button>
            </div>
          </div>
        </section>

        <section id="contact" className="px-6 pb-20 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
                  {t("nav.contact")}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                  {t("landing.contactTitle")}
                </h2>
                <p className="mt-3 max-w-2xl text-slate-600">
                  {t("landing.contactDescription")}
                </p>
              </div>
              <a
                href="mailto:hello@creariif.com"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
              >
                hello@creariif.com <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <AuthModal open={authOpen} onClose={closeAuthModal} />
    </div>
  );
}
