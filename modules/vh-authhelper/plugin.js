import { withSSRContext } from 'aws-amplify'

class AuthService {
  constructor(ctx) {
    this.$store = ctx.store
    this.params = ctx.params
    this.route = ctx.route
    this.client = this.authClient(ctx)
  }

  get isAuthenticated() {
    return this.$store.state.auth.isAuthenticated
  }

  get cognitoUser() {
    return this.$store.state.auth.cognitoUser
  }

  get email() {
    if (!this.cognitoUser) {
      return ''
    }
    return this.cognitoUser?.attributes?.email
  }

  get redirect() {
    return this.$store.state.auth.redirect
  }

  get dbUser() {
    return this.$store.state.auth?.dbUser
  }

  get currentUserId() {
    return this.$store.state.auth?.dbUser?.id
  }

  get isEmailVerified() {
    return this.$store.state.auth.isEmailVerified
  }

  get isLoggedin() {
    return this.isAuthenticated && !!this.dbUser
  }

  isLoggedinAndOnOwnProfile(id, name) {
    return this.isLoggedin && name === 'user-id' && this.dbUser?.id === id
  }

  isLoggedinAndOnOwnCompanyProfile(id, name) {
    return this.isLoggedin && name === 'company-id' && this.company?.id === id
  }

  getError(message) {
    const errorMessages = [
      'An account with the given email already exists.',
      'Invalid verification code provided, please try again.',
      'Incorrect username or password.',
      'User does not exist.',
    ]
    if (!errorMessages.includes(message)) {
      message = 'An internal error has occured'
    }
    return message
  }

  authClient(ctx) {
    const { Auth } = withSSRContext(ctx)
    return Auth
  }
}

export default (ctx, inject) => {
  const authService = new AuthService(ctx)
  ctx.$auth = authService
  inject('auth', authService)
}
