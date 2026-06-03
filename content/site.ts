import type { Locale } from './locales'

type Localized<T> = Record<Locale, T>

export type Project = {
  id: string
  categoryId: string
  href: string
  external?: boolean
  title: Localized<string>
  description?: Localized<string>
}

export type BlogPost = {
  slug: string
  date: string
  locales: Locale[]
  title: Localized<string>
  description: Localized<string>
}

export const home = {
  en: {
    languageLabel: '中文',
    navBlog: 'Blog',
    navProjects: 'Projects',
    navFun: 'Fun',
    eyebrow: 'Ryan Zheng',
    introTitle: 'I write, build, and learn in public.',
    name: '鄭聖玄',
    summary:
      'A personal website for my essays, experiments, and the small software ideas I keep returning to.',
    paragraphs: [
      'I like books and building things. Lately, I have been thinking a lot about where I am going, whether I should change jobs, explore new paths, or keep growing where I am.',
      "This site is part of that journey. A place to share what I have made, and maybe discover what I'll become.",
    ],
    primaryAction: 'Read the blog',
    secondaryAction: 'See projects',
    blogHeading: 'Blog',
    blogSubheading: 'Notes on books, work, and the parts of life I am trying to understand.',
    projectsHeading: 'Projects',
    projectsSubheading: 'Selected experiments across graphics, motion, computer vision, and interaction.',
    linksHeading: 'Links',
    viewAllProjects: 'View all projects',
    latestLabel: 'Latest writing',
    featuredProjectsLabel: 'Featured projects',
    footer: '© 2026 Ryan Zheng.',
  },
  zh: {
    languageLabel: 'English',
    navBlog: '部落格',
    navProjects: '作品',
    navFun: '實驗',
    eyebrow: 'Ryan Zheng',
    introTitle: '我寫作、做東西，也把學習過程留下來。',
    name: '鄭聖玄',
    summary: '這是我的個人網站，用來整理文章、作品，以及那些我反覆想做好的軟體小實驗。',
    paragraphs: [
      '我喜歡閱讀與動手做東西。最近，我常在思考我的未來：我應該換工作、探索新的道路，還是繼續在現有的地方成長？',
      '這個網站是我旅程的一部分。用來分享我做過的事，也許也能幫助我發現自己未來會成為什麼樣子。',
    ],
    primaryAction: '閱讀文章',
    secondaryAction: '查看作品',
    blogHeading: '部落格',
    blogSubheading: '關於書、工作，以及我正在理解的人生片段。',
    projectsHeading: '作品',
    projectsSubheading: '一些關於圖形、動畫、電腦視覺與互動的實驗。',
    linksHeading: '連結',
    viewAllProjects: '查看所有作品',
    latestLabel: '最新文章',
    featuredProjectsLabel: '精選作品',
    footer: '© 2026 Ryan Zheng.',
  },
} satisfies Localized<{
  languageLabel: string
  navBlog: string
  navProjects: string
  navFun: string
  eyebrow: string
  introTitle: string
  name: string
  summary: string
  paragraphs: string[]
  primaryAction: string
  secondaryAction: string
  blogHeading: string
  blogSubheading: string
  projectsHeading: string
  projectsSubheading: string
  linksHeading: string
  viewAllProjects: string
  latestLabel: string
  featuredProjectsLabel: string
  footer: string
}>

export const categoryNames = {
  animation: {
    en: 'Animation',
    zh: '動畫',
  },
  graphics: {
    en: 'WebGL / Graphics',
    zh: 'WebGL / 圖形',
  },
  interactive: {
    en: 'Games & Interactive',
    zh: '遊戲與互動',
  },
  ui: {
    en: 'UI / UX Experiments',
    zh: 'UI / UX 實驗',
  },
  steering: {
    en: 'Algorithm & Steering',
    zh: '演算法與 Steering',
  },
  school: {
    en: 'School Projects',
    zh: '學校專案',
  },
  other: {
    en: 'Other',
    zh: '其他',
  },
} satisfies Record<string, Localized<string>>

