"use client"

import { useEffect, useState } from "react"
import { I18nextProvider } from "react-i18next"
import i18n, { resolveClientLang } from "@/lib/i18n"

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Switch to the user's preferred language after mount (SSR-safe hydration).
    const lang = resolveClientLang()
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
    setReady(true)
  }, [])

  return (
    <I18nextProvider i18n={i18n}>
      <div data-i18n-ready={ready}>{children}</div>
    </I18nextProvider>
  )
}
