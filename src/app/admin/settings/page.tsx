'use client'
import { useState } from 'react'

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('Goldeor')
  const [siteUrl, setSiteUrl] = useState('https://goldeor.com')
  const [contactEmail, setContactEmail] = useState('contact@goldeor.com')
  const [metaTitle, setMetaTitle] = useState('Goldeor — Agence Marketing Digital Premium')
  const [metaDesc, setMetaDesc] = useState('')
  const [cookieActive, setCookieActive] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-silver">Paramètres</h1><p className="text-sm mt-1" style={{color:'var(--text-body)'}}>Configuration générale du site</p></div>
        <button className="btn-gradient text-sm">Sauvegarder</button>
      </div>
      <div className="max-w-2xl space-y-6">
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{color:'var(--text-label)'}}>Général</h3>
          <div><label className="block text-xs mb-1.5" style={{color:'var(--text-faint)'}}>Nom du site</label><input type="text" value={siteName} onChange={e=>setSiteName(e.target.value)} className="glass-input text-sm" /></div>
          <div><label className="block text-xs mb-1.5" style={{color:'var(--text-faint)'}}>URL du site</label><input type="url" value={siteUrl} onChange={e=>setSiteUrl(e.target.value)} className="glass-input text-sm" /></div>
          <div><label className="block text-xs mb-1.5" style={{color:'var(--text-faint)'}}>Email de contact</label><input type="email" value={contactEmail} onChange={e=>setContactEmail(e.target.value)} className="glass-input text-sm" /></div>
        </div>
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{color:'var(--text-label)'}}>Logo & Favicon</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-dashed rounded-xl p-6 text-center" style={{borderColor:'var(--border)'}}><p className="text-xl mb-1">🏷️</p><p className="text-xs" style={{color:'var(--text-faint)'}}>Logo</p></div>
            <div className="border-2 border-dashed rounded-xl p-6 text-center" style={{borderColor:'var(--border)'}}><p className="text-xl mb-1">⭐</p><p className="text-xs" style={{color:'var(--text-faint)'}}>Favicon</p></div>
          </div>
        </div>
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{color:'var(--text-label)'}}>Réseaux sociaux</h3>
          <input type="url" className="glass-input text-sm" placeholder="LinkedIn URL" />
          <input type="url" className="glass-input text-sm" placeholder="Instagram URL" />
          <input type="url" className="glass-input text-sm" placeholder="YouTube URL" />
          <input type="url" className="glass-input text-sm" placeholder="Twitter / X URL" />
        </div>
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{color:'var(--text-label)'}}>SEO par défaut</h3>
          <div><label className="block text-xs mb-1.5" style={{color:'var(--text-faint)'}}>Meta title template</label><input type="text" value={metaTitle} onChange={e=>setMetaTitle(e.target.value)} className="glass-input text-sm" /></div>
          <div><label className="block text-xs mb-1.5" style={{color:'var(--text-faint)'}}>Meta description par défaut</label><textarea value={metaDesc} onChange={e=>setMetaDesc(e.target.value)} rows={3} className="glass-input text-sm resize-none" /></div>
        </div>
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{color:'var(--text-label)'}}>RGPD</h3>
          <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={cookieActive} onChange={e=>setCookieActive(e.target.checked)} className="accent-purple-400" /><span className="text-sm" style={{color:'var(--text-body)'}}>Bannière cookies active</span></label>
        </div>
      </div>
    </div>
  )
}
