import { isLocale, type Locale } from '@/content/locales'
import { notFound } from 'next/navigation'
import { ResumeContent, resumeProfiles } from './ResumeContent'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ResumePage({ params }: Props) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam

  return <ResumeContent content={resumeProfiles[locale]} locale={locale} />
}
