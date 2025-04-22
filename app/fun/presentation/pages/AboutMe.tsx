export const AboutMe = () => {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center px-6 py-20 text-center">
      <h2 className="text-4xl font-bold text-gray-800">About Me</h2>
      <p className="mt-6 max-w-2xl text-lg text-gray-600">
        I’m a web developer with 4 years of experience building full-stack
        applications, blending smart UX with powerful backend systems. At
        Wistron, I’ve delivered AI-enhanced tools that support real-world
        factory operations — from intelligent action recognition to automated
        toolroom systems.
      </p>

      <p className="mt-4 max-w-2xl text-lg text-gray-600">
        I love turning real-world problems into elegant digital solutions —
        whether that means crafting seamless UIs, designing robust APIs, or
        embedding AI into user workflows.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 text-left text-gray-700 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-xl font-semibold">🛠 Tech Stack</h3>
          <ul className="list-disc pl-5">
            <li>React, Next.js, Zustand, Tailwind</li>
            <li>FastAPI, Python, PostgreSQL</li>
            <li>Docker, AWS, Git</li>
            <li>YOLO, DeepSORT, TensorFlow</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">💡 Fun Facts</h3>
          <ul className="list-disc pl-5">
            <li>Built AI tools used in live factory workflows</li>
            <li>
              Currently building{' '}
              <a
                href="https://ryan-zheng.com"
                target="_blank"
                className="underline hover:text-blue-600"
              >
                ryan-zheng.com
              </a>
            </li>
            <li>Loves motion design & animated UI</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
