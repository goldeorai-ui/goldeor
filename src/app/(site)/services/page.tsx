import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nos Services',
  description: 'Découvrez tous les services Goldeor : acquisition de leads, création web, pack créatif, automatisation IA, challenges marketing et publicité en ligne.',
  alternates: { canonical: 'https://goldeor.com/services/' },
}

const services = [
  {
    slug: 'acquisition-leads',
    icon: '🎯',
    title: 'Acquisition de Leads',
    desc: 'Générez un flux constant de prospects qualifiés grâce à nos stratégies multi-canal éprouvées.',
    gradient: 'linear-gradient(135deg, rgba(245,200,138,0.15), rgba(236,160,192,0.1))',
  },
  {
    slug: 'creation-site-web',
    icon: '🌐',
    title: 'Création Site Web',
    desc: 'Sites vitrines, e-commerce et landing pages haute conversion, conçus pour performer.',
    gradient: 'linear-gradient(135deg, rgba(160,184,240,0.15), rgba(196,168,232,0.1))',
  },
  {
    slug: 'pack-creatif',
    icon: '🎨',
    title: 'Pack Créatif',
    desc: 'Identité visuelle, design réseaux sociaux et contenu graphique premium pour votre marque.',
    gradient: 'linear-gradient(135deg, rgba(236,160,192,0.15), rgba(196,168,232,0.1))',
  },
  {
    slug: 'automatisation-ia',
    icon: '🤖',
    title: 'Automatisation IA',
    desc: 'Chatbots, workflows automatisés et outils IA sur mesure pour scaler votre activité.',
    gradient: 'linear-gradient(135deg, rgba(74,222,128,0.1), rgba(160,184,240,0.1))',
  },
  {
    slug: 'challenges-marketing',
    icon: '🏆',
    title: 'Challenges Marketing',
    desc: 'Lancez des défis engageants pour fédérer votre audience et booster vos conversions.',
    gradient: 'linear-gradient(135deg, rgba(245,200,138,0.15), rgba(74,222,128,0.08))',
  },
  {
    slug: 'publicite-en-ligne',
    icon: '📢',
    title: 'Publicité en Ligne',
    desc: 'Meta Ads, Google Ads, TikTok Ads — campagnes ROI-first gérées par des experts.',
    gradient: 'linear-gradient(135deg, rgba(196,168,232,0.15), rgba(245,200,138,0.1))',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[68px]">
        <div
          className="relative mx-4 rounded-[20px] min-h-[85vh] flex flex-col justify-end overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0c0e1a 0%, #141428 40%, #181038 70%, #0e0a1a 100%)',
          }}
        >
          <div
            className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(196,168,232,0.12), rgba(245,200,138,0.06), transparent 70%)',
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
                Services
              </span>
              <h1 className="text-silver text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                Solutions sur mesure<br />pour votre croissance
              </h1>
              <Link href="/contact" className="btn-gradient text-sm mt-2 inline-flex">
                Demander un devis →
              </Link>
            </div>
            <p className="text-sm max-w-[380px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              6 pôles d&apos;expertise complémentaires pour couvrir l&apos;ensemble de vos besoins marketing digital.
            </p>
          </div>
          <div className="mx-10 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>
      </section>

      {/* Services grid */}
      <section className="px-10 py-20 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group">
              <article className="glass-card p-8 h-full flex flex-col transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[rgba(255,255,255,0.12)]">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: service.gradient }}
                >
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {service.desc}
                </p>
                <span className="text-gradient text-sm font-semibold inline-flex items-center gap-1">
                  En savoir plus →
                </span>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-10 pb-20 max-w-[800px] mx-auto">
        <div
          className="glass-card p-12 text-center"
          style={{ border: '1px solid rgba(236,160,192,0.15)' }}
        >
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-2xl font-extrabold text-white mb-3">
            Prêt à accélérer ?
          </h2>
          <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Rejoignez les 600+ entrepreneurs qui ont fait confiance à Goldeor pour transformer leur présence digitale.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="btn-gradient">
              Démarrer un projet →
            </Link>
            <Link
              href="/cas-clients"
              className="inline-flex items-center px-7 py-3 rounded-full text-sm font-semibold transition-colors"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              Voir nos résultats
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
