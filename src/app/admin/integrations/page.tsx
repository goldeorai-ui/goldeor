'use client'

const integrations = [
  { name:'Mailchimp', icon:'📧', desc:'Email marketing & newsletters', fields:['API Key','Liste ID'] },
  { name:'SendGrid', icon:'✉️', desc:'Envoi d\'emails transactionnels', fields:['API Key','From Email'] },
  { name:'HubSpot', icon:'🟠', desc:'CRM & marketing automation', fields:['API Key','Portal ID'] },
  { name:'Make', icon:'⚡', desc:'Automatisation de workflows', fields:['Webhook URL'] },
  { name:'Zapier', icon:'🔗', desc:'Connexion entre applications', fields:['Webhook URL'] },
  { name:'Slack', icon:'💬', desc:'Notifications en temps réel', fields:['Webhook URL'] },
]

export default function IntegrationsPage() {
  return (
    <div>
      <div className="mb-8"><h1 className="text-2xl font-bold text-silver">Intégrations</h1><p className="text-sm mt-1" style={{color:'var(--text-body)'}}>Connectez vos outils favoris</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map(i=>(
          <div key={i.name} className="glass-card p-5">
            <div className="flex items-center gap-3 mb-1"><span className="text-xl">{i.icon}</span><h3 className="text-sm font-semibold">{i.name}</h3>
              <label className="ml-auto flex items-center"><input type="checkbox" className="accent-purple-400" /><span className="text-xs ml-2" style={{color:'var(--text-faint)'}}>Actif</span></label>
            </div>
            <p className="text-xs mb-4" style={{color:'var(--text-faint)'}}>{i.desc}</p>
            {i.fields.map(f=><input key={f} type="text" className="glass-input text-sm mb-2" placeholder={f} />)}
            <div className="flex gap-2 mt-2">
              <button className="text-xs px-4 py-2 rounded-lg flex-1" style={{background:'rgba(255,255,255,0.06)',color:'var(--text-body)'}}>Sauvegarder</button>
              <button className="text-xs px-4 py-2 rounded-lg" style={{border:'1px solid var(--border)',color:'var(--text-faint)'}}>Tester</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
