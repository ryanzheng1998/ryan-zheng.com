'use client'

import { useEffect } from 'react'
import { init } from './actions/init'

export default function MinimalCameraApp() {
  useEffect(() => {
    init()
  }, [])

  return <div></div>
}
