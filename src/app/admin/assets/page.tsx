'use client'
import { useState } from 'react'

const mockAssets = [
  { id:'1', filename:'hero-globe.mp4', type:'video/mp4', size:4200000, url:'/uploads/hero-globe.mp4' },
  { id:'2', filename:'logo-goldeor.png', type:'image/png', size:24000, url:'/uploads/logo-goldeor.png' },
  { id:'3', filename:'guide-meta-ads.pdf', type:'application/pdf', size:3100000, url:'/uploads/guide-meta-ads.pdf' },
  { id:'4', filename:'client-tete-1.png', type:'image/png', size:18000, url:'/uploads/client-1.png' },
]

function formatSize(bytes: number) { if(bytes<1024) return bytes+'B'; if(bytes<1048576) return (bytes/1024).toFixed(0)+'KB'; return (bytes/1048576).toFixed(1)+'MB' }

export default function AssetsPage() {
  const [filter, setFilter] = useState('all')
  const filtered = mockAssets.filter(a => { if(filter==='all') return true; if(filter==='images') return a.type.startsWith('image'); if(filter==='videos') return a.type.startsWith('video'); if(filter==='pdf') return a.type==='application/pdf'; return true })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-silver">Assets & Médias</h1><p className="text-sm mt-1" style={{color:'var(--text-body)'}}>Gérez vos fichiers</p></div>
        <button className="btn-gradient">+ Importer</button>
      </div>
      <div className="flex gap-2 mb-6">
        {[['all','Tous'],['images','Images'],['videos','Vidéos'],['pdf','PDF']].map(([k,l])=>(
          <button key={k} onClick={()=>setFilter(k)} className="px-4 py-2 text-xs rounded-full" style={{background:filter===k?'rgba(255,255,255,0.1)':'transparent',color:filter===k?'#fff':'rgba(255,255,255,0.4)',border:'1px solid '+(filter===k?'rgba(255,255,255,0.15)':'transparent')}}>{l}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(a=>(
          <div key={a.id} className="glass-card p-4 cursor-pointer hover:border-white/20 transition-all">
            <div className="h-32 rounded-lg flex items-center justify-center mb-3" style={{background:'rgba(255,255,255,0.03)'}}>
              <span className="text-3xl">{a.type.startsWith('image')?'🖼️':a.type.startsWith('video')?'🎬':'📄'}</span>
            </div>
            <p className="text-xs font-medium truncate">{a.filename}</p>
            <p className="text-[10px]" style={{color:'var(--text-faint)'}}>{formatSize(a.size)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
