/** @type {import('next').NextConfig} */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const nextConfig = {
  images: {
    domains: ["api.dicebear.com", "xsgames.co", "res.cloudinary.com"],
  },
  reactStrictMode: true,
  // Webpack customization can be done here if CopyWebpackPlugin is still needed
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   // Important: return the modified config
  //   if (!isServer) {
  //     config.plugins.push(
  //       new CopyWebpackPlugin({
  //         patterns: [
  //           {
  //             from: path.join(
  //               __dirname,
  //               "./node_modules/pdfjs-dist/build/pdf.worker.min.js"
  //             ),
  //             to: path.join(__dirname, "public/static"), // Output to public/static or similar
  //           },
  //         ],
  //       })
  //     );
  //   }
  //   return config;
  // },
};

module.exports = nextConfig
