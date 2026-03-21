'use client'

import { useState } from 'react'
import Link from 'next/link'

const sectors = ['Entrepreneur','Business en ligne','Commerçant','Boutique e-commerce','Coach / Consultant','Grande entreprise','Autre']

export default function NewTemoignagePage() {
  const [type, setType] = useState<'TEXT'|'VIDEO'|'PHOTO'>('TEXT')
  const [isPrivate, setIsPrivate] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [sector, setSector] = useState('')
  const [keyQuote, setKeyQuote] = useState('')
  const [content, setContent] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [rating, setRating] = useState(5)
  const [isFeatured, setIsFeatured] = useState(false)
  const [status, setStatus] = useState('DRAFT')

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/temoignages" className="text-sm" style={{ color: 'var(--text-faint)' }}>← Retour</Link>
          <h1 className="text-xl font-bold text-silver">Nouveau témoignage</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 text-sm rounded-full" style={{ border: '1px solid var(--border)', color: 'var(--text-body)' }}>Enregistrer brouillon</button>
          <button className="btn-gradient text-sm">Publier</button>
        </div>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Type */}
        <div className="glass-card p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-label)' }}>Type de témoignage</h3>
          <div className="grid grid-cols-3 gap-3">
            {([['TEXT','💬','Texte'],['VIDEO','🎥','Vidéo'],['PHOTO','📷','Photo']] as const).map(([k,icon,label]) => (
              <button key={k} onClick={() => setType(k)}
                className="p-4 rounded-xl text-center transition-all"
                style={{
                  background: type === k ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                  border: '1px solid ' + (type === k ? 'rgba(255,255,255,0.15)' : 'var(--border)'),
                }}>
                <span className="text-2xl block mb-1">{icon}</span>
                <span className="text-xs" style={{ color: type === k ? '#fff' : 'var(--text-body)' }}>{label}</span>
              </button>
            ))}
          </div>
          {type === 'VIDEO' && (
            <div className="mt-4">
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-faint)' }}>URL YouTube / Vimeo</label>
              <input type="url" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} className="glass-input text-sm" placeholder="https://youtube.com/watch?v=..." />
            </div>
          )}
        </div>

        {/* Identity */}
        <div className="glass-card p-5 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-label)' }}>Identité</h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} className="accent-purple-400" />
              <span className="text-sm" style={{ color: 'var(--text-body)' }}>Compte privé</span>
            </label>
          </div>
          {!isPrivate && (
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="glass-input text-sm" placeholder="Prénom et nom" />
          )}
          <input type="text" value={role} onChange={e => setRole(e.target.value)} className="glass-input text-sm" placeholder="Poste / Rôle" />
          <select value={sector} onChange={e => setSector(e.target.value)} className="glass-input text-sm">
            <option value="">Secteur d'activité</option>
            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Content */}
        <div className="glass-card p-5 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-label)' }}>Contenu</h3>
          <input type="text" value={keyQuote} onChange={e => setKeyQuote(e.target.value)} className="glass-input text-sm" placeholder="Phrase clé mise en avant" />
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={5} className="glass-input text-sm resize-none" placeholder="Témoignage complet..." />
        </div>

        {/* Rating */}
        <div className="glass-card p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-label)' }}>Note</h3>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => setRating(n)} className="text-2xl transition-transform hover:scale-110"
                style={{ color: n <= rating ? '#FFC24D' : 'rgba(255,255,255,0.15)' }}>★</button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="glass-card p-5 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-label)' }}>Paramètres</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="accent-purple-400" />
            <span className="text-sm" style={{ color: 'var(--text-body)' }}>Mettre en avant (homepage)</span>
          </label>
          <div>
            <label className="block text-xs mb-1.5" style={{ color: 'var(--text-faint)' }}>Statut</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="glass-input text-sm">
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISHED">Publié</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
