import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/SiteNav"

export const metadata: Metadata = {
  title: {
    template: '%s | Goldeor',
    default: 'Goldeor — Agence Marketing Digital Premium',
  },
  description: 'Goldeor accompagne les entrepreneurs, startups et grandes entreprises dans leur développement digital.',
}

function SiteFooter() {
  return (
    <footer
      className="border-t px-10 py-12"
      style={{
        background: 'var(--bg-main)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <span className="text-lg font-extrabold text-white">Goldeor</span>
            <p className="text-sm mt-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
              L&apos;agence marketing digital de référence du monde francophone.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {['Blog', 'Cas Clients', 'Livres Blancs', 'Agence'].map(item => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['Acquisition Leads', 'Création Site Web', 'Pack Créatif', 'Automatisation IA'].map(item => (
                <li key={item}>
                  <Link
                    href={`/services/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>contact@goldeor.com</p>
            <div className="flex gap-3 mt-4">
              {['LinkedIn', 'Instagram', 'X'].map(social => (
                <span
                  key={social}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {social[0]}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} Goldeor. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Politique de confidentialité
            </Link>
            <Link href="/admin/login" className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen">{children}</main>
      <SiteFooter />
    </>
  )
}
