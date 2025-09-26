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
          alt="me"
          className="mx-auto rounded-2xl shadow-xl"
        />

        {/* Intro */}
        <div className="mt-10 space-y-4">
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Hi, I’m Ryan 👋
          </h1>
          <p className="text-xl text-gray-500">鄭聖玄</p>
          <p className="text-lg text-gray-700">
            I like books and building things. Lately, I’ve been thinking a lot
            about where I’m going — whether I should change jobs, explore new
            paths, or keep growing where I am.
          </p>
          <p className="text-lg text-gray-700">
            This site is part of that journey. A space to share what I’ve made,
            and maybe discover what I’ll become.
          </p>
        </div>

        {/* Blog Section */}
        <section className="mt-16 text-left">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">Blog</h2>
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
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">Links</h2>
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
                label: 'Email',
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
                  alt={`${label} logo`}
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
