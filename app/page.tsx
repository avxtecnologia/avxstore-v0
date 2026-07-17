"use client"

import { useState } from "react"
import { I18nProvider } from "@/components/i18n-provider"
import { TopBar } from "@/components/top-bar"
import { VideoDemoSection } from "@/components/video-demo-section"
import { PlansSection } from "@/components/plans-section"
import { BottomCta } from "@/components/bottom-cta"
import { CheckoutPage } from "@/components/checkout-page"
import { PLANS } from "@/lib/plans"

function StoreContent() {
  const [selectedId, setSelectedId] = useState<string>("pro")
  const [checkout, setCheckout] = useState(false)
  const selectedPlan = PLANS.find((p) => p.id === selectedId) ?? PLANS[0]

  if (checkout) {
    return <CheckoutPage plan={selectedPlan} onBack={() => setCheckout(false)} />
  }

  return (
    <div className="min-h-dvh text-foreground">
      <TopBar />

      <main className="mx-auto max-w-7xl px-4 pb-32 pt-6 sm:px-6">
        <VideoDemoSection />
        <PlansSection selectedId={selectedId} onSelect={setSelectedId} />
      </main>

      <BottomCta plan={selectedPlan} onCheckout={() => setCheckout(true)} />
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
