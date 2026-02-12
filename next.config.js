/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  // Оптимизация производительности
  compress: true,
  poweredByHeader: false,
  images: {
    domains: ['grainy-gradients.vercel.app', 'i.pinimg.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'grainy-gradients.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
    ],
    // Оптимизация изображений для производительности
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig
