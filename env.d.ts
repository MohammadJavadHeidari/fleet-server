import { ENV_KEY } from '@src/config/config.type'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Record<keyof typeof ENV_KEY, string> {}
  }
}
