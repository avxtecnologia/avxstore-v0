"use client"

import { useState } from "react"
import { I18nProvider } from "@/components/i18n-provider"
import { TopBar } from "@/components/top-bar"
import { HeroBanner } from "@/components/hero-banner"
import { PlansSection } from "@/components/plans-section"
import { BottomCta } from "@/components/bottom-cta"
import { PLANS } from "@/lib/plans"

function StoreContent() {
  const [selectedId, setSelectedId] = useState<string>("pro")
  const selectedPlan = PLANS.find((p) => p.id === selectedId) ?? PLANS[0]

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <TopBar />

      <main className="mx-auto max-w-7xl px-4 pb-32 pt-6 sm:px-6">
        <HeroBanner />
        <PlansSection selectedId={selectedId} onSelect={setSelectedId} />
      </main>

      <BottomCta plan={selectedPlan} />
    </div>
  )
}

export default function Page() {
  return (
    <I18nProvider>
      <StoreContent />
    </I18nProvider>
  )
}
