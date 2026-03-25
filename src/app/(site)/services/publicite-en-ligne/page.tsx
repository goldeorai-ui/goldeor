import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publicité en Ligne | Goldeor",
  description:
    "Meta Ads, Google Ads, TikTok Ads. Stratégie d'enchères, création publicitaire, A/B testing et reporting ROI.",
};

export default function PubliciteEnLignePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 rounded-3xl mx-4 md:mx-8 bg-gradient-to-br from-purple-600 via-violet-400 to-yellow-500 opacity-20" />
        <div className="absolute inset-0 rounded-3xl mx-4 md:mx-8 bg-black/60" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Publicité en Ligne</span>
          </h1>
          <p className="text-silver text-lg md:text-xl max-w-2xl mx-auto">
            Meta Ads, Google Ads, TikTok Ads. Des campagnes publicitaires
            rentables qui génèrent un retour sur investissement mesurable.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Nos <span className="text-gradient">Compétences</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Stratégie d&apos;Enchères</h3>
              <p className="text-silver">
                Optimisation des enchères et du budget publicitaire pour
                maximiser votre portée tout en minimisant vos coûts.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Création Publicitaire</h3>
              <p className="text-silver">
                Visuels et copies percutants conçus pour arrêter le scroll
                et convertir votre audience cible.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">A/B Testing</h3>
              <p className="text-silver">
                Tests systématiques de vos créatifs, audiences et messages
                pour identifier les combinaisons gagnantes.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Reporting ROI</h3>
              <p className="text-silver">
                Tableaux de bord détaillés et rapports transparents pour
                suivre chaque euro investi et son retour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Notre <span className="text-gradient">Méthode</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">01</div>
              <h3 className="text-xl font-semibold mb-3">Audit &amp; Stratégie</h3>
              <p className="text-silver">
                Analyse de votre marché, définition des audiences cibles
                et élaboration d&apos;une stratégie publicitaire sur mesure.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">02</div>
              <h3 className="text-xl font-semibold mb-3">Création</h3>
              <p className="text-silver">
                Production de créatifs publicitaires adaptés à chaque
                plateforme : Meta, Google, TikTok et plus encore.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">03</div>
              <h3 className="text-xl font-semibold mb-3">Lancement &amp; Tests</h3>
              <p className="text-silver">
                Déploiement des campagnes avec un budget maîtrisé et tests
                A/B pour optimiser chaque variable.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">04</div>
              <h3 className="text-xl font-semibold mb-3">Scaling</h3>
              <p className="text-silver">
                Montée en puissance des campagnes performantes et
                réallocation du budget vers les meilleurs résultats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à <span className="text-gradient">booster vos ventes</span>&nbsp;?
          </h2>
          <p className="text-silver text-lg mb-10">
            Lancez des campagnes publicitaires rentables et mesurez
            chaque euro investi grâce à notre expertise.
          </p>
          <Link href="/contact" className="btn-gradient">
            Contactez-nous
          </Link>
        </div>
      </section>
    </main>
  );
}
