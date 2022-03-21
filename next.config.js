module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.example.com/:path*",
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
};
