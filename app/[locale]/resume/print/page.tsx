import { ResumeContent, resumeProfiles } from '@/app/[locale]/resume/page'
import { isLocale, type Locale } from '@/content/locales'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ResumePrintPage({ params }: Props) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam

  return (
    <ResumeContent
      content={resumeProfiles[locale]}
      fixed
      locale={locale}
      showNav={false}
    />
  )
}
