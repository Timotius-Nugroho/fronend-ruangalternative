module.exports = {
  env: {
    APP_NAME: "Designate",
    NEXT_PUBLIC_BACKEND_URL: "http://localhost:3008/backend-creative/api/",
    IMG_BACKEND_URL: "http://localhost:3008/backend-creative/",
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
    ];
  },
};
