/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    NEXT_PUBLIC_FRONTEND_PORT: process.env.NEXT_PUBLIC_FRONTEND_PORT,
    NEXT_PUBLIC_SERVER_PORT: process.env.NEXT_PUBLIC_SERVER_PORT,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/:path*`,
      },
    ];
  },
};

console.log('환경변수 확인:', {
  FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  FRONTEND_PORT: process.env.NEXT_PUBLIC_FRONTEND_PORT,
  SERVER_PORT: process.env.NEXT_PUBLIC_SERVER_PORT,
});

export default nextConfig;
