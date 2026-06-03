import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { isLocale, type Locale } from '@/content/locales'
import { blogPosts } from '@/content/site'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

const slug = 'productivity-procrastination'
const post = blogPosts.find((blogPost) => blogPost.slug === slug)

export default async function ProductivityProcrastinationPage({
  params,
}: Props) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam) || !post || !post.locales.includes(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam

  return (
    <main className="min-h-screen bg-white px-6 py-16 font-sans text-neutral-800">
      <nav className="mx-auto mb-12 flex max-w-3xl items-center justify-between">
        <a
          href={`/${locale}/blog`}
          className="text-sm font-medium text-blue-600"
        >
          {locale === 'en' ? 'Blog' : '部落格'}
        </a>
        <LanguageSwitcher locale={locale} path="/blog" />
      </nav>

      <article className="prose prose-neutral mx-auto max-w-3xl">
        <p className="text-sm text-gray-500">{post.date}</p>
        <Post />
      </article>
    </main>
  )
}

function Post() {
  return (
    <>
      <h1>Productivity Was My Favorite Form of Procrastination</h1>

      <h2>I Think I&apos;ve Been Doing Productivity Wrong</h2>

      <p>Since 2024, I&apos;ve been chasing productivity.</p>

      <p>I&apos;ve read countless books:</p>

      <ul>
        <li>Getting Things Done</li>
        <li>Building a Second Brain</li>
        <li>Make Time</li>
        <li>The Bullet Journal Method</li>
        <li>Atomic Habits</li>
      </ul>

      <p>I&apos;ve tried countless systems and tools:</p>

      <ul>
        <li>Pomodoro Technique</li>
        <li>Countless note-taking methods</li>
        <li>Rainbow Calendar</li>
        <li>Obsidian</li>
        <li>Notion</li>
        <li>OpenClaw</li>
        <li>Hermes agents</li>
      </ul>

      <p>Most of them failed.</p>

      <p>Or more accurately, I stopped using them after a while.</p>

      <p>
        For a long time, I thought the problem was that I hadn&apos;t found the
        right system yet.
      </p>

      <p>Today, I realized something:</p>

      <p>I think I&apos;ve been doing productivity wrong.</p>

      <h2>The Missing Piece</h2>

      <p>
        There is no need for productivity systems if there is nothing
        meaningful for me to produce.
      </p>

      <p>Outside of work, I haven&apos;t been creating much in recent years.</p>

      <p>I&apos;ve wanted to build a personal website.</p>

      <p>I&apos;ve wanted to write.</p>

      <p>I&apos;ve wanted to improve my English.</p>

      <p>Yet I only made small amounts of progress.</p>

      <p>Instead, I spent much of my time consuming.</p>

      <p>Reading novels.</p>

      <p>Watching YouTube.</p>

      <p>Scrolling YouTube Shorts.</p>

      <p>Playing games.</p>

      <p>Watching porn.</p>

      <p>Even reading productivity books.</p>

      <p>Looking back, productivity content became another form of consumption.</p>

      <p>A socially acceptable form of procrastination.</p>

      <p>
        It gave me the feeling that I was improving my life without requiring me
        to actually do anything.
      </p>

      <h2>The Real Problem</h2>

      <p>What I lack is not another habit-building framework.</p>

      <p>It is not another productivity app.</p>

      <p>It is not a better Life OS.</p>

      <p>What I lack is the courage to do things.</p>

      <p>The courage to create.</p>

      <p>The courage to face discomfort.</p>

      <p>The courage to escape the cheap dopamine loop.</p>

      <p>Because creating is hard.</p>

      <p>Publishing a website is hard.</p>

      <p>Writing a blog post is hard.</p>

      <p>Attending an English class is hard.</p>

      <p>Showing your work to others is hard.</p>

      <p>Consuming is easy.</p>

      <p>
        The internet offers endless entertainment, endless information, and
        endless excuses to delay action.
      </p>

      <h2>You Become What You Spend Time On</h2>

      <p>I noticed something simple.</p>

      <p>I spend time playing badminton.</p>

      <p>As a result, I get better at badminton.</p>

      <p>Not because I found the perfect badminton productivity system.</p>

      <p>Not because I tracked every practice session.</p>

      <p>Not because I built a badminton second brain.</p>

      <p>I improved because I showed up and played.</p>

      <p>The same principle applies everywhere else.</p>

      <p>If I spend time building websites, I will become a better builder.</p>

      <p>If I spend time writing, I will become a better writer.</p>

      <p>
        If I spend time practicing English, I will become better at English.
      </p>

      <p>We become what we repeatedly do.</p>

      <h2>What I&apos;m Going to Do Instead</h2>

      <p>For now, I&apos;m done searching for the perfect productivity system.</p>

      <p>I&apos;m done searching for the perfect Life OS.</p>

      <p>I&apos;m done reorganizing my tools.</p>

      <p>Instead, I want to spend my time producing.</p>

      <p>Building my personal website.</p>

      <p>Writing blog posts.</p>

      <p>Attending English classes.</p>

      <p>Creating things that did not exist yesterday.</p>

      <p>Nothing revolutionary.</p>

      <p>Nothing ambitious.</p>

      <p>Just doing the work.</p>

      <p>One small thing at a time.</p>

      <p>
        Because maybe the goal was never to build a better productivity system.
      </p>

      <p>Maybe the goal was simply to build a life.</p>
    </>
  )
}
