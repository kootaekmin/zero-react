const path = require('path');

module.exports = {
	name: 'wordrelay-setting',
	mode: 'development', //실서비스에는 production
	devtool: 'eval',
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	entry: {
		app: ['./client'],
	}, // input

	module: {
		rules: [
			{
				test: /\.jsx?/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
					plugins: ['@babel/plugin-proposal-class-properties'],
				},
			},
		],
	}, //babel <--> webpack

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'App.js',
	}, // output
};
