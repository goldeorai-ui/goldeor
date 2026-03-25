'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type LivreBlanc = {
  id: string
  title: string
  summary: string | null
  category: string | null
  coverImage: string | null
  downloads: number
  author: { name: string } | null
}

type PageData = {
  livresBlancs: LivreBlanc[]
  total: number
}

function DownloadModal({
  livre,
  onClose,
}: {
  livre: LivreBlanc
  onClose: () => void
}) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleDownload(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/download/${livre.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.url) {
        window.open(data.url, '_blank')
        setDone(true)
      }
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative glass-card p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
        >
          ✕
        </button>

        {done ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-lg font-bold text-white mb-2">Téléchargement lancé !</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Vérifiez votre navigateur pour le fichier PDF.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-white mb-2">{livre.title}</h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Entrez votre email pour télécharger cette ressource gratuitement.
            </p>
            <form onSubmit={handleDownload} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="glass-input"
              />
              <button type="submit" disabled={loading} className="btn-gradient w-full justify-center">
                {loading ? 'Téléchargement...' : 'Télécharger →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function NotifyForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/notify-me', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, type: 'livres-blancs' }),
    })
    setSent(true)
  }

  if (sent) {
    return (
      <p className="text-sm text-center" style={{ color: '#4ADE80' }}>
        ✓ Vous serez notifié(e) dès la publication !
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.com"
        className="glass-input flex-1"
      />
      <button type="submit" className="btn-gradient text-sm whitespace-nowrap">
        Me notifier →
      </button>
    </form>
  )
}

const categoryGradients: Record<string, string> = {
  'Livre blanc': 'linear-gradient(135deg, rgba(196,168,232,0.3), rgba(160,184,240,0.2))',
  'Guide': 'linear-gradient(135deg, rgba(245,200,138,0.3), rgba(236,160,192,0.2))',
  'Étude de cas': 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(160,184,240,0.15))',
  'Rapport': 'linear-gradient(135deg, rgba(160,184,240,0.3), rgba(196,168,232,0.2))',
  'Checklist': 'linear-gradient(135deg, rgba(236,160,192,0.3), rgba(245,200,138,0.2))',
}

export default function LivresBlancsPage() {
  const [data, setData] = useState<PageData | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [downloadModal, setDownloadModal] = useState<LivreBlanc | null>(null)

  useEffect(() => {
    fetch('/api/livres-blancs-data')
      .then(r => r.json())
      .then(setData)
      .catch(() => setData({ livresBlancs: [], total: 0 }))
  }, [])

  const filteredLivres = data?.livresBlancs.filter(
    lb => !selectedCategory || lb.category === selectedCategory
  ) || []

  const categories = Array.from(new Set(data?.livresBlancs.map(lb => lb.category).filter(Boolean) || [])) as string[]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[68px]">
        <div
          className="relative mx-4 rounded-[20px] min-h-[85vh] flex flex-col justify-end overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0c0e1a 0%, #121230 40%, #1a1040 70%, #0e0a20 100%)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.4 }}>
            <div className="absolute top-0 bottom-[25%] left-[33.33%] w-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="absolute top-0 bottom-[25%] left-[66.66%] w-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          <div
            className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(160,120,232,0.12), rgba(196,168,232,0.06), transparent 70%)',
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
                Ressources Premium
              </span>
              <h1 className="text-silver text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                Livres blancs &amp;<br />Guides experts
              </h1>
              <Link href="#resources" className="btn-gradient text-sm mt-2 inline-flex">
                Voir toutes les ressources →
              </Link>
            </div>
            <p className="text-sm max-w-[380px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Téléchargez nos guides, études de cas et rapports pour booster votre stratégie marketing digital.
            </p>
          </div>

          <div className="mx-10 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>
      </section>

      {/* Body */}
      <section id="resources" className="px-10 py-20 max-w-[1200px] mx-auto" style={{ background: 'var(--bg-main)' }}>
        {/* Badge count */}
        {data && (
          <div className="flex items-center gap-4 mb-8">
            <span
              className="px-4 py-2 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {data.total} ressource{data.total > 1 ? 's' : ''} disponible{data.total > 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Empty state */}
        {data && data.total === 0 && (
          <div className="glass-card text-center py-24 px-8">
            <div className="text-5xl mb-6">📖</div>
            <h3 className="text-xl font-bold text-white mb-3">Bientôt disponible</h3>
            <p className="text-sm max-w-md mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Nos premiers guides arrivent très prochainement.
            </p>
            <NotifyForm />
          </div>
        )}

        {/* Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: !selectedCategory ? 'var(--btn-gradient)' : 'rgba(255,255,255,0.04)',
                color: !selectedCategory ? '#0A0A0A' : 'rgba(255,255,255,0.5)',
                border: !selectedCategory ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              Tous
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: selectedCategory === cat ? 'var(--btn-gradient)' : 'rgba(255,255,255,0.04)',
                  color: selectedCategory === cat ? '#0A0A0A' : 'rgba(255,255,255,0.5)',
                  border: selectedCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {filteredLivres.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLivres.map(livre => (
              <article key={livre.id} className="glass-card overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1">
                <div className="relative h-48">
                  {livre.coverImage ? (
                    <Image src={livre.coverImage} alt={livre.title} fill className="object-cover" />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center text-4xl"
                      style={{
                        background: categoryGradients[livre.category || ''] || categoryGradients['Livre blanc'],
                      }}
                    >
                      📄
                    </div>
                  )}
                  {livre.category && (
                    <span
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-gradient"
                      style={{
                        background: 'rgba(10,10,14,0.7)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {livre.category}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{livre.title}</h3>
                  {livre.summary && (
                    <p className="text-sm mb-4 line-clamp-3 flex-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {livre.summary}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-2">
                      {livre.author && (
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {livre.author.name}
                        </span>
                      )}
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                        · {livre.downloads} téléchargements
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setDownloadModal(livre)}
                    className="btn-gradient text-sm w-full justify-center mt-4"
                  >
                    Télécharger →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {downloadModal && (
        <DownloadModal livre={downloadModal} onClose={() => setDownloadModal(null)} />
      )}
    </>
  )
}
