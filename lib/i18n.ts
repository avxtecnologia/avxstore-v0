"use client"

import i18n from "i18next"
import { initReactI18next } from "react-i18next"

export const resources = {
  pt: {
    translation: {
      topbar: {
        searchPlaceholder: "Buscar produtos, créditos, planos…",
        panel: "Painel",
      },
      home: {
        promoBadge: "Oferta relâmpago • termina em breve",
        title1: "Acesso",
        titleHighlight: "ILIMITADO",
        title2: "para você criar sem freio.",
        subtitle: "Adquira tempo de uso na AVXStore em segundos. Ative com PIX, comece a construir agora.",
        securePayment: "Pagamento seguro",
        compatible: "Compatível com todos os projetos",
        noFidelity: "Sem fidelidade",
        choosePlan: "Escolha seu plano",
        chooseHint: "Selecione um cartão para atualizar o valor do botão.",
        accessSuffix: "de acesso",
        selected: "Selecionado",
        selectPlan: "Selecionar plano",
        totalValue: "Valor total",
        subscribe: "Assinar",
        whatsapp: "Falar no WhatsApp",
      },
    },
  },
  en: {
    translation: {
      topbar: {
        searchPlaceholder: "Search products, credits, plans…",
        panel: "Panel",
      },
      home: {
        promoBadge: "Flash deal • ending soon",
        title1: "Get",
        titleHighlight: "UNLIMITED",
        title2: "access and build without limits.",
        subtitle: "Buy AVXStore usage time in seconds. Activate with PIX and start building now.",
        securePayment: "Secure payment",
        compatible: "Works with every project",
        noFidelity: "No commitment",
        choosePlan: "Choose your plan",
        chooseHint: "Pick a card to update the button price.",
        accessSuffix: "of access",
        selected: "Selected",
        selectPlan: "Select plan",
        totalValue: "Total",
        subscribe: "Subscribe",
        whatsapp: "Chat on WhatsApp",
      },
    },
  },
  es: {
    translation: {
      topbar: {
        searchPlaceholder: "Buscar productos, créditos, planes…",
        panel: "Panel",
      },
      home: {
        promoBadge: "Oferta flash • termina pronto",
        title1: "Acceso",
        titleHighlight: "ILIMITADO",
        title2: "para crear sin frenos.",
        subtitle: "Compra tiempo de uso en AVXStore en segundos. Activa con PIX y empieza ya.",
        securePayment: "Pago seguro",
        compatible: "Compatible con todos los proyectos",
        noFidelity: "Sin permanencia",
        choosePlan: "Elige tu plan",
        chooseHint: "Selecciona una tarjeta para actualizar el precio.",
        accessSuffix: "de acceso",
        selected: "Seleccionado",
        selectPlan: "Seleccionar plan",
        totalValue: "Total",
        subscribe: "Suscribirse",
        whatsapp: "Hablar por WhatsApp",
      },
    },
  },
} as const

export const SUPPORTED_LANGS = ["pt", "en", "es"] as const
export type SupportedLang = (typeof SUPPORTED_LANGS)[number]

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    // Always initialize with "pt" so server and first client render match (SSR-safe).
    lng: "pt",
    fallbackLng: "pt",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })
}

/**
 * Resolve the language to use on the client:
 * localStorage("app_lang") -> browser language -> "pt"
 */
export function resolveClientLang(): SupportedLang {
  if (typeof window === "undefined") return "pt"

  const stored = window.localStorage.getItem("app_lang")
  if (stored && (SUPPORTED_LANGS as readonly string[]).includes(stored)) {
    return stored as SupportedLang
  }

  const browser = window.navigator.language?.slice(0, 2).toLowerCase()
  if (browser && (SUPPORTED_LANGS as readonly string[]).includes(browser)) {
    return browser as SupportedLang
  }

  return "pt"
}

export default i18n
