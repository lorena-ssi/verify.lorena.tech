module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    // node: {
    //   global: true,
    //   process: 'mock'
    // },
    module: {
      rules: [
        {
          test: /\.wasm$/, // to load public/js/zenroom.wasm
          type: 'javascript/auto',
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]'
          }
        }
      ]
    }
  }
}
