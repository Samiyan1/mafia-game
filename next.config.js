/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
})