import path from 'path'
import dotenv from 'dotenv'
export default function parseEnv(mode) {
  const envFilePath = path.resolve(process.cwd(), './env/.env')
  const modeEnvFilePath = path.join(process.cwd(), `./env/.env.${mode}`)
  const { parsed: env } = dotenv.config({ path: envFilePath })
  const { parsed: modeEnv } = dotenv.config({ path: modeEnvFilePath })
  return { ...process.env, ...env, ...modeEnv }
}
