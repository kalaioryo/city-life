const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const path = require("path");

module.exports = (env,argv) => {

  const entryPath =
  argv.mode === "development" ? "./src/index_dev.js" : "./src/index.js";
  return {

    entry: path.resolve(__dirname, entryPath),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].bundle.js',
    },
    devServer: {
        static: './build',
        open: true
      },
      plugins: [

        new HtmlWebpackPlugin({
          title: "City-Life",
          template: path.resolve(__dirname, './src/index.html'),
        }),
        new Dotenv(),
        new FaviconsWebpackPlugin('./src/img/favicon-16x16.png')
      ],
      module: {
        rules:[
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
            
        ]}
      
  };
}