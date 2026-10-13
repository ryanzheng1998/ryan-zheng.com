'use client'
import { useParams } from 'next/navigation'
import { projects } from '@/content/site'

export function DemoIntro({ id }: { id: string }) {
  const { locale } = useParams<{ locale: string }>()
  const language = locale === 'zh' ? 'zh' : 'en'
  const project = projects.find((p) => p.id === id)
  if (!project) return null
  return (
    <>
      <p className="eyebrow">
        {language === 'en' ? 'Interactive experiment' : '互動實驗'}
      </p>
      <h1>{project.title[language]}</h1>
      <p className="demo-intro">{project.instructions[language]}</p>
    </>
  )
}
