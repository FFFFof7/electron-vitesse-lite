import { defineConfig } from 'vite'
import type { UserConfig } from 'vitest/config'
export default defineConfig(({ mode }) => {
  type testConfig = UserConfig['test']

  const testMode = mode === 'test' ? '' : mode
  const include = `./test/${testMode}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`

  const baseConfig: testConfig = {
    globals: true,
    environment: 'node',
    include: [include],
  }
  const mainConfig: testConfig = {

  }
  const preloadConfig: testConfig = {}
  const rendererConfig: testConfig = {
    environment: 'jsdom',
  }
  const configMap = {
    main: mainConfig,
    preload: preloadConfig,
    renderer: rendererConfig,
  }
  const config = configMap[mode]

  return {
    test: Object.assign(baseConfig, config),
  }
})
