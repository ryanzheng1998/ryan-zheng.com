import Image from 'next/image'

export default function Home() {
  return (
    <div className="grid place-items-center">
      <Image src="/me.jpeg" width={768 / 3} height={1024 / 3} alt="me" />
      <div className="mx-auto mt-16 max-w-xl px-4 text-center text-neutral-800">
        <p className="mb-4 text-xl font-semibold">
          I’m Ryan. I like books and building things.
        </p>
        <p className="mb-4">
          Lately, I’ve been thinking a lot about where I’m going — whether I
          should change jobs, explore new paths, or keep growing where I am.
        </p>
        <p>
          This site is part of that journey. A space to share what I’ve made,
          and maybe discover what I’ll become.
        </p>
      </div>
      <br />
      <h3>Projects</h3>
      <ul>
        <li>
          <a href="/fun/flip-card">Flip Card</a>
        </li>
        <li>
          <a href="/fun/webgl-box">WebGL Box</a>
        </li>
        <li>
          <a href="/fun/pose-detection">Pose Detection</a>
        </li>
        <li>
          <a href="https://csp-gd.github.io/nutn-csie-exhib-109/build/index.html">
            109 NUTN CSIE Exhibition
          </a>
        </li>
      </ul>
    </div>
  )
}
