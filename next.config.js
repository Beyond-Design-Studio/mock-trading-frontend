module.exports = {
  webpack: (config, options) => {
    // Important: return the modified config
    config.externals = [...config.externals, 'bufferutil', 'utf-8-validate']
    return config
  },
  reactStrictMode: true,
  images: {
    domains: ["avatars.dicebear.com"]
  }
}
