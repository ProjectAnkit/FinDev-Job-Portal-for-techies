/** @type {import('next').NextConfig} */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nextConfig = {
  images: {
    domains: ["api.dicebear.com", "xsgames.co", "res.cloudinary.com"],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // Disable CSS optimization temporarily to fix build issues
    optimizeCss: false,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Only add the plugin if we're not on the server and the PDF worker file exists
    if (!isServer) {
      const pdfWorkerPath = path.join(__dirname, "./node_modules/pdfjs-dist/build/pdf.worker.min.js");
      try {
        require.resolve(pdfWorkerPath);
        config.plugins.push(
          new CopyWebpackPlugin({
            patterns: [
              {
                from: pdfWorkerPath,
                to: path.join(__dirname, "public/static"),
              },
            ],
          })
        );
      } catch (e) {
        console.warn('PDF worker file not found, skipping copy plugin');
      }
    }
    return config;
  },
};

module.exports = nextConfig
