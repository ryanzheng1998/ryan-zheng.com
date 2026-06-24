'use client'

import { isLocale, type Locale } from '@/content/locales'
import { notFound, useParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

type Stage = {
  title: string
  responsibility: string
  scope: string
}

type Slide = {
  kind:
    | 'intro'
    | 'timeline'
    | 'workflow'
    | 'architecture'
    | 'integration'
    | 'deployment'
    | 'capability'
    | 'delta'
  title: string
  eyebrow: string
  subtitle?: string
  facts?: string[]
  stages?: Stage[]
  labels?: string[]
  responsibilities?: string[]
  technicalAreas?: string[]
  applications?: string[]
  components?: string[]
  matrix?: Array<{ title: string; items: string[] }>
  notes: string
}

const zhDeck: Slide[] = [
  {
    kind: 'intro',
    eyebrow: '',
    title: '鄭聖玄 Ryan Zheng',
    subtitle: '軟體工程師',
    facts: [
      '國立臺南大學 計算機工程學系',
      '緯創資通 軟體工程師',
      '5 年軟體開發經驗',
    ],
    technicalAreas: ['前端開發', '系統整合', '製造自動化', 'AI 應用'],
    notes:
      '本頁用於快速建立背景資訊。說明教育背景、目前職務與主要技術範圍，重點放在軟體開發、系統整合、製造自動化與 AI 應用，不延伸個人動機或主觀描述。',
  },
  {
    kind: 'timeline',
    eyebrow: '職涯發展',
    title: '職涯發展',
    stages: [
      {
        title: '資訊工程',
        responsibility: '資訊工程基礎訓練',
        scope: '程式設計、資料結構、系統概念',
      },
      {
        title: '前端開發',
        responsibility: '應用系統介面開發',
        scope: 'React / TypeScript / 操作流程',
      },
      {
        title: '後端與雲端服務',
        responsibility: 'API 與資料流程串接',
        scope: 'REST API / Node.js / Python',
      },
      {
        title: '動作分析系統',
        responsibility: '動作分析與資料視覺化',
        scope: 'Pose Estimation / Dashboard',
      },
      {
        title: 'AI 檢測系統',
        responsibility: 'AI 檢測平台整合',
        scope: 'Camera / AI Model / Inspection Engine',
      },
      {
        title: '工廠自動化與導入',
        responsibility: '產線導入與海外部署',
        scope: 'Robot Integration / Factory Validation',
      },
    ],
    notes:
      '本頁說明職涯責任範圍的擴展。從軟體開發開始，逐步接觸資料服務、電腦視覺、AI 檢測、設備整合與工廠導入。重點是系統複雜度與部署責任逐步增加。',
  },
  {
    kind: 'workflow',
    eyebrow: '系統案例',
    title: '動作分析系統（Motion Analysis）',
    subtitle: '將人工觀察轉換為可量化、可視覺化的動作分析流程。',
    facts: [
      '傳統動作評估依賴人工觀察',
      '動作品質不易量化',
      '分析結果需要資料視覺化支援',
    ],
    labels: ['相機影像輸入', '人體姿態估測', '動作分析引擎', '視覺化儀表板'],
    responsibilities: ['前端開發', '資料視覺化', '流程設計', '系統整合'],
    technicalAreas: ['電腦視覺', '姿態估測', '資料分析', 'Web 應用程式'],
    notes:
      '本頁說明 Motion Analysis 專案。問題來自人工觀察不易量化，因此系統流程包含影像輸入、人體姿態估測、動作分析引擎與視覺化介面。負責範圍包含前端、資料呈現、流程設計與系統整合。',
  },
  {
    kind: 'architecture',
    eyebrow: '核心 AI 系統',
    title: 'AI 視覺檢測平台',
    subtitle: '端到端檢測流程：從工業相機、AI 模型到操作人員介面。',
    labels: ['工業相機', 'AI 模型', '檢測引擎', 'Web 平台', '操作人員'],
    responsibilities: [
      '前端開發',
      '流程設計',
      'AI 整合',
      '系統整合',
      '導入支援',
    ],
    applications: ['視覺檢測', '瑕疵偵測', '製造自動化'],
    notes:
      '本頁是核心專案頁。說明 AI 視覺檢測平台的端到端架構，資料從工業相機進入 AI 模型，經由檢測引擎處理後，在 Web 平台呈現給操作人員。強調負責範圍包含 AI 整合、流程設計、系統整合與部署支援。',
  },
  {
    kind: 'integration',
    eyebrow: '設備整合',
    title: '機械手臂整合系統',
    subtitle: '整合機械手臂、工業相機、AI 檢測引擎與控制平台。',
    components: ['機械手臂', '工業相機', 'AI 檢測引擎', '控制平台'],
    responsibilities: ['流程開發', '設備整合', '使用者介面開發', '產線測試'],
    facts: ['機械手臂整合', '相機整合', '檢測流程', '設備通訊'],
    notes:
      '本頁說明設備整合範圍。系統不只包含軟體介面，也涵蓋機械手臂、相機與 AI 檢測引擎之間的流程串接。說明責任包含流程開發、設備整合、介面開發與產線測試。',
  },
  {
    kind: 'deployment',
    eyebrow: '工廠導入',
    title: '產線導入與海外部署',
    subtitle: '參與 A1 Production Line 與 WMX Mexico Factory 相關導入工作。',
    labels: ['開發', '測試', '量產', '海外部署'],
    responsibilities: ['系統驗證', '產線導入', '工廠測試', '跨部門協作'],
    applications: ['AI 檢測系統', '機械手臂整合', '製造流程'],
    notes:
      '本頁強調真實工廠導入經驗。說明專案從開發、測試、產線上線到海外部署的流程，並列出 A1 Production Line 與 WMX Mexico Factory。重點放在驗證、導入、工廠測試與跨部門協作。',
  },
  {
    kind: 'capability',
    eyebrow: '技術範圍',
    title: '技術能力範圍',
    matrix: [
      {
        title: '前端',
        items: ['React', 'TypeScript', 'JavaScript'],
      },
      {
        title: '後端',
        items: ['Python', 'REST API', 'Node.js'],
      },
      {
        title: 'AI 與電腦視覺',
        items: ['姿態估測', '影像處理', '瑕疵偵測'],
      },
      {
        title: '工業系統',
        items: ['機械手臂整合', '製造自動化', '產線系統'],
      },
      {
        title: '基礎設施',
        items: ['Linux', 'Docker', '部署'],
      },
    ],
    notes:
      '本頁用能力矩陣呈現技術範圍。從前端、後端、AI 與 Computer Vision，到工業系統與部署環境。此頁可用於讓技術主管快速定位可追問的技術區域。',
  },
  {
    kind: 'delta',
    eyebrow: 'Delta Electronics',
    title: '加入台達的原因',
    subtitle:
      '將既有軟體開發、系統整合與智慧製造經驗，應用於更大規模的工業自動化與軟體開發專案。',
    matrix: [
      {
        title: '既有經驗',
        items: ['軟體開發', 'AI 應用', '系統整合', '製造導入'],
      },
      {
        title: '台達場景',
        items: ['工業自動化', '智慧製造', '大型工業系統', '跨領域工程'],
      },
      {
        title: '可投入方向',
        items: ['系統開發', '設備整合', '工業資料流程', '量產導入支援'],
      },
    ],
    notes:
      '本頁以事實連結台達職缺方向。說明既有經驗包含軟體開發、AI 應用、系統整合與製造導入；台達提供工業自動化、智慧製造與大型工業系統場景。結尾使用提供的客觀陳述，不加入個人哲學或抽象動機。',
  },
]

const enDeck: Slide[] = [
  {
    kind: 'intro',
    eyebrow: '',
    title: 'Ryan Zheng',
    subtitle: 'Software Engineer',
    facts: [
      'National University of Tainan, Computer Science and Information Engineering',
      'Software Engineer @ Wistron',
      '5 years software development experience',
    ],
    technicalAreas: [
      'Frontend Development',
      'System Integration',
      'Manufacturing Automation',
      'AI Applications',
    ],
    notes:
      'This slide establishes the candidate background. Cover education, current role, and primary technical areas. Keep the focus on software development, system integration, manufacturing automation, and AI applications.',
  },
  {
    kind: 'timeline',
    eyebrow: 'Career Development',
    title: 'Career Development',
    stages: [
      {
        title: 'Computer Engineering',
        responsibility: 'Computer engineering foundation',
        scope: 'Programming, data structures, system concepts',
      },
      {
        title: 'Frontend Development',
        responsibility: 'Application interface development',
        scope: 'React / TypeScript / operating workflows',
      },
      {
        title: 'Backend & Cloud Services',
        responsibility: 'API and data-flow integration',
        scope: 'REST API / Node.js / Python',
      },
      {
        title: 'Motion Analysis Systems',
        responsibility: 'Motion analytics and visualization',
        scope: 'Pose Estimation / Dashboard',
      },
      {
        title: 'AI Inspection Systems',
        responsibility: 'AI inspection platform integration',
        scope: 'Camera / AI Model / Inspection Engine',
      },
      {
        title: 'Factory Automation & Deployment',
        responsibility: 'Production-line and overseas deployment',
        scope: 'Robot Integration / Factory Validation',
      },
    ],
    notes:
      'This slide describes the expansion of responsibilities. The progression starts from software development and moves into data services, computer vision, AI inspection, equipment integration, and factory deployment.',
  },
  {
    kind: 'workflow',
    eyebrow: 'System Case',
    title: 'Motion Analysis System',
    subtitle:
      'A workflow for converting manual observation into measurable and visualized motion analysis.',
    facts: [
      'Traditional motion assessment relied on manual observation',
      'Movement quality was difficult to quantify',
      'Analysis results required data visualization support',
    ],
    labels: [
      'Camera Input',
      'Human Pose Estimation',
      'Motion Analysis Engine',
      'Visualization Dashboard',
    ],
    responsibilities: [
      'Frontend Development',
      'Data Visualization',
      'Workflow Design',
      'System Integration',
    ],
    technicalAreas: [
      'Computer Vision',
      'Pose Estimation',
      'Data Analytics',
      'Web Applications',
    ],
    notes:
      'This slide explains the Motion Analysis project. The system workflow includes camera input, human pose estimation, a motion analysis engine, and a visualization dashboard. The responsibility scope included frontend development, data presentation, workflow design, and system integration.',
  },
  {
    kind: 'architecture',
    eyebrow: 'Core AI System',
    title: 'AI Visual Inspection Platform',
    subtitle:
      'End-to-end inspection flow from industrial camera and AI model to operator interface.',
    labels: [
      'Industrial Camera',
      'AI Model',
      'Inspection Engine',
      'Web Platform',
      'Operator',
    ],
    responsibilities: [
      'Frontend Development',
      'Workflow Design',
      'AI Integration',
      'System Integration',
      'Deployment Support',
    ],
    applications: [
      'Visual Inspection',
      'Defect Detection',
      'Manufacturing Automation',
    ],
    notes:
      'This is a core project slide. Explain the end-to-end AI inspection architecture: image data enters from the industrial camera, is processed by the AI model and inspection engine, and is presented to operators through the web platform.',
  },
  {
    kind: 'integration',
    eyebrow: 'Equipment Integration',
    title: 'Robot Integration System',
    subtitle:
      'Integration of robot arm, industrial camera, AI inspection engine, and control platform.',
    components: [
      'Robot Arm',
      'Industrial Camera',
      'AI Inspection Engine',
      'Control Platform',
    ],
    responsibilities: [
      'Workflow Development',
      'Device Integration',
      'User Interface Development',
      'Production Testing',
    ],
    facts: [
      'Robot Arm Integration',
      'Camera Integration',
      'Inspection Workflow',
      'Equipment Communication',
    ],
    notes:
      'This slide explains the equipment integration scope. The system was not only a software interface; it also connected robot arm workflow, camera input, AI inspection, and control platform behavior.',
  },
  {
    kind: 'deployment',
    eyebrow: 'Factory Deployment',
    title: 'Production Line and Overseas Deployment',
    subtitle:
      'Deployment participation for A1 Production Line and WMX Mexico Factory.',
    labels: ['Development', 'Testing', 'Production', 'Overseas Deployment'],
    responsibilities: [
      'System Validation',
      'Production Deployment',
      'Factory Testing',
      'Cross-functional Collaboration',
    ],
    applications: [
      'AI Inspection Systems',
      'Robot Integration',
      'Manufacturing Workflows',
    ],
    notes:
      'This slide emphasizes real-world factory deployment experience. Walk through the path from development to testing, production, and overseas deployment, with emphasis on validation, factory testing, and cross-functional collaboration.',
  },
  {
    kind: 'capability',
    eyebrow: 'Technical Scope',
    title: 'Technical Scope',
    matrix: [
      {
        title: 'Frontend',
        items: ['React', 'TypeScript', 'JavaScript'],
      },
      {
        title: 'Backend',
        items: ['Python', 'REST API', 'Node.js'],
      },
      {
        title: 'AI & Computer Vision',
        items: ['Pose Estimation', 'Image Processing', 'Defect Detection'],
      },
      {
        title: 'Industrial Systems',
        items: [
          'Robot Integration',
          'Manufacturing Automation',
          'Production Systems',
        ],
      },
      {
        title: 'Infrastructure',
        items: ['Linux', 'Docker', 'Deployment'],
      },
    ],
    notes:
      'This slide presents the technical capability matrix. It covers frontend, backend, AI and computer vision, industrial systems, and deployment infrastructure.',
  },
  {
    kind: 'delta',
    eyebrow: 'Delta Electronics',
    title: 'Why Delta',
    subtitle:
      'Apply existing software development, system integration, and smart manufacturing experience to larger-scale industrial automation and software engineering projects.',
    matrix: [
      {
        title: 'Current Experience',
        items: [
          'Software Development',
          'AI Applications',
          'System Integration',
          'Manufacturing Deployment',
        ],
      },
      {
        title: 'Delta Opportunities',
        items: [
          'Industrial Automation',
          'Smart Manufacturing',
          'Large-scale Industrial Systems',
          'Cross-domain Engineering',
        ],
      },
      {
        title: 'Future Contribution',
        items: [
          'System Development',
          'Equipment Integration',
          'Industrial Data Flow',
          'Production Deployment Support',
        ],
      },
    ],
    notes:
      'This slide connects the candidate experience to Delta Electronics objectively. Existing experience includes software development, AI applications, system integration, and manufacturing deployment; Delta offers industrial automation, smart manufacturing, and large-scale industrial system contexts.',
  },
]

const slides = {
  zh: zhDeck,
  en: enDeck,
} satisfies Record<Locale, Slide[]>

const uiLabels = {
  zh: {
    professionalSummary: '專業摘要',
    problem: '問題背景',
    responsibilities: '負責項目',
    technicalAreas: '技術範圍',
    applications: '應用範圍',
    scope: '整合範圍',
    projects: '導入專案',
    deploymentScope: '導入範圍',
    speakerNotes: '講者備註',
    footer: '台達電子 / Software Engineer 面試簡報',
    resume: '履歷',
    notes: '備註',
    previousSlide: '上一頁',
    nextSlide: '下一頁',
    enterFullscreen: '進入全螢幕',
    exitFullscreen: '離開全螢幕',
  },
  en: {
    professionalSummary: 'Professional Summary',
    problem: 'Problem',
    responsibilities: 'Responsibilities',
    technicalAreas: 'Technical Areas',
    applications: 'Applications',
    scope: 'Scope',
    projects: 'Projects',
    deploymentScope: 'Deployment Scope',
    speakerNotes: 'Speaker Notes',
    footer: 'Delta Electronics / Software Engineer Interview',
    resume: 'Resume',
    notes: 'Notes',
    previousSlide: 'Previous slide',
    nextSlide: 'Next slide',
    enterFullscreen: 'Enter fullscreen',
    exitFullscreen: 'Exit fullscreen',
  },
} satisfies Record<Locale, Record<string, string>>

export default function InterviewPage() {
  const params = useParams<{ locale: string }>()
  const localeParam = params.locale

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const localizedSlides = slides[locale]
  const labels = uiLabels[locale]
  const [index, setIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
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

      if (event.key.toLowerCase() === 'n') {
        setShowNotes((value) => !value)
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
    <main className="min-h-screen bg-[#0b1f3a] p-4 font-sans text-slate-950 sm:p-6">
      <section
        ref={deckRef}
        className="interview-deck relative mx-auto flex aspect-video max-h-[calc(100vh-48px)] max-w-7xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl shadow-black/40"
      >
        <div className="h-1.5 bg-slate-200">
          <div
            className="h-full bg-[#0072bc] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <article
          className="relative flex flex-1 cursor-pointer flex-col overflow-hidden px-10 py-7 sm:px-14 lg:px-16 lg:py-9"
          onClick={() => {
            setIndex((value) => Math.min(value + 1, localizedSlides.length - 1))
          }}
        >
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-sky-50 to-transparent" />
          <Header slide={currentSlide} />
          <SlideVisual slide={currentSlide} locale={locale} />
          <footer className="relative z-10 mt-3 flex items-center justify-between text-sm font-semibold text-slate-500">
            <span>{labels.footer}</span>
            <span>
              {index + 1} / {localizedSlides.length}
            </span>
          </footer>
        </article>

        {showNotes && (
          <aside className="absolute bottom-[65px] left-6 right-6 z-30 rounded-lg border border-slate-200 bg-white/95 px-6 py-4 text-sm leading-6 text-slate-700 shadow-xl shadow-slate-950/10 backdrop-blur">
            <span className="mr-2 font-bold text-[#0072bc]">
              {labels.speakerNotes}
            </span>
            {currentSlide.notes}
          </aside>
        )}

        <Toolbar
          index={index}
          total={localizedSlides.length}
          locale={locale}
          progress={progress}
          isFullscreen={isFullscreen}
          labels={labels}
          showNotes={showNotes}
          onPrevious={() => {
            setIndex((value) => Math.max(value - 1, 0))
          }}
          onNext={() => {
            setIndex((value) => Math.min(value + 1, localizedSlides.length - 1))
          }}
          onToggleFullscreen={toggleFullscreen}
          onToggleNotes={() => {
            setShowNotes((value) => !value)
          }}
        />
      </section>
    </main>
  )
}

function Header({ slide }: { slide: Slide }) {
  return (
    <header className="relative z-10">
      {slide.eyebrow && (
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0072bc]">
          {slide.eyebrow}
        </p>
      )}
      <h1 className="mt-2 max-w-5xl text-4xl font-bold leading-tight tracking-tight text-slate-950 lg:text-5xl">
        {slide.title}
      </h1>
      {slide.subtitle && (
        <p className="mt-3 max-w-4xl text-lg font-medium leading-7 text-slate-600 lg:text-xl lg:leading-8">
          {slide.subtitle}
        </p>
      )}
    </header>
  )
}

function SlideVisual({ slide, locale }: { slide: Slide; locale: Locale }) {
  switch (slide.kind) {
    case 'intro':
      return <IntroSlide slide={slide} locale={locale} />
    case 'timeline':
      return <TimelineSlide slide={slide} />
    case 'workflow':
      return <WorkflowSlide slide={slide} locale={locale} />
    case 'architecture':
      return <ArchitectureSlide slide={slide} locale={locale} emphasized />
    case 'integration':
      return <IntegrationSlide slide={slide} locale={locale} />
    case 'deployment':
      return <DeploymentSlide slide={slide} locale={locale} />
    case 'capability':
      return <CapabilitySlide slide={slide} />
    case 'delta':
      return <DeltaSlide slide={slide} />
  }
}

function IntroSlide({ slide, locale }: { slide: Slide; locale: Locale }) {
  const labels = uiLabels[locale]

  return (
    <div className="relative z-10 mt-7 grid flex-1 grid-cols-[1fr_0.85fr] items-center gap-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">
          {labels.professionalSummary}
        </h2>
        <ul className="mt-4 grid gap-3">
          {slide.facts?.map((fact) => (
            <li
              key={fact}
              className="border-l-4 border-[#0072bc] bg-slate-50 px-4 py-3 text-lg font-semibold text-slate-800"
            >
              {fact}
            </li>
          ))}
        </ul>
      </section>
      <section className="grid gap-3">
        {slide.technicalAreas?.map((area) => (
          <div
            key={area}
            className="rounded-lg bg-[#0b3d73] px-5 py-4 text-lg font-bold text-white shadow-sm"
          >
            {area}
          </div>
        ))}
      </section>
    </div>
  )
}

function TimelineSlide({ slide }: { slide: Slide }) {
  return (
    <div className="relative z-10 mt-7 flex flex-1 items-center">
      <div className="grid w-full grid-cols-6 gap-3">
        {slide.stages?.map((stage, stageIndex) => (
          <section key={stage.title} className="relative">
            {stageIndex < (slide.stages?.length ?? 0) - 1 && (
              <div className="absolute left-[55%] top-7 h-0.5 w-[90%] bg-[#0072bc]" />
            )}
            <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#0072bc] text-lg font-bold text-white">
              {stageIndex + 1}
            </div>
            <div className="mt-4 min-h-44 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <h2 className="text-base font-bold text-slate-950">
                {stage.title}
              </h2>
              <p className="mt-3 text-xs font-semibold text-[#0072bc]">
                {stage.responsibility}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                {stage.scope}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function WorkflowSlide({ slide, locale }: { slide: Slide; locale: Locale }) {
  const labels = uiLabels[locale]

  return (
    <div className="relative z-10 mt-6 grid flex-1 grid-cols-[1.05fr_0.95fr] gap-6">
      <section className="flex items-center">
        <Flow labels={slide.labels ?? []} />
      </section>
      <section className="grid content-center gap-3">
        <InfoBlock title={labels.problem} items={slide.facts ?? []} />
        <InfoBlock
          title={labels.responsibilities}
          items={slide.responsibilities ?? []}
        />
        <InfoBlock
          title={labels.technicalAreas}
          items={slide.technicalAreas ?? []}
        />
      </section>
    </div>
  )
}

function ArchitectureSlide({
  slide,
  locale,
  emphasized = false,
}: {
  slide: Slide
  locale: Locale
  emphasized?: boolean
}) {
  const labels = uiLabels[locale]

  return (
    <div className="relative z-10 mt-6 grid flex-1 grid-cols-[1.35fr_0.75fr] gap-6">
      <section className="flex items-center rounded-lg bg-slate-50 p-5">
        <Flow labels={slide.labels ?? []} large={emphasized} />
      </section>
      <section className="grid content-center gap-3">
        <InfoBlock
          title={labels.responsibilities}
          items={slide.responsibilities ?? []}
        />
        <InfoBlock
          title={labels.applications}
          items={slide.applications ?? []}
        />
      </section>
    </div>
  )
}

function IntegrationSlide({ slide, locale }: { slide: Slide; locale: Locale }) {
  const labels = uiLabels[locale]
  const centerComponent = slide.components?.[3] ?? 'Control Platform'

  return (
    <div className="relative z-10 mt-6 grid flex-1 grid-cols-[1fr_1fr] gap-6">
      <section className="relative flex items-center justify-center rounded-lg bg-slate-50 p-6">
        <div className="absolute h-40 w-40 rounded-full border-2 border-dashed border-[#0072bc]" />
        <div className="z-10 rounded-lg bg-[#0b3d73] px-5 py-4 text-lg font-bold text-white shadow-lg">
          {centerComponent}
        </div>
        {slide.components
          ?.filter((component) => component !== centerComponent)
          .map((component, componentIndex) => (
            <div
              key={component}
              className={[
                'absolute rounded-lg border border-slate-200 bg-white px-4 py-3 text-center text-base font-bold text-slate-800 shadow-sm',
                componentIndex === 0 && 'left-6 top-6',
                componentIndex === 1 && 'right-6 top-6',
                componentIndex === 2 && 'bottom-6 left-1/2 -translate-x-1/2',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {component}
            </div>
          ))}
      </section>
      <section className="grid content-center gap-3">
        <InfoBlock title={labels.scope} items={slide.facts ?? []} />
        <InfoBlock
          title={labels.responsibilities}
          items={slide.responsibilities ?? []}
        />
      </section>
    </div>
  )
}

function DeploymentSlide({ slide, locale }: { slide: Slide; locale: Locale }) {
  const labels = uiLabels[locale]

  return (
    <div className="relative z-10 mt-6 grid flex-1 grid-cols-[1.2fr_0.8fr] gap-6">
      <section className="flex items-center">
        <Flow labels={slide.labels ?? []} large />
      </section>
      <section className="grid content-center gap-3">
        <InfoBlock
          title={labels.projects}
          items={['A1 Production Line', 'WMX Mexico Factory']}
        />
        <InfoBlock
          title={labels.responsibilities}
          items={slide.responsibilities ?? []}
        />
        <InfoBlock
          title={labels.deploymentScope}
          items={slide.applications ?? []}
        />
      </section>
    </div>
  )
}

function CapabilitySlide({ slide }: { slide: Slide }) {
  return (
    <div className="relative z-10 mt-6 grid flex-1 grid-cols-5 gap-3">
      {slide.matrix?.map((group) => (
        <section
          key={group.title}
          className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          <h2 className="text-lg font-bold text-[#0b3d73]">{group.title}</h2>
          <div className="mt-4 grid gap-2">
            {group.items.map((item) => (
              <p
                key={item}
                className="rounded-md bg-slate-50 px-3 py-2.5 text-sm font-semibold leading-5 text-slate-700"
              >
                {item}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function DeltaSlide({ slide }: { slide: Slide }) {
  return (
    <div className="relative z-10 mt-6 flex flex-1 flex-col justify-center gap-6">
      <div className="grid grid-cols-3 items-stretch gap-4">
        {slide.matrix?.map((group, groupIndex) => (
          <section
            key={group.title}
            className="relative rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            {groupIndex < 2 && (
              <div className="absolute -right-5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0072bc] text-white">
                <ArrowRightIcon />
              </div>
            )}
            <h2 className="text-xl font-bold text-[#0b3d73]">{group.title}</h2>
            <ul className="mt-4 grid gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-base font-semibold text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="rounded-lg bg-[#0b3d73] px-6 py-5 text-xl font-bold leading-8 text-white">
        {slide.subtitle}
      </p>
    </div>
  )
}

function Flow({
  labels,
  large = false,
}: {
  labels: string[]
  large?: boolean
}) {
  return (
    <div className="flex w-full items-center gap-2">
      {labels.map((label, labelIndex) => (
        <div key={label} className="flex min-w-0 flex-1 items-center gap-2">
          <div
            className={`flex min-h-24 flex-1 items-center justify-center rounded-lg border border-slate-200 bg-white p-3 text-center font-bold leading-snug text-slate-800 shadow-sm ${
              large ? 'text-base' : 'text-sm'
            }`}
          >
            {label}
          </div>
          {labelIndex < labels.length - 1 && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0072bc] text-white">
              <ArrowRightIcon />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-bold text-[#0b3d73]">{title}</h2>
      <ul className="mt-2 grid gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="text-sm font-semibold leading-5 text-slate-700"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

function Toolbar({
  index,
  total,
  locale,
  progress,
  isFullscreen,
  labels,
  showNotes,
  onPrevious,
  onNext,
  onToggleFullscreen,
  onToggleNotes,
}: {
  index: number
  total: number
  locale: Locale
  progress: number
  isFullscreen: boolean
  labels: (typeof uiLabels)[Locale]
  showNotes: boolean
  onPrevious: () => void
  onNext: () => void
  onToggleFullscreen: () => void
  onToggleNotes: () => void
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-t border-slate-200 bg-white/95 px-5 py-3 shadow-[0_-10px_30px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          aria-label={labels.previousSlide}
          title={labels.previousSlide}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 transition hover:border-slate-500 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-35"
          disabled={index === 0}
        >
          <ArrowLeftIcon />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={labels.nextSlide}
          title={labels.nextSlide}
          className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0b3d73] text-white transition hover:bg-[#092f59] disabled:cursor-not-allowed disabled:opacity-35"
          disabled={index === total - 1}
        >
          <ArrowRightIcon />
        </button>
      </div>

      <div className="flex min-w-48 items-center justify-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
        <span className="text-slate-950">{index + 1}</span>
        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[#0072bc] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span>{total}</span>
      </div>

      <div className="flex items-center justify-end gap-2">
        <a
          href={`/${locale}/resume`}
          title={labels.resume}
          className="flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-[#0072bc] hover:text-[#0072bc]"
        >
          <DocumentIcon />
          {labels.resume}
        </a>
        <button
          type="button"
          onClick={onToggleNotes}
          aria-label={labels.notes}
          title={labels.notes}
          className={`flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-semibold transition ${
            showNotes
              ? 'border-[#0072bc] bg-sky-50 text-[#0072bc]'
              : 'border-slate-300 bg-white text-slate-700 hover:border-slate-500'
          }`}
        >
          <NotesIcon />
          {labels.notes}
        </button>
        <button
          type="button"
          onClick={onToggleFullscreen}
          aria-label={
            isFullscreen ? labels.exitFullscreen : labels.enterFullscreen
          }
          title={isFullscreen ? labels.exitFullscreen : labels.enterFullscreen}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
        >
          {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
        </button>
      </div>
    </div>
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

function NotesIcon() {
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
      <path d="M8 6h10" />
      <path d="M8 12h10" />
      <path d="M8 18h6" />
      <path d="M4 6h.01" />
      <path d="M4 12h.01" />
      <path d="M4 18h.01" />
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
