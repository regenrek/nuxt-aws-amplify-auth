export const state = () => ({
  isAuthenticated: false,
  cognitoUser: null,
})

export const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated
  },
}

export const mutations = {
  setCognitoUser(state, cognitoUser) {
    state.cognitoUser = cognitoUser
    state.isAuthenticated = !!cognitoUser
  },
}

export const actions = {
  async load({ commit, dispatch }) {
    try {
      const cognitoUser = await this.$auth.client.currentAuthenticatedUser()

      console.log('Loading User with data', cognitoUser)

      commit('setCognitoUser', cognitoUser)

      return Promise.resolve(cognitoUser)
    } catch (error) {
      commit('setCognitoUser', null)
      console.error('Loading user error', error)
      return Promise.resolve(null)
    }
  },

  async signup(_, userData) {
    const user = await this.$auth.client.signUp(userData)
    return user
  },

  async confirmSignup(_, { email, code }) {
    return await this.$auth.client.confirmSignUp(email, code)
  },

  async login({ commit, dispatch }, { email, password }) {
    const cognitoUser = await this.$auth.client.signIn(email, password)
    commit('setCognitoUser', cognitoUser)
    return cognitoUser
  },

  async logout({ commit }) {
    commit('setCognitoUser', null)

    try {
      await this.$auth.client.signOut({ global: true })
      this.$router.push('/')
      console.log('Logout successfull')
    } catch (error) {
      console.error(error)
    }
  },

  async refreshSession({ commit }) {
    return await this.$auth.client
      .currentSession()
      .then((data) => data)
      .catch((err) => {
        commit('setCognitoUser', null)
        return err
      })
  },

  /**
   *
   * @TODO: Implement in Frontend
   */
  async forgotPassword(_, { email }) {
    return await this.$auth.client.forgotPassword(email)
  },

  /**
   *
   * @TODO: Implement in Frontend
   */
  async forgotPasswordSubmit(_, { email, code, newPassword }) {
    return await this.$auth.client.forgotPasswordSubmit(
      email,
      code,
      newPassword
    )
  },
}
