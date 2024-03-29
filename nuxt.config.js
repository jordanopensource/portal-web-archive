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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  server: {
    port: process.env.PORT || 3000, // default: 3000
    host: process.env.HOST, // default: localhost,
    timing: false,
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
    { src: '~/plugins/vue-notification', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    [
      '@zecar/nuxt-matomo',
      {
        matomoUrl: '//track.josa.ngo/',
        siteId: process.env.MATOMO_SITE_ID,
      },
    ],
    '@nuxtjs/axios',
    'nuxt-ssr-cache',
    '@nuxtjs/moment',
    'nuxt-healthcheck',
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
      target: process.env.PORTAL_API_URL,
      pathRewrite: { '^/api/': '' },
    },
    '/bucket': {
      target: process.env.ASSETS_BUCKET_URL,
      pathRewrite: { '^/bucket/': '' },
    },
    '/ots': {
      target: process.env.OTS_API_URL,
      pathRewrite: { '^/ots/': '' },
    },
  },

  publicRuntimeConfig: {
    baseUrl: process.env.PORTAL_API_URL,
    bucketUrl: process.env.ASSETS_BUCKET_URL,
    bbbAPIUrl: process.env.BBB_API_URL,
    bbbAPISecret: process.env.BBB_API_SECRET,
    otsUrl: process.env.OTS_API_URL,
    otsToken: process.env.OTS_API_TOKEN,
    otsFormGroup: process.env.OTS_FORM_GROUP,
    siteId: process.env.MATOMO_SITE_ID || 1,
    buildBranch: process.env.DRONE_BRANCH,
    buildID: process.env.DRONE_BUILD_PARENT,
    buildCommitSHA: process.env.DRONE_COMMIT_SHA,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      /* icon options */
      source: './static/josa-icon.png',
      fileName: 'josa-icon.png',
    },
    meta: {
      mobileAppIOS: true,
      lang: 'en,ar',
      name: 'Jordan Open Source Association',
    },
    manifest: {
      name: 'Jordan Open Source Association',
      short_name: 'JOSA',
      lang: 'en',
    },
  },

  healthcheck: {
    path: '/healthcheck',
    contentType: 'application/json',
    healthy: () => {
      return JSON.stringify({ result: `I'm alive!!!` })
    },
  },

  cache: {
    useHostPrefix: false,
    pages: ['/'],
    store: {
      type: 'memory',
      // maximum number of pages to store in memory
      max: 10,
      // number of seconds to store this page in cache
      ttl: 120,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  },
}
