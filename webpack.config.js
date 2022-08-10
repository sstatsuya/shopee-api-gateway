var path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
    },
  },
};
