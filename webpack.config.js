const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: ['./web/polyfills.js', './web/index.js'],
  output: {
    path: path.resolve(__dirname, 'web-build'),
    filename: 'bundle.js',
    publicPath: '/Pages',
  },
  cache: false, // Disable caching in development
  devServer: {
    static: {
      directory: path.join(__dirname, 'web-build'),
    },
    compress: true,
    port: 3000,
    hot: true,
    liveReload: true,
    open: true,
    historyApiFallback: true,
    watchFiles: {
      paths: ['content/**/*.json', 'src/**/*'],
      options: {
        usePolling: true,
      },
    },
    headers: {
      'Cache-Control': 'no-store',
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { loose: true }],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              ['@babel/plugin-transform-class-properties', { loose: true }],
              ['@babel/plugin-transform-private-methods', { loose: true }],
              ['@babel/plugin-transform-private-property-in-object', { loose: true }],
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.web.js', '.web.ts', '.web.tsx', '.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-safe-area-context': path.resolve(__dirname, 'web/SafeAreaContext.js'),
      'react-native-gesture-handler': 'react-native-web',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/index.html',
      inject: true,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  node: {
    global: true,
  },
};

