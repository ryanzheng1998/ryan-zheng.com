import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  webpack: (config) => {
    // --- GLSL loader ---
    config.module.rules.push({
      test: /\.glsl$/,
      type: 'asset/source',
    })

    // --- SVG inline ---
    config.module.rules.push({
      test: /\.svg$/,
      type: 'asset/inline',
    })

    // --- Polyfill Node modules ---
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    }

    return config
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default withMDX(nextConfig)
