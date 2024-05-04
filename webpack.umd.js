// webpack.umd.js
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common.js';
import path from 'path';

export default merge(commonConfig, {
  output: {
    path: path.resolve('dist'),
    filename: 'my-chatbot-widget.umd.js',
    library: {
      name: 'MyChatBotWidget',
      type: 'umd',
    },
    globalObject: 'this',
  },
});
