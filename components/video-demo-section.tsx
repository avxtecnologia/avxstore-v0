export function VideoDemoSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm text-primary">
        Vídeo demonstrativo
      </span>
      <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
        Veja como funciona
      </h2>
      <p className="mt-3 text-muted-foreground">
        Assista ao tutorial completo de como usar a extensão.
      </p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-lg shadow-primary/10">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/r1sqEwuBeWc?start=47"
            title="Como usar a extensão"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
