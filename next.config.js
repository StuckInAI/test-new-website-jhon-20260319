/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['typeorm'],
  },
  output: 'standalone',
}

module.exports = nextConfig