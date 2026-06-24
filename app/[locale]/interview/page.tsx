'use client'

import { isLocale, type Locale } from '@/content/locales'
import { notFound, useParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

type Slide = {
  eyebrow: string
  title: string
  body?: string
  points?: string[]
  columns?: Array<{
    title: string
    body: string
  }>
  footer?: string
}

const slides = {
  zh: [
    {
      eyebrow: 'Ryan Zheng / 鄭聖玄',
      title: '軟體工程師',
      body: '5 年以上製造業數位化、自動化與 AI 應用系統開發經驗。',
      points: [
        'AI 視覺檢測與機械手臂整合',
        'Motion Analysis 與工時分析',
        'Digital Twin 與製造模擬',
        '前端架構、流程設計與現場導入',
      ],
      footer: 'ryanzheng1998@gmail.com',
    },
    {
      eyebrow: 'Positioning',
      title: '我擅長把複雜技術變成現場可用的系統',
      columns: [
        {
          title: '理解需求',
          body: '和使用者一起梳理作業流程、資料需求與現場限制。',
        },
        {
          title: '設計系統',
          body: '規劃介面流程、資料呈現、設備控制與前後端整合。',
        },
        {
          title: '落地導入',
          body: '支援測試驗證、教育訓練、問題排除與跨廠部署。',
        },
      ],
    },
    {
      eyebrow: 'Project 01',
      title: 'AI 視覺檢測與自動化平台',
      body: '參與 AI 視覺檢測系統與機械手臂整合平台，建立從影像擷取到結果管理的完整流程。',
      points: [
        '整合工業相機、機械手臂與 AI 模型',
        '建立校正、推論、任務管理與結果呈現介面',
        '支援台灣與墨西哥工廠導入、測試與問題排除',
      ],
    },
    {
      eyebrow: 'Project 02',
      title: '單元動作分析系統',
      body: '透過電腦視覺分析作業人員動作與生產流程，將影像分析結果轉換為可視化資訊。',
      points: [
        '建立工時分析與作業監控機制',
        '協助製造單位提升產線效率',
        '專案成果後續申請相關專利技術',
      ],
    },
    {
      eyebrow: 'Project 03',
      title: 'Digital Twin 與製造模擬',
      body: '協助建立虛擬工廠與製程模擬驗證工具，讓使用者在設備導入前進行方案評估。',
      points: [
        '開發模擬系統操作介面',
        '建立資料視覺化與結果比較功能',
        '支援產線規劃與製程優化分析',
      ],
    },
    {
      eyebrow: 'UI / Workflow',
      title: '我重視操作流程，不只完成畫面',
      columns: [
        {
          title: '前端架構',
          body: 'React、Next.js、TypeScript，建立可維護的應用介面。',
        },
        {
          title: '資料視覺化',
          body: '把檢測、監控與分析資料整理成使用者能判斷的資訊。',
        },
        {
          title: '系統整合',
          body: '串接 REST API、資料管理、設備狀態與報表流程。',
        },
      ],
    },
    {
      eyebrow: 'Deployment',
      title: '具備跨國工廠導入經驗',
      body: '參與台灣、中國及墨西哥製造據點的 AI 與自動化系統導入。',
      points: [
        '設備安裝與系統測試',
        '現場驗證與使用者教育訓練',
        '跨國團隊協作與技術問題排除',
      ],
    },
    {
      eyebrow: 'Skills',
      title: '技術能力',
      columns: [
        {
          title: 'Software',
          body: 'TypeScript, JavaScript, Python, React, Next.js, Node.js, SQL, REST API',
        },
        {
          title: 'AI / Manufacturing',
          body: 'Computer Vision, AI Visual Inspection, Motion Analysis, Robot Integration, Digital Twin',
        },
        {
          title: 'System',
          body: 'Docker, Kubernetes, Linux, Git',
        },
      ],
    },
    {
      eyebrow: 'What I Bring',
      title: '我能帶來的價值',
      points: [
        '把現場需求整理成清楚的系統流程',
        '把 AI、設備與資料整合成可操作的產品',
        '用使用者角度改善導入效率與維護成本',
        '在跨部門與跨國團隊中推動專案落地',
      ],
    },
    {
      eyebrow: 'Thank You',
      title: '期待更深入交流',
      body: 'Ryan Zheng / 鄭聖玄',
      points: ['Email: ryanzheng1998@gmail.com'],
    },
  ],
  en: [
    {
      eyebrow: 'Ryan Zheng / 鄭聖玄',
      title: 'Software Engineer',
      body: '5+ years of experience building digital manufacturing, automation, and AI application systems.',
      points: [
        'AI visual inspection and robot integration',
        'Motion analysis and work-time analytics',
        'Digital twin and manufacturing simulation',
        'Frontend architecture, workflow design, and on-site deployment',
      ],
      footer: 'ryanzheng1998@gmail.com',
    },
    {
      eyebrow: 'Positioning',
      title: 'I turn complex technology into systems people can use on-site',
      columns: [
        {
          title: 'Understand',
          body: 'Clarify operating workflows, data needs, and real factory constraints with users.',
        },
        {
          title: 'Design',
          body: 'Plan interface flows, data views, equipment controls, and system integration.',
        },
        {
          title: 'Deploy',
          body: 'Support testing, validation, user training, troubleshooting, and multi-site rollout.',
        },
      ],
    },
    {
      eyebrow: 'Project 01',
      title: 'AI Visual Inspection and Automation Platform',
      body: 'Built inspection flows from image capture through calibration, inference, and result management.',
      points: [
        'Integrated industrial cameras, robotic arms, and AI models',
        'Built task management, equipment control, and result interfaces',
        'Supported Taiwan and Mexico factory deployment and troubleshooting',
      ],
    },
    {
      eyebrow: 'Project 02',
      title: 'Motion Analysis System',
      body: 'Used computer vision to analyze operator motion and production workflows, turning video analysis into visualized operational data.',
      points: [
        'Built work-time analysis and process monitoring',
        'Helped manufacturing teams improve line efficiency',
        'Project outcomes later supported related patent applications',
      ],
    },
    {
      eyebrow: 'Project 03',
      title: 'Digital Twin and Manufacturing Simulation',
      body: 'Helped build virtual factory and process simulation tools for pre-deployment evaluation.',
      points: [
        'Developed simulation operation interfaces',
        'Built visualization and comparison views',
        'Supported line planning and process optimization analysis',
      ],
    },
    {
      eyebrow: 'UI / Workflow',
      title: 'I care about workflows, not only screens',
      columns: [
        {
          title: 'Frontend',
          body: 'React, Next.js, and TypeScript for maintainable application interfaces.',
        },
        {
          title: 'Visualization',
          body: 'Turn inspection, monitoring, and analysis results into useful decision data.',
        },
        {
          title: 'Integration',
          body: 'Connect REST APIs, data management, equipment status, and reporting workflows.',
        },
      ],
    },
    {
      eyebrow: 'Deployment',
      title: 'Multi-site factory deployment experience',
      body: 'Joined AI and automation system deployments across Taiwan, China, and Mexico.',
      points: [
        'Equipment setup and system testing',
        'On-site validation and user training',
        'Cross-site collaboration and technical troubleshooting',
      ],
    },
    {
      eyebrow: 'Skills',
      title: 'Technical Capabilities',
      columns: [
        {
          title: 'Software',
          body: 'TypeScript, JavaScript, Python, React, Next.js, Node.js, SQL, REST API',
        },
        {
          title: 'AI / Manufacturing',
          body: 'Computer Vision, AI Visual Inspection, Motion Analysis, Robot Integration, Digital Twin',
        },
        {
          title: 'System',
          body: 'Docker, Kubernetes, Linux, Git',
        },
      ],
    },
    {
      eyebrow: 'What I Bring',
      title: 'The value I can bring',
      points: [
        'Translate on-site needs into clear system workflows',
        'Integrate AI, equipment, and data into usable products',
        'Improve adoption and maintainability from a user perspective',
        'Help cross-functional and global teams land projects',
      ],
    },
    {
      eyebrow: 'Thank You',
      title: 'Looking forward to talking more',
      body: 'Ryan Zheng / 鄭聖玄',
      points: ['Email: ryanzheng1998@gmail.com'],
    },
  ],
} satisfies Record<Locale, Slide[]>

export default function InterviewPage() {
  const params = useParams<{ locale: string }>()
  const localeParam = params.locale

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const localizedSlides = slides[locale]
  const [index, setIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const deckRef = useRef<HTMLElement>(null)

  const currentSlide = localizedSlides[index] ?? localizedSlides[0]!
  const progress = useMemo(
    () => ((index + 1) / localizedSlides.length) * 100,
    [index, localizedSlides.length],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        setIndex((value) => Math.min(value + 1, localizedSlides.length - 1))
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        setIndex((value) => Math.max(value - 1, 0))
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [localizedSlides.length])

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === deckRef.current)
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
    }
  }, [])

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    await deckRef.current?.requestFullscreen()
  }

  return (
    <main className="min-h-screen bg-neutral-950 p-4 font-sans text-neutral-950 sm:p-6">
      <section
        ref={deckRef}
        className="interview-deck mx-auto flex aspect-video max-h-[calc(100vh-48px)] max-w-7xl flex-col overflow-hidden rounded-lg bg-stone-50 shadow-2xl shadow-black/40"
      >
        <div className="h-1 bg-neutral-200">
          <div
            className="h-full bg-teal-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <article
          className="flex flex-1 cursor-pointer flex-col px-12 py-10 sm:px-16 lg:px-20 lg:py-14"
          onClick={() => {
            setIndex((value) => Math.min(value + 1, localizedSlides.length - 1))
          }}
        >
          <header>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              {currentSlide.eyebrow}
            </p>
            <h1 className="mt-4 max-w-5xl text-4xl font-bold leading-tight tracking-tight text-neutral-950 lg:text-6xl">
              {currentSlide.title}
            </h1>
            {currentSlide.body && (
              <p className="mt-5 max-w-4xl text-xl leading-8 text-neutral-700 lg:text-2xl lg:leading-9">
                {currentSlide.body}
              </p>
            )}
          </header>

          <div className="mt-10 flex flex-1 items-center">
            {currentSlide.columns ? (
              <div className="grid w-full grid-cols-3 gap-5">
                {currentSlide.columns.map((column) => (
                  <section
                    key={column.title}
                    className="min-h-48 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
                  >
                    <h2 className="text-2xl font-bold text-neutral-950">
                      {column.title}
                    </h2>
                    <p className="mt-4 text-lg leading-7 text-neutral-700">
                      {column.body}
                    </p>
                  </section>
                ))}
              </div>
            ) : (
              <ul className="grid w-full gap-4">
                {currentSlide.points?.map((point) => (
                  <li
                    key={point}
                    className="border-l-4 border-teal-600 bg-white px-6 py-4 text-2xl font-semibold leading-8 text-neutral-900 shadow-sm"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <footer className="mt-8 flex items-center justify-between text-sm font-semibold text-neutral-500">
            <span>{currentSlide.footer ?? 'Ryan Zheng'}</span>
            <span>
              {index + 1} / {localizedSlides.length}
            </span>
          </footer>
        </article>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-t border-neutral-200 bg-white/95 px-5 py-3 shadow-[0_-10px_30px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIndex((value) => Math.max(value - 1, 0))
              }}
              aria-label="Previous slide"
              title="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-35"
              disabled={index === 0}
            >
              <ArrowLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => {
                setIndex((value) =>
                  Math.min(value + 1, localizedSlides.length - 1),
                )
              }}
              aria-label="Next slide"
              title="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-950 text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-35"
              disabled={index === localizedSlides.length - 1}
            >
              <ArrowRightIcon />
            </button>
          </div>

          <div className="flex min-w-48 items-center justify-center gap-3 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-semibold text-neutral-600">
            <span className="text-neutral-950">{index + 1}</span>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-teal-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>{localizedSlides.length}</span>
          </div>

          <div className="flex items-center justify-end gap-2">
            <a
              href={`/${locale}/resume`}
              title="Resume"
              className="flex h-10 items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 text-sm font-semibold text-neutral-700 transition hover:border-blue-500 hover:text-blue-700"
            >
              <DocumentIcon />
              Resume
            </a>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-950"
            >
              {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  )
}

function MaximizeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  )
}

function MinimizeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  )
}
