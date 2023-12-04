import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import dotenv from "dotenv";
import reactRefresh from '@vitejs/plugin-react-refresh';

// ----------------------------------------------------------------------
dotenv.config()

export default defineConfig({
  plugins: [
    react(),
    checker({
      
    }),
    reactRefresh(),
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
  define:{
    'process.env':process.env
  }
});
