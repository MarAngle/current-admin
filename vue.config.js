const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const proxy = require('./src/config/proxy/index.js')
const setting = require('./src/setting')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const config = {
  transpileDependencies: true,
  publicPath: './',
  pages: {
    index: {
      entry: 'src/pages/index/main.js',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      title: setting.page.index.title
    }
  },
  configureWebpack: config => {
    config.plugins.push(
      new MomentLocalesPlugin({
        localesToKeep: ['es-us', 'zh-cn']
      })
    )
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@assets', resolve('src/assets'))
      .set('@config', resolve('src/config'))
      .set('@layout', resolve('src/config/layout'))
      .set('@api', resolve('src/config/api'))
      .set('@index', resolve('src/pages/index'))
    // 此处实现正常的非对应文件夹下的svg按照原有loader加载也就是图片进行加载
    config.module.rule('svg').exclude.add(resolve('src/config/icon/data')).end();
    // 此处设置对应文件夹下的svg按照特殊规则进行加载
    config.module.rule('icons').test(/\.svg$/).include.add(resolve('src/config/icon/data')).end().use('svg-sprite-loader').loader('svg-sprite-loader').options({
      symbolId: 'icon-[name]'
    }).end();
  },
  devServer: {}
}

if (proxy.run) {
  config.devServer.proxy = proxy.data
}

module.exports = defineConfig(config)
