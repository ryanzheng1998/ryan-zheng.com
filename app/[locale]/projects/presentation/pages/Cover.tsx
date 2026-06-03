export const Cover = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold text-gray-800">Hi, I’m Ryan 👋</h1>
      <p className="mt-4 text-2xl text-gray-600">
        Web Developer | AI Tool Builder
      </p>
      <p className="mt-2 text-lg text-gray-500">
        Turning complex ideas into intuitive digital experiences.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4 text-gray-500">
        <p>📍 Taiwan</p>
        <p>
          🌐{' '}
          <a
            href="https://ryan-zheng.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600"
          >
            ryan-zheng.com
          </a>
        </p>
        <p>
          ✉️{' '}
          <a
            href="mailto:ryan.zheng.1998@gmail.com"
            className="underline hover:text-blue-600"
          >
            ryan.zheng.1998@gmail.com
          </a>
        </p>
        <p>
          💼{' '}
          <a
            href="https://www.linkedin.com/in/sheng-xuan-zheng/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </div>
  )
}
