const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
	entry: {
		main: './src/client/app.js'
	},
	output: {
		path      : path.join(__dirname, 'dist'),
		publicPath: '/',
		filename  : '[name].js'
	},
	target      : 'web',
	devtool     : '#source-map',
	// Webpack 4 does not have a CSS minifier, although
	// Webpack 5 will likely come with one
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache    : true,
				parallel : true,
				sourceMap: true   // set to true if you want JS source maps
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	module: {
		rules: [
			{
				// Transpiles ES6-8 into ES5
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
						loader : 'html-loader',
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.jpg$/,
				use : [{loader: 'url-loader'}]
			},
			{
				test: /\.scss$/,
				use : [
					MiniCssExtractPlugin.loader,
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.styl(us)?$/,
				use : [
					MiniCssExtractPlugin.loader,
					'vue-style-loader',
					'css-loader',
					'stylus-loader'
				]
			},
			{
				// Loads CSS into a file when you import it via Javascript
				// Rules are set in MiniCssExtractPlugin
				test: /\.css$/,
				use : [MiniCssExtractPlugin.loader, 'css-loader']
			},
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebPackPlugin({
			template: './src/client/html/index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			filename     : '[name].css',
			chunkFilename: '[id].css'
		})
	],
	devServer: {
		noInfo: true
	},
	stats: {
		modules    : false,
		entrypoints: false
	}
}