export const projects: Project[] = [
  {
    id: 'spring-parameter-picker',
    categoryId: 'animation',
    href: '/fun/spring-animation/spring-parameter-picker',
    title: {
      en: 'Spring Animation Picker',
      zh: '彈簧動畫參數選擇器',
    },
  },
  {
    id: 'flip-card',
    categoryId: 'animation',
    href: '/fun/spring-animation/flip-card',
    title: {
      en: 'Flip Card',
      zh: '翻牌動畫',
    },
  },
  {
    id: 'spring-flip-animation',
    categoryId: 'animation',
    href: '/fun/spring-animation/flip-animation',
    title: {
      en: 'Spring Flip Animation',
      zh: '彈簧翻轉動畫',
    },
  },
  {
    id: 'floating-button',
    categoryId: 'animation',
    href: '/fun/spring-animation/floating-button',
    title: {
      en: 'Floating Button',
      zh: '浮動按鈕',
    },
  },
  {
    id: 'mount-unmount-spring',
    categoryId: 'animation',
    href: '/fun/spring-animation/mount-unmount',
    title: {
      en: 'Mount Unmount Spring',
      zh: '掛載與卸載動畫',
    },
  },
  {
    id: 'number-spring',
    categoryId: 'animation',
    href: '/fun/spring-animation/number',
    title: {
      en: 'Number Spring',
      zh: '數字彈簧動畫',
    },
  },
  {
    id: 'star-spring',
    categoryId: 'animation',
    href: '/fun/spring-animation/star',
    title: {
      en: 'Star Spring',
      zh: '星星彈簧動畫',
    },
  },
  {
    id: 'webgl-box',
    categoryId: 'graphics',
    href: '/fun/webgl/box',
    title: {
      en: 'WebGL Box',
      zh: 'WebGL 盒子',
    },
  },
  {
    id: 'webgl-bloom',
    categoryId: 'graphics',
    href: '/fun/webgl/bloom',
    title: {
      en: 'WebGL Bloom',
      zh: 'WebGL Bloom',
    },
  },
  {
    id: 'webgl-dice',
    categoryId: 'graphics',
    href: '/fun/webgl/dice',
    title: {
      en: 'WebGL Dice',
      zh: 'WebGL 骰子',
    },
  },
  {
    id: 'webgl-sphere',
    categoryId: 'graphics',
    href: '/fun/webgl/sphere',
    title: {
      en: 'WebGL Sphere',
      zh: 'WebGL 球體',
    },
  },
  {
    id: 'webgl-wireframe',
    categoryId: 'graphics',
    href: '/fun/webgl/wireframe',
    title: {
      en: 'WebGL Wireframe',
      zh: 'WebGL 線框',
    },
  },
  {
    id: 'gasket-3d',
    categoryId: 'graphics',
    href: 'https://ryanzheng1998.github.io/gasket-3d/',
    external: true,
    title: {
      en: 'Sierpinski Gasket',
      zh: 'Sierpinski Gasket',
    },
  },
  {
    id: 'svg-chart',
    categoryId: 'graphics',
    href: 'https://ryanzheng1998.github.io/svg-chart/',
    external: true,
    title: {
      en: 'SVG Chart',
      zh: 'SVG 圖表',
    },
  },
  {
    id: 'snake',
    categoryId: 'interactive',
    href: 'https://snake-0000.web.app/',
    external: true,
    title: {
      en: 'Snake Game',
      zh: '貪食蛇遊戲',
    },
  },
  {
    id: 'analog-clock',
    categoryId: 'interactive',
    href: '/fun/analog-clock',
    title: {
      en: 'Analog Clock',
      zh: '類比時鐘',
    },
  },
  {
    id: 'pose-detection',
    categoryId: 'interactive',
    href: '/fun/pose-detection',
    title: {
      en: 'Pose Detection',
      zh: '姿態偵測',
    },
  },
  {
    id: 'draggable',
    categoryId: 'ui',
    href: '/fun/drag/draggable',
    title: {
      en: 'Draggable',
      zh: '拖曳元件',
    },
  },
  {
    id: 'draggable-homing',
    categoryId: 'ui',
    href: '/fun/drag/draggable-homing',
    title: {
      en: 'Draggable Homing',
      zh: '自動歸位拖曳',
    },
  },
  {
    id: 'draggable-slot',
    categoryId: 'ui',
    href: '/fun/drag/draggable-homing-with-slot',
    title: {
      en: 'Draggable w/ Slot',
      zh: '插槽拖曳',
    },
  },
  {
    id: 'webcam-mirror',
    categoryId: 'ui',
    href: '/fun/webcam-mirror',
    title: {
      en: 'Webcam Mirror',
      zh: 'Webcam 鏡子',
    },
  },
  {
    id: 'todo-list',
    categoryId: 'ui',
    href: '/fun/todo-list',
    title: {
      en: 'Todo List',
      zh: '待辦清單',
    },
  },
  {
    id: 'flocking',
    categoryId: 'steering',
    href: '/fun/steering/flocking',
    title: {
      en: 'Flocking',
      zh: '群聚模擬',
    },
  },
  {
    id: 'single-vehicle-steering',
    categoryId: 'steering',
    href: '/fun/steering/single-vehicle',
    title: {
      en: 'Single Vehicle Steering',
      zh: '單一載具 Steering',
    },
  },
  {
    id: 'nutn-exhibition',
    categoryId: 'school',
    href: 'https://csp-gd.github.io/nutn-csie-exhib-109/build/index.html',
    external: true,
    title: {
      en: '109 NUTN CSIE Exhibition',
      zh: '109 級南大資工展',
    },
  },
  {
    id: 'compiler-final-project',
    categoryId: 'school',
    href: 'https://ryanzheng1998.github.io/presentation/',
    external: true,
    title: {
      en: 'Compiler Final Project',
      zh: '編譯器期末專案',
    },
  },
  {
    id: 'frequency-response',
    categoryId: 'school',
    href: 'https://ryanzheng1998.github.io/frequency-response/',
    external: true,
    title: {
      en: 'Dynamic Frequency Visualizer',
      zh: '動態頻率視覺化',
    },
  },
  {
    id: 'google-ad-page',
    categoryId: 'other',
    href: '/fun/ad/google',
    title: {
      en: 'Google Ad Page',
      zh: 'Google 廣告頁',
    },
  },
  {
    id: 'oauth-demo',
    categoryId: 'other',
    href: '/fun/oauth',
    title: {
      en: 'OAuth 2.0 Demo',
      zh: 'OAuth 2.0 Demo',
    },
  },
  {
    id: 'react-motion-parameters',
    categoryId: 'other',
    href: 'https://ryanzheng1998.github.io/react-motion-parameters-chooser/',
    external: true,
    title: {
      en: 'React Motion Parameters Chooser',
      zh: 'React Motion 參數選擇器',
    },
  },
]

