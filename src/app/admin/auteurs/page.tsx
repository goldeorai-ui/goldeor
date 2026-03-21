'use client'

import Link from 'next/link'

const mockAuteurs = [
  { id: '1', name: 'Boris Pedja', role: 'Fondateur & CEO', email: 'boris@goldeor.com', avatar: null, articles: 18 },
  { id: '2', name: 'Sarah Lemoine', role: 'Directrice Marketing', email: 'sarah@goldeor.com', avatar: null, articles: 6 },
]

export default function AuteursPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-silver">Auteurs</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-body)' }}>Gérez les auteurs du blog</p>
        </div>
        <Link href="/admin/auteurs/new" className="btn-gradient">+ Nouvel auteur</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAuteurs.map(a => (
          <div key={a.id} className="glass-card p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
                style={{ background: 'rgba(255,255,255,0.08)' }}>
                {a.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{a.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-body)' }}>{a.role}</p>
              </div>
            </div>
            <p className="text-xs mb-1" style={{ color: 'var(--text-faint)' }}>{a.email}</p>
            <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{a.articles} articles</p>
            <div className="flex gap-2 mt-4">
              <Link href={`/admin/auteurs/${a.id}`} className="text-xs px-4 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}>Éditer</Link>
              <button className="text-xs px-4 py-2 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
