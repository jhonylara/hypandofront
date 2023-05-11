import colors from 'vuetify/es5/util/colors'

export default {

  publicRuntimeConfig: {
    passport: {
      CLIENT_ID: process.env.PASSPORT_CLIENT_ID,
      TOKEN_URL: process.env.PASSPORT_TOKEN_URL,
      CALLBACK_URL: process.env.PASSPORT_CALLBACK_URL,
      AUTHORIZE_URL: process.env.PASSPORT_AUTHORIZE_URL,
    },
  },
  privateRuntimeConfig: {
    API_URL: process.env.PASSPORT_CLIENT_ID
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - hypdofront',
    title: 'hypdofront',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/apiAxios.js',
    { src: "~/plugins/mask.js", mode: "client" },
  ],

  // axios: {
  //   baseURL: process.env.AUTH_SERVICE_URL
  // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // axios: {
  //   baseURL: process.env.HYPDO_SERVER_URL,
  //   credentials: true, // this says that in the request the httponly cookie should be sent
  // },

  auth: {
    sessionStorage: false,
    localStorage: false,
    cookie: true,
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login/callback', // need this for the auth module to know what path to execute the auth code callback
      home: '/business',
    },
    // localStorage: false,
    // sessionStorage: false,
    // cookie: false,
    // token: {
    //   property: 'access_token',
    //   prefix: 'access_token.',
    //   type: 'Bearer',
    //   maxAge: 1800,
    // },
    // refreshToken: {
    //   property: 'refresh_token',
    //   prefix: 'refresh_token.',
    //   maxAge: 60 * 60 * 24 * 30
    // },
    strategies: {
      // google: {
      //   clientId: process.env.GOOGLE_CLIENT_ID,
      //   codeChallengeMethod: 'S256',
      //   responseType: 'code',
      // accessType: offline,
      //   grantType: 'authorization_code',
      //   redirectUri: process.env.PASSPORT_CALLBACK_URL,
      //   endpoints: {
      //     token: 'http://localhost/token/google',
      //   },

        // token: {
        //   property: 'access_token',
        //   type: 'Bearer',
        //   maxAge: 1800,
        //   sessionStorage: false,
        //   localStorage: false,
        //   cookie: false,
        // },
      // },
      social: {
        scheme: 'oauth2',
        endpoints: {
          authorization: process.env.PASSPORT_AUTHORIZE_URL,
          token: process.env.PASSPORT_TOKEN_URL,
        },
        token: {
          prefix: 'access_token.',
          property: 'access_token',
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        responseType: 'code',
        grantType: 'authorization_code',
        redirectUri: process.env.PASSPORT_CALLBACK_URL,
        clientId: 1,
        scope: ['*'],
        codeChallengeMethod: 'S256',
      }
    }
  }
}
