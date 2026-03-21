'use client'

import { useState } from 'react'
import Link from 'next/link'

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function NewArticlePage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('DRAFT')
  const [language, setLanguage] = useState('FR')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDesc, setMetaDesc] = useState('')
  const [coverAlt, setCoverAlt] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [seoOpen, setSeoOpen] = useState(false)

  function handleTitleChange(v: string) {
    setTitle(v)
    setSlug(slugify(v))
  }

  function addTag(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/articles" className="text-sm" style={{ color: 'var(--text-faint)' }}>← Retour</Link>
          <h1 className="text-xl font-bold text-silver">Nouvel article</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 text-sm rounded-full transition-all"
            style={{ border: '1px solid var(--border)', color: 'var(--text-body)' }}>
            Enregistrer brouillon
          </button>
          <button className="btn-gradient text-sm">Publier</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Left column */}
        <div className="space-y-5">
          <div className="glass-card p-6 space-y-5">
            <div>
              <input type="text" value={title} onChange={e => handleTitleChange(e.target.value)}
                placeholder="Titre de l'article"
                className="glass-input text-xl font-bold" style={{ fontSize: '1.4rem' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-label)' }}>Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: 'var(--text-faint)' }}>/blog/</span>
                <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="glass-input text-sm flex-1" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-label)' }}>Extrait</label>
              <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3}
                className="glass-input resize-none" placeholder="Résumé court pour SEO et listings..." />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-label)' }}>Contenu</label>
              <textarea value={content} onChange={e => setContent(e.target.value)} rows={16}
                className="glass-input resize-none font-mono text-sm"
                placeholder="Éditeur rich text Tiptap — à connecter avec la base de données..." />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Publication */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-label)' }}>Publication</h3>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-faint)' }}>Statut</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className="glass-input text-sm">
                <option value="DRAFT">Brouillon</option>
                <option value="PUBLISHED">Publié</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-faint)' }}>Date de publication</label>
              <input type="date" className="glass-input text-sm" />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-faint)' }}>Auteur</label>
              <select className="glass-input text-sm">
                <option>Boris Pedja</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-faint)' }}>Langue</label>
              <select value={language} onChange={e => setLanguage(e.target.value)} className="glass-input text-sm">
                <option value="FR">Français</option>
                <option value="EN">English</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-label)' }}>Catégorie & Tags</h3>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-faint)' }}>Catégorie</label>
              <select className="glass-input text-sm">
                <option>Marketing Digital</option>
                <option>SEO</option>
                <option>Publicité</option>
                <option>IA & Automatisation</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-faint)' }}>Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full flex items-center gap-1"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)' }}>
                    {tag}
                    <button onClick={() => setTags(tags.filter(t => t !== tag))} className="ml-1 opacity-50 hover:opacity-100">×</button>
                  </span>
                ))}
              </div>
              <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={addTag}
                className="glass-input text-sm" placeholder="Appuyez Entrée pour ajouter..." />
            </div>
          </div>

          {/* SEO */}
          <div className="glass-card p-5">
            <button onClick={() => setSeoOpen(!seoOpen)} className="flex items-center justify-between w-full">
              <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-label)' }}>SEO</h3>
              <span className="text-xs" style={{ color: 'var(--text-faint)' }}>{seoOpen ? '▲' : '▼'}</span>
            </button>
            {seoOpen && (
              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-xs" style={{ color: 'var(--text-faint)' }}>Meta title</label>
                    <span className="text-xs" style={{ color: metaTitle.length > 60 ? '#ef4444' : 'var(--text-faint)' }}>
                      {metaTitle.length}/60
                    </span>
                  </div>
                  <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)}
                    className="glass-input text-sm" placeholder="Titre pour les moteurs de recherche" />
                </div>
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-xs" style={{ color: 'var(--text-faint)' }}>Meta description</label>
                    <span className="text-xs" style={{ color: metaDesc.length > 155 ? '#ef4444' : 'var(--text-faint)' }}>
                      {metaDesc.length}/155
                    </span>
                  </div>
                  <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} rows={3}
                    className="glass-input text-sm resize-none" placeholder="Description pour les moteurs de recherche" />
                </div>
                {/* Google preview */}
                <div className="p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-faint)' }}>Aperçu Google</p>
                  <p className="text-sm text-blue-400 font-medium truncate">{metaTitle || title || 'Titre de l\'article'}</p>
                  <p className="text-xs text-green-400 truncate">goldeor.com/blog/{slug || 'slug'}</p>
                  <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--text-body)' }}>
                    {metaDesc || excerpt || 'Description de l\'article...'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cover image */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-label)' }}>Image de couverture</h3>
            <div className="border-2 border-dashed rounded-xl p-8 text-center transition-colors"
              style={{ borderColor: 'var(--border)' }}>
              <p className="text-2xl mb-2">🖼️</p>
              <p className="text-xs" style={{ color: 'var(--text-faint)' }}>Glissez une image ici ou cliquez</p>
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-faint)' }}>Texte alternatif</label>
              <input type="text" value={coverAlt} onChange={e => setCoverAlt(e.target.value)}
                className="glass-input text-sm" placeholder="Description de l'image..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
