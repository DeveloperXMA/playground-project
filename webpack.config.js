// webpack.config.mjs
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (_, argv) => {
  const mode = argv.mode || 'development';
  const isProduction = mode === 'production';
  console.log(isProduction)
  return {
    mode,
    entry: isProduction ? './src/entry.tsx' : './src/main.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename:  isProduction ? 'my-chatbot-widget.umd.js' : '[name].[contenthash].js',
      publicPath: '/',
      library: {
        name: 'MyChatBotWidget',
        type: 'umd',
      },
      globalObject: 'this',
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      hot: true,
      historyApiFallback: true, // Ensures deep links work correctly
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: 'swc-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]', // Preserve the original filename
              },
            },
          ],
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                mimetype: 'image/png',
                name: '[name].[ext]', // Preserve the original filename
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  };
};
