import { Sparkles, Zap, Rocket, Crown, Infinity as InfinityIcon, type LucideIcon } from "lucide-react"

export type PlanTag = "popular" | "best" | null

export interface Plan {
  id: string
  name: string
  /** Duration label per language (pt/en/es) */
  duration: Record<"pt" | "en" | "es", string>
  /** Price in cents (BRL). 0 = free */
  priceCents: number
  icon: LucideIcon
  tag: PlanTag
  tagLabel: Record<"pt" | "en" | "es", string>
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    duration: { pt: "15 minutos", en: "15 minutes", es: "15 minutos" },
    priceCents: 0,
    icon: Sparkles,
    tag: null,
    tagLabel: { pt: "", en: "", es: "" },
  },
  {
    id: "basic",
    name: "Basic",
    duration: { pt: "1 hora", en: "1 hour", es: "1 hora" },
    priceCents: 199,
    icon: Zap,
    tag: null,
    tagLabel: { pt: "", en: "", es: "" },
  },
  {
    id: "standard",
    name: "Standard",
    duration: { pt: "3 horas", en: "3 hours", es: "3 horas" },
    priceCents: 499,
    icon: Rocket,
    tag: null,
    tagLabel: { pt: "", en: "", es: "" },
  },
  {
    id: "pro",
    name: "Pro",
    duration: { pt: "12 horas", en: "12 hours", es: "12 horas" },
    priceCents: 1299,
    icon: Crown,
    tag: "popular",
    tagLabel: { pt: "Mais popular", en: "Most popular", es: "Más popular" },
  },
  {
    id: "infinity",
    name: "Infinity",
    duration: { pt: "7 dias", en: "7 days", es: "7 días" },
    priceCents: 2499,
    icon: InfinityIcon,
    tag: "best",
    tagLabel: { pt: "Melhor valor", en: "Best value", es: "Mejor valor" },
  },
]

/** Format cents into Brazilian Real, e.g. 1299 -> "R$ 12,99" */
export function formatBRL(cents: number): string {
  return `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`
}
