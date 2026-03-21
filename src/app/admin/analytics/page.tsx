'use client'
import { useState } from 'react'

const pixels = [
  { name: 'Meta Pixel', icon: '📘', field: 'Pixel ID', value: '' },
  { name: 'Google Analytics 4', icon: '📊', field: 'Measurement ID', value: '' },
  { name: 'Google Tag Manager', icon: '🏷️', field: 'GTM-XXXXX', value: '' },
  { name: 'TikTok Pixel', icon: '🎵', field: 'Pixel ID', value: '' },
  { name: 'LinkedIn Insight', icon: '💼', field: 'Partner ID', value: '' },
]

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30 jours')
  return (
    <div>
      <div className="mb-8"><h1 className="text-2xl font-bold text-silver">Analytics</h1><p className="text-sm mt-1" style={{color:'var(--text-body)'}}>Pixels de tracking & statistiques</p></div>
      <div className="mb-10">
        <h2 className="text-base font-semibold mb-4 text-silver">Pixels de tracking</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pixels.map(p=>(
            <div key={p.name} className="glass-card p-5">
              <div className="flex items-center gap-3 mb-4"><span className="text-xl">{p.icon}</span><h3 className="text-sm font-semibold">{p.name}</h3>
                <label className="ml-auto flex items-center"><input type="checkbox" className="accent-purple-400" /><span className="text-xs ml-2" style={{color:'var(--text-faint)'}}>Actif</span></label>
              </div>
              <input type="text" className="glass-input text-sm mb-3" placeholder={p.field} />
              <button className="text-xs px-4 py-2 rounded-lg w-full" style={{background:'rgba(255,255,255,0.06)',color:'var(--text-body)'}}>Sauvegarder</button>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-silver">Statistiques globales</h2>
          <div className="flex gap-1">{['Aujourd\'hui','7 jours','30 jours','3 mois','1 an'].map(p=>(
            <button key={p} onClick={()=>setPeriod(p)} className="px-3 py-1.5 text-xs rounded-full" style={{background:period===p?'rgba(255,255,255,0.1)':'transparent',color:period===p?'#fff':'rgba(255,255,255,0.4)'}}>{p}</button>
          ))}</div>
        </div>
        <div className="h-48 flex items-center justify-center rounded-lg" style={{background:'rgba(255,255,255,0.02)'}}>
          <p className="text-sm" style={{color:'var(--text-faint)'}}>Connectez un pixel pour voir les statistiques</p>
        </div>
      </div>
    </div>
  )
}
