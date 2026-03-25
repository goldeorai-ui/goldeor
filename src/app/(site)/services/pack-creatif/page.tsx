import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pack Créatif | Goldeor",
  description:
    "Identité visuelle et contenu graphique. Branding, design réseaux sociaux, motion design et direction artistique.",
};

export default function PackCreatifPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 rounded-3xl mx-4 md:mx-8 bg-gradient-to-br from-pink-500 via-purple-300 to-pink-300 opacity-20" />
        <div className="absolute inset-0 rounded-3xl mx-4 md:mx-8 bg-black/60" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Pack Créatif</span>
          </h1>
          <p className="text-silver text-lg md:text-xl max-w-2xl mx-auto">
            Identité visuelle et contenu graphique. Donnez vie à votre marque
            avec des créations qui marquent les esprits.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Nos <span className="text-gradient">Services Créatifs</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Branding</h3>
              <p className="text-silver">
                Création d&apos;identités visuelles complètes : logo, charte
                graphique, typographie et palette de couleurs.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Design Réseaux Sociaux</h3>
              <p className="text-silver">
                Templates et visuels percutants pour vos publications sur
                Instagram, LinkedIn, Facebook et TikTok.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Motion Design</h3>
              <p className="text-silver">
                Animations et vidéos dynamiques pour captiver votre audience
                et renforcer votre message de marque.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-4">Direction Artistique</h3>
              <p className="text-silver">
                Vision créative globale pour assurer la cohérence visuelle
                de l&apos;ensemble de vos supports de communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Notre <span className="text-gradient">Approche</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">01</div>
              <h3 className="text-xl font-semibold mb-3">Brief Créatif</h3>
              <p className="text-silver">
                Immersion dans votre univers de marque, compréhension de vos
                valeurs et de votre positionnement sur le marché.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">02</div>
              <h3 className="text-xl font-semibold mb-3">Création &amp; Itération</h3>
              <p className="text-silver">
                Propositions créatives, retours collaboratifs et ajustements
                jusqu&apos;à obtenir le résultat parfait.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-4">03</div>
              <h3 className="text-xl font-semibold mb-3">Livraison &amp; Déclinaison</h3>
              <p className="text-silver">
                Fichiers sources dans tous les formats nécessaires et
                déclinaisons pour chaque support de communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à <span className="text-gradient">sublimer votre image</span>&nbsp;?
          </h2>
          <p className="text-silver text-lg mb-10">
            Créons ensemble une identité visuelle unique qui fera briller
            votre marque sur tous les canaux.
          </p>
          <Link href="/contact" className="btn-gradient">
            Contactez-nous
          </Link>
        </div>
      </section>
    </main>
  );
}
