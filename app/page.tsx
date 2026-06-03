import { redirect } from 'next/navigation'
import { defaultLocale } from '@/content/locales'

export default function RootPage() {
  redirect(`/${defaultLocale}`)
}
