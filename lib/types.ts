import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<T = unknown> = NextPage<T> & {
  getLayout?: (page: ReactElement, props: any) => ReactNode
}

export interface Vector {
  x: number
  y: number
}
