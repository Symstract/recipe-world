/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },

  images: {
    domains: ["spoonacular.com"],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: "@svgr/webpack",
        options: {
          svgoConfig: {
            plugins: [
              {
                name: "removeViewBox",
                active: false,
              },
            ],
          },
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
