import { builtinModules } from 'module'
import { defineConfig } from 'vite'
export default defineConfig({
  root: __dirname,
  envDir: '../../env',
  build: {
    outDir: '../../dist/main',
    emptyOutDir: true,
    minify: process.env./* from mode option */NODE_ENV === 'production',
    sourcemap: true,
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: () => '[name].cjs',
    },
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules,
      ],
    },
  },
})
