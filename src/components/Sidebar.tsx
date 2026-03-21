'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const sections: { label: string; links: { href: string; icon: string; label: string; external?: boolean }[] }[] = [
  {
    label: 'CONTENU',
    links: [
      { href: '/admin', icon: '📊', label: 'Dashboard' },
      { href: '/admin/articles', icon: '📝', label: 'Articles' },
      { href: '/admin/temoignages', icon: '💬', label: 'Témoignages' },
      { href: '/admin/auteurs', icon: '👤', label: 'Auteurs' },
      { href: '/admin/livres-blancs', icon: '📚', label: 'Livres blancs' },
    ],
  },
  {
    label: 'SITE',
    links: [
      { href: '/', icon: '🌐', label: 'Voir le site', external: true },
      { href: '/blog', icon: '📰', label: 'Voir le blog', external: true },
      { href: '/temoignages', icon: '⭐', label: 'Voir les témoignages', external: true },
    ],
  },
  {
    label: 'OUTILS',
    links: [
      { href: '/admin/assets', icon: '🖼️', label: 'Assets & Médias' },
      { href: '/admin/analytics', icon: '📈', label: 'Analytics' },
      { href: '/admin/integrations', icon: '🔌', label: 'Intégrations' },
      { href: '/admin/api-keys', icon: '🔑', label: 'Clés API' },
      { href: '/admin/team', icon: '👥', label: 'Équipe' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[240px] z-40 flex flex-col max-md:hidden"
      style={{
        background: 'rgba(10,10,14,0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      <div className="p-6 pb-4 flex items-center gap-3">
        <img src="/logo-goldeor-blanc.png" alt="Goldeor" className="h-8" />
        <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {sections.map((section) => (
          <div key={section.label} className="mb-5">
            <p className="px-4 mb-2 text-[0.65rem] font-semibold tracking-[0.18em] uppercase"
              style={{ color: 'rgba(255,255,255,0.3)' }}>
              {section.label}
            </p>
            {section.links.map((link) => {
              const isActive = link.href === '/admin'
                ? pathname === '/admin'
                : pathname?.startsWith(link.href) && link.href !== '/admin'

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <span className="text-base">{link.icon}</span>
                  <span>{link.label}</span>
                  {link.external && (
                    <span className="ml-auto text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>↗</span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: 'rgba(255,255,255,0.08)' }}>
            G
          </div>
          <div>
            <p className="text-xs font-medium">Admin Goldeor</p>
            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>admin@goldeor.com</p>
          </div>
        </div>
        <button className="w-full text-left text-xs py-2 px-3 rounded-lg transition-colors"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          Déconnexion
        </button>
      </div>
    </aside>
  )
}
