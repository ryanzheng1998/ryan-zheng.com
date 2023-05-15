import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Ryan Zheng's Personal Website",
  description: 'Ryan Zheng is a software engineer based in Guangzhou, China.',
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const shortLang = lang.split('-')[0]
  return (
    <html lang={shortLang}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
