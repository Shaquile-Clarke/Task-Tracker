/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_URI: "mongodb://localhost:27017/Todo",
    NEXTAUTH_SECRET: "x6CXCwin4TgycOHfrvnzd6weuwGlwBxhAFLWoKQbay8=",
    NEXTAUTH_URL: "http://localhost:3000/",
    MONGO_USERNAME: "Shaquile",
    MONGO_PASSWORD: "8KweZXApSWdEykBq",
    MONGO_CLUSTER: "cluster0",
    MONGO_COLLECTION: "Todo",
  },
};

module.exports = nextConfig;
