'use client'
import { useEffect } from 'react'
import { initDeviceList } from './actions/initDeviceList'
import { Panel } from './Panel'
import { WebCam } from './Webcam'

export default function Page() {
  useEffect(() => {
    initDeviceList()
  }, [])

  return (
    <>
      <WebCam />
      <Panel />
    </>
  )
}