export const blogPosts = [
  {
    slug: 'productivity-procrastination',
    date: '2026-06-03',
    locales: ['en'],
    title: {
      en: 'Productivity Was My Favorite Form of Procrastination',
      zh: 'Productivity Was My Favorite Form of Procrastination',
    },
    description: {
      en: 'A reflection on productivity systems, consumption, and the courage to create.',
      zh: 'A reflection on productivity systems, consumption, and the courage to create.',
    },
  },
  {
    slug: 'life-changing-books',
    date: '2025-01-01',
    locales: ['en', 'zh'],
    title: {
      en: 'Three Books That Changed My Life',
      zh: '改變我人生的三本書',
    },
    description: {
      en: 'Three books that helped me see myself more clearly.',
      zh: '三本幫助我更清楚看見自己的書。',
    },
  },
] satisfies BlogPost[]

export const socialLinks = [
  {
    href: 'https://github.com/ryanzheng1998',
    icon: '/logo-github.svg',
    label: 'GitHub',
  },
  {
    href: 'https://codepen.io/ryanzheng',
    icon: '/logo-codepen.svg',
    label: 'Codepen',
  },
  {
    href: 'https://www.linkedin.com/in/sheng-xuan-zheng/',
    icon: '/logo-linkedin.svg',
    label: 'LinkedIn',
  },
  {
    href: 'mailto:ryan.zheng.1998@gmail.com',
    icon: '/mail-outline.svg',
    label: {
      en: 'Email',
      zh: '電子郵件',
    },
  },
] as const
