const { resolve } = require('path')

function authHelper(options) {
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-auth-helper.js',
    options,
  })
}

module.exports = authHelper
