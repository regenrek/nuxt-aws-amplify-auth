import Auth from '@aws-amplify/auth'
import Amplify from '@aws-amplify/core'

const config = <%= JSON.stringify(options) %>
console.log("WELCOEM TOE AUTH SSR", config)
Amplify.configure(config)

export default async ({ req, res }) => {

console.log("auth.ssr.js before req.headers.authorization")

  if (!req || !req.headers.authorization) {
    res.locals = {
      ...res.locals,
      user: null
    }
    console.log("No request - return")
    return
  }
    
    console.log("auth.ssr.js after req.headers.authorization", req.headers)

  // Parse the injected ID token from the request header.
  const authorizationHeader = req.headers.authorization || ''
  const components = authorizationHeader.split(' ')
  const idToken = components.length > 1 ? components[1] : ''

  try {
    // Try to verify the id token, additionally checking if the token was revoked
    //const decodedToken = await admin.auth().verifyIdToken(idToken)

      console.log('Try to verify the id token, additionally checking if the token was revoked')


      Auth.currentSession().then(data => console.log("JWT", data.getAccessToken().getJwtToken()))

      const cognitoUser = await Auth.currentAuthenticatedUser()
      console.log(cognitoUser)
      
      const authUser = {
        username: cognitoUser.username,
        loggedIn: true,
        email: cognitoUser.attributes?.email,
        signInUserSession: cognitoUser.signInUserSession?.accessToken?.jwtToken
      }

      res.locals = {
          ...res.locals,
          user: {
              ...authUser
          }
      }
  } catch (e) {
    console.error(e)
  }
}
