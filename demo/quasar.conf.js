// Configuration for your app

const path = require('path')

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'components',
      'qiconpicker'
    ],

    css: [
      'app.sass'
    ],

    extras: [
      'ionicons-v4',
      'mdi-v4',
      'fontawesome-v5',
      'eva-icons',
      'themify',
      'material-icons-outlined',
      'material-icons-round',
      'material-icons-sharp',
      'line-awesome',

      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font',
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      config: {
        dark: 'auto'
      },

      // all: true, // --- includes everything; for dev only!

      components: [
        'QBtn',
        'QCard',
        'QCardSection',
        'QCheckbox',
        'QDialog',
        'QDrawer',
        'QExpansionItem',
        'QHeader',
        'QIcon',
        'QInput',
        'QItem',
        'QItemLabel',
        'QItemSection',
        'QLayout',
        'QList',
        'QMenu',
        'QPage',
        'QPageContainer',
        'QPageScroller',
        'QPopupProxy',
        'QResizeObserver',
        'QScrollArea',
        'QSelect',
        'QSeparator',
        'QSpace',
        'QTab',
        'QTabPanel',
        'QTabPanels',
        'QTabs',
        'QToggle',
        'QToolbar',
        'QToolbarTitle',
        'QTooltip'
      ],

      directives: [
        'ClosePopup',
        'Ripple',
        'Scroll'
      ],

      // Quasar plugins
      plugins: [
        'Dialog',
        'Notify',
        'Platform',
        'Screen'
      ]

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      publicPath: 'quasar-ui-qiconpicker',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      },

      chainWebpack (chain) {
        chain.resolve.alias.merge({
          'ui': path.resolve(__dirname, '../ui/src/index.js'),
          '@quasar/quasar-ui-qiconpicker': path.resolve(__dirname, '../ui'),
          'sass': path.resolve(__dirname, '../ui/src/index.sass'),
          'examples': path.resolve(__dirname, './src/examples')
        })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
      watchOptions: {
        ignored: [
          'node_modules',
          '!node_modules/@quasar/quasar-app-extension-qiconpicker'
        ]
      }
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
      // noIosLegacyBuildFlag: true // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
