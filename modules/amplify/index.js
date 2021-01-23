const { resolve } = require('path')
const r = (...path) => resolve(__dirname, ...path)
const logger = require('./utils/logger')

module.exports = function (moduleOptions) {
  const defaultOptions = {}

  const options = Object.assign(
    defaultOptions,
    this.options.amplify,
    moduleOptions
  )
  // const currentEnv = getCurrentEnv(options)

  this.addPlugin({
    src: resolve(__dirname, 'aws-amplify-plugin.js'),
    fileName: 'amplify/nuxt-amplify.js',
    options: moduleOptions,
  })

  loadAuth.call(this, options)

  this.addPlugin({
    src: r('plugins/services/auth.ssr.js'),
    fileName: 'amplify/service.auth.ssr-server.js',
    mode: 'server',
    options: {
      // credential,
      config: options.Auth,
    },
  })
}

function addServiceWorker({ config }, templateFile, templateOptions = {}) {
  // Add Service Worker Template
  this.addTemplate({
    src: r(`sw-templates/${templateFile}`),
    fileName: resolve(
      this.options.srcDir,
      this.options.dir.static,
      templateFile
    ),
    options: {
      config,
      ...templateOptions,
    },
  })
}

function loadAuth(options) {
  const auth = options.Auth
  const noop = (_) => _

  console.log('options', options)

  // Early return when ssr auth is not needed
  if (!options.ssr) {
    return noop
  }

  this.addPlugin({
    src: r('plugins/services/auth.initialize.js'),
    fileName: 'amplify/service.auth.initialize.js',
  })

  // const ssrConfig = Object.assign({}, auth.ssr)
  // options.sessions = false

  // Add Service-Worker
  addServiceWorker.call(this, options, 'amplify-auth-sw.js', {
    authOptions: auth,
    ignorePaths: [
      '/__webpack_hmr',
      '/_loading',
      this.options.build.publicPath,
      [],
    ],
  })

  // if (ssrConfig.serverLogin && credential) {
  //   options.sessions = Object.assign({}, ssrConfig.serverLogin)

  //   this.addPlugin({
  //     src: r('plugins/services/auth.serverLogin.js'),
  //     fileName: 'firebase/service.auth.serverLogin-server.js',
  //     mode: 'server',
  //     options: {
  //       credential,
  //       config: options.config,
  //     },
  //   })

  //   const sessionLifetime = options.sessions.sessionLifetime || 0

  //   this.nuxt.hook('render:routeDone', async (_, __, { res }) => {
  //     if (!res || !res.locals || !res.locals._session) {
  //       return
  //     }

  //     const { _session: session, _manager: manager } = res.locals

  //     if (manager) {
  //       manager.endSession(session.name)
  //       return
  //     }

  //     // fallback if session manager was not passed (SHOULD NOT HAPPEN)
  //     const elapsed = Date.now() - session.options._created
  //     if (elapsed >= sessionLifetime) {
  //       try {
  //         await session.delete()
  //       } catch (error) {
  //         logger.error('App deletion failed: ' + error.code)
  //       }
  //     }
  //   })
  // }

  console.log('auth.ssr.js -> include ', auth)

  // return () => {

  // }
}

function isEmpty(val) {
  return val == null || !(Object.keys(val) || val).length
}
