const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["cdn.axieinfinity.com", "marketplace.axieinfinity.com", "assets.axieinfinity.com"],
  },
};
