'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', profession: '', message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact' }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
      } else {
        setError(data.error || 'Erreur lors de l\'envoi')
      }
    } catch {
      setError('Erreur de connexion')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[68px]">
        <div
          className="relative mx-4 rounded-[20px] min-h-[85vh] flex flex-col justify-end overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0c0e1a 0%, #101428 40%, #181035 70%, #0c0a18 100%)',
          }}
        >
          {/* BG text */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            style={{
              fontSize: 'clamp(5rem, 12vw, 12rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.02)',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
            }}
          >
            CONTACT
          </div>

          <div
            className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[50%] h-[40%] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(196,168,232,0.1), rgba(160,184,240,0.05), transparent 70%)',
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(10,10,14,0.95) 0%, rgba(10,10,14,0.3) 60%, transparent 100%)',
            }}
          />

          <div className="relative z-10 px-10 pb-14 flex flex-col md:flex-row items-end justify-between gap-8">
            <div>
              <span className="text-gradient text-xs font-semibold uppercase tracking-[0.22em] mb-4 block">
                Contact
              </span>
              <h1 className="text-silver text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                Parlons de votre<br />projet
              </h1>
            </div>
            <p className="text-sm max-w-[380px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Des questions ou prêt à transformer votre business avec le marketing digital ? Notre équipe vous répond sous 24h.
            </p>
          </div>
          <div className="mx-10 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>
      </section>

      {/* Form section */}
      <section className="px-10 py-20 max-w-[1200px] mx-auto" style={{ background: 'var(--bg-main)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Info */}
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-4">Contactez-nous</h2>
            <p className="text-sm leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Remplissez le formulaire et notre équipe vous contactera dans les plus brefs délais pour discuter de votre projet.
            </p>

            <div className="space-y-4">
              <div className="glass-card p-5 flex items-center gap-4 transition-all hover:translate-x-1" style={{ cursor: 'default' }}>
                <div
                  className="w-11 h-11 rounded-[14px] flex items-center justify-center text-lg"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  ✉️
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Écrivez-nous</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>contact@goldeor.com</p>
                </div>
              </div>

              <div className="glass-card p-5 flex items-center gap-4 transition-all hover:translate-x-1" style={{ cursor: 'default' }}>
                <div
                  className="w-11 h-11 rounded-[14px] flex items-center justify-center text-lg"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  📱
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Réseaux sociaux</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>LinkedIn · Instagram · X</p>
                </div>
              </div>
            </div>

            <div className="mt-10 glass-card p-6 text-center" style={{ border: '1px solid rgba(236,160,192,0.15)' }}>
              <div className="text-3xl mb-3">⚡</div>
              <p className="text-sm font-semibold text-white mb-1">Réponse garantie sous 24h</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Sans engagement · Audit gratuit inclus</p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="glass-card p-8" style={{ backdropFilter: 'blur(20px)' }}>
            {sent ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">Message envoyé !</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Nous vous répondrons dans les 24 prochaines heures.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Prénom"
                    value={form.firstName}
                    onChange={e => update('firstName', e.target.value)}
                    className="glass-input"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Nom"
                    value={form.lastName}
                    onChange={e => update('lastName', e.target.value)}
                    className="glass-input"
                  />
                </div>

                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  className="glass-input"
                />

                <input
                  type="tel"
                  placeholder="Téléphone (optionnel)"
                  value={form.phone}
                  onChange={e => update('phone', e.target.value)}
                  className="glass-input"
                />

                <select
                  required
                  value={form.profession}
                  onChange={e => update('profession', e.target.value)}
                  className="glass-input"
                  style={{ color: form.profession ? '#fff' : 'rgba(255,255,255,0.3)' }}
                >
                  <option value="" disabled>Votre profession</option>
                  <option value="entrepreneur">Entrepreneur</option>
                  <option value="freelance">Freelance</option>
                  <option value="startup">Fondateur de Startup</option>
                  <option value="directeur">Directeur / CEO</option>
                  <option value="marketing">Responsable Marketing</option>
                  <option value="commercial">Responsable Commercial</option>
                  <option value="consultant">Consultant</option>
                  <option value="etudiant">Étudiant</option>
                  <option value="autre">Autre</option>
                </select>

                <textarea
                  placeholder="Votre message (optionnel)"
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  className="glass-input min-h-[120px] resize-y"
                />

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button type="submit" disabled={sending} className="btn-gradient w-full justify-center">
                  {sending ? 'Envoi en cours...' : 'Envoyer le message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
