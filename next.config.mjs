/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable webpack cache on Windows to avoid cache corruption issues
  webpack: (config, { isServer }) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;
