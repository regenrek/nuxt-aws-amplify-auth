export default {
  Auth: {
    identityPoolId: process.env.AWS_AUTH_IDENTITY_POOL_ID,
    region: process.env.AWS_AUTH_REGION,
    userPoolId: process.env.AWS_AUTH_USER_POOL_ID,
    userPoolWebClientId: process.env.AWS_AUTH_USER_POOL_WEB_CLIENT_ID,
  },
  Storage: {
    AWSS3: {
      bucket: process.env.AWS_STORAGE_AWSS3_BUCKET,
      region: process.env.AWS_STORAGE_AWSS3_REGION,
    },
  },
  ssr: true,
}
