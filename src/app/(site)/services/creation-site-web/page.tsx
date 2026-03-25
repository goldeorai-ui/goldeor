import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Création de Site Web | Goldeor",
  description:
    "Sites vitrines, e-commerce et landing pages. Design UI/UX, développement sur mesure, optimisation SEO et performance.",
};

export default function CreationSiteWebPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 rounded-3xl mx-4 md:mx-8 bg-gradient-to-br from-blue-600 via-purple-500 to-blue-400 opacity-20" />
        <div className="absolute inset-0 rounded-3xl mx-4 md:mx-8 bg-black/60" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Création de Site Web</span>
          </h1>
          <p className="text-silver text-lg md:text-xl max-w-2xl mx-auto">
            Sites vitrines, e-commerce et landing pages. Des expériences
            digitales modernes qui convertissent vos visiteurs en clients.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Nos <span className="text-gradient">Expertises</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Design UI/UX</h3>
              <p className="text-silver">
                Interfaces élégantes et intuitives, pensées pour offrir une
                expérience utilisateur fluide et engageante.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Développement sur Mesure</h3>
              <p className="text-silver">
                Solutions techniques adaptées à vos besoins avec les
                technologies les plus performantes du marché.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Optimisation SEO</h3>
              <p className="text-silver">
                Structure et contenu optimisés pour les moteurs de recherche
                afin d&apos;assurer votre visibilité en ligne.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Performance</h3>
              <p className="text-silver">
                Sites ultra-rapides avec des scores Lighthouse optimaux pour
                une expérience sans friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Notre <span className="text-gradient">Processus</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">01</div>
              <h3 className="text-xl font-semibold mb-3">Découverte</h3>
              <p className="text-silver">
                Compréhension de vos objectifs, de votre marque et analyse de
                votre marché pour définir la meilleure approche.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">02</div>
              <h3 className="text-xl font-semibold mb-3">Maquettage</h3>
              <p className="text-silver">
                Création de maquettes interactives pour valider le design et
                l&apos;ergonomie avant le développement.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">03</div>
              <h3 className="text-xl font-semibold mb-3">Développement</h3>
              <p className="text-silver">
                Intégration pixel-perfect et développement avec les meilleures
                pratiques pour un code propre et maintenable.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">04</div>
              <h3 className="text-xl font-semibold mb-3">Lancement</h3>
              <p className="text-silver">
                Tests rigoureux, mise en production et accompagnement
                post-lancement pour garantir votre succès.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à <span className="text-gradient">lancer votre site</span>&nbsp;?
          </h2>
          <p className="text-silver text-lg mb-10">
            Transformons votre vision en un site web performant et
            esthétique qui reflète votre marque.
          </p>
          <Link href="/contact" className="btn-gradient">
            Contactez-nous
          </Link>
        </div>
      </section>
    </main>
  );
}
