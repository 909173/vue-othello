const path = require("path");
module.exports = {
  /* ... other settings */
  transpileDependencies: ["vuex-module-decorators"],
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "/src") // 1. @の参照先の変更
      }
    }
  },
  outputDir: "dist", // 2. 出力先
  assetsDir: "static"
};
