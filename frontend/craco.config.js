module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.forEach(rule => {
        if (rule.use?.some?.(use => use.loader?.includes('source-map-loader'))) {
          rule.exclude = [/@mediapipe/, /@tensorflow/]
        }
      })
      return webpackConfig
    }
  }
}
