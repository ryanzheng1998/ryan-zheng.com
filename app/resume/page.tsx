import {
  ResumeContent,
  resumeProfiles,
} from '@/app/[locale]/resume/ResumeContent'

export default function ResumePage() {
  return <ResumeContent content={resumeProfiles.zh} />
}
