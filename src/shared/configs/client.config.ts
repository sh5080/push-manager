export const clientConfig = {
  web: {
    url: process.env.NEXT_PUBLIC_FRONTEND_URL,
    port: process.env.NEXT_PUBLIC_FRONTEND_PORT,
  },
  server: {
    port: process.env.NEXT_PUBLIC_SERVER_PORT,
  },
};
