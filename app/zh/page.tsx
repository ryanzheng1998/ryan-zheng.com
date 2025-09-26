import Image from 'next/image'
import { blogs } from '../blogs'
import { projects } from '../projects'

export default async function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 font-sans leading-relaxed text-neutral-800">
      <a href="/">English</a>

      <div className="mx-auto max-w-3xl text-center">
        {/* Profile Image */}
        <Image
          src="/me.jpeg"
          width={192}
          height={256}
          alt="我的照片"
          className="mx-auto rounded-2xl shadow-xl"
        />

        {/* Intro */}
        <div className="mt-10 space-y-4">
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            嗨，我是 Ryan 👋
          </h1>
          <p className="text-xl text-gray-500">鄭聖玄</p>
          <p className="text-lg text-gray-700">
            我喜歡閱讀與動手做東西。最近，我常在思考我的未來——
            我應該換工作、探索新的道路，還是繼續在現有的地方成長？
          </p>
          <p className="text-lg text-gray-700">
            這個網站是我旅程的一部分。用來分享我做過的事，
            也許也能幫助我發現自己未來會成為什麼樣子。
          </p>
        </div>

        {/* Blog Section */}
        <section className="mt-16 text-left">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">部落格</h2>
          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li
                key={blog.name}
                className="group rounded-2xl bg-gray-50 p-5 shadow-md transition duration-300 hover:bg-white hover:shadow-xl"
              >
                <a href={`/zh/${blog.href}`} className="block space-y-1">
                  <p className="text-lg font-semibold text-blue-700 group-hover:underline">
                    {blog.name}
                  </p>
                  {blog.description && (
                    <p className="text-sm text-gray-600">{blog.description}</p>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Projects Section */}
        {projects.map((section) => (
          <div key={section.category} className="mb-10 text-left">
            <h3 className="mb-2 mt-12 text-xl font-semibold text-gray-800">
              {section.category}
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {section.items.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.external ? item.href : `${item.href}`}
                    className="group block rounded-2xl bg-gray-50 p-5 shadow-md transition duration-300 hover:bg-white hover:shadow-xl"
                    target="_blank"
                  >
                    <p className="flex items-center justify-between font-medium text-blue-600">
                      {item.name}
                      {item.external && (
                        <span className="ml-2 text-xs text-gray-400 group-hover:text-blue-500">
                          ↗
                        </span>
                      )}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Links Section */}
        <section className="mt-16 text-left">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">連結</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
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
                label: '電子郵件',
              },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center rounded-2xl bg-gray-50 p-5 shadow-md transition duration-300 hover:bg-white hover:shadow-xl"
              >
                <Image
                  src={icon}
                  alt={`${label} 標誌`}
                  width={24}
                  height={24}
                  className="mb-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t pt-8 text-center text-sm text-gray-400">
          © 2025 Ryan Zheng.
        </footer>
      </div>
    </main>
  )
}
