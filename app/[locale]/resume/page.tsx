import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { home } from '@/content/site'
import { isLocale, type Locale } from '@/content/locales'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

type ResumeSection = {
  title: string
  items: string[]
}

const profile = {
  zh: {
    title: '軟體工程師',
    location: 'AI 應用 / 智慧製造 / 自動化系統',
    summary:
      '具備 5 年以上軟體開發經驗，專注於製造業數位化、自動化及 AI 應用系統開發。曾參與 AI 視覺檢測、機械手臂整合、單元動作分析、Digital Twin 及智慧製造專案，具備從需求分析、系統設計、介面開發到現場導入的完整經驗。',
    strengths: [
      '能將複雜技術轉換為可落地的產品與系統',
      '重視使用者體驗、操作流程與資料視覺化',
      '具備台灣、中國及墨西哥製造據點導入經驗',
    ],
    experienceTitle: '工作經歷',
    company: '緯創資通股份有限公司',
    role: '軟體工程師',
    period: '2021 / 04 - 至今',
    sections: [
      {
        title: 'AI 視覺檢測與自動化平台',
        items: [
          '參與 AI 視覺檢測系統與機械手臂整合平台開發。',
          '建立影像擷取、校正、推論與結果管理等完整檢測流程。',
          '整合工業相機、機械手臂與 AI 模型，打造自動化檢測流程。',
          '參與台灣及墨西哥工廠系統導入、測試驗證及問題排除。',
        ],
      },
      {
        title: '單元動作分析系統（Motion Analysis）',
        items: [
          '透過電腦視覺技術分析作業人員動作與生產流程。',
          '建立工時分析與作業監控機制，協助製造單位提升產線效率。',
          '設計分析介面，將影像分析結果轉換為可視化資訊。',
          '專案成果後續申請相關專利技術。',
        ],
      },
      {
        title: 'Digital Twin 與製造模擬系統',
        items: [
          '協助建立虛擬工廠與製程模擬驗證工具。',
          '開發模擬系統操作介面與資料視覺化功能。',
          '支援設備導入前驗證、產線規劃及製程優化分析。',
        ],
      },
      {
        title: '使用者介面與系統流程設計',
        items: [
          '負責多項製造業應用系統之前端架構與介面開發。',
          '與使用者共同梳理需求並設計操作流程。',
          '建立資料管理、流程追蹤、設備監控及報表視覺化功能。',
        ],
      },
      {
        title: '海外工廠專案導入',
        items: [
          '參與台灣、中國及墨西哥工廠 AI 與自動化系統導入專案。',
          '協助設備安裝、系統測試、驗證與使用者教育訓練。',
          '與跨國團隊合作解決現場技術問題並完成專案落地。',
        ],
      },
    ] satisfies ResumeSection[],
    skillsTitle: '專業技能',
    skills: [
      ['程式語言', 'TypeScript, JavaScript, Python, C, C++'],
      ['軟體開發', 'React, Next.js, Node.js, SQL, REST API'],
      [
        'UI 與產品',
        'UI Design, Workflow Design, Data Visualization, 前後端整合',
      ],
      [
        'AI 與智慧製造',
        'Computer Vision, AI Visual Inspection, Motion Analysis, Robot Integration, Digital Twin',
      ],
      ['系統與部署', 'Docker, Kubernetes, Linux, Git'],
    ],
    educationTitle: '學歷',
    education: '國立臺南大學 資訊工程學系 學士',
    educationPeriod: '2016 / 09 - 2020 / 06',
    languageTitle: '語言能力',
    language:
      '中文母語；英文 TOEIC 905，具備技術文件閱讀、跨國會議及工作溝通能力。',
  },
  en: {
    title: 'Software Engineer',
    location: 'AI Applications / Smart Manufacturing / Automation Systems',
    summary:
      'Software engineer with 5+ years of experience building digital manufacturing, automation, and AI application systems. Experienced in AI visual inspection, robot integration, motion analysis, digital twin projects, and smart manufacturing systems from requirements analysis through on-site deployment.',
    strengths: [
      'Turns complex technology into practical products and production-ready systems',
      'Strong focus on user experience, workflow design, and data visualization',
      'Deployment experience across Taiwan, China, and Mexico manufacturing sites',
    ],
    experienceTitle: 'Experience',
    company: 'Wistron Corporation',
    role: 'Software Engineer',
    period: 'Apr 2021 - Present',
    sections: [
      {
        title: 'AI Visual Inspection and Automation Platform',
        items: [
          'Built AI visual inspection systems integrated with robotic automation platforms.',
          'Created inspection workflows for image capture, calibration, inference, and result management.',
          'Integrated industrial cameras, robotic arms, and AI models into automated inspection flows.',
          'Supported deployment, validation, and troubleshooting in Taiwan and Mexico factories.',
        ],
      },
      {
        title: 'Motion Analysis System',
        items: [
          'Developed computer-vision tools to analyze operator motion and production processes.',
          'Built work-time analysis and process monitoring features to improve line efficiency.',
          'Designed dashboards that turned visual analysis results into actionable information.',
          'Project outcomes were later used for related patent applications.',
        ],
      },
      {
        title: 'Digital Twin and Manufacturing Simulation',
        items: [
          'Helped build virtual factory and process simulation validation tools.',
          'Developed operation interfaces and data visualization features for simulation systems.',
          'Supported pre-deployment validation, line planning, and process optimization analysis.',
        ],
      },
      {
        title: 'UI and Workflow Design',
        items: [
          'Owned frontend architecture and interface development for manufacturing applications.',
          'Worked with users to clarify requirements and design operating workflows.',
          'Built data management, process tracking, equipment monitoring, and reporting views.',
        ],
      },
      {
        title: 'Overseas Factory Deployment',
        items: [
          'Joined AI and automation system deployments across Taiwan, China, and Mexico.',
          'Supported equipment setup, system testing, validation, and user training.',
          'Collaborated with global teams to resolve on-site technical issues and complete launches.',
        ],
      },
    ] satisfies ResumeSection[],
    skillsTitle: 'Skills',
    skills: [
      ['Languages', 'TypeScript, JavaScript, Python, C, C++'],
      ['Software', 'React, Next.js, Node.js, SQL, REST API'],
      [
        'Product and UI',
        'UI Design, Workflow Design, Data Visualization, Frontend / Backend Integration',
      ],
      [
        'AI and Manufacturing',
        'Computer Vision, AI Visual Inspection, Motion Analysis, Robot Integration, Digital Twin',
      ],
      ['Systems', 'Docker, Kubernetes, Linux, Git'],
    ],
    educationTitle: 'Education',
    education:
      'National University of Tainan, B.S. in Computer Science and Information Engineering',
    educationPeriod: 'Sep 2016 - Jun 2020',
    languageTitle: 'Languages',
    language:
      'Mandarin Chinese native; English TOEIC 905 with technical reading and cross-site communication ability.',
  },
}

