import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true },
  })
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const article = await prisma.article.findUnique({
    where: { slug },
    select: { title: true, metaTitle: true, metaDesc: true, excerpt: true, coverImage: true, slug: true },
  })
  if (!article) return {}
  return {
    title: article.metaTitle || article.title,
    description: article.metaDesc || article.excerpt || '',
    openGraph: {
      images: article.coverImage ? [article.coverImage] : [],
    },
    alternates: { canonical: `https://goldeor.com/blog/${article.slug}/` },
  }
}

function formatDate(date: Date | null): string {
  if (!date) return ''
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

function readingTime(content: string | null): number {
  if (!content) return 1
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
}

function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi
  const headings: { id: string; text: string; level: number }[] = []
  let match
  while ((match = regex.exec(content)) !== null) {
    const text = match[2].replace(/<[^>]+>/g, '')
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    headings.push({ id, text, level: parseInt(match[1]) })
  }
  return headings
}

function injectHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h([23])>/gi, (_, level, attrs, content, closeLevel) => {
    const text = content.replace(/<[^>]+>/g, '')
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return `<h${level}${attrs} id="${id}">${content}</h${closeLevel}>`
  })
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params

  const article = await prisma.article.findUnique({
    where: { slug, status: 'PUBLISHED' },
    include: { author: true, category: true },
  })

  if (!article) notFound()

  // Increment views (fire and forget)
  prisma.article.update({
    where: { id: article.id },
    data: { views: { increment: 1 } },
  }).catch(() => {})

  // Related articles
  const related = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      ...(article.categoryId ? { categoryId: article.categoryId } : {}),
      NOT: { id: article.id },
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
    include: { author: true, category: true },
  })

  const headings = article.content ? extractHeadings(article.content) : []
  const contentHtml = article.content ? injectHeadingIds(article.content) : ''
  const minutes = readingTime(article.content)

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    author: article.author ? { '@type': 'Person', name: article.author.name } : undefined,
    datePublished: article.publishedAt?.toISOString(),
    image: article.coverImage || undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative pt-[68px]">
        <div
          className="relative mx-4 rounded-[20px] min-h-[60vh] flex flex-col justify-end overflow-hidden"
        >
          {/* Cover image or gradient */}
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.coverAlt || article.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #0c0e1a 0%, #1a1035 50%, #141428 100%)',
              }}
            />
          )}

          {/* Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(10,10,14,0.95) 0%, rgba(10,10,14,0.5) 50%, rgba(10,10,14,0.2) 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-10 pb-12 max-w-[900px]">
            {article.category && (
              <span className="text-gradient text-xs font-semibold uppercase tracking-[0.22em] mb-4 block">
                {article.category.name}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              {article.author && (
                <>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
                  >
                    {article.author.avatar ? (
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      article.author.name[0]
                    )}
                  </div>
                  <span className="text-sm font-medium text-white">{article.author.name}</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                </>
              )}
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {formatDate(article.publishedAt)}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {minutes} min de lecture
              </span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {article.views} vues
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="px-6 md:px-10 py-16 max-w-[1200px] mx-auto" style={{ background: 'var(--bg-main)' }}>
        <div className="flex gap-12 flex-col lg:flex-row">
          {/* Main content — 65% */}
          <div className="flex-1 lg:max-w-[65%]">
            <div
              className="prose prose-invert prose-lg max-w-none"
              style={{
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.8,
              }}
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-xs"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar — 35% */}
          <aside className="w-full lg:w-[35%] lg:sticky lg:top-[100px] lg:self-start space-y-6">
            {/* Table of contents */}
            {headings.length > 0 && (
              <div className="glass-card p-6">
                <h4 className="text-sm font-bold text-white mb-4">Table des matières</h4>
                <ul className="space-y-2">
                  {headings.map(h => (
                    <li key={h.id} style={{ paddingLeft: h.level === 3 ? '16px' : '0' }}>
                      <a
                        href={`#${h.id}`}
                        className="text-sm transition-colors block py-1"
                        style={{ color: 'rgba(255,255,255,0.45)' }}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div
              className="glass-card p-6 text-center"
              style={{ border: '1px solid rgba(236,160,192,0.15)' }}
            >
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="text-base font-bold text-white mb-2">Besoin d&apos;un audit ?</h4>
              <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Découvrez comment Goldeor peut accélérer votre croissance digitale.
              </p>
              <Link href="/contact" className="btn-gradient text-sm w-full justify-center">
                Demander un audit gratuit →
              </Link>
            </div>

            {/* Share */}
            <div className="glass-card p-6">
              <h4 className="text-sm font-bold text-white mb-4">Partager</h4>
              <div className="flex gap-3">
                {['LinkedIn', 'X', 'Facebook'].map(network => (
                  <span
                    key={network}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium cursor-pointer transition-colors"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {network[0]}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="px-10 pb-20 max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-8">Articles similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map(rel => (
              <Link key={rel.id} href={`/blog/${rel.slug}`} className="group">
                <article className="glass-card overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="relative h-40">
                    {rel.coverImage ? (
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(135deg, rgba(196,168,232,0.2), rgba(160,184,240,0.1))',
                        }}
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">{rel.title}</h3>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {formatDate(rel.publishedAt)}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
