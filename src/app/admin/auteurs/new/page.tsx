'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NewAuteurPage() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [bioFR, setBioFR] = useState('')
  const [bioEN, setBioEN] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [twitter, setTwitter] = useState('')
  const [website, setWebsite] = useState('')

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/auteurs" className="text-sm" style={{ color: 'var(--text-faint)' }}>← Retour</Link>
          <h1 className="text-xl font-bold text-silver">Nouvel auteur</h1>
        </div>
        <button className="btn-gradient text-sm">Enregistrer</button>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-6 mb-2">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl border-2 border-dashed cursor-pointer"
              style={{ borderColor: 'var(--border)', background: 'rgba(255,255,255,0.03)' }}>📷</div>
            <div className="flex-1">
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="glass-input text-lg font-semibold mb-2" placeholder="Nom complet *" />
              <input type="text" value={role} onChange={e => setRole(e.target.value)} className="glass-input text-sm" placeholder="Poste / Rôle *" />
            </div>
          </div>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="glass-input text-sm" placeholder="Email" />
        </div>

        <div className="glass-card p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-label)' }}>Biographies</h3>
          <div>
            <label className="block text-xs mb-1.5" style={{ color: 'var(--text-faint)' }}>Biographie (FR)</label>
            <textarea value={bioFR} onChange={e => setBioFR(e.target.value)} rows={4} className="glass-input text-sm resize-none" />
          </div>
          <div>
            <label className="block text-xs mb-1.5" style={{ color: 'var(--text-faint)' }}>Biographie (EN)</label>
            <textarea value={bioEN} onChange={e => setBioEN(e.target.value)} rows={4} className="glass-input text-sm resize-none" />
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-label)' }}>Réseaux sociaux</h3>
          <input type="url" value={linkedin} onChange={e => setLinkedin(e.target.value)} className="glass-input text-sm" placeholder="LinkedIn URL" />
          <input type="url" value={twitter} onChange={e => setTwitter(e.target.value)} className="glass-input text-sm" placeholder="Twitter / X URL" />
          <input type="url" value={website} onChange={e => setWebsite(e.target.value)} className="glass-input text-sm" placeholder="Site web" />
        </div>
      </div>
    </div>
  )
}
