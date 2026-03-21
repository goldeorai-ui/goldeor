import "dotenv/config"
import pg from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../src/generated/prisma"
import bcrypt from "bcryptjs"

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const hashedPassword = await bcrypt.hash("Goldeor2026!", 12)

  const admin = await prisma.user.upsert({
    where: { email: "admin@goldeor.com" },
    update: {},
    create: {
      email: "admin@goldeor.com",
      name: "Admin Goldeor",
      password: hashedPassword,
      role: "ADMIN",
    },
  })

  console.log("Admin user created:", admin.email)

  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      siteName: "Goldeor",
      siteUrl: "https://goldeor.com",
      contactEmail: "contact@goldeor.com",
    },
  })

  console.log("Site settings initialized")
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
