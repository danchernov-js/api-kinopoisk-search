export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  serverMiddleware: [
    { path: "/", handler: require("body-parser").json() },
    {
      path: "/api",
      handler: (req, res, next) => {
        const url = require("url");
        req.query = url.parse(req.url, true).query;
        req.params = { ...req.query, ...req.body };
        next();
      }
    },
    { path: "/api", handler: "~/serverMiddleware/api-server.js" }
  ]
}
