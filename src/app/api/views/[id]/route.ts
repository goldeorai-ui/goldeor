import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type Params = Promise<{ id: string }>

export async function POST(_req: Request, { params }: { params: Params }) {
  const { id } = await params

  try {
    await prisma.article.update({
      where: { id },
      data: { views: { increment: 1 } },
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }
}
