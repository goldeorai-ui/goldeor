'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const services = [
  { slug: 'acquisition-leads', label: 'Acquisition de Leads', icon: '🎯' },
  { slug: 'creation-site-web', label: 'Création Site Web', icon: '🌐' },
  { slug: 'pack-creatif', label: 'Pack Créatif', icon: '🎨' },
  { slug: 'automatisation-ia', label: 'Automatisation IA', icon: '🤖' },
  { slug: 'challenges-marketing', label: 'Challenges Marketing', icon: '🏆' },
  { slug: 'publicite-en-ligne', label: 'Publicité en Ligne', icon: '📢' },
]

const navLinks = [
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Cas Clients', href: '/cas-clients' },
  { label: 'Blog', href: '/blog' },
  { label: 'Livres Blancs', href: '/livres-blancs' },
  { label: 'Agence', href: '/agence' },
]

export function SiteNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close dropdown on route change
  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(false)
  }, [pathname])

  // Close dropdown on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setServicesOpen(true)
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 200)
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-[68px]"
        style={{
          background: 'rgba(10,10,14,0.45)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-xl font-extrabold text-white tracking-tight">Goldeor</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className="relative"
              ref={link.hasDropdown ? dropdownRef : undefined}
              onMouseEnter={link.hasDropdown ? handleMouseEnter : undefined}
              onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
            >
              <Link
                href={link.href}
                className="text-[14px] font-medium transition-all duration-300 flex items-center gap-1"
                style={{
                  color: isActive(link.href) ? '#fff' : 'rgba(255,255,255,0.7)',
                }}
              >
                {link.label}
                {link.hasDropdown && (
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    className="transition-transform duration-300 ml-0.5"
                    style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>

              {/* Services dropdown */}
              {link.hasDropdown && (
                <div
                  className="absolute top-full left-1/2 pt-3 transition-all duration-300"
                  style={{
                    transform: `translateX(-50%) ${servicesOpen ? 'translateY(0)' : 'translateY(-8px)'}`,
                    opacity: servicesOpen ? 1 : 0,
                    pointerEvents: servicesOpen ? 'auto' : 'none',
                  }}
                >
                  <div
                    className="rounded-2xl p-2 min-w-[320px]"
                    style={{
                      background: 'rgba(14,14,18,0.95)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                    }}
                  >
                    {/* Header */}
                    <Link
                      href="/services"
                      className="flex items-center justify-between px-4 py-3 rounded-xl mb-1 transition-colors"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider">Tous les services</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>

                    <div
                      className="h-px mx-3 mb-1"
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                    />

                    {/* Services list */}
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
                        style={{
                          background: isActive(`/services/${s.slug}`) ? 'rgba(255,255,255,0.06)' : 'transparent',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive(`/services/${s.slug}`)) {
                            (e.currentTarget as HTMLElement).style.background = 'transparent'
                          }
                        }}
                      >
                        <span
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.06)',
                          }}
                        >
                          {s.icon}
                        </span>
                        <span className="text-[13px] font-medium text-white">{s.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/contact" className="btn-gradient text-sm">
            Nous contacter
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex lg:hidden flex-col justify-center items-center gap-[5px] w-8 h-8"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span
            className="block w-[22px] h-[2px] bg-white rounded-sm transition-all duration-300"
            style={{
              transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-[22px] h-[2px] bg-white rounded-sm transition-all duration-300"
            style={{ opacity: mobileOpen ? 0 : 1 }}
          />
          <span
            className="block w-[22px] h-[2px] bg-white rounded-sm transition-all duration-300"
            style={{
              transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-all duration-400"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className="absolute top-[68px] left-0 right-0 max-h-[calc(100vh-68px)] overflow-y-auto px-6 py-5 transition-transform duration-300"
          style={{
            background: 'rgba(10,10,14,0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            transform: mobileOpen ? 'translateY(0)' : 'translateY(-20px)',
          }}
        >
          <div>
            {navLinks.map((link, i) => (
              <div key={link.href}>
                {link.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center justify-between w-full py-4 text-[15px] font-medium transition-colors text-left"
                      style={{
                        color: isActive(link.href) ? '#fff' : 'rgba(255,255,255,0.7)',
                      }}
                    >
                      {link.label}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 8 8"
                        fill="none"
                        className="transition-transform duration-300"
                        style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Mobile services sub-items — accordion */}
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight: mobileServicesOpen ? '500px' : '0',
                        opacity: mobileServicesOpen ? 1 : 0,
                      }}
                    >
                      <div className="pb-2">
                        <Link
                          href="/services"
                          className="flex items-center gap-3 py-2.5 text-xs font-semibold uppercase tracking-wider"
                          style={{ color: 'rgba(255,255,255,0.35)', paddingLeft: '12px' }}
                        >
                          Tous les services →
                        </Link>
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="flex items-center gap-3 py-2.5 transition-colors"
                            style={{
                              color: isActive(`/services/${s.slug}`) ? '#fff' : 'rgba(255,255,255,0.55)',
                              paddingLeft: '12px',
                            }}
                          >
                            <span className="text-base">{s.icon}</span>
                            <span className="text-[13px] font-medium">{s.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block py-4 text-[15px] font-medium transition-colors text-left"
                    style={{
                      color: isActive(link.href) ? '#fff' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Separator line between each section */}
                {i < navLinks.length - 1 && (
                  <div
                    className="h-px"
                    style={{ background: 'linear-gradient(90deg, rgba(192,192,192,0.12), rgba(192,192,192,0.06), transparent)' }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Separator before CTA */}
          <div
            className="h-px mt-4 mb-5"
            style={{ background: 'linear-gradient(90deg, rgba(192,192,192,0.12), rgba(192,192,192,0.06), transparent)' }}
          />

          {/* Mobile CTA — 85% width, left-aligned */}
          <Link
            href="/contact"
            className="btn-gradient text-sm justify-center"
            style={{ width: '85%', display: 'flex' }}
            onClick={() => setMobileOpen(false)}
          >
            Nous contacter →
          </Link>
        </div>
      </div>
    </>
  )
}
