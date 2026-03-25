import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Notre Agence',
  description: '8 ans d\'expertise marketing digital. Découvrez l\'histoire, les valeurs et l\'équipe Goldeor.',
  alternates: { canonical: 'https://goldeor.com/agence/' },
}

const timeline = [
  { year: '2017', title: 'Création de Goldeor', desc: 'Fondation à Paris avec une vision : démocratiser le marketing digital dans le monde francophone.' },
  { year: '2018', title: 'Premiers 100 clients', desc: 'Développement de notre expertise en acquisition de leads et publicité en ligne.' },
  { year: '2019', title: 'Expansion internationale', desc: 'Ouverture aux marchés africains et moyen-orientaux. 20 pays couverts.' },
  { year: '2020', title: 'Pivot digital complet', desc: 'Accélération des services 100% en ligne. Webdesign et création de contenu.' },
  { year: '2021', title: '10M€ générés', desc: 'Cap symbolique franchi pour nos clients. Lancement du Pack Créatif.' },
  { year: '2022', title: '400+ clients actifs', desc: 'Structuration de l\'équipe et lancement des Challenges Marketing.' },
  { year: '2023', title: 'Intégration IA', desc: 'Premiers packs d\'automatisation IA pour nos clients. Gain de productivité x3.' },
  { year: '2024', title: '#1 sur Comeup.com', desc: 'Goldeor devient la référence marketing digital francophone. 30M€ générés au total.' },
  { year: '2025', title: '600+ clients, 67 pays', desc: 'Expansion continue et lancement de nouvelles offres premium.' },
]

const values = [
  { icon: '🎯', title: 'Excellence', desc: 'Chaque projet est traité avec la rigueur et l\'ambition d\'une campagne à 7 chiffres.' },
  { icon: '🤝', title: 'Transparence', desc: 'Reporting clair, communication honnête, résultats mesurables.' },
  { icon: '🚀', title: 'Innovation', desc: 'Toujours à l\'avant-garde des tendances, de l\'IA aux dernières plateformes.' },
  { icon: '🌍', title: 'Impact', desc: 'Aider les entrepreneurs francophones à réussir, partout dans le monde.' },
]

export default async function AgencePage() {
  const auteurs = await prisma.auteur.findMany({
    orderBy: { createdAt: 'asc' },
    include: { _count: { select: { articles: true } } },
  })

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[68px]">
        <div
          className="relative mx-4 rounded-[20px] min-h-[85vh] flex flex-col justify-end overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0e0c14 0%, #181428 40%, #1a1038 70%, #0c0a18 100%)',
          }}
        >
          <div
            className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(245,200,138,0.12), rgba(236,160,192,0.06), transparent 70%)',
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
                Notre Agence
              </span>
              <h1 className="text-silver text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                8 ans d&apos;excellence<br />digitale
              </h1>
              <Link href="/contact" className="btn-gradient text-sm mt-2 inline-flex">
                Travailler avec nous →
              </Link>
            </div>
            <p className="text-sm max-w-[380px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              De Paris au monde francophone, Goldeor accompagne entrepreneurs et entreprises dans leur transformation digitale.
            </p>
          </div>
          <div className="mx-10 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>
      </section>

      {/* Timeline */}
      <section className="px-10 py-20 max-w-[900px] mx-auto">
        <h2 className="text-2xl font-extrabold text-silver mb-12 text-center">Notre parcours</h2>
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          />
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Dot */}
                <div
                  className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-1.5 z-10"
                  style={{ background: 'var(--btn-gradient)' }}
                />
                {/* Content */}
                <div className={`glass-card p-5 ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? '' : 'md:mr-auto'}`}>
                  <span className="text-gradient text-xs font-bold">{item.year}</span>
                  <h3 className="text-sm font-bold text-white mt-1 mb-1">{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-10 py-16 max-w-[1200px] mx-auto">
        <h2 className="text-2xl font-extrabold text-silver mb-10 text-center">Nos valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(v => (
            <div key={v.title} className="glass-card p-6 text-center">
              <div className="text-3xl mb-4">{v.icon}</div>
              <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      {auteurs.length > 0 && (
        <section className="px-10 py-16 pb-24 max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-silver mb-10 text-center">L&apos;équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auteurs.map(auteur => (
              <div key={auteur.id} className="glass-card p-6 text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.1)' }}
                >
                  {auteur.avatar ? (
                    <Image src={auteur.avatar} alt={auteur.name} width={80} height={80} className="object-cover rounded-full" />
                  ) : (
                    <span className="text-2xl font-bold text-gradient">{auteur.name[0]}</span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white">{auteur.name}</h3>
                {auteur.role && (
                  <p className="text-xs mt-1 mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>{auteur.role}</p>
                )}
                {auteur.bioFR && (
                  <p className="text-xs leading-relaxed line-clamp-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {auteur.bioFR}
                  </p>
                )}
                <div className="flex justify-center gap-3 mt-4">
                  {auteur.linkedin && (
                    <a href={auteur.linkedin} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
                    >in</a>
                  )}
                  {auteur.twitter && (
                    <a href={auteur.twitter} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
                    >X</a>
                  )}
                </div>
                <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {auteur._count.articles} article{auteur._count.articles > 1 ? 's' : ''}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
