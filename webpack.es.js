// webpack.es.js
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(commonConfig, {
  
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'my-chatbot-widget-webpack.es.js',
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },  
});
