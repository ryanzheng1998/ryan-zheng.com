import { projectDetails } from '@/content/project-details'

/** Lightweight illustrated preview; no model, camera, or WebGL startup needed. */
export function ProjectPreview({ id }: { id: string }) {
  const detail = projectDetails[id as keyof typeof projectDetails]
  if (!detail) return null
  return (
    <div className="project-preview" aria-hidden="true">
      <img
        src={detail.thumbnail}
        alt=""
        width="400"
        height="260"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
