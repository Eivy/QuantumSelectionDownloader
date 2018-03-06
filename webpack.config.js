var path = require('path')

module.exports = [
	{
		entry: {
			'activeTab': './activeTab.js',
			'background': './background.js'
		},
		output: {
			path: path.join(__dirname, '/SelectionDownloader'),
			filename: '[name].js'
		},
		devtool: 'inline-source-map',
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'eslint-loader',
					options: {
						formatter: require('eslint-friendly-formatter')
					}
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				}
			]
		}
	}
]
