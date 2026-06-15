"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Globe, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SupportedLang } from "@/lib/i18n"

const LANGS: { code: SupportedLang; name: string; short: string }[] = [
  { code: "pt", name: "Português", short: "PT" },
  { code: "en", name: "English", short: "EN" },
  { code: "es", name: "Español", short: "ES" },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LANGS.find((l) => l.code === i18n.language) ?? LANGS[0]

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  function selectLang(code: SupportedLang) {
    i18n.changeLanguage(code)
    if (typeof window !== "undefined") {
      window.localStorage.setItem("app_lang", code)
    }
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-white/10"
      >
        <Globe className="size-4 text-muted-foreground" />
        <span>{current.short}</span>
        <ChevronDown
          className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-card/95 p-1 shadow-xl backdrop-blur-xl"
        >
          {LANGS.map((lang) => {
            const active = lang.code === current.code
            return (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => selectLang(lang.code)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/5",
                    active ? "font-bold text-primary" : "text-foreground",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.name}</span>
                    <span className="text-xs text-muted-foreground">{lang.short}</span>
                  </span>
                  {active && <Check className="size-4 text-primary" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
