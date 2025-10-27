// Note: because Vite statically replaces env variables when building, we need
// to reference each of them by their full name
export const ENV_VARIABLES = {
  NODE_ENV: typeof process !== 'undefined' ? process.env.NODE_ENV : undefined,
  VITE_ENVIRONMENT:
    typeof process !== 'undefined'
      ? process.env.VITE_ENVIRONMENT
      : import.meta.env.VITE_ENVIRONMENT,
  VITE_RPC_MAINNET_URL:
    typeof process !== 'undefined'
      ? process.env.VITE_RPC_MAINNET_URL
      : import.meta.env.VITE_RPC_MAINNET_URL,

  // Third-parties
  VITE_SENTRY_DSN:
    typeof process !== 'undefined' ? process.env.VITE_SENTRY_DSN : import.meta.env.VITE_SENTRY_DSN,
  VITE_POSTHOG_API_KEY:
    typeof process !== 'undefined'
      ? process.env.VITE_POSTHOG_API_KEY
      : import.meta.env.VITE_POSTHOG_API_KEY,
  VITE_POSTHOG_HOST_URL:
    typeof process !== 'undefined'
      ? process.env.VITE_POSTHOG_HOST_URL
      : import.meta.env.VITE_POSTHOG_HOST_URL,

  // Feature flags
  VITE_FF_INTEGRATED_SWAP:
    typeof process !== 'undefined'
      ? process.env.VITE_FF_INTEGRATED_SWAP
      : import.meta.env.VITE_FF_INTEGRATED_SWAP,
};
