import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { Kosugi_Maru } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import Providers from "./providers"

const scorpius = localFont({
  src: "./fonts/Scorpius.woff",
  variable: "--font-scorpius"
})

const tram = localFont({
  src: "./fonts/Tram.woff",
  variable: "--font-tram"
})

const kosugiMaru = Kosugi_Maru({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-kosugi-maru"
})

export const metadata: Metadata = {
  title: "Are you in love?",
  description:
    "carve your names into this website to celebrate your love. (pretend you are carving your names in a tree).it's anonymous and forever. accepting 333 crushes total reminder that love is all around us! especially on this website (2025).xoxo!"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${scorpius.variable} ${tram.variable} ${kosugiMaru.variable}  antialiased`}
        >
          {children}
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </Providers>
  )
}
