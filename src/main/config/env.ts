export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '562597475202505',
    clientSecret: process.env.FB_CLIENT_SECRET ?? '04cbe2523a2d95829f3ddae39b60f783'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? '14dsfdsf563gfg'
}
