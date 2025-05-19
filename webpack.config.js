const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const baseManifest = require("./src/manifest.json");

module.exports = {
  entry: {
    main: { import: "./src/index.tsx", filename: "index.js" },
    background: { import: "./src/background.ts", filename: "background.js" },
    content: { import: "./src/content.ts", filename: "content.js" },
    scripts: {
      import: "./src/scripts/data_intercept.ts",
      filename: "scripts/data_intercept.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  mode: "production",

  devtool: "cheap-module-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "AMA Helper",
      template: "src/index.html",
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest,
      },
    }),
  ],
};
