import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { isLocale, type Locale } from '@/content/locales'
import { blogPosts } from '@/content/site'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

const post = blogPosts.find((blogPost) => blogPost.slug === 'life-changing-books')

export default async function LifeChangingBooksPage({ params }: Props) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam) || !post) {
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
        <LanguageSwitcher locale={locale} path="/blog/life-changing-books" />
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
      <h1>Three Books That Changed My Life</h1>
      <p>
        Books have always been my quiet companions. Some entertain. Some
        educate. But a few shake something inside you. These are the three that
        did that for me deeply and permanently.
      </p>

      <hr />

      <h2>1. The Courage to Be Disliked</h2>
      <p>
        <em>By Ichiro Kishimi and Fumitake Koga</em>
      </p>
      <p>
        This book challenged how I see myself and others. It is a conversation
        between a philosopher and a youth, exploring Alfred Adler's ideas. The
        biggest lesson? <strong>My past does not define me. Only my actions now do.</strong>
      </p>
      <p>
        I used to worry a lot about what others thought. This book helped me
        realize that <strong>seeking approval can trap you</strong>, and that
        living honestly, even if it means being disliked, is a kind of freedom.
        It is not always easy, but it is real.
      </p>
      <blockquote>
        <p>Freedom is being disliked by other people.</p>
      </blockquote>

      <h2>2. Dopamine Nation</h2>
      <p>
        <em>By Dr. Anna Lembke</em>
      </p>
      <p>
        This one hit hard. It explains how addiction works, not just to drugs,
        but to anything that gives us quick pleasure: scrolling, snacking,
        YouTube, even working too much. I saw myself in those pages.
      </p>
      <p>
        It helped me understand the <strong>dopamine-pain balance</strong> and
        how we are wired to chase short-term pleasure, even if it leads to
        long-term pain. I started taking more dopamine fasts, building habits
        that feel boring at first, like reading or walking, but restore balance
        over time.
      </p>
      <blockquote>
        <p>The relentless pursuit of pleasure leads to pain.</p>
      </blockquote>

      <h2>3. The Life-Changing Magic of Tidying Up</h2>
      <p>
        <em>By Marie Kondo</em>
      </p>
      <p>
        At first, I thought it was just about cleaning. But it is really about{' '}
        <strong>intentional living</strong>.
      </p>
      <p>
        Marie Kondo's method of asking "Does this spark joy?" became a way for
        me to evaluate not just objects, but tasks, goals, even people. I
        started decluttering my home and then, unintentionally, my life. I found
        more space to think, more energy to act, and more clarity about what I
        wanted.
      </p>
      <p>
        It taught me that <strong>physical space affects mental space</strong>,
        and that simplifying does not mean losing. It means choosing.
      </p>

      <hr />

      <h2>Final Thoughts</h2>
      <p>
        These three books are very different. One is philosophical, one is
        scientific, and one is practical. But they all share one thing: they
        helped me <strong>see myself more clearly</strong>.
      </p>
      <p>
        They did not just teach me something.
        <br />
        They changed how I live.
      </p>
      <p>
        If you have read any of these, or have a book that changed your life, I
        would love to hear about it.
      </p>
    </>
  )
}

function ChinesePost() {
  return (
    <>
      <h1>改變我人生的三本書</h1>
      <p>
        書一直是我安靜的陪伴者。有些書只是娛樂，有些書帶來知識。但少數幾本，會
        <strong>在你心裡震動一些東西</strong>。以下三本，深深且永久地改變了我。
      </p>

      <hr />

      <h2>1. 被討厭的勇氣</h2>
      <p>
        <em>岸見一郎與古賀史健</em>
      </p>
      <p>
        這本書挑戰了我看待自己與他人的方式。它以哲學家與年輕人的對話，探索阿德勒心理學的思想。最大的收穫？
        <strong>過去不決定我，只有我現在的行動才決定我。</strong>
      </p>
      <p>
        我曾經很在意別人的看法。這本書讓我意識到，
        <strong>尋求認可是一種陷阱</strong>
        ，而誠實地活著，即使因此被討厭，其實也是一種自由。它並不容易，但卻真實。
      </p>
      <blockquote>
        <p>自由，就是被別人討厭。</p>
      </blockquote>

      <h2>2. 多巴胺國度</h2>
      <p>
        <em>安娜・倫布基</em>
      </p>
      <p>
        這本書給了我很大的衝擊。它解釋了成癮的運作方式，不只是毒品，還包括任何帶來即時快樂的東西：滑手機、零食、YouTube，甚至過度工作。我在書裡看到了自己。
      </p>
      <p>
        它讓我理解 <strong>多巴胺與痛苦的平衡</strong>
        ，以及我們大腦是如何不斷追逐短暫快樂，即便會帶來長遠的痛苦。我開始嘗試多巴胺斷食，養成一開始覺得無聊的習慣，像是閱讀或散步，但這些會隨時間恢復內在的平衡。
      </p>
      <blockquote>
        <p>不斷追求快樂，只會帶來痛苦。</p>
      </blockquote>

      <h2>3. 怦然心動的人生整理魔法</h2>
      <p>
        <em>近藤麻理惠</em>
      </p>
      <p>
        一開始我以為這只是關於打掃。但其實它講的是
        <strong>有意識的生活</strong>。
      </p>
      <p>
        近藤麻理惠的方法：「這會讓你心動嗎？」不僅成了我整理物品的準則，也成了我評估任務、目標、甚至人際關係的方式。我開始整理家裡，然後不經意間，也整理了人生。我獲得了更多的思考空間、行動的能量，以及更清晰的方向。
      </p>
      <p>
        它教會我，<strong>物理空間會影響心理空間</strong>
        。而簡化並不是失去，而是選擇。
      </p>

      <hr />

      <h2>最後的想法</h2>
      <p>
        這三本書風格完全不同，一本哲學、一本科學、一本實踐。但它們有一個共通點：它們幫助我
        <strong>更清楚地看見自己</strong>。
      </p>
      <p>
        它們不只是教了我一些知識。
        <br />
        它們改變了我的生活方式。
      </p>
      <p>
        如果你也讀過其中任何一本，或有一本改變過你人生的書，我很想聽聽你的故事。
      </p>
    </>
  )
}
