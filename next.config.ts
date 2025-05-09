import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      type: 'asset/source',
    })

    config.module.generator['asset/resource'] = config.module.generator['asset']
    config.module.generator['asset/source'] = config.module.generator['asset']
    delete config.module.generator['asset']

    config.module.rules.push({
      test: /\.svg$/,
      type: 'asset/inline',
    })

    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default withMDX(nextConfig)
