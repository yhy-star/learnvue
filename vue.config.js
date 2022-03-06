// 用来配置别名
module.exports = {
  // chainWebpack: config => {
  //   // 先刪除預設的svg配置
  //   config.module.rules.delete("svg")
  //   // 新增 svg-sprite-loader 設定
  //   config.module
  //     .rule("svg-sprite-loader")
  //     .test(/\.svg$/)
  //     .include
  //     .add(resolve("src/assets/imgs"))
  // .end()
  //     .use("svg-sprite-loader")
  //     .loader("svg-sprite-loader")
  //     .options({ symbolId: "[name]" })
  //   // 修改 images-loader 配置
  //   config.module
  //     .rule("images")
  //     .exclude.add(resolve("src/assets/icon"))
  // },
  configureWebpack: {
      resolve: {
          alias: {
              'assets': '@/assets',
              'common': '@/common',
              'components': '@/components',
              'networks': '@/networks',
              'views': '@/views'
          }
      }
  }
}



