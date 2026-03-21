'use client'
import Link from 'next/link'

const mock = [
  { id: '1', title: 'Guide Meta Ads 2026', author: 'Boris Pedja', category: 'Guide', downloads: 847, status: 'PUBLISHED' },
  { id: '2', title: 'Étude de cas Goldeor x Owner', author: 'Boris Pedja', category: 'Étude de cas', downloads: 312, status: 'PUBLISHED' },
  { id: '3', title: 'Checklist SEO complète', author: 'Sarah Lemoine', category: 'Checklist', downloads: 81, status: 'DRAFT' },
]

export default function LivresPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-silver">Livres blancs</h1><p className="text-sm mt-1" style={{color:'var(--text-body)'}}>Gérez vos ressources téléchargeables</p></div>
        <Link href="/admin/livres-blancs/new" className="btn-gradient">+ Nouveau livre blanc</Link>
      </div>
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
            {['Titre','Auteur','Catégorie','Téléchargements','Statut','Actions'].map(h=><th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{color:'var(--text-label)'}}>{h}</th>)}
          </tr></thead>
          <tbody>{mock.map(l=>(
            <tr key={l.id} className="hover:bg-white/[0.03]" style={{borderBottom:'1px solid var(--border)'}}>
              <td className="px-5 py-4 text-sm font-medium">{l.title}</td>
              <td className="px-5 py-4 text-sm" style={{color:'var(--text-body)'}}>{l.author}</td>
              <td className="px-5 py-4 text-sm" style={{color:'var(--text-body)'}}>{l.category}</td>
              <td className="px-5 py-4 text-sm" style={{color:'var(--text-body)'}}>{l.downloads}</td>
              <td className="px-5 py-4"><span className={l.status==='PUBLISHED'?'badge-published':'badge-draft'}>{l.status==='PUBLISHED'?'Publié':'Brouillon'}</span></td>
              <td className="px-5 py-4"><div className="flex gap-2"><Link href={`/admin/livres-blancs/${l.id}`} className="text-xs px-3 py-1.5 rounded-lg" style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.6)'}}>✏️</Link><button className="text-xs px-3 py-1.5 rounded-lg" style={{background:'rgba(239,68,68,0.1)',color:'#ef4444'}}>🗑️</button></div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
