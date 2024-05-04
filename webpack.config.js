// webpack.config.mjs
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'url';

// Determine the current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = (env, argv) => {
  const mode = argv.mode || 'development'; // Set mode based on the command line argument or default to 'development'
  const isProduction = mode === 'production';

  return {
    entry: isProduction ? './src/entry.tsx' : './src/main.tsx',
    output: {
      path: path.resolve('dist'),
      filename: '[name].[contenthash].js',
      library: 'MyChatBotWidget',
      libraryTarget: 'umd',
      globalObject: 'this',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: 'swc-loader',
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.svg$/,
          use: 'file-loader'
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                mimetype: 'image/png'
              }
            }
          ]
        }
      ]
    },
    devServer: {
      'static': {
        directory: './dist'
      },
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        templateContent: ({ htmlWebpackPlugin }) => '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + htmlWebpackPlugin.options.title + '</title></head><body><div id="app"></div></body></html>',
        filename: 'index.html',
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),// use 'development' as the default value
      }),
    ],
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
        '.js'
      ],
      alias: {
        '/': path.resolve(__dirname, './'), // Alias for the root directory
      },
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  };
};

export default config;
