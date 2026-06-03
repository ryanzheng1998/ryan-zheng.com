import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { isLocale, type Locale } from '@/content/locales'
import { blogPosts } from '@/content/site'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

const slug = 'finite-state-machines-code-reading'
const post = blogPosts.find((blogPost) => blogPost.slug === slug)

export default async function FiniteStateMachinesCodeReadingPage({
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
      <h1>Finite State Machines Changed How I Read Code</h1>

      <p>
        Finite State Machines (FSMs) are one of the most useful concepts I have
        learned for understanding software architecture.
      </p>

      <p>At first glance, FSMs seem like an academic concept:</p>

      <ul>
        <li>A system has a set of states.</li>
        <li>Events trigger transitions between states.</li>
        <li>
          The system behaves differently depending on its current state.
        </li>
      </ul>

      <p>Simple enough.</p>

      <p>
        But over time, I started to see that many software systems can be
        understood through the same lens.
      </p>

      <h2>State and State Change</h2>

      <p>When reading a codebase, I often ask two questions:</p>

      <ol>
        <li>Where does the state live?</li>
        <li>How does the state change?</li>
      </ol>

      <p>That is it.</p>

      <p>In programming terms:</p>

      <ul>
        <li>State: variables, database records, application stores, files</li>
        <li>
          State transitions: functions, methods, actions, API calls, user
          interactions
        </li>
      </ul>

      <p>
        Almost every piece of code exists to either store state or change state.
      </p>

      <p>A user clicks a button.</p>

      <p>State changes.</p>

      <p>An API request arrives.</p>

      <p>State changes.</p>

      <p>A robot arm reaches a position.</p>

      <p>State changes.</p>

      <p>A database record is updated.</p>

      <p>State changes.</p>

      <p>
        The details may differ, but the pattern remains surprisingly
        consistent.
      </p>

      <h2>Understanding Architecture Through State</h2>

      <p>
        When I encounter an unfamiliar codebase, I no longer start by reading
        every file.
      </p>

      <p>Instead, I look for the state.</p>

      <p>Where is the source of truth?</p>

      <p>Is it stored in React state?</p>

      <p>Redux?</p>

      <p>A database?</p>

      <p>A PLC?</p>

      <p>A robot controller?</p>

      <p>Once I know where the state lives, I trace how it changes.</p>

      <p>Who can modify it?</p>

      <p>Which actions trigger those changes?</p>

      <p>What side effects happen afterward?</p>

      <p>
        By following the flow of state, the architecture begins to reveal
        itself.
      </p>

      <h2>The AI Coding Era</h2>

      <p>
        I think this becomes even more important in the era of AI-assisted
        programming.
      </p>

      <p>Writing code is becoming cheaper.</p>

      <p>Reading code is becoming more valuable.</p>

      <p>An AI can generate hundreds of lines of code in seconds.</p>

      <p>But someone still needs to understand:</p>

      <ul>
        <li>Where should this code go?</li>
        <li>Which state does it affect?</li>
        <li>What action should trigger it?</li>
        <li>What existing architecture does it belong to?</li>
      </ul>

      <p>The bottleneck is no longer typing code.</p>

      <p>The bottleneck is understanding systems.</p>

      <h2>A Practical Rule</h2>

      <p>Whenever I open a new codebase, I start with a simple exercise:</p>

      <p>Find the state.</p>

      <p>Find what changes the state.</p>

      <p>Everything else is usually easier to understand afterward.</p>

      <p>It is not a complete model of software architecture.</p>

      <p>But it is often the fastest path to understanding one.</p>
    </>
  )
}

function ChinesePost() {
  return (
    <>
      <h1>有限狀態機改變了我閱讀程式碼的方式</h1>

      <p>
        有限狀態機（Finite State Machine，FSM）是我學過最有用的概念之一，它幫助我理解軟體架構。
      </p>

      <p>乍看之下，FSM 像是一個學術概念：</p>

      <ul>
        <li>一個系統有一組狀態。</li>
        <li>事件會觸發狀態之間的轉換。</li>
        <li>系統會根據目前的狀態有不同的行為。</li>
      </ul>

      <p>聽起來很簡單。</p>

      <p>但隨著時間過去，我開始發現，很多軟體系統都可以用同樣的角度來理解。</p>

      <h2>狀態與狀態變化</h2>

      <p>閱讀一個 codebase 的時候，我常常問兩個問題：</p>

      <ol>
        <li>狀態存在什麼地方？</li>
        <li>狀態是怎麼改變的？</li>
      </ol>

      <p>就這樣。</p>

      <p>用程式的語言來說：</p>

      <ul>
        <li>狀態：變數、資料庫紀錄、application store、檔案</li>
        <li>狀態轉換：function、method、action、API call、使用者互動</li>
      </ul>

      <p>幾乎每一段程式碼，都是為了儲存狀態，或改變狀態。</p>

      <p>使用者按下一個按鈕。</p>

      <p>狀態改變。</p>

      <p>API request 進來。</p>

      <p>狀態改變。</p>

      <p>機械手臂移動到某個位置。</p>

      <p>狀態改變。</p>

      <p>資料庫紀錄被更新。</p>

      <p>狀態改變。</p>

      <p>細節可能不同，但背後的模式其實很一致。</p>

      <h2>透過狀態理解架構</h2>

      <p>遇到一個不熟悉的 codebase 時，我現在不會從每個檔案開始讀。</p>

      <p>我會先找狀態。</p>

      <p>source of truth 在哪裡？</p>

      <p>它存在 React state 嗎？</p>

      <p>Redux？</p>

      <p>資料庫？</p>

      <p>PLC？</p>

      <p>robot controller？</p>

      <p>一旦知道狀態存在什麼地方，我就會追蹤它如何改變。</p>

      <p>誰可以修改它？</p>

      <p>哪些 action 會觸發這些改變？</p>

      <p>改變之後會產生哪些 side effect？</p>

      <p>沿著狀態的流動看下去，架構就會慢慢浮現出來。</p>

      <h2>AI Coding 的時代</h2>

      <p>我覺得在 AI-assisted programming 的時代，這件事會變得更重要。</p>

      <p>寫程式正在變得更便宜。</p>

      <p>讀程式正在變得更有價值。</p>

      <p>AI 可以在幾秒鐘內產生幾百行程式碼。</p>

      <p>但仍然需要有人理解：</p>

      <ul>
        <li>這段程式碼應該放在哪裡？</li>
        <li>它會影響哪個狀態？</li>
        <li>應該由哪個 action 觸發？</li>
        <li>它屬於現有架構的哪一部分？</li>
      </ul>

      <p>瓶頸不再是打字寫程式。</p>

      <p>瓶頸是理解系統。</p>

      <h2>一個實用規則</h2>

      <p>每次打開一個新的 codebase，我都會先做一個簡單的練習：</p>

      <p>找到狀態。</p>

      <p>找到改變狀態的東西。</p>

      <p>接下來的其他部分，通常就會變得比較容易理解。</p>

      <p>這不是一個完整的軟體架構模型。</p>

      <p>但它常常是理解一個架構最快的路。</p>
    </>
  )
}
