module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  mini: {},
  h5: {
    devServer: {
      proxy: {
        "/mobile": {
          target: "https://www.xnwlsq.com:43013/mobile-dev",
          pathRewrite: { "^/mobile": "" }
        }
      }
    }
  }
};
