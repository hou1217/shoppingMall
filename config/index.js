'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: '127.0.0.1', // can be overwritten by process.env.HOST
    port: 8086, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    //环境变量
    env:{
      NODE_ENV: '"development"',
      API_ROOT: '"http://jixiaosong.dev.dc.wallan-tech.com"',
      //API_ROOT:'"https://wander.wallan-tech.com:1443"'
    },
    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    // fat uat prod 三处环境的配制 
    fatEnv: {
      NODE_ENV: '"fat"',
      EVN_CONFIG:'"fat"',
      API_ROOT:'"https://wander.wallan-tech.com:1443"'
    },
    uatEnv: {
      NODE_ENV: '"uat"',
      EVN_CONFIG:'"uat"',
      API_ROOT:'"https://wander.wallan-tech.com:1443"'
    },
    prodEnv: {
      NODE_ENV: '"production"',
      EVN_CONFIG:'"prod"', 
      API_ROOT:'"https://wander.wallan-tech.com:1443"',
    },
    
    
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
