import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Blog Marketing Digital',
  description: 'Insights, stratégies et tendances du marketing digital francophone.',
  alternates: { canonical: 'https://goldeor.com/blog/' },
}

function formatDate(date: Date | null): string {
  if (!date) return ''
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

function readingTime(content: string | null): number {
  if (!content) return 1
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
}

type SearchParams = Promise<{ category?: string; page?: string }>

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || '1'))
  const perPage = 9
  const categorySlug = params.category

  // Fetch categories
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  })

  // Build where clause
  const where = {
    status: 'PUBLISHED' as const,
    language: 'FR',
    ...(categorySlug ? { category: { slug: categorySlug } } : {}),
  }

  // Fetch articles + count
  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      include: { author: true, category: true },
      skip: (currentPage - 1) * perPage,
      take: perPage,
    }),
    prisma.article.count({ where }),
  ])

  const totalPages = Math.ceil(totalCount / perPage)
  const featured = currentPage === 1 && !categorySlug ? articles[0] : null
  const gridArticles = featured ? articles.slice(1) : articles

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[68px]">
        <div
          className="relative mx-4 rounded-[20px] min-h-[85vh] flex flex-col justify-end overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0c0e1a 0%, #141428 40%, #1a1035 70%, #0e0a1a 100%)',
          }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.4 }}>
            <div className="absolute top-0 bottom-[25%] left-[33.33%] w-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="absolute top-0 bottom-[25%] left-[66.66%] w-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="absolute left-0 right-0 top-[35%] h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* Glow */}
          <div
            className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(160,120,232,0.15), rgba(100,140,240,0.08), transparent 70%)',
            }}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(10,10,14,0.95) 0%, rgba(10,10,14,0.3) 60%, transparent 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-10 pb-14 flex flex-col md:flex-row items-end justify-between gap-8">
            <div>
              <span className="text-gradient text-xs font-semibold uppercase tracking-[0.22em] mb-4 block">
                Blog &amp; Ressources
              </span>
              <h1 className="text-silver text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                Idées, stratégies<br />et perspectives
              </h1>
              <Link href="#newsletter" className="btn-gradient text-sm mt-2 inline-flex">
                S&apos;abonner à la newsletter →
              </Link>
            </div>
            <p className="text-sm max-w-[380px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Découvrez nos articles sur le marketing digital, l&apos;acquisition de leads, l&apos;IA et les dernières tendances du monde francophone.
            </p>
          </div>

          {/* Separator */}
          <div className="mx-10 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>
      </section>

      {/* Body */}
      <section className="px-10 py-20 max-w-[1200px] mx-auto" style={{ background: 'var(--bg-main)' }}>
        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          <Link
            href="/blog"
            className="px-5 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: !categorySlug ? 'var(--btn-gradient)' : 'rgba(255,255,255,0.04)',
              color: !categorySlug ? '#0A0A0A' : 'rgba(255,255,255,0.5)',
              border: !categorySlug ? 'none' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            Tous
          </Link>
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.slug}`}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: categorySlug === cat.slug ? 'var(--btn-gradient)' : 'rgba(255,255,255,0.04)',
                color: categorySlug === cat.slug ? '#0A0A0A' : 'rgba(255,255,255,0.5)',
                border: categorySlug === cat.slug ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {articles.length === 0 && (
          <div className="glass-card text-center py-24 px-8">
            <div className="text-5xl mb-6">📝</div>
            <h3 className="text-xl font-bold text-white mb-3">Nos premiers articles arrivent bientôt</h3>
            <p className="text-sm max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Nous travaillons sur du contenu de qualité. Abonnez-vous pour être notifié.
            </p>
          </div>
        )}

        {/* Featured article */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="block mb-12 group">
            <article className="glass-card overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto min-h-[320px]">
                {featured.coverImage ? (
                  <Image
                    src={featured.coverImage}
                    alt={featured.coverAlt || featured.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(196,168,232,0.2), rgba(160,184,240,0.15), rgba(245,200,138,0.1))',
                    }}
                  />
                )}
              </div>
              <div className="p-10 flex flex-col justify-center">
                {featured.category && (
                  <span className="text-gradient text-xs font-semibold uppercase tracking-wider mb-3">
                    {featured.category.name}
                  </span>
                )}
                <h2 className="text-2xl font-extrabold text-white mb-3 group-hover:text-gradient transition-all leading-tight">
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {featured.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  {featured.author && (
                    <>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          color: 'rgba(255,255,255,0.6)',
                        }}
                      >
                        {featured.author.name[0]}
                      </div>
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {featured.author.name}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                    </>
                  )}
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {formatDate(featured.publishedAt)}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {readingTime(featured.content)} min
                  </span>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Grid */}
        {gridArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {gridArticles.map(article => (
              <Link key={article.id} href={`/blog/${article.slug}`} className="group">
                <article className="glass-card overflow-hidden h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
                  {/* Cover */}
                  <div className="relative h-48">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage}
                        alt={article.coverAlt || article.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, rgba(${Math.random() * 100 + 150},${Math.random() * 100 + 100},232,0.2), rgba(160,184,240,0.1))`,
                        }}
                      />
                    )}
                    {article.category && (
                      <span
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: 'rgba(10,10,14,0.7)',
                          backdropFilter: 'blur(8px)',
                          color: 'rgba(255,255,255,0.8)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        {article.category.name}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-white mb-2 leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-sm mb-4 line-clamp-2 flex-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {article.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-auto">
                      {article.author && (
                        <>
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                            style={{
                              background: 'rgba(255,255,255,0.08)',
                              color: 'rgba(255,255,255,0.6)',
                            }}
                          >
                            {article.author.name[0]}
                          </div>
                          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                            {article.author.name}
                          </span>
                          <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                        </>
                      )}
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {formatDate(article.publishedAt)}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {readingTime(article.content)} min
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Link
                key={page}
                href={`/blog?page=${page}${categorySlug ? `&category=${categorySlug}` : ''}`}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all"
                style={{
                  background: page === currentPage ? 'var(--btn-gradient)' : 'rgba(255,255,255,0.04)',
                  color: page === currentPage ? '#0A0A0A' : 'rgba(255,255,255,0.5)',
                  border: page === currentPage ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {page}
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
