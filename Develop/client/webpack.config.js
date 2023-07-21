const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { GenerateSW, InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

let workboxPluginsAdded = false;

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Text Editor",
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Text Editor App",
        short_name: "JATE",
        description: "Just Another Text Editor",
        background_color: "",
        theme_color: "",
        start_url: "./",
        public_path: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96],
            destination: path.join("assets", "icons"),
          },
        ],
      }),

      // Check if the plugins have been added before instantiating again
      !workboxPluginsAdded && new GenerateSW(),
      !workboxPluginsAdded &&
        new InjectManifest({
          swSrc: "./src-sw.js",
          swDest: "src-sw.js",
        }),
    ].filter(Boolean),

    // CSS loader
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
