import Amplify from '@aws-amplify/core'
const options = <%= JSON.stringify(options) %>
Amplify.configure(options)