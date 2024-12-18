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
}

export default nextConfig
