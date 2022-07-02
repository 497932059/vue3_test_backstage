// eslint-disable-next-line @typescript-eslint/no-var-requires
const AutoImport = require("unplugin-auto-import/webpack");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Components = require("unplugin-vue-components/webpack");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  devServer: {
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BASE_API,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
