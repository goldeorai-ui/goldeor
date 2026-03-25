import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acquisition de Leads | Goldeor",
  description:
    "Génération de prospects qualifiés multi-canal. Tunnels de vente, landing pages, email marketing et retargeting.",
};

export default function AcquisitionLeadsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 rounded-3xl mx-4 md:mx-8 bg-gradient-to-br from-orange-600 via-pink-500 to-orange-400 opacity-20" />
        <div className="absolute inset-0 rounded-3xl mx-4 md:mx-8 bg-black/60" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Acquisition de Leads</span>
          </h1>
          <p className="text-silver text-lg md:text-xl max-w-2xl mx-auto">
            Génération de prospects qualifiés multi-canal. Attirez, convertissez
            et fidélisez vos clients grâce à des stratégies éprouvées.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Nos <span className="text-gradient">Solutions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Tunnels de Vente</h3>
              <p className="text-silver">
                Parcours d&apos;achat optimisés pour maximiser chaque étape de
                conversion, du premier clic à la vente finale.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Landing Pages</h3>
              <p className="text-silver">
                Pages d&apos;atterrissage à fort taux de conversion, conçues
                pour capturer l&apos;attention et générer des leads.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Email Marketing</h3>
              <p className="text-silver">
                Séquences d&apos;emails automatisées et personnalisées pour
                nourrir vos prospects et les transformer en clients.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Retargeting</h3>
              <p className="text-silver">
                Campagnes de reciblage intelligentes pour reconquérir les
                visiteurs et augmenter votre taux de conversion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Comment ça <span className="text-gradient">fonctionne</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">01</div>
              <h3 className="text-xl font-semibold mb-3">Audit &amp; Stratégie</h3>
              <p className="text-silver">
                Analyse approfondie de votre marché, de votre audience cible et
                définition d&apos;une stratégie d&apos;acquisition sur mesure.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">02</div>
              <h3 className="text-xl font-semibold mb-3">Mise en Place</h3>
              <p className="text-silver">
                Création des tunnels de vente, landing pages et séquences
                d&apos;emails. Configuration du tracking et des outils.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">03</div>
              <h3 className="text-xl font-semibold mb-3">Optimisation Continue</h3>
              <p className="text-silver">
                Tests A/B, analyse des données et optimisation permanente pour
                améliorer vos résultats et réduire votre coût par lead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à <span className="text-gradient">générer plus de leads</span>&nbsp;?
          </h2>
          <p className="text-silver text-lg mb-10">
            Discutons de votre projet et mettons en place une stratégie
            d&apos;acquisition performante.
          </p>
          <Link href="/contact" className="btn-gradient">
            Contactez-nous
          </Link>
        </div>
      </section>
    </main>
  );
}
