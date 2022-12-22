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
    config.entry("app").add("./dev/main.js")
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
  }
})
