module.exports = {
  configureWebpack: {
    resolve: {
      mainFields: ['main', 'browser']
    }
  },

  transpileDependencies: [
    'vuetify'
  ]
}
