import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
