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
    bootstrap: {
      import: "./src/bootstrap/bootstrap.bundle.min.js",
      filename: "./bootstrap/bootstrap.bundle.min.js",
    },
    logo16: "./src/img/logo16.png",
    logo32: "./src/img/logo32.png",
    logo48: "./src/img/logo48.png",
    default: "./src/img/default.png",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png)$/,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]",
        },
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
