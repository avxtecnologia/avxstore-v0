// npm install qrcode.react
"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { useTranslation } from "react-i18next"
import { ArrowLeft, QrCode, Copy, Check, CheckCircle2 } from "lucide-react"
import { formatBRL, type Plan } from "@/lib/plans"
import type { SupportedLang } from "@/lib/i18n"

const PIX_KEY = "07553284424"
const MERCHANT_NAME = "AVXSTORE"
const MERCHANT_CITY = "JOAO PESSOA"

function crc16(str: string): number {
  let crc = 0xffff
  const bytes = new TextEncoder().encode(str)
  for (const byte of bytes) {
    crc ^= byte << 8
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1
      crc &= 0xffff
    }
  }
  return crc
}

function buildPixPayload(pixKey: string, merchantName: string, merchantCity: string, amount: number): string {
  const f = (id: string, value: string) => `${id}${String(value.length).padStart(2, "0")}${value}`

  const mai = f("00", "br.gov.bcb.pix") + f("01", pixKey)
  const adf = f("05", "***")

  const payload =
    f("00", "01") +
    f("26", mai) +
    f("52", "0000") +
    f("53", "986") +
    f("54", amount.toFixed(2)) +
    f("58", "BR") +
    f("59", merchantName.slice(0, 25)) +
    f("60", merchantCity.slice(0, 15)) +
    f("62", adf) +
    "6304"

  const checksum = crc16(payload).toString(16).toUpperCase().padStart(4, "0")
  return payload + checksum
}

export function CheckoutPage({ plan, onBack }: { plan: Plan; onBack: () => void }) {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language as SupportedLang) ?? "pt"
  const [copied, setCopied] = useState(false)

  const pixPayload = buildPixPayload(PIX_KEY, MERCHANT_NAME, MERCHANT_CITY, plan.priceCents / 100)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixPayload)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  const handlePaid = () => {
    const msg = encodeURIComponent(
      `Olá! Efetuei o pagamento do plano ${plan.name} (${plan.duration[lang]} de acesso) no valor de ${formatBRL(
        plan.priceCents,
      )}. Segue o comprovante em anexo.`,
    )
    window.open(`https://wa.me/5583999748931?text=${msg}`, "_blank")
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-5 sm:px-6">
          <button
            type="button"
            onClick={onBack}
            aria-label={t("checkout.back")}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{t("checkout.title")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("checkout.subtitlePlan")} {plan.name} · {plan.duration[lang]} {t("checkout.subtitleAccess")} ·{" "}
              {formatBRL(plan.priceCents)}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-card to-[#0d0d16] p-6 sm:p-8">
          <div className="flex items-center justify-center gap-2 text-lg font-bold">
            <QrCode className="size-5 text-primary" />
            <h2>{t("checkout.payWithPix")}</h2>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="rounded-2xl bg-white p-5">
              <QRCodeSVG value={pixPayload} size={220} fgColor="#000000" bgColor="#ffffff" level="M" />
            </div>
          </div>

          <p className="mt-6 text-sm font-medium text-muted-foreground">{t("checkout.pixKeyLabel")}</p>
          <div className="mt-2 flex items-stretch gap-2">
            <code className="flex min-w-0 flex-1 items-center overflow-x-auto rounded-xl border border-white/10 bg-secondary px-4 py-3 font-mono text-xs">
              {pixPayload}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? t("checkout.copied") : t("checkout.copy")}
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-secondary/50 px-4 py-4">
            <span className="text-sm text-muted-foreground">{t("checkout.amountLabel")}</span>
            <div className="text-3xl font-bold tracking-tight">{formatBRL(plan.priceCents)}</div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t("checkout.instruction")}</p>

          <button
            type="button"
            onClick={handlePaid}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-opacity hover:opacity-90"
          >
            <CheckCircle2 className="size-5" />
            {t("checkout.paidButton")}
          </button>

          <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">{t("checkout.afterNote")}</p>
        </div>
      </main>
    </div>
  )
}
