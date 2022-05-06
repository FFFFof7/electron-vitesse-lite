import path from 'path'
import { loadEnv } from 'vite'
export default function parseEnv(mode) {
  const envDir = path.resolve(process.cwd(), './env')
  return loadEnv(mode, envDir, '')
}
