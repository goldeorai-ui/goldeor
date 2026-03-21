import { prisma } from '@/lib/prisma'

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

export default async function DashboardPage() {
  const [
    articlesPublished,
    articlesDraft,
    temoignagesCount,
    livresBlancsCount,
    leadsCount,
    notifyEmailsCount,
    totalDownloads,
    totalViews,
    recentArticles,
    recentTemoignages,
  ] = await Promise.all([
    prisma.article.count({ where: { status: 'PUBLISHED' } }),
    prisma.article.count({ where: { status: 'DRAFT' } }),
    prisma.temoignage.count({ where: { status: 'PUBLISHED' } }),
    prisma.livreBlanc.count({ where: { status: 'PUBLISHED' } }),
    prisma.lead.count(),
    prisma.notifyEmail.count(),
    prisma.livreBlanc.aggregate({ _sum: { downloads: true } }),
    prisma.article.aggregate({ _sum: { views: true } }),
    prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { title: true, status: true, createdAt: true },
    }),
    prisma.temoignage.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { displayName: true, isPrivate: true, rating: true, sector: true, keyQuote: true },
    }),
  ])

  const stats = [
    {
      label: 'Articles',
      value: `${articlesPublished + articlesDraft}`,
      sub: `${articlesPublished} publiés · ${articlesDraft} brouillons`,
      icon: '📝',
    },
    {
      label: 'Témoignages',
      value: `${temoignagesCount}`,
      sub: `${temoignagesCount} publiés`,
      icon: '💬',
    },
    {
      label: 'Livres blancs',
      value: `${livresBlancsCount}`,
      sub: `${totalDownloads._sum.downloads || 0} téléchargements`,
      icon: '📚',
    },
    {
      label: 'Total vues',
      value: `${totalViews._sum.views || 0}`,
      sub: 'Tous articles confondus',
      icon: '👁️',
    },
    {
      label: 'Leads reçus',
      value: `${leadsCount}`,
      sub: 'Depuis le formulaire contact',
      icon: '🎯',
    },
    {
      label: 'Emails inscrits',
      value: `${notifyEmailsCount}`,
      sub: 'Newsletter + notify-me',
      icon: '✉️',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-silver">Tableau de bord</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-body)' }}>
          Vue d&apos;ensemble de votre contenu et de vos leads
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs font-medium" style={{ color: 'var(--text-label)' }}>{stat.label}</span>
            </div>
            <p className="text-3xl font-bold text-silver">{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Traffic chart placeholder */}
      <div className="glass-card p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-silver">Trafic</h2>
        </div>
        <div className="h-48 flex items-center justify-center rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <p className="text-sm" style={{ color: 'var(--text-faint)' }}>
            Graphique trafic — Connectez Google Analytics pour activer
          </p>
        </div>
      </div>

      {/* Recent content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent articles */}
        <div className="glass-card p-6">
          <h2 className="text-base font-semibold mb-4 text-silver">Articles récents</h2>
          {recentArticles.length === 0 ? (
            <p className="text-sm py-6 text-center" style={{ color: 'var(--text-faint)' }}>
              Aucun article pour le moment
            </p>
          ) : (
            <div className="space-y-3">
              {recentArticles.map((article) => (
                <div key={article.title} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-medium truncate">{article.title}</p>
                    <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{formatDate(article.createdAt)}</p>
                  </div>
                  <span className={article.status === 'PUBLISHED' ? 'badge-published' : 'badge-draft'}>
                    {article.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent temoignages */}
        <div className="glass-card p-6">
          <h2 className="text-base font-semibold mb-4 text-silver">Témoignages récents</h2>
          {recentTemoignages.length === 0 ? (
            <p className="text-sm py-6 text-center" style={{ color: 'var(--text-faint)' }}>
              Aucun témoignage pour le moment
            </p>
          ) : (
            <div className="space-y-3">
              {recentTemoignages.map((t, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-medium">
                      {t.isPrivate ? 'Compte privé' : (t.displayName || 'Anonyme')}
                      {t.sector && <span className="text-xs font-normal" style={{ color: 'var(--text-faint)' }}> — {t.sector}</span>}
                    </p>
                    {t.keyQuote && <p className="text-xs italic" style={{ color: 'var(--text-body)' }}>&ldquo;{t.keyQuote}&rdquo;</p>}
                  </div>
                  <span className="text-xs" style={{ color: '#FFC24D' }}>
                    {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
