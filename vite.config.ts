// https://vitejs.dev/config/
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';


export default defineConfig(( { mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return{
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/entry.tsx'),
      name: 'MyChatBotWidget',
      fileName: (format) => `my-chatbot-widget.${format}.js`
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled into your library
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV) || 'development'
  },
}
});
