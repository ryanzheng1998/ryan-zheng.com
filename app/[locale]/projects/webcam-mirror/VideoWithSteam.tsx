import { useEffect, useRef, VideoHTMLAttributes } from 'react'

type Props = VideoHTMLAttributes<HTMLVideoElement> & {
  srcObject: MediaStream | null
}
export const VideoWithStream = (p: Props) => {
  const ref = useRef<HTMLVideoElement>(null)

  const { srcObject, ...rest } = p

  useEffect(() => {
    if (ref.current === null) return
    ref.current.srcObject = p.srcObject
  }, [p.srcObject])

  return <video autoPlay muted {...rest} ref={ref} />
}
