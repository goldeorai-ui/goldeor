'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function NewLivrePage() {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/livres-blancs" className="text-sm" style={{color:'var(--text-faint)'}}>← Retour</Link>
          <h1 className="text-xl font-bold text-silver">Nouveau livre blanc</h1>
        </div>
        <button className="btn-gradient text-sm">Publier</button>
      </div>
      <div className="max-w-2xl space-y-6">
        <div className="glass-card p-6 space-y-4">
          <input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="glass-input text-lg font-semibold" placeholder="Titre *" />
          <textarea value={summary} onChange={e=>setSummary(e.target.value)} rows={3} className="glass-input text-sm resize-none" placeholder="Résumé court" />
          <select value={category} onChange={e=>setCategory(e.target.value)} className="glass-input text-sm">
            <option value="">Catégorie</option>
            <option>Livre blanc</option><option>Guide</option><option>Étude de cas</option><option>Rapport</option><option>Checklist</option>
          </select>
        </div>
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{color:'var(--text-label)'}}>Fichier PDF</h3>
          <div className="border-2 border-dashed rounded-xl p-10 text-center" style={{borderColor:'var(--border)'}}>
            <p className="text-3xl mb-2">📄</p>
            <p className="text-sm" style={{color:'var(--text-faint)'}}>Glissez un PDF ici (max 20 Mo)</p>
          </div>
        </div>
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{color:'var(--text-label)'}}>Image de couverture</h3>
          <div className="border-2 border-dashed rounded-xl p-8 text-center" style={{borderColor:'var(--border)'}}>
            <p className="text-2xl mb-2">🖼️</p>
            <p className="text-xs" style={{color:'var(--text-faint)'}}>Glissez une image ici</p>
          </div>
        </div>
      </div>
    </div>
  )
}
