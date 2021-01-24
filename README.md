# nuxt-aws-amplify-auth


### ✔️ Cache Disabled



### ❌ Cache Enabled

With `Cache-Control` enabled it will cache server response to speed the website up but **user sessions will be shared across the application**. This has the effect that you're logged in with someone else user account which of course shouldn't happen.

```
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
```

Reproduce: 

1. Login with given credentials on login page.
2. Open a new icognito tab and see that you still loggedin




## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
# nuxt-aws-amplify-auth
