import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    await prisma.notifyEmail.create({
      data: {
        email: email.trim().toLowerCase(),
        type: 'blog',
      },
    })

    return NextResponse.json({ success: true, message: 'Inscription réussie' })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
