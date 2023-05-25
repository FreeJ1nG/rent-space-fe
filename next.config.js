/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    backendUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

module.exports = nextConfig;
