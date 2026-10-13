'use client'

import { useParams } from 'next/navigation'
import { SiteHeader } from '@/components/SiteHeader'
import { LineChart } from '@mui/x-charts'
import { DemoIntro } from '@/components/DemoIntro'
import { Inputs } from './Inputs'
import { generateCruve } from './generateCruve'
import { useStore } from './useStore'

export default function Home() {
  const { locale } = useParams<{ locale: string }>()
  const state = useStore()
  const cruve = generateCruve(state)

  return (
    <main className="editorial-site">
      <SiteHeader
        locale={locale === 'zh' ? 'zh' : 'en'}
        path="/projects/spring-animation/spring-parameter-picker"
      />
      <div
        id="main-content"
        className="mx-auto grid w-full min-w-0 max-w-4xl gap-8 px-5 py-12"
      >
        <div className="demo-content w-full">
          <DemoIntro id="spring-parameter-picker" />
        </div>
        <Inputs />
        <div className="min-w-0 rounded-xl bg-white p-2 sm:p-5">
          <LineChart
            xAxis={[{ data: cruve.map((_, i) => i * 16), label: 'Time (ms)' }]}
            yAxis={[{ label: 'Value' }]}
            series={[
              {
                data: cruve,
                connectNulls: true,
                showMark: false,
              },
            ]}
            height={400}
          />
        </div>
      </div>
    </main>
  )
}
