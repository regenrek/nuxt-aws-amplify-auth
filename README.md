# nuxt-aws-amplify-auth


### ✔️ Cache Disabled



### ❌ Cache Enabled

With `Cache-Control` enabled it will cache server response to speed the website update but **user sessions will be shared across the application**. This has the effect you logged in with someone else user account which shouldn't happen.

```
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
```




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
