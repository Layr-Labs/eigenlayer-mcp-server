/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REDIS_URL: process.env.REDIS_URL,
  },
}

module.exports = nextConfig 