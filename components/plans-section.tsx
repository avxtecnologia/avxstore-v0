"use client"

import { useTranslation } from "react-i18next"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { PLANS, formatBRL, type Plan } from "@/lib/plans"
import type { SupportedLang } from "@/lib/i18n"

function PlanCard({
  plan,
  selected,
  onSelect,
  lang,
}: {
  plan: Plan
  selected: boolean
  onSelect: () => void
  lang: SupportedLang
}) {
  const { t } = useTranslation()
  const Icon = plan.icon

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group relative flex flex-col items-start gap-4 rounded-2xl border bg-gradient-to-br from-card to-[#0d0d16] p-5 text-left transition-all",
        selected
          ? "border-primary/60 ring-2 ring-primary shadow-[0_0_30px_-5px] shadow-primary/40"
          : "border-white/10 hover:border-white/20",
      )}
    >
      {plan.tag && (
        <span
          className={cn(
            "absolute right-4 top-4 rounded-full px-2.5 py-1 text-[11px] font-semibold",
            plan.tag === "popular"
              ? "bg-primary/20 text-primary"
              : "bg-indigo-500/20 text-indigo-300",
          )}
        >
          {plan.tagLabel[lang]}
        </span>
      )}

      <span
        className={cn(
          "flex size-11 items-center justify-center rounded-xl transition-colors",
          selected ? "bg-primary text-white" : "bg-white/5 text-primary",
        )}
      >
        <Icon className="size-5" />
      </span>

      <div>
        <h3 className="text-lg font-bold">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">
          {plan.duration[lang]} {t("home.accessSuffix")}
        </p>
      </div>

      <div className="mt-1 text-2xl font-bold tracking-tight">{formatBRL(plan.priceCents)}</div>

      <span
        className={cn(
          "mt-auto inline-flex items-center gap-1.5 text-sm font-medium",
          selected ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
        )}
      >
        {selected ? (
          <>
            {t("home.selected")} <Check className="size-4" />
          </>
        ) : (
          t("home.selectPlan")
        )}
      </span>
    </button>
  )
}

export function PlansSection({
  selectedId,
  onSelect,
}: {
  selectedId: string
  onSelect: (id: string) => void
}) {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language as SupportedLang) ?? "pt"

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("home.choosePlan")}</h2>
      <p className="mt-1 text-muted-foreground">{t("home.chooseHint")}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={plan.id === selectedId}
            onSelect={() => onSelect(plan.id)}
            lang={lang}
          />
        ))}
      </div>
    </section>
  )
}
