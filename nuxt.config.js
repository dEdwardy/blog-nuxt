import { resolve } from 'path'
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  server:{
    port:8088
  },
  head: {
    title: 'blog',
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
    '@/assets/styles/page-transition.css',
    'element-ui/lib/theme-chalk/index.css',
    'reset.css',
    '@/assets/styles/base.scss',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  router: {
    middleware: 'i18n'
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/svg-icon', //注册 svg-icons插件文件 
    '@/plugins/i18n.js',  //注册国际化语言包插件
    { src:'@/plugins/nuxt-quill-plugin.js', ssr:false },  //注册vue quill editor ssr
    // '@/plugins/axios',
    // '@/plugins/axios-api'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],
  //进度条样式修改
  loading:{
    color:'#1890ff',
    height:'2px'
  },  
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
    'nuxt-vuex-localstorage',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    // '@nuxt/content',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://rap2api.taobao.org/app/mock/272279',
    proxy:{
      '/api/': {
        target: 'http://localhost:3001/',
        pathRewrite: {
          '^/api/': ''
        }
      }
    }
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
    extend(config, context) {
      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));
      svgRule.exclude = [resolve(__dirname, 'assets/icons/svg')];

      config.module.rules.push({
        test: /\.svg$/,
        //将存放svg的目录加入到loader处理目录
        include: [resolve(__dirname, 'assets/icons/svg')],
        use: [{ loader: 'svg-sprite-loader', options: { symbolId: 'icon-[name]' } }]
      })
    }
  }
}
