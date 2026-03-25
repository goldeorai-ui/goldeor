import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automatisation IA | Goldeor",
  description:
    "Chatbots, workflows et outils IA sur mesure. Analyse prédictive et intégrations API pour automatiser votre business.",
};

export default function AutomatisationIAPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 rounded-3xl mx-4 md:mx-8 bg-gradient-to-br from-green-500 via-teal-400 to-blue-500 opacity-20" />
        <div className="absolute inset-0 rounded-3xl mx-4 md:mx-8 bg-black/60" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Automatisation IA</span>
          </h1>
          <p className="text-silver text-lg md:text-xl max-w-2xl mx-auto">
            Chatbots, workflows et outils IA sur mesure. Libérez le potentiel
            de l&apos;intelligence artificielle pour transformer votre entreprise.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Nos <span className="text-gradient">Technologies</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Chatbots IA</h3>
              <p className="text-silver">
                Assistants virtuels intelligents disponibles 24/7 pour
                répondre à vos clients et qualifier vos prospects.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Workflows Automatisés</h3>
              <p className="text-silver">
                Automatisation de vos processus métier pour gagner du temps
                et éliminer les tâches répétitives.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Analyse Prédictive</h3>
              <p className="text-silver">
                Exploitez vos données pour anticiper les tendances et prendre
                des décisions éclairées grâce au machine learning.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Intégrations API</h3>
              <p className="text-silver">
                Connectez vos outils existants et créez un écosystème digital
                fluide et interconnecté.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Notre <span className="text-gradient">Méthodologie</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">01</div>
              <h3 className="text-xl font-semibold mb-3">Diagnostic</h3>
              <p className="text-silver">
                Cartographie de vos processus actuels et identification des
                opportunités d&apos;automatisation à fort impact.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">02</div>
              <h3 className="text-xl font-semibold mb-3">Conception</h3>
              <p className="text-silver">
                Architecture des solutions IA et design des workflows
                automatisés adaptés à vos besoins.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">03</div>
              <h3 className="text-xl font-semibold mb-3">Développement</h3>
              <p className="text-silver">
                Implémentation des chatbots, intégrations API et workflows
                avec des tests rigoureux à chaque étape.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">04</div>
              <h3 className="text-xl font-semibold mb-3">Évolution</h3>
              <p className="text-silver">
                Monitoring, entraînement continu des modèles IA et
                amélioration des performances au fil du temps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à <span className="text-gradient">automatiser votre business</span>&nbsp;?
          </h2>
          <p className="text-silver text-lg mb-10">
            Découvrez comment l&apos;intelligence artificielle peut
            révolutionner vos opérations et booster votre productivité.
          </p>
          <Link href="/contact" className="btn-gradient">
            Contactez-nous
          </Link>
        </div>
      </section>
    </main>
  );
}
