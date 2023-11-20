const { defineConfig } = require('@vue/cli-service')
//const SpritePlugin = require('svg-sprite-loader/plugin')
const { resolve } = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false, //打包不生成map
  publicPath:'auto',
  lintOnSave: false,
  chainWebpack: config => {
    config.entry("app").clear()
    config.entry("app").add("./src/main.js")
    const svgRule = config.module.rule('svg')

    svgRule.clear()

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(resolve(__dirname, 'src/'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({})
      .end()
      .before('svg-sprite-loader')
      .use('svgo-loader')
      .loader('svgo-loader')
      .options({
        plugins: [
          {
            name: 'removeAttrs',
            params: {
              attrs: 'fill'
            }
          }
        ]
      })
      .end();
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin')).end()

  },
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve("path-browserify"),
        zlib: require.resolve("browserify-zlib"),
        stream: require.resolve("stream-browserify")
      },

    }
  },
  css:{
    extract:false
  },
  devServer: {
    proxy: {
      // 这里的api 表示如果我们的请求地址有/api的时候,就出触发代理机制
      // localhost:8888/api/abc  => 代理给另一个服务器
      // 本地的前端  =》 本地的后端  =》 代理我们向另一个服务器发请求 （行得通）
      // 本地的前端  =》 另外一个服务器发请求 （跨域 行不通）
      '/api': {
          target: 'https://clm.show', // 我们要代理的地址
          changeOrigin: true, // 是否跨域 需要设置此值为true 才可以让本地服务代理我们发出请求
          // 路径重写
          // 默认的路径：target+baseUrl+apiUrl
          // 如：www.baidu.com/api/login，如果后端接口就是该路径，就不用写 pathRewrite
          pathRewrite: {
              // 重新路由  localhost:8888/api/login  => www.baidu.com/api/login
              '^/api': '/api' // 假设我们想把 localhost:8888/api/login 变成www.baidu.com/login 就需要这么做 
          }
        }
    }
  }
})
