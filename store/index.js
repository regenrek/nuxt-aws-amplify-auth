const actions = {
  async nuxtServerInit({ dispatch }, ctx) {
    // check if user is logged in
    // await dispatch('auth/load', ctx)
    // const req = ctx.req

    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      })
    } else {
      console.log('no ctx.res')
    }
  },

  async onAuthStateChanged({ commit }, { authUser }) {
    console.log('onAuthStateChanged...', authUser)
    if (!authUser) {
      // commit('RESET_STORE')
      return
    }
    if (authUser && authUser.getIdToken) {
      try {
        const idToken = await authUser.getIdToken(true)
        console.info('idToken', idToken)
      } catch (e) {
        console.error(e)
      }
    }
    // commit('SET_AUTH_USER', { authUser })
  },
}

export default {
  actions,
}
