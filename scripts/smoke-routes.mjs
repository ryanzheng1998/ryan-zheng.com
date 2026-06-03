const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:3000'

const routes = [
  '/en',
  '/zh',
  '/en/blog',
  '/zh/blog',
  '/en/blog/finite-state-machines-code-reading',
  '/zh/blog/finite-state-machines-code-reading',
  '/en/blog/life-changing-books',
  '/zh/blog/life-changing-books',
  '/en/blog/productivity-procrastination',
  '/zh/blog/productivity-procrastination',
  '/en/projects',
  '/zh/projects',
  '/en/projects/pose-detection',
  '/zh/projects/pose-detection',
]

const failures = []

for (const route of routes) {
  const url = new URL(route, baseUrl)
  const response = await fetch(url, { method: 'HEAD', redirect: 'manual' })

  if (!response.ok) {
    failures.push(`${route} returned ${response.status}`)
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Checked ${routes.length} routes against ${baseUrl}`)
