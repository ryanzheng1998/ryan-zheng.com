import type { Locale } from '@/content/locales'
import { categoryNames, projects } from '@/content/site'

type Props = {
  locale: Locale
}

export function ProjectGrid({ locale }: Props) {
  const categories = Object.entries(categoryNames)

  return (
    <>
      {categories.map(([categoryId, categoryName]) => {
        const categoryProjects = projects.filter(
          (project) => project.categoryId === categoryId,
        )

        return (
          <div key={categoryId} className="mb-10 text-left">
            <h3 className="mb-2 mt-12 text-xl font-semibold text-gray-800">
              {categoryName[locale]}
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {categoryProjects.map((project) => (
                <li key={project.id}>
                  <a
                    href={
                      project.external
                        ? project.href
                        : `/${locale}${project.href}`
                    }
                    className="group block rounded-lg border border-neutral-200 bg-white p-5 transition duration-300 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200"
                    target={project.external ? '_blank' : undefined}
                    rel={project.external ? 'noopener noreferrer' : undefined}
                  >
                    <p className="flex items-center justify-between font-medium text-blue-600">
                      {project.title[locale]}
                      {project.external && (
                        <span className="ml-2 text-xs text-gray-400 group-hover:text-blue-500">
                          ↗
                        </span>
                      )}
                    </p>
                    {project.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {project.description[locale]}
                      </p>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </>
  )
}
