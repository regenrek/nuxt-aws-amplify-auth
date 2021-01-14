const { resolve } = require('path')

module.exports = function NuxtAmplify(moduleOptions) {
  this.addPlugin({
    src: resolve(__dirname, 'aws-amplify-plugin.js'),
    fileName: 'nuxt-amplify.js',
    options: moduleOptions,
  })
}
