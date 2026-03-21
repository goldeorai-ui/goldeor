import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, type } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const validTypes = ['livres-blancs', 'blog']
    const notifyType = validTypes.includes(type) ? type : 'livres-blancs'

    await prisma.notifyEmail.create({
      data: {
        email: email.trim().toLowerCase(),
        type: notifyType,
      },
    })

    return NextResponse.json({ success: true, message: 'Vous serez notifié(e)' })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
