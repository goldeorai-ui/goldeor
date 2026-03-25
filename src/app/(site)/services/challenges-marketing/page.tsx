import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Challenges Marketing | Goldeor",
  description:
    "Défis engageants pour booster vos conversions. Gamification, community management et analytics.",
};

export default function ChallengesMarketingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 rounded-3xl mx-4 md:mx-8 bg-gradient-to-br from-yellow-500 via-amber-400 to-green-500 opacity-20" />
        <div className="absolute inset-0 rounded-3xl mx-4 md:mx-8 bg-black/60" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Challenges Marketing</span>
          </h1>
          <p className="text-silver text-lg md:text-xl max-w-2xl mx-auto">
            Défis engageants pour booster vos conversions. Créez une dynamique
            communautaire puissante autour de votre marque.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Nos <span className="text-gradient">Leviers</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Conception de Challenges</h3>
              <p className="text-silver">
                Création de défis sur mesure qui engagent votre audience et
                stimulent la participation active de votre communauté.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Gamification</h3>
              <p className="text-silver">
                Mécaniques de jeu et systèmes de récompenses pour maximiser
                l&apos;engagement et la rétention de vos participants.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Community Management</h3>
              <p className="text-silver">
                Animation et modération de votre communauté pour maintenir
                un niveau d&apos;énergie et d&apos;interaction optimal.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Analytics</h3>
              <p className="text-silver">
                Suivi en temps réel des performances, taux de participation
                et impact sur vos objectifs de conversion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Comment ça <span className="text-gradient">marche</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">01</div>
              <h3 className="text-xl font-semibold mb-3">Stratégie &amp; Conception</h3>
              <p className="text-silver">
                Définition des objectifs, création du concept de challenge
                et planification du calendrier de lancement.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">02</div>
              <h3 className="text-xl font-semibold mb-3">Lancement &amp; Animation</h3>
              <p className="text-silver">
                Déploiement du challenge, animation quotidienne de la
                communauté et gestion des interactions en temps réel.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">03</div>
              <h3 className="text-xl font-semibold mb-3">Bilan &amp; Conversion</h3>
              <p className="text-silver">
                Analyse des résultats, identification des leads qualifiés
                et mise en place des séquences de conversion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à <span className="text-gradient">engager votre audience</span>&nbsp;?
          </h2>
          <p className="text-silver text-lg mb-10">
            Lancez un challenge marketing qui transformera vos prospects
            en clients fidèles et ambassadeurs de votre marque.
          </p>
          <Link href="/contact" className="btn-gradient">
            Contactez-nous
          </Link>
        </div>
      </section>
    </main>
  );
}
