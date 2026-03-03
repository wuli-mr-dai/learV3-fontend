/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: number
  readonly VITE_ENABLE_MOCK: boolean
  readonly VITE_ENABLE_DEVTOOLS: boolean
  readonly VITE_AUTH_TOKEN_KEY: string
  readonly VITE_AUTH_USER_KEY: string
  readonly VITE_ROUTER_MODE: string
  readonly VITE_THEME_PRIMARY: string
  readonly VITE_THEME_SUCCESS: string
  readonly VITE_THEME_WARNING: string
  readonly VITE_THEME_ERROR: string
  readonly VITE_DEV_SERVER_HOST: string
  readonly VITE_DEV_SERVER_PORT: number
  readonly VITE_BUILD_SOURCEMAP: boolean
  readonly VITE_BUILD_MINIFY: boolean
  readonly VITE_GOOGLE_ANALYTICS_ID?: string
  readonly VITE_SENTRY_DSN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
