import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
// import resolve from 'vite-plugin-resolve'
// import electron from 'vite-plugin-electron/renderer'

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, '../../env')
  const { VITE_DEV_SERVER_PORT } = loadEnv(mode, envDir)
  return {
    base: './',
    root: __dirname,
    envDir,
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      Vue({
        reactivityTransform: true,
      }),
      // electron(),
      // resolve(
      //   /**
      //    * Here you can specify other modules
      //    * 🚧 You have to make sure that your module is in `dependencies` and not in the` devDependencies`,
      //    *    which will ensure that the electron-builder can package it correctly
      //    */
      //   {
      //     // If you use electron-store, this will work - ESM format code snippets
      //     'electron-store': 'const Store = require("electron-store"); export default Store;',
      //   },
      // ),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          '@vueuse/core',
        ],
        dts: true,
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true,
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss({
        configFile: path.resolve(__dirname, './unocss.config.ts'),
      }),
    ],
    build: {
      outDir: '../../dist/renderer',
      emptyOutDir: true,
      sourcemap: true,
      rollupOptions: {
        external: ['election'],
      },
    },

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
    server: {
      port: parseInt(VITE_DEV_SERVER_PORT, 10) || 9999,
    },
  }
})
