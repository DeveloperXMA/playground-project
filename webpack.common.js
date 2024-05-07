import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';

export default {
  mode,
  entry: isProduction ? path.join(__dirname, './src/entry.tsx') : path.join(__dirname, './src/main.tsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'swc-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
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
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    historyApiFallback: true, // Ensures deep links work correctly
  }
};