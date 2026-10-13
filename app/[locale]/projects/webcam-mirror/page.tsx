'use client'
import { useEffect } from 'react'
import { initDeviceList } from './initDeviceList'
import { Panel } from './Panel'
import { WebCam } from './Webcam'
import { useStore } from './useStore'

export default function Page() {
  useEffect(() => {
    const controller = new AbortController()
    void initDeviceList(controller.signal)
    return () => {
      controller.abort()
      useStore
        .getState()
        .stream?.getTracks()
        .forEach((track) => track.stop())
      useStore.setState({ stream: null })
    }
  }, [])

  return (
    <>
      <WebCam />
      <Panel />
    </>
  )
}
