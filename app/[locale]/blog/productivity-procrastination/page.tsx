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
        <LanguageSwitcher locale={locale} path={`/blog/${slug}`} />
      </nav>

      <article className="prose prose-neutral mx-auto max-w-3xl">
        <p className="text-sm text-gray-500">{post.date}</p>
        {locale === 'en' ? <EnglishPost /> : <ChinesePost />}
      </article>
    </main>
  )
}

function EnglishPost() {
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

function ChinesePost() {
  return (
    <>
      <h1>生產力曾是我最喜歡的拖延方式</h1>

      <h2>我想，我一直用錯方式看待生產力</h2>

      <p>從 2024 年開始，我一直在追逐生產力。</p>

      <p>我讀了很多書：</p>

      <ul>
        <li>Getting Things Done</li>
        <li>Building a Second Brain</li>
        <li>Make Time</li>
        <li>The Bullet Journal Method</li>
        <li>Atomic Habits</li>
      </ul>

      <p>我也試過很多系統和工具：</p>

      <ul>
        <li>番茄鐘</li>
        <li>各種筆記方法</li>
        <li>彩虹行事曆</li>
        <li>Obsidian</li>
        <li>Notion</li>
        <li>OpenClaw</li>
        <li>Hermes agents</li>
      </ul>

      <p>大多數都失敗了。</p>

      <p>或者更準確地說，我用了一陣子之後就不再用了。</p>

      <p>很長一段時間，我以為問題是我還沒有找到對的系統。</p>

      <p>但今天，我意識到一件事：</p>

      <p>我想，我一直用錯方式看待生產力。</p>

      <h2>缺少的那一塊</h2>

      <p>如果沒有什麼有意義的東西需要我產出，那就不需要生產力系統。</p>

      <p>在工作之外，這幾年我其實沒有創作太多東西。</p>

      <p>我一直想做一個個人網站。</p>

      <p>我一直想寫作。</p>

      <p>我一直想提升英文。</p>

      <p>但我只前進了一點點。</p>

      <p>相反地，我把很多時間花在消費上。</p>

      <p>看小說。</p>

      <p>看 YouTube。</p>

      <p>滑 YouTube Shorts。</p>

      <p>玩遊戲。</p>

      <p>看色情內容。</p>

      <p>甚至讀生產力書籍。</p>

      <p>回頭看，生產力內容也變成了另一種消費。</p>

      <p>一種社會上比較能被接受的拖延。</p>

      <p>它讓我覺得自己正在改善生活，但其實不需要我真的去做什麼。</p>

      <h2>真正的問題</h2>

      <p>我缺少的不是另一套建立習慣的框架。</p>

      <p>不是另一個生產力 App。</p>

      <p>也不是更好的 Life OS。</p>

      <p>我缺少的是去做事情的勇氣。</p>

      <p>創作的勇氣。</p>

      <p>面對不舒服的勇氣。</p>

      <p>逃離廉價多巴胺循環的勇氣。</p>

      <p>因為創作很難。</p>

      <p>發布一個網站很難。</p>

      <p>寫一篇部落格很難。</p>

      <p>去上英文課很難。</p>

      <p>把自己的作品展示給別人看很難。</p>

      <p>消費很容易。</p>

      <p>網路提供了無止境的娛樂、資訊，以及延後行動的藉口。</p>

      <h2>你會成為你花時間做的事</h2>

      <p>我注意到一件很簡單的事。</p>

      <p>我花時間打羽球。</p>

      <p>結果，我的羽球變好了。</p>

      <p>不是因為我找到了完美的羽球生產力系統。</p>

      <p>不是因為我追蹤了每一次練習。</p>

      <p>也不是因為我建立了羽球第二大腦。</p>

      <p>我進步，是因為我有出現，然後去打。</p>

      <p>同樣的原則也適用在其他地方。</p>

      <p>如果我花時間做網站，我就會成為更好的 builder。</p>

      <p>如果我花時間寫作，我就會成為更好的 writer。</p>

      <p>如果我花時間練英文，我的英文就會變好。</p>

      <p>我們會成為我們反覆做的事。</p>

      <h2>接下來我想改做的事</h2>

      <p>現在，我不想再尋找完美的生產力系統了。</p>

      <p>我不想再尋找完美的 Life OS。</p>

      <p>我不想再一直重整我的工具。</p>

      <p>相反地，我想把時間花在產出上。</p>

      <p>做我的個人網站。</p>

      <p>寫部落格文章。</p>

      <p>去上英文課。</p>

      <p>創造一些昨天還不存在的東西。</p>

      <p>不需要多革命性。</p>

      <p>不需要多有野心。</p>

      <p>只是去做。</p>

      <p>一次做一件小事。</p>

      <p>因為也許目標從來不是建立一套更好的生產力系統。</p>

      <p>也許目標只是建立一種生活。</p>
    </>
  )
}
