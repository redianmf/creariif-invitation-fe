import { ArrowRight, Heart, Sparkles, ShieldCheck, Star } from "lucide-react";
import { AuthModal } from "../auth/auth-modal.view";
import { useLandingService } from "./landing.service";

export function LandingPage() {
  const { authOpen, openAuthModal, closeAuthModal, plans, highlights } = useLandingService();

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
              <p className="text-xs text-slate-500">
                Love stories, beautifully shared
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#about" className="transition hover:text-pink-600">
              About us
            </a>
            <a href="#demo" className="transition hover:text-pink-600">
              Demo
            </a>
            <a href="#pricing" className="transition hover:text-pink-600">
              Pricing
            </a>
            <a href="#contact" className="transition hover:text-pink-600">
              Contact us
            </a>
          </nav>

          <button
            onClick={openAuthModal}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Login
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 py-20 lg:px-8 lg:py-28">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.18),_transparent_30%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-3 py-1 text-sm font-medium text-pink-700 shadow-sm">
                <Sparkles size={16} /> New • Romantic digital invitations for
                modern weddings
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Let your love story unfold with a breathtaking invitation
                experience.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Curate elegant timelines, heartfelt messages, and timeless
                designs that make every guest feel part of the celebration.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={openAuthModal}
                  className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700"
                >
                  Start free <ArrowRight size={16} />
                </button>
                <a
                  href="#demo"
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-pink-300 hover:text-pink-600"
                >
                  View demo
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-br from-pink-200/70 via-rose-100/60 to-white blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-4 shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
                <img
                  src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80"
                  alt="Wedding invitation inspiration"
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
                Why couples love it
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                A modern invitation, crafted for intimacy and elegance.
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
                  Interactive demo
                </p>
                <h2 className="mt-3 text-3xl font-semibold">
                  See how your invitation can feel cinematic and effortless.
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  Merge your story, event timeline, photos, and guest flow into
                  one shared experience that feels premium from the first
                  glance.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-pink-500/20 p-2 text-pink-300">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="font-semibold">Live preview</p>
                    <p className="text-sm text-slate-300">
                      Responsive, polished and ready to share.
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-3">
                    • Storytelling sections with elegant spacing
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-3">
                    • RSVP and guest message experiences
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-3">
                    • Mobile-first layouts that feel fluid
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
                Pricing
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                Choose a plan crafted for every kind of celebration.
              </h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-[2rem] border p-8 shadow-sm ${plan.highlight ? "border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50" : "border-slate-200 bg-white"}`}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {plan.name}
                  </p>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-4xl font-semibold text-slate-900">
                      {plan.price}
                    </span>
                    {plan.price !== "Free" && (
                      <span className="mb-1 text-sm text-slate-500">
                        / month
                      </span>
                    )}
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-600">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={openAuthModal}
                    className={`mt-8 rounded-full px-4 py-3 font-semibold ${plan.highlight ? "bg-pink-600 text-white hover:bg-pink-700" : "bg-slate-900 text-white hover:bg-slate-700"}`}
                  >
                    Get started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-6 pb-20 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
                  Contact us
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                  Need a custom invitation experience?
                </h2>
                <p className="mt-3 max-w-2xl text-slate-600">
                  We’d love to help you build something heartfelt, elegant, and
                  unforgettable for your wedding day.
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
