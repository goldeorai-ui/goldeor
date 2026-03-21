import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

type Params = Promise<{ id: string }>

export async function POST(req: Request, { params }: { params: Params }) {
  const { id } = await params

  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 })
    }

    // Save email for lead tracking
    await prisma.notifyEmail.create({
      data: {
        email: email.trim().toLowerCase(),
        type: 'livres-blancs',
      },
    })

    // Increment download count and get PDF URL
    const livreBlanc = await prisma.livreBlanc.update({
      where: { id },
      data: { downloads: { increment: 1 } },
      select: { pdfUrl: true, title: true },
    })

    if (!livreBlanc.pdfUrl) {
      return NextResponse.json({ error: 'PDF non disponible' }, { status: 404 })
    }

    revalidatePath('/livres-blancs')
    revalidatePath('/admin')

    return NextResponse.json({
      success: true,
      url: livreBlanc.pdfUrl,
      title: livreBlanc.title,
    })
  } catch {
    return NextResponse.json({ error: 'Ressource introuvable' }, { status: 404 })
  }
}
