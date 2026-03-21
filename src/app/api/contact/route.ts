import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { firstName, lastName, email, phone, profession, message, source } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }
    if (!firstName || !lastName) {
      return NextResponse.json({ error: 'Prénom et nom requis' }, { status: 400 })
    }

    await prisma.lead.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone || null,
        profession: profession || null,
        message: message || null,
        source: source || 'contact',
      },
    })

    revalidatePath('/admin')

    return NextResponse.json({ success: true, message: 'Message envoyé avec succès' })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
