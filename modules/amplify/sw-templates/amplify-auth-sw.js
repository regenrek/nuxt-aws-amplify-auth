// import { withSSRContext } from 'aws-amplify'
// import Auth from '@aws-amplify/auth'
// import Amplify from '@aws-amplify/core'
//import { resolve } from 'core-js/fn/promise'
// import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components';
const ignorePaths = <%= serialize(options.ignorePaths) %>
const authOptions = <%= serialize(options.authOptions) %>

importScripts(
  'https://cdnjs.cloudflare.com/ajax/libs/aws-amplify/3.3.14/aws-amplify.min.js'
)

Amplify.configure({Auth: authOptions, ssr: true})

const getUser = async () => {
    //const { Auth } = withSSRContext({ req: ctx.req })

    // onAuthUIStateChange((authState, authData) => {
    //   this.onAuthStateChange(authState, authData);
    //   this.toastMessage = '';
    // });

    const cognitoUser = await Auth.currentAuthenticatedUser()
    
    if (cognitoUser) {
        const data = await Auth.currentAuthenticatedUser()
                    .getSignInUserSession()
                    .getAccessToken()
            .getJwtToken();
        return data
    } else {
        return { user: 'nologin' }
    }
}


const fetchWithAuthorization = async (original, idToken) => {
  // Clone headers as request headers are immutable.
  const headers = new Headers()
  for (let entry of original.headers.entries()) {
    headers.append(entry[0], entry[1])
  }

  // Add ID token to header.
  headers.append('Authorization', 'Bearer ' + idToken)

  // Create authorized request
  const { url, ...props } = original.clone()
  const authorized = new Request(url, {
    ...props,
    mode: 'same-origin',
    redirect: 'manual',
    headers
  })

  return fetch(authorized)
}


self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url)

    console.log("SW url", url)


    // const expectsHTML = event.request.headers.get('accept').includes('text/html')

    // const isSameOrigin = self.location.origin === url.origin
    // const isHttps = (self.location.protocol === 'https:' || self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1')


    // event.respondWith(
    //     async function () {
    //         return fetch(event.request)
    //     }()
    // )

    event.respondWith(async function () {
        
        const token = await getUser()
        if (token) {
            fetchWithAuthorization(event.request, token).catch(() => fetch(event.request))
        } else {
            fetch(event.request)
        }
    })
})

// In service worker script.
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim())
})
