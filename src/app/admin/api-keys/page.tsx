'use client'
import { useState } from 'react'

const mockKeys = [
  { id:'1', name:'Production API', key:'gld_sk_live_a8f2e...', created:'12 mars 2026', lastUsed:'19 mars 2026' },
  { id:'2', name:'Development', key:'gld_sk_test_b3c1d...', created:'5 janv 2026', lastUsed:'18 mars 2026' },
]

export default function ApiKeysPage() {
  const [revealed, setRevealed] = useState<string[]>([])
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-silver">Clés API</h1><p className="text-sm mt-1" style={{color:'var(--text-body)'}}>Gérez vos clés d'accès API</p></div>
        <button className="btn-gradient">+ Générer une clé</button>
      </div>
      <div className="glass-card overflow-hidden mb-8">
        <table className="w-full">
          <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
            {['Nom','Clé','Créée le','Dernière utilisation','Actions'].map(h=><th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{color:'var(--text-label)'}}>{h}</th>)}
          </tr></thead>
          <tbody>{mockKeys.map(k=>(
            <tr key={k.id} style={{borderBottom:'1px solid var(--border)'}}>
              <td className="px-5 py-4 text-sm font-medium">{k.name}</td>
              <td className="px-5 py-4 text-sm font-mono" style={{color:'var(--text-body)'}}>
                {revealed.includes(k.id) ? k.key : '••••••••••••••••'}
                <button onClick={()=>setRevealed(r=>r.includes(k.id)?r.filter(x=>x!==k.id):[...r,k.id])} className="ml-2 text-xs" style={{color:'var(--text-faint)'}}>
                  {revealed.includes(k.id)?'Masquer':'Révéler'}
                </button>
              </td>
              <td className="px-5 py-4 text-sm" style={{color:'var(--text-faint)'}}>{k.created}</td>
              <td className="px-5 py-4 text-sm" style={{color:'var(--text-faint)'}}>{k.lastUsed}</td>
              <td className="px-5 py-4"><button className="text-xs px-3 py-1.5 rounded-lg" style={{background:'rgba(239,68,68,0.1)',color:'#ef4444'}}>Révoquer</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-4 text-silver">Utilisation</h2>
        <pre className="text-xs p-4 rounded-lg overflow-x-auto" style={{background:'rgba(255,255,255,0.03)',color:'var(--text-body)'}}>{`fetch('https://goldeor.com/api/articles', {
  headers: { 'Authorization': 'Bearer gld_sk_live_...' }
})`}</pre>
      </div>
    </div>
  )
}
