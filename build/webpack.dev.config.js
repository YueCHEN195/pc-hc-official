const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    noInfo: true, //隐藏 webpack 包(bundle)信息」的消息
    port: 8188 //端口
  },
  module: {
    rules: [
      // {
      //     test: /\.(js)$/,
      //     loader: 'eslint-loader',
      //     enforce: 'pre', // 在babel-loader对源码进行编译前进行lint的检查
      //     include: path.resolve(__dirname, '../src/'), // src文件夹下的文件需要被lint
      //     options: {
      //         formatter: require('eslint-friendly-formatter') // 编译后错误报告格式
      //     }
      // },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(less)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  },
  //添加了此项，则表明从外部引入，内部不会打包合并进去.
  //jquery如需从外部加载，则可选择此项
  // externals: {
  //     jquery: 'jQuery'
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) //暴露变量。判断当前环境是否为dev/build环境
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    //分离css样式
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin() //热加载
  ],
  devtool: '#cheap-module-eval-source-map',
});