/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ik.imagekit.io', 'picsum.photos', 'cdn.pixabay.com'],
  },
}

module.exports = nextConfig
