'use client'
import { useState } from 'react'

const mockTeam = [
  { id:'1', name:'Boris Pedja', email:'boris@goldeor.com', role:'ADMIN', status:'ACTIVE' },
  { id:'2', name:'Sarah Lemoine', email:'sarah@goldeor.com', role:'EDITOR', status:'ACTIVE' },
  { id:'3', name:null, email:'julie@externe.com', role:'READER', status:'PENDING' },
]

export default function TeamPage() {
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('READER')

  return (
    <div>
      <div className="mb-8"><h1 className="text-2xl font-bold text-silver">Équipe</h1><p className="text-sm mt-1" style={{color:'var(--text-body)'}}>Gérez les accès à l'administration</p></div>
      <div className="glass-card p-5 mb-8">
        <h3 className="text-sm font-semibold mb-4">Inviter un membre</h3>
        <div className="flex gap-3 flex-wrap">
          <input type="email" value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)} className="glass-input text-sm flex-1 min-w-[200px]" placeholder="Email" />
          <select value={inviteRole} onChange={e=>setInviteRole(e.target.value)} className="glass-input text-sm w-36"><option value="ADMIN">Admin</option><option value="EDITOR">Éditeur</option><option value="READER">Lecteur</option></select>
          <button className="btn-gradient text-sm">Envoyer</button>
        </div>
      </div>
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
            {['Membre','Email','Rôle','Statut','Actions'].map(h=><th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{color:'var(--text-label)'}}>{h}</th>)}
          </tr></thead>
          <tbody>{mockTeam.map(m=>(
            <tr key={m.id} style={{borderBottom:'1px solid var(--border)'}}>
              <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{background:'rgba(255,255,255,0.08)'}}>{(m.name||m.email).charAt(0).toUpperCase()}</div><span className="text-sm font-medium">{m.name||'En attente'}</span></div></td>
              <td className="px-5 py-4 text-sm" style={{color:'var(--text-body)'}}>{m.email}</td>
              <td className="px-5 py-4 text-xs px-3 py-1 rounded-full inline-block" style={{background:'rgba(255,255,255,0.06)'}}>{m.role==='ADMIN'?'Admin':m.role==='EDITOR'?'Éditeur':'Lecteur'}</td>
              <td className="px-5 py-4"><span className={m.status==='ACTIVE'?'badge-published':'badge-draft'}>{m.status==='ACTIVE'?'Actif':'En attente'}</span></td>
              <td className="px-5 py-4"><button className="text-xs px-3 py-1.5 rounded-lg" style={{background:'rgba(239,68,68,0.1)',color:'#ef4444'}}>Révoquer</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
