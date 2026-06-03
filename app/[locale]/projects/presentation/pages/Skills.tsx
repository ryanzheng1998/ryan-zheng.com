export const Skills = () => {
  return (
    <div className="min-h-screen w-screen px-8 py-16 text-gray-800">
      <h2 className="mb-8 text-center text-4xl font-bold">專長</h2>

      <div className="mx-auto max-w-3xl space-y-10">
        <div>
          <h3 className="text-xl font-semibold">前端網頁開發設計</h3>
          <p className="mt-2 text-gray-600">
            HTML、CSS、JavaScript、TypeScript、React
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">後端系統開發維護</h3>
          <p className="mt-2 text-gray-600">Next.js、SQL、Node.js、Deno</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">系統部署</h3>
          <p className="mt-2 text-gray-600">
            Linux、Kubernetes、Docker、GitLab CI/CD、GitHub Actions
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">結構化程式設計</h3>
          <p className="mt-2 text-gray-600">
            Flux、Functional Programming、Object-Oriented Programming
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">程式語言</h3>
          <p className="mt-2 text-gray-600">
            JavaScript、TypeScript、Python、C、C++
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">其他工具</h3>
          <p className="mt-2 text-gray-600">Git、Vim</p>
        </div>
      </div>
    </div>
  )
}
