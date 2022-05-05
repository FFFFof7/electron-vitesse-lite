import { spawn } from 'child_process'
import { build, createServer } from 'vite'
import electron from 'electron'
import parseEnv from './utils/parseEnv.mjs'

const query = new URLSearchParams(import.meta.url.split('?')[1])
const debug = query.has('debug')

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchMain() {
  /**
   * @type {import('child_process').ChildProcessWithoutNullStreams | null}
   */
  let electronProcess = null
  /**
   * @type {import('vite').Plugin}
   */
  const startElectron = {
    name: 'electron-main-watcher',
    writeBundle() {
      electronProcess && electronProcess.kill()
      electronProcess = spawn(electron, ['.'], { stdio: 'inherit', env: parseEnv('development') })
    },
  }

  return build({
    configFile: 'packages/main/vite.config.ts',
    mode: 'development',
    plugins: [!debug && startElectron].filter(Boolean),
    build: {
      watch: {},
    },
  })
}

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchPreload(server) {
  return build({
    configFile: 'packages/preload/vite.config.ts',
    mode: 'development',
    plugins: [{
      name: 'electron-preload-watcher',
      writeBundle() {
        server.ws.send({ type: 'full-reload' })
      },
    }],
    build: {
      watch: {},
    },
  })
}

// bootstrap
const server = await createServer({ configFile: 'packages/renderer/vite.config.ts' })

await server.listen()
await watchPreload(server)
await watchMain(server)
