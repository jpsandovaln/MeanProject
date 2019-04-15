const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const basePath = __dirname;
const distPath = './build';
 
const indextInput = './src/index.html';
const indexOutput = 'index.html';

module.exports = {
	entry: {
	  app: [
			'babel-polyfill',
			'./src/index.js'
		]
	},
	devServer: {
		host: "172.21.19.17",
		port: 4200,
		contentBase: "./build",
		inline: true,
		disableHostCheck: true,
		historyApiFallback: true
	},
	output: {
		path: path.resolve(basePath, distPath),
		filename: 'index.bundle.js',
	},
	module: {
		loaders: [
			{
			    test: /\.js?$/,
			    exclude: /node_modules/,
			    loader: 'babel-loader',
			    query: {
				    presets: ['env', 'stage-0']
				}
			},
			{
                test: /\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                quality: '65-90',
                                progressive: true
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            optipng: {
                                optimizationLevel: 7
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loaders: [
                    'html-loader'
                ]
            }
		]
	},
	plugins: [
        new HTMLWebpackPlugin({
			inject: false,
            filename: indexOutput, 
            template: indextInput
        })
    ]

};

