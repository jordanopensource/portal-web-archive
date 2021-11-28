export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'portal-web-beta',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** the loading progress-bar color
   */
  loading: { color: '#3897c0' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/typography.css',
    '@/assets/css/layout.css',
    '@/assets/css/global.css',
    '@/assets/css/fonts/ibm-plex.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/datetime-filter' },
    { src: '~/plugins/vue2-filters' },
    { src: '~/plugins/string-filters' },
    { src: '~/plugins/i18n' },
    { src: '~/plugins/og-tags' },
    { src: '~/plugins/leaflet', mode: 'client' },
    { src: '~/plugins/copy' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/moment',
    '@nuxtjs/redirect-module',
    '@nuxtjs/i18n',
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas'],
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab'],
          },
        ],
      },
    ],
  ],

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en',
        file: 'en.js',
        name: 'English',
        dir: 'ltr',
      },
      {
        code: 'ar',
        iso: 'ar',
        file: 'ar.js',
        name: 'العربية',
        dir: 'rtl',
      },
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    lazy: true,
    langDir: 'lang/',
    detectBrowserLanguage: false,
    baseUrl: 'https://josa.ngo',
  },

  moment: {
    defaultLocale: 'en',
    locales: ['ar'],
  },

  redirect: [
    {
      from: '^/opendata',
      to: 'https://www.mynaparrot.com/en/my-classrooms/rooms?layout=login&roomId=1964&clientId=josa',
    },
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    '/api': {
      target: process.env.API_BASE_URL,
      pathRewrite: { '^/api/': '' },
    },
    '/bucket': {
      target: process.env.BUCKET_URL,
      pathRewrite: { '^/bucket/': '' },
    },
  },

  publicRuntimeConfig: {
    baseUrl: process.env.API_BASE_URL,
    bucketUrl: process.env.BUCKET_URL,
    bbbAPIUrl: process.env.BBB_API_URL,
    bbbAPISecret: process.env.BBB_API_SECRET,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
