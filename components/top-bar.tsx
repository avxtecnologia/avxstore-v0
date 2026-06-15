"use client"

import { useTranslation } from "react-i18next"
import { Zap, Search, ShoppingCart } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"

export function TopBar() {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-bold text-lg shrink-0">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-indigo-600 shadow-lg shadow-primary/30">
            <Zap className="size-5 text-white" />
          </span>
          <span className="tracking-tight">
            AVX<span className="text-primary">Store</span>
          </span>
        </a>

        {/* Search */}
        <div className="relative mx-auto hidden w-full max-w-md md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder={t("topbar.searchPlaceholder")}
            aria-label={t("topbar.searchPlaceholder")}
            className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/50 focus:bg-white/10"
          />
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <LanguageSwitcher />

          <button
            type="button"
            aria-label="Cart"
            className="relative flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:bg-white/10"
          >
            <ShoppingCart className="size-4" />
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
              1
            </span>
          </button>

          <a
            href="#"
            className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white/10 sm:inline-block"
          >
            {t("topbar.panel")}
          </a>
        </div>
      </div>
    </header>
  )
}
