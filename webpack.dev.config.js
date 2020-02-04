const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
	entry: {
		main: ['webpack-hot-middleware/client?reload=true', './src/client/app.js']
	},
	output: {
		path      : path.join(__dirname, 'dist'),
		publicPath: '/',
		filename  : '[name].js'
	},
	mode   : 'development',
	target : 'web',
	devtool: '#source-map',
	module : {
		rules: [
			{
				enforce: "pre",
				test   : /\.js$/,
				exclude: /node_modules/,
				loader : "eslint-loader",
				options: {
					emitWarning  : true,
					failOnError  : false,
					failOnWarning: false
				}
			},
			{
				test   : /\.js$/,
				loader : "babel-loader",
				exclude: file => (
					/node_modules/.test(file) &&
					!/\.vue\.js/.test(file)
				)
			},
			{
				test  : /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test  : /\.pug$/,
				loader: 'pug-plain-loader'
			},
			{
				test: /\.html$/,
				use : [
					{
						loader: "html-loader"
					}
				]
			},
			{
				test: /\.scss$/,
				use : [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.styl(us)?$/,
				use : [
					'vue-style-loader',
					'css-loader',
					'stylus-loader'
				]
			},
			{
				test: /\.css$/,
				use : [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use : ['file-loader']
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin(),
		new HtmlWebPackPlugin({
			template     : "./src/client/html/index.html",
			filename     : "index.html",
			excludeChunks: [ 'server' ]
		}),
		new webpack.NoEmitOnErrorsPlugin()
	],
	devServer: {
		noInfo          : true,
		hot             : true,
		watchContentBase: true
	},
	stats: {
		modules    : false,
		entrypoints: false
	}
}
