// import { withSSRContext } from 'aws-amplify'
import Auth from '@aws-amplify/auth'
import Amplify from '@aws-amplify/core'

const options = <%= serialize(options) %>
Amplify.configure(options)

const getUser = () => {
    //const { Auth } = withSSRContext({ req: ctx.req })

    const cognitoUser = await Auth.currentAuthenticatedUser()
    if (!cognitoUser) throw new Error(cognitoUser)
}

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url)

    console.log("SW url", url)


    // const expectsHTML = event.request.headers.get('accept').includes('text/html')

    // const isSameOrigin = self.location.origin === url.origin
    // const isHttps = (self.location.protocol === 'https:' || self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1')


    event.respondWith(
        async function () {
            return fetch(event.request)
        }()
    )
})