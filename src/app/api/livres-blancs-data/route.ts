import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const livresBlancs = await prisma.livreBlanc.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      summary: true,
      category: true,
      coverImage: true,
      downloads: true,
      author: { select: { name: true } },
    },
  })

  return NextResponse.json({
    livresBlancs,
    total: livresBlancs.length,
  })
}
