import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 text-neutral-800">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Image
          src="/me.jpeg"
          width={192}
          height={256}
          alt="me"
          className="rounded-2xl shadow-lg"
        />

        <div className="mt-10 space-y-4">
          <p className="text-2xl font-bold">
            I’m Ryan. I like books and building things.
          </p>
          <p>
            Lately, I’ve been thinking a lot about where I’m going — whether I
            should change jobs, explore new paths, or keep growing where I am.
          </p>
          <p>
            This site is part of that journey. A space to share what I’ve made,
            and maybe discover what I’ll become.
          </p>
        </div>

        <div className="mt-16 w-full">
          <h3 className="mb-6 text-xl font-semibold">Projects</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            <li>
              <a
                href="/fun/presentation"
                className="block rounded-lg border p-4 shadow-sm transition hover:bg-gray-50"
              >
                🖼 Presentation
              </a>
            </li>
            <li>
              <a
                href="/fun/flip-card"
                className="block rounded-lg border p-4 shadow-sm transition hover:bg-gray-50"
              >
                🃏 Flip Card
              </a>
            </li>
            <li>
              <a
                href="/fun/webgl-box"
                className="block rounded-lg border p-4 shadow-sm transition hover:bg-gray-50"
              >
                📦 WebGL Box
              </a>
            </li>
            <li>
              <a
                href="/fun/pose-detection"
                className="block rounded-lg border p-4 shadow-sm transition hover:bg-gray-50"
              >
                🕺 Pose Detection
              </a>
            </li>
            <li>
              <a
                href="https://snake-0000.web.app/"
                className="block rounded-lg border p-4 shadow-sm transition hover:bg-gray-50"
              >
                🐍 Snake Game
              </a>
            </li>
            <li>
              <a
                href="https://csp-gd.github.io/nutn-csie-exhib-109/build/index.html"
                className="block rounded-lg border p-4 shadow-sm transition hover:bg-gray-50"
              >
                🧑‍💻 109 NUTN CSIE Exhibition
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
