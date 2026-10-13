import { ProjectNavigation } from '@/components/ProjectNavigation'

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <ProjectNavigation />
    </>
  )
}
