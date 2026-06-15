"use client"

import { useTranslation } from "react-i18next"
import { ArrowRight, MessageCircle } from "lucide-react"
import { formatBRL, type Plan } from "@/lib/plans"

export function BottomCta({ plan }: { plan: Plan }) {
  const { t } = useTranslation()
  const isFree = plan.priceCents === 0

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">{t("home.totalValue")}</span>
          <span className="text-2xl font-bold tracking-tight">{formatBRL(plan.priceCents)}</span>
        </div>

        {isFree ? (
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-5 py-3 text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/25"
          >
            <MessageCircle className="size-4" />
            {t("home.whatsapp")}
          </a>
        ) : (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-opacity hover:opacity-90"
          >
            {t("home.subscribe")} {plan.name}
            <ArrowRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}
