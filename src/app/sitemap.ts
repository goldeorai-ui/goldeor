import { prisma } from '@/lib/prisma'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, updatedAt: true },
  })

  return [
    { url: 'https://goldeor.com/', lastModified: new Date() },
    { url: 'https://goldeor.com/blog/', lastModified: new Date() },
    { url: 'https://goldeor.com/livres-blancs/', lastModified: new Date() },
    { url: 'https://goldeor.com/cas-clients/', lastModified: new Date() },
    { url: 'https://goldeor.com/agence/', lastModified: new Date() },
    { url: 'https://goldeor.com/services/', lastModified: new Date() },
    { url: 'https://goldeor.com/contact/', lastModified: new Date() },
    ...articles.map(a => ({
      url: `https://goldeor.com/blog/${a.slug}/`,
      lastModified: a.updatedAt,
    })),
  ]
}
