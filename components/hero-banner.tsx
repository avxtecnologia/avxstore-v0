"use client"

import { useTranslation } from "react-i18next"
import { Zap, ShieldCheck, Check, Infinity as InfinityIcon } from "lucide-react"

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-foreground backdrop-blur">
      <span className="text-primary">{icon}</span>
      <span>{label}</span>
    </div>
  )
}

export function HeroBanner() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden px-6 py-5 sm:px-8 sm:py-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 size-56 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-20 size-56 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Zap className="size-3.5" />
          {t("home.promoBadge")}
        </span>

        <h1 className="mt-3 text-balance text-2xl font-bold leading-[1.15] tracking-tight sm:text-3xl lg:text-4xl">
          {t("home.title1")}{" "}
          <span className="bg-gradient-to-r from-primary to-[#ff9752] bg-clip-text text-transparent">
            {t("home.titleHighlight")}
          </span>{" "}
          {t("home.title2")}
        </h1>

        <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("home.subtitle")}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <TrustBadge icon={<ShieldCheck className="size-3.5" />} label={t("home.securePayment")} />
          <TrustBadge icon={<Check className="size-3.5" />} label={t("home.compatible")} />
          <TrustBadge icon={<InfinityIcon className="size-3.5" />} label={t("home.noFidelity")} />
        </div>
      </div>
    </section>
  )
}
