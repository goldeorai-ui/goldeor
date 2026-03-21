'use client'

import Link from 'next/link'
import { useState } from 'react'

const mockArticles = [
  { id: '1', title: 'Comment générer des leads avec l\'IA en 2026', author: 'Boris Pedja', category: 'Marketing IA', status: 'PUBLISHED', date: '18 mars 2026', cover: null },
  { id: '2', title: '10 stratégies Meta Ads pour e-commerce', author: 'Boris Pedja', category: 'Publicité', status: 'PUBLISHED', date: '15 mars 2026', cover: null },
  { id: '3', title: 'Guide complet du SEO local', author: 'Boris Pedja', category: 'SEO', status: 'DRAFT', date: '14 mars 2026', cover: null },
  { id: '4', title: 'Automatiser son marketing avec Make', author: 'Boris Pedja', category: 'Automatisation', status: 'PUBLISHED', date: '12 mars 2026', cover: null },
  { id: '5', title: 'Les tendances marketing digital 2026', author: 'Boris Pedja', category: 'Tendances', status: 'DRAFT', date: '10 mars 2026', cover: null },
]

export default function ArticlesPage() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = mockArticles.filter(a => {
    if (filter === 'published' && a.status !== 'PUBLISHED') return false
    if (filter === 'draft' && a.status !== 'DRAFT') return false
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-silver">Articles</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-body)' }}>Gérez vos articles de blog</p>
        </div>
        <Link href="/admin/articles/new" className="btn-gradient">
          + Nouvel article
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex gap-1">
          {[['all', 'Tous'], ['published', 'Publiés'], ['draft', 'Brouillons']].map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)}
              className="px-4 py-2 text-xs rounded-full transition-all"
              style={{
                background: filter === key ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: filter === key ? '#fff' : 'rgba(255,255,255,0.4)',
                border: '1px solid ' + (filter === key ? 'rgba(255,255,255,0.15)' : 'transparent'),
              }}>
              {label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="glass-input max-w-xs text-sm"
        />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Titre', 'Auteur', 'Catégorie', 'Statut', 'Date', 'Actions'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-label)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(article => (
              <tr key={article.id} className="transition-colors hover:bg-white/[0.03]"
                style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium">{article.title}</p>
                </td>
                <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-body)' }}>{article.author}</td>
                <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-body)' }}>{article.category}</td>
                <td className="px-5 py-4">
                  <span className={article.status === 'PUBLISHED' ? 'badge-published' : 'badge-draft'}>
                    {article.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-faint)' }}>{article.date}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/articles/${article.id}`}
                      className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}>
                      ✏️ Éditer
                    </Link>
                    <button className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                      style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                      🗑️
                    </button>
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
