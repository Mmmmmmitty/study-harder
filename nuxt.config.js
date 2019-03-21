module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'study-harder',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/plugins/index.css',
  ],
  plugins: [
    { src: '~/plugins/antd/ant-design-vue.js', ssr: true },
    { src: '~/plugins/gojs/go.js', ssr: true }, // 全局引入gojs
    { src: '~/plugins/highlight/highlight.js', ssr: true }, // 全局引入gojs
    // ssr: false 服务端不渲染
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.md$/,
          loader: 'text-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

