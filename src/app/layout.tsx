import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Goldeor — Agence Marketing Digital Premium",
  description: "Goldeor accompagne les entrepreneurs, startups et grandes entreprises dans leur développement digital.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
