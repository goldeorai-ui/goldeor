'use client'

import Link from 'next/link'
import { useState } from 'react'

const mockTemoignages = [
  { id: '1', name: 'Sophie Martin', type: 'TEXT', sector: 'E-commerce', rating: 5, status: 'PUBLISHED', quote: 'ROI multiplié par 4 en 3 mois' },
  { id: '2', name: 'Thomas Dupont', type: 'VIDEO', sector: 'Coach', rating: 5, status: 'PUBLISHED', quote: 'Une équipe exceptionnelle' },
  { id: '3', name: 'Compte privé', type: 'TEXT', sector: 'Entrepreneur', rating: 4, status: 'DRAFT', quote: 'Résultats au-delà de mes attentes' },
  { id: '4', name: 'Pierre Richard', type: 'PHOTO', sector: 'Grande entreprise', rating: 5, status: 'PUBLISHED', quote: 'Partenaire de confiance' },
  { id: '5', name: 'Julie Kaba', type: 'TEXT', sector: 'Boutique', rating: 5, status: 'PUBLISHED', quote: 'Leads doublés en 2 mois' },
]

export default function TemoignagesPage() {
  const [filter, setFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const filtered = mockTemoignages.filter(t => {
    if (filter === 'published' && t.status !== 'PUBLISHED') return false
    if (filter === 'draft' && t.status !== 'DRAFT') return false
    if (typeFilter !== 'all' && t.type !== typeFilter) return false
    return true
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-silver">Témoignages</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-body)' }}>Gérez les avis de vos clients</p>
        </div>
        <Link href="/admin/temoignages/new" className="btn-gradient">+ Nouveau témoignage</Link>
      </div>

      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex gap-1">
          {[['all','Tous'],['published','Publiés'],['draft','Brouillons']].map(([k,l]) => (
            <button key={k} onClick={() => setFilter(k)}
              className="px-4 py-2 text-xs rounded-full transition-all"
              style={{ background: filter === k ? 'rgba(255,255,255,0.1)' : 'transparent', color: filter === k ? '#fff' : 'rgba(255,255,255,0.4)', border: '1px solid '+(filter === k ? 'rgba(255,255,255,0.15)' : 'transparent') }}>
              {l}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {[['all','Tous types'],['TEXT','Texte'],['VIDEO','Vidéo'],['PHOTO','Photo']].map(([k,l]) => (
            <button key={k} onClick={() => setTypeFilter(k)}
              className="px-4 py-2 text-xs rounded-full transition-all"
              style={{ background: typeFilter === k ? 'rgba(255,255,255,0.1)' : 'transparent', color: typeFilter === k ? '#fff' : 'rgba(255,255,255,0.4)', border: '1px solid '+(typeFilter === k ? 'rgba(255,255,255,0.15)' : 'transparent') }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Nom','Type','Secteur','Note','Statut','Actions'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-label)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className="transition-colors hover:bg-white/[0.03]" style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs italic" style={{ color: 'var(--text-faint)' }}>"{t.quote}"</p>
                </td>
                <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-body)' }}>
                  {t.type === 'TEXT' ? '💬' : t.type === 'VIDEO' ? '🎥' : '📷'} {t.type === 'TEXT' ? 'Texte' : t.type === 'VIDEO' ? 'Vidéo' : 'Photo'}
                </td>
                <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-body)' }}>{t.sector}</td>
                <td className="px-5 py-4 text-sm" style={{ color: '#FFC24D' }}>{'★'.repeat(t.rating)}{'☆'.repeat(5-t.rating)}</td>
                <td className="px-5 py-4"><span className={t.status==='PUBLISHED'?'badge-published':'badge-draft'}>{t.status==='PUBLISHED'?'Publié':'Brouillon'}</span></td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/temoignages/${t.id}`} className="text-xs px-3 py-1.5 rounded-lg" style={{ background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.6)' }}>✏️</Link>
                    <button className="text-xs px-3 py-1.5 rounded-lg" style={{ background:'rgba(239,68,68,0.1)', color:'#ef4444' }}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
