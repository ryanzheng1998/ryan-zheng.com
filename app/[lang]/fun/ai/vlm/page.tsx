'use client'

import { useEffect } from 'react'
import { infer } from './actions/infer'
import { init } from './actions/init'
import { get, set } from './useStore'

export default function MinimalCameraApp() {
  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const store = get()
          const result = await infer(store.file!)
          console.log('result', result)
        }}
      >
        <input
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return
            set({ file })
          }}
          type="file"
          required
          accept="image/*"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}