export default async function ResumePage({ params }: Props) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const content = profile[locale]

  return (
    <main className="resume-shell min-h-screen bg-stone-100 px-4 py-6 font-sans text-neutral-900 sm:px-6 sm:py-10">
      <PrintResume content={content} />

      <nav className="resume-nav mx-auto mb-6 flex w-full max-w-[210mm] items-center justify-between">
        <a href={`/${locale}`} className="text-sm font-semibold text-blue-700">
          Ryan Zheng
        </a>
        <div className="flex items-center gap-4 text-sm font-medium text-neutral-600">
          <a href={`/${locale}/projects`} className="hover:text-neutral-950">
            {home[locale].navProjects}
          </a>
          <LanguageSwitcher locale={locale} path="/resume" />
        </div>
      </nav>

      <article className="resume-paper mx-auto w-full max-w-[210mm] rounded-lg border border-neutral-200 bg-white p-6 shadow-xl shadow-neutral-200 sm:p-10">
        <header className="border-b border-neutral-200 pb-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-teal-700">
                {content.title}
              </p>
              <h1 className="mt-2 text-4xl font-bold text-neutral-950">
                鄭聖玄 Ryan Zheng
              </h1>
              <p className="mt-2 text-sm font-medium text-neutral-600">
                {content.location}
              </p>
            </div>
            <div className="text-left text-sm leading-6 text-neutral-700 sm:text-right">
              <a
                href="mailto:ryanzheng1998@gmail.com"
                className="font-semibold text-blue-700"
              >
                ryanzheng1998@gmail.com
              </a>
            </div>
          </div>
          <p className="mt-5 text-[15px] leading-7 text-neutral-700">
            {content.summary}
          </p>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-neutral-700 sm:grid-cols-3">
            {content.strengths.map((strength) => (
              <li key={strength} className="border-l-2 border-teal-600 pl-3">
                {strength}
              </li>
            ))}
          </ul>
        </header>

        <div className="grid gap-8 pt-6 lg:grid-cols-[1.65fr_0.9fr]">
          <section>
            <SectionTitle>{content.experienceTitle}</SectionTitle>
            <div className="mt-3 flex flex-col justify-between gap-1 border-b border-neutral-200 pb-3 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-xl font-bold text-neutral-950">
                  {content.company}
                </h2>
                <p className="text-sm font-semibold text-neutral-700">
                  {content.role}
                </p>
              </div>
              <p className="text-sm font-medium text-neutral-500">
                {content.period}
              </p>
            </div>

            <div className="mt-4 space-y-4">
              {content.sections.map((section) => (
                <section key={section.title}>
                  <h3 className="text-[15px] font-bold text-neutral-950">
                    {section.title}
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-[1.55] text-neutral-700">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section>
              <SectionTitle>{content.skillsTitle}</SectionTitle>
              <dl className="mt-3 space-y-3">
                {content.skills.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-sm font-bold text-neutral-950">
                      {label}
                    </dt>
                    <dd className="mt-1 text-[13px] leading-6 text-neutral-700">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <SectionTitle>{content.educationTitle}</SectionTitle>
              <p className="mt-3 text-sm font-bold leading-6 text-neutral-950">
                {content.education}
              </p>
              <p className="mt-1 text-[13px] font-medium text-neutral-500">
                {content.educationPeriod}
              </p>
            </section>

            <section>
              <SectionTitle>{content.languageTitle}</SectionTitle>
              <p className="mt-3 text-[13px] leading-6 text-neutral-700">
                {content.language}
              </p>
            </section>
          </aside>
        </div>
      </article>
    </main>
  )
}

function PrintResume({ content }: { content: (typeof profile)[Locale] }) {
  return (
    <article className="resume-print">
      <header className="resume-print-header">
        <div>
          <p className="resume-print-role">{content.title}</p>
          <h1>鄭聖玄 Ryan Zheng</h1>
          <p className="resume-print-subtitle">{content.location}</p>
        </div>
        <p className="resume-print-contact">ryanzheng1998@gmail.com</p>
      </header>

      <section className="resume-print-summary">
        <p>{content.summary}</p>
        <ul className="resume-print-strengths">
          {content.strengths.map((strength) => (
            <li key={strength}>{strength}</li>
          ))}
        </ul>
      </section>

      <div className="resume-print-body">
        <section>
          <h2>{content.experienceTitle}</h2>
          <div className="resume-print-job">
            <div>
              <h3>{content.company}</h3>
              <p>{content.role}</p>
            </div>
            <p>{content.period}</p>
          </div>

          {content.sections.map((section) => (
            <section className="resume-print-project" key={section.title}>
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </section>

        <aside className="resume-print-sidebar">
          <section>
            <h2>{content.skillsTitle}</h2>
            {content.skills.map(([label, value]) => (
              <div className="resume-print-skill" key={label}>
                <h3>{label}</h3>
                <p>{value}</p>
              </div>
            ))}
          </section>

          <section>
            <h2>{content.educationTitle}</h2>
            <p>
              <strong>{content.education}</strong>
            </p>
            <p>{content.educationPeriod}</p>
          </section>

          <section>
            <h2>{content.languageTitle}</h2>
            <p>{content.language}</p>
          </section>
        </aside>
      </div>
    </article>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold uppercase text-teal-700">{children}</h2>
  )
}
