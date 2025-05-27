const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const baseManifest = require("./src/manifest.json");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    main: { import: "./src/index.tsx", filename: "index.js" },
    background: { import: "./src/background.ts", filename: "background.js" },
    content: { import: "./src/content.ts", filename: "content.js" },
    contentwp: { import: "./src/content_wp.ts", filename: "content_wp.js" },
    data_script: {
      import: "./src/scripts/data_intercept.ts",
      filename: "scripts/data_intercept.js",
    },
    wp_script: {
      import: "./src/scripts/wordpress_fill.ts",
      filename: "scripts/wordpress_fill.js",
    },
    bootstrap: {
      import: "./src/bootstrap/bootstrap.bundle.min.js",
      filename: "./bootstrap/bootstrap.bundle.min.js",
    },
    logo16: "./src/img/logo16.png",
    logo32: "./src/img/logo32.png",
    logo48: "./src/img/logo48.png",
    default: "./src/img/default.png",
    fullLogo: "./src/img/ama-logo-long-2018.png",
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
    new Dotenv(),
  ],
};
