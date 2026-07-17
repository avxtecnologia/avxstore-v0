"use client"

import { useTranslation } from "react-i18next"
import { Zap, ShieldCheck, Check, Infinity as InfinityIcon } from "lucide-react"

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground backdrop-blur">
      <span className="text-primary">{icon}</span>
      <span>{label}</span>
    </div>
  )
}

export function HeroBanner() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
      {/* Decorative blurred glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-20 size-64 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Zap className="size-3.5" />
          {t("home.promoBadge")}
        </span>

        <h1 className="mt-4 text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
          {t("home.title1")}{" "}
          <span className="bg-gradient-to-r from-primary to-[#ff9752] bg-clip-text text-transparent">
            {t("home.titleHighlight")}
          </span>{" "}
          {t("home.title2")}
        </h1>

        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("home.subtitle")}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <TrustBadge icon={<ShieldCheck className="size-4" />} label={t("home.securePayment")} />
          <TrustBadge icon={<Check className="size-4" />} label={t("home.compatible")} />
          <TrustBadge icon={<InfinityIcon className="size-4" />} label={t("home.noFidelity")} />
        </div>
      </div>
    </section>
  )
}
