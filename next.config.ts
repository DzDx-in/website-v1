/** @type {import('next').NextConfig} */
const nextConfig = {
  // Make server-side environment variables available to API routes
  serverRuntimeConfig: {
    // Will only be available on the server side
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
    JWT_SECRET: process.env.JWT_SECRET,

    // Email config
    EMAIL_SERVER: process.env.EMAIL_SERVER,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_SECURE: process.env.EMAIL_SECURE,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dzdx.in',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dzdx.in',
        port: '',
        pathname: '/**',
      },
      // Add other domains as needed
      {
        protocol: 'https',
        hostname: 'cdnjs.cloudflare.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;