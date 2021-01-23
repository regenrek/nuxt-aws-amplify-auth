// import { withSSRContext } from 'aws-amplify'
import Auth from '@aws-amplify/auth'
import Amplify from '@aws-amplify/core'

const options = {"config":undefined,"authOptions":{"identityPoolId":"eu-central-1:a8ccc8ad-783d-49d8-a8ec-12ddc5ef1cd3","region":"eu-central-1","userPoolId":"eu-central-1_wt0ZfYTXk","userPoolWebClientId":"1e9bs1ida0nhv754iddt3kthnk"},"ignorePaths":["\u002F__webpack_hmr","\u002F_loading","\u002F_nuxt\u002F",[]]}
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