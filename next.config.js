/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable polling on Windows so file changes are detected instantly and Hot Reload (Fast Refresh) always syncs
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 800,
        aggregateTimeout: 300,
        ignored: ["**/node_modules", "**/.git", "**/.next"],
      };
    }
    return config;
  },
};

module.exports = nextConfig;
