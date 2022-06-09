require("dotenv").config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    INFURA_ID: process.env.INFURA_ID,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
