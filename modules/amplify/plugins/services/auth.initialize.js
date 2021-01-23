// runs the functions once BEFORE the root Vue.js Application is instantiated.
export default ({}) => {
  // Can only be initiated on client side
  if (!process.client) {
    return
  }

  console.log('Hello aws amplify module from auth.initialize.js function')

  // return $fireAuthStore.subscribe()
}
