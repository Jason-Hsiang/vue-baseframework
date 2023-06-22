import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const AutoImport = require('unplugin-auto-import/vite')
const Components = require('unplugin-vue-components/vite')

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      // eslintrc: {
      //   enabled: true
      // },
      resolvers: [
          //自动导入element-plus相关函数 elmessage, elmessagebox...
          ElementPlusResolver(),
          //自动导入icon组件
          IconsResolver({
            prefix: 'Icons'
          })
      ]
    }),
    Components({
      resolvers: [
          //自动导入 element-plus
          ElementPlusResolver(),
          //自动注册icons组件
          IconsResolver({
            enabledCollections: ['ep']
          })
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    https: false, // 是否开启 https
    open: true, // 是否自动在浏览器中打开
    port: 9999, // 端口号
    host: "localhost",
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
