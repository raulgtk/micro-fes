const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("../package.json").dependencies;
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const domain = 'http://localhost:3000'
const devConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/main/latest/',
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "main",
      filename: "remoteEntry.js",
      remotes: {
        core: `core@${domain}/core/latest/remoteEntry.js`,
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        ac: `ac@${domain}/ac/latest/remoteEntry.js`,
        rrhh: `rrhh@${domain}/rrhh/latest/remoteEntry.js`,
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
