import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Cas Clients & Témoignages',
  description: 'Découvrez les résultats obtenus par nos clients : +600 entrepreneurs accompagnés, 30M€ générés.',
  alternates: { canonical: 'https://goldeor.com/cas-clients/' },
}

const stats = [
  { label: 'Années', value: '8+', icon: '🏆' },
  { label: 'Clients', value: '600+', icon: '👥' },
  { label: 'Générés', value: '30M€', icon: '📈' },
  { label: 'Pays', value: '67', icon: '🌍' },
]

export default async function CasClientsPage() {
  const temoignages = await prisma.temoignage.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
  })

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[68px]">
        <div
          className="relative mx-4 rounded-[20px] min-h-[85vh] flex flex-col justify-end overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0e0a14 0%, #1a1028 40%, #141430 70%, #0c0e1a 100%)',
          }}
        >
          <div
            className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(245,200,138,0.1), rgba(236,160,192,0.06), transparent 70%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(10,10,14,0.95) 0%, rgba(10,10,14,0.3) 60%, transparent 100%)',
            }}
          />

          <div className="relative z-10 px-10 pb-14 flex flex-col md:flex-row items-end justify-between gap-8">
            <div>
              <span className="text-gradient text-xs font-semibold uppercase tracking-[0.22em] mb-4 block">
                Cas Clients
              </span>
              <h1 className="text-silver text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                Ils nous font<br />confiance
              </h1>
            </div>
            <p className="text-sm max-w-[380px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Découvrez les témoignages de nos clients et les résultats concrets que nous avons obtenus ensemble.
            </p>
          </div>
          <div className="mx-10 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>
      </section>

      {/* Stats */}
      <section className="px-10 py-16 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(stat => (
            <div key={stat.label} className="glass-card p-6 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-extrabold text-silver">{stat.value}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-10 pb-20 max-w-[1200px] mx-auto">
        {temoignages.length === 0 ? (
          <div className="glass-card text-center py-24 px-8">
            <div className="text-5xl mb-6">💬</div>
            <h3 className="text-xl font-bold text-white mb-3">Nos premiers cas clients arrivent bientôt</h3>
            <p className="text-sm max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Nous travaillons à documenter nos plus belles réussites.
            </p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {temoignages.map(t => {
              if (t.type === 'VIDEO' && t.mediaUrl) {
                return (
                  <article key={t.id} className="glass-card overflow-hidden break-inside-avoid">
                    <div className="relative pb-[56.25%]">
                      <iframe
                        src={t.mediaUrl}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={t.displayName || 'Témoignage vidéo'}
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-xs mb-2" style={{ color: '#FFC24D' }}>
                        {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                      </div>
                      <p className="text-sm font-semibold text-white">
                        {t.isPrivate ? 'Compte privé' : (t.displayName || 'Client')}
                      </p>
                      {t.role && (
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          {t.role}{t.sector ? ` · ${t.sector}` : ''}
                        </p>
                      )}
                    </div>
                  </article>
                )
              }

              if (t.type === 'PHOTO' && t.mediaUrl) {
                return (
                  <article key={t.id} className="glass-card overflow-hidden break-inside-avoid relative group">
                    <div className="relative h-64">
                      <Image src={t.mediaUrl} alt={t.displayName || ''} fill className="object-cover" />
                      <div
                        className="absolute inset-0 flex flex-col justify-end p-5"
                        style={{ background: 'linear-gradient(to top, rgba(10,10,14,0.9), transparent 60%)' }}
                      >
                        {t.keyQuote && (
                          <p className="text-sm italic text-white mb-2">&ldquo;{t.keyQuote}&rdquo;</p>
                        )}
                        <p className="text-xs font-semibold text-white">
                          {t.isPrivate ? 'Compte privé' : (t.displayName || 'Client')}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              }

              // TEXT type
              return (
                <article key={t.id} className="glass-card p-6 break-inside-avoid">
                  <div className="text-xs mb-4" style={{ color: '#FFC24D' }}>
                    {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                  </div>
                  {t.keyQuote && (
                    <p className="text-base italic text-white mb-3 font-medium leading-relaxed">
                      &ldquo;{t.keyQuote}&rdquo;
                    </p>
                  )}
                  {t.content && (
                    <p className="text-sm mb-4 line-clamp-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {t.content}
                    </p>
                  )}
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
                    >
                      {t.isPrivate ? '?' : (t.displayName?.[0] || 'C')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {t.isPrivate ? 'Compte privé' : (t.displayName || 'Client')}
                      </p>
                      {(t.role || t.sector) && (
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          {[t.role, t.sector].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
