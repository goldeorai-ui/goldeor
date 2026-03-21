import Link from "next/link"

export default function HomePage() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-main)' }}
    >
      {/* Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196,168,232,0.12), rgba(160,184,240,0.06), transparent)',
        }}
      />

      <div className="relative z-10 text-center px-6 pt-20">
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider mb-6"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Agence Marketing Digital Premium
        </div>

        <h1 className="text-silver text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Goldeor
        </h1>

        <p className="text-lg max-w-xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.45)' }}>
          8 ans d&apos;expertise au service de votre croissance digitale. Acquisition, création, IA.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/blog" className="btn-gradient">
            Explorer le blog →
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-7 py-3 rounded-full text-sm font-semibold transition-colors"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  )
}
