/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pluspng.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'tse2.mm.bing.net',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
