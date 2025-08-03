module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove source-map-loader for @mediapipe
      webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
        if (rule.use && rule.use.some(use => use.loader?.includes('source-map-loader'))) {
          return {
            ...rule,
            exclude: [
              ...(rule.exclude || []),
              /@mediapipe/,
              /@tensorflow/
            ]
          }
        }
        return rule
      });
      
      // Suppress deprecation warnings
      webpackConfig.devServer = {
        ...webpackConfig.devServer,
        setupMiddlewares: (middlewares, devServer) => {
          if (!devServer) {
            throw new Error('webpack-dev-server is not defined');
          }
          return middlewares;
        }
      };
      
      return webpackConfig;
    },
  },
  eslint: {
    enable: false // Temporarily disable ESLint to focus on other issues
  }
};
